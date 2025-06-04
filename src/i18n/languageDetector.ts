import * as Localization from 'expo-localization';
import { LanguageDetectorAsyncModule } from 'i18next';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const bestLocale = Localization.getLocales()[0]?.languageCode || 'en';
    callback(bestLocale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export default languageDetector;
