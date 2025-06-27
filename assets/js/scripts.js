document.addEventListener('DOMContentLoaded', function () {
    // --- Single Page Application Navigation ---
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-logo, .nav-link-mobile, a[href^="#"]');
    const pages = document.querySelectorAll('.page');

    function navigateTo(hash) {
        // FIX: If hash is empty or just '#', default to '#home'.
        if (!hash || hash === '#') {
            hash = '#home';
        }

        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));

        // Show the target page
        const targetPage = document.querySelector(hash);
        if (targetPage && targetPage.classList.contains('page')) {
            targetPage.classList.add('active');
        } else {
            document.querySelector('#home').classList.add('active');
        }

        // Update active state on nav links
        document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });

        // Close mobile menu after navigation
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    document.body.addEventListener('click', function (e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const hash = anchor.getAttribute('href');
            // FIX: Check if the hash is a valid selector (not just '#') before using it.
            if (hash && hash.length > 1 && document.querySelector(hash)) {
                history.pushState(null, null, hash);
                navigateTo(hash);
            } else if (hash === '#') {
                // Do nothing for placeholder links
            }
        }
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', function () {
        navigateTo(location.hash);
    });

    // Initial load
    navigateTo(location.hash);

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Industry Solutions Tabs on Home page ---
    const tabButtonsContainer = document.getElementById('tab-buttons');
    const tabContentsContainer = document.getElementById('tab-contents-home');
    if (tabButtonsContainer && tabContentsContainer) {
        const tabButtons = tabButtonsContainer.querySelectorAll('.tab-button');

        tabButtonsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('tab-button')) {
                const tabId = e.target.dataset.tab;

                // Update buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                // Update contents
                tabContentsContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                document.getElementById(tabId + '-home').classList.add('active');
            }
        });
    }

    // --- FAQ Accordion ---
    const accordionContainer = document.getElementById('faq-accordion');
    if (accordionContainer) {
        accordionContainer.addEventListener('click', function (e) {
            const button = e.target.closest('.accordion-button');
            if (button) {
                const content = button.nextElementSibling;
                const icon = button.querySelector('svg');

                button.classList.toggle('text-blue-600');
                icon.classList.toggle('rotate-180');

                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    }


    // --- Add styling to tab buttons ---
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.add('px-4', 'py-2', 'font-semibold', 'rounded-full', 'border-2', 'border-transparent', 'transition-all', 'duration-300', 'cursor-pointer', 'text-sm', 'md:text-base');
    });

    // --- Flash Banner Logic ---
    const flashBanner = document.getElementById('flash-banner');
    const closeFlashBannerBtn = document.getElementById('close-flash-banner');
    const flashBannerSlides = document.querySelectorAll('.flash-banner-slide');
    let currentSlide = 0;
    let bannerInterval;

    function showSlide(index) {
        flashBannerSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % flashBannerSlides.length;
        showSlide(currentSlide);
    }

    if (flashBanner && flashBannerSlides.length > 0) {
        // Check sessionStorage to see if banner was closed
        if (sessionStorage.getItem('flashBannerClosed') === 'true') {
            flashBanner.style.display = 'none';
        } else {
            bannerInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
    }

    if (closeFlashBannerBtn) {
        closeFlashBannerBtn.addEventListener('click', () => {
            clearInterval(bannerInterval);
            flashBanner.style.display = 'none';
            // Remember the choice for the current session
            sessionStorage.setItem('flashBannerClosed', 'true');
        });
    }
});