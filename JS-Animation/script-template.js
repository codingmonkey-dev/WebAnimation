// JavaScript 애니메이션 실습 - 실습본 (빈칸을 채워주세요!)

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
            
            // 🔥 실습 1: 모든 버튼에서 active 클래스를 제거하고, 클릭된 버튼에 추가하세요
            navButtons.forEach(btn => btn.classList.___________('active'));
            this.classList.___________('active');
            
            // 🔥 실습 2: 모든 섹션을 숨기고, 선택된 섹션만 보이게 하세요
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.___________('active');
            
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
    mode: 'trail'
};

function initMouseTracker() {
    const trackerArea = document.getElementById('trackerArea');
    const crosshair = document.getElementById('crosshair');
    
    // 🔥 실습 3: 마우스 이벤트 리스너를 추가하세요
    trackerArea.addEventListener('___________', handleMouseMove);
    trackerArea.addEventListener('mouseleave', handleMouseLeave);
    
    updateMouseStats();
    animateParticles();
}

function handleMouseMove(e) {
    if (!mouseTracker.isTracking) return;
    
    // 🔥 실습 4: 마우스 위치를 계산하세요
    const rect = e.currentTarget.getBoundingClientRect();
    mouseTracker.prevX = mouseTracker.mouseX;
    mouseTracker.prevY = mouseTracker.mouseY;
    mouseTracker.mouseX = e.clientX - rect.___________; // left 속성 사용
    mouseTracker.mouseY = e.clientY - rect.___________; // top 속성 사용
    
    // 🔥 실습 5: 마우스 이동 속도를 계산하세요 (피타고라스 정리 사용)
    const deltaX = mouseTracker.mouseX - mouseTracker.prevX;
    const deltaY = mouseTracker.mouseY - mouseTracker.prevY;
    mouseTracker.speed = Math.sqrt(deltaX * deltaX + ___________); // deltaY * deltaY
    
    updateCrosshair();
    createMouseParticle();
    updateMouseStats();
}

function handleMouseLeave() {
    const crosshair = document.getElementById('crosshair');
    // 🔥 실습 6: 마우스가 영역을 벗어나면 십자선을 숨기세요
    crosshair.style.___________ = '0';
}

