// CSS 애니메이션 실습 - JavaScript 인터랙션

// 섹션 네비게이션
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.practice-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // 모든 네비게이션 버튼에서 active 클래스 제거
            navButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 모든 섹션 숨기기
            sections.forEach(section => section.classList.remove('active'));
            // 해당 섹션 보이기
            document.getElementById(targetSection).classList.add('active');
        });
    });
});

/* =================================
   예제 1: 자동차 레이싱 🏎️
   ================================= */

function startRace() {
    const redCar = document.getElementById('redCar');
    const blueCar = document.getElementById('blueCar');
    
    // 이전 애니메이션 클래스 제거
    redCar.classList.remove('racing');
    blueCar.classList.remove('racing');
    
    // 짧은 지연 후 애니메이션 시작 (브라우저가 클래스 제거를 처리할 시간)
    setTimeout(() => {
        redCar.classList.add('racing');
        blueCar.classList.add('racing');
    }, 100);
    
    // 레이스 완료 후 결과 표시
    setTimeout(() => {
        alert('🏁 레이스 완료! 빨간 자동차가 승리했습니다!');
    }, 3000);
}

function resetRace() {
    const redCar = document.getElementById('redCar');
    const blueCar = document.getElementById('blueCar');
    
    redCar.classList.remove('racing');
    blueCar.classList.remove('racing');
}

/* =================================
   예제 2: 사과 떨어지기 🍎
   ================================= */

function dropApple() {
    const apple = document.getElementById('fallingApple');
    
    // 이전 애니메이션 리셋
    apple.classList.remove('falling');
    
    // 새로운 애니메이션 시작
    setTimeout(() => {
        apple.classList.add('falling');
    }, 100);
    
    // 애니메이션 완료 후 자동 리셋
    setTimeout(() => {
        apple.classList.remove('falling');
    }, 3500);
}

function moveBasket(direction) {
    const basket = document.getElementById('basket');
    
    // 모든 이동 클래스 제거
    basket.classList.remove('move-left', 'move-right');
    
    // 방향에 따라 클래스 추가
    if (direction === 'left') {
        basket.classList.add('move-left');
    } else if (direction === 'right') {
        basket.classList.add('move-right');
    }
}

/* =================================
   예제 3: 로켓 발사 🚀
   ================================= */

function launchRocket() {
    const rocket = document.getElementById('rocket');
    
    // 이전 애니메이션 리셋
    rocket.classList.remove('launching');

    // 강제로 리플로우 트리거
    rocket.offsetHeight;

    // 즉시 발사!
    setTimeout(() => {
        rocket.classList.add('launching');
    }, 100);
    
    // 발사 완료 후 자동 리셋
    setTimeout(() => {
        resetRocket();
    }, 4000);
}

function resetRocket() {
    const rocket = document.getElementById('rocket');
    rocket.classList.remove('launching');
}

/* =================================
   예제 4: 카드 뒤집기 🃏
   ================================= */

let score = 0;
let flippedCards = [];

// 카드 클릭 이벤트 등록
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            flipCard(this);
        });
    });
});

function flipCard(cardElement) {
    // 이미 뒤집힌 카드는 무시
    if (cardElement.classList.contains('flipped')) {
        return;
    }
    
    // 카드 뒤집기
    cardElement.classList.add('flipped');
    flippedCards.push(cardElement);
    
    // 점수 증가
    score += 10;
    updateScore();
    
    // 카드 뒤집기 사운드 효과 (시각적 피드백)
    cardElement.style.transform = 'rotateY(180deg) scale(1.1)';
    setTimeout(() => {
        cardElement.style.transform = 'rotateY(180deg) scale(1)';
    }, 200);
}

function shuffleCards() {
    const cardContainer = document.querySelector('.card-container');
    const cards = Array.from(cardContainer.children);
    
    // 카드 섞기 애니메이션
    cards.forEach((card, index) => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = `translateY(${Math.random() * 20 - 10}px) rotate(${Math.random() * 20 - 10}deg)`;
        
        setTimeout(() => {
            card.style.transform = '';
        }, 500);
    });
    
    // 카드 순서 무작위 변경
    setTimeout(() => {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            cardContainer.insertBefore(cards[j], cards[i]);
        }
    }, 600);
}

function resetCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
    
    flippedCards = [];
    score = 0;
    updateScore();
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

/* =================================
   예제 5: 파도 효과 🌊
   ================================= */

let wavesAnimationEnabled = true;

