"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    alpha: number;
    speed: number;
    color: string;
    isBig: boolean;
}

interface FallingStar {
    x: number;
    y: number;
    speedY: number;
    speedX: number;
    length: number;
    size: number;
    color: string;
    opacity: number;
    isLanding: boolean;
}

interface Butterfly {
    t: number;
    speed: number;
    radiusX: number;
    radiusY: number;
    color: string;
    wingAngle: number;
    prevX: number;
    prevY: number;
}

interface ButterflyDust {
    x: number;
    y: number;
    size: number;
    opacity: number;
    color: string;
}

export default function WeddingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext("2d");

        if (!context) {
            return;
        }

        const ctx = context;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const colors = [
            "#ffffff",
            "#fef08a",
            "#bae6fd",
            "#fed7aa",
        ];

        let stars: Star[] = [];
        let fallingStars: FallingStar[] = [];
        let butterflyDust: ButterflyDust[] = [];

        const butterflies: Butterfly[] = [
            {
                t: 0,
                speed: 0.012,
                radiusX: 0.32,
                radiusY: 0.22,
                color: "#fef08a",
                wingAngle: 0,
                prevX: 0,
                prevY: 0,
            },
            {
                t: Math.PI,
                speed: 0.009,
                radiusX: 0.28,
                radiusY: 0.26,
                color: "#ffffff",
                wingAngle: 0,
                prevX: 0,
                prevY: 0,
            },
        ];

        function initStars() {
            stars = [];

            const numStars = Math.min(
                700,
                Math.floor((width * height) / 2500)
            );

            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5 + 0.5,
                    alpha: Math.random(),
                    speed: Math.random() * 0.02 + 0.005,
                    color:
                        colors[
                        Math.floor(Math.random() * colors.length)
                        ],
                    isBig: Math.random() < 0.15,
                });
            }
        }

        function drawSparkle(
            x: number,
            y: number,
            size: number,
            alpha: number,
            color: string
        ) {
            ctx.save();

            ctx.translate(x, y);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 0.5;

            ctx.beginPath();
            ctx.arc(
                0,
                0,
                size * 0.7,
                0,
                Math.PI * 2
            );
            ctx.fill();

            const flareLen = size * 3.5;

            ctx.beginPath();

            ctx.moveTo(-flareLen, 0);
            ctx.lineTo(flareLen, 0);

            ctx.moveTo(0, -flareLen);
            ctx.lineTo(0, flareLen);

            ctx.stroke();

            ctx.restore();
        }

        function createFallingStar() {
            if (fallingStars.length >= 20) {
                return;
            }

            fallingStars.push({
                x: Math.random() * width,
                y: -20,
                speedY: Math.random() * 3.5 + 2,
                speedX: (Math.random() - 0.5) * 0.3,
                length: Math.random() * 45 + 25,
                size: Math.random() * 1.8 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                isLanding: false,
            });
        }

        function drawButterfly(
            x: number,
            y: number,
            wingScale: number,
            angle: number,
            color: string
        ) {
            ctx.save();

            ctx.translate(x, y);
            ctx.rotate(angle);

            ctx.shadowBlur = 12;
            ctx.shadowColor = color;

            ctx.fillStyle = color;
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 0.6;

            // Cánh trái trên
            ctx.beginPath();

            ctx.ellipse(
                -8 * wingScale,
                -8,
                10 * wingScale,
                15,
                -Math.PI / 6,
                0,
                Math.PI * 2
            );

            ctx.fill();
            ctx.stroke();

            // Cánh trái dưới
            ctx.beginPath();

            ctx.ellipse(
                -6 * wingScale,
                6,
                6 * wingScale,
                10,
                Math.PI / 6,
                0,
                Math.PI * 2
            );

            ctx.fill();
            ctx.stroke();

            // Cánh phải trên
            ctx.beginPath();

            ctx.ellipse(
                8 * wingScale,
                -8,
                10 * wingScale,
                15,
                Math.PI / 6,
                0,
                Math.PI * 2
            );

            ctx.fill();
            ctx.stroke();

            // Cánh phải dưới
            ctx.beginPath();

            ctx.ellipse(
                6 * wingScale,
                6,
                6 * wingScale,
                10,
                -Math.PI / 6,
                0,
                Math.PI * 2
            );

            ctx.fill();
            ctx.stroke();

            // Thân
            ctx.fillStyle = "#ffffff";

            ctx.beginPath();

            ctx.ellipse(
                0,
                0,
                1.5,
                9,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.restore();
        }

        let animationId = 0;

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // =========================
            // SAO NỀN
            // =========================

            stars.forEach((star) => {
                star.alpha += star.speed;

                if (
                    star.alpha > 1 ||
                    star.alpha < 0
                ) {
                    star.speed = -star.speed;
                }

                const currentAlpha =
                    Math.abs(star.alpha);

                if (star.isBig) {
                    drawSparkle(
                        star.x,
                        star.y,
                        star.size,
                        currentAlpha,
                        star.color
                    );
                } else {
                    ctx.fillStyle = star.color;
                    ctx.globalAlpha = currentAlpha;

                    ctx.beginPath();

                    ctx.arc(
                        star.x,
                        star.y,
                        star.size,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();

                    ctx.globalAlpha = 1;
                }
            });

            // =========================
            // SAO RƠI
            // =========================

            if (Math.random() < 0.025) {
                createFallingStar();
            }

            for (
                let i = fallingStars.length - 1;
                i >= 0;
                i--
            ) {
                const s = fallingStars[i];

                if (!s.isLanding) {
                    s.y += s.speedY;
                    s.x += s.speedX;

                    if (s.y >= height - 10) {
                        s.y = height - 10;
                        s.isLanding = true;
                    }
                } else {
                    s.opacity -= 0.03;
                }

                if (s.opacity <= 0) {
                    fallingStars.splice(i, 1);
                    continue;
                }

                const tailX =
                    s.x -
                    s.speedX *
                    (s.length / s.speedY);

                const tailY =
                    s.y - s.length;

                const gradient =
                    ctx.createLinearGradient(
                        s.x,
                        s.y,
                        tailX,
                        tailY
                    );

                gradient.addColorStop(
                    0,
                    s.color
                );

                gradient.addColorStop(
                    0.4,
                    "rgba(255,255,255,0.5)"
                );

                gradient.addColorStop(
                    1,
                    "rgba(255,255,255,0)"
                );

                ctx.save();

                ctx.globalAlpha = s.opacity;
                ctx.shadowBlur = 8;
                ctx.shadowColor = s.color;
                ctx.strokeStyle = gradient;
                ctx.lineWidth = s.size;

                ctx.beginPath();

                ctx.moveTo(s.x, s.y);
                ctx.lineTo(tailX, tailY);

                ctx.stroke();

                drawSparkle(
                    s.x,
                    s.y,
                    s.size * 1.2,
                    s.opacity,
                    s.color
                );

                ctx.restore();
            }

            // =========================
            // BƯỚM
            // =========================

            butterflies.forEach((b) => {
                b.t += b.speed;
                b.wingAngle += 0.2;

                const centerX = width / 2;
                const centerY = height / 2;

                const x =
                    centerX +
                    Math.cos(b.t) *
                    (width * b.radiusX);

                const y =
                    centerY +
                    Math.sin(b.t * 2) *
                    (height * b.radiusY);

                const dx = x - b.prevX;
                const dy = y - b.prevY;

                const angle =
                    Math.atan2(dy, dx) +
                    Math.PI / 2;

                b.prevX = x;
                b.prevY = y;

                const wingScale =
                    Math.abs(
                        Math.sin(b.wingAngle)
                    ) *
                    0.7 +
                    0.3;

                // Bụi sao
                if (Math.random() < 0.6) {
                    butterflyDust.push({
                        x:
                            x +
                            (Math.random() - 0.5) * 10,

                        y:
                            y +
                            (Math.random() - 0.5) * 10,

                        size:
                            Math.random() * 1.5 + 0.5,

                        opacity: 1,

                        color: b.color,
                    });
                }

                drawButterfly(
                    x,
                    y,
                    wingScale,
                    angle,
                    b.color
                );
            });

            // =========================
            // BỤI SAO
            // =========================

            for (
                let i = butterflyDust.length - 1;
                i >= 0;
                i--
            ) {
                const d =
                    butterflyDust[i];

                d.opacity -= 0.02;
                d.y += 0.3;

                if (d.opacity <= 0) {
                    butterflyDust.splice(i, 1);
                    continue;
                }

                ctx.save();

                ctx.globalAlpha = d.opacity;
                ctx.fillStyle = d.color;
                ctx.shadowBlur = 5;
                ctx.shadowColor = d.color;

                ctx.beginPath();

                ctx.arc(
                    d.x,
                    d.y,
                    d.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

                ctx.restore();
            }

            animationId =
                requestAnimationFrame(animate);
        }

        function handleResize() {
            const currentCanvas = canvasRef.current;

            if (!currentCanvas) {
                return;
            }

            currentCanvas.width = window.innerWidth;
            currentCanvas.height = window.innerHeight;

            width = currentCanvas.width;
            height = currentCanvas.height;

            initStars();
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        initStars();
        animate();

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );

            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="starrySky"
        />
    );
}