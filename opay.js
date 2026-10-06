
        // PAGE TITLES AND SUBTITLES CONFIG
        const pageConfigs = {
            'transfers': {
                title: 'Money Transfer <span>Guidelines</span>',
                subtitle: 'Operational rules, settlement timelines, transaction limits, and resolution policies for instant transfers.'
            },
            'owealth': {
                title: 'OWealth Savings <span>Guidelines</span>',
                subtitle: 'Interest payout schedules, liquidity terms, tax deductions, and yield calculators for OWealth users.'
            },
            'pos': {
                title: 'POS Terminal <span>Guidelines</span>',
                subtitle: 'Merchant operational policies, settlement terms, transaction thresholds, and security compliance for POS operations.'
            },
            'security': {
                title: 'Security First <span>Guidelines</span>',
                subtitle: 'Proactive protection measures, fraud detection standards, credential safety, and emergency response procedures.'
            },
            'privacy': {
                title: 'Privacy Policy <span>Guidelines</span>',
                subtitle: 'Principles governing data collection, privacy compliance, user consent, third-party sharing, and personal data security.'
            },
            'terms': {
                title: 'Terms of Service <span>Guidelines</span>',
                subtitle: 'User agreement, operational conditions, eligibility criteria, permitted service usage, and liability framework.'
            },
            'careers': {
                title: 'Official Career <span>Guidelines</span>',
                subtitle: 'Explore our hiring framework, core work values, and career growth pathways built to empower high-performing professionals.'
            },
            'press': {
                title: 'Press & Media <span>Guidelines</span>',
                subtitle: 'Guidelines for media representatives, journalists, and brand partners covering OPay news, announcements, and visual assets.'
            }
        };

        // ROUTING / PAGE SWITCHER
        function switchPage(pageKey) {
            // Default Fallback
            if (!pageConfigs[pageKey]) pageKey = 'security';

            // Hide all pages
            const pages = document.querySelectorAll('.page-view');
            pages.forEach(p => p.classList.remove('active'));

            // Show selected page
            const targetPage = document.getElementById(`page-${pageKey}`);
            if (targetPage) targetPage.classList.add('active');

            // Update Hero Header Text
            const config = pageConfigs[pageKey];
            document.getElementById('hero-title').innerHTML = config.title;
            document.getElementById('hero-subtitle').innerText = config.subtitle;

            // Update Active Subnav Indicators
            const subItems = document.querySelectorAll('.subnav-item');
            subItems.forEach(item => item.classList.remove('active'));
            const activeSub = document.getElementById(`sub-${pageKey}`);
            if (activeSub) activeSub.classList.add('active');

            // Update Hash Location
            window.location.hash = pageKey;

            // Close Mobile Menu
            document.getElementById('nav-menu').classList.remove('open');

            // Scroll to Top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Reset Search Filter
            document.getElementById('global-search').value = '';
            filterGuidelines();
        }

        // HASH LOCATION ROUTER ON LOAD / CHANGE
        function handleHashRoute() {
            const hash = window.location.hash.replace('#', '');
            if (hash && pageConfigs[hash]) {
                switchPage(hash);
            } else {
                switchPage('security'); // Default view
            }
        }

        window.addEventListener('hashchange', handleHashRoute);
        window.addEventListener('DOMContentLoaded', () => {
            handleHashRoute();
            calculateOWealth();
        });

        // LIVE SEARCH FILTER FUNCTIONALITY
        function filterGuidelines() {
            const query = document.getElementById('global-search').value.toLowerCase().trim();
            const activePage = document.querySelector('.page-view.active');
            
            if (!activePage) return;

            const cards = activePage.querySelectorAll('.searchable');

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // OWEALTH YIELD CALCULATOR LOGIC
        function calculateOWealth() {
            const amountInput = document.getElementById('owealth-amount');
            const daysInput = document.getElementById('owealth-days');
            const rateSelect = document.getElementById('owealth-rate');
            const output = document.getElementById('owealth-output');

            if (!amountInput || !daysInput || !rateSelect || !output) return;

            const amount = parseFloat(amountInput.value) || 0;
            const days = parseInt(daysInput.value) || 0;
            const rate = parseFloat(rateSelect.value) / 100;

            // Gross interest = (Amount * Annual Rate / 365) * Days
            const grossInterest = (amount * rate / 365) * days;
            
            // Net interest after 10% Withholding Tax (WHT)
            const netInterest = grossInterest * 0.90;

            output.innerText = '₦' + netInterest.toLocaleString('en-NG', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        // EMERGENCY MODAL CONTROLS
        function triggerEmergencyModal() {
            document.getElementById('emergency-modal').style.display = 'flex';
        }

        function closeEmergencyModal() {
            document.getElementById('emergency-modal').style.display = 'none';
        }

        // MOBILE NAV TOGGLE
        function toggleMobileNav() {
            const menu = document.getElementById('nav-menu');
            menu.classList.toggle('open');
        }
    