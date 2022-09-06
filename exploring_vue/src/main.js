import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

// Implémentation PopperJS
import { createPopper } from '@popperjs/core';
const popcorn = document.querySelector('#popcorn');
const tooltip = document.querySelector('#tooltip');
createPopper(popcorn, tooltip, {
  placement: 'top',
});

createApp(App).mount("#app");
