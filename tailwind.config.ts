import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				sans:    ["var(--font-sans)", "serif"],
				display: ["var(--font-display)", "serif"],
				mono:    ["var(--font-mono)", "monospace"],
			},
			borderRadius: {
				// Nearly square — hand-cut washi feel
				lg:  'var(--radius)',
				md:  'calc(var(--radius) + 2px)',
				sm:  'var(--radius)',
				none: '0px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to:   { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to:   { height: '0' }
				},
				// Wabi-sabi: slow, breath-like opacity fades — no translateY
				'wabi-appear': {
					from: { opacity: '0' },
					to:   { opacity: '1' }
				},
				'wabi-appear-slow': {
					from: { opacity: '0' },
					to:   { opacity: '1' }
				},
			},
			animation: {
				'accordion-down':    'accordion-down 0.2s ease-out',
				'accordion-up':      'accordion-up 0.2s ease-out',
				'wabi-in':           'wabi-appear 1.2s ease-in forwards',
				'wabi-in-slow':      'wabi-appear-slow 1.6s ease-in 0.5s forwards',
				// Keep old names as aliases so existing classes don't break immediately
				'fade-in':           'wabi-appear 1.2s ease-in forwards',
				'fade-in-delayed':   'wabi-appear-slow 1.6s ease-in 0.5s forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
