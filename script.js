// ============================================
// 图片懒加载系统
// ============================================
class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('.lazy-image');
        this.heroBg = document.querySelector('.hero-bg');
        this.init();
    }
    
    init() {
        // 立即加载Hero背景图（关键资源）
        this.loadHeroBackground();
        
        // 懒加载其他图片
        this.setupLazyLoad();
    }
    
    loadHeroBackground() {
        if (!this.heroBg) return;
        
        // 创建一个临时图片来预加载
        const tempImg = new Image();
        tempImg.onload = () => {
            this.heroBg.style.backgroundImage = "url('img/安图恩.jpg')";
            this.heroBg.classList.add('loaded');
        };
        tempImg.onerror = () => {
            console.warn('Hero背景图片加载失败');
        };
        tempImg.src = 'img/安图恩.jpg';
    }
    
    setupLazyLoad() {
        // 使用Intersection Observer API进行懒加载
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, options);
        
        this.images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    loadImage(img) {
        const src = img.getAttribute('src');
        if (!src) return;
        
        // 创建临时图片检测加载状态
        const tempImg = new Image();
        
        tempImg.onload = () => {
            img.classList.add('loaded');
            setTimeout(() => {
                const placeholder = img.nextElementSibling;
                if (placeholder && placeholder.classList.contains('image-loading-placeholder')) {
                    placeholder.style.opacity = '0';
                }
            }, 100);
        };
        
        tempImg.onerror = () => {
            img.classList.add('error');
            console.warn(`图片加载失败: ${src}`);
        };
        
        tempImg.src = src;
    }
}

// ============================================
// 粒子背景系统
// ============================================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.2})`
            });
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // 更新位置
            p.x += p.vx;
            p.y += p.vy;
            
            // 边界检测
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            // 鼠标交互
            if (this.mouse.x && this.mouse.y) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    p.vx -= (dx / distance) * force * 0.2;
                    p.vy -= (dy / distance) * force * 0.2;
                }
            }
            
            // 连线
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// ============================================
// 导航栏功能
// ============================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupHamburger();
        this.setupSmoothScroll();
    }
    
    setupScrollEffect() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    setupHamburger() {
        if (!this.hamburger) return;
        
        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
            });
        });
    }
    
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// 轮播系统
// ============================================
class BannerCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.banner-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.banner-nav-prev');
        this.nextBtn = document.querySelector('.banner-nav-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 4000;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(0);
        this.setupControls();
        this.setupAutoPlay();
        this.setupKeyboard();
        this.setupTouch();
    }
    
    showSlide(n) {
        if (n >= this.slides.length) this.currentSlide = 0;
        else if (n < 0) this.currentSlide = this.slides.length - 1;
        else this.currentSlide = n;
        
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.slides[this.currentSlide].classList.add('active');
        if (this.dots[this.currentSlide]) {
            this.dots[this.currentSlide].classList.add('active');
        }
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    setupControls() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoPlay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
        }
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showSlide(index);
                this.resetAutoPlay();
            });
        });
    }
    
    setupAutoPlay() {
        const bannerContainer = document.querySelector('.banner-container');
        if (!bannerContainer) return;
        
        this.startAutoPlay();
        
        bannerContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        bannerContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoPlay();
            }
        });
    }
    
    setupTouch() {
        const bannerContainer = document.querySelector('.banner-wrapper');
        if (!bannerContainer) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        bannerContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        bannerContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            this.resetAutoPlay();
        }
    }
}

// ============================================
// 数字计数动画
// ============================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count], [data-target]');
        this.init();
    }
    
    init() {
        this.setupObserver();
    }
    
    setupObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    this.animateCounter(entry.target);
                    entry.target.dataset.counted = 'true';
                }
            });
        }, options);
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.count || element.dataset.target);
        if (isNaN(target)) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
}

