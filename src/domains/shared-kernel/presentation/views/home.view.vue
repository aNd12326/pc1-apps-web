<template>
  <div class="flex align-items-center justify-content-center p-8" style="min-height: 70vh;" role="main" aria-labelledby="home-title">
    <div class="text-center max-w-30rem">
      <h1 id="home-title" class="text-5xl font-bold text-primary mb-5">
        {{ $t('home.title') }}
      </h1>
      <p class="text-xl text-color-secondary mb-6 line-height-3">
        {{ $t('home.subtitle') }}
      </p>
      <pv-button
        :label="$t('home.exploreButton')"
        size="large"
        @click="navigateToDestinations"
        :aria-label="$t('home.exploreButton')"
        class="px-6 py-3 text-lg"
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

