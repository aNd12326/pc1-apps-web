

<template>
  <pv-toolbar>
    <template #start>
      <div class="flex align-items-center gap-3">
        <img
          :src="logoUrl"
          :alt="`${$t('toolbar.institutionName')} logo`"
          width="40"
          height="40"
          @error="onLogoError"
          aria-hidden="false"
        />
        <span class="text-xl font-bold text-primary">
          {{ $t('toolbar.institutionName') }}
        </span>
      </div>
    </template>

    <template #end>
      <div class="flex align-items-center gap-2">
        <pv-button
          :label="$t('toolbar.language.english')"
          size="small"
          :severity="currentLocale === 'en' ? 'primary' : 'secondary'"
          :outlined="currentLocale !== 'en'"
          @click="changeLanguage('en')"
          :aria-pressed="currentLocale === 'en'"
          aria-label="Switch to English"
        />
        <pv-button
          :label="$t('toolbar.language.spanish')"
          size="small"
          :severity="currentLocale === 'es' ? 'primary' : 'secondary'"
          :outlined="currentLocale !== 'es'"
          @click="changeLanguage('es')"
          :aria-pressed="currentLocale === 'es'"
          aria-label="Cambiar a Español"
        />
      </div>
    </template>
  </pv-toolbar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const logoUrl = ref('')
const defaultLogoUrl = '/favicon.ico'

const currentLocale = computed(() => locale.value)

/**
 * Changes the application language
 * @param {string} newLocale - The new locale code (en/es)
 */
const changeLanguage = (newLocale) => {
  locale.value = newLocale
  localStorage.setItem('preferred-language', newLocale)
}

/**
 * Handles logo loading error by falling back to default
 */
const onLogoError = () => {
  logoUrl.value = defaultLogoUrl
}

/**
 * Fetches logo from Clearbit API
 */
const fetchLogo = async () => {
  try {
    const domain = 'opentripmap.io'
    const clearbitUrl = `https://logo.clearbit.com/${domain}`
    logoUrl.value = clearbitUrl
  } catch (error) {
    console.warn('Failed to load logo from Clearbit:', error)
    logoUrl.value = defaultLogoUrl
  }
}

onMounted(() => {
  fetchLogo()

  const savedLanguage = localStorage.getItem('preferred-language')
  if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
    locale.value = savedLanguage
  }
})
</script>

