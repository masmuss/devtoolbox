// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		build: {
			rollupOptions: {
				output: {
					manualChunks: undefined,
				},
			},
		},
	},
	integrations: [react()],
	output: "static",
	build: {
		inlineStylesheets: "auto",
		format: "file",
	},
	compressHTML: true,
	scopedStyleStrategy: "where",
});
