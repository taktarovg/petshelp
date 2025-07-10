// Initialize Telegram WebApp (optional)
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    
    // Set theme
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#222222');
    document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#929292');
    document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color || '#f1f1f1');
} else {
    // Fallback theme for web browsers
    document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-text-color', '#222222');
    document.documentElement.style.setProperty('--tg-theme-hint-color', '#929292');
    document.documentElement.style.setProperty('--tg-theme-link-color', '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-color', '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f1f1f1');
}

// Global data
let helpRequests = [
    {
        id: 1,
        title: "Щенок нуждается в срочной операции",
        city: "moscow",
        urgency: "critical",
        description: "Щенок найден на улице с переломом лапы. Требуется срочная операция и последующее лечение. Ветклиника готова принять, но нужны средства на операцию - 15,000 рублей.",
        helpType: "medical",
        contact: "@volunteer_moscow",
        author: "Анна В.",
        time: "2 часа назад",
        image: null
    },
    {
        id: 2,
        title: "Кошке нужен корм и временный дом",
        city: "spb",
        urgency: "urgent",
        description: "Беременная кошка, найдена у подъезда. Очень ласковая, видимо домашняя. Нужен временный дом для родов и корм для беременной кошки.",
        helpType: "shelter",
        contact: "+7 (921) 123-45-67",
        author: "Мария К.",
        time: "1 день назад",
        image: null
    },
    {
        id: 3,
        title: "Ищем дом для добрых собак",
        city: "moscow",
        urgency: "regular",
        description: "В приюте 'Верный друг' ищут дом 3 собаки разного возраста. Все привиты, стерилизованы, очень дружелюбные. Поможем с доставкой.",
        helpType: "adoption",
        contact: "Приют 'Верный друг'",
        author: "Приют 'Верный друг'",
        time: "3 дня назад",
        image: null
    },
    {
        id: 4,
        title: "Нужна помощь с транспортировкой",
        city: "ekb",
        urgency: "urgent",
        description: "Необходимо перевезти кота из ветклиники домой после операции. Расстояние 15 км. Время гибкое в течение завтрашнего дня.",
        helpType: "transport",
        contact: "@ekb_volunteer",
        author: "Игорь С.",
        time: "6 часов назад",
        image: null
    },
    {
        id: 5,
        title: "Сбор корма для приюта",
        city: "nsk",
        urgency: "regular",
        description: "Приют 'Лапка' собирает сухой корм для 50 собак. Принимаем любые объемы. Можем забрать корм или встретиться в удобном месте.",
        helpType: "food",
        contact: "Приют 'Лапка' +7 (383) 123-45-67",
        author: "Приют 'Лапка'",
        time: "1 неделю назад",
        image: null
    }
];

