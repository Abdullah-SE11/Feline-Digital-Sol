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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const tid = this.getAttribute('href');
        const target = document.querySelector(tid);
        if (target) {
            const pos = tid === '#home' ? 0 : target.offsetTop - 80;
            smoothScrollTo(pos, 800);
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
                document.querySelectorAll('.nav-links a:not(.btn-primary)').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }

            // Service Cards
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }

            // Process Steps Scroll logic
            if (entry.target.classList.contains('process-step')) {
                const stepId = entry.target.getAttribute('data-step');

                // Update Step indicators (sidebar)
                document.querySelectorAll('.step-num').forEach(num => {
                    num.classList.toggle('active', num.getAttribute('data-step') === stepId);
                });

                // Active class for the step cards themselves
                document.querySelectorAll('.process-step').forEach(step => {
                    step.classList.toggle('active', step.getAttribute('data-step') === stepId);
                });
            }
        }
    });
}, { threshold: 0.4, rootMargin: '-10% 0% -20% 0%' });

document.querySelectorAll('section, .service-card, .process-step').forEach(el => {
    if (el.classList.contains('service-card')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
    }
    observer.observe(el);
});
