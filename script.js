// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
const consultationForm = document.getElementById('consultation-form');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const testimonials = document.querySelectorAll('.testimonial');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking on a nav link (mobile)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    const topBarHeight = topBar ? topBar.offsetHeight : 0;

    if (window.scrollY > topBarHeight) {
        header.classList.add('scrolled');
        if (topBar) {
            topBar.style.transform = `translateY(-${topBarHeight}px)`;
        }
    } else {
        header.classList.remove('scrolled');
        if (topBar) {
            topBar.style.transform = 'translateY(0)';
        }
    }

    // Trigger animations when elements come into view
    checkAnimations();
});

// Animation on scroll
function checkAnimations() {
    const triggerBottom = window.innerHeight * 0.8;

    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
}

// Run check animations on page load
window.addEventListener('load', () => {
    // Slight delay to ensure elements have loaded
    setTimeout(checkAnimations, 100);
});

// Testimonial Slider
let currentTestimonial = 0;
const totalTestimonials = testimonials.length;

// Hide all testimonials except the first one
function initTestimonials() {
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
}

// Show next testimonial
function nextTestimonial() {
    testimonials[currentTestimonial].style.display = 'none';
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    testimonials[currentTestimonial].style.display = 'flex';
    testimonials[currentTestimonial].classList.add('active');
}

// Show previous testimonial
function prevTestimonial() {
    testimonials[currentTestimonial].style.display = 'none';
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    testimonials[currentTestimonial].style.display = 'flex';
    testimonials[currentTestimonial].classList.add('active');
}

// Add click event listeners to testimonial controls
nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-rotate testimonials every 5 seconds
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-rotation when hovering on testimonials
document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

// Resume auto-rotation when mouse leaves testimonials
document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Form submission
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(consultationForm);
    const formValues = Object.fromEntries(formData.entries());

    // You would typically send this data to your server here
    // For demonstration, we'll just show a success message

    // Clear form
    consultationForm.reset();

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Thank you for your request!</h3>
        <p>We'll contact you within 24 hours to schedule your consultation.</p>
    `;

    // Replace form with success message
    consultationForm.parentNode.replaceChild(successMessage, consultationForm);

    // Style success message
    document.querySelector('.success-message').style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 8px;
        text-align: center;
        color: #4a4a4a;
        animation: fadeIn 0.5s ease;
    `;

    document.querySelector('.success-message i').style.cssText = `
        font-size: 4rem;
        color: #0056b3;
        margin-bottom: 20px;
    `;

    // Add this animation to stylesheet
    if (!document.querySelector('#success-animation')) {
        const style = document.createElement('style');
        style.id = 'success-animation';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize testimonials
initTestimonials();

// Background Video Handling
const backgroundVideo = document.getElementById('background-video');

// Function to handle video loading
function handleVideoLoading() {
    if (backgroundVideo) {
        // Check if device is mobile (smaller screens may want to disable video)
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // On mobile, use a static image instead to save bandwidth
            backgroundVideo.parentElement.style.backgroundImage = "url('images/world-map-bg.jpg')";
            backgroundVideo.parentElement.style.backgroundSize = "cover";
            backgroundVideo.parentElement.style.backgroundPosition = "center";
            backgroundVideo.style.display = "none";
        } else {
            // On desktop, play video with better performance
            backgroundVideo.play().catch(err => {
                // Fallback to image if video can't autoplay
                backgroundVideo.parentElement.style.backgroundImage = "url('images/world-map-bg.jpg')";
                backgroundVideo.style.display = "none";
            });
        }
    }
}

// Initialize video
window.addEventListener('load', handleVideoLoading);

// Handle resize events (if someone rotates their device, etc.)
window.addEventListener('resize', handleVideoLoading);

