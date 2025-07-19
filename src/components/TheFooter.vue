<script setup>
const props = defineProps({
    isDarkMode: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <footer class="relative text-gray-900 dark:text-gray-100 py-6 px-4 overflow-hidden transition-colors duration-300">

        <div :class="`absolute top-0 left-0 w-full h-full z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-10`">
        </div>
        <div
            class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center opacity-5 dark:opacity-5">
        </div>

        <div class="relative z-10 text-center text-sm">
            &copy; {{ new Date().getFullYear() }} Ariyo Aziz. All rights reserved.
        </div>
    </footer>
</template>
