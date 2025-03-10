/*
* Lu-Teras コーポレートサイト
* スクロールエフェクトスクリプト
*/

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initProgressIndicator();
    initStickyElements();
    initScrollReveal();
});

// スクロールアニメーション
function initScrollAnimations() {
    // スクロールでフェードイン
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(element => {
        element.classList.add('hidden');
        fadeObserver.observe(element);
    });
    
    // スクロールでスライドイン
    const slideElements = document.querySelectorAll('.slide-on-scroll');
    
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const direction = entry.target.dataset.direction || 'left';
                entry.target.classList.add(`slide-in-${direction}`);
                slideObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    slideElements.forEach(element => {
        const direction = element.dataset.direction || 'left';
        element.classList.add(`slide-from-${direction}`);
        slideObserver.observe(element);
    });
}

// スクロールプログレスインジケーター
function initProgressIndicator() {
    // スクロールプログレスバー
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // スクロールアップボタン
    const scrollUpButton = document.createElement('div');
    scrollUpButton.className = 'scroll-up-button';
    scrollUpButton.innerHTML = '↑';
    scrollUpButton.setAttribute('title', 'トップへ戻る');
    document.body.appendChild(scrollUpButton);
    
    // スクロール位置に応じてボタンの表示/非表示
    window.addEventListener('scroll', function() {
        if (window.scrollY > window.innerHeight) {
            scrollUpButton.classList.add('visible');
        } else {
            scrollUpButton.classList.remove('visible');
        }
    });
    
    // クリックイベント
    scrollUpButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 固定要素の制御
function initStickyElements() {
    const stickyElements = document.querySelectorAll('.sticky-element');
    
    stickyElements.forEach(element => {
        const parent = element.parentElement;
        const parentRect = parent.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        const topOffset = element.dataset.offsetTop || 100;
        const bottomOffset = element.dataset.offsetBottom || 50;
        
        window.addEventListener('scroll', function() {
            const parentTop = parent.getBoundingClientRect().top;
            const parentBottom = parent.getBoundingClientRect().bottom;
            
            // 親要素の表示範囲内のみスティッキー効果を適用
            if (parentTop <= topOffset && parentBottom >= elementRect.height + parseInt(bottomOffset)) {
                element.style.position = 'fixed';
                element.style.top = `${topOffset}px`;
                element.style.width = `${parentRect.width}px`;
            } else if (parentBottom < elementRect.height + parseInt(bottomOffset)) {
                element.style.position = 'absolute';
                element.style.top = 'auto';
                element.style.bottom = `${bottomOffset}px`;
            } else {
                element.style.position = 'absolute';
                element.style.top = 0;
                element.style.bottom = 'auto';
            }
        });
    });
}

// スクロールリビール（要素ごとの段階的な表示）
function initScrollReveal() {
    const revealContainers = document.querySelectorAll('.reveal-container');
    
    revealContainers.forEach(container => {
        const revealItems = container.querySelectorAll('.reveal-item');
        
        const revealObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let delay = 0;
                
                revealItems.forEach(item => {
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, delay);
                    
                    delay += parseInt(container.dataset.staggerDelay || 100);
                });
                
                revealObserver.unobserve(container);
            }
        }, { threshold: 0.2 });
        
        revealObserver.observe(container);
    });
    
    // スクロールトリガー要素
    const scrollTriggers = document.querySelectorAll('[data-scroll-trigger]');
    
    scrollTriggers.forEach(trigger => {
        const targetId = trigger.dataset.scrollTrigger;
        const target = document.getElementById(targetId);
        
        if (!target) return;
        
        const triggerOffset = trigger.dataset.triggerOffset || 0.5;
        
        const triggerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                target.classList.add('triggered');
                
                // トリガーが一度きりの場合
                if (trigger.dataset.triggerOnce === 'true') {
                    triggerObserver.unobserve(trigger);
                }
            } else if (trigger.dataset.triggerOnce !== 'true') {
                target.classList.remove('triggered');
            }
        }, { threshold: parseFloat(triggerOffset) });
        
        triggerObserver.observe(trigger);
    });
}

// スクロール連動アニメーション
window.addEventListener('scroll', function() {
    // スクロール連動のパララックス
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    parallaxBgs.forEach(bg => {
        const scrollPosition = window.pageYOffset;
        const bgPosition = bg.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (bgPosition - windowHeight <= scrollPosition && bgPosition + bg.offsetHeight >= scrollPosition) {
            const speed = bg.dataset.parallaxSpeed || 0.5;
            const yPos = -(bgPosition - scrollPosition) * speed;
            
            bg.style.backgroundPosition = `center ${yPos}px`;
        }
    });
    
    // スクロールによる要素の変形
    const transformElements = document.querySelectorAll('.scroll-transform');
    
    transformElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (elementPosition - windowHeight <= scrollPosition && elementPosition + element.offsetHeight >= scrollPosition) {
            // 要素が画面内にある場合
            const scrollPercentage = (scrollPosition - (elementPosition - windowHeight)) / (element.offsetHeight + windowHeight);
            
            // 回転
            if (element.dataset.rotate) {
                const maxRotation = parseFloat(element.dataset.rotate);
                element.style.transform = `${element.style.transform || ''} rotate(${scrollPercentage * maxRotation}deg)`;
            }
            
            // 拡大/縮小
            if (element.dataset.scale) {
                const [minScale, maxScale] = element.dataset.scale.split(',').map(parseFloat);
                const scaleValue = minScale + (maxScale - minScale) * scrollPercentage;
                element.style.transform = `${element.style.transform || ''} scale(${scaleValue})`;
            }
            
            // 透明度
            if (element.dataset.opacity) {
                const [minOpacity, maxOpacity] = element.dataset.opacity.split(',').map(parseFloat);
                const opacityValue = minOpacity + (maxOpacity - minOpacity) * scrollPercentage;
                element.style.opacity = opacityValue;
            }
        }
    });
});