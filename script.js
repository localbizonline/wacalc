// State management
let state = {
    messageType: 'marketing',
    rate: 0.04,
    quantity: 25000
};

// DOM Elements
const toggleButtons = document.querySelectorAll('.toggle-btn');
const quantitySlider = document.getElementById('quantitySlider');
const quantityInput = document.getElementById('quantityInput');
const quantityDisplay = document.getElementById('quantityDisplay');
const selectedType = document.getElementById('selectedType');
const selectedRate = document.getElementById('selectedRate');
const selectedQuantity = document.getElementById('selectedQuantity');
const formula = document.getElementById('formula');
const totalPrice = document.getElementById('totalPrice');
const resetBtn = document.getElementById('resetBtn');

// Helper function to format numbers
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// Helper function to format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Update slider background gradient
function updateSliderBackground() {
    const percentage = (state.quantity / 100000) * 100;
    quantitySlider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--border-color) ${percentage}%, var(--border-color) 100%)`;
}

// Calculate and update display
function updateCalculation() {
    const total = state.rate * state.quantity;
    
    // Update displays
    quantityDisplay.textContent = formatNumber(state.quantity);
    quantityInput.value = state.quantity;
    selectedType.textContent = state.messageType.charAt(0).toUpperCase() + state.messageType.slice(1);
    selectedRate.textContent = formatCurrency(state.rate);
    selectedQuantity.textContent = formatNumber(state.quantity);
    formula.textContent = `${formatCurrency(state.rate)} × ${formatNumber(state.quantity)} messages`;
    
    // Update total with animation
    totalPrice.classList.add('pulse');
    totalPrice.textContent = formatCurrency(total);
    
    setTimeout(() => {
        totalPrice.classList.remove('pulse');
    }, 500);
    
    // Update slider background
    updateSliderBackground();
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

// Reset button
resetBtn.addEventListener('click', function() {
    // Reset to default values
    state = {
        messageType: 'marketing',
        rate: 0.04,
        quantity: 25000
    };
    
    // Reset UI
    toggleButtons.forEach(btn => {
        if (btn.dataset.type === 'marketing') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    quantitySlider.value = 25000;
    quantityInput.value = 25000;
    
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

