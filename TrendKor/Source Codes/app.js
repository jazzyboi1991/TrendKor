// Configuration
const config = {
    primaryColor: '#FF5C35',
    secondaryColor: '#3E4CB0',
    animationSpeed: 1.5
};

// State
let state = {
    activeTab: 0,
    isMobile: false,
    isMobileMenuOpen: false,
    isVisible: {
        about: false,
        categories: false,
        cards: false
    }
};

// Data
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

const categories = [
    { id: 0, name: "인기 밈", english: "Popular Memes" },
    { id: 1, name: "신조어", english: "New Expressions" },
    { id: 2, name: "인터넷 용어", english: "Internet Terms" },
    { id: 3, name: "K-문화", english: "K-Culture" }
];

// Utility Functions
function checkIfMobile() {
    state.isMobile = window.innerWidth < 768;
}

function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('open');
    }
}

function setActiveTab(tabId) {
    state.activeTab = tabId;

    // Update desktop tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        const id = parseInt(tab.dataset.id);
        if (id === tabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update mobile nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        const id = parseInt(link.dataset.id);
        if (id === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px"
    };

    const aboutSection = document.querySelector('.about-section');
    const categoriesSection = document.querySelector('.categories-section');
    const cardsGrid = document.querySelector('.cards-grid');

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                state.isVisible.about = true;
                entry.target.querySelectorAll('.about-text, .about-grid').forEach(el => {
                    el.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    const categoriesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                state.isVisible.categories = true;
                entry.target.querySelectorAll('.categories-header, .category-tabs').forEach(el => {
                    el.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                state.isVisible.cards = true;
                const cards = entry.target.querySelectorAll('.meme-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
                entry.target.parentElement.querySelector('.load-more')?.classList.add('visible');
            }
        });
    }, observerOptions);

    if (aboutSection) aboutObserver.observe(aboutSection);
    if (categoriesSection) categoriesObserver.observe(categoriesSection);
    if (cardsGrid) cardsObserver.observe(cardsGrid);
}

// Render Functions
function renderNav() {
    return `
        <nav>
            <div class="nav-container">
                <div class="logo">TrendKor</div>

                ${state.isMobile ? `
                    <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            ${state.isMobileMenuOpen ?
                                '<path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />' :
                                '<path d="M4 6H20M4 12H20M4 18H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />'
                            }
                        </svg>
                    </button>
                ` : `
                    <div class="nav-links">
                        ${categories.map(cat => `
                            <button class="nav-link ${state.activeTab === cat.id ? 'active' : ''}"
                                    data-id="${cat.id}"
                                    onclick="setActiveTab(${cat.id})">
                                ${cat.name}
                            </button>
                        `).join('')}
                    </div>
                    <div class="nav-buttons">
                        <button class="btn btn-primary">시작하기</button>
                        <button class="btn btn-secondary">더 알아보기</button>
                    </div>
                `}
            </div>

            ${state.isMobile ? `
                <div class="mobile-menu ${state.isMobileMenuOpen ? 'open' : ''}">
                    ${categories.map(cat => `
                        <div class="mobile-menu-item">
                            ${cat.name} / ${cat.english}
                        </div>
                    `).join('')}
                    <div style="padding-top: 1rem;">
                        <button class="btn btn-primary" style="width: 100%; margin-bottom: 0.75rem;">시작하기 / Get Started</button>
                        <button class="btn btn-secondary" style="width: 100%;">더 알아보기 / Learn More</button>
                    </div>
                </div>
            ` : ''}
        </nav>
    `;
}

function renderHero() {
    const jamo = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ";
    const charCount = state.isMobile ? 15 : 20;

    return `
        <section class="hero">
            <div class="hero-background">
                ${Array.from({length: charCount}, (_, i) => {
                    const char = jamo[Math.floor(Math.random() * jamo.length)];
                    const size = Math.random() * (state.isMobile ? 24 : 32) + (state.isMobile ? 16 : 22);
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const color = i % 2 === 0 ? config.primaryColor : config.secondaryColor;
                    const floatX = (Math.random() - 0.5) * (state.isMobile ? 40 : 50);
                    const floatY = (Math.random() - 0.5) * (state.isMobile ? 40 : 50);

                    return `
                        <span class="floating-char"
                              style="font-size: ${size}px;
                                     left: ${left}%;
                                     top: ${top}%;
                                     color: ${color};
                                     --float-x: ${floatX}px;
                                     --float-y: ${floatY}px;
                                     animation-duration: ${10 + Math.random() * 10 * config.animationSpeed}s;">
                            ${char}
                        </span>
                    `;
                }).join('')}
            </div>

            <div class="hero-content">
                <div class="taegeuk">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; filter: drop-shadow(0 0 ${state.isMobile ? 20 : 30}px rgba(255,255,255,0.15));">
                        <defs>
                            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="${config.primaryColor}BB" />
                                <stop offset="100%" stop-color="${config.primaryColor}" />
                            </linearGradient>
                            <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="${config.secondaryColor}BB" />
                                <stop offset="100%" stop-color="${config.secondaryColor}" />
                            </linearGradient>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <circle cx="100" cy="100" r="95" fill="none" stroke="#333" stroke-width="1" />
                        <g>
                            <path d="M100 5 A95 95 0 1 1 100 195 A47.5 47.5 0 1 0 100 5" fill="url(#primaryGradient)" filter="url(#glow)" />
                            <path d="M100 195 A95 95 0 1 1 100 5 A47.5 47.5 0 1 0 100 195" fill="url(#secondaryGradient)" filter="url(#glow)" />
                        </g>
                    </svg>
                </div>

                <div>
                    <h1 class="hero-title">TrendKor</h1>
                    <p class="hero-subtitle">Trends Explained, Culture Unveiled.</p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary">시작하기 / Get Started</button>
                        <button class="btn btn-secondary">더 알아보기 / Learn More</button>
                    </div>
                </div>

                <div class="scroll-indicator">
                    <span class="scroll-text">Scroll</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </section>
    `;
}

function renderAbout() {
    const examples = [
        { text: "ㅋㅋㅋ", meaning: "Laughter (like 'hahaha')" },
        { text: "ㅠㅠ", meaning: "Crying (like T_T)" },
        { text: "대박", meaning: "Awesome/Daebak" },
        { text: "화이팅", meaning: "Fighting/Cheer up" }
    ];

    return `
        <section class="about-section">
            <div class="section-container">
                <div class="about-content">
                    <div class="about-text">
                        <span class="section-label">트렌드코어</span>
                        <h2 class="section-title">
                            <span style="color: ${config.secondaryColor};">왜</span> 한국 밈을<br/>배워야 할까요?
                        </h2>
                        <h3 class="section-subtitle">
                            Why learn Korean memes and expressions?
                        </h3>
                        <div class="section-description">
                            <p>한국의 인터넷 문화와 밈은 K-pop, K-drama와 함께 세계적으로 인기를 얻고 있습니다. 하지만 이러한 표현들은 번역하기 어렵고 문화적 맥락이 필요합니다.</p>
                            <p>Korean internet culture and memes are gaining global popularity alongside K-pop and K-dramas. However, these expressions are often difficult to translate and require cultural context.</p>
                            <p>우리 사이트는 외국인들이 한국의 밈, 신조어, 인터넷 용어를 쉽게 이해할 수 있도록 설명과 예시를 제공합니다.</p>
                            <p>Our site helps foreigners easily understand Korean memes, new expressions, and internet terms through explanations and examples.</p>
                        </div>
                    </div>

                    <div class="about-grid">
                        ${examples.map((item, index) => `
                            <div class="about-card">
                                <div class="about-card-text" style="color: ${index % 2 === 0 ? config.primaryColor : config.secondaryColor};">
                                    ${item.text}
                                </div>
                                <div class="about-card-meaning">${item.meaning}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderCategories() {
    return `
        <section class="categories-section">
            <div class="section-container">
                <div class="categories-header">
                    <span class="section-label">콜렉션</span>
                    <h2 class="section-title">카테고리 / Categories</h2>
                    <p class="section-subtitle">Explore different types of Korean expressions</p>
                </div>

                <div class="category-tabs">
                    ${categories.map(cat => `
                        <button class="category-tab ${state.activeTab === cat.id ? 'active' : ''}"
                                data-id="${cat.id}"
                                onclick="setActiveTab(${cat.id})">
                            ${state.isMobile ? cat.name : `${cat.name} / ${cat.english}`}
                        </button>
                    `).join('')}
                </div>

                <div class="cards-grid">
                    ${featuredItems.map((item, idx) => `
                        <div class="meme-card">
                            <div class="card-header">
                                <div>
                                    <h3 class="card-title">${item.term}</h3>
                                    <p class="card-romanized">${item.romanized}</p>
                                </div>
                                <div class="card-number">${item.id}</div>
                            </div>

                            <div class="card-meaning">
                                <div class="card-label">Meaning:</div>
                                <p class="card-meaning-text">${item.meaning}</p>
                            </div>

                            <div class="card-example">
                                <div class="card-label">Example:</div>
                                <p class="card-example-text">${item.example}</p>
                                <p class="card-translation">${item.translation}</p>
                            </div>

                            <button class="card-button">더 알아보기 / Learn More</button>
                        </div>
                    `).join('')}
                </div>

                <div class="load-more">
                    <button class="load-more-btn">
                        <span>${state.isMobile ? '더 많은 표현 보기' : '더 많은 표현 보기 / See More Expressions'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    `;
}

function renderFooter() {
    const socials = ["Instagram", "Twitter", "YouTube", "TikTok"];

    return `
        <footer>
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-brand">
                        <h2>트렌드코어</h2>
                        <p>Helping foreigners understand Korean memes, new expressions, and internet culture</p>
                    </div>

                    ${state.isMobile ? `
                        <div class="footer-section">
                            <h3>카테고리</h3>
                            <ul class="footer-links">
                                <li>인기 밈</li>
                                <li>신조어</li>
                                <li>인터넷 용어</li>
                                <li>K-문화</li>
                            </ul>
                        </div>

                        <div class="footer-section">
                            <h3>링크</h3>
                            <ul class="footer-links">
                                <li>소개</li>
                                <li>자주 묻는 질문</li>
                                <li>연락처</li>
                                <li>개인정보 보호</li>
                            </ul>
                        </div>
                    ` : `
                        <div class="footer-section">
                            <h3>카테고리 / Categories</h3>
                            <ul class="footer-links">
                                <li>인기 밈 / Popular Memes</li>
                                <li>신조어 / New Expressions</li>
                                <li>인터넷 용어 / Internet Terms</li>
                                <li>K-문화 / K-Culture</li>
                            </ul>
                        </div>

                        <div class="footer-section">
                            <h3>링크 / Links</h3>
                            <ul class="footer-links">
                                <li>소개 / About</li>
                                <li>자주 묻는 질문 / FAQ</li>
                                <li>연락처 / Contact</li>
                                <li>개인정보 보호 / Privacy</li>
                            </ul>
                        </div>
                    `}

                    <div class="footer-section">
                        <h3>팔로우 / Follow</h3>
                        <div class="social-links">
                            ${socials.map(social => `
                                <a href="#" class="social-link">${social.charAt(0)}</a>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>© 2023 트렌드코어 | TrendKor. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

function render() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderNav()}
        ${renderHero()}
        ${renderAbout()}
        ${renderCategories()}
        ${renderFooter()}
    `;

    // Setup observers after rendering
    setTimeout(setupIntersectionObserver, 100);
}

// Event Listeners
window.addEventListener('resize', () => {
    const wasMobile = state.isMobile;
    checkIfMobile();
    if (wasMobile !== state.isMobile) {
        render();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkIfMobile();
    render();
});
