import { defineStore } from "pinia";
const useUserStore = defineStore("useUserStore", {
  state: () => ({
    token: "",
    config: "",
    user: "",
    appSource: "",
    operatePri:"",
  }),
  persist: {
    enabled: true, //这个配置代表存储生效
    strategies: [
      {
        storage: sessionStorage,
        paths: ["token"],
      },
    ],
  },
  actions: {

  },
});
export default useUserStore;