// Visa Calculator Functionality
document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('visa-quiz-form');
    const calculatorSteps = document.querySelectorAll('.calculator-step');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const resultsSection = document.getElementById('calculator-results');
    const resultsContent = document.getElementById('results-content');

    // Initialize calculator
    function initCalculator() {
        // Show first step
        calculatorSteps[0].classList.add('active');
        stepIndicators[0].classList.add('active');

        // Add event listeners for navigation
        document.querySelectorAll('.btn-next').forEach(button => {
            button.addEventListener('click', handleNextStep);
        });

        document.querySelectorAll('.btn-prev').forEach(button => {
            button.addEventListener('click', handlePrevStep);
        });

        // Add form submission handler
        calculatorForm.addEventListener('submit', handleFormSubmit);
    }

    // Handle next step navigation
    function handleNextStep(e) {
        e.preventDefault();
        const currentStep = e.target.closest('.calculator-step');
        const currentIndex = Array.from(calculatorSteps).indexOf(currentStep);

        if (currentIndex < calculatorSteps.length - 1) {
            // Validate current step
            if (validateStep(currentStep)) {
                // Update step indicators
                stepIndicators[currentIndex].classList.remove('active');
                stepIndicators[currentIndex].classList.add('completed');
                stepIndicators[currentIndex + 1].classList.add('active');

                // Show next step
                currentStep.classList.remove('active');
                calculatorSteps[currentIndex + 1].classList.add('active');

                // Scroll to top of calculator
                currentStep.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Handle previous step navigation
    function handlePrevStep(e) {
        e.preventDefault();
        const currentStep = e.target.closest('.calculator-step');
        const currentIndex = Array.from(calculatorSteps).indexOf(currentStep);

        if (currentIndex > 0) {
            // Update step indicators
            stepIndicators[currentIndex].classList.remove('active');
            stepIndicators[currentIndex - 1].classList.remove('completed');
            stepIndicators[currentIndex - 1].classList.add('active');

            // Show previous step
            currentStep.classList.remove('active');
            calculatorSteps[currentIndex - 1].classList.add('active');

            // Scroll to top of calculator
            currentStep.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Validate step inputs
    function validateStep(step) {
        let isValid = true;
        const requiredInputs = step.querySelectorAll('input[required], select[required]');
        const optionCards = step.querySelectorAll('.option-card');

        // Remove previous error states
        step.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Check required inputs
        requiredInputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.closest('.form-group')?.classList.add('error');
            }
        });

        // Check radio inputs
        const radioGroups = step.querySelectorAll('input[type="radio"]');
        if (radioGroups.length > 0) {
            const radioGroup = Array.from(radioGroups).filter(radio => radio.required);
            if (radioGroup.length > 0 && !radioGroup.some(radio => radio.checked)) {
                isValid = false;
                radioGroup.forEach(radio => {
                    radio.closest('.option-card')?.classList.add('error');
                });
            }
        }

        return isValid;
    }

    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();

        // Validate all steps
        let isValid = true;
        calculatorSteps.forEach(step => {
            if (!validateStep(step)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Calculate visa options
            const formData = new FormData(calculatorForm);
            const results = calculateVisaOptions(formData);

            // Display results
            displayResults(results);

            // Show results section
            calculatorForm.style.display = 'none';
            resultsSection.classList.add('active');

            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Calculate visa options based on form data
    function calculateVisaOptions(formData) {
        const purpose = formData.get('purpose');
        const country = formData.get('country');
        const education = formData.get('education');
        const experience = formData.get('experience');
        const age = formData.get('age');
        const language = formData.get('language');

        // Define visa options based on country and purpose
        const visaOptions = {
            canada: {
                work: [
                    {
                        name: 'Express Entry',
                        score: calculateScore(education, experience, age, language),
                        requirements: [
                            'Minimum 1 year of skilled work experience',
                            'Language proficiency in English or French',
                            'Education assessment (ECA)',
                            'Proof of funds'
                        ]
                    },
                    {
                        name: 'Provincial Nominee Program',
                        score: calculateScore(education, experience, age, language) * 0.9,
                        requirements: [
                            'Job offer from a Canadian province',
                            'Work experience in the province',
                            'Language proficiency',
                            'Education requirements'
                        ]
                    }
                ],
                study: [
                    {
                        name: 'Study Permit',
                        score: 85,
                        requirements: [
                            'Letter of acceptance from a DLI',
                            'Proof of financial support',
                            'No criminal record',
                            'Medical examination'
                        ]
                    }
                ]
            },
            usa: {
                work: [
                    {
                        name: 'H-1B Visa',
                        score: calculateScore(education, experience, age, language),
                        requirements: [
                            'Bachelor\'s degree or higher',
                            'Job offer from US employer',
                            'Specialized knowledge',
                            'Prevailing wage requirement'
                        ]
                    }
                ],
                study: [
                    {
                        name: 'F-1 Student Visa',
                        score: 90,
                        requirements: [
                            'SEVIS registration',
                            'Financial documentation',
                            'Academic preparation',
                            'Intent to return home'
                        ]
                    }
                ]
            }
        };

        // Get relevant visa options
        let options = visaOptions[country]?.[purpose] || [];

        // Sort options by score
        options.sort((a, b) => b.score - a.score);

        return options;
    }

    // Calculate score based on profile
    function calculateScore(education, experience, age, language) {
        let score = 0;

        // Education score
        switch (education) {
            case 'phd':
                score += 30;
                break;
            case 'masters':
                score += 25;
                break;
            case 'bachelors':
                score += 20;
                break;
            case 'high-school':
                score += 10;
                break;
        }

        // Experience score
        switch (experience) {
            case '10+':
                score += 25;
                break;
            case '5-10':
                score += 20;
                break;
            case '3-5':
                score += 15;
                break;
            case '1-3':
                score += 10;
                break;
            case '0':
                score += 5;
                break;
        }

        // Age score
        switch (age) {
            case '18-25':
                score += 20;
                break;
            case '26-35':
                score += 25;
                break;
            case '36-45':
                score += 20;
                break;
            case '46-55':
                score += 15;
                break;
            case '56+':
                score += 10;
                break;
        }

        // Language score
        switch (language) {
            case 'native':
                score += 25;
                break;
            case 'advanced':
                score += 20;
                break;
            case 'intermediate':
                score += 15;
                break;
            case 'basic':
                score += 10;
                break;
        }

        // Ensure score is between 0 and 100
        return Math.min(Math.max(score, 0), 100);
    }

    // Display results
    function displayResults(results) {
        resultsContent.innerHTML = '';

        if (results.length === 0) {
            resultsContent.innerHTML = `
                <div class="no-results">
                    <p>No suitable visa options found for your profile. Please contact us for a detailed assessment.</p>
                </div>
            `;
            return;
        }

        results.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'visa-option';
            optionElement.innerHTML = `
                <h4>${option.name}</h4>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${option.score}%"></div>
                </div>
                <div class="visa-requirements">
                    <h5>Requirements:</h5>
                    <ul>
                        ${option.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
            `;
            resultsContent.appendChild(optionElement);
        });
    }

    // Initialize calculator
    initCalculator();
});

// World Map Functionality
// Note: This requires the jVectorMap library
// You would need to include this in your HTML:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.5/jquery-jvectormap-2.0.5.css">
// <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.5/jquery-jvectormap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.5/jquery-jvectormap-world-mill.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    // Initialize World Map
    if (document.getElementById('world-map-container') && typeof $.fn.vectorMap !== 'undefined') {
        initWorldMap();
    }

    // Destination cards
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', () => {
            const country = card.getAttribute('data-country');
            showCountryInfo(country);
        });
    });
});