let companies = [
    {
        id: 1,
        name: "Ветклиника 'Доктор Вет'",
        type: "vet",
        category: "Ветеринарная клиника",
        city: "moscow",
        rating: 4.8,
        reviews: 127,
        description: "Полный спектр ветеринарных услуг. Скидки для волонтеров 15%. Круглосуточная экстренная помощь.",
        contact: "+7 (495) 123-45-67",
        address: "ул. Пушкина, д. 10",
        logo: "🏥"
    },
    {
        id: 2,
        name: "Приют 'Верный друг'",
        type: "shelter",
        category: "Приют для животных",
        city: "moscow", 
        rating: 4.9,
        reviews: 89,
        description: "Частный приют для бездомных собак и кошек. Помогаем с пристройством, принимаем волонтеров.",
        contact: "@vernyy_drug",
        address: "Московская область, д. Солнечная",
        logo: "🏠"
    },
    {
        id: 3,
        name: "Зоомагазин 'ЗооМир'",
        type: "shop",
        category: "Зоомагазин",
        city: "spb",
        rating: 4.6,
        reviews: 203,
        description: "Большой выбор кормов и товаров для животных. Программа помощи приютам - скидка 20%.",
        contact: "+7 (812) 987-65-43",
        address: "Невский пр., д. 45",
        logo: "🛒"
    },
    {
        id: 4,
        name: "Волонтер Анна",
        type: "volunteer",
        category: "Частный волонтер",
        city: "ekb",
        rating: 5.0,
        reviews: 34,
        description: "Помогаю с транспортировкой животных, временной передержкой кошек. Опыт работы 5 лет.",
        contact: "@anna_volunteer",
        address: "Екатеринбург, центр",
        logo: "👩"
    },
    {
        id: 5,
        name: "Ветклиника 'ПетКэр'",
        type: "vet",
        category: "Ветеринарная клиника",
        city: "spb",
        rating: 4.7,
        reviews: 156,
        description: "Современная ветклиника с новейшим оборудованием. Бесплатные консультации для волонтеров.",
        contact: "+7 (812) 456-78-90",
        address: "ул. Ленина, д. 78",
        logo: "🏥"
    },
    {
        id: 6,
        name: "Фонд 'Лапка добра'",
        type: "shelter",
        category: "Благотворительный фонд",
        city: "nsk",
        rating: 4.8,
        reviews: 67,
        description: "Занимаемся спасением и лечением бездомных животных. Ищем постоянных волонтеров и опекунов.",
        contact: "@lapka_dobra",
        address: "Новосибирск, Академгородок",
        logo: "🐾",
        // Расширенная информация для профиля
        fullDescription: "Благотворительный фонд 'Лапка добра' работает в Новосибирске уже более 8 лет. Мы занимаемся спасением, лечением и пристройством бездомных собак и кошек. За это время нашими волонтерами было спасено более 2000 животных.\n\nНаши направления деятельности:\n• Спасение животных с улиц\n• Ветеринарная помощь\n• Поиск новых домов\n• Стерилизация и вакцинация\n• Работа с приютами-партнерами\n\nМы всегда ищем новых волонтеров, опекунов и просто неравнодушных людей, готовых помочь четвероногим друзьям.",
        workingHours: "Ежедневно 9:00-20:00",
        website: "https://lapka-dobra.ru",
        email: "info@lapka-dobra.ru",
        phone: "+7 (383) 555-12-34",
        socialMedia: {
            telegram: "@lapka_dobra",
            vk: "lapka_dobra_nsk",
            instagram: "lapka_dobra"
        },
        services: [
            "Спасение животных",
            "Ветеринарная помощь",
            "Пристройство в добрые руки",
            "Стерилизация",
            "Вакцинация",
            "Временная передержка"
        ],
        achievements: [
            "Спасено более 2000 животных",
            "Работаем с 2016 года",
            "50+ постоянных волонтеров",
            "Партнерство с 15 ветклиниками"
        ],
        photos: [
            "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Фонд+Лапка+добра",
            "https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Наши+подопечные",
            "https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Волонтеры"
        ]
    }
];

// Favorites management (fallback to memory if localStorage fails)
let favorites = [];
try {
    favorites = JSON.parse(localStorage.getItem('animalHelpFavorites') || '[]');
} catch (e) {
    console.warn('localStorage not available, using memory storage');
    favorites = [];
}

// Utility functions
function getUrgencyText(urgency) {
    const map = {
        'critical': 'Критично',
        'urgent': 'Срочно',
        'regular': 'Актуально'
    };
    return map[urgency] || urgency;
}

function getCityText(city) {
    const map = {
        'moscow': 'Москва',
        'spb': 'Санкт-Петербург',
        'ekb': 'Екатеринбург',
        'nsk': 'Новосибирск'
    };
    return map[city] || city;
}

function getHelpTypeText(type) {
    const map = {
        'financial': 'Финансы',
        'food': 'Корм',
        'medical': 'Лечение',
        'transport': 'Транспорт',
        'shelter': 'Передержка',
        'adoption': 'Поиск дома'
    };
    return map[type] || type;
}

function getAnimalEmoji(helpType) {
    const emojiMap = {
        'financial': '💰',
        'food': '🥫',
        'medical': '🏥',
        'transport': '🚗',
        'shelter': '🏠',
        'adoption': '❤️'
    };
    return emojiMap[helpType] || '🐾';
}

// Favorites functions
function toggleFavorite(requestId) {
    const index = favorites.indexOf(requestId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(requestId);
    }
    
    // Try to save to localStorage, fallback to memory
    try {
        localStorage.setItem('animalHelpFavorites', JSON.stringify(favorites));
    } catch (e) {
        console.warn('Could not save to localStorage');
    }
}

