// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ['en', 'hi', 'fr', 'es', 'ja', 'zh-CN', 'de', 'pt', 'ar', 'bn', 'ur'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
