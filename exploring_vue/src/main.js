import { createApp } from "vue";
import App from "./App.vue";

// Main CSS
import "./assets/main.css";

// Implémentation PopperJS
import { createPopper } from '@popperjs/core';
const popcorn = document.querySelector('#popcorn');
const tooltip = document.querySelector('#tooltip');
createPopper(popcorn, tooltip, {
  placement: 'top',
});

// Implémentation PortalVue
import PortalVue from 'portal-vue'

Vue.use(PortalVue)

// Implémentation BootstrapVue
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


createApp(App).mount("#app");
