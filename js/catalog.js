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
        <div class="company-card" onclick="contactCompany('${company.contact}', '${company.name}')">
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
});