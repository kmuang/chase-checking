// ==================== Account Data ====================
const accountsData = {
    'chase-checking': {
        name: 'Chase Checking',
        balance: 7547.37,
        type: 'checking',
        category: 'cash',
        gradient: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
        accountNumber: '****1234',
        routing: '123456789',
        transactions: [
            { date: '2025-12-28', description: 'Direct Deposit - Salary', amount: 5000, type: 'credit' },
            { date: '2025-12-27', description: 'Amazon Purchase', amount: -124.52, type: 'debit' },
            { date: '2025-12-26', description: 'Grocery Store', amount: -85.30, type: 'debit' },
            { date: '2025-12-25', description: 'Coffee Shop', amount: -12.50, type: 'debit' }
        ]
    },
    'sofi-savings': {
        name: 'SoFi Savings',
        balance: 45162.32,
        type: 'savings',
        category: 'cash',
        gradient: 'linear-gradient(135deg, #00D4AA 0%, #00B894 100%)',
        accountNumber: '****5678',
        interestRate: '4.50%',
        transactions: [
            { date: '2025-12-30', description: 'Interest Payment', amount: 168.36, type: 'credit' },
            { date: '2025-12-15', description: 'Transfer from Checking', amount: 2000, type: 'credit' },
            { date: '2025-12-01', description: 'Interest Payment', amount: 165.22, type: 'credit' }
        ]
    },
    'venmo': {
        name: 'Venmo',
        balance: 335.00,
        type: 'payment',
        category: 'cash',
        gradient: 'linear-gradient(135deg, #3D95CE 0%, #2E7AB5 100%)',
        accountNumber: '@username',
        transactions: [
            { date: '2025-12-29', description: 'Payment from Sarah', amount: 50, type: 'credit' },
            { date: '2025-12-28', description: 'Dinner Split', amount: -45.50, type: 'debit' },
            { date: '2025-12-27', description: 'Movie Tickets', amount: -32.00, type: 'debit' }
        ]
    },
    'sofi-checking': {
        name: 'SoFi Checking',
        balance: 12163.22,
        type: 'checking',
        category: 'cash',
        gradient: 'linear-gradient(135deg, #00D4AA 0%, #00B894 100%)',
        accountNumber: '****9012',
        routing: '987654321',
        transactions: [
            { date: '2025-12-30', description: 'ATM Withdrawal', amount: -200, type: 'debit' },
            { date: '2025-12-29', description: 'Restaurant', amount: -78.45, type: 'debit' },
            { date: '2025-12-28', description: 'Online Shopping', amount: -156.89, type: 'debit' }
        ]
    },
    'chase-sapphire': {
        name: 'Chase Sapphire',
        balance: -2340.50,
        type: 'credit',
        category: 'credit',
        gradient: 'linear-gradient(135deg, #1A1A2E 0%, #0F0F1E 100%)',
        accountNumber: '****3456',
        creditLimit: 10000,
        availableCredit: 7659.50,
        transactions: [
            { date: '2025-12-30', description: 'Flight Booking', amount: -456.80, type: 'debit' },
            { date: '2025-12-28', description: 'Hotel Reservation', amount: -289.00, type: 'debit' },
            { date: '2025-12-26', description: 'Restaurant', amount: -125.70, type: 'debit' }
        ]
    },
    'amex-gold': {
        name: 'Amex Gold',
        balance: -1563.49,
        type: 'credit',
        category: 'credit',
        gradient: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
        accountNumber: '****7890',
        creditLimit: 15000,
        availableCredit: 13436.51,
        transactions: [
            { date: '2025-12-29', description: 'Grocery Store', amount: -184.32, type: 'debit' },
            { date: '2025-12-27', description: 'Gas Station', amount: -65.00, type: 'debit' },
            { date: '2025-12-25', description: 'Restaurant', amount: -98.50, type: 'debit' }
        ]
    }
};

// ==================== Chart Configuration ====================
let netWorthChart = null;

