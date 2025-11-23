// Meme card data
const memeCards = [
    {
        id: 1,
        titleTop: 2232,
        titleLeft: 267,
        viewsTop: 2123,
        viewsLeft: 704.5,
        profileTop: 2107,
        profileLeft: 164,
        rect6Top: 1520,
        rect6Left: 100,
        rect7Top: 2053,
        rect7Left: 100,
        overlayTop: 1520,
        overlayLeft: 820,
        mainImage: "assets/image0_108_70.png",
        profileImage: "assets/image0_108_51.jpeg"
    },
    {
        id: 2,
        titleTop: 3092,
        titleLeft: 267,
        viewsTop: 2983,
        viewsLeft: 704.5,
        profileTop: 2967,
        profileLeft: 164,
        rect6Top: 2380,
        rect6Left: 100,
        rect7Top: 2913,
        rect7Left: 100,
        overlayTop: 2380,
        overlayLeft: 820,
        mainImage: "assets/image0_108_86.png",
        profileImage: "assets/image0_108_85.jpeg"
    },
    {
        id: 3,
        titleTop: 3952,
        titleLeft: 267,
        viewsTop: 3843,
        viewsLeft: 704.5,
        profileTop: 3827,
        profileLeft: 164,
        rect6Top: 3240,
        rect6Left: 100,
        rect7Top: 3773,
        rect7Left: 100,
        overlayTop: 3240,
        overlayLeft: 820,
        mainImage: "assets/image0_108_100.png",
        profileImage: "assets/image0_108_99.jpeg"
    },
    {
        id: 4,
        titleTop: 3092,
        titleLeft: 1147,
        viewsTop: 2983,
        viewsLeft: 1584.5,
        profileTop: 2967,
        profileLeft: 1044,
        rect6Top: 2380,
        rect6Left: 980,
        rect7Top: 2913,
        rect7Left: 980,
        overlayTop: 2380,
        overlayLeft: 1700,
        mainImage: "assets/image0_108_93.png",
        profileImage: "assets/image0_108_92.jpeg"
    },
    {
        id: 5,
        titleTop: 2232,
        titleLeft: 1147,
        viewsTop: 2123,
        viewsLeft: 1584.5,
        profileTop: 2107,
        profileLeft: 1044,
        rect6Top: 1520,
        rect6Left: 980,
        rect7Top: 2053,
        rect7Left: 980,
        overlayTop: 1520,
        overlayLeft: 1700,
        mainImage: "assets/image0_108_79.png",
        profileImage: "assets/image0_108_78.jpeg"
    }
];

// Create meme cards
function renderCards() {
    const container = document.querySelector('.DetailPageOverview');

    memeCards.forEach(card => {
        // Rectangle 6 (image container)
        const rect6 = document.createElement('div');
        rect6.className = 'Rectangle6';
        rect6.style.cssText = `
            width: 840px;
            height: 800px;
            left: ${card.rect6Left}px;
            top: ${card.rect6Top}px;
            position: absolute;
        `;
        container.appendChild(rect6);

        // Rectangle 7 (info container)
        const rect7 = document.createElement('div');
        rect7.className = 'Rectangle7';
        rect7.style.cssText = `
            width: 840px;
            height: 267px;
            left: ${card.rect7Left}px;
            top: ${card.rect7Top}px;
            position: absolute;
        `;
        container.appendChild(rect7);

        // Title
        const title = document.createElement('div');
        title.className = 'ThisIsTheTitle';
        title.textContent = 'THIS IS THE TITLE';
        title.style.cssText = `
            width: 506.33px;
            left: ${card.titleLeft}px;
            top: ${card.titleTop}px;
            position: absolute;
        `;
        container.appendChild(title);

        // Views
        const views = document.createElement('div');
        views.className = 'NViews';
        views.textContent = 'n Views';
        views.style.cssText = `
            width: 171.5px;
            left: ${card.viewsLeft}px;
            top: ${card.viewsTop}px;
            position: absolute;
        `;
        container.appendChild(views);

        // Profile image
        const profile = document.createElement('div');
        profile.className = 'card-profile';
        profile.style.cssText = `
            width: 80px;
            height: 80px;
            left: ${card.profileLeft}px;
            top: ${card.profileTop}px;
            position: absolute;
        `;
        profile.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="url(#profile-pattern-${card.id})"/>
                <defs>
                    <pattern id="profile-pattern-${card.id}" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#profile-image-${card.id}" transform="translate(-0.3) scale(0.00114286)"/>
                    </pattern>
                    <image id="profile-image-${card.id}" xlink:href="${card.profileImage}"/>
                </defs>
            </svg>
        `;
        container.appendChild(profile);

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'card-image-overlay';
        overlay.style.cssText = `
            width: 120px;
            height: 120px;
            left: ${card.overlayLeft}px;
            top: ${card.overlayTop}px;
            position: absolute;
        `;
        overlay.innerHTML = `
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M120 0H0V120H120V0Z" fill="url(#overlay-pattern-${card.id})"/>
                <defs>
                    <pattern id="overlay-pattern-${card.id}" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#overlay-image-${card.id}" transform="scale(0.00416667)"/>
                    </pattern>
                    <image id="overlay-image-${card.id}" xlink:href="assets/image0_108_70.png"/>
                </defs>
            </svg>
        `;
        container.appendChild(overlay);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', renderCards);
