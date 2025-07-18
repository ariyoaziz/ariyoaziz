<script setup>
import { ref, onMounted, onUnmounted, inject, computed, watch } from 'vue';
import profileImage from '../assets/images/profile.png';
import powerIconDark from '../assets/icons/power-light.svg';
import powerIconLight from '../assets/icons/power.svg';
import instagramIconLight from '../assets/icons/ig-light.svg';
import instagramIconDark from '../assets/icons/ig-dark.svg';
import linkedinIconLight from '../assets/icons/in-light.svg';
import linkedinIconDark from '../assets/icons/in-dark.svg';
import behanceIconLight from '../assets/icons/be-light.svg';
import behanceIconDark from '../assets/icons/be-dark.svg';
import githubIconLight from '../assets/icons/git-light.svg';
import githubIconDark from '../assets/icons/git-dark.svg';

// Injected properties for dark mode, provided by a parent component
const isDarkMode = inject('isDarkMode', ref(false));
const toggleDarkMode = inject('toggleDarkMode', () => console.warn('toggleDarkMode function not provided'));

// Reactive state for UI elements
const showNavbar = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref('');
const isLoading = ref(true);

// Data for the typing effect
const texts = [
  'Designing beautiful interfaces',
  'Building Android apps with Flutter',
  'Crafting user experiences',
  'Exploring UI/UX & Mobile Dev',
  'Student at Universitas Teknologi Yogyakarta',
];
const activeText = ref('');
let textIndex = 0;
let typingEffectLoop = null; // Stores the timeout ID for clearing

/**
 * Implements a typewriter effect for the 'texts' array.
 * Types out each string, pauses, then backspaces before moving to the next.
 */
const typeWriterEffect = async () => {
  if (typingEffectLoop) {
    clearTimeout(typingEffectLoop); // Clear any existing loop to prevent duplicates
  }

  textIndex = 0; // Reset text index
  activeText.value = ''; // Clear current text

  const runTypingIteration = async () => {
    const currentText = texts[textIndex];

    // Type out the current text
    for (let i = 0; i <= currentText.length; i++) {
      activeText.value = currentText.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, 70)); // Typing speed
    }
    await new Promise(resolve => setTimeout(resolve, 1500)); // Pause after typing

    // Backspace the current text
    for (let i = currentText.length; i >= 0; i--) {
      activeText.value = currentText.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, 40)); // Backspacing speed
    }

    // Move to the next text in the array, looping back to the start if at the end
    textIndex = (textIndex + 1) % texts.length;
    typingEffectLoop = setTimeout(runTypingIteration, 500); // Delay before typing next text
  };

  runTypingIteration(); // Start the typing effect
};

// Social media links
const socialLinks = [
  { href: 'https://instagram.com/ariyoaziz_', iconLight: instagramIconLight, iconDark: instagramIconDark, label: 'Instagram' },
  { href: 'https://linkedin.com/in/ariyo-aziz-pratama', iconLight: linkedinIconLight, iconDark: linkedinIconDark, label: 'LinkedIn' },
  { href: 'https://behance.net/ariyoaziz_', iconLight: behanceIconLight, iconDark: behanceIconDark, label: 'Behance' },
  { href: 'https://github.com/ariyoaziz', iconLight: githubIconLight, iconDark: githubIconDark, label: 'GitHub' },
];

/**
 * Scrolls the view to the 'about' section.
 */
const goToNextPage = () => {
  const nextSection = document.getElementById('about');
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Handles scroll events to update navbar visibility and active section.
 */
const handleScroll = () => {
  // Show navbar when scrolled down more than 40% of the viewport height
  showNavbar.value = window.scrollY > window.innerHeight * 0.4;

  const sections = ['home-main-wrapper', 'about', 'projects', 'contact'];
  // Adjust scroll position to activate section slightly before it's fully in view
  const scrollPosition = window.scrollY + window.innerHeight * 0.3;

  for (const sectionId of sections) {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection.value = sectionId;
        break; // Found the active section, stop checking
      }
      // Special case for the home section at the very top
      if (sectionId === 'home-main-wrapper' && scrollPosition < sectionBottom) {
        activeSection.value = sectionId;
      }
    }
  }
};

/**
 * Closes the mobile navigation menu.
 */
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// --- NEW LOGIC: Automatic Age Calculation ---
const birthDate = new Date('2004-03-18');

/**
 * Computes the current age based on the birthDate.
 * This is a computed property, so it will automatically re-calculate if birthDate changes (though it's static here).
 */
const calculatedAge = computed(() => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});
// ... (bagian import dan reactive state lainnya)

