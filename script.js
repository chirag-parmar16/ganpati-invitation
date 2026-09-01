/* ==========================================================================
   GANPATI UTSAV 2026 - DUAL DESKTOP & MOBILE INVITATION INTERACTIVITY ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Lenis Smooth Scroll Initialization (Gated on Load)
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Initially lock scrolling on page load until entrance reveal completes!
        lenis.stop();
        document.body.style.overflow = 'hidden';

        // Smooth scroll for navbar anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement, { offset: -60 });
                }
            });
        });
    } else {
        document.body.style.overflow = 'hidden';
    }

    // 2. Mobile Navigation Hamburger Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksContainer.classList.toggle('mobile-open');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#luxuryNavbar')) {
                navLinksContainer.classList.remove('mobile-open');
            }
        });
    }

    // 3. Sticky Navbar Scroll & Active Section Handler
    const luxuryNavbar = document.getElementById('luxuryNavbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (!luxuryNavbar.classList.contains('navbar-visible')) return;

        if (window.scrollY > 80) {
            luxuryNavbar.classList.add('scrolled');
        } else {
            luxuryNavbar.classList.remove('scrolled');
        }

        // Active link indicator update
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Ambient Mouse Spotlight
    const ambientSpotlight = document.getElementById('ambientSpotlight');
    if (ambientSpotlight) {
        window.addEventListener('mousemove', (e) => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    }

    // 5. Luxury Toast System
    const luxuryToast = document.getElementById('luxuryToast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout = null;

    function showLuxuryToast(title, message) {
        if (!luxuryToast) return;
        
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        luxuryToast.classList.add('active');
        
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            luxuryToast.classList.remove('active');
        }, 4000);
    }

    // 6. RSVP Modal & Action Triggers
    const rsvpModal = document.getElementById('rsvpModal');
    const navBtnRsvp = document.getElementById('navBtnRsvp');
    const btnRsvp = document.getElementById('btnRsvp');
    const btnAcceptInvitation = document.getElementById('btnAcceptInvitation');
    const btnShareInvitation = document.getElementById('btnShareInvitation');
    const closeRsvpModal = document.getElementById('closeRsvpModal');
    const rsvpForm = document.getElementById('rsvpForm');

    function openModal() {
        if (rsvpModal) rsvpModal.classList.add('active');
    }

    function closeModal() {
        if (rsvpModal) rsvpModal.classList.remove('active');
    }

    if (navBtnRsvp) navBtnRsvp.addEventListener('click', openModal);
    if (btnRsvp) {
        btnRsvp.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal();
        });
    }
    if (btnAcceptInvitation) {
        btnAcceptInvitation.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal();
        });
    }
    if (closeRsvpModal) closeRsvpModal.addEventListener('click', closeModal);

    if (btnShareInvitation) {
        btnShareInvitation.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navigator.share) {
                navigator.share({
                    title: 'Ganpati Utsav 2026 Invitation',
                    text: 'The Rane & Deshmukh Family cordially invites you to grace the divine arrival of Lord Ganesha.',
                    url: window.location.href
                }).catch(() => {});
            } else {
                navigator.clipboard.writeText(window.location.href);
                showLuxuryToast("Invitation Link Copied!", "Share with your family & friends to invite them for Shree Ganesh Utsav 2026.");
            }
        });
    }

    // 7. Royal Shehnai Web Audio Synthesizer Toggle
    const btnShehnai = document.getElementById('btnShehnai');
    const navBtnShehnai = document.getElementById('navBtnShehnai');
    let audioCtx = null;
    let isPlaying = false;
    let oscillators = [];

    function toggleShehnaiSynth(e) {
        if (e) e.stopPropagation();

        if (isPlaying) {
            stopShehnaiSynth();
        } else {
            startShehnaiSynth();
        }
    }

    function startShehnaiSynth() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const freqs = [138.59, 277.18, 415.30, 554.37];
        oscillators = freqs.map(freq => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.02, audioCtx.currentTime);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            return { osc, gain };
        });

        isPlaying = true;
        const activeLabel = `<i class="fa-solid fa-volume-high"></i> <span class="btn-text">Pause Shehnai</span>`;
        if (btnShehnai) btnShehnai.innerHTML = `<i class="fa-solid fa-volume-high icon-left"></i> Pause Shehnai`;
        if (navBtnShehnai) navBtnShehnai.innerHTML = activeLabel;
        showLuxuryToast("Royal Shehnai Playing", "Devotional Shehnai music is now playing.");
    }

    function stopShehnaiSynth() {
        if (oscillators.length > 0) {
            oscillators.forEach(o => {
                o.gain.gain.setValueAtTime(0, audioCtx.currentTime);
                o.osc.stop();
            });
            oscillators = [];
        }
        isPlaying = false;
        const inactiveLabel = `<i class="fa-solid fa-music"></i> <span class="btn-text">Shehnai</span>`;
        if (btnShehnai) btnShehnai.innerHTML = `<i class="fa-solid fa-music icon-left"></i> Play Royal Shehnai`;
        if (navBtnShehnai) navBtnShehnai.innerHTML = inactiveLabel;
    }

    if (btnShehnai) btnShehnai.addEventListener('click', toggleShehnaiSynth);
    if (navBtnShehnai) navBtnShehnai.addEventListener('click', toggleShehnaiSynth);

    if (rsvpModal) {
        rsvpModal.addEventListener('click', (e) => {
            if (e.target === rsvpModal) closeModal();
        });
    }

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const guestName = document.getElementById('guestName').value;
            closeModal();
            showLuxuryToast("RSVP Confirmed!", `Thank you ${guestName}! Your royal invitation for Shree Ganesh Utsav 2026 is registered.`);
            rsvpForm.reset();
        });
    }

    // 8. Schedule Category Filter Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const scheduleCards = document.querySelectorAll('.schedule-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-tab');

            scheduleCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 9. GSAP Entrance Curtain Reveal Timeline & Page Unlock Callbacks
    if (typeof gsap !== 'undefined') {
        const heroSection = document.querySelector('.hero-clip-section');
        let isRevealed = false;

        const heroTl = gsap.timeline({
            paused: true,
            defaults: { duration: 2.0, ease: "power1.out", force3D: true },
            onComplete: () => {
                // When reveal animation completes: unlock navbar & page scrolling, and HIDE cover layer completely!
                if (luxuryNavbar) luxuryNavbar.classList.add('navbar-visible');
                if (lenis) lenis.start();
                document.body.style.overflow = '';
                const coverLayer = document.getElementById('heroCoverLayer');
                if (coverLayer) {
                    coverLayer.style.display = 'none';
                    coverLayer.style.pointerEvents = 'none';
                }
                const scrollIndicator = document.querySelector('.scroll-down-indicator');
                if (scrollIndicator) {
                    scrollIndicator.style.display = 'none';
                }
            },
            onReverseComplete: () => {
                // When reversed back to curtain cover: hide navbar & lock page scrolling!
                if (luxuryNavbar) luxuryNavbar.classList.remove('navbar-visible');
                if (lenis) {
                    lenis.scrollTo(0, { immediate: true });
                    lenis.stop();
                }
                document.body.style.overflow = 'hidden';
            }
        });

        // 1. STEP 0: Split text slides out left & right, cover curtain fades out smoothly on GPU (0.0s - 2.2s)
        heroTl.to(".parallax-text-left", {
            x: "-55vw",
            opacity: 0,
            duration: 2.2,
            ease: "power1.out",
            force3D: true
        }, 0);

        heroTl.to(".parallax-text-right", {
            x: "55vw",
            opacity: 0,
            duration: 2.2,
            ease: "power1.out",
            force3D: true
        }, 0);

        heroTl.to("#heroCoverLayer, .scroll-down-indicator", {
            opacity: 0,
            scale: 1.02,
            duration: 2.0,
            ease: "power1.out",
            pointerEvents: "none",
            force3D: true
        }, 0);

        heroTl.to("#heroRevealedBg", {
            opacity: 1,
            duration: 2.2,
            ease: "power1.out",
            force3D: true
        }, 0.2);

        // 2. STEP 1: Floating Luxury Navbar slides down first (at 0.5s)
        heroTl.to(".luxury-navbar-wrapper", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            force3D: true
        }, 0.5);

        // 3. STEP 2: Left Info Panel slides in second (at 1.0s)
        heroTl.to("#heroLeftPanel", {
            x: "0%",
            opacity: 1,
            pointerEvents: "auto",
            duration: 1.4,
            ease: "power2.out",
            force3D: true
        }, 1.0);

        heroTl.to("#royalArchPlaque", {
            y: "0%",
            opacity: 1,
            pointerEvents: "auto",
            duration: 1.4,
            ease: "power2.out",
            force3D: true
        }, 1.0);

        // 4. STEP 3: Right Year Heritage Panel slides in third (at 1.5s)
        heroTl.to("#heroRightPanel", {
            x: "0%",
            opacity: 1,
            pointerEvents: "auto",
            duration: 1.4,
            ease: "power2.out",
            force3D: true
        }, 1.5);

        // 5. STEP 4: Divine Sunburst Halo glows behind Ganesha's head fourth (at 2.0s)
        heroTl.to("#divineChakra", {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.2)",
            force3D: true
        }, 2.0);

        // 6. STEP 5: Grand 3D Golden Ganesha Idol floats up fifth in full divine majesty! (at 2.5s)
        heroTl.to("#heroIdolCutout", {
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
            force3D: true
        }, 2.5);

        // Click Hero Cover Entrance Trigger (Runs ONCE per page session until reload!)
        if (heroSection) {
            heroSection.style.cursor = 'pointer';
            heroSection.addEventListener('click', (e) => {
                // Ignore if clicking inside interactive cards or plaque
                if (e.target.closest('#heroLeftPanel') || e.target.closest('#heroRightPanel') || e.target.closest('#royalArchPlaque')) return;

                if (!isRevealed) {
                    heroTl.play();
                    isRevealed = true;
                    heroSection.style.cursor = 'default';
                }
            });
        }
    }

});
