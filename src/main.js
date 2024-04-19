import {createApp} from "vue";
import "@/assets/styles/index.scss";
import "@/assets/icon/iconfont.css";

import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import installPlugins from "./plugins";
import comRegister from "./components/index.js";
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(installPlugins);
app.use(comRegister);
app.mount("#app");


