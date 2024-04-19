import comm from "@/utils/comJs";

export default function installPlugins (app) {
  if (!app) return;
  app.config.globalProperties.$comm = comm;
};