const techLogos = [
  {
    category: 'Programming Languages', // Kategori BARU
    logos: [
      { name: 'JavaScript', src: '/images/logos/javascript.png' }, // Dipindahkan dari Frontend
      { name: 'Dart', src: '/images/logos/dart.png' },             // Dipindahkan dari Mobile Development
      { name: 'Python', src: '/images/logos/python.png' },         // Tambahkan jika Anda menguasai Python
      { name: 'PHP', src: '/images/logos/php.png' },               // Tambahkan jika Anda menguasai PHP
    ]
  },
  {
    category: 'UI/UX Design',
    logos: [
      { name: 'Figma', src: '/images/logos/figma.png' },
      { name: 'Photoshop', src: '/images/logos/photoshop.png' },
      { name: 'Canva', src: '/images/logos/canva.png' },
    ]
  },
  {
    category: 'Frontend Development',
    logos: [
      { name: 'HTML', src: '/images/logos/html.png' },
      { name: 'CSS', src: '/images/logos/css.png' },
      { name: 'Tailwind CSS', src: '/images/logos/tailwindcss.png' },
      { name: 'Bootstrap', src: '/images/logos/bootstrap.png' },
      { name: 'Vue.js', src: '/images/logos/vuejs.png' },
      { name: 'React', src: '/images/logos/react.png' },
    ]
  },
  {
    category: 'Backend Development',
    logos: [
      { name: 'Flask', src: '/images/logos/flask.png' },
      { name: 'Django', src: '/images/logos/django.png' },
      { name: 'Laravel', src: '/images/logos/laravel.png' },
      { name: 'CodeIgniter', src: '/images/logos/codeigniter.png' },
    ]
  },
  {
    category: 'Mobile Development',
    logos: [
      { name: 'Flutter', src: '/images/logos/flutter.png' },
      { name: 'Android Studio', src: '/images/logos/android-studio.png' },
    ]
  },
  {
    category: 'Database',
    logos: [
      { name: 'MySQL', src: '/images/logos/mysql.png' },
      { name: 'PostgreSQL', src: '/images/logos/postgresql.png' },
    ]
  },
  {
    category: 'Version Control & Tools',
    logos: [
      { name: 'Git', src: '/images/logos/git.png' },
      { name: 'GitHub', src: '/images/logos/github.png' },
      { name: 'VS Code', src: '/images/logos/vscode.png' },
      { name: 'Google Colab', src: '/images/logos/google-colab.png' },
    ]
  },
];
// ==== Data Awal ====
const filterLabels = ref([
  { name: 'All', active: true },
  { name: 'UI/UX Design', active: false },
  { name: 'Frontend', active: false },
  { name: 'Backend', active: false },
  { name: 'Mobile Application', active: false },
  { name: 'Photography', active: false },
]);

const activeFilterCategory = ref('All');
const projectsData = ref([
  {
    title: 'Mobile Banking App Redesign',
    description: 'Redesain UI/UX untuk aplikasi mobile banking, meningkatkan pengalaman pengguna dan navigasi.',
    imageSrc: '/images/projects/mobile-banking.png',
    techTags: ['UI/UX Design', 'Figma', 'Mobile Application'],
    projectUrl: '#'
  },
  {
    title: 'E-commerce Website Frontend',
    description: 'Pengembangan antarmuka pengguna untuk toko online menggunakan teknologi frontend modern.',
    imageSrc: '/images/projects/ecommerce-web.png',
    techTags: ['Frontend', 'Vue.js', 'Tailwind CSS', 'API Integration'],
    projectUrl: '#'
  },
  {
    title: 'Realtime Chat Application',
    description: 'Aplikasi chat real-time dengan fitur pesan instan, notifikasi, dan manajemen user.',
    imageSrc: '/images/projects/chat-app.png',
    techTags: ['Mobile Application', 'Flutter', 'Firebase', 'Backend'],
    projectUrl: '#'
  },
  {
    title: 'Portfolio Website v2',
    description: 'Pembangunan ulang website portofolio pribadi dengan desain modern dan optimasi performa.',
    imageSrc: '/images/projects/portfolio-v2.png',
    techTags: ['Frontend', 'Vue.js', 'Responsive Design'],
    projectUrl: '#'
  },
  {
    title: 'Simple To-Do List API',
    description: 'Pengembangan RESTful API sederhana untuk aplikasi manajemen tugas.',
    imageSrc: '/images/projects/todo-api.png',
    techTags: ['Backend', 'Flask', 'Python', 'REST API'],
    projectUrl: '#'
  },
  {
    title: 'Company Landing Page',
    description: 'Desain dan implementasi landing page konversi tinggi untuk perusahaan startup.',
    imageSrc: '/images/projects/landing-page.png',
    techTags: ['UI/UX Design', 'Web Design', 'Canva'],
    projectUrl: '#'
  },
  {
    title: 'Portfolio Website v2',
    description: 'Pembangunan ulang website portofolio pribadi dengan desain modern dan optimasi performa.',
    imageSrc: '/images/projects/portfolio-v2.png',
    techTags: ['Frontend', 'Vue.js', 'Responsive Design'],
    projectUrl: '#'
  },
  {
    title: 'Simple To-Do List API',
    description: 'Pengembangan RESTful API sederhana untuk aplikasi manajemen tugas.',
    imageSrc: '/images/projects/todo-api.png',
    techTags: ['Backend', 'Flask', 'Python', 'REST API'],
    projectUrl: '#'
  },
  {
    title: 'Company Landing Page',
    description: 'Desain dan implementasi landing page konversi tinggi untuk perusahaan startup.',
    imageSrc: '/images/projects/landing-page.png',
    techTags: ['UI/UX Design', 'Web Design', 'Canva'],
    projectUrl: '#'
  },
]);
const itemsPerPage = 6;
const currentPage = ref(1);

