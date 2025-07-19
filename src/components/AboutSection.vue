<script setup>
import { computed } from 'vue';
import { techLogos } from '../data/techLogos';
import { sertifikatList } from "../data/sertifikat.js";
import { pengalamanList } from '../data/experience.js';
import { ref, onMounted } from "vue";

const props = defineProps({
    isDarkMode: {
        type: Boolean,
        default: false
    }
});

const birthDate = new Date('2004-03-18');
const calculatedAge = computed(() => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});
const activeIndex = ref(0);

const scrollToCard = (index) => {
    const container = document.getElementById("certificates-scroll");
    if (!container) return;

    const cardWidth = container.children[0]?.offsetWidth || 0;
    container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
    });

    activeIndex.value = index;
};
onMounted(() => {
    const container = document.getElementById("certificates-scroll");
    if (!container) return;

    const cardWidth = container.children[0]?.offsetWidth || 1;

    // Update dot saat discroll (real-time activeIndex)
    container.addEventListener("scroll", () => {
        const index = Math.round(container.scrollLeft / cardWidth);
        activeIndex.value = index;
    });

    // Drag scroll behavior
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
        isDown = true;
        container.classList.add("cursor-grabbing");
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
        isDown = false;
        container.classList.remove("cursor-grabbing");
    });

    container.addEventListener("mouseup", () => {
        isDown = false;
        container.classList.remove("cursor-grabbing");
    });

    container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });
});
window.addEventListener("resize", () => {
    const container = document.getElementById("certificates-scroll");
    if (!container) return;
    const cardWidth = container.children[0]?.offsetWidth || 1;
    const index = Math.round(container.scrollLeft / cardWidth);
    activeIndex.value = index;
});



</script>

