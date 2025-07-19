<script setup>
import { ref } from "vue";
import powerIconDark from "../assets/icons/power-light.svg";
import powerIconLight from "../assets/icons/power.svg";

const props = defineProps({
    showNavbar: {
        type: Boolean,
        default: false,
    },
    isDarkMode: {
        type: Boolean,
        default: false,
    },
    activeSection: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["toggle-dark-mode"]);

const isMobileMenuOpen = ref(false);

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};
</script>

<template>
    <Transition name="fade-down">
        <nav v-if="showNavbar"
            class="fixed top-4 left-4 right-4 z-50 py-3 px-4 sm:px-8 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-xl rounded-2xl transition-all duration-500 ease-in-out"
            data-aos="fade-down">
            <div class="relative flex items-center justify-between w-full">
                <a href="#"
                    class="font-bold text-lg text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                    Ariyoaziz_
                </a>

                <div class="hidden sm:flex absolute left-1/2 -translate-x-1/2 gap-6 items-center">
                    <a href="#about" @click="closeMobileMenu" :class="[
                        'text-sm font-medium relative transition-colors duration-200',
                        activeSection === 'about'
                            ? 'text-blue-600 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300',
                        'hover:text-blue-600 dark:hover:text-blue-400',
                    ]">
                        About
                        <span v-if="activeSection === 'about'"
                            class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-300 rounded-full"></span>
                    </a>
                    <a href="#projects" @click="closeMobileMenu" :class="[
                        'text-sm font-medium relative transition-colors duration-200',
                        activeSection === 'projects'
                            ? 'text-blue-600 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300',
                        'hover:text-blue-600 dark:hover:text-blue-400',
                    ]">
                        Projects
                        <span v-if="activeSection === 'projects'"
                            class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-300 rounded-full"></span>
                    </a>
                    <a href="#contact" @click="closeMobileMenu" :class="[
                        'text-sm font-medium relative transition-colors duration-200',
                        activeSection === 'contact'
                            ? 'text-blue-600 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300',
                        'hover:text-blue-600 dark:hover:text-blue-400',
                    ]">
                        Contact
                        <span v-if="activeSection === 'contact'"
                            class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-300 rounded-full"></span>
                    </a>
                </div>

                <a href="/src/assets/pdf/Ariyo Aziz Pratama_CV.pdf" download
                    class="hidden md:inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-b from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 transition-all duration-300 shadow-md whitespace-nowrap items-center justify-center gap-2">
                    <i class="fa-solid fa-file-arrow-down"></i> Unduh CV
                </a>

                <button class="sm:hidden text-gray-800 dark:text-gray-100"
                    @click="isMobileMenuOpen = !isMobileMenuOpen">
                    <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div v-if="isMobileMenuOpen"
                class="sm:hidden mt-4 flex flex-col gap-4 items-center text-sm font-medium text-gray-800 dark:text-gray-200 transition-all">
                <a href="#about" @click="closeMobileMenu">About</a>
                <a href="#projects" @click="closeMobileMenu">Projects</a>
                <a href="#contact" @click="closeMobileMenu">Contact</a>
                <a href="/src/assets/pdf/Ariyo Aziz Pratama_CV.pdf" download
                    class="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-b from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 transition-all duration-300 shadow-md whitespace-nowrap inline-flex items-center justify-center gap-2">
                    <i class="fa-solid fa-file-arrow-down"></i> Unduh CV
                </a>
            </div>
        </nav>
    </Transition>

    <button v-if="showNavbar" @click="emit('toggle-dark-mode')" :class="`fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center
            ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`" aria-label="Toggle display mode">
        <img :src="isDarkMode ? powerIconLight : powerIconDark" alt="Mode switch icon" class="w-5 h-5" />
    </button>
</template>

<style scoped>
/* Navbar specific styles */
.fade-down-enter-active,
.fade-down-leave-active {
    transition: all 0.5s ease-in-out;
}

.fade-down-enter-from,
.fade-down-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