function isFavorite(requestId) {
    return favorites.includes(requestId);
}

function getFavoriteRequests() {
    return helpRequests.filter(request => favorites.includes(request.id));
}

// Common modal functions
function contactHelper(contact) {
    if (tg) {
        tg.showAlert(`Свяжитесь с волонтером: ${contact}`);
    } else {
        alert(`Свяжитесь с волонтером: ${contact}`);
    }
}

function contactCompany(contact, name) {
    if (tg) {
        tg.showAlert(`Свяжитесь с ${name}: ${contact}`);
    } else {
        alert(`Свяжитесь с ${name}: ${contact}`);
    }
}

function shareToStory(id) {
    const request = helpRequests.find(req => req.id === id);
    if (tg) {
        tg.showAlert('Функция "Поделиться в сторис" будет доступна в полной версии');
    } else {
        alert('Функция "Поделиться в сторис" будет доступна в полной версии');
    }
}

function shareToChat(id) {
    const request = helpRequests.find(req => req.id === id);
    if (!request) {
        alert('Заявка не найдена');
        return;
    }
    
    // Формируем текст для отправки
    const shareText = `🐾 ${request.title}\n\n${request.description.substring(0, 150)}${request.description.length > 150 ? '...' : ''}\n\n📍 ${getCityText(request.city)}\n🏥 ${getHelpTypeText(request.helpType)}\n⏰ ${request.time}\n\n💬 Контакт: ${request.contact}\n👤 Автор: ${request.author}\n\n🔗 Подробнее: ${window.location.origin}${window.location.pathname}?request=${id}`;
    
    if (tg && tg.switchInlineQuery) {
        // Метод 1: Используем switchInlineQuery для отправки через inline-режим
        try {
            tg.switchInlineQuery(shareText, ['users', 'groups']);
        } catch (e) {
            console.warn('switchInlineQuery failed:', e);
            fallbackShare(shareText);
        }
    } else if (tg && tg.openTelegramLink) {
        // Метод 2: Открываем Telegram с предзаполненным текстом
        const encodedText = encodeURIComponent(shareText);
        try {
            tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedText}`);
        } catch (e) {
            console.warn('openTelegramLink failed:', e);
            fallbackShare(shareText);
        }
    } else {
        // Метод 3: Fallback для обычных браузеров
        fallbackShare(shareText);
    }
}

// Fallback функция для случаев, когда Telegram API недоступен
function fallbackShare(text) {
    if (navigator.share) {
        // Используем Web Share API если доступен
        navigator.share({
            title: 'Помощь животному',
            text: text,
            url: window.location.href
        }).catch(err => {
            console.log('Share failed:', err);
            copyToClipboard(text);
        });
    } else {
        // Копируем в буфер обмена
        copyToClipboard(text);
    }
}

// Функция копирования в буфер обмена
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('📋 Информация скопирована в буфер обмена!\n\nТеперь вы можете вставить её в любой чат.');
        }).catch(() => {
            textAreaFallback(text);
        });
    } else {
        textAreaFallback(text);
    }
}

// Fallback через textarea для старых браузеров
function textAreaFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('📋 Информация скопирована в буфер обмена!\n\nТеперь вы можете вставить её в любой чат.');
    } catch (err) {
        alert('❌ Не удалось скопировать. Попробуйте выделить текст вручную.');
    }
    document.body.removeChild(textArea);
}

function copyLink(id) {
    const request = helpRequests.find(req => req.id === id);
    const url = `${window.location.origin}${window.location.pathname}?request=${id}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Ссылка скопирована в буфер обмена');
        }).catch(() => {
            alert('Не удалось скопировать ссылку');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('Ссылка скопирована в буфер обмена');
        } catch (err) {
            alert('Не удалось скопировать ссылку');
        }
        document.body.removeChild(textArea);
    }
}

// Global function to open create modal (redirect to index if not on index page)
function openCreateModal() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // We're on the index page, try to open modal
        const modal = document.getElementById('createModal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            console.warn('Create modal not found on this page');
        }
    } else {
        // Redirect to index page
        window.location.href = 'index.html';
    }
}