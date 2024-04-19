import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import legacyPlugin from "@vitejs/plugin-legacy";
import path, { resolve } from "path";
// import topLevelAwait from "vite-plugin-top-level-await";
import { createPreloadPlugin, createUpxPlugin } from 'vite-plugin-utools-helper';
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      // libs: [//貌似这个方式不OK啊,还是需要再main.ts中按需引入
      //   {
      //     libraryName: 'element-plus',
      //     esModule: true,
      //     resolveStyle: (name: string) => {
      //        return `element-plus/theme-chalk/${name}.css`
      //     }
      //   }
      // ]
    }),
    createPreloadPlugin({
      // name: 'window.preload',
      path: 'src/preload/index.js',
    }),
    createUpxPlugin({
      // outDir: 'upx',
      outFileName: 'plugin-[version].upx'
    }),
    // legacyPlugin({
    //   targets: ["chrome 52"], // 需要兼容的目标列表，可以设置多个
    //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 面向IE11时需要此插件,
    // }),
    // topLevelAwait({
    //   // The export name of top-level await promise for each chunk module
    //   promiseExportName: "__tla",
    //   // The function to generate import names of top-level await promise in each chunk module
    //   promiseImportName: (i) => `__tla_${i}`,
    // }),
  ],
  resolve: {
    // https://cn.vitejs.dev/config/#resolve-alias
    alias: {
      // 设置路径
      "~": path.resolve(__dirname, "./"),
      // 设置别名
      "@": path.resolve(__dirname, "./src"),
      "@A": path.resolve(__dirname, "./src/assets"),
      "@U": path.resolve(__dirname, "./src/utils"),
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  // vite 相关配置
  server: {
    port: 3000,
    host: true,
    // https: false, // https:{type:Boolean}
    open: true,
    // disableHostCheck: true,
    proxy: {
      "^/zty-msy": {
        // target: "https://mdajtest.szzt.com.cn",
        target: "http://10.255.18.130:7051",
        changeOrigin: true,
      },
      "^/zty-system": {
        // target: "https://mdajtest.szzt.com.cn",
        target: "http://10.255.18.130:7051",
        changeOrigin: true,
      },
      "^/zty-api": {
        // target: "https://mdajtest.szzt.com.cn",
        target: "http://10.255.18.130:7051",
        changeOrigin: true,
      },
      "^/zty-oauth-server": {
        // target: "https://mdajtest.szzt.com.cn",
        target: "http://10.255.18.130:7051",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist", // 指定输出路径（相对于 项目根目录).
    target: ["chrome52"],
    cssTarget: ["chrome52"],

    //打包两个html，解决H5缓存问题
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // nested: resolve(__dirname, "indexAuth.html"),
        // nesteds: resolve(__dirname, "export_zip.js"),
      },
    },
  },
});