// World Map Initialization
function initWorldMap() {
    $('#world-map-container').vectorMap({
        map: 'world_mill',
        backgroundColor: '#f8f9fa',
        zoomOnScroll: true,
        regionStyle: {
            initial: {
                fill: '#e4e4e4',
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            },
            hover: {
                "fill-opacity": 0.8,
                cursor: 'pointer'
            },
            selected: {
                fill: '#2938bc'
            },
            selectedHover: {}
        },
        series: {
            regions: [{
                values: getVisaDifficulty(),
                scale: ['#4CAF50', '#FFC107', '#F44336'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionTipShow: function(e, el, code) {
            const countryInfo = getCountryInfo(code);
            el.html(el.html() + getCountryTooltipHTML(countryInfo));
        },
        onRegionClick: function(e, code) {
            showCountryInfo(code);
        }
    });

    // Country search functionality
    const searchInput = document.getElementById('country-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const mapObject = $('#world-map-container').vectorMap('get', 'mapObject');

            for (const code in mapObject.regions) {
                const countryName = mapObject.mapData.paths[code].name.toLowerCase();
                if (countryName.includes(searchTerm)) {
                    mapObject.regions[code].element.setStyle('fill', '#0056b3');
                } else {
                    mapObject.regions[code].element.setStyle('fill', null);
                }
            }
        });
    }

    // Filter by visa type
    const filterSelect = document.getElementById('map-filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const selectedFilter = this.value;
            const mapObject = $('#world-map-container').vectorMap('get', 'mapObject');

            mapObject.series.regions[0].setValues(getVisaDifficulty(selectedFilter));
        });
    }
}

