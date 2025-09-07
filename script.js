// Enhanced Hero Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the number, the faster the animation
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    // Reset counters and animate
                    document.querySelectorAll('.counter').forEach(counter => {
                        counter.innerText = '0';
                    });
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe stats section
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Parallax effect for quantum elements
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.quantum-orb');
        const speed = 0.5;
        
        parallax.forEach((element, index) => {
            const yPos = -(scrolled * speed * (index + 1) * 0.3);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Smooth scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Quantum particles animation on mouse move
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const particles = document.querySelector('.quantum-particles');
        if (particles) {
            const xPercent = (mouseX / window.innerWidth) * 100;
            const yPercent = (mouseY / window.innerHeight) * 100;
            
            particles.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        }
    });
    
    // Window scroll effects
    window.addEventListener('scroll', () => {
        handleParallax();
        
        // Hide/show scroll indicator
        const scrollY = window.scrollY;
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    });
    
    // Add loading animation for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Countdown Timer for Final CTA
    function initCountdown() {
        // Set the festival start date (October 27, 2025)
        const festivalDate = new Date('2025-10-27T09:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = festivalDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                const daysElement = document.getElementById('days');
                const hoursElement = document.getElementById('hours');
                const minutesElement = document.getElementById('minutes');
                
                if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
                if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
                if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            } else {
                // Festival has started
                const daysElement = document.getElementById('days');
                const hoursElement = document.getElementById('hours');
                const minutesElement = document.getElementById('minutes');
                
                if (daysElement) daysElement.textContent = '00';
                if (hoursElement) hoursElement.textContent = '00';
                if (minutesElement) minutesElement.textContent = '00';
                
                // Update countdown label
                const countdownLabel = document.querySelector('.countdown-label');
                if (countdownLabel) {
                    countdownLabel.textContent = 'Festival is now live!';
                }
            }
        }
        
        // Update countdown immediately and then every minute
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    }
    
    // Initialize countdown if the countdown elements exist
    if (document.getElementById('days')) {
        initCountdown();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// QFF Images Carousel
class QFFCarousel {
    constructor() {
        // We'll dynamically load images from QFFNodes folder
        this.images = [];
        this.basePath = 'QFFNodes/';
        this.currentIndex = 0;
        this.itemsPerView = 4;
        this.maxIndex = 0;
        
        this.loadQFFNodeImages();
    }
    
    async loadQFFNodeImages() {
        // For now, we'll use the known images and can expand this list
        // In a real application, you might fetch this from an API
        const knownImages = [
            'CPrA.png'
            // Add more node images as they become available
        ];
        
        // You can also add fallback to Emojis if QFFNodes is empty
        const fallbackImages = [
            'Atom_01.png',
            'Atom_03.png', 
            'Atom-02.png',
            'Badge_01.png',
            'Badge_02.png',
            'Badge_03.png',
            'Cat_01.png',
            'Cat_02.png',
            'Circuit.png',
            'Entanglement.png',
            'Qiskit_01.png',
            'Qiskit_02.png',
            'Qiskit_03.png',
            'Text_Fall Fest_01.png',
            'Text_Fall Fest_02.png',
            'Text_Qiskit_01.png',
            'Text_Qiskit_02.png',
            'Text_Quantum_01.png',
            'Text_Quantum_02.png',
            'Theme.png',
            'Timeline_01.png',
            'Timeline_02.png',
            'Timeline_03.png',
            'Timeline_04.png'
        ];
        
        // Try to use QFFNodes images first, fallback to Emojis if needed
        if (knownImages.length > 0) {
            this.images = knownImages.map(img => ({
                src: this.basePath + img,
                alt: `QFF Node ${img.replace('.png', '').replace(/_/g, ' ')}`
            }));
        } else {
            // Fallback to Emojis folder
            this.basePath = 'Fall Fest Graphics/Emojis/';
            this.images = fallbackImages.map(img => ({
                src: this.basePath + img,
                alt: `QFF ${img.replace('.png', '').replace(/_/g, ' ')}`
            }));
        }
        
        this.maxIndex = Math.max(0, this.images.length - this.itemsPerView);
        this.init();
    }
    
    init() {
        this.createCarousel();
        this.createIndicators();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    createCarousel() {
        const track = document.getElementById('qffCarousel');
        if (!track || this.images.length === 0) return;
        
        track.innerHTML = this.images.map(image => `
            <div class="carousel-item">
                <img src="${image.src}" 
                     alt="${image.alt}" 
                     loading="lazy"
                     onerror="this.style.display='none'">
            </div>
        `).join('');
        
        this.updateCarousel();
    }
    
    createIndicators() {
        const indicatorsContainer = document.getElementById('carouselIndicators');
        if (!indicatorsContainer || this.images.length === 0) return;
        
        const indicatorCount = Math.ceil(this.images.length / this.itemsPerView);
        indicatorsContainer.innerHTML = Array.from({length: indicatorCount}, (_, i) => `
            <div class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
        `).join('');
    }
    
    updateCarousel() {
        const track = document.getElementById('qffCarousel');
        const indicators = document.querySelectorAll('.indicator');
        
        if (track) {
            const translateX = -(this.currentIndex * (100 / this.itemsPerView));
            track.style.transform = `translateX(${translateX}%)`;
        }
        
        indicators.forEach((indicator, index) => {
            const indicatorIndex = Math.floor(this.currentIndex / this.itemsPerView);
            indicator.classList.toggle('active', index === indicatorIndex);
        });
    }
    
    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to start
        }
        this.updateCarousel();
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.maxIndex; // Loop to end
        }
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentIndex = Math.min(index * this.itemsPerView, this.maxIndex);
        this.updateCarousel();
    }
    
    bindEvents() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const indicators = document.querySelectorAll('.indicator');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prev());
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                this.handleSwipe();
            });
            
            carousel.addEventListener('mousedown', (e) => {
                startX = e.clientX;
                carousel.style.cursor = 'grabbing';
            });
            
            carousel.addEventListener('mouseup', (e) => {
                endX = e.clientX;
                carousel.style.cursor = 'grab';
                this.handleSwipe();
            });
        }
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 4000); // Change slide every 4 seconds
        
        // Pause on hover
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(this.autoPlayInterval);
            });
            
            carousel.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }
    
    // Responsive adjustment
    updateItemsPerView() {
        const oldItemsPerView = this.itemsPerView;
        
        if (window.innerWidth < 480) {
            this.itemsPerView = 1;
        } else if (window.innerWidth < 768) {
            this.itemsPerView = 2;
        } else if (window.innerWidth < 1024) {
            this.itemsPerView = 3;
        } else {
            this.itemsPerView = 4;
        }
        
        if (oldItemsPerView !== this.itemsPerView) {
            this.maxIndex = Math.max(0, this.images.length - this.itemsPerView);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.createIndicators();
            this.updateCarousel();
        }
    }
}

