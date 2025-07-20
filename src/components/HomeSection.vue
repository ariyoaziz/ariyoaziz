<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import profileImage from '../assets/images/profile.png';
import powerIconDark from '../assets/icons/power-light.svg';
import powerIconLight from '../assets/icons/power.svg';
import { socialLinks } from '../data/socialLinks';

const props = defineProps({
    isDarkMode: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['toggle-dark-mode']);

const texts = [
    'Designing beautiful interfaces',
    'Building Android apps with Flutter',
    'Crafting user experiences',
    'Exploring UI/UX & Mobile Dev',
    'Student at Universitas Teknologi Yogyakarta',
];
const activeText = ref('');
let textIndex = 0;
let typingEffectLoop = null;

const typeWriterEffect = async () => {
    if (typingEffectLoop) {
        clearTimeout(typingEffectLoop);
    }

    textIndex = 0;
    activeText.value = '';

    const runTypingIteration = async () => {
        const currentText = texts[textIndex];
        for (let i = 0; i <= currentText.length; i++) {
            activeText.value = currentText.substring(0, i);
            await new Promise(resolve => setTimeout(resolve, 70));
        }
        await new Promise(resolve => setTimeout(resolve, 1500));
        for (let i = currentText.length; i >= 0; i--) {
            activeText.value = currentText.substring(0, i);
            await new Promise(resolve => setTimeout(resolve, 40));
        }
        textIndex = (textIndex + 1) % texts.length;
        typingEffectLoop = setTimeout(runTypingIteration, 500);
    };

    runTypingIteration();
};

const goToNextPage = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(() => {
    typeWriterEffect();
});

onUnmounted(() => {
    if (typingEffectLoop) {
        clearTimeout(typingEffectLoop);
    }
});
</script>

<template>
    <section id="home-main-wrapper"
        class="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
        <div :class="`absolute top-0 left-0 w-full h-full z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-20`">
        </div>
        <div
            class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center">
        </div>

        <div class="flex flex-col items-center justify-center z-10 py-8 sm:py-12" data-aos="fade-up"
            data-aos-delay="100">
            <div class="relative text-center mb-8">
                <div class="flex justify-center items-center w-40 h-40 sm:w-48 sm:h-48" data-aos="zoom-in"
                    data-aos-delay="200">
                    <div :class="`w-25 h-25 ${isDarkMode ? 'bg-[#E9ECEF]' : 'bg-[#212529]'} rounded-t-full shadow-xl`">
                    </div>
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

            <p class="text-gray-700 text-xs sm:text-sm dark:text-gray-400 mb-6" data-aos="fade-up" data-aos-delay="600">
                Mari
                terhubung!</p>

            <div class="flex space-x-4 sm:space-x-6 mt-0 mb-8" data-aos="fade-up" data-aos-delay="700">
                <div v-for="link in socialLinks" :key="link.label" class="flex flex-col items-center" data-aos="fade-up"
                    :data-aos-delay="700 + (socialLinks.indexOf(link) * 100)">
                    <a :href="link.href" target="_blank" rel="noopener noreferrer"
                        :aria-label="`Visit ${link.label} profile`">
                        <img :src="isDarkMode ? link.iconLight : link.iconDark" :alt="`${link.label} icon`"
                            class="w-6 h-6 hover:scale-125 hover:rotate-6 transition-transform" />
                    </a>
                    <p class="text-xs mt-2" :class="{ 'text-white': isDarkMode, 'text-gray-900': !isDarkMode }">{{
                        link.label }}
                    </p>
                </div>
            </div>

            <div class="mt-0 flex flex-col items-center mb-10" data-aos="fade-up" data-aos-delay="800">
                <p class="text-[0.6rem] sm:text-sm text-gray-700 dark:text-gray-400 text-center max-w-xs">
                    Dark mode untuk nuansa tenang, light mode untuk energi cerah.
                    Kamu tim yang mana?
                </p>
                <button @click="emit('toggle-dark-mode')"
                    :class="`w-10 h-10 rounded-full flex items-center justify-center mt-4 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`"
                    aria-label="Toggle display mode">
                    <img :src="isDarkMode ? powerIconLight : powerIconDark" alt="Mode switch icon" class="w-5 h-5" />
                </button>
            </div>

            <div class="absolute bottom-4 animate-bounce" data-aos="fade-up" data-aos-delay="900">
                <button @click="goToNextPage"
                    class="px-6 py-3 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                    Scroll untuk lanjut menjelajahi &darr;
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.cursor {
    display: inline-block;
    background-color: currentColor;
    width: 2px;
    animation: blink 0.7s infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
