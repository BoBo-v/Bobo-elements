// vite.react.es.config.ts
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/q1894/Desktop/code/Bobo-elements-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/q1894/Desktop/code/Bobo-elements-main/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///C:/Users/q1894/Desktop/code/Bobo-elements-main/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\q1894\\Desktop\\code\\Bobo-elements-main";
var __vite_injected_original_import_meta_url = "file:///C:/Users/q1894/Desktop/code/Bobo-elements-main/vite.react.es.config.ts";
var vite_react_es_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist/react/types",
      include: ["src/react/**/*", "src/core/**/*", "src/hooks/**/*"]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    outDir: "dist/react",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/react/index.ts"),
      name: "BoboElementReact",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/react-fontawesome",
        "async-validator",
        "@popperjs/core",
        "lodash-es",
        "axios"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
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
  vite_react_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5yZWFjdC5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxxMTg5NFxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcQm9iby1lbGVtZW50cy1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxxMTg5NFxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcQm9iby1lbGVtZW50cy1tYWluXFxcXHZpdGUucmVhY3QuZXMuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9xMTg5NC9EZXNrdG9wL2NvZGUvQm9iby1lbGVtZW50cy1tYWluL3ZpdGUucmVhY3QuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHJlYWN0KCksXG4gICAgICAgIGR0cyh7XG4gICAgICAgICAgICB0c2NvbmZpZ1BhdGg6ICcuL3RzY29uZmlnLmJ1aWxkLmpzb24nLFxuICAgICAgICAgICAgb3V0RGlyOiAnZGlzdC9yZWFjdC90eXBlcycsXG4gICAgICAgICAgICBpbmNsdWRlOiBbJ3NyYy9yZWFjdC8qKi8qJywgJ3NyYy9jb3JlLyoqLyonLCAnc3JjL2hvb2tzLyoqLyonXVxuICAgICAgICB9KVxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgb3V0RGlyOiAnZGlzdC9yZWFjdCcsXG4gICAgICAgIGxpYjoge1xuICAgICAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3JlYWN0L2luZGV4LnRzJyksXG4gICAgICAgICAgICBuYW1lOiAnQm9ib0VsZW1lbnRSZWFjdCcsXG4gICAgICAgICAgICBmaWxlTmFtZTogJ2luZGV4JyxcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnXVxuICAgICAgICB9LFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBleHRlcm5hbDogW1xuICAgICAgICAgICAgICAgICdyZWFjdCcsXG4gICAgICAgICAgICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAgICAgICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJyxcbiAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJyxcbiAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJyxcbiAgICAgICAgICAgICAgICAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJyxcbiAgICAgICAgICAgICAgICAnYXN5bmMtdmFsaWRhdG9yJyxcbiAgICAgICAgICAgICAgICAnQHBvcHBlcmpzL2NvcmUnLFxuICAgICAgICAgICAgICAgICdsb2Rhc2gtZXMnLFxuICAgICAgICAgICAgICAgICdheGlvcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNodW5rSW5mby5uYW1lID09PSAnc3R5bGUuY3NzJykgcmV0dXJuICdpbmRleC5jc3MnXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaHVua0luZm8ubmFtZSBhcyBzdHJpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixTQUFTLGVBQWUsV0FBVztBQUM3WCxTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQUpoQixJQUFNLG1DQUFtQztBQUErSyxJQUFNLDJDQUEyQztBQU16USxJQUFPLCtCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDQSxjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsTUFDUixTQUFTLENBQUMsa0JBQWtCLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUNqRSxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNELE9BQU8sUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxNQUM5QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2xCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDWCxVQUFVO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsZ0JBQWdCLENBQUMsY0FBYztBQUMzQixjQUFJLFVBQVUsU0FBUztBQUFhLG1CQUFPO0FBQzNDLGlCQUFPLFVBQVU7QUFBQSxRQUNyQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
