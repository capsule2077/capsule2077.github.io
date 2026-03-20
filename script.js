/* ========================================
   Longfei Liu - Personal Website Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add subtle parallax effect to profile photo
    const profilePhoto = document.querySelector('.profile-photo img');
    if (profilePhoto) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                profilePhoto.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
            });
        });
        
        document.addEventListener('mouseleave', function() {
            requestAnimationFrame(() => {
                profilePhoto.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
    
    // Fetch GitHub Stars dynamically
    const starLinks = document.querySelectorAll('.github-stars-link');
    starLinks.forEach(link => {
        const repo = link.getAttribute('data-repo');
        if (repo) {
            fetch(`https://api.github.com/repos/${repo}`)
                .then(res => res.json())
                .then(data => {
                    if (data.stargazers_count !== undefined) {
                        const countEl = link.querySelector('.star-count');
                        if (countEl) {
                            // Format number with commas if it's large
                            countEl.textContent = '★ ' + data.stargazers_count.toLocaleString();
                        }
                    }
                })
                .catch(err => console.error('Error fetching stars:', err));
        }
    });

    console.log('Website initialized successfully! 🚀');
});
