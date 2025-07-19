<script setup>
// Import semua section components yang sudah Anda pisahkan
import HomeSection from '../components/HomeSection.vue';
import AboutSection from '../components/AboutSection.vue';
import ProjectsSection from '../components/ProjectsSection.vue';
import ContactSection from '../components/ContactSection.vue';
import TheNavbar from '../components/TheNavbar.vue';
import TheLoadingOverlay from '../components/TheLoadingOverlay.vue';
import TheFooter from '../components/TheFooter.vue';

import { ref, onMounted, onUnmounted, inject } from 'vue';

// Inject global state from App.vue
const isDarkMode = inject('isDarkMode');
const toggleDarkMode = inject('toggleDarkMode');

// State untuk navbar dan loading (logika scroll ini tetap di HomePage karena dia yang mengelola semua section)
const showNavbar = ref(false);
const activeSection = ref('');
const isLoading = ref(true);

/**
 * Mengelola event scroll untuk memperbarui visibilitas navbar dan bagian yang aktif.
 */
const handleScroll = () => {
    showNavbar.value = window.scrollY > window.innerHeight * 0.8;

    const sections = ['home-main-wrapper', 'about', 'projects', 'contact'];
    const scrollPosition = window.scrollY + window.innerHeight * 0.3;

    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection.value = sectionId;
                break;
            }
            if (sectionId === 'home-main-wrapper' && scrollPosition < sectionBottom) {
                activeSection.value = sectionId;
            }
        }
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    setTimeout(() => {
        isLoading.value = false;
    }, 2500);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <TheLoadingOverlay :is-loading="isLoading" />

    <div :class="{ 'animate-fade-in-page': !isLoading }" v-cloak>
        <TheNavbar :show-navbar="showNavbar" :is-dark-mode="isDarkMode" :active-section="activeSection"
            @toggle-dark-mode="toggleDarkMode" />

        <HomeSection :is-dark-mode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
        <AboutSection :is-dark-mode="isDarkMode" />
        <ProjectsSection :is-dark-mode="isDarkMode" />
        <ContactSection :is-dark-mode="isDarkMode" />
        <TheFooter :is-dark-mode="isDarkMode" />
    </div>
</template>

<style scoped>
.animate-fade-in-page {
    animation: fade-in 1s ease-out forwards;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

[v-cloak] {
    display: none;
}
</style>
