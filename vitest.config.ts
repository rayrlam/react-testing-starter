import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/e2e/**',                        
        ],

        environment: 'jsdom',
        globals: true,
        setupFiles: 'tests/setup.ts'
    }
});