// Get visa difficulty data
function getVisaDifficulty(visaType = 'all') {
    // This would typically come from your database
    // This is sample data
    const difficulties = {
        all: {
            'ca': 1, 'au': 1, 'nz': 1, 'sg': 1.5, 'us': 2, 'gb': 1.5, 'de': 1.5, 'fr': 2,
            'es': 2, 'it': 2, 'jp': 2.5, 'kr': 2.5, 'ae': 1.5, 'qa': 1.5, 'sa': 2,
            'ru': 3, 'cn': 3, 'in': 2.5, 'br': 2, 'mx': 2, 'za': 2, 'eg': 2.5
        },
        work: {
            'ca': 1, 'au': 1.5, 'nz': 1.5, 'sg': 1, 'us': 2.5, 'gb': 2, 'de': 1.5, 'fr': 2,
            'es': 2, 'it': 2, 'jp': 3, 'kr': 2.5, 'ae': 1, 'qa': 1, 'sa': 1.5,
            'ru': 3, 'cn': 3, 'in': 2.5, 'br': 2.5, 'mx': 2, 'za': 2, 'eg': 3
        },
        study: {
            'ca': 1, 'au': 1, 'nz': 1, 'sg': 1.5, 'us': 2, 'gb': 1, 'de': 1.5, 'fr': 1.5,
            'es': 1.5, 'it': 1.5, 'jp': 2, 'kr': 2, 'ae': 2, 'qa': 2, 'sa': 2.5,
            'ru': 2.5, 'cn': 2.5, 'in': 2, 'br': 2, 'mx': 2, 'za': 1.5, 'eg': 2.5
        },
        family: {
            'ca': 1.5, 'au': 1.5, 'nz': 1.5, 'sg': 2, 'us': 2, 'gb': 2, 'de': 2, 'fr': 2,
            'es': 2, 'it': 2, 'jp': 2.5, 'kr': 2.5, 'ae': 2, 'qa': 2, 'sa': 2.5,
            'ru': 3, 'cn': 3, 'in': 2.5, 'br': 2, 'mx': 2, 'za': 2, 'eg': 2.5
        },
        business: {
            'ca': 1.5, 'au': 1.5, 'nz': 1.5, 'sg': 1, 'us': 2.5, 'gb': 2, 'de': 1.5, 'fr': 2,
            'es': 2, 'it': 2, 'jp': 2, 'kr': 2, 'ae': 1, 'qa': 1, 'sa': 1.5,
            'ru': 2.5, 'cn': 3, 'in': 2.5, 'br': 2, 'mx': 2, 'za': 2, 'eg': 2.5
        }
    };

    return difficulties[visaType] || difficulties.all;
}

// Get country information
function getCountryInfo(countryCode) {
    // This would typically come from your database
    // Sample data for a few countries
    const countryData = {
        'ca': {
            name: 'Canada',
            visaOptions: ['Express Entry', 'Provincial Nominee Program', 'Study Permit'],
            difficulty: 'Easy',
            processingTime: '6-12 months',
            immigrationRate: 'High',
            description: 'Canada has one of the most open immigration systems with multiple pathways to permanent residency.'
        },
        'us': {
            name: 'United States',
            visaOptions: ['H-1B', 'L-1', 'EB-5', 'Family Sponsorship'],
            difficulty: 'Difficult',
            processingTime: '6-24 months',
            immigrationRate: 'Moderate',
            description: 'The US has various visa options but can have long processing times and complex requirements.'
        },
        'au': {
            name: 'Australia',
            visaOptions: ['Skilled Independent Visa', 'Employer Sponsorship', 'Study Visa'],
            difficulty: 'Easy',
            processingTime: '3-12 months',
            immigrationRate: 'High',
            description: 'Australia offers points-based immigration with pathways for skilled workers and students.'
        },
        'gb': {
            name: 'United Kingdom',
            visaOptions: ['Skilled Worker Visa', 'Student Visa', 'Family Visa'],
            difficulty: 'Moderate',
            processingTime: '3-6 months',
            immigrationRate: 'Moderate',
            description: 'The UK has a points-based system focusing on skills and English language proficiency.'
        },
        'de': {
            name: 'Germany',
            visaOptions: ['EU Blue Card', 'Job Seeker Visa', 'Study Visa'],
            difficulty: 'Moderate',
            processingTime: '1-3 months',
            immigrationRate: 'Moderate',
            description: 'Germany offers good opportunities for skilled workers and has a strong economy.'
        }
    };

    // Default for countries without specific data
    const defaultData = {
        name: 'Unknown',
        visaOptions: ['Contact us for information'],
        difficulty: 'Unknown',
        processingTime: 'Varies',
        immigrationRate: 'Unknown',
        description: 'Contact us for specific information about this country.'
    };

    return countryData[countryCode] || { ...defaultData, name: $('#world-map-container').vectorMap('get', 'mapObject').mapData.paths[countryCode].name };
}

