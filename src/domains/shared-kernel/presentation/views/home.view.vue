<!-- eslint-disable vue/multi-word-component-names -->
/**
 * Home view component
 * Welcome page with navigation to destinations
 *
 * @summary Home page as per requirements
 * @author Anderson Ventosilla
 */

<template>
  <div class="flex flex-column align-items-center justify-content-center" style="min-height: 60vh;" role="main" aria-labelledby="home-title">
    <div class="text-center p-6 max-w-30rem">
      <h1 id="home-title" class="text-4xl font-bold text-primary mb-4">
        {{ $t('home.title') }}
      </h1>
      <p class="text-xl text-color-secondary mb-5 line-height-3">
        {{ $t('home.subtitle') }}
      </p>
      <pv-button
        :label="$t('home.exploreButton')"
        size="large"
        @click="navigateToDestinations"
        :aria-label="$t('home.exploreButton')"
        class="px-4 py-3"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['navigate-to-destinations'])

const navigateToDestinations = () => {
  emit('navigate-to-destinations')
}
</script>