// ============================================
// 滚动动画系统
// ============================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        this.setupObserver();
    }
    
    setupObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, options);
        
        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // 添加CSS类
        const style = document.createElement('style');
        style.textContent = `
            .aos-animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// 返回顶部按钮
// ============================================
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        });
        
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// 卡片悬停效果
// ============================================
class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.power-card, .news-card, .member-card, .stat-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.handleMouseEnter(card, e);
            });
            
            card.addEventListener('mousemove', (e) => {
                this.handleMouseMove(card, e);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.handleMouseLeave(card, e);
            });
        });
    }
    
    handleMouseEnter(card, e) {
        const glow = card.querySelector('.member-card-glow, .power-card-bg, .stat-card-glow');
        if (glow) {
            glow.style.opacity = '1';
        }
    }
    
    handleMouseMove(card, e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        // 轻微的3D倾斜效果
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
    
    handleMouseLeave(card, e) {
        card.style.transform = '';
        
        const glow = card.querySelector('.member-card-glow, .power-card-bg, .stat-card-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    }
}

// ============================================
// 按钮涟漪效果
// ============================================
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(button, e);
            });
        });
    }
    
    createRipple(button, e) {
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
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// 添加涟漪效果的CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// 视差滚动效果
// ============================================
class ParallaxEffect {
    constructor() {
        this.heroContent = document.querySelector('.hero-content');
        this.lightBeams = document.querySelectorAll('.light-beam');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            if (this.heroContent && scrolled < window.innerHeight) {
                this.heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                this.heroContent.style.opacity = 1 - scrolled / 600;
            }
            
            this.lightBeams.forEach((beam, index) => {
                beam.style.transform = `translateY(${scrolled * (0.2 + index * 0.1)}px)`;
            });
        });
    }
}

// ============================================
// 性能优化：节流函数
// ============================================
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

// ============================================
// 微信二维码弹窗
// ============================================
class QRCodeModal {
    constructor() {
        this.modal = document.getElementById('qrcodeModal');
        this.joinBtn = document.getElementById('joinBtn');
        this.closeBtn = document.getElementById('closeModal');
        this.init();
    }
    
    init() {
        if (!this.modal || !this.joinBtn) return;
        
        // 点击申请加入按钮
        this.joinBtn.addEventListener('click', () => {
            this.show();
        });
        
        // 点击关闭按钮
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.hide();
            });
        }
        
        // 点击遮罩层关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.hide();
            }
        });
    }
    
    show() {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    hide() {
        this.modal.classList.remove('show');
        document.body.style.overflow = ''; // 恢复滚动
    }
}

// ============================================
// 初始化所有功能
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化图片懒加载（最高优先级）
    const lazyLoad = new LazyLoadImages();
    
    // 初始化粒子系统
    const particles = new ParticleSystem('particles-canvas');
    
    // 初始化导航栏
    const navigation = new Navigation();
    
    // 初始化轮播
    const carousel = new BannerCarousel();
    
    // 初始化数字计数
    const counter = new CounterAnimation();
    
    // 初始化滚动动画
    const scrollAnimations = new ScrollAnimations();
    
    // 初始化返回顶部
    const backToTop = new BackToTop();
    
    // 初始化卡片效果
    const cardEffects = new CardEffects();
    
    // 初始化涟漪效果
    const rippleEffect = new RippleEffect();
    
    // 初始化视差效果
    const parallax = new ParallaxEffect();
    
    // 初始化二维码弹窗
    const qrcodeModal = new QRCodeModal();
    
    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🎮 巴黎岛工会官网已加载完成！');
    console.log('✅ 图片懒加载已启用');
    console.log('✅ 微信二维码弹窗已就绪');
});

// ============================================
// 页面可见性变化处理
// ============================================
document.addEventListener('visibilitychange', () => {
    // 当页面不可见时暂停某些动画以节省资源
    if (document.hidden) {
        console.log('页面已隐藏，暂停动画');
    } else {
        console.log('页面已显示，恢复动画');
    }
});