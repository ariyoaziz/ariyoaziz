<script setup>
import { computed } from 'vue';
import { rawInfoList, educationList } from '../data/infolist.js';
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

// Hitung usia
const birthYear = 2002;
const calculatedAge = computed(() => new Date().getFullYear() - birthYear);

// Olah data agar usia bisa disisipkan
const infoList = computed(() => {
    return rawInfoList.map(item => {
        if (item.isAge) {
            return {
                ...item,
                value: `${calculatedAge.value} Tahun`
            };
        }
        return item;
    });
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
        <div class="relative mt-24 mb-12 text-center z-10 about-me-title-wrapper">
            <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 relative z-10 transition-colors duration-300"
                :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                Kenalan Yuk!
            </h2>
            <p class="max-w-xl mx-auto text-base sm:text-lg font-medium transition-colors duration-300"
                :class="{ 'text-gray-600': !isDarkMode, 'text-gray-300': isDarkMode }">
                Sedikit cerita tentang saya, latar belakang, dan hal-hal yang saya sukai dalam dunia teknologi dan
                kreatif.
            </p>
        </div>
        <div class="w-full max-w-5xl px-4 flex-grow relative z-10">
            <div class="md:flex md:space-x-12 mb-12">
                <div class="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right" data-aos-delay="100">
                    <h3 class="text-3xl font-extrabold mb-6 text-center md:text-left transition-colors duration-300"
                        :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                        Profil
                    </h3>
                    <ul class="space-y-4 w-full max-w-2xl mx-auto px-4">
                        <li v-for="(item, index) in infoList" :key="index"
                            class="flex items-center gap-4 p-4 rounded-lg backdrop-blur-sm transition-colors duration-200"
                            :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/60': isDarkMode }">
                            <!-- Ikon di tengah vertikal -->
                            <i :class="`${item.icon} text-blue-700 dark:text-blue-500 text-xl flex-shrink-0`"></i>

                            <!-- Label & Value -->
                            <div class="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full">
                                <span class="font-semibold text-sm sm:text-base"
                                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                    {{ item.label }}:
                                </span>

                                <span v-if="item.type === 'text'" class="text-sm sm:text-base"
                                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">
                                    {{ item.value }}
                                </span>

                                <a v-else-if="item.type === 'link'" :href="`mailto:${item.value}`"
                                    class="text-blue-700 dark:text-blue-500 hover:underline text-sm sm:text-base">
                                    {{ item.value }}
                                </a>
                            </div>
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
                            Saya adalah mahasiswa semester 7 Program Studi Informatika di Fakultas Sains dan Teknologi,
                            Universitas Teknologi Yogyakarta. Dengan minat besar di bidang teknologi, saya terus
                            mengembangkan keterampilan di bidang pemrograman, desain sistem, dan pemecahan masalah.
                        </p>
                        <p>
                            Sepanjang perjalanan akademik, saya aktif belajar dan mengeksplorasi berbagai topik dalam
                            dunia IT, mulai dari pengembangan web hingga penerapan teknologi Internet of Things (IoT).
                            Bagi saya, belajar bukan hanya kewajiban, tetapi juga proses berkelanjutan untuk menghadapi
                            perkembangan industri yang begitu dinamis.
                        </p>
                        <p>
                            Ke depan, saya ingin terus bertumbuh sebagai profesional di dunia teknologi dan
                            berkontribusi melalui solusi nyata. Jangan ragu untuk terhubung dan berbagi ide, saya selalu
                            terbuka untuk kolaborasi!
                        </p>

                    </div>
                </div>

            </div>

            <div class="mb-12" data-aos="fade-up" data-aos-delay="400">
                <div class="mt-20 mb-10 text-center">
                    <h3 class="text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-300"
                        :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
                        Pendidikan
                    </h3>
                </div>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Card Pendidikan -->
                    <li v-for="edu in educationList" :key="edu.school"
                        class="flex flex-col justify-center h-full w-full max-w-md p-6 rounded-2xl border shadow-sm backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:border-primary"
                        :class="{
                            'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40 hover:bg-white/80': !isDarkMode,
                            'bg-gray-800/50 border-gray-700 text-gray-100 hover:bg-gray-800/70': isDarkMode
                        }">

                        <!-- Nama Sekolah -->
                        <h3 class="font-semibold text-lg mb-1" :class="{
                            'text-gray-900': !isDarkMode,
                            'text-gray-100': isDarkMode
                        }">
                            {{ edu.school }}
                        </h3>

                        <!-- Jurusan -->
                        <p class="text-sm mb-2" :class="{
                            'text-gray-700': !isDarkMode,
                            'text-gray-300': isDarkMode
                        }">
                            {{ edu.major }}
                        </p>

                        <!-- Deskripsi -->
                        <p class="text-sm mt-3 leading-relaxed text-justify" :class="{
                            'text-gray-600': !isDarkMode,
                            'text-gray-400': isDarkMode
                        }">
                            {{ edu.description }}
                        </p>

                        <!-- Periode -->
                        <p class="text-xs mt-3 italic" :class="{
                            'text-gray-500': !isDarkMode,
                            'text-gray-400': isDarkMode
                        }">
                            {{ edu.period }}
                        </p>
                    </li>
                </ul>


            </div>


            <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
                <div class="mt-20 mb-10 text-center">
                    <h3 class="text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-300"
                        :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
                        Sertifikat
                    </h3>

                </div>


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

            <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
                <div class="mt-20 mb-10 text-center">
                    <h3 class="text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-300"
                        :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
                        Pengalaman
                    </h3>
                </div>
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
