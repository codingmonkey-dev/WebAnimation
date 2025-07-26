// JavaScript 애니메이션 실습 - 완성본

/* =================================
   공통 기능 및 초기화
   ================================= */

// 섹션 네비게이션
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.practice-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
            
            // 섹션 전환 시 초기화
            initializeSection(targetSection);
        });
    });
});

function initializeSection(sectionId) {
    switch(sectionId) {
        case 'mouse-tracker':
            initMouseTracker();
            break;
        case 'physics':
            initPhysics();
            break;
        case 'canvas':
            initCanvas();
            break;
        case 'chart':
            initChart();
            break;
    }
}

/* =================================
   예제 1: 마우스 트래커
   ================================= */

let mouseTracker = {
    isTracking: true,
    mouseX: 0,
    mouseY: 0,
    prevX: 0,
    prevY: 0,
    speed: 0,
    particles: [],
    mode: 'trail' // trail, burst, spiral
};

function initMouseTracker() {
    const trackerArea = document.getElementById('trackerArea');
    const crosshair = document.getElementById('crosshair');
    
    trackerArea.addEventListener('mousemove', handleMouseMove);
    trackerArea.addEventListener('mouseleave', handleMouseLeave);
    
    // 초기 상태 업데이트
    updateMouseStats();
    animateParticles();
}

function handleMouseMove(e) {
    if (!mouseTracker.isTracking) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    mouseTracker.prevX = mouseTracker.mouseX;
    mouseTracker.prevY = mouseTracker.mouseY;
    mouseTracker.mouseX = e.clientX - rect.left;
    mouseTracker.mouseY = e.clientY - rect.top;
    
    // 속도 계산
    const deltaX = mouseTracker.mouseX - mouseTracker.prevX;
    const deltaY = mouseTracker.mouseY - mouseTracker.prevY;
    mouseTracker.speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // 십자선 이동
    updateCrosshair();
    
    // 파티클 생성
    createMouseParticle();
    
    // 상태 업데이트
    updateMouseStats();
}

function handleMouseLeave() {
    const crosshair = document.getElementById('crosshair');
    crosshair.style.opacity = '0';
}

function updateCrosshair() {
    const crosshair = document.getElementById('crosshair');
    crosshair.style.left = mouseTracker.mouseX + 'px';
    crosshair.style.top = mouseTracker.mouseY + 'px';
    crosshair.style.opacity = '1';
    
    // 속도에 따른 크기 변경
    const scale = Math.min(1 + mouseTracker.speed * 0.02, 2);
    crosshair.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function createMouseParticle() {
    if (mouseTracker.speed < 2) return; // 최소 속도 필터
    
    const particle = {
        x: mouseTracker.mouseX,
        y: mouseTracker.mouseY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1.0,
        size: Math.random() * 6 + 4,
        color: `hsl(${(mouseTracker.speed * 10) % 360}, 70%, 60%)`,
        mode: mouseTracker.mode
    };
    
    if (mouseTracker.mode === 'spiral') {
        const angle = Date.now() * 0.01;
        particle.vx = Math.cos(angle) * 3;
        particle.vy = Math.sin(angle) * 3;
    }
    
    mouseTracker.particles.push(particle);
    renderParticle(particle);
}

function renderParticle(particle) {
    const particleElement = document.createElement('div');
    particleElement.className = 'particle';
    particleElement.style.cssText = `
        left: ${particle.x}px;
        top: ${particle.y}px;
        width: ${particle.size}px;
        height: ${particle.size}px;
        background: ${particle.color};
        position: absolute;
        pointer-events: none;
        z-index: 10;
    `;
    
    document.getElementById('particleContainer').appendChild(particleElement);
    particle.element = particleElement;
}

function animateParticles() {
    mouseTracker.particles = mouseTracker.particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        particle.size *= 0.98;
        
        if (particle.element) {
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.life;
            particle.element.style.transform = `scale(${particle.life})`;
        }
        
        if (particle.life <= 0) {
            if (particle.element) {
                particle.element.remove();
            }
            return false;
        }
        return true;
    });
    
    requestAnimationFrame(animateParticles);
}

