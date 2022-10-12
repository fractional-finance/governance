import { createApp, h } from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "./store"
import "./styles/frabric-custom.scss";
// import "bulma/css/bulma.css"
import Toaster from "@meforma/vue-toaster";
import Unicon from "vue-unicons"
import { uniTimesCircle, uniTimes, uniTimesSquare, uniSignout, uniFilePlusAlt, uniCamera } from 'vue-unicons/dist/icons'
Unicon.add([uniTimes, uniTimesSquare, uniSignout, uniFilePlusAlt, uniCamera])
require("dotenv").config()


const app = createApp({
  render: () => h(App)
})

store.$toast = app.$toast;

app.config.productionTip = true
app.use(router)
app.use(store)
app.use(Toaster)
app.use(Unicon)
app.mount("#app")

