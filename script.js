document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        { selector: 'h1', animationName: 'fadeInUp', duration: 600, baseDelay: 0 },
        { selector: '#subtitle', animationName: 'fadeInUp', duration: 600, baseDelay: 150 },
    ];

    let accumulatedDelay = 0;

    elementsToAnimate.forEach(config => {
        const elem = document.querySelector(config.selector);
        if (elem) {
            elem.style.animation = `${config.animationName} ${config.duration / 1000}s ${(config.baseDelay) / 1000}s ease-out forwards`;
            accumulatedDelay = Math.max(accumulatedDelay, config.baseDelay + config.duration);
        }
    });
    
    let cardsStartDelay = accumulatedDelay + 100; 

    const downloadSections = document.querySelectorAll('.download-section');
    const sectionAnimationDuration = 500;
    const sectionStaggerOffset = 120;

    downloadSections.forEach((section, index) => {
        const delayForThisSection = cardsStartDelay + (index * sectionStaggerOffset);
        section.style.animation = `fadeInUp ${sectionAnimationDuration / 1000}s ${delayForThisSection / 1000}s ease-out forwards`;
    });

    let lastCardFinishTime = 0;
    if (downloadSections.length > 0) {
        lastCardFinishTime = cardsStartDelay + ((downloadSections.length - 1) * sectionStaggerOffset) + sectionAnimationDuration;
    } else {
        lastCardFinishTime = accumulatedDelay;
    }
    
    const downloadAllButton = document.querySelector('.download-all');
    if (downloadAllButton) {
        const buttonDelay = lastCardFinishTime + 150;
        const buttonAnimationDuration = 600;
        downloadAllButton.style.animation = `fadeInUp ${buttonAnimationDuration / 1000}s ${buttonDelay / 1000}s ease-out forwards`;
    }
});

function copyToClipboard(event, text) {
    event.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = '已複製！';
        btn.classList.add('copied');
        showToast('連結已複製到剪貼板！');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    });
}

function copyPassword(event, password) {
    event.stopPropagation();
    navigator.clipboard.writeText(password).then(() => {
        const passwordSpan = event.target.closest('.password');
        const originalText = passwordSpan.textContent;
        passwordSpan.textContent = '已複製!';
        setTimeout(() => {
            passwordSpan.textContent = originalText;
        }, 1500);
        showToast('提取碼已複製！');
    });
}

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

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('opacity-100', 'translate-y-0');
    toast.classList.remove('opacity-0', 'translate-y-full'); 
    
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-full');
    }, 3000);
}

function createRipple(event, element) {
    if (!element.classList.contains('download-section')) return;

    const existingRipple = element.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

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
    }, 600);
}
