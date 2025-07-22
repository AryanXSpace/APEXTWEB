'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import OurWorksSection from './OurWorksSection';
import { Sparkles, Check, ChevronRight, MessageCircle, Zap, Calendar, Award, HardDrive, SlidersHorizontal, ArrowRight, Star, BrainCircuit, Mail } from 'lucide-react';

// Custom Hook for detecting when an element is in the viewport
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
};

// Reusable 3D Tilt Component
const TiltOnHover = ({ children, className, perspective = 1000, maxTilt = 15, scale = 1.05 }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / maxTilt;
    const y = (e.clientY - top - height / 2) / maxTilt;
    ref.current.style.transform = `perspective(${perspective}px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(${scale}, ${scale}, ${scale})`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'transform',
        transformStyle: 'preserve-3d'
      }}
      className={className}
    >
      {React.cloneElement(children, { style: { transform: 'translateZ(20px)', backfaceVisibility: 'hidden' } })}
    </div>
  );
};
TiltOnHover.displayName = 'TiltOnHover';


// Magnetic Button Wrapper
const MagneticWrapper = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                transition: 'transform 0.15s linear'
            }}
        >
            {children}
        </div>
    );
};
MagneticWrapper.displayName = 'MagneticWrapper';


// Typing Animation Hero Text
const TypingHeroText = ({ phrases, className }) => {
    const [text, setText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const delayAfterTyping = 2000;

        const handleTyping = () => {
            if (isDeleting) {
                if (text.length > 0) {
                    setText(current => current.substring(0, current.length - 1));
                } else {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            } else {
                if (text.length < currentPhrase.length) {
                    setText(current => current + currentPhrase.charAt(text.length));
                } else {
                    setTimeout(() => setIsDeleting(true), delayAfterTyping);
                }
            }
        };

        const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timeout);
    }, [text, isDeleting, phraseIndex, phrases]);

    return (
        <h1 className={className}>
            <span className="gradient-text">{text}</span>
            <span className="animate-blinking-cursor text-gray-400">|</span>
        </h1>
    );
};
TypingHeroText.displayName = 'TypingHeroText';

// Cal.com Script Loader
const useCal = () => {
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", { origin: "https://app.cal.com" });
    Cal("ui", {"theme":"dark","styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
  }, []);
};