function updateCrosshair() {
    const crosshair = document.getElementById('crosshair');
    // 🔥 실습 7: 십자선을 마우스 위치로 이동시키세요
    crosshair.style.left = mouseTracker.mouseX + '___________'; // px 단위
    crosshair.style.top = mouseTracker.mouseY + '___________';  // px 단위
    crosshair.style.opacity = '1';
    
    // 속도에 따른 크기 변경
    const scale = Math.min(1 + mouseTracker.speed * 0.02, 2);
    crosshair.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function createMouseParticle() {
    if (mouseTracker.speed < 2) return;
    
    // 🔥 실습 8: 파티클 객체를 생성하세요
    const particle = {
        x: mouseTracker.___________,     // 마우스 X 위치
        y: mouseTracker.___________,     // 마우스 Y 위치
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1.0,
        size: Math.random() * 6 + 4,
        color: `hsl(${(mouseTracker.speed * 10) % 360}, 70%, 60%)`,
        mode: mouseTracker.mode
    };
    
    mouseTracker.particles.push(particle);
    renderParticle(particle);
}

function renderParticle(particle) {
    // 🔥 실습 9: 파티클 DOM 요소를 생성하세요
    const particleElement = document.createElement('___________'); // div 태그
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
    
    // 🔥 실습 10: 파티클을 파티클 컨테이너에 추가하세요
    document.getElementById('particleContainer').___________(_________); // appendChild 메서드
    particle.element = particleElement;
}

function animateParticles() {
    mouseTracker.particles = mouseTracker.particles.filter(particle => {
        // 🔥 실습 11: 파티클 위치와 생명력을 업데이트하세요
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= ___________; // 0.02 값으로 생명력 감소
        particle.size *= 0.98;
        
        if (particle.element) {
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.life;
            particle.element.style.transform = `scale(${particle.life})`;
        }
        
        // 🔥 실습 12: 생명력이 0 이하면 파티클을 제거하세요
        if (particle.life <= ___________) { // 0과 비교
            if (particle.element) {
                particle.element.___________(); // remove 메서드
            }
            return false;
        }
        return true;
    });
    
    // 🔥 실습 13: 애니메이션을 계속 실행하세요
    ___________(animateParticles); // requestAnimationFrame 함수
}

function updateMouseStats() {
    // 🔥 실습 14: 화면에 마우스 정보를 표시하세요
    document.getElementById('mouseX').textContent = Math.round(mouseTracker.mouseX);
    document.getElementById('mouseY').textContent = Math.round(mouseTracker.mouseY);
    document.getElementById('mouseSpeed').textContent = Math.round(mouseTracker.___________); // speed 속성
    document.getElementById('particleCount').textContent = mouseTracker.particles.___________; // length 속성
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
    // 🔥 실습 15: 공들의 초기 위치와 속도를 설정하세요
    physics.balls = [
        { id: 'ball1', x: 100, y: 50, vx: 0, vy: 0, radius: 20 },
        { id: 'ball2', x: ___________, y: 50, vx: 0, vy: 0, radius: 20 }, // 200
        { id: 'ball3', x: ___________, y: 50, vx: 0, vy: 0, radius: 20 }  // 300
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
        // 🔥 실습 16: 중력을 적용하세요
        ball.vy += physics.___________; // gravity 속성
        
        // 🔥 실습 17: 공의 위치를 업데이트하세요
        ball.x += ball.vx;
        ball.y += ball.___________; // vy 속성
        
        // 벽면 충돌 처리
        const worldWidth = 800;
        const worldHeight = 500;
        
        // 🔥 실습 18: 왼쪽 벽 충돌을 처리하세요
        if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx *= -physics.___________; // bounce 속성
        }
        if (ball.x + ball.radius > worldWidth) {
            ball.x = worldWidth - ball.radius;
            ball.vx *= -physics.bounce;
        }
        // 🔥 실습 19: 바닥 충돌을 처리하세요
        if (ball.y + ball.radius > worldHeight) {
            ball.y = worldHeight - ball.radius;
            ball.vy *= -physics.___________; // bounce 속성
        }
        
        // 플랫폼 충돌 감지
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
        ball.vy *= 0.999;
        
        // 🔥 실습 20: DOM 요소의 위치를 업데이트하세요
        const ballElement = document.getElementById(ball.id);
        if (ballElement) {
            ballElement.style.left = (ball.x - ball.radius) + '___________'; // px 단위
            ballElement.style.top = (ball.y - ball.radius) + '___________';  // px 단위
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
    mode: 'fireworks',
    lastTime: 0,
    fps: 60
};

function initCanvas() {
    // 🔥 실습 21: Canvas 요소와 2D 컨텍스트를 가져오세요
    canvas.element = document.getElementById('___________'); // particleCanvas ID
    canvas.ctx = canvas.element.getContext('___________');   // 2d 컨텍스트
    
    canvas.element.addEventListener('click', handleCanvasClick);
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
        // 🔥 실습 22: 파티클의 위치와 속도를 업데이트하세요
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.___________; // gravity 속성
        this.life -= 0.01;
        
        return this.life > 0;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // 🔥 실습 23: 원을 그리세요
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * ___________); // 2를 곱해 완전한 원
        ctx.fill();
        ctx.restore();
    }
}