function initChart() {
    const canvas = document.getElementById('netWorthChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const container = canvas.parentElement;
    canvas.width = container.clientWidth - 32; // Account for padding
    canvas.height = container.clientHeight - 32;
    
    // Chart data (representing monthly progression)
    const data = [
        { value: 0.25, color: 'rgba(77, 142, 255, 0.4)' },
        { value: 0.30, color: 'rgba(77, 142, 255, 0.45)' },
        { value: 0.35, color: 'rgba(77, 142, 255, 0.5)' },
        { value: 0.38, color: 'rgba(77, 142, 255, 0.55)' },
        { value: 0.42, color: 'rgba(77, 142, 255, 0.6)' },
        { value: 0.48, color: 'rgba(77, 142, 255, 0.65)' },
        { value: 0.55, color: 'rgba(77, 142, 255, 0.7)' },
        { value: 0.60, color: 'rgba(77, 142, 255, 0.75)' },
        { value: 0.68, color: 'rgba(77, 142, 255, 0.8)' },
        { value: 0.75, color: 'rgba(77, 142, 255, 0.85)' },
        { value: 0.88, color: 'rgba(77, 142, 255, 0.9)' },
        { value: 0.95, color: 'rgba(77, 142, 255, 0.95)' },
        { value: 1.0, color: 'rgba(77, 142, 255, 1)' }
    ];
    
    const barWidth = (canvas.width - (data.length - 1) * 6) / data.length;
    const maxHeight = canvas.height;
    
    data.forEach((item, index) => {
        const x = index * (barWidth + 6);
        const height = maxHeight * item.value;
        const y = maxHeight - height;
        
        // Draw bar with rounded top
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, [4, 4, 0, 0]);
        ctx.fill();
    });
}

// ==================== Category Toggle ====================
function setupCategoryToggles() {
    const headers = document.querySelectorAll('.category-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const category = header.dataset.category;
            const accountList = document.querySelector(`.account-list[data-category="${category}"]`);
            
            if (accountList) {
                const isCollapsed = header.classList.contains('collapsed');
                
                if (isCollapsed) {
                    header.classList.remove('collapsed');
                    accountList.classList.remove('hidden');
                } else {
                    header.classList.add('collapsed');
                    accountList.classList.add('hidden');
                }
            }
        });
    });
}

