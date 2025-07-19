<script setup>
import { ref, computed, watch } from 'vue';
import { projectsData, initialFilterLabels } from '../data/projects';

const props = defineProps({
    isDarkMode: {
        type: Boolean,
        default: false
    }
});

const filterLabels = ref([...initialFilterLabels]);
const activeFilterCategory = ref('All');
const allProjects = ref(projectsData);

const itemsPerPage = 6;
const currentPage = ref(1);

const filteredProjects = computed(() => {
    if (activeFilterCategory.value === 'All') {
        return allProjects.value;
    }
    return allProjects.value.filter(project =>
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

const getLabelClass = (label) => {
    if (label.active) {
        return 'bg-blue-600 text-white dark:bg-blue-700 dark:text-white border-blue-600 dark:border-blue-700';
    }

    return props.isDarkMode
        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300';
};
</script>

<template>
    <section id="projects"
        class="relative flex flex-col justify-center items-center text-gray-900 dark:text-gray-100 py-16 min-h-screen overflow-hidden">
        <!-- Background overlays -->
        <div class="absolute top-0 left-0 w-full h-full z-0"
            :class="isDarkMode ? 'bg-black opacity-20' : 'bg-gray-300 opacity-20'"></div>
        <div
            class="absolute top-0 left-0 w-full h-full z-0 bg-[url('/images/decorative-pattern.png')] bg-cover bg-center">
        </div>

        <!-- Main Content Wrapper for the section -->
        <div class="w-full max-w-6xl px-4 relative z-10">
            <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
                <h2 class="text-4xl sm:text-5xl font-extrabold mb-12 text-center transition-colors duration-300"
                    :class="{ 'text-gray-900': !isDarkMode, 'text-gray-100': isDarkMode }">My Projects</h2>

                <!-- Filter Buttons: Bagian ini yang memungkinkan scroll horizontal -->
                <div class="flex flex-nowrap overflow-x-auto gap-3 mb-12 justify-center">
                    <span v-for="label in filterLabels" :key="label.name" @click="filterProjects(label.name)"
                        class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 border"
                        :class="getLabelClass(label)">
                        {{ label.name }}
                    </span>
                </div>

                <!-- Project Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full flex-grow">
                    <div v-for="(project, index) in paginatedProjects" :key="project.title"
                        class="p-6 rounded-xl shadow-sm transition-all duration-300 backdrop-blur-sm flex flex-col text-center border hover:scale-[1.02] hover:shadow-lg  hover:border-primary"
                        :class="{
                            'bg-white/60 border-gray-200 text-gray-900 ring-1 ring-inset ring-white/40': !isDarkMode,
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
                <div v-if="totalPages > 1" class="flex justify-center mt-12 gap-2">
                    <button @click="currentPage--" :disabled="currentPage === 1"
                        class="px-3 py-1 rounded border text-sm font-medium transition-all"
                        :class="currentPage === 1
                            ? 'cursor-not-allowed text-gray-400 border-gray-300'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-400'">
                        &larr;
                    </button>

                    <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                        class="px-3 py-1 rounded border text-sm font-medium transition-all"
                        :class="page === currentPage
                            ? 'bg-blue-600 text-white dark:bg-blue-700 dark:text-white border-blue-600'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-400'">
                        {{ page }}
                    </button>

                    <button @click="currentPage++" :disabled="currentPage === totalPages"
                        class="px-3 py-1 rounded border text-sm font-medium transition-all"
                        :class="currentPage === totalPages
                            ? 'cursor-not-allowed text-gray-400 border-gray-300'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-400'">
                        &rarr;
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.flex-nowrap::-webkit-scrollbar {
    display: none;
}

.flex-nowrap {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
