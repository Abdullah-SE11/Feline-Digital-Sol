document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Reveal animation on scroll or load
document.addEventListener('DOMContentLoaded', () => {
    const revealText = document.querySelector('.reveal-text');
    revealText.style.opacity = '0';
    revealText.style.transform = 'translateY(20px)';
    revealText.style.transition = 'all 1s ease-out';
    
    setTimeout(() => {
        revealText.style.opacity = '1';
        revealText.style.transform = 'translateY(0)';
    }, 100);
});
