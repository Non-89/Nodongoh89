function getNumberColor(number) {
    if (number <= 10) return '#fbc400'; // 노란색
    if (number <= 20) return '#69c8f2'; // 파란색
    if (number <= 30) return '#ff7272'; // 빨간색
    if (number <= 40) return '#aaa';     // 회색
    return '#b0d840';                     // 녹색
}

class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = getNumberColor(number);

        this.shadowRoot.innerHTML = `
            <style>
                .lotto-ball {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 22px;
                    font-weight: bold;
                    color: white;
                    background: radial-gradient(circle at 15px 15px, ${color}, #333);
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3), inset 0 -4px 8px rgba(0,0,0,0.4);
                    text-shadow: 0 2px 3px rgba(0,0,0,0.4);
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
                    opacity: 0;
                    transform: scale(0.5);
                }
            </style>
            <div class="lotto-ball">
                <span>${number}</span>
            </div>
        `;
        
        setTimeout(() => {
            const ball = this.shadowRoot.querySelector('.lotto-ball');
            ball.style.opacity = '1';
            ball.style.transform = 'scale(1)';
        }, 50);
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

generateBtn.addEventListener('click', () => {
    generateBtn.disabled = true;
    lottoNumbersContainer.innerHTML = '';
    const totalRows = 5;
    const numbersPerRow = 6; // 한 줄에 6개의 번호

    for (let i = 0; i < totalRows; i++) {
        setTimeout(() => {
            const row = document.createElement('div');
            row.className = 'lotto-row';
            lottoNumbersContainer.appendChild(row);

            const numbers = new Set();
            while (numbers.size < numbersPerRow) {
                numbers.add(Math.floor(Math.random() * 45) + 1);
            }

            const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

            sortedNumbers.forEach((number, j) => {
                setTimeout(() => {
                    const lottoBall = document.createElement('lotto-ball');
                    lottoBall.setAttribute('number', number);
                    row.appendChild(lottoBall);
                }, j * 150);
            });
        }, i * 400);
    }

    setTimeout(() => {
        generateBtn.disabled = false;
    }, totalRows * 400 + numbersPerRow * 150);
});

// Theme switcher logic
const themeToggle = document.getElementById('checkbox');

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Apply saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';