import { fileURLToPath, URL } from 'node:url';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import AutoImport from 'unplugin-auto-import/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()]
        }
    },
    plugins: [
        VueRouter(),
        Components({
            /* options */
        }),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/ // .md
            ],
            imports: [
                // presets
                'vue',
                VueRouterAutoImports,
                {
                    pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate']
                }
            ],
            dts: true,
            viteOptimizeDeps: true,
            dirs: ['src/stores']
        }),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (element) => element.startsWith('iconify-icon')
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
