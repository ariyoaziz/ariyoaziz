<script setup>
import { ref } from 'vue';

// Deteksi dark mode secara langsung dari localStorage
const isDarkMode = ref(false);

if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    isDarkMode.value = storedTheme === 'dark';
}

const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true,
    },
});
</script>

<template>
    <Transition name="fade-overlay">
        <div v-if="isLoading" v-cloak
            class="fixed inset-0 z-[999] flex flex-col items-center justify-center transition-opacity duration-700 bg-white dark:bg-gray-900">
            <!-- Spinner -->
            <div class="relative w-24 h-24 animate-pulse-slow" data-aos="zoom-in">
                <!-- Outer rotating border -->
                <div class="absolute inset-0 rounded-full border-[6px] animate-spin-slow" :class="{
                    'border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent': !isDarkMode,
                    'border-t-purple-400 border-b-purple-400 border-l-transparent border-r-transparent': isDarkMode,
                }"></div>

                <!-- Inner Circle -->
                <div class="absolute inset-3 rounded-full bg-gradient-to-br shadow-inner" :class="{
                    'from-white to-gray-100': !isDarkMode,
                    'from-gray-800 to-gray-900': isDarkMode,
                }"></div>
            </div>

            <!-- Loading Text -->
            <p class="mt-8 text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 tracking-wide flex gap-1"
                data-aos="fade-up" data-aos-delay="500">
                <span>Memuat</span>
                <span class="animate-dots">.</span>
                <span class="animate-dots delay-[0.2s]">.</span>
                <span class="animate-dots delay-[0.4s]">.</span>
            </p>
        </div>
    </Transition>
</template>

<style scoped>
@keyframes spin-slow {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 1.8s linear infinite;
}

.animate-pulse-slow {
    animation: pulse 3s ease-in-out infinite;
}

@keyframes dots {

    0%,
    20% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.animate-dots {
    animation: dots 1.2s infinite steps(1, end);
    opacity: 0;
}

.animate-dots.delay-\[0\.2s\] {
    animation-delay: 0.2s;
}

.animate-dots.delay-\[0\.4s\] {
    animation-delay: 0.4s;
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
    transition: opacity 0.7s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
    opacity: 0;
}

[v-cloak] {
    display: none;
}
</style>
