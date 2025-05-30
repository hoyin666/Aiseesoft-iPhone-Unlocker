// 頁面加載完成後隱藏加載器
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 500);
});

// 創建粒子效果
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 隨機大小
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // 隨機位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // 隨機動畫延遲和持續時間
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// 初始化粒子效果
createParticles();

// 複製到剪貼板
function copyToClipboard(event, text) {
    event.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '已複製！';
        btn.classList.add('copied');
        showToast('連結已複製到剪貼板！');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('複製失敗:', err);
        showToast('複製失敗，請手動複製');
    });
}

// 複製密碼
function copyPassword(event, password) {
    event.stopPropagation();
    navigator.clipboard.writeText(password).then(() => {
        showToast('提取碼已複製！');
        
        // 添加視覺反饋
        const element = event.target;
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1.05)';
        }, 100);
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }).catch(err => {
        console.error('複製失敗:', err);
        showToast('複製失敗，請手動複製');
    });
}

// 複製所有連結
function copyAllLinks() {
    const allLinks = `Aiseesoft iPhone Unlocker 無限裝置版 下載連結

自架構高速下載：
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
        
        // 添加按鈕動畫效果
        const btn = event.target;
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }).catch(err => {
        console.error('複製失敗:', err);
        showToast('複製失敗，請手動複製');
    });
}

// 顯示提示訊息
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 創建波紋效果
function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// 視差滾動效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.background-wrapper');
    const speed = 0.5;
    
    if (background) {
        background.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
    }
});

// 滑鼠移動視差效果
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = (index % 5 + 1) * 0.5;
        const x = mouseX * speed * 10;
        const y = mouseY * speed * 10;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// 性能優化：使用 requestAnimationFrame 進行動畫
let ticking = false;
function updateParallax(mouseX, mouseY) {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = (index % 5 + 1) * 0.5;
                const x = mouseX * speed * 10;
                const y = mouseY * speed * 10;
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
}

// 優化後的滑鼠移動事件
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    updateParallax(mouseX, mouseY);
});

// 檢測是否支援 backdrop-filter
if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
    document.body.classList.add('no-backdrop-filter');
    // 可以在 CSS 中為 .no-backdrop-filter 添加替代樣式
}

// 預加載背景圖片
const img = new Image();
img.src = 'bg.jpg';
img.onload = function() {
    console.log('背景圖片加載完成');
};
img.onerror = function() {
    console.error('背景圖片加載失敗');
    // 如果圖片加載失敗，可以設置替代背景
    document.querySelector('.background-wrapper').style.background = 'linear-gradient(135deg, #1e3a8a, #312e81)';
};
