<script setup>
const props = defineProps({
    isDarkMode: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <footer class="relative px-6 py-10 overflow-hidden text-center transition-colors duration-300"
        :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">

        <!-- Overlay Background -->
        <div :class="`absolute inset-0 z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-10`">
        </div>
        <div
            class="absolute inset-0 z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center opacity-5 dark:opacity-5">
        </div>

        <!-- Footer Content -->
        <div class="relative z-10 flex flex-col items-center space-y-4">

            <!-- Separator -->
            <div class="w-2/3 h-px bg-gray-400 dark:bg-gray-600 opacity-30"></div>

            <!-- Copyright -->
            <p class="text-sm font-medium">
                &copy; {{ new Date().getFullYear() }} <span class="font-semibold">Ariyo Aziz Pratama</span>. All rights
                reserved.
            </p>
            <!-- Built With -->
            <p class="text-xs text-gray-500 dark:text-gray-400">
                Dibuat dengan <span class="font-semibold text-blue-600 dark:text-blue-400">Vue</span> dan
                <span class="font-semibold text-sky-600 dark:text-sky-400">Tailwind CSS</span>.
            </p>
        </div>
    </footer>
</template>