function updateMouseStats() {
    document.getElementById('mouseX').textContent = Math.round(mouseTracker.mouseX);
    document.getElementById('mouseY').textContent = Math.round(mouseTracker.mouseY);
    document.getElementById('mouseSpeed').textContent = Math.round(mouseTracker.speed);
    document.getElementById('particleCount').textContent = mouseTracker.particles.length;
}

function toggleTracking() {
    mouseTracker.isTracking = !mouseTracker.isTracking;
    const crosshair = document.getElementById('crosshair');
    crosshair.style.opacity = mouseTracker.isTracking ? '1' : '0';
}

function clearParticles() {
    mouseTracker.particles.forEach(particle => {
        if (particle.element) particle.element.remove();
    });
    mouseTracker.particles = [];
}

function changeMode() {
    const modes = ['trail', 'burst', 'spiral'];
    const currentIndex = modes.indexOf(mouseTracker.mode);
    mouseTracker.mode = modes[(currentIndex + 1) % modes.length];
}

/* =================================
   예제 2: 물리 시뮬레이션
   ================================= */

let physics = {
    gravity: 0.5,
    bounce: 0.8,
    friction: 0.99,
    balls: [],
    platforms: [],
    isRunning: false
};

function initPhysics() {
    physics.balls = [
        { id: 'ball1', x: 100, y: 50, vx: 0, vy: 0, radius: 20 },
        { id: 'ball2', x: 200, y: 50, vx: 0, vy: 0, radius: 20 },
        { id: 'ball3', x: 300, y: 50, vx: 0, vy: 0, radius: 20 }
    ];
    
    physics.platforms = [
        { x: 100, y: 300, width: 150, height: 20 },
        { x: 480, y: 350, width: 120, height: 20 },
        { x: 300, y: 400, width: 200, height: 20 }
    ];
    
    updateGravityDisplay();
}

function dropBalls() {
    physics.isRunning = true;
    animatePhysics();
}

function animatePhysics() {
    if (!physics.isRunning) return;
    
    physics.balls.forEach(ball => {
        // 중력 적용
        ball.vy += physics.gravity;
        
        // 위치 업데이트
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // 벽면 충돌
        const worldBounds = document.getElementById('physicsWorld').getBoundingClientRect();
        const worldWidth = 800; // 예상 너비
        const worldHeight = 500; // 예상 높이
        
        if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx *= -physics.bounce;
        }
        if (ball.x + ball.radius > worldWidth) {
            ball.x = worldWidth - ball.radius;
            ball.vx *= -physics.bounce;
        }
        if (ball.y + ball.radius > worldHeight) {
            ball.y = worldHeight - ball.radius;
            ball.vy *= -physics.bounce;
        }
        
        // 플랫폼 충돌
        physics.platforms.forEach(platform => {
            if (ball.x + ball.radius > platform.x && 
                ball.x - ball.radius < platform.x + platform.width &&
                ball.y + ball.radius > platform.y && 
                ball.y - ball.radius < platform.y + platform.height &&
                ball.vy > 0) {
                
                ball.y = platform.y - ball.radius;
                ball.vy *= -physics.bounce;
            }
        });
        
        // 마찰 적용
        ball.vx *= physics.friction;
        ball.vy *= 0.999; // 공기 저항
        
        // DOM 업데이트
        const ballElement = document.getElementById(ball.id);
        if (ballElement) {
            ballElement.style.left = (ball.x - ball.radius) + 'px';
            ballElement.style.top = (ball.y - ball.radius) + 'px';
        }
    });
    
    // 정지 조건 확인
    const isMoving = physics.balls.some(ball => 
        Math.abs(ball.vx) > 0.1 || Math.abs(ball.vy) > 0.1
    );
    
    if (isMoving) {
        requestAnimationFrame(animatePhysics);
    } else {
        physics.isRunning = false;
    }
}

function resetBalls() {
    physics.isRunning = false;
    physics.balls.forEach((ball, index) => {
        ball.x = 100 + (index * 100);
        ball.y = 50;
        ball.vx = 0;
        ball.vy = 0;
        
        const ballElement = document.getElementById(ball.id);
        if (ballElement) {
            ballElement.style.left = (ball.x - ball.radius) + 'px';
            ballElement.style.top = (ball.y - ball.radius) + 'px';
        }
    });
}