// Initialize carousel when DOM is loaded
let qffCarousel;

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Node interaction (updated for Leaflet)
const nodeItems = document.querySelectorAll('.node-item');

nodeItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        nodeItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Pan to corresponding region on map if it exists
        const region = item.dataset.region;
        if (window.qffMap && region) {
            const regionCoords = {
                'north-america': [45, -100],
                'south-america': [-15, -60],
                'europe': [54, 15],
                'asia': [35, 104]
            };
            
            if (regionCoords[region]) {
                window.qffMap.setView(regionCoords[region], 3);
            }
        }
    });
});

// Timeline navigation
const timelineBtns = document.querySelectorAll('.timeline-btn');
const timelineContent = document.querySelector('.timeline-content');

// Sample data for different days
const timelineData = {
    today: [
        {
            time: '14:00 UTC',
            timezone: 'Now',
            title: 'Quantum Algorithms Workshop',
            description: 'Deep dive into Grover\'s and Shor\'s algorithms',
            node: 'Tokyo Node',
            type: 'Workshop',
            btnText: 'Join'
        },
        {
            time: '16:30 UTC',
            timezone: '2.5h',
            title: 'Quantum Hardware Hackathon',
            description: 'Build quantum circuits on real IBM hardware',
            node: 'Berlin Node',
            type: 'Hackathon',
            btnText: 'Register'
        },
        {
            time: '20:00 UTC',
            timezone: '6h',
            title: 'Quantum Machine Learning Panel',
            description: 'Industry experts discuss QML applications',
            node: 'San Francisco Node',
            type: 'Panel',
            btnText: 'Remind Me'
        }
    ],
    tomorrow: [
        {
            time: '08:00 UTC',
            timezone: 'Tomorrow',
            title: 'Quantum Computing 101',
            description: 'Introduction to quantum computing basics',
            node: 'London Node',
            type: 'Tutorial',
            btnText: 'Register'
        },
        {
            time: '12:00 UTC',
            timezone: '+20h',
            title: 'Research Collaboration Meet',
            description: 'Connect with researchers worldwide',
            node: 'Toronto Node',
            type: 'Networking',
            btnText: 'Join'
        },
        {
            time: '18:00 UTC',
            timezone: '+26h',
            title: 'Quantum Error Correction Workshop',
            description: 'Advanced concepts in quantum error correction',
            node: 'Sydney Node',
            type: 'Workshop',
            btnText: 'Register'
        }
    ],
    week: [
        {
            time: 'Mon 10:00 UTC',
            timezone: 'This Week',
            title: 'Weekly Quantum Challenge',
            description: 'Solve quantum problems and win prizes',
            node: 'Global',
            type: 'Challenge',
            btnText: 'Participate'
        },
        {
            time: 'Wed 15:00 UTC',
            timezone: 'Wed',
            title: 'Industry Guest Speaker Series',
            description: 'Quantum computing in finance and healthcare',
            node: 'New York Node',
            type: 'Lecture',
            btnText: 'Register'
        },
        {
            time: 'Fri 19:00 UTC',
            timezone: 'Fri',
            title: 'Global Quantum Showcase',
            description: 'Present your quantum projects',
            node: 'All Nodes',
            type: 'Showcase',
            btnText: 'Submit Project'
        }
    ]
};