// New "Loki Multiverse" Style Apex Logo Component
const ApexLogo = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="loki-main" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="loki-accent" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        {/* Interweaving timeline paths */}
        <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12" stroke="url(#loki-main)" strokeWidth="1.5" strokeLinecap="round" filter="url(#glow)"/>
        <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12" stroke="url(#loki-accent)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 2V6" stroke="url(#loki-main)" strokeWidth="1" strokeLinecap="round" />
        <path d="M12 18V22" stroke="url(#loki-accent)" strokeWidth="1" strokeLinecap="round" />
        {/* Central chaotic element */}
        <path d="M10 11C11.5 9.5 12.5 9.5 14 11L13 13C11.5 14.5 12.5 14.5 11 13L10 11Z" fill="url(#loki-main)" opacity="0.8" filter="url(#glow)"/>
        {/* Stray timelines / Loki's mischief */}
        <path d="M3 7C5 5 8 5 10 7" stroke="url(#loki-accent)" strokeWidth="0.75" strokeLinecap="round" />
        <path d="M21 17C19 19 16 19 14 17" stroke="url(#loki-main)" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
);
ApexLogo.displayName = 'ApexLogo';


// Main App Component
const App = () => {
  const worksRef = useRef(null);
  const pricingRef = useRef(null);
  const aboutRef = useRef(null);

  useCal();

  // Mouse position effect for CSS variables
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dynamic Favicon and Title
  useEffect(() => {
    const rawSvg = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="loki-main" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c084fc" /><stop offset="100%" stop-color="#6366f1" /></linearGradient><linearGradient id="loki-accent" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#4ade80" /><stop offset="100%" stop-color="#a78bfa" /></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="0.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12" stroke="url(#loki-main)" stroke-width="1.5" stroke-linecap="round" filter="url(#glow)"/><path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12" stroke="url(#loki-accent)" stroke-width="1.5" stroke-linecap="round" /><path d="M12 2V6" stroke="url(#loki-main)" stroke-width="1" stroke-linecap="round" /><path d="M12 18V22" stroke="url(#loki-accent)" stroke-width="1" stroke-linecap="round" /><path d="M10 11C11.5 9.5 12.5 9.5 14 11L13 13C11.5 14.5 12.5 14.5 11 13L10 11Z" fill="url(#loki-main)" opacity="0.8" filter="url(#glow)"/><path d="M3 7C5 5 8 5 10 7" stroke="url(#loki-accent)" stroke-width="0.75" stroke-linecap="round" /><path d="M21 17C19 19 16 19 14 17" stroke="url(#loki-main)" stroke-width="0.75" stroke-linecap="round" /></svg>`;
    const faviconUrl = `data:image/svg+xml,${encodeURIComponent(rawSvg)}`;
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = faviconUrl;
    document.head.appendChild(link);

    const titles = ["Apex Studio", "Build Stunning Websites", "Launch Projects Faster"];
    let i = 0;
    document.title = titles[i];
    const titleInterval = setInterval(() => {
        i = (i + 1) % titles.length;
        document.title = titles[i];
    }, 4000);

    return () => clearInterval(titleInterval);
  }, []);


  return (
    <div className="bg-black text-white font-sans overflow-x-hidden relative">
      <div className="spotlight"></div>
      <div className="relative z-10">
        <StyleInjector />
        <Header
          worksRef={worksRef}
          pricingRef={pricingRef}
          aboutRef={aboutRef}
        />
        <main>
            <HeroSection />
            <InfoSlider />
            <OurWorksSection />
            <WinningEdgeSection ref={aboutRef} />

            <ServicesSection ref={pricingRef} />
            <GeminiProjectPlanner />
        </main>
        <Footer />
        <FloatingCallButton />
      </div>
    </div>
  );
};

// Component to inject global styles and animations
const StyleInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap');

    html {
        scroll-behavior: smooth;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: #0a0a0a;
    }

    .spotlight {
        position: fixed;
        top: var(--mouse-y, 0px);
        left: var(--mouse-x, 0px);
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(167, 139, 250, 0.25), transparent 50%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 0;
        transition: background 0.2s ease;
    }

    .playfair-font {
      font-family: 'Playfair Display', serif;
    }

    @keyframes pulse-slow {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
      }
      50% {
        transform: scale(0.97);
        box-shadow: 0 0 0 12px rgba(34, 197, 94, 0);
      }
    }
    .animate-pulse-slow {
      animation: pulse-slow 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
    }

    @keyframes slide-in-3d {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.95) rotateX(-10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
        }
    }

    .fade-in-up {
        opacity: 0;
        animation: slide-in-3d 1s ease-out forwards;
    }

    .stagger-children > * {
        opacity: 0;
    }

    .stagger-children.is-visible > * {
        animation: slide-in-3d 0.8s ease-out forwards;
    }

    .gradient-text {
        background: linear-gradient(90deg, #d8b4fe, #a78bfa, #818cf8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 40s linear infinite;
    }

    @keyframes blink {
      50% { opacity: 0; }
    }
    .animate-blinking-cursor {
      animation: blink 1s step-end infinite;
    }

    /* Shining animation for the email button */
    @keyframes shine {
      100% {
        left: 125%;
      }
    }

    .brazy-button {
        position: relative;
        overflow: hidden;
    }

    .brazy-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -75%;
        width: 50%;
        height: 100%;
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
        transform: skewX(-25deg);
        pointer-events: none;
    }

    .brazy-button:hover::before {
        animation: shine 0.85s;
    }


    .info-slider-container {
        position: relative;
    }
    .info-slider-container::before, .info-slider-container::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100px;
        z-index: 2;
        pointer-events: none;
    }
    .info-slider-container::before {
        left: 0;
        background: linear-gradient(to right, #111827, transparent);
    }
    .info-slider-container::after {
        right: 0;
        background: linear-gradient(to left, #111827, transparent);
    }

    .card-glow-border {
      border: 1px solid rgb(55 65 81 / 0.5);
      position: relative;
    }
    .card-glow-border:hover {
      border-color: rgb(167 139 250 / 0.5);
    }
    .card-glow-border::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 1.1rem;
      padding: 1px;
      background: radial-gradient(400px at var(--mouse-x) var(--mouse-y), rgba(167, 139, 250, 0.25), transparent 80%);
      -webkit-mask:
         linear-gradient(#fff 0 0) content-box,
         linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .card-glow-border:hover::before {
      opacity: 1;
    }

    @keyframes loading-pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
  `}</style>
);


// Header Component
const Header = ({ worksRef, pricingRef, aboutRef }) => {
  const [activeLink, setActiveLink] = useState('Home');
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks = useMemo(() => [
    { name: 'Home', ref: 'home' },
    { name: 'About', ref: aboutRef },
    { name: 'Works', ref: worksRef },
    { name: 'Pricing', ref: pricingRef },
  ], [aboutRef, worksRef, pricingRef]);

  useEffect(() => {
    const controlHeader = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            lastScrollY.current = window.scrollY;
        }
    };

    const handleActiveLink = () => {
        let currentSection = 'Home';
        const headerOffset = 150;

        for (const link of navLinks) {
            if (link.ref === 'home') continue;
            const section = link.ref.current;
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
                    currentSection = link.name;
                }
            }
        }
         if (window.scrollY < 300) {
            currentSection = 'Home';
        }
        setActiveLink(currentSection);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      window.addEventListener('scroll', handleActiveLink);
      return () => {
        window.removeEventListener('scroll', controlHeader);
        window.removeEventListener('scroll', handleActiveLink);
      };
    }
  }, [navLinks]);

  const handleNavClick = (ref, linkName) => {
    setActiveLink(linkName);
    if (ref === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const headerOffset = 90;
    const elementPosition = ref.current?.getBoundingClientRect().top ?? 0;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="py-4 px-6">
            <nav className={`max-w-7xl mx-auto flex items-center justify-between`}>
                <MagneticWrapper>
                    <a href="#home" onClick={() => handleNavClick('home', 'Home')} className="flex items-center space-x-2 px-3 py-2 bg-black/50 backdrop-blur-xl shadow-lg border border-gray-700/50 rounded-full">
                    <ApexLogo className="w-7 h-7" />
                    <span className={`text-2xl font-bold tracking-tighter text-white`}>Apex Studio</span>
                    </a>
                </MagneticWrapper>

                <div className="hidden md:flex items-center gap-x-2 p-1 rounded-full bg-black/50 backdrop-blur-xl shadow-lg border border-gray-700/50">
                {navLinks.map((link) => (
                    <MagneticWrapper key={link.name}>
                        <button
                        onClick={() => handleNavClick(link.ref, link.name)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 outline-none ${
                            activeLink === link.name
                            ? `text-black shadow bg-white`
                            : `text-gray-300 hover:text-white`
                        }`}
                        >
                        {link.name}
                        </button>
                    </MagneticWrapper>
                ))}
                </div>
                
                <button data-cal-link="apex-review-bot-bbiocs/15min" className={`hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 bg-white text-black hover:bg-gray-200`}>
                <span>Book a Call</span>
                <ChevronRight className="w-4 h-4" />
                </button>
            </nav>
        </div>
    </header>
  );
};
Header.displayName = 'Header';


