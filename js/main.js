/**
 * Main Interaction & UI Controller for MKShishir Portfolio
 * Handles mobile menu toggles, smooth scroll enhancements, dynamic behaviors,
 * and modular component interactions (Project Filtering, 3D Tilt, FAQ Accordions, Typewriter, and Support Widget).
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE MENU TOGGLE FUNCTIONALITY ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('open-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);

            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                openIcon?.classList.add('hidden');
                closeIcon?.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                openIcon?.classList.remove('hidden');
                closeIcon?.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking a link inside it
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                openIcon?.classList.remove('hidden');
                closeIcon?.classList.add('hidden');
            });
        });
    }

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    const navInner = document.getElementById('nav-inner');
    const profilePic = document.getElementById('profile-pic');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('bg-gray-900', 'bg-opacity-70', 'shadow-lg', 'backdrop-blur-sm');
            navbar?.classList.remove('bg-transparent');
            navInner?.classList.remove('h-40');
            navInner?.classList.add('h-20');
            profilePic?.classList.remove('w-24', 'h-24');
            profilePic?.classList.add('w-12', 'h-12');
        } else {
            navbar?.classList.remove('bg-gray-900', 'bg-opacity-70', 'shadow-lg', 'backdrop-blur-sm');
            navbar?.classList.add('bg-transparent');
            navInner?.classList.remove('h-20');
            navInner?.classList.add('h-40');
            profilePic?.classList.remove('w-12', 'h-12');
            profilePic?.classList.add('w-24', 'h-24');
        }

        // Floating Go-To-Top Button Visibility
        const goToTopButton = document.getElementById("goToTop");
        if (window.scrollY > 400) {  
            goToTopButton?.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
        } else {
            goToTopButton?.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
        }
    });

    // --- FOOTER YEAR INITIALIZATION ---
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- TYPEWRITER EFFECT LOGIC ---
    const typewriterOutput = document.getElementById('typewriter-output');
    const phrases = [
        "Web Designer & Developer.",
        "IT Specialist.",
        "Shopify Expert.",
        "WordPress Specialist.",
        "Full-Stack Engineer."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenPhrases = 1500;

    function typeWriter() {
        if (!typewriterOutput) return;
        const currentPhrase = phrases[phraseIndex];
        let displayedText = typewriterOutput.textContent.replace('|', '').trim();

        if (isDeleting) {
            displayedText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayedText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length + 1) {
            currentSpeed = delayBetweenPhrases;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentSpeed = typingSpeed;
        }

        const cursor = '<span class="blinking-cursor">|</span>';
        typewriterOutput.innerHTML = displayedText + cursor;
        setTimeout(typeWriter, currentSpeed);
    }

    if (typewriterOutput) typeWriter();

    // --- STICKY RIBBON DELAYED REVEAL LOGIC ---
    const hirePopup = document.getElementById('hire-popup');
    const demoPopup = document.getElementById('demo-popup');
    const affiliatePopup = document.getElementById('affiliate-popup');
    const RIBBON_DELAY_MS = 8000;

    function showPopups() {
        hirePopup?.classList.remove('opacity-0', 'translate-x-full');
        demoPopup?.classList.remove('opacity-0', 'translate-x-full');
        affiliatePopup?.classList.remove('opacity-0', 'translate-x-full');
    }
    setTimeout(showPopups, RIBBON_DELAY_MS);

    // --- FLOATING BUTTON & CONTACT MODAL LOGIC ---
    const goToTopButton = document.getElementById("goToTop");
    const contactBtn = document.getElementById("goToContact");
    const contactModal = document.getElementById("contactModal");
    const closeBtn = document.getElementById("closeContact");

    goToTopButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    contactBtn?.addEventListener("click", openContactModal); 
    closeBtn?.addEventListener("click", () => contactModal?.classList.add("hidden"));

    window.addEventListener("click", (e) => {
        if (e.target === contactModal) contactModal.classList.add("hidden");
    });

    // --- SMOOTH SCROLL FOR ALL INTERNAL LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- ORDER FORM SUBMISSION HANDLING (STAY ON PAGE) ---
    const orderForm = document.querySelector('#hire-me form');
    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            const btn = orderForm.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.innerText = "Sending Request...";
            }
        });
    }

    // --- MODULAR PROJECT FILTER & ACTIVE TAB STYLING ---
    document.addEventListener('change', (e) => {
        if (e.target.matches('input[name="filter"]')) {
            const radioInput = e.target;
            const filterId = radioInput.id;
            
            // Extract the category name (e.g. "filter-websites" -> "websites", "filter-all" -> "all")
            let categoryKey = filterId.replace('filter-', '');
            if (categoryKey === 'all') categoryKey = 'all';

            // Reset all filter labels to default inactive styling
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('bg-stone-900', 'text-white', 'border-stone-900', 'shadow-sm');
                btn.classList.add('bg-white/85', 'backdrop-blur-md', 'text-stone-600', 'border-stone-200/80');
            });

            // Activate the matching label corresponding to the checked radio button
            const activeLabel = document.querySelector(`label[for="${filterId}"]`);
            if (activeLabel) {
                activeLabel.classList.remove('bg-white/85', 'backdrop-blur-md', 'text-stone-600', 'border-stone-200/80');
                activeLabel.classList.add('bg-stone-900', 'text-white', 'border-stone-900', 'shadow-sm');
            }

            // Filter project grid cards
            const projectGrid = document.querySelector('#project-grid');
            if (!projectGrid) return;
            const projectCards = projectGrid.querySelectorAll('.project-card-vault');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (categoryKey === 'all' || category === categoryKey) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        }
    });

    // Delegated Mousemove for 3D Tilt Effect on Modular Cards
    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.project-card-vault');
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = x - xc;
        const dy = y - yc;
        card.style.transform = `perspective(1000px) rotateY(${dx / 25}deg) rotateX(${-dy / 25}deg)`;
    });

    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.project-card-vault');
        if (!card) return;
        card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    });

    // --- FAQ ACCORDION FUNCTIONALITY ---
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.faq-header');
        if (!header) return;

        const currentItem = header.parentElement;
        const content = currentItem.querySelector('.faq-content') || header.nextElementSibling;
        const icon = header.querySelector('.faq-icon');
        const isOpen = content?.style.maxHeight;

        // Close all other open items first
        document.querySelectorAll('.faq-content, .faq-item').forEach(el => {
            if (el.classList.contains('faq-content') && el !== content) {
                el.style.maxHeight = null;
                el.classList.add('opacity-0');
            }
            if (el.classList.contains('faq-item') && el !== currentItem) {
                el.classList.remove('active', 'border-stone-400', 'border-cyan-500/50', 'border-fuchsia-500/50', 'shadow-md');
                const otherIcon = el.querySelector('.faq-icon');
                if (otherIcon) {
                    otherIcon.textContent = '＋';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Toggle the clicked item
        if (content && !isOpen) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.remove('opacity-0');
            content.style.opacity = '1';
            if (icon) {
                icon.textContent = '－';
                icon.style.transform = 'rotate(180deg)';
            }
            
            // Add accent styling based on classes or themes
            const titleSpan = header.querySelector('span');
            if (titleSpan && titleSpan.classList.contains('text-cyan-400')) {
                currentItem.classList.add('border-cyan-500/50');
            } else {
                currentItem.classList.add('active', 'border-stone-400', 'shadow-md');
            }
        } else if (content) {
            content.style.maxHeight = null;
            content.classList.add('opacity-0');
            content.style.opacity = '0';
            if (icon) {
                icon.textContent = '＋';
                icon.style.transform = 'rotate(0deg)';
            }
            currentItem.classList.remove('active', 'border-stone-400', 'border-cyan-500/50', 'border-fuchsia-500/50', 'shadow-md');
        }
    });
});

/**
 * =========================================================================
 * GLOBAL FUNCTION: Open Contact Modal
 * =========================================================================
 */
function openContactModal() {
    const contactModal = document.getElementById("contactModal");
    if (contactModal) {
        contactModal.classList.remove("hidden");
    } else {
        const hireMeSection = document.getElementById('hire-me');
        if (hireMeSection) {
            hireMeSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log("Contact modal or section requested.");
        }
    }
}

/**
 * =========================================================================
 * SUPPORTWIDGET INJECTION
 * =========================================================================
 */
(function() {
    const supportScript = document.createElement('script');
    supportScript.src = "https://www.supportkori.com/widget.js";
    supportScript.setAttribute('data-id', 'mkshishir');
    supportScript.setAttribute('data-message', 'Support mkshishir');
    supportScript.setAttribute('data-color', '#FBF9F5');
    supportScript.setAttribute('data-position', 'left');
    supportScript.async = true;
    document.body.appendChild(supportScript);
})();