function toggleWaves() {
    const waves = document.querySelectorAll('.wave');
    const boat = document.getElementById('boat');
    const fish = document.querySelectorAll('.fish');
    const button = event.target;
    
    if (wavesAnimationEnabled) {
        // 모든 애니메이션 정지
        waves.forEach(wave => {
            wave.style.animationPlayState = 'paused';
        });
        if (boat) {
            boat.style.animationPlayState = 'paused';
        }
        fish.forEach(f => {
            f.style.animationPlayState = 'paused';
        });
        button.textContent = '🌊 파도 시작';
        wavesAnimationEnabled = false;
    } else {
        // 모든 애니메이션 재개
        waves.forEach(wave => {
            wave.style.animationPlayState = 'running';
        });
        if (boat) {
            boat.style.animationPlayState = 'running';
        }
        fish.forEach(f => {
            f.style.animationPlayState = 'running';
        });
        button.textContent = '🌊 파도 정지';
        wavesAnimationEnabled = true;
    }
}

function addFish() {
    const fishContainer = document.querySelector('.fish-container');
    const fishEmojis = ['🐠', '🐟', '🦈', '🐡', '🦑', '🐙', '🦞'];
    const randomFish = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
    
    // 새 물고기 요소 생성
    const newFish = document.createElement('div');
    newFish.className = 'fish';
    newFish.textContent = randomFish;
    newFish.style.position = 'absolute';
    newFish.style.fontSize = '2rem';
    newFish.style.top = Math.random() * 60 + 60 + '%';
    newFish.style.left = '-100px';
    newFish.style.animation = 'fishSwim 6s linear infinite';
    newFish.style.animationDelay = Math.random() * 3 + 's';
    
    // 물고기 추가
    fishContainer.appendChild(newFish);
    
    // 일정 시간 후 물고기 제거 (메모리 절약)
    setTimeout(() => {
        if (newFish.parentNode) {
            newFish.parentNode.removeChild(newFish);
        }
    }, 10000);
}

/* =================================
   키보드 단축키
   ================================= */

document.addEventListener('keydown', function(event) {
    // 스페이스바로 현재 섹션의 주요 액션 실행
    if (event.code === 'Space') {
        event.preventDefault();
        
        const activeSection = document.querySelector('.practice-section.active');
        if (activeSection) {
            const sectionId = activeSection.id;
            
            switch (sectionId) {
                case 'racing':
                    startRace();
                    break;
                case 'apple':
                    dropApple();
                    break;
                case 'rocket':
                    launchRocket();
                    break;
                case 'cards':
                    shuffleCards();
                    break;
                case 'waves':
                    toggleWaves();
                    break;
            }
        }
    }
    
    // 숫자 키로 섹션 전환
    if (event.key >= '1' && event.key <= '5') {
        const sectionIndex = parseInt(event.key) - 1;
        const navButtons = document.querySelectorAll('.nav-btn');
        if (navButtons[sectionIndex]) {
            navButtons[sectionIndex].click();
        }
    }
});

/* =================================
   성능 최적화 및 접근성
   ================================= */

// 사용자가 애니메이션 줄이기를 선호하는 경우 감지
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('사용자가 애니메이션 줄이기를 선호합니다. 애니메이션이 제한됩니다.');
    
    // 모든 애니메이션 속도를 매우 빠르게 설정
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// 페이지 가시성 변경 시 애니메이션 관리 (성능 최적화)
document.addEventListener('visibilitychange', function() {
    const allAnimatedElements = document.querySelectorAll('[class*="animated"], .wave, .star');
    
    if (document.hidden) {
        // 페이지가 숨겨지면 애니메이션 일시정지
        allAnimatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    } else {
        // 페이지가 다시 보이면 애니메이션 재개
        allAnimatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
});

/* =================================
   도움말 시스템
   ================================= */

// 도움말 표시
function showHelp() {
    const helpText = `
🎨 CSS 애니메이션 실습 도움말

🎮 조작법:
- 숫자 키 1-5: 섹션 전환
- 스페이스바: 현재 섹션의 주요 액션 실행
- 마우스: 각 요소와 상호작용

🏎️ 자동차 레이싱:
- Transition과 Transform 학습
- 다양한 타이밍 함수 체험

🍎 사과 떨어지기:
- Keyframes 애니메이션
- 자연스러운 물리 효과

🚀 로켓 발사:
- @starting-style과 복합 애니메이션
- 단계별 애니메이션 시퀀스

🃏 카드 뒤집기:
- 3D Transform 효과
- 인터랙티브 애니메이션

🌊 파도 효과:
- 무한 반복 애니메이션
- 다층 효과

💡 팁: 개발자 도구로 CSS를 실시간 수정해보세요!
    `;
    
    alert(helpText);
}

// ESC 키로 도움말 호출
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        showHelp();
    }
});

// 초기화 완료 메시지
console.log('💡 ESC 키를 누르면 도움말을 볼 수 있습니다.');
console.log('🎮 숫자 키 1-5로 섹션을 전환하고, 스페이스바로 액션을 실행하세요!');