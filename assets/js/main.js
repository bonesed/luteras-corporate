/*
* Lu-Teras コーポレートサイト
* メインJavaScriptファイル
*/

// DOM読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initLazyLoading();
    initObservers();
});

// ヘッダー初期化
function initHeader() {
    const header = document.querySelector('.site-header');
    
    // スクロールイベント
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 初期チェック
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    }
}

// モバイルメニュー初期化
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    // モバイルナビゲーションの生成
    if (!document.querySelector('.mobile-nav')) {
        // モバイルナビのHTML作成
        const nav = document.createElement('nav');

        /*
* Lu-Teras コーポレートサイト
* メインJavaScriptファイル
*/

// DOM読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initLazyLoading();
    initObservers();
    initSmoothScroll();
    initAnimations();
});

// ヘッダー初期化
function initHeader() {
    const header = document.querySelector('.site-header');
    
    // スクロールイベント
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 初期チェック
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    }
}

// モバイルメニュー初期化
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    // モバイルナビゲーションの生成
    if (!document.querySelector('.mobile-nav')) {
        // モバイルナビのHTML作成
        const nav = document.createElement('nav');
        nav.className = 'mobile-nav';
        
        // メインナビゲーションの内容をコピー
        const mainNav = document.querySelector('.main-nav ul');
        if (mainNav) {
            const mainNavClone = mainNav.cloneNode(true);
            const navItems = mainNavClone.querySelectorAll('li');
            
            // アニメーション遅延用の属性追加
            navItems.forEach((item, index) => {
                item.style.setProperty('--i', index);
            });
            
            nav.appendChild(mainNavClone);
        }
        
        // Closeボタン追加
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-mobile-nav';
        closeBtn.innerHTML = '✕';
        nav.appendChild(closeBtn);
        
        // DOM追加
        document.body.appendChild(nav);
        
        // 閉じるボタンイベント
        closeBtn.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
    
    // モバイルメニュートグルイベント
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // モバイルメニュー内のリンククリックイベント
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMobileMenu(false);
        });
    });
    
    // モバイルメニュートグル関数
    function toggleMobileMenu(forceState) {
        const mobileNav = document.querySelector('.mobile-nav');
        const isOpen = typeof forceState !== 'undefined' ? forceState : !menuToggle.classList.contains('active');
        
        if (isOpen) {
            menuToggle.classList.add('active');
            mobileNav.classList.add('active');
            body.classList.add('menu-open');
        } else {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }
}

// 遅延読み込み初期化
function initLazyLoading() {
    // 画像の遅延読み込み
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Intersection Observerが使えない環境用のフォールバック
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Intersection Observer初期化
function initObservers() {
    // アニメーション要素
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationClass = element.dataset.animation || 'fade-in';
                    element.classList.add(animationClass);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Intersection Observerが使えない環境用のフォールバック
        animatedElements.forEach(element => {
            const animationClass = element.dataset.animation || 'fade-in';
            element.classList.add(animationClass);
        });
    }
}

// スムーススクロール初期化
function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 空のハッシュまたは同じページ内のリンクの場合のみ処理
            if (targetId === '#' || document.querySelector(targetId)) {
                e.preventDefault();
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // スクロールインジケーターのクリックイベント
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const heroHeight = document.querySelector('.hero-section').offsetHeight;
            
            window.scrollTo({
                top: heroHeight,
                behavior: 'smooth'
            });
        });
    }
}

// その他のアニメーション初期化
function initAnimations() {
    // 数値のカウントアップアニメーション
    const countElements = document.querySelectorAll('.count-up');
    
    if ('IntersectionObserver' in window) {
        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.target, 10);
                    const duration = parseInt(element.dataset.duration || 2000, 10);
                    let start = 0;
                    const increment = target / (duration / 16);
                    
                    function updateCount() {
                        start += increment;
                        if (start < target) {
                            element.textContent = Math.floor(start);
                            requestAnimationFrame(updateCount);
                        } else {
                            element.textContent = target;
                        }
                    }
                    
                    requestAnimationFrame(updateCount);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        countElements.forEach(element => {
            countObserver.observe(element);
        });
    }
    
    // 背景アニメーション
    initBackgroundAnimation();
}

// 背景アニメーション初期化
function initBackgroundAnimation() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    // パーティクルアニメーション
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);
    
    // パーティクル生成
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // ランダムな位置とサイズ
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // ランダムなアニメーション
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}