// Hero Section Component
const HeroSection = () => {
  return (
    <section className="pt-48 pb-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <a
        href="#"
        className="inline-flex items-center justify-center space-x-2 rounded-full border border-gray-600/50 bg-gray-800/50 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-700/50 transition-colors duration-300 shadow-sm mb-8 fade-in-up"
      >
        <span className="inline-block rounded-full bg-indigo-500 px-2.5 py-1 text-white text-[10px] font-bold leading-none tracking-wide">NEW</span>
        <span className="text-gray-300">The Ultimate Framework for Modern Startups</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </a>

      <TypingHeroText
        phrases={[
          'Build Stunning Websites',
          'Launch Projects Faster',
          'Create The Future'
        ]}
        className="font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight max-w-4xl mx-auto h-24 sm:h-36 md:h-40"
      />

      <p
        className="text-gray-400 text-lg mt-8 max-w-2xl mx-auto fade-in-up"
        style={{ animationDelay: '300ms' }}
      >
        You focus on your business. We’ll build you a website that looks sharp and sells better.
      </p>
      <div className="flex justify-center items-center mt-10 fade-in-up gap-4" style={{ animationDelay: '450ms' }}>
        <button
        type="button"
        data-cal-link="apex-review-bot-bbiocs/15min"
        className="inline-flex items-center space-x-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 shadow-lg"
        >
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse-slow"></span>
        <span>Book a Call</span>
        </button>
        <MagneticWrapper>
            <a href="mailto:contact@apexservices.store"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-300 transform shadow-lg brazy-button"
            >
             <Mail className="w-4 h-4" />
            <span>Email Us</span>
            </a>
        </MagneticWrapper>
      </div>
    </section>
  );
};
HeroSection.displayName = 'HeroSection';

