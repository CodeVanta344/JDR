import React, { useEffect, useRef } from 'react';

/**
 * Background animé avec particules magiques et effets de lumière
 */
export function MagicBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        // Resize canvas
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * -0.5 - 0.3;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = Math.random() > 0.7 ? '#d4af37' : '#4bcffa';
                this.life = Math.random() * 200 + 100;
                this.age = 0;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.age++;

                // Fade out over lifetime
                this.opacity = Math.max(0, 0.7 - (this.age / this.life));

                // Reset if out of bounds or too old
                if (this.y < -10 || this.opacity <= 0 || this.age > this.life) {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height + 10;
                    this.age = 0;
                    this.opacity = Math.random() * 0.5 + 0.2;
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                // Glow effect
                if (this.size > 2) {
                    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
                    gradient.addColorStop(0, `${this.color}33`);
                    gradient.addColorStop(1, 'transparent');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Initialize particles
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw subtle gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.max(canvas.width, canvas.height)
            );
            gradient.addColorStop(0, 'rgba(10, 10, 15, 0.2)');
            gradient.addColorStop(1, 'rgba(5, 5, 8, 0.4)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
}
