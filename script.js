// ===== DOM Elements =====
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const loadingScreen = document.getElementById('loadingScreen');
const matrixCanvas = document.getElementById('matrixCanvas');
const particlesContainer = document.getElementById('particles');
const stackInfo = document.getElementById('stackInfo');
const terminalCommand = document.getElementById('terminalCommand');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// ===== State Variables =====
let isDarkMode = true;
let isSoundOn = true;
let currentTech = null;

// ===== Tech Stack Information =====
const techInfo = {
    html: "HTML5: Markup language for web pages, latest version with semantic elements and improved APIs.",
    css: "CSS3: Styling language with modern features like flexbox, grid, animations, and variables.",
    js: "JavaScript: Programming language for interactive web applications, supports ES6+ features.",
    react: "React: JavaScript library for building user interfaces with component-based architecture.",
    python: "Python: Versatile programming language used for web development, data science, and automation.",
    git: "Git: Version control system for tracking changes in source code during development.",
    database: "SQL: Language for managing and querying relational databases.",
    vscode: "VS Code: Powerful code editor with built-in Git support, debugging, and extensions."
};

// ===== Terminal Commands =====
const terminalCommands = [
    "npm start",
    "git status",
    "python main.py",
    "node server.js",
    "docker-compose up",
    "code .",
    "git push origin main"
];

// ===== Initialize Portfolio =====
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});

// ===== Core Functions =====
function initializePortfolio() {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize matrix background
    initializeMatrix();
    
    // Initialize particles
    initializeParticles();
    
    // Initialize typing effect
    startTerminalTyping();
    
    // Initialize skill animations
    initializeSkillAnimations();
    
    // Initialize statistics counter
    initializeStatsCounter();
    
    // Initialize tech stack interactions
    initializeTechStack();
    
    // Initialize project carousel
    initializeProjectCarousel();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
}

// ===== Theme Toggle =====
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', !isDarkMode);
    
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon', isDarkMode);
    icon.classList.toggle('fa-sun', !isDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
});

// ===== Sound Toggle =====
soundToggle.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    
    const icon = soundToggle.querySelector('i');
    icon.classList.toggle('fa-volume-up', isSoundOn);
    icon.classList.toggle('fa-volume-mute', !isSoundOn);
    
    // Play/pause any background sounds if implemented
    // This is a placeholder for future audio features
});

// ===== Mobile Navigation =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Back to Top Button =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update navbar background on scroll
    updateNavbarOnScroll();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Matrix Background =====
function initializeMatrix() {
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const chars = "01";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = "rgba(10, 10, 15, 0.04)";
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });
    
    // Start animation
    setInterval(drawMatrix, 35);
}

// ===== Particle System =====
function initializeParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;
        particle.style.background = `rgba(0, 123, 255, ${Math.random() * 0.3 + 0.1})`;
        particle.style.boxShadow = `0 0 ${size * 2}px rgba(0, 123, 255, 0.5)`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation ends and create new one
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle();
        });
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle linear infinite;
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Terminal Typing Effect =====
function startTerminalTyping() {
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeTerminalCommand() {
        const currentCommand = terminalCommands[commandIndex];
        
        if (isDeleting) {
            terminalCommand.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            terminalCommand.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentCommand.length) {
            isDeleting = true;
            setTimeout(typeTerminalCommand, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % terminalCommands.length;
            setTimeout(typeTerminalCommand, 500);
        } else {
            setTimeout(typeTerminalCommand, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(typeTerminalCommand, 1000);
}

// ===== Skill Animations =====
function initializeSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = `${width}%`;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Statistics Counter =====
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => observer.observe(number));
}

// ===== Tech Stack Interactions =====
function initializeTechStack() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tech = item.getAttribute('data-tech');
            if (techInfo[tech]) {
                stackInfo.textContent = techInfo[tech];
                stackInfo.style.color = 'var(--accent)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            stackInfo.textContent = 'Hover over a technology to see details';
            stackInfo.style.color = 'var(--text-light)';
        });
        
        item.addEventListener('click', () => {
            const tech = item.getAttribute('data-tech');
            if (techInfo[tech]) {
                // Add visual feedback on click
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 200);
            }
        });
    });
}

// ===== Project Carousel =====
function initializeProjectCarousel() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const carousel = document.querySelector('.carousel-container');
    const projectCards = document.querySelectorAll('.project-card');
    
    let currentIndex = 0;
    const cardWidth = projectCards[0].offsetWidth + 30; // including gap
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < projectCards.length - 3) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Auto-rotate carousel on mobile
    if (window.innerWidth <= 768) {
        setInterval(() => {
            if (currentIndex < projectCards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    }
}

// ===== Scroll Animations =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .section-title, .role-tag');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Navbar Scroll Effect =====
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// ===== Contact Form =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
        
        // Add visual feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--success)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// ===== Load Saved Preferences =====
function loadPreferences() {
    // Load theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        isDarkMode = savedDarkMode === 'true';
        document.body.classList.toggle('dark-mode', !isDarkMode);
        
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon', isDarkMode);
        icon.classList.toggle('fa-sun', !isDarkMode);
    }
}

// Call loadPreferences on initialization
loadPreferences();

// ===== Window Resize Handling =====
window.addEventListener('resize', () => {
    // Re-initialize matrix canvas
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    // Update project carousel if needed
    initializeProjectCarousel();
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Toggle theme with Ctrl+T
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Toggle sound with Ctrl+M
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        soundToggle.click();
    }
    
    // Scroll to top with Home key
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});