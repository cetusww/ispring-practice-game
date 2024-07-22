import {defineConfig} from 'vite';
import eslint from 'vite-plugin-eslint';
import {copy} from "vite-plugin-copy";

export default defineConfig({
    build: {
        assetsDir: 'assets',
        outDir: 'dist',
    },
    server: {
        port: 3000,
    },
    publicDir: 'public',
    root: './',
    plugins: [
        eslint({
            cache: false,
            fix: true,
        }),
        copy({
            targets: [
                {src: 'assets/*', dest: 'dist/assets'}
            ],
            hook: 'writeBundle',
        }),
    ],
});