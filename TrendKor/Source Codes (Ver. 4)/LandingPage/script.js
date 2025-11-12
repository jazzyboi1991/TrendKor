// TrendKor Landing Page JavaScript
// 브라우저 크기 변경 시 스케일링 업데이트

document.addEventListener('DOMContentLoaded', function() {
    // 스케일 팩터 업데이트 함수 - 가로 폭 기준으로만 스케일링
    function updateScale() {
        const designWidth = 1920;
        const scaleX = window.innerWidth / designWidth;
        const scale = Math.max(0.1, Math.min(3.0, scaleX));
        document.documentElement.style.setProperty('--final-scale', scale);
        document.documentElement.style.setProperty('--scale-factor', scale);
    }
    updateScale();
    window.addEventListener('resize', () => {
        updateScale();
        updateTitleGroupScroll();
        updateVideoMask();
    });

    // 메뉴 버튼 클릭 이벤트
    document.querySelector('.login-button')?.addEventListener('click', () => {
        // 로그인 기능 추가 가능
    });
    document.querySelector('.menu-text')?.addEventListener('click', () => {
        // 메뉴 기능 추가 가능
    });

    // 카드 호버 효과
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // 타이틀/서브타이틀 그룹 스크롤 애니메이션
    const redGroup = document.querySelector('.title-graphic-group');
    const blueGroup = document.querySelector('.subtitle-graphic-group');
    function getScale() {
        return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--final-scale')) || 1;
    }
    function updateTitleGroupScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const hideThreshold = 400;
        const scale = getScale();
        if (redGroup) {
            const moveY = Math.min(scrollY / hideThreshold * 300, 300) * scale;
            redGroup.style.top = `${100 - moveY}px`;
            redGroup.style.opacity = `${1 - scrollY / hideThreshold}`;
        }
        if (blueGroup) {
            const moveY = Math.min(scrollY / hideThreshold * 300, 300) * scale;
            blueGroup.style.top = `${428 + moveY}px`;
            blueGroup.style.opacity = `${1 - scrollY / hideThreshold}`;
        }
    }
    window.addEventListener('scroll', updateTitleGroupScroll);
    updateTitleGroupScroll();

    // 비디오 마스킹 (타이틀/서브타이틀 사이만 보이게)
    function updateVideoMask() {
        const video = document.querySelector('.video');
        if (!video || !redGroup || !blueGroup) return;
        const mainPage = document.querySelector('.main-page');
        const redRect = redGroup.getBoundingClientRect();
        const blueRect = blueGroup.getBoundingClientRect();
        const mainRect = mainPage.getBoundingClientRect();
        const maskTop = redRect.bottom - mainRect.top;
        const maskBottom = blueRect.top - mainRect.top;
        let clipTop = Math.max(0, maskTop);
        let clipBottom = Math.max(0, 1245 - maskBottom);
        video.style.clipPath = `inset(${clipTop}px 0px ${clipBottom}px 0px)`;
    }
    window.addEventListener('scroll', updateVideoMask);
    window.addEventListener('resize', updateVideoMask);
    updateVideoMask();

    // 접근성: Tab 키 네비게이션 지원 (추후 구현 가능)
    document.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
            // 포커스 관리 로직 추가 가능
        }
    });

    console.log('TrendKor Landing Page loaded successfully!');
});
