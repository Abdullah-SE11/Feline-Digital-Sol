// Navigation / Scroll Logic
const smoothScrollTo = (targetY, duration = 1000) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime = null;
    const animation = (t) => {
        if (!startTime) startTime = t;
        const progress = Math.min((t - startTime) / duration, 1);
        const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, startY + diff * ease);
        if (progress < 1) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
};

// Mobile Menu Logic
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    });

    // Close menu when clicking the background overlay
    navLinks.addEventListener('click', (e) => {
        if (e.target === navLinks) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        const tid = this.getAttribute('href');
        const target = document.querySelector(tid);
        if (target) {
            const pos = tid === '#about' ? 0 : target.offsetTop - 80;
            smoothScrollTo(pos, 800);
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
                // Update main nav
                document.querySelectorAll('.nav-links a:not(.btn-primary)').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }

            // Service Cards
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }

            // Process Steps logic (if still present)
            if (entry.target.classList.contains('process-step')) {
                const stepId = entry.target.getAttribute('data-step');
                document.querySelectorAll('.step-num').forEach(el => {
                    el.classList.toggle('active', el.getAttribute('data-step') === stepId);
                });
                document.querySelectorAll('.process-step').forEach(el => {
                    el.classList.toggle('active', el.getAttribute('data-step') === stepId);
                });
            }
        }
    });
}, { threshold: 0.2, rootMargin: '-10% 0% -20% 0%' });

document.querySelectorAll('section, .service-card, .process-step').forEach(el => {
    if (el.classList.contains('service-card')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
    }
    observer.observe(el);
});

// Horizontal Scroll for Case Studies (Marquee Loop)
const caseScroll = document.querySelector('.case-studies-scroll');
if (caseScroll && (caseScroll.classList.contains('marquee') || caseScroll.classList.contains('marquee-circular'))) {
    // Clone children to create a seamless loop
    const children = Array.from(caseScroll.children);
    children.forEach(child => {
        const clone = child.cloneNode(true);
        caseScroll.appendChild(clone);
    });

    // Handle mouse wheel for manual override
    caseScroll.addEventListener('wheel', (evt) => {
        if (evt.deltaY != 0 && window.innerWidth > 768) {
            evt.preventDefault();
            caseScroll.scrollLeft += evt.deltaY;
        }
    }, { passive: false });
}
