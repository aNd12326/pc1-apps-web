/**
 * Main App component
 * Root component with navigation and layout structure
 *
 * @summary Main application layout with toolbar, content area, and footer
 * @author Anderson Ventosilla
 */

<script setup>
import { ref } from 'vue'
import Toolbar from './domains/shared-kernel/presentation/components/toolbar.component.vue'
import Footer from './domains/shared-kernel/presentation/components/footer.component.vue'
import HomeView from './domains/shared-kernel/presentation/views/home.view.vue'
import DestinationsView from './domains/exploration/presentation/views/destinations.view.vue'

const currentView = ref('home')

/**
 * Navigates to a specific view
 * @param {string} view - The view name to navigate to
 */
const navigateTo = (view) => {
  currentView.value = view
}
</script>

<template>
  <div class="min-h-screen flex flex-column surface-ground" role="application" aria-label="OpenTripMap World Explorer">
    <!-- Main Toolbar -->
    <Toolbar />

    <!-- Main Content Area -->
    <main class="flex-1 w-full" role="main">
      <!-- Home View -->
      <HomeView
        v-if="currentView === 'home'"
        @navigate-to-destinations="navigateTo('destinations')"
      />

      <!-- Destinations View -->
      <div v-if="currentView === 'destinations'" class="max-w-screen-xl mx-auto">
        <DestinationsView
          @navigate-to-home="navigateTo('home')"
        />
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

