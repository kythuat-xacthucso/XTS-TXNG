function init() {
    // Initialize any specific logic for the service packages list page
    console.log('Service packages list page initialized');
}

function filterPackages() {
    const name = document.getElementById('filter-name')?.value || document.getElementById('filter-name-mobile').value;
    const price = document.getElementById('filter-price')?.value || document.getElementById('filter-price-mobile').value;
    const duration = document.getElementById('filter-duration')?.value || document.getElementById('filter-duration-mobile').value;
    const status = document.getElementById('filter-status')?.value || document.getElementById('filter-status-mobile').value;

    console.log('Filtering with:', { name, price, duration, status });
    // Add filter logic here (e.g., filter table rows or cards based on input values)
}

function resetFilter() {
    const form = document.getElementById('filter-form') || document.getElementById('filter-form-mobile');
    form.reset();
    filterPackages();
}

// Call init when the page is loaded
document.addEventListener('DOMContentLoaded', init);