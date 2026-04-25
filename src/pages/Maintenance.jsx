import React, { useState, useEffect, useRef } from 'react';
import { FaScrewdriverWrench, FaWhatsapp, FaPlay, FaRotateRight, FaTerminal } from 'react-icons/fa6';

const Maintenance = ({ onDevAccess }) => {
    const whatsappLink = "https://chat.whatsapp.com/FqBUxIT8kuT7s46Qx31OTP?mode=gi_t";
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        try {
            return localStorage.getItem('dinoHighScore') || 0;
        } catch (error) {
            console.warn('Error reading dinoHighScore from localStorage:', error);
            return 0;
        }
    });
    
    const canvasRef = useRef(null);
    const requestRef = useRef();
    
    // Game Constants
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 200;
    const DINO_WIDTH = 40;
    const DINO_HEIGHT = 40;
    const GRAVITY = 0.6;
    const JUMP_FORCE = -12;
    const INITIAL_SPEED = 5;
    const SPEED_INCREMENT = 0.001;

    const dinoRef = useRef({
        y: CANVAS_HEIGHT - DINO_HEIGHT,
        velocity: 0,
        isJumping: false
    });
    const obstaclesRef = useRef([]);
    const speedRef = useRef(INITIAL_SPEED);
    const frameCountRef = useRef(0);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        speedRef.current = INITIAL_SPEED;
        obstaclesRef.current = [];
        dinoRef.current = {
            y: CANVAS_HEIGHT - DINO_HEIGHT,
            velocity: 0,
            isJumping: false
        };
        frameCountRef.current = 0;
    };

    const jump = () => {
        if (!dinoRef.current.isJumping && gameStarted && !gameOver) {
            dinoRef.current.velocity = JUMP_FORCE;
            dinoRef.current.isJumping = true;
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                if (!gameStarted || gameOver) startGame();
                else jump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStarted, gameOver]);

    const update = () => {
        if (!gameStarted || gameOver) return;
        const dino = dinoRef.current;
        const obstacles = obstaclesRef.current;

        dino.velocity += GRAVITY;
        dino.y += dino.velocity;
        if (dino.y > CANVAS_HEIGHT - DINO_HEIGHT) {
            dino.y = CANVAS_HEIGHT - DINO_HEIGHT;
            dino.velocity = 0;
            dino.isJumping = false;
        }

        speedRef.current += SPEED_INCREMENT;
        frameCountRef.current++;
        if (frameCountRef.current % Math.floor(100 / (speedRef.current / 5)) === 0) {
            if (Math.random() > 0.5) {
                obstacles.push({
                    x: CANVAS_WIDTH,
                    width: 20 + Math.random() * 20,
                    height: 30 + Math.random() * 30
                });
            }
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].x -= speedRef.current;
            if (
                50 < obstacles[i].x + obstacles[i].width &&
                50 + DINO_WIDTH > obstacles[i].x &&
                dino.y < CANVAS_HEIGHT &&
                dino.y + DINO_HEIGHT > CANVAS_HEIGHT - obstacles[i].height
            ) {
                setGameOver(true);
                if (score > highScore) {
                    setHighScore(score);
                    try {
                        localStorage.setItem('dinoHighScore', score);
                    } catch (error) {
                        console.warn('Error setting dinoHighScore to localStorage:', error);
                    }
                }
            }
            if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1);
                setScore(s => s + 1);
            }
        }
        draw();
        requestRef.current = requestAnimationFrame(update);
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, CANVAS_HEIGHT);
        ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.stroke();

        ctx.fillStyle = '#39ff14';
        ctx.beginPath();
        ctx.roundRect(50, dinoRef.current.y, DINO_WIDTH, DINO_HEIGHT, 8);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.fillRect(75, dinoRef.current.y + 10, 5, 5);

        ctx.fillStyle = '#f43f5e';
        obstaclesRef.current.forEach(obs => {
            ctx.beginPath();
            ctx.roundRect(obs.x, CANVAS_HEIGHT - obs.height, obs.width, obs.height, 4);
            ctx.fill();
        });
    };

    const handleDevAccess = () => {
        const key = prompt("Please enter the developer access key:");
        if (key === "7019210110") {
            onDevAccess();
        } else if (key !== null) {
            alert("Invalid dev key!");
        }
    };

    useEffect(() => {
        if (gameStarted && !gameOver) {
            requestRef.current = requestAnimationFrame(update);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameStarted, gameOver]);

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="z-10 flex flex-col items-center max-w-4xl gap-12 animate-fade-in">
                {/* Maintenance Icon */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-2xl group-hover:bg-primary-500/30 transition-all duration-700"></div>
                    <div className="relative w-24 h-24 md:w-32 md:h-32 bg-zinc-950 rounded-full flex items-center justify-center border-4 border-zinc-900 shadow-2xl">
                        <FaScrewdriverWrench className="text-neon text-4xl md:text-5xl" />
                    </div>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-7xl font-bold text-neon tracking-tight">
                        We'll be back soon!
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        The Codeshack platform is currently undergoing scheduled maintenance to improve your experience. 
                        We apologize for the inconvenience and appreciate your patience. Please check back later!
                    </p>
                </div>

                {/* Game Container */}
                <div className="w-full relative group max-w-3xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-green-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-[#0a0f25] border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden w-full min-h-[300px] flex flex-col items-center justify-center">
                        {!gameStarted ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-400 mb-2">
                                    <FaPlay className="text-2xl ml-1" />
                                </div>
                                <h3 className="text-xl font-semibold">Bored? Play a quick game!</h3>
                                <p className="text-gray-500 text-sm">Press Space or the button below to start</p>
                                <button 
                                    onClick={startGame}
                                    className="mt-4 px-8 py-3 bg-neon text-black rounded-xl font-bold hover:bg-green-400 transition-colors"
                                >
                                    Start Game
                                </button>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center gap-4">
                                <div className="flex justify-between w-full px-4 text-sm font-mono text-gray-500">
                                    <span>SCORE: {score}</span>
                                    <span>HI-SCORE: {highScore}</span>
                                </div>
                                <canvas 
                                    ref={canvasRef} 
                                    width={CANVAS_WIDTH} 
                                    height={CANVAS_HEIGHT}
                                    className="w-full max-w-2xl cursor-pointer"
                                    onClick={jump}
                                />
                                {gameOver && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
                                        <h2 className="text-4xl font-bold text-red-500 mb-2">GAME OVER</h2>
                                        <p className="text-gray-300 mb-6 font-mono">Final Score: {score}</p>
                                        <button 
                                            onClick={startGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform"
                                        >
                                            <FaRotateRight /> Try Again
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* WhatsApp Community Section */}
                <div className="flex flex-col items-center gap-6 mt-4">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-zinc-500 text-sm uppercase tracking-widest font-semibold">
                            Stay Connected
                        </p>
                        <a 
                            href={whatsappLink}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5c] text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                        >
                            <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform" />
                            Join WhatsApp Community
                        </a>
                    </div>
                </div>

                {/* Footer Dots */}
                <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-500/50"></div>
                </div>
            </div>

            {/* Developer Access Button */}
            <button 
                onClick={handleDevAccess}
                className="fixed bottom-8 right-8 w-14 h-14 bg-zinc-900 border-2 border-neon/50 text-neon rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xl z-[9999] shadow-[0_0_20px_rgba(57,255,20,0.2)] animate-pulse hover:animate-none hover:scale-110"
                title="Dev Access"
            >
                <FaTerminal size={24} />
            </button>

            {/* Custom Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}} />
        </div>
    );
};

export default Maintenance;
