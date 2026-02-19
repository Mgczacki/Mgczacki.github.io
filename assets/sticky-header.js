function initStickyHeader() {
    const header = document.querySelector('.masthead');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const threshold = 5;

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            if (currentScrollY <= header.offsetHeight) {
                header.classList.remove('masthead--hidden');
            } else if (delta > threshold) {
                header.classList.add('masthead--hidden');
            } else if (delta < -threshold) {
                header.classList.remove('masthead--hidden');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
}
