import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
export const HERO_VIDEO='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';
export const FEATURE_VIDEO='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4';
export function VideoBackground({src=HERO_VIDEO,className=''}:{src?:string,className?:string}){const ref=useRef<HTMLVideoElement>(null);useEffect(()=>{const v=ref.current;if(!v)return; if(src.endsWith('.m3u8')&&Hls.isSupported()){const h=new Hls();h.loadSource(src);h.attachMedia(v);return()=>h.destroy()}v.src=src},[src]);return <video ref={ref} className={`absolute inset-0 w-full h-full object-cover ${className}`} autoPlay muted loop playsInline preload="auto"/>}
