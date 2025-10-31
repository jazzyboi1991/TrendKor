import { defineProperties } from "figma:react";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

export default function KoreanMemeEducation({
    primaryColor = "#FF5C35",
    secondaryColor = "#3E4CB0",
    animationSpeed = 1.5
}) {
    const [activeTab, setActiveTab] = useState(0);
    const [isVisible, setIsVisible] = useState({
        about: false,
        categories: false,
        cards: false
    });
    const [scrollY, setScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const aboutRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [viewportSize, setViewportSize] = useState("desktop"); // "mobile", "tablet", "desktop"
    
    // Define background color
    const bgColor = "#2a316f";

    // Media query for responsive design
    useEffect(() => {
        const checkViewportSize = () => {
            if (window.innerWidth < 768) {
                setViewportSize("mobile");
            } else if (window.innerWidth < 1024) {
                setViewportSize("tablet");
            } else {
                setViewportSize("desktop");
            }
        };

        checkViewportSize();
        window.addEventListener('resize', checkViewportSize);

        return () => {
            window.removeEventListener('resize', checkViewportSize);
        };
    }, []);

    // Featured memes/expressions data
    const featuredItems = [
        {
            id: 1,
            term: "갑분싸",
            romanized: "Gap-bun-ssa",
            meaning: "Sudden awkward silence in a conversation",
            example: "친구들이랑 웃고 있었는데 갑자기 민감한 주제가 나와서 갑분싸 됐어.",
            translation: "We were laughing with friends, but then a sensitive topic came up and it became awkward."
        },
        {
            id: 2,
            term: "꾸안꾸",
            romanized: "Kku-an-kku",
            meaning: "Effortless style that looks good without trying",
            example: "오늘 꾸안꾸 스타일로 입고 나왔어.",
            translation: "I dressed in an effortlessly stylish way today."
        },
        {
            id: 3,
            term: "억텐",
            romanized: "Eok-ten",
            meaning: "Exaggerated behavior or reaction",
            example: "그 유튜버는 항상 억텐을 부려서 인기가 많아.",
            translation: "That YouTuber is popular because they always act in an exaggerated way."
        }
    ];

    // Categories
    const categories = [
        { id: 0, name: "인기 밈", english: "Popular Memes" },
        { id: 1, name: "신조어", english: "New Expressions" },
        { id: 2, name: "인터넷 용어", english: "Internet Terms" },
        { id: 3, name: "K-문화", english: "K-Culture" }
    ];

    // Mouse movement effect
    useEffect(() => {
        if (viewportSize === "mobile") return; // Skip on mobile for performance

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [viewportSize]);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Intersection observer for animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -10% 0px"
        };

        const aboutObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(prev => ({ ...prev, about: true }));
                }
            },
            observerOptions
        );

        const categoriesObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(prev => ({ ...prev, categories: true }));
                }
            },
            observerOptions
        );

        const cardsObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(prev => ({ ...prev, cards: true }));
                }
            },
            observerOptions
        );

        if (aboutRef.current) {
            aboutObserver.observe(aboutRef.current);
        }

        if (categoriesRef.current) {
            categoriesObserver.observe(categoriesRef.current);
        }

        if (cardsRef.current) {
            cardsObserver.observe(cardsRef.current);
        }

        return () => {
            if (aboutRef.current) {
                aboutObserver.unobserve(aboutRef.current);
            }
            if (categoriesRef.current) {
                categoriesObserver.unobserve(categoriesRef.current);
            }
            if (cardsRef.current) {
                cardsObserver.unobserve(cardsRef.current);
            }
        };
    }, []);

    // Mobile Navigation Toggle
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Calculate background position based on mouse position
    const getBackgroundPosition = () => {
        const x = 50 + (mousePosition.x / 100);
        const y = 50 + (mousePosition.y / 100);
        return `${x}% ${y}%`;
    };

    // Rendering the Mobile Version
    const renderMobileVersion = () => (
        <div className="relative h-full overflow-x-hidden overflow-y-auto font-sans text-white" style={{ backgroundColor: bgColor }}>
            {/* Mobile Navigation */}
            <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-700 backdrop-blur-sm" style={{ backgroundColor: `${bgColor}ee` }}>
                <div className="flex items-center justify-between px-4 py-4">
                    <div className="text-xl font-light tracking-widest">TrendKor</div>
                    <button
                        className="p-2"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {isMobileMenuOpen ? (
                                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        className="backdrop-blur-lg"
                        style={{ backgroundColor: `${bgColor}fa` }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 py-6 space-y-6">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="py-3 text-lg font-light border-b border-gray-700"
                                >
                                    {[2025, 2024, 2023, 2022][category.id]}
                                </div>
                            ))}
                            <div className="flex flex-col pt-4 space-y-3">
                                <button className="w-full py-3 text-sm font-light tracking-widest uppercase border border-white">
                                    시작하기 / Get Started
                                </button>
                                <button className="w-full py-3 text-sm font-light tracking-widest text-gray-400 uppercase bg-transparent">
                                    더 알아보기 / Learn More
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section - Reduced height to ensure scrolling works */}
            <section className="relative flex flex-col items-center justify-center w-full pt-24 pb-16 overflow-hidden min-h-[80vh] max-h-[90vh]" style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 pointer-events-none select-none opacity-20">
                    {[...Array(15)].map((_, i) => {
                        const jamo = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ";
                        const char = jamo[Math.floor(Math.random() * jamo.length)];
                        const size = Math.random() * 24 + 16;
                        const amplitude = 40;
                        return (
                            <motion.span
                                key={i}
                                className="absolute font-thin"
                                style={{
                                    fontSize: `${size}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    color: i % 2 === 0 ? primaryColor : secondaryColor,
                                }}
                                animate={{
                                    y: [0, Math.random() * amplitude - amplitude / 2],
                                    x: [0, Math.random() * amplitude - amplitude / 2],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 8 + Math.random() * 8 * animationSpeed,
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </div>

                {/* Central content with Taegeuk symbol */}
                <div className="container relative z-10 flex flex-col items-center w-full max-w-full px-4 mx-auto">
                    {/* Rotating Taegeuk Symbol */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <motion.div
                            className="relative w-48 h-48"
                            style={{
                                perspective: "800px"
                            }}
                            animate={{
                                rotateY: [0, 360],
                            }}
                            transition={{
                                duration: 20,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            <svg
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full drop-shadow-2xl"
                                style={{
                                    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))",
                                }}
                            >
                                <defs>
                                    <linearGradient id="primaryGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${primaryColor}BB`} />
                                        <stop offset="100%" stopColor={primaryColor} />
                                    </linearGradient>
                                    <linearGradient id="secondaryGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${secondaryColor}BB`} />
                                        <stop offset="100%" stopColor={secondaryColor} />
                                    </linearGradient>
                                    <filter id="glowMobile" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="5" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <circle cx="100" cy="100" r="95" fill="none" stroke="#333" strokeWidth="1" />
                                <g>
                                    <path d="M100 5 A95 95 0 1 1 100 195 A47.5 47.5 0 1 0 100 5" fill="url(#primaryGradientMobile)" filter="url(#glowMobile)" />
                                    <path d="M100 195 A95 95 0 1 1 100 5 A47.5 47.5 0 1 0 100 195" fill="url(#secondaryGradientMobile)" filter="url(#glowMobile)" />
                                </g>
                            </svg>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1
                            className="mb-4 text-5xl tracking-tighter font-extralight"
                            style={{
                                color: '#fff',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            TrendKor
                        </h1>
                        <p className="mb-8 text-base font-light tracking-widest text-gray-300 uppercase">
                            Trends Explained, Culture Unveiled.
                        </p>
                        <div className="flex flex-col w-full gap-3">
                            <motion.button
                                className="w-full py-4 text-sm font-light tracking-wider text-white uppercase transition-all border border-white"
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                시작하기 / Get Started
                            </motion.button>
                            <motion.button
                                className="w-full py-4 text-sm font-light tracking-wider text-gray-300 uppercase transition-all border border-gray-700"
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                더 알아보기 / Learn More
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="flex flex-col items-center mt-12"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="mb-2 text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative py-16 overflow-hidden" ref={aboutRef} style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-10"></div>

                <div className="container relative w-full max-w-full px-4 mx-auto">
                    <div className="flex flex-col gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 30 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.span
                                className="inline-block mb-3 text-xs tracking-widest text-gray-400 uppercase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isVisible.about ? 1 : 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                트렌드코어
                            </motion.span>
                            <h2 className="mb-6 text-3xl tracking-tight break-keep font-extralight">
                                <span style={{ color: secondaryColor }}>왜</span> 한국 밈을 <br />배워야 할까요?
                            </h2>
                            <h3 className="mb-6 text-xl font-light text-gray-300">
                                Why learn Korean memes and expressions?
                            </h3>
                            <div className="space-y-6 text-base font-light leading-relaxed text-gray-300">
                                <p>
                                    한국의 인터넷 문화와 밈은 K-pop, K-drama와 함께 세계적으로 인기를 얻고 있습니다.
                                    하지만 이러한 표현들은 번역하기 어렵고 문화적 맥락이 필요합니다.
                                </p>
                                <p>
                                    Korean internet culture and memes are gaining global popularity alongside K-pop and K-dramas.
                                    However, these expressions are often difficult to translate and require cultural context.
                                </p>
                                <p>
                                    우리 사이트는 외국인들이 한국의 밈, 신조어, 인터넷 용어를 쉽게 이해할 수 있도록
                                    설명과 예시를 제공합니다.
                                </p>
                                <p>
                                    Our site helps foreigners easily understand Korean memes, new expressions, and internet terms
                                    through explanations and examples.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 30 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        >
                            {[
                                { text: "ㅋㅋㅋ", meaning: "Laughter (like 'hahaha')" },
                                { text: "ㅠㅠ", meaning: "Crying (like T_T)" },
                                { text: "대박", meaning: "Awesome/Daebak" },
                                { text: "화이팅", meaning: "Fighting/Cheer up" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center justify-center p-6 text-center rounded-md backdrop-blur-sm"
                                    style={{
                                        backgroundColor: "rgba(30, 35, 80, 0.8)",
                                        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                                        border: "1px solid rgba(255,255,255,0.05)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div
                                        className="mb-2 text-4xl font-light"
                                        style={{ color: index % 2 === 0 ? primaryColor : secondaryColor }}
                                    >
                                        {item.text}
                                    </div>
                                    <div className="text-sm font-light tracking-wide text-gray-300 line-clamp-2">{item.meaning}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="relative py-16" ref={categoriesRef} style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-transparent opacity-10"></div>

                <div className="container relative z-10 w-full max-w-full px-4 mx-auto">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="inline-block mb-3 text-xs tracking-widest text-gray-400 uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible.categories ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            콜렉션
                        </motion.span>
                        <h2 className="mb-4 text-3xl tracking-tight break-keep font-extralight">연도별 밈 / Memes of The Year</h2>
                        <p className="mx-auto text-base font-light text-gray-300">
                            Discover the best memes of Korean Culture
                        </p>
                    </motion.div>

                    <motion.div
                        className="mb-8 overflow-x-auto hide-scrollbar"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex justify-center pb-4 space-x-4 md:justify-start">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`px-5 py-3 whitespace-nowrap transition-all uppercase tracking-widest text-xs ${
                                        activeTab === category.id 
                                            ? "font-light" 
                                            : "text-gray-400 hover:text-white font-extralight"
                                    }`}
                                    style={{
                                        borderRadius: "4px",
                                        backgroundColor: activeTab === category.id ? "rgba(255, 255, 255, 0.1)" : "transparent",
                                        border: activeTab === category.id ? `1px solid ${primaryColor}` : "1px solid rgba(255,255,255,0.1)",
                                    }}
                                    onClick={() => setActiveTab(category.id)}
                                >
                                    {[2025, 2024, 2023, 2022][category.id]}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="space-y-6" ref={cardsRef}>
                        {featuredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                className="overflow-hidden rounded-md backdrop-blur-sm"
                                style={{
                                    backgroundColor: "rgba(30, 35, 80, 0.8)",
                                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                                    border: "1px solid rgba(255,255,255,0.05)"
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isVisible.cards ? 1 : 0,
                                    y: isVisible.cards ? 0 : 20
                                }}
                                transition={{ duration: 0.8, delay: 0.1 * idx }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex flex-col p-6">
                                    <div className="flex flex-wrap items-start justify-between mb-4 gap-y-4">
                                        <div className="flex-grow mr-4">
                                            <h3
                                                className="mb-1 text-2xl font-light break-keep"
                                                style={{ color: primaryColor }}
                                            >
                                                {item.term}
                                            </h3>
                                            <p className="text-sm font-light tracking-wider text-gray-400">{item.romanized}</p>
                                        </div>
                                        <div
                                            className="flex items-center justify-center w-10 h-10 text-white rounded-full flex-shrink-0"
                                            style={{
                                                backgroundColor: "transparent",
                                                border: `1px solid ${secondaryColor}`
                                            }}
                                        >
                                            {item.id}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="mb-1 text-xs tracking-widest text-gray-500 uppercase">Meaning:</div>
                                        <p className="text-sm font-light text-gray-200">{item.meaning}</p>
                                    </div>

                                    <div className="p-4 mb-4 rounded-md" style={{ backgroundColor: "rgba(30, 41, 59, 0.7)" }}>
                                        <div className="mb-1 text-xs tracking-widest text-gray-500 uppercase">Example:</div>
                                        <p className="mb-2 text-sm font-light text-gray-300 break-keep">{item.example}</p>
                                        <p className="text-xs italic text-gray-400 font-extralight">{item.translation}</p>
                                    </div>

                                    <button
                                        className="w-full py-3 mt-auto text-xs font-light tracking-widest text-center text-white uppercase transition-all hover:text-gray-200"
                                        style={{
                                            borderTop: `1px solid ${secondaryColor}`,
                                            backgroundColor: "transparent"
                                        }}
                                    >
                                        더 알아보기 / Learn More
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.cards ? 1 : 0, y: isVisible.cards ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button
                            className="flex items-center justify-center w-full py-4 text-xs font-light tracking-widest text-white uppercase transition-all border border-white"
                            style={{
                                backgroundColor: "transparent",
                            }}
                        >
                            <span>더 많은 표현 보기</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Mobile Footer */}
            <footer className="relative py-12" style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="container relative z-10 w-full max-w-full px-4 mx-auto">
                    <div className="flex flex-col pt-8 border-t border-gray-700">
                        <div className="mb-8">
                            <h2 className="mb-4 text-2xl font-light tracking-tight">트렌드코어</h2>
                            <p className="text-sm font-light text-gray-400">
                                Helping foreigners understand Korean memes, new expressions, and internet culture
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="mb-4 text-xs tracking-widest text-gray-400 uppercase">카테고리</h3>
                                <ul className="space-y-3 text-sm font-light text-gray-400">
                                    <li className="transition-colors hover:text-white">인기 밈</li>
                                    <li className="transition-colors hover:text-white">신조어</li>
                                    <li className="transition-colors hover:text-white">인터넷 용어</li>
                                    <li className="transition-colors hover:text-white">K-문화</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-4 text-xs tracking-widest text-gray-400 uppercase">링크</h3>
                                <ul className="space-y-3 text-sm font-light text-gray-400">
                                    <li className="transition-colors hover:text-white">소개</li>
                                    <li className="transition-colors hover:text-white">자주 묻는 질문</li>
                                    <li className="transition-colors hover:text-white">연락처</li>
                                    <li className="transition-colors hover:text-white">개인정보 보호</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="mb-4 text-xs tracking-widest text-gray-400 uppercase">팔로우</h3>
                            <div className="flex flex-wrap space-x-4">
                                {["Instagram", "Twitter", "YouTube", "TikTok"].map((social, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="flex items-center justify-center w-10 h-10 mb-2 transition-colors border border-gray-700 rounded-full hover:border-white"
                                    >
                                        <span className="text-gray-500">{social.charAt(0)}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-8 text-xs font-light text-center text-gray-600 border-t border-gray-800">
                        <p>© 2023 트렌드코어 | TrendKor. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );

    // Rendering the Tablet Version
    const renderTabletVersion = () => (
        <div className="relative h-full overflow-x-hidden overflow-y-auto font-sans text-white" style={{ backgroundColor: bgColor }}>
            {/* Tablet Navigation */}
            <nav className="fixed top-0 left-0 z-50 w-full backdrop-blur-sm" style={{ backgroundColor: `${bgColor}ee` }}>
                <div className="flex items-center justify-between w-full px-6 py-5 mx-auto">
                    <div className="text-xl font-light tracking-widest">TrendKor</div>
                    <div className="flex items-center">
                        <div className="flex space-x-4 mr-8">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`transition-all uppercase tracking-widest text-xs ${
                                        activeTab === category.id 
                                            ? "font-light" 
                                            : "text-gray-400 hover:text-white font-extralight"
                                    }`}
                                    style={{
                                        borderBottom: activeTab === category.id ? `1px solid ${primaryColor}` : "1px solid transparent",
                                    }}
                                    onClick={() => setActiveTab(category.id)}
                                >
                                    {[2025, 2024, 2023, 2022][category.id]}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-3">
                            <motion.button
                                className="px-5 py-1.5 text-xs font-light tracking-wider text-white uppercase transition-all border border-white hover:bg-white hover:text-black"
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                시작하기
                            </motion.button>
                            <motion.button
                                className="px-5 py-1.5 text-xs font-light tracking-wider text-gray-400 uppercase transition-all border border-gray-700 hover:border-gray-400 hover:text-white"
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                더 알아보기
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative flex items-center justify-center w-full overflow-hidden pt-24 min-h-[80vh] max-h-[90vh]" style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 pointer-events-none select-none opacity-20">
                    {[...Array(20)].map((_, i) => {
                        const jamo = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ";
                        const char = jamo[Math.floor(Math.random() * jamo.length)];
                        const size = Math.random() * 28 + 20; // Slightly smaller than desktop
                        const amplitude = 45;
                        return (
                            <motion.span
                                key={i}
                                className="absolute font-thin"
                                style={{
                                    fontSize: `${size}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    color: i % 2 === 0 ? primaryColor : secondaryColor,
                                }}
                                animate={{
                                    y: [0, Math.random() * amplitude - amplitude / 2],
                                    x: [0, Math.random() * amplitude - amplitude / 2],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 9 + Math.random() * 9 * animationSpeed,
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </div>

                {/* Central content with Taegeuk symbol */}
                <div className="container relative z-10 flex flex-col items-center w-full max-w-3xl px-6 pt-10 mx-auto">
                    {/* Rotating Taegeuk Symbol */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <motion.div
                            className="relative w-64 h-64"
                            style={{
                                perspective: "900px"
                            }}
                            animate={{
                                rotateY: [0, 360],
                            }}
                            transition={{
                                duration: 20,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            <svg
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full drop-shadow-2xl"
                                style={{
                                    filter: "drop-shadow(0 0 25px rgba(255,255,255,0.15))",
                                }}
                            >
                                <defs>
                                    <linearGradient id="primaryGradientTablet" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${primaryColor}BB`} />
                                        <stop offset="100%" stopColor={primaryColor} />
                                    </linearGradient>
                                    <linearGradient id="secondaryGradientTablet" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${secondaryColor}BB`} />
                                        <stop offset="100%" stopColor={secondaryColor} />
                                    </linearGradient>
                                    <filter id="glowTablet" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="5" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <circle cx="100" cy="100" r="95" fill="none" stroke="#333" strokeWidth="1" />
                                <g>
                                    <path d="M100 5 A95 95 0 1 1 100 195 A47.5 47.5 0 1 0 100 5" fill="url(#primaryGradientTablet)" filter="url(#glowTablet)" />
                                    <path d="M100 195 A95 95 0 1 1 100 5 A47.5 47.5 0 1 0 100 195" fill="url(#secondaryGradientTablet)" filter="url(#glowTablet)" />
                                </g>
                            </svg>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1
                            className="mb-5 text-5xl tracking-tighter font-extralight"
                            style={{
                                color: '#fff',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            TrendKor
                        </h1>
                        <p className="mb-8 text-lg font-light tracking-widest text-gray-300 uppercase">
                            Trends Explained, Culture Unveiled.
                        </p>
                        <div className="flex justify-center gap-6">
                            <motion.button
                                className="px-8 py-2.5 text-sm font-light tracking-wider text-white uppercase transition-all border-b-2 border-transparent hover:border-white"
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.2 }}
                            >
                                시작하기 / Get Started
                            </motion.button>
                            <motion.button
                                className="px-8 py-2.5 text-sm font-light tracking-wider text-gray-300 uppercase transition-all border-b-2 border-transparent hover:border-gray-300"
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.2 }}
                            >
                                더 알아보기 / Learn More
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="flex flex-col items-center mt-10"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="mb-2 text-sm tracking-widest text-gray-500 uppercase">Scroll</span>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative py-24 overflow-hidden" ref={aboutRef} style={{ backgroundColor: bgColor }}>
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-10"
                    style={{
                        backgroundSize: "200% 200%",
                        backgroundPosition: getBackgroundPosition(),
                    }}
                ></div>

                <div className="container relative w-full max-w-4xl px-6 mx-auto">
                    <div className="flex flex-col items-start gap-12 md:flex-row">
                        <motion.div
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: isVisible.about ? 1 : 0, x: isVisible.about ? 0 : -30 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <motion.span
                                className="inline-block mb-3 text-xs tracking-widest text-gray-400 uppercase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isVisible.about ? 1 : 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                트렌드코어
                            </motion.span>
                            <h2 className="mb-6 text-3xl tracking-tight break-keep font-extralight">
                                <span style={{ color: secondaryColor }}>왜</span> 한국 밈을 <br />배워야 할까요?
                            </h2>
                            <h3 className="mb-6 text-xl font-light text-gray-300">
                                Why learn Korean memes and expressions?
                            </h3>
                            <div className="space-y-5 text-base font-light leading-relaxed text-gray-300">
                                <p>
                                    한국의 인터넷 문화와 밈은 K-pop, K-drama와 함께 세계적으로 인기를 얻고 있습니다.
                                    하지만 이러한 표현들은 번역하기 어렵고 문화적 맥락이 필요합니다.
                                </p>
                                <p>
                                    Korean internet culture and memes are gaining global popularity alongside K-pop and K-dramas.
                                    However, these expressions are often difficult to translate and require cultural context.
                                </p>
                                <p>
                                    우리 사이트는 외국인들이 한국의 밈, 신조어, 인터넷 용어를 쉽게 이해할 수 있도록
                                    설명과 예시를 제공합니다.
                                </p>
                                <p>
                                    Our site helps foreigners easily understand Korean memes, new expressions, and internet terms
                                    through explanations and examples.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="grid w-full grid-cols-2 gap-5 md:w-1/2"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: isVisible.about ? 1 : 0, x: isVisible.about ? 0 : 30 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        >
                            {[
                                { text: "ㅋㅋㅋ", meaning: "Laughter (like 'hahaha')" },
                                { text: "ㅠㅠ", meaning: "Crying (like T_T)" },
                                { text: "대박", meaning: "Awesome/Daebak" },
                                { text: "화이팅", meaning: "Fighting/Cheer up" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center justify-center p-6 text-center rounded-md backdrop-blur-sm"
                                    style={{
                                        backgroundColor: "rgba(30, 35, 80, 0.8)",
                                        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                                        border: "1px solid rgba(255,255,255,0.05)"
                                    }}
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                >
                                    <div
                                        className="mb-3 text-4xl font-light"
                                        style={{ color: index % 2 === 0 ? primaryColor : secondaryColor }}
                                    >
                                        {item.text}
                                    </div>
                                    <div className="font-light tracking-wide text-gray-300">{item.meaning}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="relative py-24" ref={categoriesRef} style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-transparent opacity-10"></div>

                <div className="container relative z-10 w-full max-w-4xl px-6 mx-auto">
                    <motion.div
                        className="mb-16 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="inline-block mb-3 text-xs tracking-widest text-gray-400 uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible.categories ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            콜렉션
                        </motion.span>
                        <h2 className="mb-5 text-3xl tracking-tight break-keep font-extralight">연도별 밈 / Memes of The Year</h2>
                        <p className="max-w-2xl mx-auto text-base font-light text-gray-300">
                            Discover the best memes of Korean Culture
                        </p>
                    </motion.div>

                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex justify-center pb-4 mb-4">
                            <div className="flex space-x-6">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`py-2 whitespace-nowrap transition-all uppercase tracking-widest text-sm ${
                                            activeTab === category.id 
                                                ? "font-light" 
                                                : "text-gray-400 hover:text-white font-extralight"
                                        }`}
                                        style={{
                                            borderBottom: activeTab === category.id ? `1px solid ${primaryColor}` : "1px solid transparent",
                                        }}
                                        onClick={() => setActiveTab(category.id)}
                                    >
                                        {[2025, 2024, 2023, 2022][category.id]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2" ref={cardsRef}>
                        {featuredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                className="h-full overflow-hidden rounded-md backdrop-blur-sm"
                                style={{
                                    backgroundColor: "rgba(30, 35, 80, 0.8)",
                                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                                    border: "1px solid rgba(255,255,255,0.05)"
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{
                                    opacity: isVisible.cards ? 1 : 0,
                                    y: isVisible.cards ? 0 : 30
                                }}
                                transition={{ duration: 0.8, delay: 0.1 * idx }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div className="flex flex-col h-full p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3
                                                className="mb-1 text-2xl font-light break-keep"
                                                style={{ color: primaryColor }}
                                            >
                                                {item.term}
                                            </h3>
                                            <p className="font-light tracking-wider text-gray-400">{item.romanized}</p>
                                        </div>
                                        <div
                                            className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-lg text-white rounded-full"
                                            style={{
                                                backgroundColor: "transparent",
                                                border: `1px solid ${secondaryColor}`
                                            }}
                                        >
                                            {item.id}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="mb-2 text-xs tracking-widest text-gray-500 uppercase">Meaning:</div>
                                        <p className="font-light text-gray-200">{item.meaning}</p>
                                    </div>

                                    <div className="p-5 mb-6 rounded-md" style={{ backgroundColor: "rgba(30, 41, 59, 0.7)" }}>
                                        <div className="mb-2 text-xs tracking-widest text-gray-500 uppercase">Example:</div>
                                        <p className="mb-3 font-light text-gray-300 break-keep">{item.example}</p>
                                        <p className="text-sm italic text-gray-400 font-extralight">{item.translation}</p>
                                    </div>

                                    <button
                                        className="w-full py-3 mt-auto text-sm font-light tracking-widest text-center text-white uppercase transition-all hover:text-gray-200"
                                        style={{
                                            borderTop: `1px solid ${secondaryColor}`,
                                            backgroundColor: "transparent"
                                        }}
                                    >
                                        더 알아보기 / Learn More
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-10 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.cards ? 1 : 0, y: isVisible.cards ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button
                            className="inline-flex items-center px-10 py-3 text-sm font-light tracking-widest text-white uppercase transition-all border border-white hover:bg-white hover:text-black"
                            style={{
                                backgroundColor: "transparent",
                            }}
                        >
                            <span>더 많은 표현 보기 / See More</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Tablet Footer */}
            <footer className="relative py-16" style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="container relative z-10 w-full max-w-4xl px-6 mx-auto">
                    <div className="flex flex-col justify-between pt-12 border-t border-gray-700 md:flex-row">
                        <div className="max-w-sm mb-10 md:mb-0">
                            <h2 className="mb-5 text-2xl font-light tracking-tight">트렌드코어</h2>
                            <p className="font-light leading-relaxed text-gray-400">
                                Helping foreigners understand Korean memes, new expressions, and internet culture
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-10 md:flex md:gap-16">
                            <div>
                                <h3 className="mb-5 text-sm tracking-widest text-gray-400 uppercase">카테고리</h3>
                                <ul className="space-y-3 font-light text-gray-400">
                                    <li className="transition-colors cursor-pointer hover:text-white">인기 밈</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">신조어</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">인터넷 용어</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">K-문화</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-5 text-sm tracking-widest text-gray-400 uppercase">링크</h3>
                                <ul className="space-y-3 font-light text-gray-400">
                                    <li className="transition-colors cursor-pointer hover:text-white">소개</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">자주 묻는 질문</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">연락처</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">개인정보 보호</li>
                                </ul>
                            </div>

                            <div className="col-span-2 mt-6 md:mt-0">
                                <h3 className="mb-5 text-sm tracking-widest text-gray-400 uppercase">팔로우</h3>
                                <div className="flex space-x-4">
                                    {["Instagram", "Twitter", "YouTube", "TikTok"].map((social, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-700 rounded-full hover:border-white group"
                                        >
                                            <span className="text-gray-500 group-hover:text-white">{social.charAt(0)}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 mt-12 font-light text-center text-gray-600 border-t border-gray-800">
                        <p>© 2023 트렌드코어 | TrendKor. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            
            .bg-gradient-radial {
              background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
            }
            
            /* Korean text wrapping support */
            .break-keep {
              word-break: keep-all;
              overflow-wrap: break-word;
            }
          `}</style>
        </div>
    );

    // Rendering the Desktop Version
    const renderDesktopVersion = () => (
        <div className="relative h-full overflow-x-hidden overflow-y-auto font-sans text-white" style={{ backgroundColor: bgColor }}>
            {/* Desktop Navigation */}
            <nav className="fixed top-0 left-0 z-50 w-full backdrop-blur-sm" style={{ backgroundColor: `${bgColor}ee` }}>
                <div className="container px-6 mx-auto">
                    <div className="flex items-center justify-between py-6">
                        <div className="text-2xl font-light tracking-widest">TrendKor</div>
                        <div className="flex items-center space-x-12">
                            <div className="flex space-x-10">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`transition-all uppercase tracking-widest text-sm ${
                                            activeTab === category.id 
                                                ? "font-light" 
                                                : "text-gray-400 hover:text-white font-extralight"
                                        }`}
                                        style={{
                                            borderBottom: activeTab === category.id ? `1px solid ${primaryColor}` : "1px solid transparent",
                                        }}
                                        onClick={() => setActiveTab(category.id)}
                                    >
                                        {[2025, 2024, 2023, 2022][category.id]}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center space-x-5">
                                <motion.button
                                    className="px-8 py-2 font-light tracking-wider text-white uppercase transition-all border border-white hover:bg-white hover:text-black"
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    시작하기
                                </motion.button>
                                <motion.button
                                    className="px-8 py-2 font-light tracking-wider text-gray-400 uppercase transition-all border border-gray-700 hover:border-gray-400 hover:text-white"
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    더 알아보기
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Adjusted for better scrolling */}
            <section className="relative flex items-center justify-center w-full overflow-hidden pt-20 min-h-[80vh] max-h-[90vh]" style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 pointer-events-none select-none opacity-20">
                    {[...Array(20)].map((_, i) => {
                        const jamo = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ";
                        const char = jamo[Math.floor(Math.random() * jamo.length)];
                        const size = Math.random() * 32 + 22;
                        const amplitude = 50;
                        return (
                            <motion.span
                                key={i}
                                className="absolute font-thin"
                                style={{
                                    fontSize: `${size}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    color: i % 2 === 0 ? primaryColor : secondaryColor,
                                }}
                                animate={{
                                    y: [0, Math.random() * amplitude - amplitude / 2],
                                    x: [0, Math.random() * amplitude - amplitude / 2],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 10 + Math.random() * 10 * animationSpeed,
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </div>

                {/* Central content with Taegeuk symbol */}
                <div className="container relative z-10 flex flex-col items-center px-4 pt-10 mx-auto">
                    {/* Rotating Taegeuk Symbol */}
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <motion.div
                            className="relative w-80 h-80"
                            style={{
                                perspective: "1000px"
                            }}
                            animate={{
                                rotateY: [0, 360],
                            }}
                            transition={{
                                duration: 20,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            <svg
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full drop-shadow-2xl"
                                style={{
                                    filter: "drop-shadow(0 0 30px rgba(255,255,255,0.15))",
                                }}
                            >
                                <defs>
                                    <linearGradient id="primaryGradientDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${primaryColor}BB`} />
                                        <stop offset="100%" stopColor={primaryColor} />
                                    </linearGradient>
                                    <linearGradient id="secondaryGradientDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${secondaryColor}BB`} />
                                        <stop offset="100%" stopColor={secondaryColor} />
                                    </linearGradient>
                                    <filter id="glowDesktop" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="5" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <circle cx="100" cy="100" r="95" fill="none" stroke="#333" strokeWidth="1" />
                                <g>
                                    <path d="M100 5 A95 95 0 1 1 100 195 A47.5 47.5 0 1 0 100 5" fill="url(#primaryGradientDesktop)" filter="url(#glowDesktop)" />
                                    <path d="M100 195 A95 95 0 1 1 100 5 A47.5 47.5 0 1 0 100 195" fill="url(#secondaryGradientDesktop)" filter="url(#glowDesktop)" />
                                </g>
                            </svg>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1
                            className="mb-6 text-6xl tracking-tighter lg:text-7xl font-extralight"
                            style={{
                                color: '#fff',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            TrendKor
                        </h1>
                        <p className="mb-8 text-xl font-light tracking-widest text-gray-300 uppercase">
                            Trends Explained, Culture Unveiled.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 text-center">
                            <motion.button
                                className="px-10 py-3 text-base font-light tracking-wider text-white uppercase transition-all border-b-2 border-transparent lg:text-lg hover:border-white"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                시작하기 / Get Started
                            </motion.button>
                            <motion.button
                                className="px-10 py-3 text-base font-light tracking-wider text-gray-300 uppercase transition-all border-b-2 border-transparent lg:text-lg hover:border-gray-300"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                더 알아보기 / Learn More
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="flex flex-col items-center mt-10"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="mb-2 text-sm tracking-widest text-gray-500 uppercase">Scroll</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative py-32 overflow-hidden" ref={aboutRef} style={{ backgroundColor: bgColor }}>
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-10"
                    style={{
                        backgroundSize: "200% 200%",
                        backgroundPosition: getBackgroundPosition(),
                    }}
                ></div>

                <div className="container relative px-6 mx-auto">
                    <div className="flex flex-row flex-wrap items-start gap-16 lg:gap-24">
                        <motion.div
                            className="w-full lg:w-5/12"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: isVisible.about ? 1 : 0, x: isVisible.about ? 0 : -50 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <motion.span
                                className="inline-block mb-3 text-xs tracking-widest text-gray-400 uppercase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isVisible.about ? 1 : 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                트렌드코어
                            </motion.span>
                            <h2 className="mb-8 text-4xl tracking-tight lg:text-5xl font-extralight break-keep">
                                <span style={{ color: secondaryColor }}>왜</span> 한국 밈을 <br />배워야 할까요?
                            </h2>
                            <h3 className="mb-8 text-xl font-light text-gray-300">
                                Why learn Korean memes and expressions?
                            </h3>
                            <div className="space-y-6 text-base font-light leading-relaxed text-gray-300 lg:text-lg">
                                <p className="break-keep">
                                    한국의 인터넷 문화와 밈은 K-pop, K-drama와 함께 세계적으로 인기를 얻고 있습니다.
                                    하지만 이러한 표현들은 번역하기 어렵고 문화적 맥락이 필요합니다.
                                </p>
                                <p>
                                    Korean internet culture and memes are gaining global popularity alongside K-pop and K-dramas.
                                    However, these expressions are often difficult to translate and require cultural context.
                                </p>
                                <p className="break-keep">
                                    우리 사이트는 외국인들이 한국의 밈, 신조어, 인터넷 용어를 쉽게 이해할 수 있도록
                                    설명과 예시를 제공합니다.
                                </p>
                                <p>
                                    Our site helps foreigners easily understand Korean memes, new expressions, and internet terms
                                    through explanations and examples.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="grid w-full grid-cols-2 gap-6 lg:w-6/12 lg:gap-8"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: isVisible.about ? 1 : 0, x: isVisible.about ? 0 : 50 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        >
                            {[
                                { text: "ㅋㅋㅋ", meaning: "Laughter (like 'hahaha')" },
                                { text: "ㅠㅠ", meaning: "Crying (like T_T)" },
                                { text: "대박", meaning: "Awesome/Daebak" },
                                { text: "화이팅", meaning: "Fighting/Cheer up" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center justify-center p-8 text-center rounded-md backdrop-blur-sm"
                                    style={{
                                        backgroundColor: "rgba(30, 35, 80, 0.8)",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                        border: "1px solid rgba(255,255,255,0.05)"
                                    }}
                                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                >
                                    <div
                                        className="mb-3 text-5xl font-light"
                                        style={{ color: index % 2 === 0 ? primaryColor : secondaryColor }}
                                    >
                                        {item.text}
                                    </div>
                                    <div className="font-light tracking-wide text-gray-300">{item.meaning}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="relative py-32" ref={categoriesRef} style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-transparent opacity-10"></div>

                <div className="container relative z-10 px-6 mx-auto">
                    <motion.div
                        className="mb-16 text-center lg:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="inline-block mb-3 text-xs tracking-widest text-gray-400 uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible.categories ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            콜렉션
                        </motion.span>
                        <h2 className="mb-5 text-4xl tracking-tight lg:text-5xl font-extralight break-keep">연도별 밈 / Memes of The Year</h2>
                        <p className="max-w-2xl mx-auto text-lg font-light text-gray-300">
                            Discover the best memes of Korean Culture
                        </p>
                    </motion.div>

                    <motion.div
                        className="mb-12 lg:mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex justify-center pb-4 mb-4 overflow-x-auto hide-scrollbar">
                            <div className="flex mx-auto space-x-6 lg:space-x-10">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`py-3 whitespace-nowrap transition-all uppercase tracking-widest text-sm ${
                                            activeTab === category.id 
                                                ? "font-light" 
                                                : "text-gray-400 hover:text-white font-extralight"
                                        }`}
                                        style={{
                                            borderBottom: activeTab === category.id ? `1px solid ${primaryColor}` : "1px solid transparent",
                                        }}
                                        onClick={() => setActiveTab(category.id)}
                                    >
                                        {[2025, 2024, 2023, 2022][category.id]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" ref={cardsRef}>
                        {featuredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                className="h-full overflow-hidden rounded-md backdrop-blur-sm"
                                style={{
                                    backgroundColor: "rgba(30, 35, 80, 0.8)",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                    border: "1px solid rgba(255,255,255,0.05)"
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{
                                    opacity: isVisible.cards ? 1 : 0,
                                    y: isVisible.cards ? 0 : 30
                                }}
                                transition={{ duration: 0.8, delay: 0.1 * idx }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            >
                                <div className="flex flex-col h-full p-8 lg:p-10">
                                    <div className="flex items-start justify-between mb-6 lg:mb-8">
                                        <div>
                                            <h3
                                                className="mb-1 text-2xl font-light lg:text-3xl break-keep"
                                                style={{ color: primaryColor }}
                                            >
                                                {item.term}
                                            </h3>
                                            <p className="font-light tracking-wider text-gray-400">{item.romanized}</p>
                                        </div>
                                        <div
                                            className="flex items-center justify-center w-10 h-10 text-lg text-white rounded-full lg:w-12 lg:h-12"
                                            style={{
                                                backgroundColor: "transparent",
                                                border: `1px solid ${secondaryColor}`
                                            }}
                                        >
                                            {item.id}
                                        </div>
                                    </div>

                                    <div className="mb-6 lg:mb-8">
                                        <div className="mb-2 text-xs tracking-widest text-gray-500 uppercase">Meaning:</div>
                                        <p className="font-light text-gray-200">{item.meaning}</p>
                                    </div>

                                    <div className="p-5 mb-6 rounded-md lg:p-6 lg:mb-8" style={{ backgroundColor: "rgba(30, 41, 59, 0.7)" }}>
                                        <div className="mb-2 text-xs tracking-widest text-gray-500 uppercase">Example:</div>
                                        <p className="mb-3 font-light text-gray-300 break-keep">{item.example}</p>
                                        <p className="text-sm italic text-gray-400 font-extralight">{item.translation}</p>
                                    </div>

                                    <button
                                        className="w-full py-3 mt-auto text-sm font-light tracking-widest text-center text-white uppercase transition-all hover:text-gray-200"
                                        style={{
                                            borderTop: `1px solid ${secondaryColor}`,
                                            backgroundColor: "transparent"
                                        }}
                                    >
                                        더 알아보기 / Learn More
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-12 text-center lg:mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.cards ? 1 : 0, y: isVisible.cards ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button
                            className="inline-flex items-center px-10 py-3 text-sm font-light tracking-widest text-white uppercase transition-all border border-white lg:px-12 lg:py-4 hover:bg-white hover:text-black"
                            style={{
                                backgroundColor: "transparent",
                            }}
                        >
                            <span>더 많은 표현 보기 / See More Expressions</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Desktop Footer */}
            <footer className="relative py-20" style={{ backgroundColor: bgColor }}>
                <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="container relative z-10 px-6 mx-auto">
                    <div className="flex flex-col justify-between pt-16 border-t border-gray-700 md:flex-row">
                        <div className="max-w-md mb-10 md:mb-0">
                            <h2 className="mb-6 text-2xl font-light tracking-tight lg:text-3xl lg:mb-8">트렌드코어</h2>
                            <p className="font-light leading-relaxed text-gray-400">
                                Helping foreigners understand Korean memes, new expressions, and internet culture
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-12 md:gap-16 lg:gap-24">
                            <div>
                                <h3 className="mb-6 text-sm tracking-widest text-gray-400 uppercase lg:mb-8">카테고리 / Categories</h3>
                                <ul className="space-y-4 font-light text-gray-400 lg:space-y-5">
                                    <li className="transition-colors cursor-pointer hover:text-white">인기 밈 / Popular Memes</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">신조어 / New Expressions</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">인터넷 용어 / Internet Terms</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">K-문화 / K-Culture</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-6 text-sm tracking-widest text-gray-400 uppercase lg:mb-8">링크 / Links</h3>
                                <ul className="space-y-4 font-light text-gray-400 lg:space-y-5">
                                    <li className="transition-colors cursor-pointer hover:text-white">소개 / About</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">자주 묻는 질문 / FAQ</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">연락처 / Contact</li>
                                    <li className="transition-colors cursor-pointer hover:text-white">개인정보 보호 / Privacy</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-6 text-sm tracking-widest text-gray-400 uppercase lg:mb-8">팔로우 / Follow</h3>
                                <div className="flex space-x-4">
                                    {["Instagram", "Twitter", "YouTube", "TikTok"].map((social, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-700 rounded-full hover:border-white group"
                                        >
                                            <span className="text-gray-500 group-hover:text-white">{social.charAt(0)}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 mt-16 font-light text-center text-gray-600 border-t border-gray-800">
                        <p>© 2023 트렌드코어 | TrendKor. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            
            .bg-gradient-radial {
              background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
            }
            
            /* Korean text wrapping support */
            .break-keep {
              word-break: keep-all;
              overflow-wrap: break-word;
            }
          `}</style>
        </div>
    );

    return (
        <div className="h-full overflow-x-hidden overflow-y-auto">
            {viewportSize === "mobile" ? renderMobileVersion() : 
             viewportSize === "tablet" ? renderTabletVersion() : 
             renderDesktopVersion()}
        </div>
    );
}

defineProperties(KoreanMemeEducation, {
    primaryColor: {
        label: "Primary Color",
        type: "string",
        defaultValue: "#FF5C35"
    },
    secondaryColor: {
        label: "Secondary Color",
        type: "string",
        defaultValue: "#3E4CB0"
    },
    animationSpeed: {
        label: "Animation Speed",
        type: "number",
        control: "slider",
        min: 0.5,
        max: 3,
        step: 0.1,
        defaultValue: 1.5
    }
});