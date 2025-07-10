import {defineConfig} from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	target: 'node16',
	outDir: 'dist',
	minify: false,
	external: [
		'form-data',
		'got',
		'protobufjs',
		'reconnecting-websocket',
		'tough-cookie',
		'uuid',
		'ws',
	],
});
