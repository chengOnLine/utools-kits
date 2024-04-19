// 管理所有的全局组件
// 将全局组件封装到插件中
export default {
  install(Vue) {
    // 全局注册组件
    let req = import.meta.globEager("./*.vue");
    let customForm = import.meta.globEager("./customForm/*.vue");
    let womenChildren = import.meta.globEager("./womenChildren/*.vue");
    let files = Object.values(req);
    let customFormFiles = Object.values(customForm);
    let womenChildrenList = Object.values(womenChildren);
    // console.log("我进来了xxxx", customFormFiles);
    let f = [...files, ...customFormFiles, ...womenChildrenList];
    f.forEach((x) => {
      let com = x.default;
      if (com.__name) {
        Vue.component(com.__name, com);
      } else {
        Vue.component(com.name, com);
      }
    });
  },
};