function createFirework(x, y) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    // 🔥 실습 24: 30개의 파티클로 불꽃을 만드세요
    for (let i = 0; i < ___________; i++) { // 30
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
        
        // 🔥 실습 25: 캔버스를 반투명하게 클리어하세요 (트레일 효과)
        canvas.ctx.fillStyle = 'rgba(30, 60, 114, ___________)'; // 0.1 투명도
        canvas.ctx.fillRect(0, 0, canvas.element.width, canvas.element.height);
        
        // 🔥 실습 26: 파티클들을 업데이트하고 그리세요
        canvas.particles = canvas.particles.filter(particle => {
            const alive = particle.___________(); // update 메서드
            if (alive) {
                particle.___________(canvas.ctx); // draw 메서드
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
    
    // 🔥 실습 27: 차트 타입 변경 이벤트를 추가하세요
    chartType.addEventListener('___________', function() { // change 이벤트
        chart.type = this.value;
        renderChart();
    });
    
    renderChart();
    updateLegend();
}

function renderChart() {
    // SVG 클리어 (defs 요소 제외)
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
    // 🔥 실습 28: 최대값을 찾으세요
    const maxValue = Math.max(...chart.data.map(d => d.___________)); // value 속성
    const barWidth = 80;
    const barSpacing = 20;
    const chartHeight = 300;
    const chartTop = 50;
    
    chart.data.forEach((item, index) => {
        const x = 100 + index * (barWidth + barSpacing);
        const height = (item.value / maxValue) * chartHeight;
        const y = chartTop + chartHeight - height;
        
        // 🔥 실습 29: SVG 막대 요소를 생성하세요
        const rect = document.createElementNS('http://www.w3.org/2000/svg', '___________'); // rect 태그
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', item.color);
        rect.setAttribute('class', 'chart-bar');
        rect.style.transformOrigin = `${x + barWidth/2}px ${y + height}px`;
        
        // 🔥 실습 30: 애니메이션 효과를 추가하세요
        rect.style.transform = 'scaleY(___________)'; // 0으로 시작
        setTimeout(() => {
            rect.style.transition = 'transform 0.8s ease';
            rect.style.transform = 'scaleY(___________)'; // 1로 확장
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
    
    // 🔥 실습 31: 선 그리기 경로를 생성하세요
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
    
    // 🔥 실습 32: 선 애니메이션을 위한 설정
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 2s ease';
        path.style.strokeDashoffset = ___________; // 0으로 설정
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
        
        circle.style.opacity = '0';
        circle.style.transform = 'scale(0)';
        setTimeout(() => {
            circle.style.transition = 'all 0.5s ease';
            circle.style.opacity = '1';
            circle.style.transform = 'scale(1)';
        }, index * 200 + 500);
        
        chart.svg.appendChild(circle);
        
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
    // 🔥 실습 33: 전체 합계를 계산하세요
    const total = chart.data.reduce((sum, item) => sum + item.___________, 0); // value 속성
    
    let currentAngle = -Math.PI / 2; // 12시 방향부터 시작
    
    chart.data.forEach((item, index) => {
        // 🔥 실습 34: 각 조각의 각도를 계산하세요
        const sliceAngle = (item.value / total) * 2 * Math.___________; // PI
        const endAngle = currentAngle + sliceAngle;
        
        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
        
        const x1 = centerX + radius * Math.cos(currentAngle);
        const y1 = centerY + radius * Math.sin(currentAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);
        
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
        
        path.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
            this.style.transformOrigin = `${centerX}px ${centerY}px`;
        });
        
        path.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1)';
        });
        
        path.style.transform = 'scale(0)';
        path.style.transformOrigin = `${centerX}px ${centerY}px`;
        setTimeout(() => {
            path.style.transition = 'all 0.5s ease';
            path.style.transform = 'scale(1)';
        }, index * 150);
        
        chart.svg.appendChild(path);
        
        const midAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + (radius + 30) * Math.cos(midAngle);
        const labelY = centerY + (radius + 30) * Math.sin(midAngle);
        
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
    // 🔥 실습 35: 랜덤 데이터를 생성하세요
    chart.data = chart.data.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 80) + ___________  // 20을 더해 최소값 설정
    }));
    
    renderChart();
    updateLegend();
}

function animateChart() {
    const originalData = [...chart.data];
    
    chart.data.forEach(item => item.value = 0);
    renderChart();
    
    setTimeout(() => {
        chart.data = originalData;
        renderChart();
    }, 500);
}

function addDataPoint() {
    const newItem = {
        name: String.fromCharCode(65 + chart.data.length),
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
        // 🔥 실습 36: 실시간 데이터 업데이트 인터벌을 설정하세요
        chart.realtimeInterval = setInterval(() => {
            chart.data.forEach(item => {
                item.value = Math.max(10, Math.min(100, item.value + (Math.random() - 0.5) * 20));
            });
            renderChart();
            updateLegend();
        }, ___________); // 1000ms (1초)
        chart.isRealtime = true;
        event.target.textContent = '⏹️ 실시간 정지';
    }
}

// 🔥 실습 37: 페이지 로드 시 초기화하세요
document.addEventListener('___________', function() { // DOMContentLoaded 이벤트
    initializeSection('mouse-tracker');
});

/* 🎉 축하합니다! 모든 실습을 완료하셨습니다!
   JavaScript로 구현한 애니메이션의 강력함을 느껴보세요!
   
   추가 도전 과제:
   1. 마우스 트래커에 더 다양한 파티클 모드 추가
   2. 물리 시뮬레이션에 공과 공 사이의 충돌 감지 구현
   3. Canvas에 새로운 파티클 효과 (심장, 별, 나비 등) 추가
   4. 차트에 애니메이션 속도 조절 기능 추가
   
   완성된 코드와 비교해보고 다양한 값들을 실험해보세요! */