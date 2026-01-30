'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface VideoSequenceProps {
  frameCount: number;
  basePath: string;
  scrollTarget?: React.RefObject<HTMLElement>;
  className?: string;
}

export default function VideoSequence({
  frameCount,
  basePath,
  scrollTarget,
  className = '',
}: VideoSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'end start'],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, frameCount - 1]
  );

  useEffect(() => {
    const loadImages = async () => {
      const imageArray: HTMLImageElement[] = [];

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(4, '0');
        img.src = `${basePath}/frame_${frameNumber}.jpg`;
        imageArray.push(img);
      }

      await Promise.all(
        imageArray.map(
          (img) =>
            new Promise((resolve) => {
              img.onload = resolve;
            })
        )
      );

      setImages(imageArray);
      setImagesLoaded(true);
    };

    loadImages();
  }, [frameCount, basePath]);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const unsubscribe = frameIndex.on('change', (latest) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      const index = Math.round(latest);
      const img = images[index];

      if (img) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
      }
    });

    return () => unsubscribe();
  }, [frameIndex, images, imagesLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
