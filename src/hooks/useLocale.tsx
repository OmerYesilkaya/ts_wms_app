import React, { useState, useContext, createContext } from 'react';
import i18n from 'i18n-js';
import { LANGUAGES } from '@app/constants';
import type { LocaleContext as LocaleContextType } from '@app/types';

const translationGetters = {
  de: require('@app/locales/de.json'),
  en: require('@app/locales/en.json'),
};

const LocaleContext = createContext<LocaleContextType>({} as LocaleContextType);

export const LocaleProvider = (props: any) => {
  const [locale, setLocale] = useState(LANGUAGES.DEFAULT_LANGUAGE);
  // TODO: Get default value from local storage/cookie/cache if there is a stored value, if not use default value

  i18n.translations = translationGetters;
  i18n.locale = locale;

  function changeLocale(localeParam: string) {
    setLocale(localeParam);
    // TODO: Set local param to local storage/cookie/cache
  }

  return (
    <LocaleContext.Provider value={{ t: i18n.t, locale: locale, changeLocale }}>
      {props.children}
    </LocaleContext.Provider>
  );
};

export default function useLocale() {
  const context = useContext(LocaleContext);
  return context;
}
