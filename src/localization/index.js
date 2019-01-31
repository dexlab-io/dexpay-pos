import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import english from './english.json';
import italian from './italian.json';
import hindi from './hindi.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: english
  },
  it: {
    translation: italian
  },
  hi: {
    translation: hindi
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
