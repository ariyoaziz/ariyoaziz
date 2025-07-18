<script setup>
import { ref, onMounted, provide } from 'vue';
import AOS from 'aos'; // Import the AOS library
import 'aos/dist/aos.css'; // Import the AOS CSS

const isDarkMode = ref(false);

const applyTheme = () => {
  // This part applies the 'dark' or 'light' class to the <html> element
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  document.documentElement.classList.toggle('light', !isDarkMode.value);
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkModeEnabled', isDarkMode.value);
  applyTheme(); // Call to apply visual changes
};

provide('isDarkMode', isDarkMode);
provide('toggleDarkMode', toggleDarkMode);

onMounted(() => {
  // Retrieve saved dark mode preference from localStorage
  const savedDarkMode = localStorage.getItem('darkModeEnabled');
  isDarkMode.value = savedDarkMode ? JSON.parse(savedDarkMode) : false;
  applyTheme(); // Apply theme when the application loads

  // Initialize AOS after the component is mounted and the DOM is ready
  AOS.init({
    duration: 1000, // Duration of the animation in milliseconds
    once: true,     // Whether animation should only happen once - while scrolling down
    // Add more global AOS options here if needed, e.g.:
    // offset: 120, // offset (in px) from the original trigger point
    // mirror: false, // whether elements should animate out while scrolling past them
  });
});
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
/* Ensure no styles here try to override html or body global theme classes */
/* Only add specific styles for div #app if necessary, e.g., font-family */
</style>