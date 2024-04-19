import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: to => ({
      name: "home",
      query: { ...to.query },
    }),
  },
  {
    path: "/home",
    name: 'home',
    component: () => import("@/views/home.vue"),
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //判断是否有标题
    // document.title = to.meta.title;
  }
  next();
});
router.afterEach(() => {});
export default router;
