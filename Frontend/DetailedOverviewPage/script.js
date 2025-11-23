// Meme data structure
const memeData = [
    // 2025 - First row
    {
        id: 1,
        title: "THIS IS THE TITLE",
        views: "n Views",
        mainImage: "../assets/image0_108_70.png",
        profileImage: "../assets/image0_108_51.jpeg",
        year: "2025"
    },
    {
        id: 2,
        title: "THIS IS THE TITLE",
        views: "n Views",
        mainImage: "../assets/image0_108_79.png",
        profileImage: "../assets/image0_108_78.jpeg",
        year: "2024"
    },
    // 2024 - Second row
    {
        id: 3,
        title: "THIS IS THE TITLE",
        views: "n Views",
        mainImage: "../assets/image0_108_86.png",
        profileImage: "../assets/image0_108_85.jpeg",
        year: "2024"
    },
    {
        id: 4,
        title: "THIS IS THE TITLE",
        views: "n Views",
        mainImage: "../assets/image0_108_93.png",
        profileImage: "../assets/image0_108_92.jpeg",
        year: "2024"
    },
    // 2023 - Third row
    {
        id: 5,
        title: "THIS IS THE TITLE",
        views: "n Views",
        mainImage: "../assets/image0_108_100.png",
        profileImage: "../assets/image0_108_99.jpeg",
        year: "2023"
    }
];

// Initialize page
document.addEventListener("DOMContentLoaded", function() {
    renderMemeCards();
    setupYearButtons();
});

// Render meme cards
function renderMemeCards(year = null) {
    const container = document.getElementById("memeCardsContainer");
    container.innerHTML = "";

    const cardsToDisplay = year ? memeData.filter(meme => meme.year === year) : memeData;

    cardsToDisplay.forEach((meme) => {
        const card = createMemeCard(meme);
        container.appendChild(card);
    });
}

// Create individual meme card
function createMemeCard(meme) {
    const card = document.createElement("div");
    card.className = "meme-card";
    card.dataset.memeId = meme.id;

    card.innerHTML = `
        <div class="card-image">
            <svg
                width="840"
                height="800"
                viewBox="0 0 840 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <rect width="840" height="800" fill="#f1f1f1"/>
                <image
                    id="meme-image-${meme.id}"
                    xlink:href="${meme.mainImage}"
                    width="840"
                    height="800"
                />
            </svg>
            <div class="card-image-overlay">
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <path
                        d="M120 0H0V120H120V0Z"
                        fill="url(#overlay-pattern-${meme.id})"
                    />
                    <defs>
                        <pattern
                            id="overlay-pattern-${meme.id}"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                        >
                            <use
                                xlink:href="#overlay-image-${meme.id}"
                                transform="scale(0.00416667)"
                            />
                        </pattern>
                        <image
                            id="overlay-image-${meme.id}"
                            xlink:href="../assets/image0_108_70.png"
                        />
                    </defs>
                </svg>
            </div>
        </div>
        <div class="card-info">
            <div class="card-profile">
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <path
                        d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z"
                        fill="url(#profile-pattern-${meme.id})"
                    />
                    <defs>
                        <pattern
                            id="profile-pattern-${meme.id}"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                        >
                            <use
                                xlink:href="#profile-image-${meme.id}"
                                transform="translate(-0.3) scale(0.00114286)"
                            />
                        </pattern>
                        <image
                            id="profile-image-${meme.id}"
                            xlink:href="${meme.profileImage}"
                        />
                    </defs>
                </svg>
            </div>
            <div class="card-title">${meme.title}</div>
            <div class="card-views">${meme.views}</div>
        </div>
    `;

    return card;
}

// Setup year button functionality
function setupYearButtons() {
    const yearButtons = document.querySelectorAll(".year-button");

    yearButtons.forEach((button) => {
        button.addEventListener("click", function() {
            const year = this.dataset.year;
            renderMemeCards(year);

            // Update active state
            yearButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

// Add click handlers to cards
document.addEventListener("click", function(e) {
    const card = e.target.closest(".meme-card");
    if (card) {
        const memeId = card.dataset.memeId;
        handleCardClick(memeId);
    }
});

// Handle card click
function handleCardClick(memeId) {
    const meme = memeData.find(m => m.id === parseInt(memeId));
    if (meme) {
        console.log("Clicked meme:", meme);
        // Add your navigation or modal logic here
    }
}
