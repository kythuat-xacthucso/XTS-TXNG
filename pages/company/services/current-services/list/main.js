document.addEventListener('DOMContentLoaded', function() {
    console.log('Customer Service Information page loaded');
    initializeServiceInfo();
});

function initializeServiceInfo() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize progress bar animations
    initializeProgressAnimations();
    
    // Initialize tab functionality
    initializeTabFunctionality();
    
    // Initialize responsive handlers
    initializeResponsiveHandlers();
}

function initializeTooltips() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function initializeProgressAnimations() {
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function initializeTabFunctionality() {
    // Add custom tab switching logic if needed
    const tabButtons = document.querySelectorAll('#statsTab button[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function (event) {
            const targetTab = event.target.getAttribute('data-bs-target');
            console.log('Switched to tab:', targetTab);
            
            // Trigger animations for the active tab
            if (targetTab === '#parameters') {
                initializeProgressAnimations();
            }
        });
    });
}

function initializeResponsiveHandlers() {
    // Handle responsive changes
    window.addEventListener('resize', function() {
        // Reinitialize tooltips on resize
        setTimeout(initializeTooltips, 100);
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function updateServiceStats() {
    // Simulate real-time service updates
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width);
        const change = Math.floor(Math.random() * 3) - 1; // Random change between -1 and +1
        const newWidth = Math.max(0, Math.min(100, currentWidth + change));
        
        bar.style.width = newWidth + '%';
        bar.setAttribute('aria-valuenow', newWidth);
        
        // Update color based on usage
        bar.className = bar.className.replace(/bg-(success|warning|danger)/, '');
        if (newWidth < 30) {
            bar.classList.add('bg-success');
        } else if (newWidth < 70) {
            bar.classList.add('bg-warning');
        } else {
            bar.classList.add('bg-danger');
        }
        
        // Update tooltip
        const tooltip = bootstrap.Tooltip.getInstance(bar);
        if (tooltip) {
            tooltip.setContent({ '.tooltip-inner': `${newWidth}% đã sử dụng` });
        }
    });
}

// Auto-update service stats every 60 seconds (for demo)
setInterval(updateServiceStats, 60000);

// Export functions for external use
window.serviceInfo = {
    updateServiceStats
};