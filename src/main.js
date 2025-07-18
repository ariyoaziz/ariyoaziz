import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/style.css";
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);
app.use(router);
app.mount("#app");

onMounted(() => {
  AOS.init({
    duration: 1000, // Durasi animasi dalam ms
    once: true, // Animasi hanya berjalan sekali saat elemen muncul
  });
});