function updateTimeline(day) {
    const activities = timelineData[day] || timelineData.today;
    
    timelineContent.innerHTML = activities.map(activity => `
        <div class="activity-card">
            <div class="activity-time">
                <span class="time">${activity.time}</span>
                <span class="timezone">${activity.timezone}</span>
            </div>
            <div class="activity-info">
                <h3>${activity.title}</h3>
                <p>${activity.description}</p>
                <div class="activity-meta">
                    <span class="activity-node">${activity.node}</span>
                    <span class="activity-type">${activity.type}</span>
                </div>
            </div>
            <button class="btn btn-small">${activity.btnText}</button>
        </div>
    `).join('');
}

timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        timelineBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update timeline content
        const day = btn.dataset.day;
        updateTimeline(day);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .node-item, .activity-card, .schedule-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Real-time clock for activities
function updateCurrentTime() {
    const now = new Date();
    const utcTime = now.toUTCString().split(' ')[4];
    
    // Update any "Now" indicators
    document.querySelectorAll('.timezone').forEach(el => {
        if (el.textContent === 'Now') {
            // Update with actual current UTC time if needed
        }
    });
}

// Update time every minute
setInterval(updateCurrentTime, 60000);

// Particle animation for hero background
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles
if (window.innerWidth > 768) {
    createParticles();
}

// Button click handlers
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
        // Add click animation
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
        
        // Handle specific button actions
        const btnText = e.target.textContent.trim();
        
        switch (btnText) {
            case 'Join the Festival':
                showNotification('Welcome to Global Entanglement! 🎉');
                break;
            case 'View Schedule':
                document.querySelector('#schedule').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'Join':
            case 'Register':
                showNotification('Registration link will be sent to your email! 📧');
                break;
            case 'Remind Me':
                showNotification('Reminder set! We\'ll notify you 15 minutes before. ⏰');
                break;
        }
    }
});

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .particle {
        pointer-events: none;
        z-index: 1;
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-primary);
            border-top: 1px solid var(--border-color);
            padding: 1rem;
            gap: 1rem;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize QFF Carousel
    qffCarousel = new QFFCarousel();
    
    // Initialize Partnerships Carousel
    initializePartnershipsCarousel();
    
    // Initialize Leaflet Map
    await initializeWorldMap();
    
    // Update sidebar with loaded data
    await updateNodesSidebar();
    
    // Initialize Calendar
    initializeCalendar();
    createNodeCalendars();
    
    // Set initial active states
    updateCurrentTime();
    
    // Handle window resize for responsive carousel
    window.addEventListener('resize', () => {
        if (qffCarousel) {
            qffCarousel.updateItemsPerView();
        }
    });
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Partnerships Carousel Implementation
function initializePartnershipsCarousel() {
    // Sample partnerships data - this would typically come from a JSON file or API
    const partnerships = [
        {
            name: "IBM Quantum",
            logo: "Fall Fest Graphics/Illustration Exports/IBM Quantum Logo.png",
            description: "Quantum Computing Leader"
        },
        {
            name: "Qiskit",
            logo: "Fall Fest Graphics/Illustration Exports/qiskit logo.svg",
            description: "Open Source Quantum Framework"
        },
    ];

    const track = document.querySelector('.partnerships-track');
    
    if (!track) return;

    // Clear existing content
    track.innerHTML = '';

    // Add partnership items
    partnerships.forEach((partner, index) => {
        const item = document.createElement('div');
        item.className = 'partnership-item';
        
        if (partner.logo) {
            const img = document.createElement('img');
            img.src = partner.logo;
            img.alt = partner.name;
            img.onerror = () => {
                // Fallback to placeholder if image fails to load
                img.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'partnership-placeholder';
                placeholder.textContent = partner.placeholder || partner.name;
                item.appendChild(placeholder);
            };
            item.appendChild(img);
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'partnership-placeholder';
            placeholder.textContent = partner.placeholder || partner.name;
            item.appendChild(placeholder);
        }
        
        // Add hover tooltip
        item.title = partner.description;
        
        track.appendChild(item);
    });

    // Handle "Become a Partner" button
    const partnerBtn = document.querySelector('.hero-cta .btn-secondary:last-child');
    if (partnerBtn && partnerBtn.textContent.includes('Become a Partner')) {
        partnerBtn.addEventListener('click', () => {
            // You can customize this action - could open a modal, redirect to a form, etc.
            alert('Partnership application coming soon! Please contact us at partnerships@globalentanglement.org');
        });
    }
}