const filteredProjects = computed(() => {
  if (activeFilterCategory.value === 'All') {
    return projectsData.value;
  }
  return projectsData.value.filter(project =>
    project.techTags.includes(activeFilterCategory.value)
  );
});


const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProjects.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage);
});

watch(filteredProjects, () => {
  currentPage.value = 1;
});

const filterProjects = (categoryName) => {
  activeFilterCategory.value = categoryName;
  filterLabels.value.forEach(label => {
    label.active = (label.name === categoryName);
  });
};

// ==== Utility: Class untuk Label ====
const getLabelClass = (label) => {
  if (label.active) {
    return 'bg-blue-600 text-white dark:bg-blue-700 dark:text-white border-blue-600 dark:border-blue-700';
  }

  return isDarkMode.value
    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300';
};



// --- HOOK LIFECYCLE onMounted (TAMBAHKAN console.log INI) ---
onMounted(() => {
  // DEBUGGING: Cek nilai filterLabels.value di konsol
  console.log('--- DEBUGGING filterLabels data ---');
  console.log('filterLabels.value saat onMounted:', filterLabels.value);
  console.log('Apakah filterLabels.value kosong?', filterLabels.value.length === 0);
  console.log('--- AKHIR DEBUGGING ---');

  // ... (sisa logika onMounted Anda, seperti typeWriterEffect, handleScroll, isLoading)
});

// Lifecycle hooks
onMounted(() => {
  typeWriterEffect(); // Start the typing animation
  window.addEventListener('scroll', handleScroll); // Attach scroll listener
  handleScroll(); // Call once on mount to set initial active section

  // Simulate loading time for the overlay
  setTimeout(() => {
    isLoading.value = false;
  }, 2500);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll); // Clean up scroll listener
  if (typingEffectLoop) {
    clearTimeout(typingEffectLoop); // Clear the typing effect timeout
  }
});

