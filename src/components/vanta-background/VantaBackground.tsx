// VantaBackground.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './VantaBackground.css'

type VantaBackgroundProps = {
  color?: string;
  backgroundColor?: string;
};

const VantaBackground: React.FC<VantaBackgroundProps> = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const colorRef = useRef({ r: 255, g: 0, b: 82 }); // Initial color in RGB

  useEffect(() => {
    const VANTA = (window as any).VANTA; // Access Vanta.js from the global window object
    const THREE = (window as any).THREE; // Access Three.js from the global window object

    if (vantaRef.current && VANTA && THREE) {
      const effect = VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff0052, // Initial color
        backgroundColor: 0x0,
        THREE: THREE
      });

      setVantaEffect(effect);

      return () => {
        if (effect) {
          effect.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (vantaEffect) {
        const { innerWidth } = window;
        const halfWidth = innerWidth / 2;
        const newColor = e.clientX > halfWidth ? { r: 255, g: 0, b: 82 } : { r: 0, g: 0, b: 255 }; // Red if right, blue if left

        gsap.to(colorRef.current, {
          duration: 1,
          ...newColor,
          onUpdate: () => {
            const { r, g, b } = colorRef.current;
            const hexColor = (r << 16) | (g << 8) | b;
            vantaEffect.setOptions({ color: hexColor });
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className='vanta-bg' />;
};

export default VantaBackground;
