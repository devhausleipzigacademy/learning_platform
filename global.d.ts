// typing pulled from default locale file
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type Messages = typeof import("./public/locales/en-GB.json");
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IntlMessages extends Messages {}