function changeGravity() {
    physics.gravity = physics.gravity === 0.5 ? 1.0 : physics.gravity === 1.0 ? 0.2 : 0.5;
    updateGravityDisplay();
}

function updateGravityDisplay() {
    const gravityFill = document.getElementById('gravityFill');
    const gravityPercent = (physics.gravity / 1.0) * 100;
    if (gravityFill) {
        gravityFill.style.width = gravityPercent + '%';
    }
}

function addBall() {
    const newBallId = 'ball' + (physics.balls.length + 1);
    const newBall = {
        id: newBallId,
        x: Math.random() * 300 + 100,
        y: 50,
        vx: 0,
        vy: 0,
        radius: 20
    };
    
    // DOM 요소 생성
    const ballElement = document.createElement('div');
    ballElement.id = newBallId;
    ballElement.className = 'ball';
    ballElement.textContent = '⚫';
    ballElement.style.left = (newBall.x - newBall.radius) + 'px';
    ballElement.style.top = (newBall.y - newBall.radius) + 'px';
    
    document.getElementById('physicsWorld').appendChild(ballElement);
    physics.balls.push(newBall);
}

/* =================================
   예제 3: Canvas 파티클 시스템
   ================================= */

let canvas = {
    element: null,
    ctx: null,
    particles: [],
    animationId: null,
    mode: 'fireworks', // fireworks, rain, spiral
    lastTime: 0,
    fps: 60
};

function initCanvas() {
    canvas.element = document.getElementById('particleCanvas');
    canvas.ctx = canvas.element.getContext('2d');
    
    // 캔버스 클릭 이벤트
    canvas.element.addEventListener('click', handleCanvasClick);
    
    // 애니메이션 시작
    startCanvasAnimation();
}

function handleCanvasClick(e) {
    const rect = canvas.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (canvas.mode === 'fireworks') {
        createFirework(x, y);
    }
}

class Particle {
    constructor(x, y, vx, vy, color, life = 1.0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = life;
        this.maxLife = life;
        this.size = Math.random() * 4 + 2;
        this.gravity = 0.1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= 0.01;
        
        return this.life > 0;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createFirework(x, y) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 8 + 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        canvas.particles.push(new Particle(x, y, vx, vy, color, 1.5));
    }
}

function createRain() {
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.element.width;
        const y = -10;
        const vx = (Math.random() - 0.5) * 2;
        const vy = Math.random() * 3 + 2;
        
        canvas.particles.push(new Particle(x, y, vx, vy, '#4682B4', 2.0));
    }
}

function createSpiral() {
    const centerX = canvas.element.width / 2;
    const centerY = canvas.element.height / 2;
    const angle = Date.now() * 0.01;
    
    for (let i = 0; i < 3; i++) {
        const radius = 50 + i * 20;
        const x = centerX + Math.cos(angle + i) * radius;
        const y = centerY + Math.sin(angle + i) * radius;
        const vx = Math.cos(angle + i + Math.PI/2) * 2;
        const vy = Math.sin(angle + i + Math.PI/2) * 2;
        
        canvas.particles.push(new Particle(x, y, vx, vy, `hsl(${(angle * 50 + i * 60) % 360}, 70%, 60%)`, 1.0));
    }
}

function startCanvasAnimation() {
    function animate(currentTime) {
        // FPS 계산
        if (currentTime - canvas.lastTime >= 1000) {
            canvas.fps = Math.round(1000 / (currentTime - canvas.lastTime) * canvas.particles.length);
            canvas.lastTime = currentTime;
            updateCanvasStats();
        }
        
        // 캔버스 클리어
        canvas.ctx.fillStyle = 'rgba(30, 60, 114, 0.1)';
        canvas.ctx.fillRect(0, 0, canvas.element.width, canvas.element.height);
        
        // 파티클 업데이트 및 렌더링
        canvas.particles = canvas.particles.filter(particle => {
            const alive = particle.update();
            if (alive) {
                particle.draw(canvas.ctx);
            }
            return alive;
        });
        
        // 모드별 자동 파티클 생성
        if (canvas.mode === 'rain') {
            createRain();
        } else if (canvas.mode === 'spiral') {
            createSpiral();
        }
        
        canvas.animationId = requestAnimationFrame(animate);
    }
    
    animate(0);
}

