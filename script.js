// DOM元素
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const bannerSlides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');

// 轮播相关变量
let currentSlide = 0;
const slideCount = bannerSlides.length;
let slideInterval;

// 导航栏响应式菜单功能
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接时关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 平滑滚动导航
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // 考虑导航栏高度
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 轮播功能
function showSlide(n) {
    // 移除所有active类
    bannerSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // 确保索引在有效范围内
    if (n >= slideCount) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slideCount - 1;
    } else {
        currentSlide = n;
    }
    
    // 显示当前幻灯片
    bannerSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// 下一张幻灯片
function nextSlide() {
    showSlide(currentSlide + 1);
}

// 手动切换幻灯片
function currentSlideFunc(n) {
    showSlide(n - 1);
}

// 自动轮播
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 4000); // 每4秒切换一次
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// 初始化轮播
function initSlideShow() {
    showSlide(0); // 显示第一张
    startSlideShow(); // 开始自动轮播
    
    // 鼠标悬停时暂停轮播
    const bannerContainer = document.querySelector('.banner-container');
    if (bannerContainer) {
        bannerContainer.addEventListener('mouseenter', stopSlideShow);
        bannerContainer.addEventListener('mouseleave', startSlideShow);
    }
}

// 点击指示器切换幻灯片
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// 页面滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 26, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化轮播
    initSlideShow();
    
    // 为卡片添加悬停效果
    addHoverEffects();
    
    // 添加滚动动画
    addScrollAnimations();
    
    // 添加按钮点击效果
    addButtonEffects();
});

// 卡片悬停效果
function addHoverEffects() {
    const cards = document.querySelectorAll('.power-card, .news-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 滚动动画效果
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.power-card, .news-card, .member-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// 按钮点击效果
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 创建波纹效果
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 数字动画效果
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number');
    
    numberElements.forEach(element => {
        const finalNumber = element.textContent;
        const isPercentage = finalNumber.includes('%');
        const isPlus = finalNumber.includes('+');
        const cleanNumber = parseFloat(finalNumber.replace(/[^\d.]/g, ''));
        
        if (!isNaN(cleanNumber)) {
            let currentNumber = 0;
            const increment = cleanNumber / 50; // 50步完成动画
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= cleanNumber) {
                    currentNumber = cleanNumber;
                    clearInterval(timer);
                }
                
                let displayNumber = Math.floor(currentNumber);
                if (cleanNumber >= 10000) {
                    displayNumber = (displayNumber / 10000).toFixed(0) + '万';
                } else if (isPlus) {
                    displayNumber += '+';
                } else if (isPercentage) {
                    displayNumber += '%';
                }
                
                element.textContent = displayNumber;
            }, 20);
        }
    });
}

// 监听页面可见性变化，暂停/恢复轮播
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopSlideShow();
    } else {
        startSlideShow();
    }
});

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
    }
});

// 触摸滑动支持（移动端）
let touchStartX = 0;
let touchEndX = 0;

const bannerContainer = document.querySelector('.banner-container');
if (bannerContainer) {
    bannerContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    bannerContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 左滑，显示下一张
            nextSlide();
        } else {
            // 右滑，显示上一张
            showSlide(currentSlide - 1);
        }
    }
}

// 优化性能：节流滚动事件
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用节流优化滚动事件
window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 26, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 100));

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);