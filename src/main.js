/**
 * Main application entry point
 * Configures Vue 3 app with PrimeVue, i18n and routing
 *
 * @summary Application bootstrap with all required plugins and configurations
 * @author Anderson Ventosilla
 */

import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Material from '@primevue/themes/material'

// PrimeVue components
import Button from 'primevue/button'
import Card from 'primevue/card'
import Toolbar from 'primevue/toolbar'
import Chip from 'primevue/chip'
import Dropdown from 'primevue/dropdown'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'

// PrimeVue services
import ToastService from 'primevue/toastservice'

// Internationalization
import i18n from './domains/shared-kernel/infrastructure/i18n/i18n.js'

// Create Material Design preset
const MaterialPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
})

const app = createApp(App)

// Configure PrimeVue
app.use(PrimeVue, {
  theme: {
    preset: MaterialPreset,
    options: {
      darkModeSelector: 'system',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
})

// Register PrimeVue components globally with pv- prefix
app.component('pv-button', Button)
app.component('pv-card', Card)
app.component('pv-toolbar', Toolbar)
app.component('pv-chip', Chip)
app.component('pv-dropdown', Dropdown)
app.component('pv-progress-spinner', ProgressSpinner)
app.component('pv-message', Message)


// Add services
app.use(ToastService)

// Add i18n
app.use(i18n)

app.mount('#app')
