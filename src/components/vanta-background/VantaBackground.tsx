// VantaBackground.tsx
import React, { useEffect, useRef, useState } from 'react';
import './VantaBackground.css'

type VantaBackgroundProps = {
  color?: string;
  backgroundColor?: string;
};

const VantaBackground: React.FC<VantaBackgroundProps> = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

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
        const newColor = e.clientX > halfWidth ? 0xff0052 : 0x0000ff; // Red if right, blue if left
        vantaEffect.setOptions({ color: newColor });
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
