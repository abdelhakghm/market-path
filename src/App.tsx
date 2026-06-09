import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  MapPin, 
  Cpu, 
  LineChart, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  Mail, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Sparkles, 
  Clock, 
  Target, 
  ShieldCheck, 
  Check, 
  Zap, 
  Plus, 
  HelpCircle, 
  Send,
  Building,
  DollarSign,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  whyMarketPath,
  services,
  pricingPackages,
  guarantees,
  processSteps,
  testimonials,
  faqs,
  Service,
  PricingPackage
} from "./data";

export default function App() {
  // Navigation & Scroll states
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Interactive Services Selection
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);

  // Pricing Prepay discount state
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "quarterly">("monthly");

  // Custom Pricing Simulator State
  const [simulatedPlatforms, setSimulatedPlatforms] = useState<string[]>(["meta", "instagram"]);
  const [simulatedReelsCount, setSimulatedReelsCount] = useState<number>(8);
  const [simulatedGoogleMaps, setSimulatedGoogleMaps] = useState<boolean>(true);
  const [simulatedShoot, setSimulatedShoot] = useState<boolean>(false);

  // FAQ Expanded index state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Active Testimonial Index
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    businessName: "",
    sector: "retail",
    budget: "medium",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Track scrolling to toggle navbar glass backdrop and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      
      // Update header glass effect based on scroll position
      const sections = ["hero", "why-us", "services", "pricing", "guarantees", "how-it-works", "testimonials", "faq"];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format Pre-filled WhatsApp message based on form
  const getWhatsAppLink = () => {
    const text = `السلام عليكم ماركتباث (MarketPath)، أرغب في حجز الاستشارة المجانية المخصصة لمشروعي.\n\n*الاسم:* ${bookingForm.name}\n*رقم الهاتف:* ${bookingForm.phone}\n*اسم الشركة:* ${bookingForm.businessName}\n*النشاط التجاري:* ${bookingForm.sector}\n*الميزانية الإعلانية المتوقعة:* ${bookingForm.budget}\n*الرسالة:* ${bookingForm.message || "لا توجد رسالة مخصصة، أود مناقشة خطة النمو بالتفصيل."}`;
    return `https://wa.me/213554316928?text=${encodeURIComponent(text)}`;
  };

  // Simulate Booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleOpenBooking = (packageId?: string) => {
    if (packageId) {
      const selectedPkg = pricingPackages.find(p => p.id === packageId);
      setBookingForm(prev => ({
        ...prev,
        message: `أرغب بالتسجيل والاستفسار عن باقة: ${selectedPkg?.nameAr} (${selectedPkg?.nameEn})`
      }));
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setIsSubmitted(false);
    setBookingForm({
      name: "",
      phone: "",
      email: "",
      businessName: "",
      sector: "retail",
      budget: "medium",
      message: ""
    });
  };

  // Dynamic custom simulator price calculation for DA/Month
  const calculateCustomPrice = () => {
    let base = 35000; // Base strategy & setup cost in DA
    
    // Video rates
    base += simulatedReelsCount * 4500; // 4500 DA per professional Reel (planning + editing)
    
    // Platform rates
    base += (simulatedPlatforms.length - 1) * 12000; // 12,000 DA extra per social network beyond 1st
    
    // Add-on maps optimization
    if (simulatedGoogleMaps) {
      base += 10000;
    }
    
    // Raw site video production shoot day
    if (simulatedShoot) {
      base += 30000;
    }

    return base;
  };

  return (
    <div className="min-h-screen text-slate-100 bg-[#060709] relative overflow-hidden selection:bg-brand-gold selection:text-black">
      {/* Background Decorative Grid Overlays & Glowing Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[140px]" />
        <div className="absolute top-[30%] left-[-20%] w-[700px] h-[700px] rounded-full bg-brand-orange/5 blur-[160px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[150px]" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.015) 1px, transparent 1px)", 
          backgroundSize: "40px 40px" 
        }} />
      </div>

      {/* Floating Modern Header / Navbar */}
      <header className="fixed top-4 left-4 right-4 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 rounded-full border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-brand-gold via-brand-gold-200 to-brand-gold-600 bg-clip-text text-transparent flex items-center gap-1.5">
              Market<span className="text-sky-100">Path</span>
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[9px] font-bold rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
              وكالة رقمية جزائرية
            </span>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <a 
              href="#why-us" 
              className={`px-3.5 py-2 rounded-full transition-all ${activeSection === "why-us" ? "text-brand-gold bg-white/5" : "hover:text-brand-gold-200 hover:bg-white/5"}`}
            >
              لماذا نحن؟
            </a>
            <a 
              href="#services" 
              className={`px-3.5 py-2 rounded-full transition-all ${activeSection === "services" ? "text-brand-gold bg-white/5" : "hover:text-brand-gold-200 hover:bg-white/5"}`}
            >
              خدماتنا
            </a>
            <a 
              href="#pricing" 
              className={`px-3.5 py-2 rounded-full transition-all ${activeSection === "pricing" ? "text-brand-gold bg-white/5" : "hover:text-brand-gold-200 hover:bg-white/5"}`}
            >
              الباقات المدروسة
            </a>
            <a 
              href="#guarantees" 
              className={`px-3.5 py-2 rounded-full transition-all ${activeSection === "guarantees" ? "text-brand-gold bg-white/5" : "hover:text-brand-gold-200 hover:bg-white/5"}`}
            >
              ضماناتنا الذهبية
            </a>
            <a 
              href="#how-it-works" 
              className={`px-3.5 py-2 rounded-full transition-all ${activeSection === "how-it-works" ? "text-brand-gold bg-white/5" : "hover:text-brand-gold-200 hover:bg-white/5"}`}
            >
              آلية العمل
            </a>
            <a 
              href="#testimonials" 
              className={`px-3.5 py-2 rounded-full transition-all ${activeSection === "testimonials" ? "text-brand-gold bg-white/5" : "hover:text-brand-gold-200 hover:bg-white/5"}`}
            >
              أراء شركائنا
            </a>
            <a 
              href="#faq" 
              className={`px-3.5 py-2 rounded-full transition-all ${activeSection === "faq" ? "text-brand-gold bg-white/5" : "hover:text-brand-gold-200 hover:bg-white/5"}`}
            >
              الأسئلة الشائعة
            </a>
          </nav>

          {/* Consultation CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleOpenBooking()}
              id="header_cta_btn"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold bg-gradient-to-l from-brand-gold to-brand-gold-600 hover:brightness-110 text-black shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/20 active:scale-[0.98] transition-all"
            >
              احجز استشارتك المجانية
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              id="mobile_menu_toggle_btn"
              className="lg:hidden p-2 rounded-full border border-white/5 hover:bg-white/5 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-6 rounded-2xl border border-white/5 bg-slate-950/95 backdrop-blur-2xl shadow-2xl glow-gold"
          >
            <nav className="flex flex-col gap-3 font-semibold text-slate-300 text-center">
              <a 
                href="#why-us" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 hover:text-brand-gold transition-colors"
              >
                لماذا نحن؟
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 hover:text-brand-gold transition-colors"
              >
                خدماتنا
              </a>
              <a 
                href="#pricing" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 hover:text-brand-gold transition-colors"
              >
                الباقات المدروسة
              </a>
              <a 
                href="#guarantees" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 hover:text-brand-gold transition-colors"
              >
                ضماناتنا الذهبية
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 hover:text-brand-gold transition-colors"
              >
                آلية العمل
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 hover:text-brand-gold transition-colors"
              >
                أراء شركائنا
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 hover:text-brand-gold transition-colors"
              >
                الأسئلة الشائعة
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section — Premium Landing Banner */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tagline / Sub-badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-xs sm:text-sm font-bold mb-6"
          >
            <Sparkles size={14} className="text-brand-gold animate-pulse" />
            <span>نحوّل صفحات تواصلكم وأرقام خرائطكم إلى قنوات تدفق للمبيعات</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.15] mb-6"
          >
            نصنع مساراً فريداً لـ{" "}
            <span className="bg-gradient-to-r from-brand-gold via-brand-gold-200 to-brand-gold-600 bg-clip-text text-transparent">
              نمو شركتك الرقمية
            </span>{" "}
            في الجزائر
          </motion.h1>

          {/* Tagline / Agency Positioning */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            نحن وكالة <strong className="text-brand-gold font-bold">MarketPath</strong> للتسويق المباشر وصناعة الفيديوهات. نساعد المشاريع والشركات الجزائرية في تجسيد حضور استثنائي، وإطلاق إعلانات <span className="text-brand-gold font-semibold text-xs sm:text-sm">Meta Ads</span> حاسمة، والسيطرة على نتائج بحث خرائط جوجل بمقراتهم لتضاعف التدفق الحقيقي لعملائك ومبيعاتك.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16"
          >
            <button 
              onClick={() => handleOpenBooking()}
              id="hero_cta_booking_btn"
              className="w-full sm:w-auto px-8 py-4 sm:px-10 rounded-full font-bold text-base bg-gradient-to-l from-brand-gold to-brand-gold-600 hover:brightness-110 text-black shadow-xl shadow-brand-gold/20 animate-shimmer hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              احجز استشارتك المجانية
              <ArrowLeft size={18} />
            </button>
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base border border-white/10 hover:border-brand-gold/30 bg-slate-950/30 hover:bg-slate-950/60 text-slate-200 hover:text-brand-gold transition-all flex items-center justify-center gap-2"
            >
              اكتشف باقاتنا
            </a>
          </motion.div>
        </div>

        {/* Dynamic Agency KPI Metric Showcase Dashboard mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-2xl border border-white/5 bg-slate-950/40 p-1 backdrop-blur-md shadow-2xl glow-gold"
        >
          <div className="rounded-xl overflow-hidden glass-panel border border-white/5 p-4 sm:p-6 md:p-8">
            {/* Mock Dashboard Top Control Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-4 sm:pb-6 mb-6 sm:mb-8 gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-1.5">
                  لوحة الأداء الحية لشركاء ماركتباث بالجزائر
                  <span className="text-[10px] font-mono text-slate-500 tracking-wider">LIVE DATA</span>
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Clock size={12} className="text-brand-gold" />
                <span>آخر تحديث: اليوم، {new Date().toLocaleDateString('ar-dz')}</span>
              </div>
            </div>

            {/* Micro Live metrics widgets inside the mockup */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-right">
              <div className="p-4 sm:p-5 rounded-2xl border border-brand-orange/10 bg-brand-orange/5 hover:border-brand-orange/25 transition-all">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="p-2 rounded-xl bg-brand-orange/10 text-brand-orange"><TrendingUp size={16} /></span>
                  <span className="text-[10px] font-semibold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/20">ROAS متوسط</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">4.8x</div>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1">عائد الاستثمار الإعلاني المباشر</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-brand-gold/15 bg-brand-gold/5 hover:border-brand-gold/30 transition-all">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="p-2 rounded-xl bg-brand-gold/10 text-brand-gold"><MessageSquare size={16} /></span>
                  <span className="text-[10px] font-semibold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">جاهز للتواصل</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">450K+</div>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1">رسالة واستفسار تم توليدها للزبائن</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-white/5 bg-slate-900/20 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="p-2 rounded-xl bg-slate-800/55 text-slate-300"><Cpu size={16} /></span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-950/30 px-2 py-0.5 rounded border border-white/10">الفيديوهات</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">1,200+</div>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1">فيديو Reel ومحتوى قصير ممنتج</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-white/5 bg-slate-900/20 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="p-2 rounded-xl bg-slate-800/55 text-slate-300"><MapPin size={16} /></span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-950/30 px-2 py-0.5 rounded border border-white/10">خرائط محلية</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">92%</div>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1">نسبة ظهور بطاقات العملاء بالثلث الأكثر طلباً</p>
              </div>
            </div>

            {/* Tiny live note badge footer */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right text-[11px] text-slate-500">
              <p>نعمل بجهد وثبات لنمنح الشركات الجزائرية الحجم الذي تستحقه. لا نعتمد حلول الأوتوميشن العشوائي، بل نصنع عملاً أصيلاً.</p>
              <div className="flex items-center gap-1.5 font-bold text-brand-gold/80">
                <CheckCircle2 size={12} />
                <span>متوافق كلياً مع قوانين التجارة الإلكترونية الجزائرية</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why MarketPath Section — Values Case */}
      <section id="why-us" className="py-20 md:py-28 border-t border-white/5 relative bg-[#090a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header text */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1 rounded-full border border-brand-gold/25 bg-brand-gold/5 text-brand-gold text-xs sm:text-sm font-bold tracking-wider inline-block mb-4">
              منهجية الفوز بالعميل
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              لماذا تثق في <span className="bg-gradient-to-r from-brand-gold to-brand-gold-600 bg-clip-text text-transparent">MarketPath</span> لتغيير مسار مشروعك?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
              السوق الجزائري يمر بقفزة رقمية كبرى. المتابع والزبون الجزائري أصبح أذكى ويبحث عن الثقة والمهنية العالية قبل اتخاذ القرار. إليك كيف نضمن تميزك:
            </p>
          </div>

          {/* Grid of 4 value props */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyMarketPath.map((prop, idx) => {
              // Map icons to actual visual icon
              let iconComponent = <TrendingUp className="text-brand-gold" size={24} />;
              if (prop.iconName === "MapPin") iconComponent = <MapPin className="text-brand-gold" size={24} />;
              if (prop.iconName === "Cpu") iconComponent = <Cpu className="text-brand-gold" size={24} />;
              if (prop.iconName === "LineChart") iconComponent = <LineChart className="text-brand-gold" size={24} />;

              return (
                <div 
                  key={prop.id}
                  className="p-6 rounded-2xl border border-white/5 bg-slate-950/30 hover:border-brand-gold/20 hover:bg-slate-950/60 active:scale-[0.99] transition-all duration-300 group shadow-lg flex flex-col items-start text-right"
                >
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 mb-6 group-hover:border-brand-gold/20 group-hover:bg-brand-gold/10 transition-colors">
                    {iconComponent}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-3 group-hover:text-brand-gold transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Value props extra hook for immediate connection */}
          <div className="mt-12 p-6 rounded-2xl glass-panel border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-right">
            <div>
              <h4 className="font-bold text-base text-white mb-1 flex items-center gap-2">
                <Award size={18} className="text-brand-gold" />
                نهتم بـ مبيعاتك تماماً وكأننا شركاء بالنتيجة
              </h4>
              <p className="text-xs text-slate-400">نحن لا نختبئ خلف تقارير 'الوصول' المعقدة. إذا كانت إعلاناتنا لا تجذب هاتفاً يرن أو رسالة تطلب الشراء، فنحن نعتبر حملتنا فاشلة ونعمل فوراً لتغييرها.</p>
            </div>
            <button 
              onClick={() => handleOpenBooking()}
              id="why_us_cta_btn"
              className="whitespace-nowrap px-6 py-3 rounded-full text-xs font-extrabold bg-white hover:bg-brand-gold hover:text-black text-black active:scale-[0.97] transition-all"
            >
              افحص حالة مشروعك الآن مجاناً
            </button>
          </div>

        </div>
      </section>

      {/* Services Section — Detailed Showcase tabs */}
      <section id="services" className="py-20 md:py-28 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section banner text */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-brand-orange/25 bg-brand-orange/5 text-brand-orange text-xs sm:text-sm font-bold tracking-wider inline-block mb-4">
              منظومات الخدمة الشاملة
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              خدمات متكاملة تأخذ بيدك نحو الحصاد والسيادة الرقمية
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              لا تبدد ميزانية متجرك بتجربة فريلانسرز (معلقين) لا يتحملون المسؤولية. نحن نقدم لك فريقاً كاملاً يعمل بذكاء ودقة متناهية.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Sidebar of tabs */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <h4 className="text-slate-500 font-bold text-xs tracking-widest uppercase mb-2">تصفح ركائز خدماتنا:</h4>
              {services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  id={`service_tab_${srv.id}`}
                  className={`p-4 rounded-xl text-right border transition-all flex items-center justify-between pointer duration-200 ${selectedServiceId === srv.id ? "bg-slate-950 border-brand-gold/40 text-brand-gold shadow-md shadow-brand-gold/5" : "bg-slate-950/40 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"}`}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-bold text-sm sm:text-base">{srv.titleAr}</span>
                    <span className="text-[10px] font-mono opacity-60 uppercase">{srv.titleEn}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300">
                    {srv.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Right details content pane (animated) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {services.map((srv) => {
                  if (srv.id !== selectedServiceId) return null;

                  return (
                    <motion.div
                      key={srv.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-brand-gold/20 flex flex-col text-right relative min-h-[420px]"
                    >
                      {/* Accent gold top border decoration */}
                      <div className="absolute top-0 right-10 left-10 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 border-b border-white/5 pb-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-white">{srv.titleAr}</h3>
                          <p className="text-xs text-brand-gold font-mono mt-0.5">{srv.titleEn}</p>
                        </div>
                        <span className="px-3.5 py-1 text-xs font-bold rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                          {srv.badge}
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        {srv.description}
                      </p>

                      <div className="mt-auto">
                        <h4 className="font-bold text-xs sm:text-sm text-brand-gold flex items-center gap-1.5 mb-4">
                          <CheckCircle2 size={14} />
                          ما ستحصل عليه في نهاية المطاف (مخرجات واضحة):
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {srv.deliverables.map((item, index) => (
                            <div key={index} className="flex items-start gap-2.5 bg-slate-900/45 p-3 rounded-xl border border-white/5 hover:border-white/10">
                              <span className="text-brand-gold mt-1"><Check size={14} /></span>
                              <span className="text-xs sm:text-sm text-slate-300 font-medium">{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/5">
                          <button
                            onClick={() => handleOpenBooking()}
                            id="service_inquire_btn"
                            className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-l from-brand-gold to-brand-gold-600 hover:brightness-110 text-black active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                          >
                            احجز باقتك في {srv.titleAr}
                            <ArrowLeft size={16} />
                          </button>
                          <span className="text-[10px] sm:text-xs text-slate-500 text-center">
                            * يتوفر كخدمة مستقلة أو مدمجاً بخصومات داخل باقات الاستمرار.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Packages Section — Simple Side-by-Side Pricing layout */}
      <section id="pricing" className="py-20 md:py-28 border-t border-white/5 relative bg-[#090a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-brand-gold/25 bg-brand-gold/5 text-brand-gold text-xs sm:text-sm font-bold tracking-wider inline-block mb-4">
              الأسعار والاستثمارات
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              باقات شهرية واضحة ومدروسة تناسب موازنات النمو
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              لا توجد تكاليف خفية أو مفاجآت في الفاتورة. اشتراكات شهرية مرنة وبسيطة مع تسليم مخرجات حقيقية مضمونة ومبنية بالنتائج.
            </p>

            {/* Billing Period Toggle */}
            <div className="mt-8 inline-flex items-center gap-1.5 p-1 rounded-full border border-white/5 bg-slate-950">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${billingPeriod === "monthly" ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/10" : "text-slate-400 hover:text-slate-200"}`}
              >
                شهراً بشهر (مرن كلياً)
              </button>
              <button
                onClick={() => setBillingPeriod("quarterly")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${billingPeriod === "quarterly" ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/10" : "text-slate-400 hover:text-slate-200"}`}
              >
                <span>الاشتراك الربع السنوي</span>
                <span className="px-1.5 py-0.5 text-[9px] font-black rounded bg-brand-orange text-white animate-pulse">وفر ١٥٪</span>
              </button>
            </div>
          </div>

          {/* Pricing cards grid - two cards side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch mb-20">
            {pricingPackages.map((pkg) => {
              // Calculate discounted price if quarterly
              const currentPriceNum = parseInt(pkg.price.replace(/,/g, ""));
              const finalPrice = billingPeriod === "quarterly" 
                ? Math.round(currentPriceNum * 0.85).toLocaleString("en-US")
                : pkg.price;

              return (
                <div
                  key={pkg.id}
                  className={`relative p-6 sm:p-10 rounded-3xl flex flex-col text-right transition-all duration-300 ${pkg.isPopular ? "glass-panel-gold border-brand-gold/40 glow-gold scale-[1.01] lg:-translate-y-2 z-10" : "glass-panel bg-slate-950/40 hover:border-white/15"}`}
                >
                  {/* Popular Highlight Tag */}
                  {pkg.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-brand-gold via-brand-gold-200 to-brand-gold-600 text-black tracking-wider uppercase shadow-xl flex items-center gap-1">
                      <Sparkles size={12} className="animate-spin" />
                      {pkg.badge}
                    </div>
                  )}

                  <div className="mb-6">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">{pkg.nameEn}</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">{pkg.nameAr}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed h-[60px] overflow-hidden">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="border-y border-white/5 py-6 mb-8 flex items-baseline justify-between">
                    <div>
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">{finalPrice}</span>
                      <span className="text-sm font-bold text-slate-400 ml-2">دج / {billingPeriod === "monthly" ? "شهرياً" : "شهرياً بنظام ربع سنوي"}</span>
                    </div>
                    {billingPeriod === "quarterly" && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                        وفرت {(currentPriceNum - Math.round(currentPriceNum * 0.85)).toLocaleString()} دج شهرياً
                      </span>
                    )}
                  </div>

                  {/* Features list */}
                  <div className="mb-10 flex-grow">
                    <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-4">أهم مخرجات الاشتراك المضمونة:</h4>
                    <div className="flex flex-col gap-4">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className={`p-0.5 rounded-full mt-1 ${pkg.isPopular ? "bg-brand-gold text-black" : "bg-slate-800 text-brand-gold"}`}>
                            <Check size={12} />
                          </span>
                          <span className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Guarantee hook inside card */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 mb-8 text-xs text-slate-400 leading-relaxed">
                    <strong className="text-brand-gold font-bold block mb-1">🛡️ هيكل الضمان المضمن:</strong>
                    {pkg.guarantee}
                  </div>

                  <div className="mt-auto">
                    <p className="text-[11px] text-slate-500 mb-4 text-center">باقة ممتازة لشركات: {pkg.perfectFor}</p>
                    <button
                      onClick={() => handleOpenBooking(pkg.id)}
                      id={`pricing_btn_${pkg.id}`}
                      className={`w-full py-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${pkg.isPopular ? "bg-gradient-to-l from-brand-gold to-brand-gold-600 text-black hover:brightness-110 shadow-lg shadow-brand-gold/10" : "border border-white/10 hover:border-brand-gold/40 hover:bg-slate-940 bg-slate-950/30 text-white"}`}
                    >
                      <span>ابدأ الاستثمار معنا الآن</span>
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Pricing Simulator Widget for Algerian Businessmen */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-white/5 bg-slate-950/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="text-center sm:text-right mb-8">
              <div className="inline-block px-3 py-1 rounded-full border border-brand-orange/20 bg-brand-orange/10 text-brand-orange text-xs font-bold mb-3">
                محاكي مخصص للتصميم الحر
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">هل تبحث عن باقة مفصلة حسب مقاس مؤسستك؟</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                استخدم جهاز استبيان الأسعار التفاعلي لتقدير الموازنة التقريبية لمتطلبات علامتك بالجزائر العاصمة والولايات الأخرى.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Controls */}
              <div className="md:col-span-7 flex flex-col gap-6 text-right">
                
                {/* Reels Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-bold text-slate-300">طموح الفيديوهات القصيرة (Reels / TikToks):</label>
                    <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 rounded border border-brand-gold/20">
                      {simulatedReelsCount} فيديو / شهرياً
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="30"
                    step="2"
                    value={simulatedReelsCount}
                    onChange={(e) => setSimulatedReelsCount(parseInt(e.target.value))}
                    className="w-full accent-brand-gold cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">تتضمن التخطيط السينمائي، التصوير (في العاصمة والوسط)، المونتاج والنشر.</span>
                </div>

                {/* Platforms selection */}
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-300 block mb-3">المنصات المطلوب نشر المحتوى والمبيعات بها:</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "instagram", name: "إنستغرام (Instagram)" },
                      { id: "meta", name: "فيسبوك (Facebook)" },
                      { id: "tiktok", name: "تيك توك (TikTok)" },
                      { id: "linkedin", name: "لينكد إن (LinkedIn)" }
                    ].map((platform) => {
                      const isChecked = simulatedPlatforms.includes(platform.id);
                      return (
                        <button
                          key={platform.id}
                          onClick={() => {
                            if (isChecked) {
                              if (simulatedPlatforms.length > 1) {
                                  setSimulatedPlatforms(simulatedPlatforms.filter(p => p !== platform.id));
                              }
                            } else {
                              setSimulatedPlatforms([...simulatedPlatforms, platform.id]);
                            }
                          }}
                          className={`p-3 rounded-xl border text-xs font-semibold text-right transition-all flex items-center justify-between cursor-pointer ${isChecked ? "bg-slate-900 border-brand-gold/30 text-brand-gold" : "bg-slate-950/40 border-white/5 hover:border-white/10 text-slate-400"}`}
                        >
                          <span>{platform.name}</span>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${isChecked ? "bg-brand-gold border-brand-gold text-black text-[10px] font-black" : "border-slate-600"}`}>
                            {isChecked && <Check size={10} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Add-ons checklists */}
                <div className="flex flex-col gap-3 pt-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-300">خيارات وخدمات متممة إضافية للشركات الجزائرية:</label>
                  
                  <div 
                    onClick={() => setSimulatedGoogleMaps(!simulatedGoogleMaps)}
                    className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 hover:border-white/10 cursor-pointer flex items-center justify-between text-right"
                  >
                    <div className="flex items-start gap-3">
                      <span className={`p-1.5 rounded-lg border text-brand-gold ${simulatedGoogleMaps ? "bg-brand-gold/10 border-brand-gold/30" : "bg-slate-900 border-white/5"}`}><MapPin size={16} /></span>
                      <div className="flex flex-col items-start text-right">
                        <span className="text-xs sm:text-sm font-bold text-white">ضبط وتصدر محرك البحث بخرائط جوجل (Local SEO)</span>
                        <span className="text-[10px] text-slate-400">جمع التقييمات التلقائي وتحسين خرائط الجزائر. (+10k دج)</span>
                      </div>
                    </div>
                    <span className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${simulatedGoogleMaps ? "bg-brand-gold border-brand-gold text-black text-[12px] font-bold" : "border-slate-600"}`}>
                      {simulatedGoogleMaps && <Check size={12} />}
                    </span>
                  </div>

                  <div 
                    onClick={() => setSimulatedShoot(!simulatedShoot)}
                    className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 hover:border-white/10 cursor-pointer flex items-center justify-between text-right"
                  >
                    <div className="flex items-start gap-3">
                      <span className={`p-1.5 rounded-lg border text-brand-gold ${simulatedShoot ? "bg-brand-gold/10 border-brand-gold/30" : "bg-slate-900 border-white/5"}`}><Cpu size={16} /></span>
                      <div className="flex flex-col items-start text-right">
                        <span className="text-xs sm:text-sm font-bold text-white">يوم تصوير إنتاجي كامل مخصص (مقركم بالميدان)</span>
                        <span className="text-[10px] text-slate-400">حضور فريق ومعدات وكاميرا سينمائية للتغطية. (+30k دج)</span>
                      </div>
                    </div>
                    <span className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${simulatedShoot ? "bg-brand-gold border-brand-gold text-black text-[12px] font-bold" : "border-slate-600"}`}>
                      {simulatedShoot && <Check size={12} />}
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Output Dashboard display for simulated price in DA */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900 border border-white/5 flex flex-col justify-between text-center md:text-right sticky top-24">
                <div>
                  <span className="text-xs font-bold text-brand-gold block mb-2 uppercase tracking-wide">التقدير المقترح المتوقع</span>
                  <h4 className="font-extrabold text-base sm:text-lg text-white mb-2">النظام المخصص لعلامتكم الرقمية</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                    بناءً على تفضيلاتكم، تم احتساب استثمار عادل يشمل صياغة الاستراتيجية والمخرجات والشروع في الإنشاء.
                  </p>
                </div>

                <div className="border-y border-white/5 py-6 mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-brand-gold">{calculateCustomPrice().toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-400 block mt-1.5">دينار جزائري (دج) / شهرياً تقديراً</span>
                </div>

                <div className="text-[10px] text-slate-400 leading-relaxed mb-6">
                  <span className="text-brand-gold inline-block ml-1">✓</span>
                  تلتزم هذه الموازنة التقديرية بالضمانات الذهبية المكتوبة لماركتباث الجزائر لضمان تطلعكم.
                </div>

                <button
                  onClick={() => {
                    setBookingForm(prev => ({
                      ...prev,
                      message: `أود مناقشة الباقة المخصصة المحسوبة:\n- Reels: ${simulatedReelsCount}\n- Platforms: ${simulatedPlatforms.join(", ")}\n- Local SEO: ${simulatedGoogleMaps ? "YES" : "NO"}\n- Physical Shoot: ${simulatedShoot ? "YES" : "NO"}\n- Estimated Rate: ${calculateCustomPrice().toLocaleString()} DA/month`
                    }));
                    setIsBookingOpen(true);
                  }}
                  id="simulator_quote_btn"
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-l from-brand-gold to-brand-gold-600 text-black hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  اطلب تسعيرة رسمية استناداً لهذا
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Guarantee Section — Solid, safe structure */}
      <section id="guarantees" className="py-20 md:py-28 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section banner text */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-orange-500/25 bg-orange-950/30 text-orange-400 text-xs sm:text-sm font-bold tracking-wider inline-block mb-4">
              الضمانات الذهبية المحققة
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              نزيل كل المخاطر من على عاتقك بـ الضمان الثلاثي المدرع
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              الدفع مقابل خدمات التسويق في الجزائر كان يمثل قلقاً للملاك بسبب كثرة الوعود الزائفة. مع ماركتباث، كل دينار تضعه يقابله التزام قانوني متين وعادل.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((gt) => (
              <div 
                key={gt.id}
                className="p-6 sm:p-8 rounded-2xl glass-panel border border-amber-500/10 hover:border-amber-500/30 bg-slate-950/45 text-right relative overflow-hidden flex flex-col justify-between"
              >
                {/* Visual guarantee badge check overlay */}
                <div className="absolute top-4 left-4 text-amber-500/20">
                  <ShieldCheck size={52} />
                </div>

                <div className="mb-6 relative z-10">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wide font-bold">{gt.titleEn}</span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1 mb-4">{gt.titleAr}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {gt.description}
                  </p>
                </div>

                <div className="mt-auto p-4 rounded-xl bg-slate-900 border border-brand-gold/15 text-xs text-slate-400">
                  <strong className="text-brand-gold font-extrabold block mb-1">التعويض القانوني للعميل:</strong>
                  {gt.compensation}
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee stamp extra row */}
          <div className="mt-12 text-center max-w-lg mx-auto p-4 rounded-full border border-white/5 bg-slate-950/40 text-[11px] sm:text-xs text-slate-400 flex items-center justify-center gap-2">
            <Award size={14} className="text-brand-gold" />
            <span>نعمل بميثاق التميز وأقصى مستويات حماية مصالح وأموال العميل الجزائري</span>
          </div>

        </div>
      </section>

      {/* How It Works Section — Direct 3-step timeline */}
      <section id="how-it-works" className="py-20 md:py-28 border-t border-white/5 relative bg-[#090a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Title banner */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1 rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold text-xs sm:text-sm font-bold tracking-wider inline-block mb-4">
              دليلك للنمو
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              تبدأ من الحيرة، وتستقر عند النمو الشامل في ٣ خطوات فقط
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              لا نريد إشغال وقتك كصاحب عمل بالتعقيدات الفنية. لقد صممنا آلية بالغة العفوية والمرونة لتنفيذ حملاتك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {processSteps.map((step, idx) => (
              <div 
                key={step.id}
                className="relative p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 bg-slate-950/30 text-right hover:border-white/10 transition-colors flex flex-col justify-between"
              >
                {/* Behind timeline number */}
                <div className="absolute top-4 left-4 font-black text-4xl sm:text-5xl tracking-tight text-white/5 select-none font-mono">
                  {step.num}
                </div>

                <div className="relative z-10 mb-6">
                  <span className="px-2.5 py-0.5 text-[9px] font-mono text-brand-gold bg-brand-gold/10 border border-brand-gold/20 rounded font-bold uppercase">{step.timeframe}</span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-3 mb-4">{step.titleAr}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-auto border-t border-white/5 pt-4">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">المخرج الملموس لهذه المرحلة:</span>
                  <span className="text-xs text-brand-gold font-medium leading-relaxed">{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick steps connecting flow line backdrop for desktop only */}
          <div className="hidden md:block absolute top-[45%] left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />

        </div>
      </section>

      {/* Testimonials Section — Real Market Verification in Algeria */}
      <section id="testimonials" className="py-20 md:py-28 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1 rounded-full border border-brand-orange/25 bg-brand-orange/10 text-brand-orange text-xs sm:text-sm font-bold tracking-wider inline-block mb-4">
              نتائج ميدانية حية
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              شركاؤنا يتحدثون عن طعم الأرقام مع <span className="text-brand-gold">MarketPath</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              لا شيء أكثر بلاغة من مبيعات متحركة وأصحاب مشاريع كسروا جمود السوق وتصاعدت ثقتهم بمحيطهم.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {testimonials.map((test, index) => {
                if (index !== activeTestimonialIndex) return null;

                return (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 sm:p-10 rounded-3xl glass-panel-gold border-brand-gold/25 text-right relative flex flex-col md:flex-row gap-8 items-center"
                  >
                    {/* Big testimonial metric stat badge on left/top */}
                    <div className="md:w-1/3 flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-gold text-black text-center shadow-lg shadow-brand-gold/5 min-w-[180px]">
                      <span className="text-xs font-bold uppercase tracking-wider mb-2 text-black/60">تحول الأداء</span>
                      <span className="text-3xl sm:text-5xl font-black tracking-tight">{test.stat}</span>
                      <p className="text-xs font-extrabold mt-2 leading-tight text-slate-900">{test.statLabel}</p>
                    </div>

                    {/* Review content details */}
                    <div className="flex-1 text-right">
                      {/* Quote layout icon */}
                      <span className="text-6xl text-brand-gold/10 font-serif leading-none block absolute top-6 left-6 select-none">“</span>

                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/5 text-brand-gold">{test.businessType}</span>
                      <h3 className="text-xl font-bold text-white mt-2">{test.businessName}</h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin size={11} className="text-brand-orange" />
                        <span>{test.location}</span>
                      </p>

                      <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed my-6 italic">
                        "{test.quote}"
                      </p>

                      <div className="border-t border-white/5 pt-4">
                        <span className="text-[10px] sm:text-xs text-slate-400 block font-bold">الإنجاز المباشر:</span>
                        <span className="text-xs sm:text-sm text-brand-gold font-medium">{test.achievement}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Testimonials controls pagination dots */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonialIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${activeTestimonialIndex === idx ? "w-8 bg-brand-gold" : "w-2 bg-slate-800 hover:bg-slate-700"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQs Section — Interactive Accordion */}
      <section id="faq" className="py-20 md:py-28 border-t border-white/5 relative bg-[#090a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section banner text */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold text-xs sm:text-sm font-bold tracking-wider inline-block mb-4">
              إزالة الغموض والتساؤلات
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              كل ما قد يجول في خاطرك عن خدمات إدارة السوشل ميديا بالجزائر
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              نحن نحب الوضوح. أجبنا هنا على الأسئلة الشائعة التي نتلقاها من أصحاب المصانع والمحلات والتجارة الإلكترونية الجزائرية.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {faqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-white/5 bg-slate-950/45 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-right font-extrabold text-xs sm:text-sm md:text-base text-white hover:text-brand-gold transition-colors cursor-pointer gap-4"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded bg-slate-900 border border-white/5 text-brand-gold">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/5 bg-slate-950/20"
                      >
                        <p className="p-5 sm:p-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA / Contact Section — Direct Interactive Booking Trigger */}
      <section id="contact" className="py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
        {/* Colorful visual backdrop accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-brand-gold/5 to-brand-orange/5 blur-[120px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="p-8 sm:p-14 rounded-3xl glass-panel-gold border-brand-gold/25 text-center relative overflow-hidden flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold text-xs font-bold mb-6">
              <Zap size={14} className="text-brand-gold animate-pulse" />
              <span>لا تدع منافسيك يلتهمون حصة السوق!</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              جاهز لحبس الأنفاس والبدء في تصاعد حقيقي؟
            </h2>
            
            <p className="text-slate-350 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
              احجز استشارتك المجانية غير الملزمة التي تبلغ مدتها ٢٠ دقيقة الآن مع أحد خبرائنا بالجزائز. سنفحص وضعيتك الحالية ونمنحك ٣ نصائح مباشرة للتنفيذ فوراً.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <button
                onClick={() => handleOpenBooking()}
                id="contact_action_booking_btn"
                className="w-full sm:w-auto px-8 py-4 sm:px-10 rounded-full font-bold text-base bg-gradient-to-l from-brand-gold to-brand-gold-600 text-black hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-brand-gold/10"
              >
                اصنع مسار نموك الآن
                <ArrowLeft size={18} />
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/5 pt-8 w-full text-slate-400 text-xs">
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Phone size={14} className="text-brand-gold" />
                <a href="tel:+213554316928">+213 (0) 554 31 69 28</a>
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Mail size={14} className="text-brand-gold" />
                <a href="mailto:hello@marketpath.dz">hello@marketpath.dz</a>
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-gold" />
                <span>الجزائر العاصمة (Algiers, Algeria)</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Human, elegant Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950/60 text-slate-400 text-xs text-right relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-right">
            <span className="text-xl font-black bg-gradient-to-r from-brand-gold via-brand-gold-300 to-brand-gold bg-clip-text text-transparent">
              MarketPath
            </span>
            <p className="text-[11px] text-slate-500">منظومة رقمية شاملة مكرَّسة لتميز ونمو الشركات والمشاريع بالجزائر.</p>
          </div>

          {/* Core sitemap links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-slate-400">
            <a href="#why-us" className="hover:text-brand-gold transition-colors">لماذا نحن</a>
            <a href="#services" className="hover:text-brand-gold transition-colors">الخدمات</a>
            <a href="#pricing" className="hover:text-brand-gold transition-colors">الباقات</a>
            <a href="#guarantees" className="hover:text-brand-gold transition-colors">الضمان الحصين</a>
            <a href="#faq" className="hover:text-brand-gold transition-colors">الأسئلة</a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-left">
            <p className="text-[11px] text-slate-500">© {new Date().getFullYear()} MarketPath. جميع الحقوق محفوظة.</p>
            <p className="text-[9px] text-slate-600 font-mono">CRAFTED FOR ALGERIAN LEADING BRANDS</p>
          </div>

        </div>
      </footer>

      {/* Modern, beautiful multi-step, fully interactive Consultation Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Glass Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseBooking}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal main sheet */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl rounded-3xl border border-brand-gold/20 bg-slate-900 shadow-2xl overflow-hidden glass-panel text-right flex flex-col max-h-[90vh]"
            >
              {/* Gold gradient top highlight badge bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-gold via-brand-gold-300 to-brand-orange" />
              
              {/* Close pin */}
              <button
                onClick={handleCloseBooking}
                id="modal_close_btn"
                className="absolute top-4 left-4 p-2 rounded-full border border-white/5 bg-slate-950/40 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="p-6 sm:p-8 overflow-y-auto">
                {!isSubmitted ? (
                  <>
                    <div className="mb-6">
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-bold mb-2 inline-block">مستشار رقمي مخصص</span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">احجز استشارتك المجانية المخططة</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        املأ هذا الاستفتاء البسيط لنستعرض ونفحص صفحاتك ومعلومات شركتك بالجزائر قبل بدء المكالمة لنخرج بأكبر ميزة ممكنة لك.
                      </p>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">الاسم واللقب الشخصي:</label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: يونس بن رمضان"
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-slate-950 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-gold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">رقم الهاتف (WhatsApp مفضل):</label>
                          <input
                            type="tel"
                            required
                            placeholder="مثال: 0554316928"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-slate-950 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-gold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">البريد الإلكتروني المهني:</label>
                          <input
                            type="email"
                            required
                            placeholder="مثال: info@younes-store.dz"
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-slate-950 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-gold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">اسم العلامة التجارية / المحل / العيادة:</label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: الأنيق للأثاث"
                            value={bookingForm.businessName}
                            onChange={(e) => setBookingForm({ ...bookingForm, businessName: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-slate-950 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-gold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">قطاع النشاط الاقتصادي في الجزائر:</label>
                          <select
                            value={bookingForm.sector}
                            onChange={(e) => setBookingForm({ ...bookingForm, sector: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:border-brand-gold cursor-pointer"
                          >
                            <option value="retail">التجارة المحلية والمحلات (Retail/Local Showroom)</option>
                            <option value="ecommerce">التجارة الإلكترونية والتوصيل (E-commerce)</option>
                            <option value="medical">العيادات والخدمات الطبية والتجميلية (Clinics/Health)</option>
                            <option value="realestate">العقارات والإنشاءات والشريع الهندسية (Real Estate)</option>
                            <option value="education">التعليم والمدارس والمعاهد والتكوين المهني (Academy)</option>
                            <option value="industrial">المصانع والخدمات المؤسساتية (Industrial/B2B)</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">الميزانية التسويقية الشهرية المخططة:</label>
                          <select
                            value={bookingForm.budget}
                            onChange={(e) => setBookingForm({ ...bookingForm, budget: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:border-brand-gold cursor-pointer"
                          >
                            <option value="low">أقل من 30,000 دينار جزائري (مبتدئ جداً)</option>
                            <option value="medium">من 30,000 دج إلى 80,000 دج شهرياً</option>
                            <option value="high">من 80,000 دج إلى 150,000 دج شهرياً</option>
                            <option value="enterprise">أكثر من 150,000 دج شهرياً (نمو مكثف)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-300">تطلعات مخصصة أو حسابات تواصلكم الحالية (اختياري):</label>
                        <textarea
                          rows={3}
                          placeholder="مثال: نريد تحسين وزيادة مشاهدات الريلز على إنستقرام وتهيئة رابط خرائطنا لزيادة زوار المحل..."
                          value={bookingForm.message}
                          onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                          className="p-3 rounded-xl border border-white/5 bg-slate-950 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-gold resize-none"
                        />
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          id="modal_booking_submit_btn"
                          className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-l from-brand-gold to-brand-gold-600 hover:brightness-110 text-black active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-brand-gold/15"
                        >
                          {isSubmitting ? (
                            <span className="w-5 h-5 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                          ) : (
                            <>
                              <Send size={16} />
                              <span>تأكيد الحجز وبناء الملف المبدئي</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8 flex flex-col items-center justify-center leading-relaxed"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6 text-2xl font-bold animate-bounce">
                      ✓
                    </div>
                    <span className="px-3 py-1 rounded bg-emerald-950/20 text-emerald-400 text-xs font-black mb-2 inline-block border border-emerald-500/20">
                      تم الحفظ وبراز الملف التجاري بنجاح!
                    </span>
                    <h3 className="text-2xl font-black text-white mb-4">نشكر ثقتك البالغة في MarketPath، {bookingForm.name}!</h3>
                    
                    <p className="text-slate-300 text-xs sm:text-sm max-w-sm mb-8">
                      لقد استقبلنا بيانات علامتك التجارية <strong className="text-brand-gold font-bold">({bookingForm.businessName})</strong> بنجاح. سنباشر في تحضير وتدقيق بطاقتك الاستراتيجية خلال الأربع ساعات القادمة.
                    </p>

                    <div className="p-4 rounded-2xl bg-brand-gold/5 border border-brand-gold/25 max-w-md mb-8 text-right text-xs">
                      <strong className="text-brand-gold font-extrabold block mb-1 flex items-center gap-1.5">
                        <Zap size={14} className="animate-pulse" />
                        نصيحة ذهبية لتسريع المراجعة المباشرة:
                      </strong>
                      التواصل الفوري يسرع عملية اتخاذ القرار. ننصحك بالنقر على الزر المضيء أدناه لإرسال استبيانك مباشرة لمستشارنا الرقمي المناوب في الجزائر العاصمة الآن وبثقة.
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:flex-row items-center justify-center max-w-sm">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        id="whatsapp_direct_contact_btn"
                        className="w-full sm:w-auto flex-1 px-5 py-3.5 rounded-xl font-black text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/25 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare size={16} />
                        إرسال لفرع واتساب المناوب
                      </a>
                      <button
                        onClick={handleCloseBooking}
                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs text-slate-400 hover:text-white border border-white/5 hover:border-white/10 text-center font-bold"
                      >
                        إنهاء ومتابعة تصفح الموقع
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
