// Overview page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Overview page loaded');
    
    // Initialize overview page functionality
    initializeOverview();
});

function initializeOverview() {
    // Add click handlers for stats cards
    const statsCards = document.querySelectorAll('.stats-card');
    statsCards.forEach(card => {
        card.addEventListener('click', function() {
            const label = this.querySelector('.stats-label').textContent;
            showNotification(`Clicked on: ${label}`, 'info');
        });
    });
    
    // Simulate real-time data updates
    startDataUpdates();
}

function startDataUpdates() {
    // Update stats every 30 seconds (for demo purposes)
    setInterval(() => {
        updateStatsNumbers();
    }, 30000);
}

function updateStatsNumbers() {
    const statsNumbers = document.querySelectorAll('.stats-number');
    
    statsNumbers.forEach(numberElement => {
        const currentValue = parseInt(numberElement.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 10) - 5; // Random change between -5 and +5
        const newValue = Math.max(0, currentValue + change);
        
        // Animate number change
        animateNumber(numberElement, currentValue, newValue);
    });
}

function animateNumber(element, start, end) {
    const duration = 1000; // 1 second
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Export functions for external use
window.overviewPage = {
    initializeOverview,
    updateStatsNumbers
};