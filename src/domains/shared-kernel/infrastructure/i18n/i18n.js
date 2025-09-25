/**
 * i18n configuration for internationalization support
 * Supports English (EN) and Spanish (ES) languages
 *
 * @summary Configures Vue-i18n with locale files and language switching
 * @author Anderson Ventosilla
 */

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

const messages = {
  en,
  es
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  legacy: false
})

export default i18n