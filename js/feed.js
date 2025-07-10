// Feed page specific functionality
let currentFilter = 'all';
let filteredRequests = [];

// Wait for common.js to load data
function initializeFeed() {
    if (typeof helpRequests !== 'undefined' && helpRequests.length > 0) {
        filteredRequests = [...helpRequests];
        renderHelpFeed();
    } else {
        // Retry after a short delay if data not ready
        setTimeout(initializeFeed, 50);
    }
}

function renderHelpFeed() {
    const feed = document.getElementById('help-feed');
    const emptyState = document.getElementById('empty-state');
    
    if (!feed) return; // Guard clause if element not found
    
    if (filteredRequests.length === 0) {
        feed.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    feed.innerHTML = filteredRequests.map(request => `
        <div class="help-card ${request.urgency}" onclick="openDetailModal(${request.id})">
            <div class="card-image">
                ${request.image && !request.image.includes('data:image/svg') ? 
                    `<img src="${request.image}" alt="Фото">` : 
                    getAnimalEmoji(request.helpType)}
            </div>
            <div class="card-content">
                <div class="card-header">
                    <div class="card-title">${request.title}</div>
                    <div class="urgency-badge">${getUrgencyText(request.urgency)}</div>
                </div>
                <div class="card-location">📍 ${getCityText(request.city)} • ${getHelpTypeText(request.helpType)}</div>
                <div class="card-description">${request.description.substring(0, 120)}${request.description.length > 120 ? '...' : ''}</div>
                <div class="card-footer">
                    <span>${request.author}</span>
                    <span>${request.time}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function applyFilter(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // Filter requests
    if (filter === 'all') {
        filteredRequests = [...helpRequests];
    } else if (['critical', 'urgent', 'regular'].includes(filter)) {
        filteredRequests = helpRequests.filter(req => req.urgency === filter);
    } else {
        filteredRequests = helpRequests.filter(req => req.city === filter);
    }
    
    renderHelpFeed();
}

function openCreateModal() {
    document.getElementById('createModal').style.display = 'block';
}

function closeCreateModal() {
    document.getElementById('createModal').style.display = 'none';
    document.getElementById('helpForm').reset();
    const photoPreview = document.getElementById('photoPreview');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    if (photoPreview) photoPreview.classList.add('hidden');
    if (photoPlaceholder) photoPlaceholder.style.display = 'block';
}

function openDetailModal(id) {
    const request = helpRequests.find(req => req.id === id);
    if (!request) return;
    
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    
    content.innerHTML = `
        ${request.image && !request.image.includes('data:image/svg') ? 
            `<img src="${request.image}" alt="Фото" class="detail-image">` : 
            `<div style="height: 200px; background: var(--tg-theme-secondary-bg-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 64px; margin-bottom: 16px;">
                ${getAnimalEmoji(request.helpType)}
            </div>`
        }
        <div class="detail-urgency ${request.urgency}">${getUrgencyText(request.urgency)}</div>
        <h3>${request.title}</h3>
        <div style="margin: 12px 0; color: var(--tg-theme-hint-color); font-size: 14px;">
            📍 ${getCityText(request.city)} • ${getHelpTypeText(request.helpType)} • ${request.time}
        </div>
        <div style="margin: 16px 0; line-height: 1.4;">
            ${request.description}
        </div>
        <div style="margin: 16px 0; padding: 12px; background: var(--tg-theme-secondary-bg-color); border-radius: 8px;">
            <strong>Контакт:</strong> ${request.contact}<br>
            <strong>Автор:</strong> ${request.author}
        </div>
        <div class="detail-actions">
            <button class="btn" onclick="contactHelper('${request.contact}')">Связаться</button>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button class="btn btn-secondary" onclick="toggleFavoriteFromModal(${id})" style="flex: 1;">
                    ${isFavorite(id) ? '💔 Убрать из избранного' : '❤️ В избранное'}
                </button>
            </div>
            <div class="share-buttons">
                <button class="share-btn primary" onclick="shareToChat(${id})">
                    <span>💬</span>
                    <span>В чат</span>
                </button>
                <button class="share-btn" onclick="shareToStory(${id})">
                    <span>📱</span>
                    <span>В сторис</span>
                </button>
                <button class="share-btn" onclick="copyLink(${id})">
                    <span>🔗</span>
                    <span>Ссылка</span>
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeDetailModal() {
    document.getElementById('detailModal').style.display = 'none';
}

function toggleFavoriteFromModal(id) {
    toggleFavorite(id);
    // Re-render modal to update button text
    openDetailModal(id);
}

function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photoPreview');
            const placeholder = document.getElementById('photoPlaceholder');
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            placeholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const helpForm = document.getElementById('helpForm');
    if (helpForm) {
        helpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newRequest = {
                id: helpRequests.length + 1,
                title: document.getElementById('title').value,
                city: document.getElementById('city').value,
                urgency: document.getElementById('urgency').value,
                description: document.getElementById('description').value,
                helpType: document.getElementById('helpType').value,
                contact: document.getElementById('contact').value,
                author: 'Демо пользователь',
                time: 'только что',
                image: document.getElementById('photoPreview').src && !document.getElementById('photoPreview').classList.contains('hidden') ? 
                    document.getElementById('photoPreview').src : null
            };
            
            helpRequests.unshift(newRequest);
            applyFilter(currentFilter);
            closeCreateModal();
            
            alert('Заявка успешно создана! Спасибо за помощь животным 🐾');
        });
    }

    // Filter buttons event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            applyFilter(this.dataset.filter);
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const createModal = document.getElementById('createModal');
        const detailModal = document.getElementById('detailModal');
        
        if (event.target === createModal) {
            closeCreateModal();
        }
        if (event.target === detailModal) {
            closeDetailModal();
        }
    });

    // Initialize feed
    initializeFeed();

    // Simulate real-time updates
    setInterval(() => {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length > 0) {
            stats[0].textContent = Math.floor(Math.random() * 50) + 100; // Active requests
            stats[1].textContent = Math.floor(Math.random() * 20) + 80;  // Help provided
        }
    }, 30000); // Update every 30 seconds
});