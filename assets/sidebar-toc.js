/**
 * Sidebar Table of Contents — shared component
 *
 * Usage:
 *   initSidebarTOC({
 *     sectionSelector: '#content h2, #content h3',
 *     scrollOffset: 120
 *   });
 */
function initSidebarTOC({ sectionSelector, scrollOffset = 120 } = {}) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    let lastActiveHref = null;

    const updateActiveSection = () => {
        const sections = document.querySelectorAll(sectionSelector);
        const sidebarLinks = sidebar.querySelectorAll('a');

        let currentSection = '';
        const scrollPos = window.scrollY + scrollOffset;

        sections.forEach(section => {
            if (!section.offsetParent) return; // skip hidden (display:none) elements
            if (scrollPos >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        const activeHref = currentSection ? '#' + currentSection : null;

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });

        // Auto-scroll sidebar to keep active link visible
        if (activeHref && activeHref !== lastActiveHref) {
            lastActiveHref = activeHref;
            const activeLink = sidebar.querySelector('a.active');
            if (activeLink) {
                const sidebarRect = sidebar.getBoundingClientRect();
                const linkRect = activeLink.getBoundingClientRect();
                const linkTop = linkRect.top - sidebarRect.top;
                const linkBottom = linkRect.bottom - sidebarRect.top;

                if (linkTop < 0 || linkBottom > sidebarRect.height) {
                    activeLink.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
            }
        }
    };

    // Smooth scroll for anchor clicks
    sidebar.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerEl = document.querySelector('.masthead');
                const offset = headerEl ? headerEl.offsetHeight + 16 : 100;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
}
