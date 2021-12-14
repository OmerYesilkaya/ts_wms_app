type Scope = string | string[];

type Message =
  | string
  | Record<string, unknown>
  | ((scope: Scope) => string | Record<string, unknown>);

interface InterpolateOptions {
  [key: string]: any;
}
interface TranslateOptions extends InterpolateOptions {
  scope?: Scope;
  message?: string;
  defaults?: Array<{ message: Message } | { scope: Scope }>;
  defaultValue?: Message;
}

type LocaleContext = {
  t: (scope: string | string[], options?: TranslateOptions) => string;
  locale: string;
  changeLocale: React.Dispatch<string>;
};

export type {
  LocaleContext,
  TranslateOptions,
  InterpolateOptions,
  Message,
  Scope,
};