function updateCanvasStats() {
    document.getElementById('fpsDisplay').textContent = canvas.fps;
    document.getElementById('canvasParticleCount').textContent = canvas.particles.length;
}

function startFireworks() {
    canvas.mode = 'fireworks';
    // 자동 불꽃 생성
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.element.width;
            const y = Math.random() * canvas.element.height;
            createFirework(x, y);
        }, i * 300);
    }
}

function startRain() {
    canvas.mode = 'rain';
}

function startSpiral() {
    canvas.mode = 'spiral';
}

function clearCanvas() {
    canvas.particles = [];
    canvas.ctx.clearRect(0, 0, canvas.element.width, canvas.element.height);
}

/* =================================
   예제 4: 동적 차트
   ================================= */

let chart = {
    data: [
        { name: 'A', value: 30, color: '#3498db' },
        { name: 'B', value: 45, color: '#e74c3c' },
        { name: 'C', value: 25, color: '#2ecc71' },
        { name: 'D', value: 60, color: '#f39c12' },
        { name: 'E', value: 35, color: '#9b59b6' }
    ],
    type: 'bar',
    svg: null,
    isRealtime: false,
    realtimeInterval: null
};

function initChart() {
    chart.svg = document.getElementById('chartSvg');
    const chartType = document.getElementById('chartType');
    
    chartType.addEventListener('change', function() {
        chart.type = this.value;
        renderChart();
    });
    
    renderChart();
    updateLegend();
}

function renderChart() {
    // SVG 클리어
    while (chart.svg.firstChild && chart.svg.firstChild.tagName !== 'defs') {
        chart.svg.removeChild(chart.svg.firstChild);
    }
    
    switch (chart.type) {
        case 'bar':
            renderBarChart();
            break;
        case 'line':
            renderLineChart();
            break;
        case 'pie':
            renderPieChart();
            break;
    }
}

function renderBarChart() {
    const maxValue = Math.max(...chart.data.map(d => d.value));
    const barWidth = 80;
    const barSpacing = 20;
    const chartHeight = 300;
    const chartTop = 50;
    
    chart.data.forEach((item, index) => {
        const x = 100 + index * (barWidth + barSpacing);
        const height = (item.value / maxValue) * chartHeight;
        const y = chartTop + chartHeight - height;
        
        // 막대 생성
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', item.color);
        rect.setAttribute('class', 'chart-bar');
        rect.style.transformOrigin = `${x + barWidth/2}px ${y + height}px`;
        
        // 애니메이션 효과
        rect.style.transform = 'scaleY(0)';
        setTimeout(() => {
            rect.style.transition = 'transform 0.8s ease';
            rect.style.transform = 'scaleY(1)';
        }, index * 100);
        
        chart.svg.appendChild(rect);
        
        // 라벨 추가
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + barWidth/2);
        text.setAttribute('y', chartTop + chartHeight + 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.textContent = item.name;
        chart.svg.appendChild(text);
        
        // 값 표시
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', x + barWidth/2);
        valueText.setAttribute('y', y - 5);
        valueText.setAttribute('text-anchor', 'middle');
        valueText.setAttribute('fill', '#fff');
        valueText.textContent = item.value;
        chart.svg.appendChild(valueText);
    });
}

