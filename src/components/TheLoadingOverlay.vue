<script setup>
import { inject, ref } from 'vue'; // <-- Tambahkan 'ref' di sini

const isDarkMode = inject('isDarkMode', ref(false));

const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true
    }
});
</script>

<template>
    <Transition name="fade-overlay">
        <div v-if="isLoading" v-cloak class="fixed inset-0 z-[999] flex flex-col items-center justify-center
             bg-white dark:bg-gray-900 transition-opacity duration-700">
            <div class="relative w-20 h-20" data-aos="zoom-in">
                <div class="absolute inset-0 rounded-full animate-spin-slow"
                    :class="{ 'border-t-4 border-b-4 border-blue-500': !isDarkMode, 'border-t-4 border-b-4 border-purple-400': isDarkMode }"
                    style="border-style: solid; border-color: transparent;">
                    <div class="absolute inset-0 rounded-full"
                        :class="{ 'bg-gradient-to-br from-blue-500 to-purple-500': !isDarkMode, 'bg-gradient-to-br from-purple-400 to-pink-400': isDarkMode }"
                        style="mask: url(#gradient-mask); -webkit-mask: url(#gradient-mask);">
                    </div>
                    <svg class="absolute inset-0 w-full h-full">
                        <defs>
                            <mask id="gradient-mask">
                                <circle cx="50%" cy="50%" r="40%" fill="white" stroke="black" stroke-width="8" />
                            </mask>
                        </defs>
                    </svg>
                </div>
                <div class="absolute inset-2 rounded-full bg-white dark:bg-gray-900"></div>
            </div>
            <p class="mt-8 text-xl font-bold text-gray-800 dark:text-gray-200" data-aos="fade-up" data-aos-delay="500">
                Loading<span class="animate-dots">.</span><span class="animate-dots"
                    style="animation-delay: 0.2s;">.</span><span class="animate-dots"
                    style="animation-delay: 0.4s;">.</span>
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
    animation: spin-slow 2s linear infinite;
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
    transition: opacity 0.7s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
    opacity: 0;
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
    animation: dots 1s infinite steps(1, end);
    opacity: 0;
}

[v-cloak] {
    display: none;
}
</style>
