"use client";

import { useEffect, useRef } from "react";

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = () => {
      frame++;
      if (frame % 3 !== 0) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 12;
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="grain-overlay"
      aria-hidden="true"
    />
  );
}