onMounted(() => {
  console.log('isDarkMode:', isDarkMode.value);
  console.log('filterLabels:', filterLabels.value);
  console.log('filteredProjects:', filteredProjects.value);
  console.log('paginatedProjects:', paginatedProjects.value);
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
          style="animation-delay: 0.2s;">.</span><span class="animate-dots" style="animation-delay: 0.4s;">.</span>
      </p>
    </div>
  </Transition>

  <div :class="{ 'animate-fade-in-page': !isLoading }" v-cloak>
    <nav v-if="showNavbar"
      class="fixed top-4 left-4 right-4 z-50 py-3 px-4 sm:px-8 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-xl rounded-2xl transition-all duration-500 ease-in-out"
      data-aos="fade-down">
      <div class="relative flex items-center justify-between w-full">
        <!-- Logo -->
        <a href="#"
          class="font-bold text-lg text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
          Ariyoaziz_
        </a>

        <!-- Middle Navigation (hidden on mobile) -->
        <div class="hidden sm:flex absolute left-1/2 -translate-x-1/2 gap-6 items-center">
          <a href="#about" @click="closeMobileMenu" :class="[
            'text-sm font-medium relative transition-colors duration-200',
            activeSection === 'about' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300',
            'hover:text-blue-600 dark:hover:text-blue-400'
          ]">
            About
            <span v-if="activeSection === 'about'"
              class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-300 rounded-full"></span>
          </a>
          <a href="#projects" @click="closeMobileMenu" :class="[
            'text-sm font-medium relative transition-colors duration-200',
            activeSection === 'projects' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300',
            'hover:text-blue-600 dark:hover:text-blue-400'
          ]">
            Projects
            <span v-if="activeSection === 'projects'"
              class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-300 rounded-full"></span>
          </a>
          <a href="#contact" @click="closeMobileMenu" :class="[
            'text-sm font-medium relative transition-colors duration-200',
            activeSection === 'contact' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300',
            'hover:text-blue-600 dark:hover:text-blue-400'
          ]">
            Contact
            <span v-if="activeSection === 'contact'"
              class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-300 rounded-full"></span>
          </a>
        </div>

        <!-- CV Button (only desktop) -->
        <a href="/path/to/your/cv.pdf" download
          class="hidden sm:flex px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-b from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 transition-all duration-300 shadow-md gap-2 items-center">
          Unduh CV
        </a>

        <!-- Mobile Burger Icon -->
        <button class="sm:hidden text-gray-800 dark:text-gray-100" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Items -->
      <div v-if="isMobileMenuOpen"
        class="sm:hidden mt-4 flex flex-col gap-4 items-center text-sm font-medium text-gray-800 dark:text-gray-200 transition-all">
        <a href="#about" @click="closeMobileMenu">About</a>
        <a href="#projects" @click="closeMobileMenu">Projects</a>
        <a href="#contact" @click="closeMobileMenu">Contact</a>
        <a href="/path/to/your/cv.pdf" download
          class="mt-2 px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
          Unduh CV
        </a>
      </div>
    </nav>


    <button v-if="showNavbar" @click="toggleDarkMode" :class="`fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center 
            ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`" aria-label="Toggle display mode">
      <img :src="isDarkMode ? powerIconLight : powerIconDark" alt="Mode switch icon" class="w-5 h-5" />
    </button>

    <section id="home-main-wrapper"
      class="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
      <div :class="`absolute top-0 left-0 w-full h-full z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-20`"></div>
      <div
        class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center">
      </div>

      <div class="flex flex-col items-center justify-center z-10 py-8 sm:py-12" data-aos="fade-up" data-aos-delay="100">
        <div class="relative text-center mb-8">
          <div class="flex justify-center items-center w-40 h-40 sm:w-48 sm:h-48" data-aos="zoom-in"
            data-aos-delay="200">
            <div :class="`w-25 h-25 ${isDarkMode ? 'bg-[#E9ECEF]' : 'bg-[#212529]'} rounded-t-full shadow-xl`"></div>
            <img :src="profileImage" alt="Ariyo Aziz Pratama profile"
              class="w-full h-full object-contain absolute top-0 left-1/2 transform -translate-x-1/2" />
          </div>
        </div>

        <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mt-0 text-center mb-2"
          :class="{ 'text-white hover:text-gray-300': isDarkMode, 'text-gray-900 hover:text-gray-600': !isDarkMode }">
          Ariyo Aziz Pratama
        </h1>

        <p class="text-sm sm:text-base lg:text-lg w-full flex justify-center items-center mb-4"
          :class="{ 'text-white': isDarkMode, 'text-gray-900': !isDarkMode }">
          {{ activeText }}<span class="cursor ml-1"></span>
        </p>

        <div class="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 my-6 rounded-full"
          data-aos="zoom-in" data-aos-delay="500"></div>

        <p class="text-gray-700 text-xs sm:text-sm dark:text-gray-400 mb-6" data-aos="fade-up" data-aos-delay="600">Mari
          terhubung!</p>

        <div class="flex space-x-4 sm:space-x-6 mt-0 mb-8" data-aos="fade-up" data-aos-delay="700">
          <div v-for="link in socialLinks" :key="link.label" class="flex flex-col items-center" data-aos="fade-up"
            :data-aos-delay="700 + (socialLinks.indexOf(link) * 100)">
            <a :href="link.href" target="_blank" rel="noopener noreferrer" :aria-label="`Visit ${link.label} profile`">
              <img :src="isDarkMode ? link.iconLight : link.iconDark" :alt="`${link.label} icon`"
                class="w-6 h-6 hover:scale-125 hover:rotate-6 transition-transform" />
            </a>
            <p class="text-xs mt-2" :class="{ 'text-white': isDarkMode, 'text-gray-900': !isDarkMode }">{{ link.label }}
            </p>
          </div>
        </div>

        <div class="mt-0 flex flex-col items-center mb-10" data-aos="fade-up" data-aos-delay="800">
          <p class="text-[0.6rem] sm:text-sm text-gray-700 dark:text-gray-400 text-center max-w-xs">
            Dark mode untuk yang chill, light mode buat yang fresh. Kamu tim mana?
          </p>
          <button @click="toggleDarkMode"
            :class="`w-10 h-10 rounded-full flex items-center justify-center mt-4 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`"
            aria-label="Toggle display mode">
            <img :src="isDarkMode ? powerIconLight : powerIconDark" alt="Mode switch icon" class="w-5 h-5" />
          </button>
        </div>

        <div class="absolute bottom-4 animate-bounce" data-aos="fade-up" data-aos-delay="900">
          <button @click="goToNextPage"
            class="px-6 py-3 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            Klik untuk Melanjutkan &darr;
          </button>
        </div>
      </div>
    </section>

    <section id="about"
      class="relative flex flex-col items-center text-gray-900 dark:text-gray-100 py-16 px-4 min-h-screen overflow-hidden">
      <div :class="`absolute top-0 left-0 w-full h-full z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-20`"></div>
      <div
        class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center">
      </div>
      <h2 class="text-4xl sm:text-5xl font-extrabold mb-12 text-center relative z-10 transition-colors duration-300"
        :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">About Me</h2>

      <div class="w-full max-w-5xl px-4 flex-grow relative z-10">
        <div class="md:flex md:space-x-12 mb-12">
          <div class="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right" data-aos-delay="100">
            <h3 class="text-3xl font-extrabold mb-6 text-center md:text-left transition-colors duration-300"
              :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Profile</h3>
            <ul class="space-y-4">
              <li class="flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                <svg class="h-6 w-6 text-blue-700 dark:text-blue-500 flex-shrink-0 transition-colors duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                  <span class="font-semibold"
                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Full Name:</span> Ariyo Aziz
                  Pratama
                </p>
              </li>
              <li class="flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                <svg class="h-6 w-6 text-blue-700 dark:text-blue-500 flex-shrink-0 transition-colors duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                  <span class="font-semibold"
                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Age:</span> {{ calculatedAge
                    }} Years
                </p>
              </li>
              <li class="flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                <svg class="h-6 w-6 text-blue-700 dark:text-blue-500 flex-shrink-0 transition-colors duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                  <span class="font-semibold"
                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Status:</span> Mahasiswa
                </p>
              </li>
              <li class="flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                <svg class="h-6 w-6 text-blue-700 dark:text-blue-500 flex-shrink-0 transition-colors duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21a2 2 0 012 2v10a2 2 0 01-2 2h-7.5l-1-1H3z" />
                </svg>
                <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                  <span class="font-semibold"
                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Nationality:</span> Indonesia
                </p>
              </li>
              <li class="flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                <svg class="h-6 w-6 text-blue-700 dark:text-blue-500 flex-shrink-0 transition-colors duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                  <span class="font-semibold"
                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Address:</span> Central Java
                </p>
              </li>
              <li class="flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                <svg class="h-6 w-6 text-blue-700 dark:text-blue-500 flex-shrink-0 transition-colors duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                  <span class="font-semibold"
                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Email:</span>
                  <a href="mailto:ariyoaziz.pratama@gmail.com"
                    class="text-blue-700 dark:text-blue-500 hover:underline transition-colors duration-300">ariyoaziz.pratama@gmail.com</a>
                </p>
              </li>
            </ul>
            <div class="mt-8 text-center md:text-left" data-aos="fade-up" data-aos-delay="200">
              <a href="/path/to/your/cv.pdf" download @click="closeMobileMenu" class="px-3 py-2 rounded-full text-sm font-semibold /* Adjusted to */
              bg-gradient-to-b from-blue-500 to-blue-700 text-white
              hover:from-blue-600 hover:to-blue-800
              dark:from-blue-600 dark:to-blue-800
              dark:hover:from-blue-700 dark:hover:to-blue-900
              transition-all duration-300 shadow-md whitespace-nowrap
              inline-flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM9 4a1 1 0 011 1v7a1 1 0 11-2 0V5a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Unduh CV
              </a>
            </div>
          </div>

          <div class="md:w-1/2" data-aos="fade-left" data-aos-delay="300">
            <h3 class="text-3xl font-extrabold mb-6 text-center md:text-left transition-colors duration-300"
              :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Hello There!</h3>
            <div class="space-y-4 leading-relaxed text-base"
              :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
              <p>I am an enthusiastic student pursuing a degree in Computer Science at the University of Technology
                Yogyakarta, Faculty of Science and Technology. With a strong foundation in technology, I am actively
                developing my programming and problem-solving skills.</p>
              <p>Throughout my academic journey, I am committed to enhancing my skills and knowledge in the IT field. I
                believe that continuous learning is key to success in the ever-evolving technology industry.</p>
              <p>I aspire to continue growing as a professional in IT and to make meaningful contributions to the
                industry. Feel free to connect and share ideas!</p>
            </div>
          </div>
        </div>

        <div class="mb-12" data-aos="fade-up" data-aos-delay="400">
          <h3 class="text-2xl font-bold mb-8 text-center transition-colors duration-300"
            :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">Education</h3>

          <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li class="p-5 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm border" :class="{
              // Light mode - lebih glossy
              'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
              // Dark mode - tetap lembut
              'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
            }">

              <p class="font-semibold text-lg mb-1"
                :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Universitas Teknologi Yogyakarta
              </p>
              <p class="text-sm mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">S1 - Teknik
                Informatika</p>

              <p class="text-sm mt-3" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                Mempelajari dasar-dasar ilmu komputer, algoritma, struktur data, dan pengembangan perangkat lunak.
              </p>

              <p class="text-xs mt-3" :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">2023 -
                Sekarang</p>
            </li>

            <li class="p-5 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm border" :class="{
              // Light mode - lebih glossy
              'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
              // Dark mode - tetap lembut
              'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
            }">

              <p class="font-semibold text-lg mb-1"
                :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">SMK N 1 Kebumen</p>
              <p class="text-sm mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Rekayasa
                Perangkat Lunak</p>

              <p class="text-sm mt-3" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                Fokus pada pengembangan aplikasi web dan mobile, serta dasar-dasar rekayasa perangkat lunak.
              </p>

              <p class="text-xs mt-3" :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">2020 - 2023
              </p>
            </li>
          </ul>
        </div>

        <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
          <h3 class="text-2xl font-bold mb-8 text-center transition-colors duration-300"
            :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">Certificates</h3>

          <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li
              class="p-5 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm flex flex-col justify-between border"
              :class="{
                // Light mode - lebih glossy
                'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
                // Dark mode - tetap lembut
                'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
              }">

              <div>
                <p class="font-semibold text-lg mb-1"
                  :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Google Career Certificates - UX
                  Design</p>
                <p class="text-sm mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Coursera
                </p>

                <p class="text-sm mt-3" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                  Mempelajari prinsip dasar desain UX, riset pengguna, ideasi, wireframing, prototyping, dan pengujian.
                </p>

                <p class="text-xs mt-3" :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">Desember
                  2024</p>
              </div>

              <a href="#" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 mt-4 text-sm rounded-full font-semibold
                      bg-gradient-to-b from-blue-500 to-blue-700 text-white /* Gradien Light Mode */
                      hover:from-blue-600 hover:to-blue-800 /* Hover Light Mode */
                      dark:from-blue-600 dark:to-blue-800 /* Gradien Dark Mode */
                      dark:hover:from-blue-700 dark:hover:to-blue-900 /* Hover Dark Mode */
                      transition-all duration-300 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Lihat Sertifikat
              </a>
            </li>

            <li
              class="p-5 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm flex flex-col justify-between border"
              :class="{
                // Light mode - lebih glossy
                'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
                // Dark mode - tetap lembut
                'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
              }">

              <div>
                <p class="font-semibold text-lg mb-1"
                  :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Flutter Development Bootcamp
                </p>
                <p class="text-sm mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Udemy</p>

                <p class="text-sm mt-3" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                  Menguasai dasar-dasar pengembangan aplikasi mobile lintas platform menggunakan Flutter dan Dart.
                </p>

                <p class="text-xs mt-3" :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">Maret
                  2024</p>
              </div>

              <a href="#" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 mt-4 text-sm rounded-full font-semibold
                      bg-gradient-to-b from-blue-500 to-blue-700 text-white /* Gradien Light Mode */
                      hover:from-blue-600 hover:to-blue-800 /* Hover Light Mode */
                      dark:from-blue-600 dark:to-blue-800 /* Gradien Dark Mode */
                      dark:hover:from-blue-700 dark:hover:to-blue-900 /* Hover Dark Mode */
                      transition-all duration-300 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Lihat Sertifikat
              </a>
            </li>
          </ul>
        </div>

        <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
          <h3 class="text-2xl font-bold mb-8 text-center transition-colors duration-300"
            :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">Experience</h3>

          <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li
              class="p-5 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm flex flex-col justify-between border"
              :class="{
                // Light mode - lebih glossy
                'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
                // Dark mode - tetap lembut
                'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
              }">
              <div>
                <p class="font-semibold text-lg mb-1"
                  :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">UI/UX Designer Intern - [Nama
                  Perusahaan]</p>
                <p class="text-sm mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                  Yogyakarta</p>
                <p class="text-xs mb-3" :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">Juni 2025
                  - Agustus 2025</p>
                <ul class="list-disc list-inside mt-3 space-y-1 text-sm"
                  :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                  <li>Melakukan riset pengguna dan analisis kompetitor untuk produk mobile.</li>
                  <li>Membuat wireframe, mockup, dan prototipe interaktif menggunakan Figma.</li>
                  <li>Berkolaborasi dengan tim pengembang untuk memastikan implementasi desain yang akurat.</li>
                </ul>
              </div>
            </li>
            <li
              class="p-5 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm flex flex-col justify-between border"
              :class="{
                // Light mode - lebih glossy
                'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
                // Dark mode - tetap lembut
                'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
              }">
              <div>
                <p class="font-semibold text-lg mb-1"
                  :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">Freelance Mobile App Developer
                  - [Proyek Spesifik]</p>
                <p class="text-sm mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Remote
                </p>
                <p class="text-xs mb-3" :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">Maret
                  2024 - Mei 2024</p>
                <ul class="list-disc list-inside mt-3 space-y-1 text-sm"
                  :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                  <li>Mengembangkan aplikasi Android sederhana menggunakan Flutter/Dart.</li>
                  <li>Mengelola database lokal dan integrasi API dasar.</li>
                  <li>Melakukan debugging dan pengujian untuk memastikan fungsionalitas.</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
          <h4 class="text-xl font-semibold mb-6 text-center transition-colors duration-300"
            :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">Tools & Technologies</h4>
        </div>
        <div class="mb-12" data-aos="fade-up" data-aos-delay="300">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div v-for="(categoryData, index) in techLogos" :key="categoryData.category"
              class="p-5 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm border" :class="{
                // Light mode - lebih glossy
                'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
                // Dark mode - tetap lembut
                'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
              }">

              <h5 class="text-lg font-medium mb-4" :class="{
                'text-gray-800': !isDarkMode,
                'text-gray-200': isDarkMode,
              }">
                {{ categoryData.category }}
              </h5>

              <div class="flex flex-wrap justify-start items-center gap-4 mb-0">
                <div v-for="tech in categoryData.logos" :key="tech.name"
                  class="p-3 rounded-lg transition-all duration-300 flex items-center group gap-3 border"
                  :class="{ 'border-gray-700': !isDarkMode, 'border-gray-600': isDarkMode }">
                  <img :src="tech.src" :alt="tech.name + ' logo'"
                    class="w-10 h-10 object-contain hover:scale-110 hover:rotate-6 transition-transform duration-300" />
                  <p class="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    :class="{ 'text-black': !isDarkMode, 'text-gray-300': isDarkMode }">
                    {{ tech.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects"
      class="relative flex flex-col justify-center items-center text-gray-900 dark:text-gray-100 py-16 px-4 min-h-screen overflow-hidden">

      <!-- Background overlays -->
      <div class="absolute top-0 left-0 w-full h-full z-0"
        :class="isDarkMode ? 'bg-black opacity-20' : 'bg-gray-300 opacity-20'"></div>
      <div
        class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center">
      </div>
      <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-12 text-center relative z-10 transition-colors duration-300"
          :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">My Projects</h2>

        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
          <span v-for="label in filterLabels" :key="label.name" @click="filterProjects(label.name)"
            class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 border"
            :class="getLabelClass(label)">
            {{ label.name }}
          </span>
        </div>
        <!-- Project Cards -->
        <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl flex-grow relative z-10">
          <div v-for="(project, index) in paginatedProjects" :key="project.title"
            class="p-6 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm flex flex-col text-center border"
            :class="{
              // Light mode - lebih glossy
              'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
              // Dark mode - tetap lembut
              'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
            }">
            <img :src="project.imageSrc" :alt="`${project.title} screenshot`"
              class="w-full h-40 object-cover rounded-lg mb-4 border border-gray-200 dark:border-gray-700" />

            <h3 class="text-xl font-bold mb-3 transition-colors duration-300"
              :class="isDarkMode ? 'text-gray-100' : 'text-gray-900'">
              {{ project.title }}
            </h3>

            <p class="text-sm mb-5 transition-colors duration-300"
              :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap justify-center gap-2 mb-4 mt-auto">
              <span v-for="tag in project.techTags" :key="`${project.title}-${tag}`"
                class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                {{ tag }}
              </span>
            </div>

            <a :href="project.projectUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 mt-auto text-sm rounded-full font-semibold
                 bg-gradient-to-b from-blue-500 to-blue-700 text-white
                 hover:from-blue-600 hover:to-blue-800
                 dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900
                 transition-all duration-300 shadow-md">
              View Details &rarr;
            </a>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12 gap-2 z-10 relative">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="px-3 py-1 rounded border text-sm font-medium transition-all" :class="currentPage === 1
              ? 'cursor-not-allowed text-gray-400 border-gray-300'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-400'">
            &larr;
          </button>

          <button v-for="page in totalPages" :key="page" @click="currentPage = page"
            class="px-3 py-1 rounded border text-sm font-medium transition-all" :class="page === currentPage
              ? 'bg-blue-600 text-white dark:bg-blue-700 dark:text-white border-blue-600'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-400'">
            {{ page }}
          </button>

          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded border text-sm font-medium transition-all" :class="currentPage === totalPages
              ? 'cursor-not-allowed text-gray-400 border-gray-300'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-400'">
            &rarr;
          </button>
        </div>
      </div>
    </section>


    <section id="contact"
      class="relative flex flex-col justify-center items-center text-gray-900 dark:text-gray-100 py-16 px-4 min-h-screen overflow-hidden">
      <!-- Background Overlay -->
      <div :class="`absolute top-0 left-0 w-full h-full z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-20`"></div>
      <div
        class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center opacity-10 dark:opacity-10">
      </div>
      <!-- Section Title -->
      <div class="mb-12" data-aos="fade-up" data-aos-delay="400">
        <h2 class="text-4xl sm:text-5xl font-extrabold text-center mb-12 transition-colors duration-300"
          :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
          Get In Touch
        </h2>
        <!-- Contact Container Tanpa Card -->
        <div class="w-full max-w-5xl relative z-10 space-y-16">

          <!-- Deskripsi -->
          <p class="text-center leading-relaxed max-w-3xl mx-auto"
            :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
            Saya selalu terbuka untuk peluang kolaborasi, proyek menarik, atau sekadar obrolan tentang desain dan
            teknologi.
            Jangan ragu untuk menghubungi saya!
          </p>
        </div>
      </div>

      <!-- Card Wrapper -->
      <div class="mt-10 w-full max-w-4xl grid md:grid-cols-2 gap-10 relative z-10">

        <!-- Form Card -->
        <div class="mb-12" data-aos="fade-right" data-aos-delay="400">
          <div class="rounded-2xl p-6 border shadow-md text-center transition-colors duration-300" :class="{
            // Light mode - lebih glossy
            'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
            // Dark mode - tetap lembut
            'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
          }">
            <h3 class="text-2xl font-bold mb-6">Contact Form</h3>
            <form class="space-y-5 text-left">
              <div>
                <label for="name" class="block text-sm font-medium mb-1"
                  :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Nama Lengkap</label>
                <input type="text" id="name" name="name" placeholder="Nama Anda"
                  class="w-full p-3 rounded-md border focus:ring focus:ring-blue-400 transition" :class="{
                    'bg-white text-gray-900 border-gray-300': !isDarkMode,
                    'bg-gray-700 text-white border-gray-600': isDarkMode
                  }" />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium mb-1"
                  :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Email</label>
                <input type="email" id="email" name="email" placeholder="email@example.com"
                  class="w-full p-3 rounded-md border focus:ring focus:ring-blue-400 transition" :class="{
                    'bg-white text-gray-900 border-gray-300': !isDarkMode,
                    'bg-gray-700 text-white border-gray-600': isDarkMode
                  }" />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium mb-1"
                  :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Pesan Anda</label>
                <textarea id="message" name="message" rows="5" placeholder="Tulis pesan Anda..."
                  class="w-full p-3 rounded-md border focus:ring focus:ring-blue-400 transition" :class="{
                    'bg-white text-gray-900 border-gray-300': !isDarkMode,
                    'bg-gray-700 text-white border-gray-600': isDarkMode
                  }"></textarea>
              </div>

              <button type="submit" class="w-full px-6 py-3 rounded-full font-semibold text-white shadow-md flex items-center justify-center gap-2 transition-all duration-300
                bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800
                dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900">
                Kirim Pesan
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l4.453-1.483a1 1 0 00.644-.954V14a1 1 0 00-1-1H9a1 1 0 00-1 1v1.583c.091.201.24.38.425.527l.951.713a1 1 0 001.192.122l5-3a1 1 0 00.276-1.743L13 7.205V5a1 1 0 00-1-1h-1.112zM12 14.111L15.222 12 12 9.889V14.111z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <!-- Support My Work -->
        <div class="mb-12" data-aos="fade-left" data-aos-delay="400">
          <div
            class="rounded-2xl p-6 flex flex-col justify-center items-center text-centershadow-sm backdrop-blur-md transition-all duration-300 border"
            :class="{
              // Light mode - lebih glossy
              'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
              // Dark mode - tetap lembut
              'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
            }">
            <h3 class="text-2xl font-bold mb-2">Support My Work</h3>
            <p class="text-sm mb-4 max-w-xs leading-relaxed" :class="{
              'text-gray-700': !isDarkMode,
              'text-gray-300': isDarkMode
            }">
              Suka dengan portofolio saya? Yuk dukung saya dengan beli kopi!
            </p>
            <a href="https://ko-fi.com/yourprofile" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 mt-2 text-sm rounded-full font-semibold
              bg-gradient-to-b from-blue-500 to-blue-700 text-white
              hover:from-blue-600 hover:to-blue-800
              dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900
              transition-all duration-300 shadow-md">
              Belikan Kopi
            </a>

          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <!-- Footer -->
    <footer class="relative text-gray-900 dark:text-gray-100 py-6 px-4 overflow-hidden transition-colors duration-300">

      <!-- Background Overlay -->
      <div :class="`absolute top-0 left-0 w-full h-full z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-10`"></div>
      <div
        class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center opacity-5 dark:opacity-5">
      </div>

      <!-- Teks Footer -->
      <div class="relative z-10 text-center text-sm">
        &copy; {{ new Date().getFullYear() }} Ariyo Aziz. All rights reserved.
      </div>
    </footer>


  </div>

</template>

<style scoped>
.active-nav-link {
  position: relative;
  padding-bottom: 4px;
}

.active-nav-link span {
  transform: scaleX(1);
}

/* Animasi khusus untuk Loading Overlay */
/* Spinner */
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

/* Transisi Fade untuk Overlay */
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.7s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}

/* Animasi Titik-titik */
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

/* Vue v-cloak to prevent FOUC (Flash Of Unstyled Content) */
[v-cloak] {
  display: none;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.animate-scroll-left {
  animation: scroll-left 30s linear infinite;
  /* Sesuaikan durasi sesuai kecepatan yang diinginkan */
  padding-right: 2rem;
  /* Memberi sedikit spasi antar duplikat */
}

.flex-shrink-0 {
  flex-shrink: 0;
}
</style>