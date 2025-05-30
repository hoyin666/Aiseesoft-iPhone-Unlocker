// 複製到剪貼板
function copyToClipboard(event, text) {
    event.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent; // 保存原始按鈕文字
        btn.textContent = '已複製！';
        btn.classList.add('copied');
        showToast('連結已複製到剪貼板！');
        
        setTimeout(() => {
            btn.textContent = '複製連結'; // 或者 originalText 如果每個按鈕文字不同
            btn.classList.remove('copied');
        }, 2000);
    });
}

// 複製密碼
function copyPassword(event, password) {
    event.stopPropagation();
    navigator.clipboard.writeText(password).then(() => {
        showToast('提取碼已複製！');
        const el = event.target;
        const originalText = el.textContent;
        el.textContent = '已複製!';
        setTimeout(() => {
            el.textContent = originalText;
        }, 1500);
    });
}

// 複製所有連結
function copyAllLinks() {
    const allLinks = `自架構高速下載：
https://mdm.2o25shop.dpdns.org/download

Google雲端：
https://drive.google.com/file/d/19lB6dEq4yyESN6R6GcIS0CqkrDHQXeX1/view?usp=drivesdk

Proton 雲端：
https://drive.proton.me/urls/6A3Y3RETFM#FW2gjw0SIEPy

Onedrive 雲端：
https://1drv.ms/u/c/9e8cd632594795fc/EYAW-S7-ssxOpApxf1id_HkBroLVThJ5x3dypXw-24U-XQ

百度網盤：
链接:https://pan.baidu.com/s/1qQfLLa1DOTnWCl47Ze4gBg?pwd=tool 
提取码:tool`;
    
    navigator.clipboard.writeText(allLinks).then(() => {
        showToast('所有連結已複製到剪貼板！');
    });
}

// 顯示提示訊息
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    clearTimeout(toastTimeout); // 如果前一個提示還在，清除它
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 創建波紋效果
function createRipple(event, element) {
    // 如果點擊的是按鈕、連結或密碼區域內部，則不創建波紋
    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || event.target.classList.contains('password')) {
        return;
    }

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect(); // 使用 element (傳入的 this)
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // 確保波紋附加到被點擊的 .download-section，而不是其子元素
    // event.currentTarget 指向綁定事件的元素 (即帶有 onclick 的 .download-section)
    const currentTarget = event.currentTarget; 
    currentTarget.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// DOMContentLoaded 事件確保在 HTML 完全加載和解析後執行腳本
document.addEventListener('DOMContentLoaded', () => {
    // 為下載區塊設置交錯動畫延遲
    const sections = document.querySelectorAll('.download-section');
    sections.forEach((section, index) => {
        // 0.3s 是 h1 的 fadeIn 動畫時間，之後開始交錯動畫
        section.style.animationDelay = `${index * 0.12 + 0.3}s`; 
    });

    // 粒子動畫
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // 設置畫布尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 粒子對象
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // 方法：繪製單個粒子
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // 方法：更新粒子位置
        update() {
            // 檢查粒子是否碰到畫布邊緣
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            // 移動粒子
            this.x += this.directionX;
            this.y += this.directionY;
            // 繪製粒子
            this.draw();
        }
    }

    // 初始化粒子數組
    function initParticles() {
        particlesArray = [];
        // 根據畫布面積計算粒子數量，可以調整分母來增減密度
        let numberOfParticles = (canvas.height * canvas.width) / 9000; 
        if (numberOfParticles > 150) numberOfParticles = 150; // 限制最大粒子數
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2.5) + 0.5; // 粒子大小 0.5 到 3 之間
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2; // X軸移動速度 (-0.2 到 0.2)
            let directionY = (Math.random() * .4) - .2; // Y軸移動速度 (-0.2 到 0.2)
            let color = 'rgba(255, 255, 255, 0.6)'; // 粒子顏色 (帶透明度的白色)

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // 動畫循環
    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight); // 清除畫布

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    initParticles();
    animateParticles();

    // 響應窗口大小變化
    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        initParticles(); // 重新初始化粒子以適應新尺寸
    });
});
