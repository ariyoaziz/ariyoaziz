<script setup>
import { ref, onMounted, provide } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

const isDarkMode = ref(false);

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkModeEnabled', isDarkMode.value.toString());
  applyTheme();
};

provide('isDarkMode', isDarkMode);
provide('toggleDarkMode', toggleDarkMode);

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkModeEnabled');

  if (savedDarkMode !== null) {
    isDarkMode.value = JSON.parse(savedDarkMode);
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();

  AOS.init({
    duration: 1000,
    once: true,
  });
});
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html {
  background-color: #ffffff;
  color: #1a202c;
  transition: background-color 0.3s ease, color 0.3s ease;
}

html.dark {
  background-color: #1a202c;
  color: #e2e8f0;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: inherit;
  color: inherit;
}
</style>
