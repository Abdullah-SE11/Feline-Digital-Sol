'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const Hero = () => {
    const revealTextRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const revealText = revealTextRef.current;
        if (revealText) {
            revealText.style.opacity = '0';
            revealText.style.transform = 'translateY(20px)';
            revealText.style.transition = 'all 1s ease-out';

            setTimeout(() => {
                revealText.style.opacity = '1';
                revealText.style.transform = 'translateY(0)';
            }, 100);
        }
    }, []);

    return (
        <section className="hero">
            <div className="hero-content">
                <h1 ref={revealTextRef} className="reveal-text">Transforming Ideas into <span>Digital Excellence</span></h1>
                <p className="subtitle">Where creativity meets results. We build extraordinary digital experiences through
                    innovation and technology.</p>
                <div className="cta-group">
                    <Link href="#services" className="btn-main">Our Services</Link>
                    <Link href="#contact" className="btn-secondary">Let's Talk</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
