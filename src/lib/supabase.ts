import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Dispatch, SetStateAction } from 'react';

import { b64DecodeUnicode, b64EncodeUnicode } from './base64';
import { digestFile } from './crypto';

const supabaseApiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function getFileUrl({
  supabase,
  bucket,
  path,
  searchTerm
}: {
  supabase: SupabaseClient<any, 'public', any> | undefined;
  bucket: string;
  searchTerm: string;
  path: string;
}) {
  if (supabase) {
    const { data: foundFile, error } = await supabase.storage
      .from(bucket)
      .list(path, {
        limit: 1,
        offset: 0,
        search: searchTerm,
        sortBy: { column: 'updated_at', order: 'desc' }
      });
    if (foundFile && foundFile[0]) {
      const { data } = await supabase.storage
        .from(bucket)
        .getPublicUrl(foundFile[0].name);
      if (data) return data.publicUrl;
    }
  }
}

// export async function getFilesUrls({
//     supabase = undefined,
//     bucket = '',
//     searchTerm = '',
//     schema = ''
// }: {
//     supabase: SupabaseClient<any, 'public', any> | undefined;
//     bucket: string;
//     searchTerm: string;
//     schema: string;
// }) {
//     const urls: string[] = [];

//     if (supabase) {
//         const { data: foundFiles, error } = await supabase.storage
//             .from(bucket)
//             .list(schema, {
//                 offset: 0,
//                 sortBy: { column: 'updated_at', order: 'desc' }
//             });
//         if (error) console.log(error);
//         if (foundFiles && foundFiles.length > 0) {
//             for (const file of foundFiles) {
//                 const { data } = await supabase.storage
//                     .from(bucket)
//                     .getPublicUrl(file.name);

//                 if (data) {
//                     urls.push(data.publicUrl);
//                 }
//             }
//         }
//     }
//     return urls;
// }

export async function getBucketList({
  supabase,
  bucket,
  path,
  sortBy,
  order,
  limit = 50,
  offset = 0
}: {
  supabase: SupabaseClient<any, 'public', any>;
  bucket: string;
  sortBy: 'name' | 'size' | 'last_accessed_at' | 'created_at' | 'updated_at';
  order: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  path: string;
}) {
  const { data: fileFolders, error } = await supabase.storage
    .from(bucket)
    .list(path, {
      limit: limit,
      offset: offset,
      sortBy: { column: sortBy, order: order }
    });

  if (error) console.log(error);

  if (fileFolders) {
    const files = await Promise.all(
      fileFolders!.map(async folder => {
        const { data: files, error } = await supabase.storage
          .from(bucket)
          .list(`${path}/${folder.name}`, {
            limit: limit,
            offset: offset,
            sortBy: { column: sortBy, order: order }
          });

        if (error) console.log(error);

        if (files) {
          return files.map(file => {
            return {
              file: file,
              url: `${supabaseApiUrl}/storage/v1/object/public/${bucket}/${path}/${folder.name}/${file.name}`,
              decodedName: `${file.name.slice(
                0,
                16
              )}-${b64DecodeUnicode(folder.name)}`
            };
          });
        }

        return [];
      })
    );

    if (files) {
      return files.flat();
    }

    return [];
  }

  return [];
}

export async function removeFile({
  supabase,
  bucket,
  path,
  fileName
}: {
  supabase: SupabaseClient<any, 'public', any>;
  bucket: string;
  path: string;
  fileName: string;
}) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([`${path}/${fileName}`]);
  if (error) throw Error;
}

// export async function checkForFile({
//     supabase = undefined,
//     bucket = '',
//     schema = '',
//     userId = ''
// }: {
//     supabase: SupabaseClient<any, 'public', any> | undefined;
//     bucket: string;
//     schema: string;
//     userId: string;
// }) {
//     if (supabase && userId) {
//         const { data, error } = await supabase.storage
//             .from(bucket)
//             .list(schema, {
//                 limit: 100,
//                 offset: 0,
//                 search: userId
//             });
//         if (error) console.log('check error', error);
//         if (data && data[0]) {
//             return data[0].name;
//         } else {
//             return false;
//         }
//     }
// }

export async function uploadFile({
  handler,
  bucket,
  path,
  file
}: {
  handler: (
    bucket: string,
    path: string,
    b64name: string,
    digest: string,
    file: File
  ) => Promise<string>;
  bucket: string;
  path: string;
  file: File;
}) {
  const digest = digestFile(file);
  const b64name = b64EncodeUnicode(file.name);

  const url = await handler(bucket, path, b64name, await digest, file);

  return {
    url: url,
    file: file,
    b64name: b64name
  };
}

// export async function uploadFile(
//     handler: (bucket: string, path: string, file: File) => Promise<string>,
//     bucket: string,
//     path: string,
//     file: File
// ) {
//     const url = await handler(bucket, path, file);

//     return {
//         url,
//         file
//     };
// }

// export async function updateFile({
//     supabase = undefined,
//     bucket,
//     path,
//     userId,
//     previousFileName = '',
//     newFile = undefined
// }: {
//     supabase: SupabaseClient<any, 'public', any> | undefined;
//     bucket: string;
//     path: string;
//     userId: string;
//     previousFileName: string;
//     newFile: File | undefined;
// }) {
//     if (supabase && userId && newFile) {
//         const { data, error } = await supabase.storage
//             .from(bucket)
//             .update(`${path}/${previousFileName}`, newFile, {
//                 cacheControl: '3600',
//                 upsert: true
//             });
//         if (data) {
//             return data.path;
//         }
//         if (error) throw new Error(error.stack);
//     }
// }

export async function downloadFile(url: string, name: string) {
  const response = await fetch(url);
  const data = await response.blob();

  const internalUrl = window.URL.createObjectURL(data);
  const linkElement = document.createElement('a');
  linkElement.href = internalUrl;
  linkElement.download = name;
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
  window.URL.revokeObjectURL(internalUrl);
}
