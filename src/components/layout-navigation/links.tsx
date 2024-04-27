import { ReactNode } from 'react';

import { validTranslationKeys } from '@/i18n';
import { cn } from '@/lib/style';
import { Link } from '@/navigation';

// types half-way work, but allows for some invalid combinations
// please fix it if you know how
type InferPrefix<
  U extends string | undefined,
  S extends string
> = string extends `${infer U}${S}` ? `${U}${S}` : `${U}${S}`;

export type NavLinkConfig = Readonly<{
  textKey: InferPrefix<Readonly<validTranslationKeys>, '.linkText'>;
  intlAnchorKey?: InferPrefix<Readonly<validTranslationKeys>, '.anchor'>;
  href: string;
}>;

export type NavLink = Readonly<
  | {
      type: 'simple';
      href: string;
      text: string;
    }
  | {
      type: 'withAnchor';
      href: string;
      text: string;
      intlAnchor: string;
      intlAnchorKey: NonNullable<NavLinkConfig['intlAnchorKey']>;
    }
>;

type CustomLinkProps = {
  link: NavLink;
  className?: string;
  onClick?: () => void;
};

export function CustomLink({ link, className, onClick }: CustomLinkProps) {
  return (
    <Link
      onClick={onClick}
      href={
        link.href + `${link.type === 'withAnchor' ? '#' + link.intlAnchor : ''}`
      }
      className={cn(className, '')}
    >
      {link.text}
    </Link>
  );
}

export function PageAnchor({
  id,
  children
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-smooth scroll-m-[33vh]">
      {children}
    </div>
  );
}

export const linksConfig = {
  location: []
} as const satisfies Record<string, NavLinkConfig[]>;
