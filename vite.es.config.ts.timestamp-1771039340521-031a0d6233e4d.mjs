// vite.es.config.ts
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/q1894/Desktop/code/Bobo-elements-main/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/q1894/Desktop/code/Bobo-elements-main/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///C:/Users/q1894/Desktop/code/Bobo-elements-main/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\q1894\\Desktop\\code\\Bobo-elements-main";
var __vite_injected_original_import_meta_url = "file:///C:/Users/q1894/Desktop/code/Bobo-elements-main/vite.es.config.ts";
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist/vue/types",
      include: ["src/vue/**/*", "src/core/**/*", "src/hooks/**/*", "src/components/**/*"]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    outDir: "dist/vue",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/vue/index.ts"),
      name: "BoboElementVue",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "async-validator",
        "@popperjs/core",
        "lodash-es",
        "axios"
      ],
      output: {
        globals: {
          vue: "Vue"
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css")
            return "index.css";
          return chunkInfo.name;
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxxMTg5NFxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcQm9iby1lbGVtZW50cy1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxxMTg5NFxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcQm9iby1lbGVtZW50cy1tYWluXFxcXHZpdGUuZXMuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9xMTg5NC9EZXNrdG9wL2NvZGUvQm9iby1lbGVtZW50cy1tYWluL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdnVlKCksXG4gICAgICAgIGR0cyh7XG4gICAgICAgICAgICB0c2NvbmZpZ1BhdGg6ICcuL3RzY29uZmlnLmJ1aWxkLmpzb24nLFxuICAgICAgICAgICAgb3V0RGlyOiAnZGlzdC92dWUvdHlwZXMnLFxuICAgICAgICAgICAgaW5jbHVkZTogWydzcmMvdnVlLyoqLyonLCAnc3JjL2NvcmUvKiovKicsICdzcmMvaG9va3MvKiovKicsICdzcmMvY29tcG9uZW50cy8qKi8qJ11cbiAgICAgICAgfSlcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIG91dERpcjogJ2Rpc3QvdnVlJyxcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdnVlL2luZGV4LnRzJyksXG4gICAgICAgICAgICBuYW1lOiAnQm9ib0VsZW1lbnRWdWUnLFxuICAgICAgICAgICAgZmlsZU5hbWU6ICdpbmRleCcsXG4gICAgICAgICAgICBmb3JtYXRzOiBbJ2VzJ11cbiAgICAgICAgfSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJyxcbiAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJyxcbiAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZScsXG4gICAgICAgICAgICAgICAgJ2FzeW5jLXZhbGlkYXRvcicsXG4gICAgICAgICAgICAgICAgJ0Bwb3BwZXJqcy9jb3JlJyxcbiAgICAgICAgICAgICAgICAnbG9kYXNoLWVzJyxcbiAgICAgICAgICAgICAgICAnYXhpb3MnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgICAgICB2dWU6ICdWdWUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2h1bmtJbmZvLm5hbWUgPT09ICdzdHlsZS5jc3MnKSByZXR1cm4gJ2luZGV4LmNzcydcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNodW5rSW5mby5uYW1lIGFzIHN0cmluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThVLFNBQVMsZUFBZSxXQUFXO0FBQ2pYLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTO0FBSmhCLElBQU0sbUNBQW1DO0FBQXlLLElBQU0sMkNBQTJDO0FBTW5RLElBQU8seUJBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLFNBQVMsQ0FBQyxnQkFBZ0IsaUJBQWlCLGtCQUFrQixxQkFBcUI7QUFBQSxJQUN0RixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNELE9BQU8sUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUM1QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2xCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDWCxVQUFVO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDTCxLQUFLO0FBQUEsUUFDVDtBQUFBLFFBQ0EsZ0JBQWdCLENBQUMsY0FBYztBQUMzQixjQUFJLFVBQVUsU0FBUztBQUFhLG1CQUFPO0FBQzNDLGlCQUFPLFVBQVU7QUFBQSxRQUNyQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
