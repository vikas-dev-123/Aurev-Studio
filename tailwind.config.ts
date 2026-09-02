import type { Config } from 'tailwindcss';
export default { content:['./index.html','./src/**/*.{ts,tsx}'], theme:{extend:{fontFamily:{body:['Inter','sans-serif'],display:['Instrument Serif','serif']},colors:{ink:'#f4f3ed',forest:'#07110d',fern:'#a9d6a1',ember:'#f1a26d',surface:'#0d1713',line:'rgba(255,255,255,.12)'}}},plugins:[] } satisfies Config;
