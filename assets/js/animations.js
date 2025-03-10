/*
* Lu-Teras コーポレートサイト
* アニメーションスクリプト
*/

document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimation();
    initParallaxEffect();
    initTypingEffect();
    initServiceCardEffects();
});

// ヒーローセクションアニメーション
function initHeroAnimation() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // ランダムな星のような点の生成
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    heroSection.appendChild(starsContainer);
    
    // 星を生成
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // ランダムな位置とサイズ
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 点滅アニメーション
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
    
    // SVGアニメーション
    const svgContainer = document.querySelector('.hero-image');
    if (svgContainer) {
        // 未来的な図形のSVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'hero-svg');
        svg.setAttribute('viewBox', '0 0 600 400');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        
        // 円
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '300');
        circle.setAttribute('cy', '200');
        circle.setAttribute('r', '80');
        circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.5)');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('class', 'svg-circle');
        
        // 六角形
        const hexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const points = [];
        for (let i = 0; i < 6; i++) {
            const angle = i * Math.PI / 3;
            const x = 300 + 120 * Math.cos(angle);
            const y = 200 + 120 * Math.sin(angle);
            points.push(`${x},${y}`);
        }
        hexagon.setAttribute('points', points.join(' '));
        hexagon.setAttribute('stroke', 'rgba(0, 163, 255, 0.5)');
        hexagon.setAttribute('stroke-width', '2');
        hexagon.setAttribute('fill', 'none');
        hexagon.setAttribute('class', 'svg-hexagon');
        
        // 線
        for (let i = 0; i < 8; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const angle = i * Math.PI / 4;
            const x1 = 300 + 80 * Math.cos(angle);
            const y1 = 200 + 80 * Math.sin(angle);
            const x2 = 300 + 180 * Math.cos(angle);
            const y2 = 200 + 180 * Math.sin(angle);
            
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
            line.setAttribute('stroke-width', '1');
            line.setAttribute('class', 'svg-line');
            line.style.animationDelay = `${i * 0.2}s`;
            
            svg.appendChild(line);
        }
        
        // テキスト
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '300');
        text.setAttribute('y', '205');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'var(--font-secondary)');
        text.setAttribute('font-size', '14');
        text.setAttribute('fill', 'rgba(255, 255, 255, 0.9)');
        text.setAttribute('class', 'svg-text');
        text.textContent = 'AI & HEALTH';
        
        // 小さな点
        for (let i = 0; i < 30; i++) {
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 150;
            const x = 300 + distance * Math.cos(angle);
            const y = 200 + distance * Math.sin(angle);
            
            dot.setAttribute('cx', x);
            dot.setAttribute('cy', y);
            dot.setAttribute('r', Math.random() * 2 + 1);
            dot.setAttribute('fill', 'rgba(255, 255, 255, 0.5)');
            dot.setAttribute('class', 'svg-dot');
            dot.style.animationDuration = `${Math.random() * 3 + 2}s`;
            
            svg.appendChild(dot);
        }
        
        svg.appendChild(circle);
        svg.appendChild(hexagon);
        svg.appendChild(text);
        
        svgContainer.appendChild(svg);
    }
}

// パララックス効果
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });
    
    // マウス移動によるパララックス
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const mouseParallaxElements = document.querySelectorAll('.mouse-parallax');
        
        mouseParallaxElements.forEach(element => {
            const speed = element.dataset.mouseSpeed || 0.05;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (mouseX - centerX) * speed;
            const moveY = (mouseY - centerY) * speed;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// タイピングエフェクト
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.dataset.text || element.textContent;
        element.textContent = '';
        element.style.display = 'inline-block';
        
        let i = 0;
        const speed = element.dataset.speed || 100;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // 要素が画面内に入ったらタイピング開始
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

// サービスカード効果
function initServiceCardEffects() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const cardRect = card.getBoundingClientRect();
            const mouseX = e.clientX - cardRect.left;
            const mouseY = e.clientY - cardRect.top;
            
            // マウスの位置に基づいて光の効果を追加
            card.style.setProperty('--mouseX', `${mouseX}px`);
            card.style.setProperty('--mouseY', `${mouseY}px`);
            card.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            card.classList.remove('card-hover');
        });
    });
}