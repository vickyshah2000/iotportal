// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// // import { copy } from "vite-plugin-copy";
// // import vue from "@vitejs/plugin-vue";

// // https://vitejs.dev/config/
// export default defineConfig({
//   // base: "http://shilong.ecosmartdc.com/",
//   base: "http://122.176.105.30:6972/",
//   plugins: [react()],
//   publicDir: "public",
//   esbuild: {
//     jsxFactory: "h",
//     jsxFragment: "Fragment",
//   },
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