<template>
    <section id="about"
        class="relative flex flex-col items-center text-gray-900 dark:text-gray-100 py-16 px-4 min-h-screen overflow-hidden">
        <div :class="`absolute top-0 left-0 w-full h-full z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-20`">
        </div>
        <div
            class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center">
        </div>
        <div class="relative mb-12 text-center z-10 about-me-title-wrapper">
            <h2 class="text-4xl sm:text-5xl font-extrabold relative z-10 transition-colors duration-300"
                :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">About Me</h2>
        </div>

        <div class="w-full max-w-5xl px-4 flex-grow relative z-10">
            <div class="md:flex md:space-x-12 mb-12">
                <div class="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right" data-aos-delay="100">
                    <h3 class="text-3xl font-extrabold mb-6 text-center md:text-left transition-colors duration-300"
                        :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                        Profil
                    </h3>
                    <ul class="space-y-4">
                        <!-- Nama Lengkap -->
                        <li class="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                            :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                            <i class="fa-solid fa-id-card text-blue-700 dark:text-blue-500 text-lg"></i>
                            <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                <span class="font-semibold">Nama Lengkap:</span> Ariyo Aziz Pratama
                            </p>
                        </li>

                        <!-- Usia -->
                        <li class="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                            :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                            <i class="fa-solid fa-hourglass-half text-blue-700 dark:text-blue-500 text-lg"></i>
                            <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                <span class="font-semibold">Usia:</span> {{ calculatedAge }} Tahun
                            </p>
                        </li>

                        <!-- Status -->
                        <li class="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                            :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                            <i class="fa-solid fa-user-graduate text-blue-700 dark:text-blue-500 text-lg"></i>
                            <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                <span class="font-semibold">Status:</span> Mahasiswa
                            </p>
                        </li>

                        <!-- Kewarganegaraan -->
                        <li class="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                            :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                            <i class="fa-solid fa-earth-asia text-blue-700 dark:text-blue-500 text-lg"></i>
                            <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                <span class="font-semibold">Kewarganegaraan:</span> Indonesia
                            </p>
                        </li>

                        <!-- Alamat -->
                        <li class="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                            :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                            <i class="fa-solid fa-location-dot text-blue-700 dark:text-blue-500 text-lg"></i>
                            <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                <span class="font-semibold">Alamat:</span> Jawa Tengah
                            </p>
                        </li>

                        <!-- Email -->
                        <li class="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                            :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                            <i class="fa-solid fa-envelope text-blue-700 dark:text-blue-500 text-lg"></i>
                            <p class="text-base" :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                <span class="font-semibold">Email:</span>
                                <a href="mailto:ariyoaziz.pratama@gmail.com"
                                    class="text-blue-700 dark:text-blue-500 hover:underline transition-colors duration-300">
                                    ariyoaziz.pratama@gmail.com
                                </a>
                            </p>
                        </li>
                    </ul>
                    <!-- Tombol Unduh CV -->
                    <div class="mt-8 text-center md:text-left" data-aos="fade-up" data-aos-delay="200">
                        <a href="/src/assets/pdf/Ariyo Aziz Pratama_CV.pdf" download class=" px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-b from-blue-500
                            to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 dark:from-blue-600
                            dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 transition-all duration-300
                            shadow-md whitespace-nowrap inline-flex items-center justify-center gap-2">
                            <i class="fa-solid fa-file-arrow-down"></i> Unduh CV
                        </a>
                    </div>
                </div>
                <div class="md:w-1/2" data-aos="fade-left" data-aos-delay="300">
                    <h3 class="text-3xl font-extrabold mb-6 text-center md:text-left transition-colors duration-300"
                        :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                        Halo, Salam Kenal!
                    </h3>

                    <div class="space-y-1 leading-relaxed text-base text-justify"
                        :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                        <p>
                            Saya adalah seorang mahasiswa yang sedang menempuh pendidikan di Program Studi Ilmu
                            Komputer, Fakultas Sains dan Teknologi, Universitas Teknologi Yogyakarta. Dengan dasar
                            pengetahuan yang kuat di bidang teknologi, saya terus mengasah keterampilan dalam
                            pemrograman dan pemecahan masalah.
                        </p>
                        <p>
                            Sepanjang perjalanan akademik, saya berkomitmen untuk terus belajar dan meningkatkan
                            kompetensi di bidang teknologi informasi. Saya percaya bahwa pembelajaran berkelanjutan
                            merupakan kunci untuk menghadapi tantangan di industri teknologi yang terus berkembang.
                        </p>
                        <p>
                            Ke depan, saya berharap dapat terus bertumbuh sebagai profesional di dunia IT dan memberikan
                            kontribusi nyata bagi industri. Jangan ragu untuk terhubung dan berbagi ide!
                        </p>
                    </div>
                </div>

            </div>

            <div class="mb-12" data-aos="fade-up" data-aos-delay="400">
                <h3 class="text-2xl font-bold mb-8 text-center transition-colors duration-300"
                    :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
                    Pendidikan
                </h3>

                <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- UTY -->
                    <li class="p-5 rounded-xl shadow-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm border hover:border-primary"
                        :class="{
                            'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40 hover:bg-white/80': !isDarkMode,
                            'bg-gray-800/50 border-gray-700 text-gray-100 hover:bg-gray-800/70': isDarkMode
                        }">

                        <p class="font-semibold text-lg mb-1"
                            :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                            Universitas Teknologi Yogyakarta
                        </p>
                        <p class="text-sm mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                            Program Sarjana – Informatika
                        </p>

                        <p class="text-sm mt-3" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                            Mendalami pengembangan aplikasi web dan mobile, rekayasa perangkat lunak, serta pemanfaatan
                            basis data untuk solusi teknologi berbasis software.
                        </p>

                        <p class="text-xs mt-3 italic"
                            :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">
                            September 2022 – Sekarang
                        </p>
                    </li>

                    <!-- SMK Ma'arif 4 Kebumen -->
                    <li class="p-5 rounded-xl shadow-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm border hover:border-primary"
                        :class="{
                            'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40 hover:bg-white/80': !isDarkMode,
                            'bg-gray-800/50 border-gray-700 text-gray-100 hover:bg-gray-800/70': isDarkMode
                        }">

                        <p class="font-semibold text-lg mb-1"
                            :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                            SMK Ma’arif 4 Kebumen
                        </p>
                        <p class="text-sm mb-2" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                            Teknik Audio Video
                        </p>
                        <p class="text-sm mt-3" :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                            Memperoleh dasar-dasar teknik elektronika, mikrokontroler, dan sistem perangkat audio-video,
                            sebagai fondasi awal dalam dunia teknologi dan rekayasa perangkat.
                        </p>

                        <p class="text-xs italic mt-3"
                            :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">
                            Juli 2019 – Juni 2021
                        </p>
                    </li>
                </ul>
            </div>


            <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
                <h3 class="text-2xl font-bold mb-8 text-center transition-colors duration-300"
                    :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
                    Sertifikat
                </h3>

                <!-- Scrollable Section -->
                <div class="relative">
                    <div id="certificates-scroll"
                        class="cursor-grab flex overflow-x-auto gap-4 snap-x snap-mandatory px-2 scroll-smooth hide-scrollbar">
                        <div v-for="(cert, index) in sertifikatList" :key="index"
                            class="min-w-[300px] md:min-w-[400px] snap-start p-5 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm flex flex-col justify-between border hover:scale-[1.02] hover:shadow-lg hover:border-primary"
                            :class="{
                                'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
                                'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
                            }">
                            <div>
                                <img :src="cert.image" alt="sertifikat"
                                    class="rounded-md mb-4 object-cover w-full h-40" />
                                <p class="font-semibold text-lg mb-1"
                                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                    {{ cert.title }}
                                </p>
                                <p class="text-sm mb-2"
                                    :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                                    {{ cert.issuer }}
                                </p>
                                <p class="text-sm mt-3"
                                    :class="{ 'text-gray-600': !isDarkMode, 'text-gray-400': isDarkMode }">
                                    {{ cert.description }}
                                </p>
                                <p class="text-xs mt-3"
                                    :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">
                                    {{ cert.date }}
                                </p>
                            </div>

                        </div>
                    </div>
                    <!-- Dots navigation -->
                    <div class="flex justify-center mt-6 gap-3 z-10 relative">
                        <button v-for="(dot, i) in sertifikatList.length" :key="i" @click="scrollToCard(i)"
                            class="w-3 h-3 rounded-full border-2 transition-all duration-300"
                            :class="activeIndex === i
                                ? 'bg-blue-600 border-blue-600 shadow-lg scale-110'
                                : 'bg-gray-300 border-gray-400 opacity-70 hover:opacity-100 dark:bg-gray-300 dark:border-gray-400'">
                        </button>
                    </div>

                </div>
            </div>

            <div class="mb-1" data-aos="fade-up" data-aos-delay="700">
                <h3 class="text-2xl font-bold mb-8 text-center transition-colors duration-300"
                    :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
                    Pengalaman
                </h3>

                <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <li v-for="(item, index) in pengalamanList" :key="index"
                        class="p-5 rounded-xl shadow-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm border hover:border-primary"
                        :class="{
                            'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40 hover:bg-white/80': !isDarkMode,
                            'bg-gray-800/50 border-gray-700 text-gray-100 hover:bg-gray-800/70': isDarkMode
                        }">
                        <div class=" space-y-1">
                            <p class="text-lg font-semibold"
                                :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                {{ item.title }}
                            </p>
                            <p class="text-sm" :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                                {{ item.location }}
                            </p>
                            <p class="text-xs italic"
                                :class="{ 'text-gray-500': !isDarkMode, 'text-gray-400': isDarkMode }">
                                {{ item.date }}
                            </p>
                        </div>

                        <ul class="list-disc list-outside pl-5 mt-1 space-y-1 text-sm leading-relaxed"
                            :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">
                            <li v-for="(task, idx) in item.tasks" :key="idx">{{ task }}</li>
                        </ul>

                    </li>
                </ul>
            </div>

        </div>
    </section>
</template>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
