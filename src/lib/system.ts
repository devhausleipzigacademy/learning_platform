import path from 'path';

export function makePathAbsolute(subpath: string) {
    console.log(process.cwd() + path.resolve(subpath));
    return process.cwd() + path.resolve(subpath);
}
