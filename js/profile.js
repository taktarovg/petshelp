// Profile page specific functionality

function loadProfile() {
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = 'Демо пользователь';
    }
}

function showComingSoon(feature) {
    alert(`Функция "${feature}" будет доступна в следующих версиях приложения`);
}

function showSupport() {
    const supportMessage = `🐾 Поддержка ПомощьЖивотным

Если у вас есть вопросы или предложения по улучшению приложения, свяжитесь с нами:

📧 Email: support@animalhelp.ru
💬 Telegram: @animalhelp_support

Мы всегда рады обратной связи и стремимся сделать приложение лучше!`;

    alert(supportMessage);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    
    // Animate stats on load
    const statNumbers = document.querySelectorAll('.profile-stat-number');
    statNumbers.forEach((stat, index) => {
        const finalValue = parseInt(stat.textContent);
        stat.textContent = '0';
        
        setTimeout(() => {
            let current = 0;
            const increment = finalValue / 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    current = finalValue;
                    clearInterval(timer);
                }
                stat.textContent = index === 2 ? current.toFixed(1) : Math.floor(current);
            }, 50);
        }, index * 200);
    });
});