import { defineStore } from "pinia";
const useGlobalStore = defineStore("useGlobalStore", {
    state: () => ({
        siteList: [],
         // 统一用于页面之间通信 使用时定义好 key(全局唯一,例如: mySchedulingClassSetting ) 
         communicationMiddleware: { }
    }),
    actions: {
        setSiteList(list){
            this.siteList = list || [];
        },
        setCommunicationMiddleware( key , value ){
            if( !key ) return;
            // timestamp 用于监听数据的改变
            const timestamp = new Date().getTime();
            this.communicationMiddleware[key] = { 
                timestamp,
                value,
            };
        },
        getCommunicationMiddleware( key ){
            return this.communicationMiddleware[key] ? this.communicationMiddleware[key]['value'] : undefined;
        }
    }
})
export default useGlobalStore;