<script setup>
const props = defineProps({
    isDarkMode: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <section id="contact"
        class="relative flex flex-col justify-center items-center text-gray-900 dark:text-gray-100 py-16 px-4 min-h-screen overflow-hidden">
        <div :class="`absolute top-0 left-0 w-full h-full z-0 bg-${isDarkMode ? 'black' : 'gray-300'} opacity-20`">
        </div>
        <div
            class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center opacity-10 dark:opacity-10">
        </div>
        <div class="mb-12" data-aos="fade-up" data-aos-delay="400">
            <h2 class="text-4xl sm:text-5xl font-extrabold text-center mb-12 transition-colors duration-300"
                :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
                Get In Touch
            </h2>
            <div class="w-full max-w-5xl relative z-10 space-y-16">

                <p class="text-center leading-relaxed max-w-3xl mx-auto"
                    :class="{ 'text-gray-800': !isDarkMode, 'text-gray-100': isDarkMode }">
                    Saya selalu terbuka untuk berbagai kesempatan, entah itu kolaborasi proyek, freelance desain,
                    diskusi seputar UI/UX, atau sekadar ngobrol santai tentang teknologi dan dunia kreatif.
                    Jangan sungkan, kirim saja pesan kapan pun!
                </p>
            </div>
        </div>

        <div class="mt-10 w-full max-w-4xl grid md:grid-cols-2 gap-10 relative z-10">

            <div class="mb-12" data-aos="fade-right" data-aos-delay="400">
                <div class="rounded-2xl p-6 border shadow-md text-center transition-colors duration-300" :class="{
                    'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
                    'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
                }">
                    <h3 class="text-2xl font-bold mb-6">Formulir Kontak</h3>
                    <form class="space-y-5 text-left">
                        <div>
                            <label for="name" class="block text-sm font-medium mb-1"
                                :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Nama
                                Lengkap</label>
                            <input type="text" id="name" name="name" placeholder="Tuliskan nama kamu"
                                class="w-full p-3 rounded-md border focus:ring focus:ring-blue-400 transition" :class="{
                                    'bg-white text-gray-900 border-gray-300': !isDarkMode,
                                    'bg-gray-700 text-white border-gray-600': isDarkMode
                                }" />
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium mb-1"
                                :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Email</label>
                            <input type="email" id="email" name="email" placeholder="emailkamu@example.com"
                                class="w-full p-3 rounded-md border focus:ring focus:ring-blue-400 transition" :class="{
                                    'bg-white text-gray-900 border-gray-300': !isDarkMode,
                                    'bg-gray-700 text-white border-gray-600': isDarkMode
                                }" />
                        </div>

                        <div>
                            <label for="message" class="block text-sm font-medium mb-1"
                                :class="{ 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode }">Pesan</label>
                            <textarea id="message" name="message" rows="5"
                                placeholder="Tuliskan pesan, pertanyaan, atau ide kamu di sini..."
                                class="w-full p-3 rounded-md border focus:ring focus:ring-blue-400 transition" :class="{
                                    'bg-white text-gray-900 border-gray-300': !isDarkMode,
                                    'bg-gray-700 text-white border-gray-600': isDarkMode
                                }"></textarea>
                        </div>

                        <button type="submit" class="w-full px-6 py-3 rounded-full font-semibold text-white shadow-md flex items-center justify-center gap-2 transition-all duration-300
              bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800
              dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900">
                            Kirim Pesan
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l4.453-1.483a1 1 0 00.644-.954V14a1 1 0 00-1-1H9a1 1 0 00-1 1v1.583c.091.201.24.38.425.527l.951.713a1 1 0 001.192.122l5-3a1 1 0 00.276-1.743L13 7.205V5a1 1 0 00-1-1h-1.112zM12 14.111L15.222 12 12 9.889V14.111z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <div class="mb-12" data-aos="fade-left" data-aos-delay="400">
                <div class="rounded-2xl p-6 flex flex-col justify-center items-center text-centershadow-sm backdrop-blur-md transition-all duration-300 border"
                    :class="{
                        'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
                        'bg-gray-800/50 border-gray-700 text-gray-100': isDarkMode
                    }">
                    <h3 class="text-2xl font-bold mb-2">☕Dukung Karya Saya</h3>
                    <p class="text-sm mb-4 max-w-xs text-center leading-relaxed" :class="{
                        'text-gray-700': !isDarkMode,
                        'text-gray-300': isDarkMode
                    }">
                        Suka dengan karya-karya saya?
                        Kamu bisa bantu saya tetap berkarya dengan mentraktir saya secangkir kopi. Dukungan kecilmu
                        sangat berarti! 🙌
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
</template>
