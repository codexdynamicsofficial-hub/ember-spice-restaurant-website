document.addEventListener("DOMContentLoaded", function() {
    const heroVideo = document.getElementById("hero-video");

    if (heroVideo) {
        
        // Video play karne ka function
        const forcePlayVideo = () => {
            if (heroVideo.paused) {
                heroVideo.muted = true; // Autoplay sirf muted mein hota hai
                heroVideo.play().catch(err => {
                    console.log("Video play nahi hui:", err);
                });
            }
        };

        // 1. Pehli baar play karein
        forcePlayVideo();

        // 2. Agar browser ne pause kar diya toh wapas play karein
        heroVideo.addEventListener('pause', () => {
            if (!heroVideo.ended) {
                forcePlayVideo();
            }
        });

        // 3. Browser autoplay block karta hai jab tak user click/scroll na kare
        // Isliye pehla click ya scroll par video start hogi
        const startVideoOnInteraction = () => {
            forcePlayVideo();
            // Ek baar chalane ke baad listener hata dein
            document.removeEventListener('click', startVideoOnInteraction);
            document.removeEventListener('scroll', startVideoOnInteraction);
            document.removeEventListener('touchstart', startVideoOnInteraction);
        };

        document.addEventListener('click', startVideoOnInteraction);
        document.addEventListener('scroll', startVideoOnInteraction);
        document.addEventListener('touchstart', startVideoOnInteraction); // Mobile ke liye

        // 4. Fallback timeout
        setTimeout(forcePlayVideo, 1000);
    }
});










document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Video Autoplay Force
    const videos = document.querySelectorAll('video');
    const playVideo = (video) => {
        if (video.paused) {
            video.muted = true;
            video.play().catch(err => console.log("Waiting for interaction:", err));
        }
    };
    videos.forEach(playVideo);

    const playOnInteraction = () => {
        videos.forEach(playVideo);
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('scroll', playOnInteraction);
    };
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('scroll', playOnInteraction);


    // 2. Slider Navigation (Left/Right Buttons)
    const slider = document.querySelector('.menu-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            slider.scrollLeft += 380; // Card width + gap
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollLeft -= 380; 
        });
    }


    // 3. Category Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.classList.remove('active'); 
                    setTimeout(() => card.classList.add('active'), 50);
                } else {
                    card.style.display = 'none';
                }
            });

            // Reset slider position when changing category
            if(slider) slider.scrollLeft = 0;
        });
    });


    // 4. Scroll Reveal Animation
    window.addEventListener('scroll', () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    });
    // Trigger once on load
    window.dispatchEvent(new Event('scroll'));

});



















document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Video Autoplay Force
    const videos = document.querySelectorAll('video');
    const playVideo = (video) => {
        if (video.paused) {
            video.muted = true;
            video.play().catch(err => console.log("Waiting for interaction:", err));
        }
    };
    videos.forEach(playVideo);

    const playOnInteraction = () => {
        videos.forEach(playVideo);
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('scroll', playOnInteraction);
    };
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('scroll', playOnInteraction);


    // 2. Scroll Reveal Animation
    window.addEventListener('scroll', () => {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100; // Animation trigger point

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    });

    // Trigger reveal for elements already in view on load
    window.dispatchEvent(new Event('scroll'));

});





























document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Video Autoplay Force
    const videos = document.querySelectorAll('video');
    const playVideo = (video) => {
        if (video.paused) {
            video.muted = true;
            video.play().catch(err => console.log("Waiting for interaction:", err));
        }
    };
    videos.forEach(playVideo);

    const playOnInteraction = () => {
        videos.forEach(playVideo);
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('scroll', playOnInteraction);
    };
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('scroll', playOnInteraction);


    // 2. Scroll Reveal Animation
    window.addEventListener('scroll', () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    });
    window.dispatchEvent(new Event('scroll'));


    // 3. Payment Method Toggle Logic
    const methodCards = document.querySelectorAll('.method-card');
    const cardDetails = document.getElementById('cardDetails');
    const mobileDetails = document.getElementById('mobileDetails');

    methodCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all
            methodCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Check which radio is selected
            const selectedVal = card.querySelector('input').value;
            
            if (selectedVal === 'card') {
                cardDetails.style.display = 'block';
                mobileDetails.style.display = 'none';
            } else {
                cardDetails.style.display = 'none';
                mobileDetails.style.display = 'block';
            }
        });
    });


    // 4. Form Submission & Fireworks Logic
    const reserveForm = document.getElementById('reserveForm');
    const successOverlay = document.getElementById('successOverlay');
    const assignedTable = document.getElementById('assignedTable');
    const fireworksContainer = document.getElementById('fireworksContainer');

    reserveForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simulate Payment Processing
        const btn = reserveForm.querySelector('.pay-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
        btn.disabled = true;

        setTimeout(() => {
            // Generate Random Table Number (E.g., A-5, B-12, C-8)
            const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            const randomNumber = Math.floor(Math.random() * 15) + 1;
            assignedTable.innerText = `${randomLetter}-${randomNumber}`;

            // Show Success Overlay
            successOverlay.classList.add('show');

            // Create Fireworks
            createFireworks();

            // Reset form
            reserveForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;

        }, 2000); // 2 second delay to simulate payment
    });


    // 5. Create Fireworks Animation Function
    function createFireworks() {
        const colors = ['#ffae00', '#D96A1D', '#F28C28', '#fff', '#28a745', '#ff4757'];
        
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random Position (Origin point)
            particle.style.top = '50%';
            particle.style.left = '50%';
            
            // Random Color
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random Trajectory using CSS Variables
            const angle = Math.random() * 360;
            const velocity = 100 + Math.random() * 400;
            const x = Math.cos(angle * Math.PI / 180) * velocity;
            const y = Math.sin(angle * Math.PI / 180) * velocity;
            
            particle.style.setProperty('--x', x + 'px');
            particle.style.setProperty('--y', y + 'px');
            
            // Random Duration
            particle.style.animationDuration = (1 + Math.random()) + 's';
            
            fireworksContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 2500);
        }
    }

});



















// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Cross icon
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Bar icon
        }
    });
}