// Leaflet World Map Implementation
async function initializeWorldMap() {
    // Initialize the map
    const map = L.map('worldMap', {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 6,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true
    });

    // Add dark tile layer with quantum color scheme
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://stadiamaps.com/">Stadia Maps</a>',
        maxZoom: 20
    }).addTo(map);

    // QFF Nodes data - will be loaded from JSON
    let qffNodesData = null;
    let qffNodes = [];
    
    // Load QFF nodes data from JSON file
    async function loadQFFNodes() {
        try {
            const response = await fetch('qff-nodes.json');
            qffNodesData = await response.json();
            
            // Process nodes data for map display
            qffNodes = qffNodesData.nodes.map(node => ({
                region: node.region,
                name: node.name,
                coords: [node.coordinates.lat, node.coordinates.lng],
                institution: node.institution,
                city: node.city,
                country: node.country,
                participants: node.participants,
                status: node.status
            }));
            
            return qffNodesData;
        } catch (error) {
            console.error('Error loading QFF nodes data:', error);
            // Fallback to empty data
            qffNodes = [];
            return null;
        }
    }
    
    // Initialize nodes data and then create markers
    await loadQFFNodes();

    // Custom quantum-themed marker icon
    const quantumIcon = L.divIcon({
        className: 'quantum-marker',
        html: `
            <div class="quantum-marker-inner">
                <div class="quantum-pulse"></div>
                <div class="quantum-dot"></div>
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    // Add markers and popups
    qffNodes.forEach(node => {
        const marker = L.marker(node.coords, { icon: quantumIcon }).addTo(map);
        
        const popupContent = `
            <div class="quantum-popup">
                <h3 class="popup-title">${node.name}</h3>
                <div class="popup-info">
                    <p><strong>Institution:</strong> ${node.institution}</p>
                    <p><strong>City:</strong> ${node.city}</p>
                    <p><strong>Country:</strong> ${node.country}</p>
                </div>
                <div class="popup-stats">
                    <div class="popup-stat">
                        <span class="stat-number">${node.participants}</span>
                        <span class="stat-label">Participants</span>
                    </div>
                    <div class="popup-stat">
                        <span class="stat-label">Status: ${node.status}</span>
                    </div>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Update corresponding node item when marker is clicked
        marker.on('click', () => {
            updateNodeSelection(node.region);
        });
    });

    // Store map reference for potential future use
    window.qffMap = map;
}

