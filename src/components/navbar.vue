<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black shadow-md py-4 px-8 flex justify-center gap-6 transition duration-300"
  >
    <a href="#about" class="text-sm font-semibold hover:underline text-black dark:text-white">About</a>
    <a href="#projects" class="text-sm font-semibold hover:underline text-black dark:text-white">Projects</a>
    <a href="#contact" class="text-sm font-semibold hover:underline text-black dark:text-white">Contact</a>
  </nav>
</template>

<script setup>
// No logic needed for now
</script>

<style scoped>
nav a {
  transition: color 0.3s ease;
}
</style>
