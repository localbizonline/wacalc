// State management
let state = {
    messageType: 'marketing',
    rate: 0.04,
    quantity: 25000,
    platformFeeRate: 0.0015,
    metaAdminFeeRate: 0.10, // META admin fee: 10% of message cost
    botQuantity: 10000,
    managementFee: 0,
    managementPackage: 'None',
    setupFee: 0,
    setupPackage: 'None',
    ownMetaAccount: false, // If true, message costs excluded from total
    exchangeRate: 18 // USD to ZAR
};

// DOM Elements
const toggleButtons = document.querySelectorAll('.toggle-btn');
const quantitySlider = document.getElementById('quantitySlider');
const quantityInput = document.getElementById('quantityInput');
const quantityDisplay = document.getElementById('quantityDisplay');
const selectedType = document.getElementById('selectedType');
const selectedRate = document.getElementById('selectedRate');
const selectedQuantity = document.getElementById('selectedQuantity');
const messageCost = document.getElementById('messageCost');
const metaAdminFeeBreakdown = document.getElementById('metaAdminFeeBreakdown');
const metaAdminFeeRow = document.getElementById('metaAdminFeeRow');
const platformFeeDisplay = document.getElementById('platformFeeDisplay');
const platformFeeBreakdown = document.getElementById('platformFeeBreakdown');
const section1Subtotal = document.getElementById('section1Subtotal');
const ownMetaAccountCheckbox = document.getElementById('ownMetaAccountCheckbox');

// Section 2 Elements
const botQuantitySlider = document.getElementById('botQuantitySlider');
const botQuantityInput = document.getElementById('botQuantityInput');
const botQuantityDisplay = document.getElementById('botQuantityDisplay');
const botPlatformFeeDisplay = document.getElementById('botPlatformFeeDisplay');
const botPlatformFeeBreakdown = document.getElementById('botPlatformFeeBreakdown');
const botSelectedQuantity = document.getElementById('botSelectedQuantity');
const section2Subtotal = document.getElementById('section2Subtotal');

// Section 3 Elements
const managementPackageSelect = document.getElementById('managementPackageSelect');
const managementFeeDisplay = document.getElementById('managementFeeDisplay');
const managementFeeBreakdown = document.getElementById('managementFeeBreakdown');
const managementPackageName = document.getElementById('managementPackageName');
const selectedPackage = document.getElementById('selectedPackage');
const section3Subtotal = document.getElementById('section3Subtotal');

// Section 4 Elements
const setupPackageSelect = document.getElementById('setupPackageSelect');
const setupFeeDisplay = document.getElementById('setupFeeDisplay');
const setupFeeBreakdown = document.getElementById('setupFeeBreakdown');
const setupPackageName = document.getElementById('setupPackageName');
const selectedSetupPackage = document.getElementById('selectedSetupPackage');
const section4Subtotal = document.getElementById('section4Subtotal');

const formula = document.getElementById('formula');
const totalPrice = document.getElementById('totalPrice');
const totalPriceZAR = document.getElementById('totalPriceZAR');
const resetBtn = document.getElementById('resetBtn');

// Helper function to format numbers
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// Helper function to format currency
function formatCurrency(amount, currency = 'USD') {
    const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return currency === 'USD' ? '$' + formatted : 'R' + formatted;
}

// Update slider background gradient
function updateSliderBackground() {
    const percentage = (state.quantity / 100000) * 100;
    quantitySlider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--border-color) ${percentage}%, var(--border-color) 100%)`;
}

function updateBotSliderBackground() {
    const percentage = (state.botQuantity / 100000) * 100;
    botQuantitySlider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--border-color) ${percentage}%, var(--border-color) 100%)`;
}

