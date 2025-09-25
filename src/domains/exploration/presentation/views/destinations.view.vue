<!-- eslint-disable vue/multi-word-component-names -->
/**
 * Destinations view component
 * Displays touristic places with filtering by category
 *
 * @summary Top Destinations view with filtering as per requirements
 * @author Anderson Ventosilla
 */

<template>
  <div class="p-4" role="main" aria-labelledby="destinations-title">
    <!-- Header -->
    <header class="text-center mb-4">
      <h1 id="destinations-title" class="text-4xl font-bold text-primary mb-4">
        {{ $t('destinations.title') }}
      </h1>

      <!-- Category Filter -->
      <div class="flex align-items-center justify-content-center gap-3 mb-4">
        <label class="font-medium">{{ $t('destinations.filterLabel') }}</label>
        <pv-dropdown
          v-model="selectedCategory"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          :placeholder="$t('destinations.allCategories')"
          class="w-12rem"
          @change="onCategoryChange"
        />
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="text-center p-8" role="status" aria-live="polite">
      <pv-progress-spinner />
      <p class="mt-3 text-color-secondary">{{ $t('common.loading') }}</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="m-4" role="alert">
      <pv-message severity="error" :closable="false">
        {{ error }}
      </pv-message>
    </div>

    <!-- Places Grid -->
    <div v-else-if="filteredPlaces.length > 0"
         class="flex flex-wrap gap-4 justify-content-center"
         role="list">
      <div v-for="place in filteredPlaces"
           :key="place.id"
           class="w-full md:w-6 lg:w-4"
           role="listitem">
        <place-card :place="place" />
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="text-center p-8" role="status">
      <p class="text-color-secondary text-lg">{{ $t('destinations.noResults') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import PlaceCard from '../components/place-card.component.vue'
import { PlacesApiService } from '../../infrastructure/places-api.service.js'

const { t } = useI18n()

defineEmits(['navigate-to-home'])

const places = ref([])
const loading = ref(false)
const error = ref(null)
const selectedCategory = ref('all')

const placesApiService = new PlacesApiService()

/**
 * Category options extracted from API data
 */
const categoryOptions = computed(() => {
  const allOption = { label: t('destinations.allCategories'), value: 'all' }

  // Extract unique categories from API data
  const categories = [...new Set(places.value.map(place => place.category))]
  const options = categories.map(category => ({
    label: category,
    value: category
  }))

  return [allOption, ...options]
})

/**
 * Filtered places based on selected category
 */
const filteredPlaces = computed(() => {
  if (selectedCategory.value === 'all' || !selectedCategory.value) {
    return places.value
  }
  return places.value.filter(place => place.category === selectedCategory.value)
})

/**
 * Loads places from API
 */
const loadPlaces = async () => {
  try {
    loading.value = true
    error.value = null
    places.value = await placesApiService.getAllPlaces()
  } catch (err) {
    error.value = err.message || t('common.error')
    console.error('Error loading places:', err)
  } finally {
    loading.value = false
  }
}

/**
 * Handles category filter change
 */
const onCategoryChange = () => {
  // Filtering happens automatically via computed property
}

onMounted(() => {
  loadPlaces()
})
</script>

