"use strict";
window.preload = window.preload || {};
async function handlePluginEnter({ code, type: type2, payload: payload2 }) {
  window.dispatchEvent(new CustomEvent("tool-plugin-enter", { detail: "some thing" }));
}
utools.onPluginEnter(handlePluginEnter);
utools.onPluginOut(async (exit) => {
});
Object.assign(window.preload, { handlePluginEnter, type, payload });
