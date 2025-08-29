/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#111315',
                'dark-grey': '#9ca3af',
                'neutral-200': '#e5e7eb',
                'neutral-400': '#9ca3af',
                'neutral-500': '#6b7280',
                'neutral-700': '#374151',
                'neutral-900': '#111827',
                'emerald-500': '#10b981',
                'emerald-600': '#059669',
            }
        },
    },
    plugins: []
}
