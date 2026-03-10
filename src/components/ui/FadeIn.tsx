'use client';

import { useRef, useState, useEffect, ReactNode, CSSProperties } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    className?: string;
    threshold?: number;
    style?: CSSProperties;
}

/**
 * Safari-safe scroll-triggered fade in.
 * Bypasses Framer Motion's Web Animations API (WAAPI) which causes
 * a flash bug in Safari when combined with whileInView + opacity.
 * Uses plain IntersectionObserver + CSS transitions instead.
 */
export default function FadeIn({
    children,
    delay = 0,
    duration = 0.55,
    y = 16,
    x = 0,
    className,
    threshold = 0.15,
    style,
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    const translateX = x !== 0 ? `translateX(${x}px)` : '';
    const translateY = y !== 0 ? `translateY(${y}px)` : '';
    const hiddenTransform = [translateX, translateY].filter(Boolean).join(' ') || 'none';

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : hiddenTransform,
                transition: `opacity ${duration}s cubic-bezier(0.6,0.05,0.01,0.9) ${delay}s, transform ${duration}s cubic-bezier(0.6,0.05,0.01,0.9) ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}