// Calculate and update display
function updateCalculation() {
    // Section 1 calculations
    const messagesCost = state.rate * state.quantity;
    const metaAdminFee = messagesCost * state.metaAdminFeeRate; // 10% of message cost
    const platformFee = state.platformFeeRate * state.quantity;
    
    // If using own META account, exclude message cost and admin fee from total
    const section1Total = state.ownMetaAccount ? platformFee : (messagesCost + metaAdminFee + platformFee);
    
    // Section 2 calculations
    const botPlatformFee = state.platformFeeRate * state.botQuantity;
    const section2Total = botPlatformFee;
    
    // Section 3 calculations
    const section3Total = state.managementFee;
    
    // Section 4 calculations
    const section4Total = state.setupFee;
    
    // Grand total
    const grandTotal = section1Total + section2Total + section3Total + section4Total;
    
    // Update Section 1 displays
    quantityDisplay.textContent = formatNumber(state.quantity);
    quantityInput.value = state.quantity;
    selectedType.textContent = state.messageType.charAt(0).toUpperCase() + state.messageType.slice(1);
    selectedRate.textContent = formatCurrency(state.rate);
    selectedQuantity.textContent = formatNumber(state.quantity);
    messageCost.textContent = formatCurrency(messagesCost);
    
    // Show/hide META admin fee based on own account checkbox
    if (state.ownMetaAccount) {
        metaAdminFeeRow.style.display = 'none';
    } else {
        metaAdminFeeRow.style.display = 'flex';
        metaAdminFeeBreakdown.textContent = formatCurrency(metaAdminFee);
    }
    
    platformFeeDisplay.textContent = formatCurrency(platformFee);
    platformFeeBreakdown.textContent = formatCurrency(platformFee);
    section1Subtotal.textContent = formatCurrency(section1Total);
    
    // Update Section 2 displays
    botQuantityDisplay.textContent = formatNumber(state.botQuantity);
    botQuantityInput.value = state.botQuantity;
    botPlatformFeeDisplay.textContent = formatCurrency(botPlatformFee);
    botPlatformFeeBreakdown.textContent = formatCurrency(botPlatformFee);
    botSelectedQuantity.textContent = formatNumber(state.botQuantity);
    section2Subtotal.textContent = formatCurrency(section2Total);
    
    // Update Section 3 displays
    managementFeeDisplay.textContent = formatCurrency(state.managementFee);
    managementFeeBreakdown.textContent = formatCurrency(state.managementFee);
    selectedPackage.textContent = state.managementPackage;
    section3Subtotal.textContent = formatCurrency(section3Total);
    
    // Update Section 4 displays
    setupFeeDisplay.textContent = formatCurrency(state.setupFee);
    setupFeeBreakdown.textContent = formatCurrency(state.setupFee);
    selectedSetupPackage.textContent = state.setupPackage;
    section4Subtotal.textContent = formatCurrency(section4Total);
    
    // Update formula
    formula.textContent = `${formatCurrency(section1Total)} + ${formatCurrency(section2Total)} + ${formatCurrency(section3Total)} + ${formatCurrency(section4Total)}`;
    
    // Calculate ZAR amount
    const grandTotalZAR = grandTotal * state.exchangeRate;
    
    // Update total with animation
    totalPrice.classList.add('pulse');
    totalPrice.textContent = formatCurrency(grandTotal);
    totalPriceZAR.textContent = formatCurrency(grandTotalZAR, 'ZAR');
    
    setTimeout(() => {
        totalPrice.classList.remove('pulse');
    }, 500);
    
    // Update slider backgrounds
    updateSliderBackground();
    updateBotSliderBackground();
}

// Event Listeners

// Toggle buttons for message type
toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update state
        state.messageType = this.dataset.type;
        state.rate = parseFloat(this.dataset.rate);
        
        // Update calculation
        updateCalculation();
    });
});

// Quantity slider
quantitySlider.addEventListener('input', function() {
    state.quantity = parseInt(this.value);
    updateCalculation();
});

