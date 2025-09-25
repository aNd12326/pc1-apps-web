<template>
  <pv-card class="h-full" role="article" :aria-label="`Place: ${place.name}`">
    <template #header>
      <img
        :src="getImageUrl()"
        :alt="`${place.name || 'Unknown'} image`"
        class="w-full"
        style="height: 200px; object-fit: cover; background-color: #f8f9fa;"
        @error="onImageError"
        loading="lazy"
      />
    </template>

    <template #title>
      <h3 class="m-0 text-lg font-semibold text-color line-height-3" :title="place.name">
        {{ place.name }}
      </h3>
    </template>

    <template #subtitle>
      <pv-chip
        :label="getCategoryLabel()"
        size="small"
        class="mt-2"
      />
    </template>

    <template #content>
      <div class="flex flex-column gap-2" role="group" aria-label="Place details">
        <div class="flex align-items-center gap-2">
          <span class="text-primary">📍</span>
          <span class="text-color-secondary">{{ getFormattedDistance() }}</span>
        </div>
      </div>
    </template>

    <template #footer>
      <pv-button
        :label="$t('destinations.seeDetails')"
        severity="info"
        @click="openDetails"
        :aria-label="`See details about ${place.name} on Wikipedia`"
        class="w-full justify-content-center"
      />
    </template>
  </pv-card>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  place: {
    type: Object,
    required: true,
    validator: (place) => {
      return place && place.name
    }
  }
})

const placeholderImage = ref('https://via.placeholder.com/400x200/e9ecef/6c757d?text=No+Image')

/**
 * Gets the image URL with fallback
 */
const getImageUrl = () => {
  if (props.place.hasImage && props.place.hasImage()) {
    return props.place.image
  }
  if (props.place.image && props.place.image.trim()) {
    return props.place.image
  }
  return placeholderImage.value
}

const getFormattedDistance = () => {
  if (props.place.getFormattedDistance) {
    return props.place.getFormattedDistance()
  }
  const distance = props.place.distance || 0
  if (distance < 1000) {
    return `${Math.round(distance)} m`
  }
  return `${(distance / 1000).toFixed(1)} km`
}

const getCategoryLabel = () => {
  const category = props.place.category || 'category'
  return category
}

const onImageError = (event) => {
  event.target.src = placeholderImage.value
}

const openDetails = () => {
  const url = props.place.infoUrl || 'https://wikipedia.org'
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

