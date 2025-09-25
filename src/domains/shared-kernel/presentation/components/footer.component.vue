<!-- eslint-disable vue/multi-word-component-names -->
/**
 * Footer component with copyright and developer information
 * Displays company copyright and developer credits
 *
 * @summary Application footer with legal and attribution information
 * @author Anderson Ventosilla
 */

<template>
  <div class="surface-ground border-top-1 surface-border p-4 text-center mt-auto">
    <div class="max-w-screen-lg mx-auto">
      <p class="text-color-secondary text-sm m-0 mb-1 font-medium">
        {{ $t('footer.copyright') }}
      </p>
      <p class="text-color-secondary text-sm m-0 italic">
        {{ $t('footer.developed') }}
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * Footer component setup
 * No reactive data or methods needed for static footer content
 *
 * @summary Static footer component with internationalized text
 * @author Anderson Ventosilla
 */
</script>