function renderLineChart() {
    const maxValue = Math.max(...chart.data.map(d => d.value));
    const pointSpacing = 120;
    const chartHeight = 300;
    const chartTop = 50;
    const startX = 100;
    
    // 선 그리기
    let pathData = '';
    chart.data.forEach((item, index) => {
        const x = startX + index * pointSpacing;
        const y = chartTop + chartHeight - (item.value / maxValue) * chartHeight;
        
        if (index === 0) {
            pathData += `M ${x} ${y}`;
        } else {
            pathData += ` L ${x} ${y}`;
        }
    });
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('class', 'chart-line');
    path.setAttribute('stroke', '#3498db');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    
    // 선 애니메이션
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 2s ease';
        path.style.strokeDashoffset = 0;
    }, 100);
    
    chart.svg.appendChild(path);
    
    // 점 그리기
    chart.data.forEach((item, index) => {
        const x = startX + index * pointSpacing;
        const y = chartTop + chartHeight - (item.value / maxValue) * chartHeight;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 5);
        circle.setAttribute('fill', item.color);
        circle.setAttribute('class', 'chart-point');
        
        // 점 애니메이션
        circle.style.opacity = '0';
        circle.style.transform = 'scale(0)';
        setTimeout(() => {
            circle.style.transition = 'all 0.5s ease';
            circle.style.opacity = '1';
            circle.style.transform = 'scale(1)';
        }, index * 200 + 500);
        
        chart.svg.appendChild(circle);
        
        // 라벨
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', chartTop + chartHeight + 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.textContent = item.name;
        chart.svg.appendChild(text);
    });
}

function renderPieChart() {
    const centerX = 350;
    const centerY = 200;
    const radius = 120;
    const total = chart.data.reduce((sum, item) => sum + item.value, 0);
    
    let currentAngle = -Math.PI / 2; // 12시 방향부터 시작
    
    chart.data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        const endAngle = currentAngle + sliceAngle;
        
        // 큰 호인지 확인
        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
        
        // 시작점과 끝점 계산
        const x1 = centerX + radius * Math.cos(currentAngle);
        const y1 = centerY + radius * Math.sin(currentAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);
        
        // 패스 데이터 생성
        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', item.color);
        path.style.opacity = '0.8';
        path.style.cursor = 'pointer';
        
        // 호버 효과
        path.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
            this.style.transformOrigin = `${centerX}px ${centerY}px`;
        });
        
        path.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1)';
        });
        
        // 애니메이션
        path.style.transform = 'scale(0)';
        path.style.transformOrigin = `${centerX}px ${centerY}px`;
        setTimeout(() => {
            path.style.transition = 'all 0.5s ease';
            path.style.transform = 'scale(1)';
        }, index * 150);
        
        chart.svg.appendChild(path);
        
        // 레이블 위치 계산 (중간 각도)
        const midAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + (radius + 30) * Math.cos(midAngle);
        const labelY = centerY + (radius + 30) * Math.sin(midAngle);
        
        // 레이블 추가
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', labelX);
        text.setAttribute('y', labelY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.textContent = `${item.name}: ${item.value}`;
        chart.svg.appendChild(text);
        
        currentAngle = endAngle;
    });
}

function updateLegend() {
    const legend = document.getElementById('chartLegend');
    legend.innerHTML = '';
    
    chart.data.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background: ${item.color}"></div>
            <span>${item.name}: ${item.value}</span>
        `;
        legend.appendChild(legendItem);
    });
}

function generateData() {
    chart.data = chart.data.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 80) + 20
    }));
    
    renderChart();
    updateLegend();
}

function animateChart() {
    const originalData = [...chart.data];
    
    // 데이터를 0으로 만들고
    chart.data.forEach(item => item.value = 0);
    renderChart();
    
    // 원래 데이터로 복원
    setTimeout(() => {
        chart.data = originalData;
        renderChart();
    }, 500);
}

function addDataPoint() {
    const newItem = {
        name: String.fromCharCode(65 + chart.data.length), // A, B, C...
        value: Math.floor(Math.random() * 80) + 20,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
    };
    
    chart.data.push(newItem);
    renderChart();
    updateLegend();
}

function startRealtime() {
    if (chart.isRealtime) {
        clearInterval(chart.realtimeInterval);
        chart.isRealtime = false;
        event.target.textContent = '⏱️ 실시간 모드';
    } else {
        chart.realtimeInterval = setInterval(() => {
            chart.data.forEach(item => {
                item.value = Math.max(10, Math.min(100, item.value + (Math.random() - 0.5) * 20));
            });
            renderChart();
            updateLegend();
        }, 1000);
        chart.isRealtime = true;
        event.target.textContent = '⏹️ 실시간 정지';
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeSection('mouse-tracker');
});