import { defineProperties } from "figma:react";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import "./KoreanMemeEducation.css";

export default function KoreanMemeEducation({
    primaryColor = "#e4334f",
    secondaryColor = "#003478",
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
    const aboutRef = useRef < HTMLDivElement | null > (null);
    const categoriesRef = useRef < HTMLDivElement | null > (null);
    const cardsRef = useRef < HTMLDivElement | null > (null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Define a color system using CSS variables from Design System
    const bgColor = "#001733"; // secondary-800
    const cardBgColor = "rgba(64, 64, 64, 0.8)"; // Using neutral-700 with transparency
    const headingColor = "#ffffff"; // Pure white for headings
    const subheadingColor = "#f5f5f5"; // neutral-100 for subheadings
    const bodyTextColor = "#d4d4d4"; // neutral-300 for body text
    const mutedTextColor = "#a3a3a3"; // neutral-400 for less important text
    const borderColor = "rgba(255, 255, 255, 0.15)"; // Slightly brighter borders

    // Media query for responsive design
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
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
        if (isMobile) return; // Skip on mobile for performance

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMobile]);

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
        <div className="mobile-container" style={{ backgroundColor: bgColor }}>
            {/* Mobile Navigation */}
            <nav className="mobile-nav" style={{ backgroundColor: `${bgColor}ee` }}>
                <div className="mobile-nav-content">
                    <div className="logo" style={{ color: headingColor }}>TrendKor</div>
                    <button
                        className="menu-button"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {isMobileMenuOpen ? (
                                <path d="M18 6L6 18M6 6L18 18" stroke={headingColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                                <path d="M4 6H20M4 12H20M4 18H20" stroke={headingColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        style={{ backgroundColor: `${bgColor}fa` }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-menu-content">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="mobile-menu-item"
                                    style={{ borderColor: borderColor, color: bodyTextColor }}
                                >
                                    {[2025, 2024, 2023, 2022][category.id]}
                                </div>
                            ))}
                            <div className="mobile-menu-buttons">
                                <button
                                    className="mobile-button primary"
                                    style={{ color: headingColor, borderColor: borderColor }}
                                >
                                    시작하기 / Get Started
                                </button>
                                <button
                                    className="mobile-button secondary"
                                    style={{ color: bodyTextColor, borderColor: "rgba(255, 255, 255, 0.1)" }}
                                >
                                    더 알아보기 / Learn More
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="hero-section mobile" style={{ backgroundColor: bgColor }}>
                <div className="floating-jamo">
                    {[...Array(15)].map((_, i) => {
                        const jamo = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ";
                        const char = jamo[Math.floor(Math.random() * jamo.length)];
                        const size = Math.random() * 24 + 16;
                        const amplitude = 40;
                        return (
                            <motion.span
                                key={i}
                                className="jamo-char"
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
                <div className="hero-content">
                    {/* Rotating Taegeuk Symbol */}
                    <motion.div
                        className="taegeuk-container mobile"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <motion.div
                            className="taegeuk-wrapper"
                            animate={{ rotateY: [0, 360] }}
                            transition={{
                                duration: 20,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            <svg
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                className="taegeuk-svg"
                            >
                                <defs>
                                    <linearGradient id="primaryGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${primaryColor}DD`} />
                                        <stop offset="100%" stopColor={primaryColor} />
                                    </linearGradient>
                                    <linearGradient id="secondaryGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${secondaryColor}DD`} />
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
                                <circle cx="100" cy="100" r="95" fill="none" stroke="#4B5563" strokeWidth="1" />
                                <g>
                                    <path d="M100 5 A95 95 0 1 1 100 195 A47.5 47.5 0 1 0 100 5" fill="url(#primaryGradientMobile)" filter="url(#glowMobile)" />
                                    <path d="M100 195 A95 95 0 1 1 100 5 A47.5 47.5 0 1 0 100 195" fill="url(#secondaryGradientMobile)" filter="url(#glowMobile)" />
                                </g>
                            </svg>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="hero-title" style={{ color: headingColor }}>
                            TrendKor
                        </h1>
                        <p className="hero-subtitle" style={{ color: subheadingColor }}>
                            Trends Explained, Culture Unveiled.
                        </p>
                        <div className="hero-buttons mobile">
                            <motion.button
                                className="hero-button primary"
                                style={{ color: headingColor, borderColor: borderColor }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                시작하기 / Get Started
                            </motion.button>
                            <motion.button
                                className="hero-button secondary"
                                style={{ color: bodyTextColor, borderColor: "rgba(255, 255, 255, 0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                더 알아보기 / Learn More
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="scroll-indicator"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="scroll-text" style={{ color: mutedTextColor }}>Scroll</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke={mutedTextColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section" ref={aboutRef} style={{ backgroundColor: bgColor }}>
                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            className="section-label"
                            style={{ color: mutedTextColor }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible.about ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            트렌드코어
                        </motion.span>
                        <h2 className="section-title" style={{ color: headingColor }}>
                            <span style={{ color: secondaryColor }}>왜</span> 한국 밈을 <br />배워야 할까요?
                        </h2>
                        <h3 className="section-subtitle" style={{ color: subheadingColor }}>
                            Why learn Korean memes and expressions?
                        </h3>
                        <div className="section-description" style={{ color: bodyTextColor }}>
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
                        className="expression-grid mobile"
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
                                className="expression-card"
                                style={{ backgroundColor: cardBgColor }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div
                                    className="expression-text"
                                    style={{ color: index % 2 === 0 ? primaryColor : secondaryColor }}
                                >
                                    {item.text}
                                </div>
                                <div className="expression-meaning" style={{ color: subheadingColor }}>{item.meaning}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section" ref={categoriesRef} style={{ backgroundColor: bgColor }}>
                <div className="categories-content">
                    <motion.div
                        className="categories-header"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="section-label"
                            style={{ color: mutedTextColor }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible.categories ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            콜렉션
                        </motion.span>
                        <h2 className="section-title" style={{ color: headingColor }}>연도별 밈 / Memes of The Year</h2>
                        <p className="section-description" style={{ color: "#E5E7EB" }}>
                            Discover the best memes of Korean Culture
                        </p>
                    </motion.div>

                    <motion.div
                        className="tabs-container mobile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="tabs-wrapper">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`tab-button ${activeTab === category.id ? "active" : ""}`}
                                    style={{
                                        backgroundColor: activeTab === category.id ? "rgba(255, 255, 255, 0.1)" : "transparent",
                                        border: activeTab === category.id ? `1px solid ${primaryColor}` : "1px solid rgba(255,255,255,0.15)",
                                        color: activeTab === category.id ? headingColor : mutedTextColor
                                    }}
                                    onClick={() => setActiveTab(category.id)}
                                >
                                    {[2025, 2024, 2023, 2022][category.id]}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="cards-grid mobile" ref={cardsRef}>
                        {featuredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                className="meme-card"
                                style={{ backgroundColor: cardBgColor }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isVisible.cards ? 1 : 0,
                                    y: isVisible.cards ? 0 : 20
                                }}
                                transition={{ duration: 0.8, delay: 0.1 * idx }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="card-content">
                                    <div className="card-header">
                                        <div>
                                            <h3 className="card-term" style={{ color: primaryColor }}>
                                                {item.term}
                                            </h3>
                                            <p className="card-romanized" style={{ color: mutedTextColor }}>{item.romanized}</p>
                                        </div>
                                        <div className="card-number" style={{ border: `1px solid ${secondaryColor}`, color: headingColor }}>
                                            {item.id}
                                        </div>
                                    </div>

                                    <div className="card-meaning">
                                        <div className="card-label" style={{ color: mutedTextColor }}>Meaning:</div>
                                        <p className="card-text" style={{ color: subheadingColor }}>{item.meaning}</p>
                                    </div>

                                    <div className="card-example">
                                        <div className="card-label" style={{ color: mutedTextColor }}>Example:</div>
                                        <p className="card-text" style={{ color: bodyTextColor }}>{item.example}</p>
                                        <p className="card-translation" style={{ color: mutedTextColor }}>{item.translation}</p>
                                    </div>

                                    <button
                                        className="card-button"
                                        style={{ borderTop: `1px solid ${secondaryColor}`, color: headingColor }}
                                    >
                                        더 알아보기 / Learn More
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="view-more-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.cards ? 1 : 0, y: isVisible.cards ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button className="view-more-button" style={{ borderColor: borderColor, color: headingColor }}>
                            <span>더 많은 표현 보기</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Mobile Footer */}
            <footer className="footer mobile" style={{ backgroundColor: bgColor }}>
                <div className="footer-content">
                    <div className="footer-main">
                        <div className="footer-brand">
                            <h2 className="footer-title" style={{ color: headingColor }}>트렌드코어</h2>
                            <p className="footer-description" style={{ color: mutedTextColor }}>
                                Helping foreigners understand Korean memes, new expressions, and internet culture
                            </p>
                        </div>

                        <div className="footer-links">
                            <div className="footer-column">
                                <h3 className="footer-heading" style={{ color: mutedTextColor }}>카테고리</h3>
                                <ul className="footer-list" style={{ color: bodyTextColor }}>
                                    <li>인기 밈</li>
                                    <li>신조어</li>
                                    <li>인터넷 용어</li>
                                    <li>K-문화</li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h3 className="footer-heading" style={{ color: mutedTextColor }}>링크</h3>
                                <ul className="footer-list" style={{ color: bodyTextColor }}>
                                    <li>소개</li>
                                    <li>자주 묻는 질문</li>
                                    <li>연락처</li>
                                    <li>개인정보 보호</li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer-social">
                            <h3 className="footer-heading" style={{ color: mutedTextColor }}>팔로우</h3>
                            <div className="social-icons">
                                {["Instagram", "Twitter", "YouTube", "TikTok"].map((social, index) => (
                                    <a key={index} href="#" className="social-icon">
                                        <span style={{ color: bodyTextColor }}>{social.charAt(0)}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom" style={{ color: mutedTextColor }}>
                        <p>© 2023 트렌드코어 | TrendKor. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );

    // Rendering the Desktop Version
    const renderDesktopVersion = () => (
        <div className="desktop-container" style={{ backgroundColor: bgColor }}>
            {/* Desktop Navigation */}
            <nav className="desktop-nav" style={{ backgroundColor: `${bgColor}ee` }}>
                <div className="desktop-nav-content">
                    <div className="desktop-nav-inner">
                        <div className="logo" style={{ color: headingColor }}>TrendKor</div>
                        <div className="nav-right">
                            <div className="nav-tabs">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`nav-tab ${activeTab === category.id ? "active" : ""}`}
                                        style={{
                                            borderBottom: activeTab === category.id ? `1px solid ${primaryColor}` : "1px solid transparent",
                                            color: activeTab === category.id ? headingColor : mutedTextColor
                                        }}
                                        onClick={() => setActiveTab(category.id)}
                                    >
                                        {[2025, 2024, 2023, 2022][category.id]}
                                    </button>
                                ))}
                            </div>
                            <div className="nav-buttons">
                                <motion.button
                                    className="nav-button primary"
                                    style={{ color: headingColor, borderColor: borderColor }}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    시작하기
                                </motion.button>
                                <motion.button
                                    className="nav-button secondary"
                                    style={{ color: bodyTextColor, borderColor: "rgba(255, 255, 255, 0.15)" }}
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

            {/* Hero Section */}
            <section className="hero-section desktop" style={{ backgroundColor: bgColor }}>
                <div className="floating-jamo">
                    {[...Array(20)].map((_, i) => {
                        const jamo = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ";
                        const char = jamo[Math.floor(Math.random() * jamo.length)];
                        const size = Math.random() * 32 + 22;
                        const amplitude = 50;
                        return (
                            <motion.span
                                key={i}
                                className="jamo-char"
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
                <div className="hero-content">
                    {/* Rotating Taegeuk Symbol */}
                    <motion.div
                        className="taegeuk-container desktop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <motion.div
                            className="taegeuk-wrapper"
                            animate={{ rotateY: [0, 360] }}
                            transition={{
                                duration: 20,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            <svg
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                className="taegeuk-svg"
                            >
                                <defs>
                                    <linearGradient id="primaryGradientDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${primaryColor}DD`} />
                                        <stop offset="100%" stopColor={primaryColor} />
                                    </linearGradient>
                                    <linearGradient id="secondaryGradientDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={`${secondaryColor}DD`} />
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
                                <circle cx="100" cy="100" r="95" fill="none" stroke="#4B5563" strokeWidth="1" />
                                <g>
                                    <path d="M100 5 A95 95 0 1 1 100 195 A47.5 47.5 0 1 0 100 5" fill="url(#primaryGradientDesktop)" filter="url(#glowDesktop)" />
                                    <path d="M100 195 A95 95 0 1 1 100 5 A47.5 47.5 0 1 0 100 195" fill="url(#secondaryGradientDesktop)" filter="url(#glowDesktop)" />
                                </g>
                            </svg>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="hero-title desktop" style={{ color: headingColor }}>
                            TrendKor
                        </h1>
                        <p className="hero-subtitle desktop" style={{ color: subheadingColor }}>
                            Trends Explained, Culture Unveiled.
                        </p>
                        <div className="hero-buttons desktop">
                            <motion.button
                                className="hero-button primary desktop"
                                style={{ color: headingColor }}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                시작하기 / Get Started
                            </motion.button>
                            <motion.button
                                className="hero-button secondary desktop"
                                style={{ color: bodyTextColor }}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                더 알아보기 / Learn More
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="scroll-indicator desktop"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="scroll-text" style={{ color: mutedTextColor }}>Scroll</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke={mutedTextColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section desktop" ref={aboutRef} style={{ backgroundColor: bgColor }}>
                <div
                    className="about-background"
                    style={{ backgroundPosition: getBackgroundPosition() }}
                ></div>

                <div className="about-content desktop">
                    <div className="about-layout">
                        <motion.div
                            className="about-text desktop"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: isVisible.about ? 1 : 0, x: isVisible.about ? 0 : -50 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <motion.span
                                className="section-label"
                                style={{ color: mutedTextColor }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isVisible.about ? 1 : 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                트렌드코어
                            </motion.span>
                            <h2 className="section-title desktop" style={{ color: headingColor }}>
                                <span style={{ color: secondaryColor }}>왜</span> 한국 밈을 <br />배워야 할까요?
                            </h2>
                            <h3 className="section-subtitle desktop" style={{ color: subheadingColor }}>
                                Why learn Korean memes and expressions?
                            </h3>
                            <div className="section-description desktop" style={{ color: bodyTextColor }}>
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
                            className="expression-grid desktop"
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
                                    className="expression-card desktop"
                                    style={{ backgroundColor: cardBgColor }}
                                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                >
                                    <div
                                        className="expression-text desktop"
                                        style={{ color: index % 2 === 0 ? primaryColor : secondaryColor }}
                                    >
                                        {item.text}
                                    </div>
                                    <div className="expression-meaning desktop" style={{ color: subheadingColor }}>{item.meaning}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section desktop" ref={categoriesRef} style={{ backgroundColor: bgColor }}>
                <div className="categories-content desktop">
                    <motion.div
                        className="categories-header desktop"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="section-label"
                            style={{ color: mutedTextColor }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible.categories ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            콜렉션
                        </motion.span>
                        <h2 className="section-title desktop" style={{ color: headingColor }}>연도별 밈 / Memes of The Year</h2>
                        <p className="section-description desktop" style={{ color: "#E5E7EB" }}>
                            Discover the best memes of Korean Culture
                        </p>
                    </motion.div>

                    <motion.div
                        className="tabs-container desktop"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.categories ? 1 : 0, y: isVisible.categories ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="tabs-wrapper desktop">
                            <div className="tabs-inner">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`tab-button desktop ${activeTab === category.id ? "active" : ""}`}
                                        style={{
                                            borderBottom: activeTab === category.id ? `1px solid ${primaryColor}` : "1px solid transparent",
                                            color: activeTab === category.id ? headingColor : mutedTextColor
                                        }}
                                        onClick={() => setActiveTab(category.id)}
                                    >
                                        {[2025, 2024, 2023, 2022][category.id]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="cards-grid desktop" ref={cardsRef}>
                        {featuredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                className="meme-card desktop"
                                style={{ backgroundColor: cardBgColor }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{
                                    opacity: isVisible.cards ? 1 : 0,
                                    y: isVisible.cards ? 0 : 30
                                }}
                                transition={{ duration: 0.8, delay: 0.1 * idx }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            >
                                <div className="card-content desktop">
                                    <div className="card-header desktop">
                                        <div>
                                            <h3 className="card-term desktop" style={{ color: primaryColor }}>
                                                {item.term}
                                            </h3>
                                            <p className="card-romanized desktop" style={{ color: mutedTextColor }}>{item.romanized}</p>
                                        </div>
                                        <div className="card-number desktop" style={{ border: `1px solid ${secondaryColor}`, color: headingColor }}>
                                            {item.id}
                                        </div>
                                    </div>

                                    <div className="card-meaning desktop">
                                        <div className="card-label" style={{ color: mutedTextColor }}>Meaning:</div>
                                        <p className="card-text desktop" style={{ color: subheadingColor }}>{item.meaning}</p>
                                    </div>

                                    <div className="card-example desktop">
                                        <div className="card-label" style={{ color: mutedTextColor }}>Example:</div>
                                        <p className="card-text desktop" style={{ color: bodyTextColor }}>{item.example}</p>
                                        <p className="card-translation desktop" style={{ color: mutedTextColor }}>{item.translation}</p>
                                    </div>

                                    <button
                                        className="card-button desktop"
                                        style={{ borderTop: `1px solid ${secondaryColor}`, color: headingColor }}
                                    >
                                        더 알아보기 / Learn More
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="view-more-container desktop"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible.cards ? 1 : 0, y: isVisible.cards ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button className="view-more-button desktop" style={{ borderColor: borderColor, color: headingColor }}>
                            <span>더 많은 표현 보기 / See More Expressions</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Desktop Footer */}
            <footer className="footer desktop" style={{ backgroundColor: bgColor }}>
                <div className="footer-content desktop">
                    <div className="footer-main desktop">
                        <div className="footer-brand desktop">
                            <h2 className="footer-title desktop" style={{ color: headingColor }}>트렌드코어</h2>
                            <p className="footer-description desktop" style={{ color: bodyTextColor }}>
                                Helping foreigners understand Korean memes, new expressions, and internet culture
                            </p>
                        </div>

                        <div className="footer-links desktop">
                            <div className="footer-column">
                                <h3 className="footer-heading desktop" style={{ color: mutedTextColor }}>카테고리 / Categories</h3>
                                <ul className="footer-list desktop" style={{ color: bodyTextColor }}>
                                    <li>인기 밈 / Popular Memes</li>
                                    <li>신조어 / New Expressions</li>
                                    <li>인터넷 용어 / Internet Terms</li>
                                    <li>K-문화 / K-Culture</li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h3 className="footer-heading desktop" style={{ color: mutedTextColor }}>링크 / Links</h3>
                                <ul className="footer-list desktop" style={{ color: bodyTextColor }}>
                                    <li>소개 / About</li>
                                    <li>자주 묻는 질문 / FAQ</li>
                                    <li>연락처 / Contact</li>
                                    <li>개인정보 보호 / Privacy</li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h3 className="footer-heading desktop" style={{ color: mutedTextColor }}>팔로우 / Follow</h3>
                                <div className="social-icons desktop">
                                    {["Instagram", "Twitter", "YouTube", "TikTok"].map((social, index) => (
                                        <a key={index} href="#" className="social-icon desktop">
                                            <span>{social.charAt(0)}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom desktop" style={{ color: mutedTextColor }}>
                        <p>© 2023 트렌드코어 | TrendKor. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );

    return (
        <div className="app-container">
            {isMobile ? renderMobileVersion() : renderDesktopVersion()}
        </div>
    );
}

defineProperties(KoreanMemeEducation, {
    primaryColor: {
        label: "Primary Color",
        type: "string",
        defaultValue: "#e4334f"
    },
    secondaryColor: {
        label: "Secondary Color",
        type: "string",
        defaultValue: "#003478"
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