// Info Slider Component
const InfoSlider = () => {
    const slides = [
        "Innovative Solutions", "Expert Team", "Outstanding Support", "Proven Results", "Pixel-Perfect Design", "Lightning-Fast Performance"
    ];
    return (
        <div className="py-12 bg-gray-900/50 backdrop-blur-sm border-y border-gray-700/50">
            <div className="relative h-12 overflow-hidden info-slider-container">
                <div className="absolute top-0 flex animate-marquee whitespace-nowrap">
                    {slides.concat(slides).map((slide, index) => (
                        <div key={index} className="flex items-center mx-6">
                           <Star className="w-5 h-5 text-indigo-400 mr-3" />
                           <span className="text-xl font-semibold text-gray-300">{slide}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
InfoSlider.displayName = 'InfoSlider';


// Winning Edge Section
const WinningEdgeSection = React.forwardRef(function WinningEdgeSection(props, ref) {
    const [obsRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const features = [
        { icon: <SlidersHorizontal />, title: "Conversion-Optimized Design", description: "We build websites with strategy at the core — every layout, CTA, and flow is crafted to drive action, generate leads, and maximize ROI from day one." },
        { icon: <Zap />, title: "Blazing Fast Performance", description: "Your site loads in under 2 seconds, delivering lightning-fast experiences across all devices. Speed = retention, better rankings, and more trust." },
        { icon: <HardDrive />, title: "SEO-First Architecture", description: "From code structure to meta strategy, we embed SEO from the ground up — helping your site rank higher, get discovered faster, and stay visible." },
        { icon: <Calendar />, title: "Rapid Turnaround Delivery", description: "We deliver full-scale websites in 7–14 days without sacrificing quality. Our agile execution means you get to market faster — and smarter." },
        { icon: <Award />, title: "Enterprise-Grade Quality", description: "Custom UI/UX, modern tech stacks, mobile-first responsiveness, and pixel-perfect detail — built to the standards projects, without the bloat." },
        { icon: <MessageCircle />, title: "End-to-End Management", description: "We handle everything — strategy, copy, design, dev, optimization, and launch. You stay focused on your business while we bring your site to life, fully done-for-you." },
    ];

    return (
        <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-black/30 border border-gray-700/50 backdrop-blur-xl rounded-3xl shadow-lg my-16">
            <header className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white">About Us</h2>
                <p className="mt-4 text-lg text-gray-400">Discover our unique strength and the distinctive value we offer.</p>
            </header>
            <div ref={obsRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 stagger-children ${isVisible ? 'is-visible' : ''}`}>
                {features.map((feature, index) => (
                   <TiltOnHover key={index} className="h-full" maxTilt={25}>
                        <div className="card-glow-border bg-gray-800/50 p-8 rounded-2xl group h-full flex flex-col" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="text-white mb-5 bg-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 shrink-0">
                                {React.cloneElement(feature.icon, { className: 'w-7 h-7' })}
                            </div>
                            <h3 className="font-semibold text-white text-xl mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed flex-grow">{feature.description}</p>
                        </div>
                    </TiltOnHover>
                ))}
            </div>
        </section>
    );
});
WinningEdgeSection.displayName = 'WinningEdgeSection';

// Brand Defining Hero Section
const BrandHeroSection = React.forwardRef(function BrandHeroSection(props, ref) {
    const slides = [
        { text: 'Frame 1: Brand Identity', bg: 'bg-yellow-100', color: 'text-yellow-900' },
        { text: 'Frame 2: Creative Vision', bg: 'bg-green-100', color: 'text-green-900' },
        { text: 'Frame 3: Customer Focus', bg: 'bg-blue-100', color: 'text-blue-900' }
    ];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 2500);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section ref={ref} className="bg-gray-900/50 backdrop-blur-xl py-28 px-4 my-16 border border-gray-700/50 rounded-3xl">
            <div className="max-w-7xl mx-auto">
                <h2 className="playfair-font text-center text-white text-5xl leading-tight font-normal max-w-4xl mx-auto">
                    Our Works: Brand Defining Hero Sections
                </h2>
                <div className="mt-8 flex justify-center gap-x-10 gap-y-4 flex-wrap max-w-4xl mx-auto text-base font-semibold text-gray-300">
                    {['Instant Brand Trust', 'High-Intent Engagement', 'Lead-Generating Layouts'].map(item => (
                        <div key={item} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-400" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-16 max-w-3xl mx-auto">
                    <TiltOnHover className="h-72" maxTilt={10} scale={1}>
                        <div className="relative h-full rounded-xl overflow-hidden shadow-2xl border-4 border-gray-700">
                            {slides.map((slide, index) => (
                                <div key={slide.text} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${slide.bg} ${index === current ? 'opacity-100' : 'opacity-0'}`}>
                                    <p className={`text-2xl font-bold italic ${slide.color}`}>{slide.text}</p>
                                </div>
                            ))}
                        </div>
                    </TiltOnHover>
                </div>
            </div>
        </section>
    );
});
BrandHeroSection.displayName = 'BrandHeroSection';


// Service Card Component with 3D Tilt
const ServiceCard = ({ service }) => {
  return (
    <TiltOnHover className="card-glow-border bg-gray-800/50 rounded-2xl p-8 shadow-lg flex flex-col group h-full">
      <div className="h-full flex flex-col">
        <h3 className="font-bold text-white text-xl mb-4">{service.title}</h3>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">{service.description}</p>
        <ul className="space-y-3 text-sm text-gray-300 mb-8">
          {service.details.map(detail => (
            <li key={detail} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <button data-cal-link="apex-review-bot-bbiocs/15min" className="mt-auto bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 text-center flex items-center justify-center gap-2 hover:bg-indigo-500 transition-colors duration-300">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </TiltOnHover>
  );
};
ServiceCard.displayName = 'ServiceCard';


// Services Section
const ServicesSection = React.forwardRef(function ServicesSection(props, ref) {
    const services = [
        { title: "Landing Page", color: "text-blue-400", details: ["Mobile responsive design", "SEO optimized", "Contact form integration"], description: "A single, high-impact page designed to capture leads and drive conversions, built from scratch to production in 7-10 days." },
        { title: "Multi-Page Website", color: "text-purple-400", details: ["Up to 5 custom pages", "CMS integration", "Advanced animations"], description: "A multi-page site to showcase your brand and services in detail, built from scratch to production in 2-3 weeks." },
        { title: "Website Design", color: "text-green-400", details: ["UI/UX Design", "Prototyping & Wireframing", "Brand Style Guides"], description: "Stunning, modern website designs that capture your brand's essence and provide an amazing user experience." },
    ];

    const [obsRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section ref={ref} className="py-24 px-6 max-w-7xl mx-auto">
            <h2 className="text-center font-extrabold text-4xl sm:text-5xl mb-4 text-white">Choose Your Perfect Plan</h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">High-quality services to elevate your business, designed to fit your needs and budget.</p>
            <div ref={obsRef} className={`grid grid-cols-1 md:grid-cols-3 gap-10 stagger-children ${isVisible ? 'is-visible' : ''}`}>
                {services.map((service, index) => (
                    <div key={service.title} style={{ animationDelay: `${index * 150}ms` }}>
                        <ServiceCard service={service} />
                    </div>
                ))}
            </div>
        </section>
    );
});
ServicesSection.displayName = 'ServicesSection';

// Gemini AI Project Planner
const GeminiProjectPlanner = () => {
    const [idea, setIdea] = useState('');
    const [plan, setPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGeneratePlan = async () => {
        if (!idea) {
            setError('Please enter a project idea.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setPlan(null);

        // Simulate testing phase
        setTimeout(() => {
            setError("This feature is currently in the testing phase. Please check back later!");
            setIsLoading(false);
            setTimeout(() => setError(null), 4000); // Clear message after 4s
        }, 1500);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <header className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white flex items-center justify-center gap-4">
                    <Sparkles className="w-10 h-10 text-indigo-400"/>
                    Plan Your Project With AI
                </h2>
                <p className="mt-4 text-lg text-gray-400">Got an idea? Let our Own Ai draft a plan to get you started.</p>
            </header>
            <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <textarea
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="e.g., A mobile app for dog walkers..."
                        className="w-full h-24 sm:h-auto bg-gray-800/50 border border-gray-700 text-white rounded-lg p-4 resize-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <button
                        onClick={handleGeneratePlan}
                        disabled={isLoading}
                        className="bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                           <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        ) : (
                           <BrainCircuit className="w-5 h-5"/>
                        )}
                        <span>{isLoading ? 'Generating...' : '✨ Generate Plan'}</span>
                    </button>
                </div>
                {error && <p className="text-amber-400 mt-4 text-center">{error}</p>}
            </div>
        </section>
    )
};
GeminiProjectPlanner.displayName = 'GeminiProjectPlanner';


// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black text-slate-400 py-20 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
                <ApexLogo className="w-6 h-6" />
                Apex Studio
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-xs text-sm">Building successful digital products through innovation and expertise.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Website Design</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Maintenance</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
               <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
               <li><a href="#" className="hover:text-indigo-400 transition-colors">Portfolio</a></li>
               <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
               <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-3 text-sm">
               <li><a href="https://x.com/Apexstudio_labs" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
               <li><a href="mailto:contact@apexservices.store" className="hover:text-indigo-400 transition-colors">contact@apexservices.store</a></li>
               <li><a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a></li>
               <li><a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-slate-800 mt-16 mb-8" />
        <p className="text-center text-slate-500 text-sm">© {new Date().getFullYear()} Apex Studio. All rights reserved.</p>
      </div>
    </footer>
  );
};
Footer.displayName = 'Footer';


// Floating Call Button
const FloatingCallButton = () => {
  return (
    <button data-cal-link="apex-review-bot-bbiocs/15min" className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-500 transition-colors duration-300 z-50">
      <Calendar className="h-6 w-6" />
    </button>
  );
};
FloatingCallButton.displayName = 'FloatingCallButton';

const Page = () => {
  return (
    <>
      <App />
    </>
  );
};

export default Page;