// Generate HTML for country tooltip
function getCountryTooltipHTML(countryInfo) {
    return `
        <div class="country-tooltip">
            <p><strong>Difficulty:</strong> ${countryInfo.difficulty}</p>
            <p><strong>Processing:</strong> ${countryInfo.processingTime}</p>
            <p><strong>Popular Visas:</strong> ${countryInfo.visaOptions.slice(0, 2).join(', ')}</p>
        </div>
    `;
}

// Show detailed country information
function showCountryInfo(countryCode) {
    const countryInfo = getCountryInfo(countryCode);
    const modal = document.createElement('div');
    modal.className = 'country-modal';

    modal.innerHTML = `
        <div class="country-modal-content">
            <span class="close-modal">&times;</span>
            <h2>${countryInfo.name}</h2>
            <p class="country-description">${countryInfo.description}</p>

            <div class="country-stats">
                <div class="stat-item">
                    <span class="stat-label">Difficulty Level</span>
                    <span class="stat-value">${countryInfo.difficulty}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Processing Time</span>
                    <span class="stat-value">${countryInfo.processingTime}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Immigration Rate</span>
                    <span class="stat-value">${countryInfo.immigrationRate}</span>
                </div>
            </div>

            <h3>Popular Visa Options</h3>
            <ul class="visa-options-list">
                ${countryInfo.visaOptions.map(option => `<li>${option}</li>`).join('')}
            </ul>

            <div class="country-cta">
                <button class="btn-primary consultation-btn">Get Immigration Help for ${countryInfo.name}</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);

    // Close button functionality
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });

    // Consultation button
    const consultationBtn = modal.querySelector('.consultation-btn');
    consultationBtn.addEventListener('click', () => {
        window.location.href = '#consultation';
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });

    // Add modal styles if not already added
    if (!document.getElementById('modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .country-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .country-modal-content {
                background-color: white;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                border-radius: 8px;
                padding: 30px;
                position: relative;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
            }

            .close-modal {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 24px;
                cursor: pointer;
                color: #777;
                transition: color 0.3s ease;
            }

            .close-modal:hover {
                color: #333;
            }

            .country-description {
                margin: 15px 0;
                line-height: 1.6;
            }

            .country-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin: 25px 0;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 8px;
            }

            .stat-item {
                display: flex;
                flex-direction: column;
            }

            .stat-label {
                font-size: 0.9rem;
                color: #777;
            }

            .stat-value {
                font-size: 1.1rem;
                font-weight: 600;
                color: #333;
            }

            .visa-options-list {
                margin: 15px 0;
                padding-left: 20px;
            }

            .visa-options-list li {
                margin-bottom: 8px;
            }

            .country-cta {
                margin-top: 25px;
                text-align: center;
            }

            .consultation-btn {
                width: 100%;
                padding: 12px;
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

// Map tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const mapTabs = document.querySelectorAll('.map-tab');
    const officeMap = document.getElementById('office-map');

    if (mapTabs.length && officeMap) {
        // Map iframe sources
        const mapSources = {
            newyork: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573819235!2d-73.98570492346016!3d40.748440471397524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMDguNiJX!5e0!3m2!1sen!2sus!4v1645112897516!5m2!1sen!2sus",
            london: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2889089060424!2d-0.12739492402603565!3d51.50731839563806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5342fdf089c627!2sHouses%20of%20Parliament!5e0!3m2!1sen!2sus!4v1710345789010!5m2!1sen!2sus",
            toronto: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.846437553229!2d-79.38462732403818!3d43.6534417395181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sCN%20Tower!5e0!3m2!1sen!2sus!4v1710345825261!5m2!1sen!2sus"
        };

        // Add click event to tabs
        mapTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                mapTabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Update map iframe
                const office = tab.getAttribute('data-office');
                if (mapSources[office]) {
                    const mapIframe = officeMap.querySelector('iframe');
                    mapIframe.src = mapSources[office];
                }
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Simulate form submission delay
            setTimeout(() => {
                // Replace form with success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for contacting us. One of our immigration experts will get back to you within 24 hours.</p>
                    </div>
                `;

                // Add styling for success message
                const style = document.createElement('style');
                style.textContent = `
                    .success-message {
                        text-align: center;
                        padding: 30px 20px;
                    }

                    .success-icon {
                        font-size: 4rem;
                        color: #4CAF50;
                        margin-bottom: 20px;
                    }

                    .success-message h3 {
                        color: var(--dark-color) !important;
                        margin-bottom: 15px;
                    }
                `;
                document.head.appendChild(style);
            }, 1500);
        });
    }
});