// Quantity input field
quantityInput.addEventListener('input', function() {
    let value = parseInt(this.value) || 0;
    
    // Validate and constrain the value
    if (value < 0) value = 0;
    if (value > 100000) value = 100000;
    
    // Update state and slider
    state.quantity = value;
    quantitySlider.value = value;
    
    updateCalculation();
});

// Also handle blur event to ensure valid value when user leaves the field
quantityInput.addEventListener('blur', function() {
    if (this.value === '' || parseInt(this.value) < 0) {
        this.value = 0;
        state.quantity = 0;
        quantitySlider.value = 0;
        updateCalculation();
    }
});

// Section 2: Bot quantity slider
botQuantitySlider.addEventListener('input', function() {
    state.botQuantity = parseInt(this.value);
    updateCalculation();
});

// Section 2: Bot quantity input field
botQuantityInput.addEventListener('input', function() {
    let value = parseInt(this.value) || 0;
    
    // Validate and constrain the value
    if (value < 0) value = 0;
    if (value > 100000) value = 100000;
    
    // Update state and slider
    state.botQuantity = value;
    botQuantitySlider.value = value;
    
    updateCalculation();
});

// Section 2: Handle blur event
botQuantityInput.addEventListener('blur', function() {
    if (this.value === '' || parseInt(this.value) < 0) {
        this.value = 0;
        state.botQuantity = 0;
        botQuantitySlider.value = 0;
        updateCalculation();
    }
});

// Section 1: Own META Account checkbox
ownMetaAccountCheckbox.addEventListener('change', function() {
    state.ownMetaAccount = this.checked;
    updateCalculation();
});

// Section 3: Management package dropdown
managementPackageSelect.addEventListener('change', function() {
    const selectedValue = parseFloat(this.value);
    state.managementFee = selectedValue;
    
    // Update package name
    if (selectedValue === 0) {
        state.managementPackage = 'None';
        managementPackageName.textContent = 'None selected';
    } else if (selectedValue === 90) {
        state.managementPackage = 'WhatsApp API Only';
        managementPackageName.textContent = '$90/month';
    } else if (selectedValue === 170) {
        state.managementPackage = 'Reachmax Platform';
        managementPackageName.textContent = '$170/month';
    }
    
    updateCalculation();
});

// Section 4: Setup package dropdown
setupPackageSelect.addEventListener('change', function() {
    const selectedValue = parseFloat(this.value);
    state.setupFee = selectedValue;
    
    // Update package name
    if (selectedValue === 0) {
        state.setupPackage = 'None';
        setupPackageName.textContent = 'None selected';
    } else if (selectedValue === 145) {
        state.setupPackage = 'Basic Setup';
        setupPackageName.textContent = '$145 once-off';
    } else if (selectedValue === 285) {
        state.setupPackage = 'Full Onboarding';
        setupPackageName.textContent = '$285 once-off';
    }
    
    updateCalculation();
});

// Reset button
resetBtn.addEventListener('click', function() {
    // Reset to default values
    state = {
        messageType: 'marketing',
        rate: 0.04,
        quantity: 0,
        platformFeeRate: 0.0015,
        metaAdminFeeRate: 0.10,
        botQuantity: 0,
        managementFee: 0,
        managementPackage: 'None',
        setupFee: 0,
        setupPackage: 'None',
        ownMetaAccount: false,
        exchangeRate: 18
    };
    
    // Reset UI
    toggleButtons.forEach(btn => {
        if (btn.dataset.type === 'marketing') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    quantitySlider.value = 0;
    quantityInput.value = 0;
    botQuantitySlider.value = 0;
    botQuantityInput.value = 0;
    managementPackageSelect.value = '0';
    managementPackageName.textContent = 'None selected';
    setupPackageSelect.value = '0';
    setupPackageName.textContent = 'None selected';
    ownMetaAccountCheckbox.checked = false;
    
    // Update display with a slight animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
    
    updateCalculation();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCalculation();
});

// Add smooth scrolling behavior when calculator loads
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

