import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                socials: resolve(__dirname, 'socials.html'),
                wallpapers: resolve(__dirname, 'wallpapers.html'),
                tutorial: resolve(__dirname, 'tutorial.html'),
                blogs: resolve(__dirname, 'blogs.html'),
            },
        },
    },
})