// ==================== Account Modal ====================
function setupAccountModal() {
    const modal = document.getElementById('accountModal');
    const closeBtn = document.getElementById('closeModal');
    const accountItems = document.querySelectorAll('.account-item');
    
    accountItems.forEach(item => {
        item.addEventListener('click', () => {
            const accountId = item.dataset.account;
            openAccountModal(accountId);
        });
    });
    
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function openAccountModal(accountId) {
    const modal = document.getElementById('accountModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const account = accountsData[accountId];
    
    if (!account) return;
    
    modalTitle.textContent = account.name;
    
    // Build modal content
    let content = `
        <div class="account-detail">
            <div class="detail-hero">
                <div class="detail-icon" style="background: ${account.gradient};">
                    ${getAccountIcon(account.type)}
                </div>
                <div class="detail-balance ${account.balance < 0 ? 'negative' : 'positive'}">
                    ${formatCurrency(account.balance)}
                </div>
                <div class="detail-account-name">${account.name}</div>
            </div>
            
            <div class="detail-stats">
                <div class="stat-card">
                    <div class="stat-label">Account Number</div>
                    <div class="stat-value">${account.accountNumber}</div>
                </div>
    `;
    
    if (account.routing) {
        content += `
            <div class="stat-card">
                <div class="stat-label">Routing Number</div>
                <div class="stat-value">${account.routing}</div>
            </div>
        `;
    }
    
    if (account.interestRate) {
        content += `
            <div class="stat-card">
                <div class="stat-label">Interest Rate</div>
                <div class="stat-value">${account.interestRate}</div>
            </div>
        `;
    }
    
    if (account.creditLimit) {
        content += `
            <div class="stat-card">
                <div class="stat-label">Credit Limit</div>
                <div class="stat-value">${formatCurrency(account.creditLimit)}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Available Credit</div>
                <div class="stat-value">${formatCurrency(account.availableCredit)}</div>
            </div>
        `;
    }
    
    content += `</div>`;
    
    // Add recent transactions
    if (account.transactions && account.transactions.length > 0) {
        content += `
            <div class="stat-card">
                <div class="stat-label" style="margin-bottom: 12px;">Recent Transactions</div>
                <div style="display: flex; flex-direction: column; gap: 12px;">
        `;
        
        account.transactions.forEach(transaction => {
            content += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div>
                        <div style="font-size: 14px; font-weight: 600; margin-bottom: 2px;">${transaction.description}</div>
                        <div style="font-size: 12px; color: rgba(255,255,255,0.5);">${transaction.date}</div>
                    </div>
                    <div style="font-size: 16px; font-weight: 700; color: ${transaction.amount > 0 ? 'var(--positive)' : 'white'};">
                        ${formatCurrency(transaction.amount)}
                    </div>
                </div>
            `;
        });
        
        content += `
                </div>
            </div>
        `;
    }
    
    content += `
            <div class="detail-actions">
                <button class="action-btn primary">Transfer</button>
                <button class="action-btn secondary">View All</button>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('accountModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== Category Tabs ====================
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            tab.classList.add('active');
            
            // Scroll to relevant section
            const category = tab.dataset.category;
            const section = document.querySelector(`.category-header[data-category="${category}"]`);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Expand if collapsed
                if (section.classList.contains('collapsed')) {
                    section.click();
                }
            }
        });
    });
}

// ==================== Navigation ====================
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            
            if (page) {
                // Remove active from all items
                navItems.forEach(i => i.classList.remove('active'));
                
                // Add active to clicked item
                item.classList.add('active');
                
                // Show notification (in real app, would navigate to different page)
                console.log(`Navigating to: ${page}`);
            }
        });
    });
}

// ==================== Add Account ====================
function setupAddButton() {
    const addBtn = document.getElementById('addBtn');
    
    addBtn.addEventListener('click', () => {
        // In a real app, this would open an "Add Account" modal
        alert('Add new account feature - Coming soon!');
    });
}

// ==================== Helper Functions ====================
function formatCurrency(amount) {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(absAmount);
    
    return amount < 0 ? `-${formatted}` : formatted;
}

function getAccountIcon(type) {
    switch(type) {
        case 'checking':
        case 'savings':
            return `
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                    <path d="M12 8V16M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `;
        case 'credit':
            return `
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="7" width="18" height="12" rx="2" stroke="white" stroke-width="2"/>
                    <path d="M3 11H21" stroke="white" stroke-width="2"/>
                </svg>
            `;
        case 'payment':
            return `
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M6 4L12 20L18 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        default:
            return '';
    }
}

// ==================== Initialize ====================
function init() {
    // Initialize chart
    initChart();
    
    // Setup interactive elements
    setupCategoryToggles();
    setupAccountModal();
    setupCategoryTabs();
    setupNavigation();
    setupAddButton();
    
    // Re-render chart on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initChart();
        }, 250);
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== Additional Interactive Features ====================

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll('.account-item, .tab, .nav-item, .icon-btn').forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Pull to refresh simulation
let startY = 0;
let currentY = 0;
let isPulling = false;

document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].pageY;
    isPulling = window.scrollY === 0;
});

document.addEventListener('touchmove', (e) => {
    if (!isPulling) return;
    currentY = e.touches[0].pageY;
});

document.addEventListener('touchend', () => {
    if (isPulling && currentY - startY > 80) {
        // Simulate refresh
        console.log('Refreshing data...');
        // In real app, would fetch new data
    }
    isPulling = false;
});
