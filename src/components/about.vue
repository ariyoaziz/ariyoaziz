<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import AboutSection from '../components/about.vue'; 

// State for dark mode (sama seperti sebelumnya)
const isDarkMode = ref(false);

const applyThemeFromLocalStorage = () => {
  const savedDarkMode = localStorage.getItem('darkModeEnabled');
  if (savedDarkMode !== null) {
    isDarkMode.value = JSON.parse(savedDarkMode);
  } else {
    isDarkMode.value = false; // Default to light mode
  }
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  document.documentElement.classList.toggle('light', !isDarkMode.value);
};

onMounted(() => {
  applyThemeFromLocalStorage();
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkModeEnabled', isDarkMode.value);
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  document.documentElement.classList.toggle('light', !isDarkMode.value);
};

const router = useRouter(); // Initialize router

</script>

<template>
  <div class="min-h-screen">
    <nav class="p-4 shadow-md bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="font-bold text-lg text-gray-900 dark:text-white">Ariyoaziz_</router-link>
        <div>
          <router-link to="/about" class="mx-2 hover:text-blue-500 text-gray-800 dark:text-gray-200">About Me</router-link>
          <router-link to="/portfolio" class="mx-2 hover:text-blue-500 text-gray-800 dark:text-gray-200">Portofolio</router-link>
          <router-link to="/skills" class="mx-2 hover:text-blue-500 text-gray-800 dark:text-gray-200">Skills</router-link>
          <router-link to="/contact" class="mx-2 hover:text-blue-500 text-gray-800 dark:text-gray-200">Contact</router-link>
          <button @click="toggleDarkMode" class="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path v-if="!isDarkMode" fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.457 4.907a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM10 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4 0a1 1 0 010-1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zm0-8a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zm8 0a1 1 0 010-1.414l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM16 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" clip-rule="evenodd"></path>
              <path v-else fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <AboutSection />

    <footer class="py-4 text-center text-sm bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <p>&copy; 2025 Ariyo Aziz Pratama. Hak Cipta Dilindungi.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Gaya khusus untuk AboutPage jika diperlukan */
</style>