// Update node selection
function updateNodeSelection(region) {
    // Remove active class from all items
    document.querySelectorAll('.node-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected region
    const selectedItem = document.querySelector(`[data-region="${region}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
    }
}

// Update nodes sidebar with loaded data
async function updateNodesSidebar() {
    try {
        const response = await fetch('qff-nodes.json');
        const data = await response.json();
        
        const nodesList = document.querySelector('.nodes-list');
        if (!nodesList) return;
        
        // Clear existing content
        nodesList.innerHTML = '';
        
        // Group nodes by region
        const regionGroups = {};
        data.nodes.forEach(node => {
            if (!regionGroups[node.region]) {
                regionGroups[node.region] = [];
            }
            regionGroups[node.region].push(node);
        });
        
        // Create node items for each region
        Object.keys(data.regions).forEach((regionKey, index) => {
            const region = data.regions[regionKey];
            const nodesInRegion = regionGroups[regionKey] || [];
            
            const nodeItem = document.createElement('div');
            nodeItem.className = `node-item ${index === 0 ? 'active' : ''}`;
            nodeItem.setAttribute('data-region', regionKey);
            
            nodeItem.innerHTML = `
                <h3>${region.name}</h3>
                <p>${region.nodeCount} active nodes</p>
                <span class="node-count">${region.totalParticipants} participants</span>
                <div class="node-details">
                    ${nodesInRegion.map(node => `
                        <div class="node-detail">
                            <strong>${node.name}</strong> - ${node.institution}
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Add click handler
            nodeItem.addEventListener('click', () => {
                updateNodeSelection(regionKey);
                
                // Pan map to first node in region if available
                if (nodesInRegion.length > 0 && window.qffMap) {
                    const firstNode = nodesInRegion[0];
                    window.qffMap.setView([firstNode.coordinates.lat, firstNode.coordinates.lng], 4);
                }
            });
            
            nodesList.appendChild(nodeItem);
        });
        
    } catch (error) {
        console.error('Error updating nodes sidebar:', error);
    }
}

// Custom Calendar functionality for October & November 2025
let currentCalendarDate = new Date(2025, 9, 1); // October 2025 (month is 0-indexed)
let currentActiveNode = 'all';
let calendarEvents = {};

// Load events from JSON file
async function loadEventsFromBackend() {
    try {
        const response = await fetch('events.json');
        const data = await response.json();
        calendarEvents = data.events;
        renderCalendar(); // Re-render calendar with new data
        console.log('📅 Events loaded from events.json');
    } catch (error) {
        console.error('Error loading events from backend:', error);
        // Fall back to sample data if JSON file is not available
        loadSampleEvents();
    }
}

// Fallback sample events
function loadSampleEvents() {
    calendarEvents = {
        all: {
            '2025-10-15': [
                { title: 'Global QFF Kickoff', time: '14:00 UTC', type: 'Opening' },
                { title: 'Welcome Ceremony', time: '16:00 UTC', type: 'Event' }
            ],
            '2025-10-22': [
                { title: 'Quantum Algorithms Workshop', time: '15:00 UTC', type: 'Workshop' }
            ],
            '2025-11-05': [
                { title: 'International QML Conference', time: '10:00 UTC', type: 'Conference' }
            ],
            '2025-11-12': [
                { title: 'Global Networking Event', time: '18:00 UTC', type: 'Social' }
            ]
        },
        argentina: {
            '2025-10-18': [
                { title: 'Buenos Aires Quantum Meetup', time: '19:00 ART', type: 'Meetup' }
            ],
            '2025-11-08': [
                { title: 'Quantum Computing Workshop', time: '14:00 ART', type: 'Workshop' }
            ]
        },
        madrid: {
            '2025-10-25': [
                { title: 'UAM Quantum Research Seminar', time: '16:00 CET', type: 'Seminar' }
            ],
            '2025-11-15': [
                { title: 'European QFF Collaboration', time: '10:00 CET', type: 'Conference' }
            ]
        },
        chile: {
            '2025-10-20': [
                { title: 'Santiago Quantum Hackathon', time: '09:00 CLT', type: 'Hackathon' }
            ],
            '2025-11-03': [
                { title: 'Chilean QFF Symposium', time: '15:00 CLT', type: 'Symposium' }
            ]
        },
        philadelphia: {
            '2025-10-28': [
                { title: 'Philly Quantum Fair', time: '13:00 EST', type: 'Fair' }
            ],
            '2025-11-18': [
                { title: 'Industry Panel Discussion', time: '17:00 EST', type: 'Panel' }
            ]
        },
        malaysia: {
            '2025-10-30': [
                { title: 'KL Quantum Innovation Summit', time: '20:00 MYT', type: 'Summit' }
            ],
            '2025-11-25': [
                { title: 'ASEAN QFF Finale', time: '19:00 MYT', type: 'Finale' }
            ]
        }
    };
    renderCalendar();
    console.log('📅 Using fallback sample events');
}

function initializeCalendar() {
    const calendarTabs = document.querySelectorAll('.calendar-tab');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    // Load events from backend
    loadEventsFromBackend();
    
    // Set up tab switching
    calendarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            calendarTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            currentActiveNode = tab.dataset.calendar;
            renderCalendar();
        });
    });
    
    // Set up navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentCalendarDate.getMonth() > 9) { // Only allow October (9) and November (10)
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentCalendarDate.getMonth() < 10) { // Only allow October (9) and November (10)
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        }
    });
    
    // Initial render
    renderCalendar();
}

function renderCalendar() {
    const monthYearElement = document.getElementById('currentMonthYear');
    const calendarDaysElement = document.getElementById('calendarDays');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (!monthYearElement || !calendarDaysElement) return;
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update month/year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    monthYearElement.textContent = `${monthNames[month]} ${year}`;
    
    // Update navigation buttons
    prevBtn.disabled = month <= 9; // Disable if at October
    nextBtn.disabled = month >= 10; // Disable if at November
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay(); // Day of week (0 = Sunday)
    
    // Get events for current node
    const nodeEvents = calendarEvents[currentActiveNode] || {};
    
    // Clear calendar
    calendarDaysElement.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDate; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        calendarDaysElement.appendChild(dayElement);
    }
    
    // Add days of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const currentDate = new Date(year, month, day);
        const dateString = formatDateString(currentDate);
        
        // Check if it's today
        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Check if there are events on this day
        const dayEvents = nodeEvents[dateString] || [];
        if (dayEvents.length > 0) {
            dayElement.classList.add('has-events');
        }
        
        // Create day content
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'day-events';
        
        if (dayEvents.length > 0) {
            const eventText = dayEvents.length === 1 
                ? dayEvents[0].title.substring(0, 12) + '...'
                : `${dayEvents.length} events`;
            eventsContainer.textContent = eventText;
        }
        
        dayElement.appendChild(dayNumber);
        dayElement.appendChild(eventsContainer);
        
        // Add click handler for days with events
        if (dayEvents.length > 0) {
            dayElement.addEventListener('click', () => {
                showEventModal(dateString, dayEvents);
            });
        }
        
        calendarDaysElement.appendChild(dayElement);
    }
}

function formatDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function showEventModal(dateString, events) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('eventModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'eventModal';
        modal.className = 'event-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Update modal content
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    const date = new Date(dateString);
    const dateFormatted = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    modalTitle.textContent = dateFormatted;
    
    modalBody.innerHTML = events.map(event => `
        <div class="event-item" style="margin-bottom: 1rem; padding: 1.5rem; background: rgba(147, 51, 234, 0.1); border-radius: 12px; border-left: 4px solid var(--accent-cyan);">
            <h4 style="color: var(--accent-cyan); margin: 0 0 0.75rem 0; font-size: 1.2rem;">${event.title}</h4>
            <div style="margin-bottom: 0.5rem;">
                <p style="margin: 0 0 0.5rem 0; color: white; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-clock"></i> ${event.time}
                </p>
                ${event.location ? `<p style="margin: 0 0 0.5rem 0; color: white; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>` : ''}
                ${event.organizer ? `<p style="margin: 0 0 0.5rem 0; color: white; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-user"></i> ${event.organizer}</p>` : ''}
            </div>
            ${event.description ? `<p style="margin: 0.75rem 0; color: var(--text-light); line-height: 1.4;">${event.description}</p>` : ''}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <span style="background: var(--accent-purple); color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem; font-weight: 500;">${event.type}</span>
                ${event.id ? `<button onclick="window.open('#', '_blank')" style="background: var(--accent-cyan); color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.9rem;">Learn More</button>` : ''}
            </div>
        </div>
    `).join('');
    
    // Show modal
    modal.classList.add('active');
}

// Function to load events from backend (replace sample data)
async function loadEventsFromBackend() {
    try {
        // Replace this with your actual backend API call
        // const response = await fetch('/api/events');
        // const data = await response.json();
        // calendarEvents = data;
        
        console.log('📅 Using sample events for October & November 2025');
        console.log('🔧 Replace loadEventsFromBackend() with your API endpoint');
    } catch (error) {
        console.error('Error loading events from backend:', error);
    }
}

function createNodeCalendars() {
    // All calendars use the same custom calendar view
    // The difference is in the events data displayed
    console.log('📅 Custom calendar initialized for October & November 2025');
}

// Initialize calendar functionality
initializeCalendar();

// Create node calendars placeholders
createNodeCalendars();
