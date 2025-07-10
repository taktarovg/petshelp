// Catalog page specific functionality
let currentCategory = 'all';
let filteredCompanies = [];

// Wait for common.js to load data
function initializeCatalog() {
    if (typeof companies !== 'undefined' && companies.length > 0) {
        filteredCompanies = [...companies];
        renderCompanies();
    } else {
        // Retry after a short delay if data not ready
        setTimeout(initializeCatalog, 50);
    }
}

function renderCompanies() {
    const container = document.getElementById('companies-list');
    const emptyState = document.getElementById('empty-companies');
    
    if (!container) return; // Guard clause if element not found
    
    if (filteredCompanies.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    container.innerHTML = filteredCompanies.map(company => `
        <div class="company-card" onclick="openCompanyProfile(${company.id})">
            <div class="company-header">
                <div class="company-logo">${company.logo}</div>
                <div class="company-info">
                    <div class="company-name">${company.name}</div>
                    <div class="company-type">${company.category} • ${getCityText(company.city)}</div>
                </div>
                <div class="company-rating">
                    ⭐ ${company.rating} (${company.reviews})
                </div>
            </div>
            <div class="company-description">${company.description}</div>
            <div class="company-contact">📍 ${company.address} • 📞 ${company.contact}</div>
        </div>
    `).join('');
}

function applyCompanyFilter(category) {
    currentCategory = category;
    
    // Update filter buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter companies
    if (category === 'all') {
        filteredCompanies = [...companies];
    } else {
        filteredCompanies = companies.filter(company => company.type === category);
    }
    
    renderCompanies();
}

// Функции для работы с профилем компании
function openCompanyProfile(companyId) {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;
    
    const modal = document.getElementById('companyProfileModal');
    const content = document.getElementById('companyProfileContent');
    
    content.innerHTML = generateCompanyProfileHTML(company);
    modal.style.display = 'block';
}

function closeCompanyProfile() {
    document.getElementById('companyProfileModal').style.display = 'none';
}

function generateCompanyProfileHTML(company) {
    const hasExtendedInfo = company.fullDescription;
    
    return `
        <div class="company-profile-header">
            <div class="company-profile-avatar">${company.logo}</div>
            <div class="company-profile-name">${company.name}</div>
            <div class="company-profile-category">${company.category} • ${getCityText(company.city)}</div>
            <div class="company-profile-rating">
                <span>⭐ ${company.rating}</span>
                <span>•</span>
                <span>${company.reviews} отзывов</span>
            </div>
        </div>
        
        <div class="company-profile-content">
            <div class="profile-section">
                <div class="profile-section-title">
                    <span>📝</span>
                    <span>О нас</span>
                </div>
                <div class="profile-section-content">
                    ${hasExtendedInfo ? company.fullDescription.replace(/\n/g, '<br>') : company.description}
                </div>
            </div>
            
            ${hasExtendedInfo && company.services ? `
            <div class="profile-section">
                <div class="profile-section-title">
                    <span>💼</span>
                    <span>Наши услуги</span>
                </div>
                <div class="services-grid">
                    ${company.services.map(service => `
                        <div class="service-item">${service}</div>
                    `).join('')}
                </div>
            </div>` : ''}
            
            <div class="profile-section">
                <div class="profile-section-title">
                    <span>📞</span>
                    <span>Контакты</span>
                </div>
                <div class="contact-grid">
                    ${company.address ? `
                    <div class="contact-item" onclick="openMap('${company.address}')">
                        <div class="contact-icon">📍</div>
                        <div class="contact-info">
                            <div class="contact-label">Адрес</div>
                            <div class="contact-value">${company.address}</div>
                        </div>
                    </div>` : ''}
                    
                    ${hasExtendedInfo && company.phone ? `
                    <div class="contact-item" onclick="callPhone('${company.phone}')">
                        <div class="contact-icon">📞</div>
                        <div class="contact-info">
                            <div class="contact-label">Телефон</div>
                            <div class="contact-value">${company.phone}</div>
                        </div>
                    </div>` : ''}
                    
                    ${company.contact ? `
                    <div class="contact-item" onclick="contactCompany('${company.contact}', '${company.name}')">
                        <div class="contact-icon">💬</div>
                        <div class="contact-info">
                            <div class="contact-label">Основной контакт</div>
                            <div class="contact-value">${company.contact}</div>
                        </div>
                    </div>` : ''}
                    
                    ${hasExtendedInfo && company.email ? `
                    <div class="contact-item" onclick="sendEmail('${company.email}')">
                        <div class="contact-icon">✉️</div>
                        <div class="contact-info">
                            <div class="contact-label">Email</div>
                            <div class="contact-value">${company.email}</div>
                        </div>
                    </div>` : ''}
                    
                    ${hasExtendedInfo && company.workingHours ? `
                    <div class="contact-item">
                        <div class="contact-icon">🕰️</div>
                        <div class="contact-info">
                            <div class="contact-label">Режим работы</div>
                            <div class="contact-value">${company.workingHours}</div>
                        </div>
                    </div>` : ''}
                </div>
            </div>
            
            ${hasExtendedInfo && company.achievements ? `
            <div class="profile-section">
                <div class="profile-section-title">
                    <span>🏆</span>
                    <span>Наши достижения</span>
                </div>
                <div class="achievements-list">
                    ${company.achievements.map(achievement => `
                        <div class="achievement-item">${achievement}</div>
                    `).join('')}
                </div>
            </div>` : ''}
            
            ${hasExtendedInfo && company.socialMedia ? `
            <div class="profile-section">
                <div class="profile-section-title">
                    <span>🔗</span>
                    <span>Мы в соцсетях</span>
                </div>
                <div class="contact-grid">
                    ${company.socialMedia.telegram ? `
                    <div class="contact-item" onclick="openTelegram('${company.socialMedia.telegram}')">
                        <div class="contact-icon">💬</div>
                        <div class="contact-info">
                            <div class="contact-label">Telegram</div>
                            <div class="contact-value">${company.socialMedia.telegram}</div>
                        </div>
                    </div>` : ''}
                    
                    ${company.socialMedia.vk ? `
                    <div class="contact-item" onclick="openVK('${company.socialMedia.vk}')">
                        <div class="contact-icon">🔷</div>
                        <div class="contact-info">
                            <div class="contact-label">VK</div>
                            <div class="contact-value">${company.socialMedia.vk}</div>
                        </div>
                    </div>` : ''}
                    
                    ${company.socialMedia.instagram ? `
                    <div class="contact-item" onclick="openInstagram('${company.socialMedia.instagram}')">
                        <div class="contact-icon">📷</div>
                        <div class="contact-info">
                            <div class="contact-label">Instagram</div>
                            <div class="contact-value">${company.socialMedia.instagram}</div>
                        </div>
                    </div>` : ''}
                </div>
            </div>` : ''}
        </div>
        
        <div class="company-actions">
            <button class="company-action-btn primary" onclick="contactCompany('${company.contact}', '${company.name}')">
                <span>💬</span>
                <span>Написать</span>
            </button>
            ${hasExtendedInfo && company.phone ? `
            <button class="company-action-btn secondary" onclick="callPhone('${company.phone}')">
                <span>📞</span>
                <span>Позвонить</span>
            </button>` : ''}
            <button class="company-action-btn secondary" onclick="shareCompany(${company.id})">
                <span>🔗</span>
                <span>Поделиться</span>
            </button>
        </div>
    `;
}

// Вспомогательные функции для действий
function callPhone(phone) {
    window.open(`tel:${phone}`);
}

function sendEmail(email) {
    window.open(`mailto:${email}`);
}

function openMap(address) {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://yandex.ru/maps/?text=${encodedAddress}`);
}

function openTelegram(username) {
    if (tg) {
        tg.openTelegramLink(`https://t.me/${username.replace('@', '')}`);
    } else {
        window.open(`https://t.me/${username.replace('@', '')}`);
    }
}

function openVK(username) {
    window.open(`https://vk.com/${username}`);
}

function openInstagram(username) {
    window.open(`https://instagram.com/${username}`);
}

function shareCompany(companyId) {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;
    
    const shareText = `🏢 ${company.name}\n\n${company.description}\n\n📍 ${company.address}\n📞 ${company.contact}\n\n⭐ Рейтинг: ${company.rating} (${company.reviews} отзывов)\n\n🔗 Подробнее: ${window.location.origin}${window.location.pathname}?company=${companyId}`;
    
    if (navigator.share) {
        navigator.share({
            title: company.name,
            text: shareText,
            url: window.location.href
        }).catch(err => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Category filters event listeners
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            applyCompanyFilter(this.dataset.category);
        });
    });

    // Initialize companies list
    initializeCatalog();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const companyModal = document.getElementById('companyProfileModal');
        if (event.target === companyModal) {
            closeCompanyProfile();
        }
    });
});
