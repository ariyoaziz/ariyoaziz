<script setup>
import { inject, ref } from 'vue';
import powerIconDark from '../assets/icons/power-light.svg'; // Icon untuk light mode (tombol dark)
import powerIconLight from '../assets/icons/power.svg';   // Icon untuk dark mode (tombol light)

// Inject isDarkMode dan toggleDarkMode dari App.vue
const isDarkMode = inject('isDarkMode', ref(false));
const toggleDarkMode = inject('toggleDarkMode', () => console.warn('toggleDarkMode function not provided'));
</script>

<template>
  <button
    @click="toggleDarkMode"
    :class="`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition z-30 ${
      isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
    }`"
    aria-label="Toggle dark/light mode"
  >
    <img
      :src="isDarkMode ? powerIconLight : powerIconDark"
      alt="Power Icon"
      class="w-5 h-5"
    />
  </button>
</template>

<style scoped>
/* Anda bisa menambahkan gaya khusus di sini jika diperlukan */
</style>