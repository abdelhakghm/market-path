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
  Briefcase,
  Utensils,
  Scissors,
  Dumbbell,
  Coffee,
  Stethoscope,
  ShoppingBag,
  Play,
  Lock,
  Activity,
  Layers,
  Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  whyMarketPath,
  services,
  pricingPackages,
  guarantees,
  processSteps,
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

  // FAQ Expanded index state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

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

  // Stats dynamically counting up on page load
  const [counters, setCounters] = useState({
    localBusinesses: 0,
    proPackages: 0,
    guaranteePercent: 0
  });

  useEffect(() => {
    let start = 0;
    const duration = 1200; // 1.2s
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        localBusinesses: Math.min(50, Math.round((50 / steps) * currentStep)),
        proPackages: Math.min(2, Math.round((2 / steps) * currentStep)),
        guaranteePercent: Math.min(100, Math.round((100 / steps) * currentStep))
      });
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Track scrolling to toggle active header indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sections = ["hero", "why-us", "services", "pricing", "guarantees", "how-it-works", "faq"];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
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
    return `https://wa.me/213558620107?text=${encodeURIComponent(text)}`;
  };

  // Simulate Booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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



  // Modern Problem Sectors List
  const painPoints = [
    {
      id: "waste",
      title: "هدر الميزانيات التسويقية",
      desc: "دفع أموال ضخمة على زر الترويج العشوائي في صفحة فيسبوك دون استقدام مبيعات حقيقية توازي تكلفة صرفكم.",
      icon: DollarSign
    },
    {
      id: "boring",
      title: "محتوى تقليدي غير جذاب",
      desc: "فيديوهات مكررة ومملة تفشل في لفت انتباه المستهلك الجزائري المستكشف خلال الـ 3 ثواني الأولى للتصفح.",
      icon: Play
    },
    {
      id: "dark",
      title: "غياب التقارير ومؤشرات الوضوح",
      desc: "تلقي أرقام وهمية معقدة عن 'الوصول' دون مكالمات تطلب الشراء أو تدفق حقيقي للزبائن بفرعكم.",
      icon: LineChart
    },
    {
      id: "delay",
      title: "رداءة التواصل ومواعيد النشر",
      desc: "التعامل مع صناع محتوى مستقلين غير ملتزمين بمواعيد النشر وجدولة الجودة، مما يفسد قوة تواصلكم الرقمي.",
      icon: Clock
    }
  ];

  // Animated Who It's For categories
  const sectors = [
    { id: "restaurants", name: "مطاعم ومحلات الأكل", desc: "تصوير ريفيلز يسيل اللعاب وإعلانات تدفق جياع.", icon: Utensils },
    { id: "salons", name: "صالونات ومراكز تجميل", desc: "عرض مهارات قصوى ورفع حثيث لجدولة حجوزاتكم.", icon: Scissors },
    { id: "gyms", name: "صالات رياضية ونوادي", desc: "طرق حثيثة لرفع نسبة اشتراكات اللياقة الشهرية.", icon: Dumbbell },
    { id: "cafes", name: "مقاهي وصالات طعام", desc: "أجواء دافئة وعروض مميزة تحول مقهاكم لمعلم مزار.", icon: Coffee },
    { id: "clinics", name: "عيادات ومراكز طبية", desc: "ترسيخ السمعة، وجلب حجوزات حقيقية باتصالات مباشرة.", icon: Stethoscope },
    { id: "retail", name: "متاجر تجزئة ومعارض مبيعات", desc: "نقل المهتمين من تصفح الشاشة إلى الشراء من المعرض.", icon: ShoppingBag }
  ];

  // Double Solution features 
  const saasFeatures = [
    "لوحة قياس وتحليل أداء المبيعات وسجل رسائل الإعلانات الحية.",
    "نظام تلقائي وذكي لتسهيل تلقي وبناء النجوم الخمس على خرائط جوجل.",
    "منظومة جمع وتوجيه لتسجيل استفسارات زواركم مباشرة لقاعدة مبيعاتكم.",
    "تحديث مستمر للبيانات وحاسبة ROI تفاعلية للميزانيات الإعلانية."
  ];

  const agencyFeatures = [
    "فريق إنتاج سينمائي ميداني مع تصوير فيديوهات قصيرة Reels احترافية.",
    "كتابة سيناريوهات مقنعة بدارجة جزائرية عصرية وموجهة للبيع المباشر.",
    "إطلاق وإشراف كامل لحملات Meta Ads عبر أنظمة مدير الإعلانات المتقدم.",
    "تحسين صدارة Local SEO وكتابة ردود مهنية ذكية للمراجعات."
  ];

  return (
    <div dir="rtl" className="min-h-screen text-slate-100 bg-[#0D0F14] relative overflow-hidden font-sans">
      
      {/* Background Tech Mesh and Blue Glow effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#2D6FE8]/10 blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] left-[-15%] w-[700px] h-[700px] rounded-full bg-[#2D6FE8]/8 blur-[160px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0" style={{ 
          backgroundImage: "radial-gradient(circle, rgba(45, 111, 232, 0.03) 1.2px, transparent 1.2px)", 
          backgroundSize: "32px 32px" 
        }} />
      </div>

      {/* Modern Fixed Navbar */}
      <header className="fixed top-4 left-4 right-4 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 rounded-full border border-white/5 bg-[#0D0F14]/80 backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center">
              <img 
                src="https://i.imgur.com/6zJ7owo.png" 
                alt="MarketPath" 
                className="h-9 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </a>
            <span className="hidden sm:inline-block px-3 py-1 text-[9px] font-bold rounded-full border border-[#2D6FE8]/20 bg-[#2D6FE8]/10 text-[#2D6FE8]">
              وكالة + منظومة رقمية جزائرية
            </span>
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 font-semibold text-xs text-slate-350">
            <a 
              href="#why-us" 
              className={`px-3 py-2 rounded-full transition-all ${activeSection === "why-us" ? "text-white bg-[#2D6FE8]/15 border border-[#2D6FE8]/25" : "hover:text-[#2D6FE8] hover:bg-white/5"}`}
            >
              لماذا نحن؟
            </a>
            <a 
              href="#services" 
              className={`px-3 py-2 rounded-full transition-all ${activeSection === "services" ? "text-white bg-[#2D6FE8]/15 border border-[#2D6FE8]/25" : "hover:text-[#2D6FE8] hover:bg-white/5"}`}
            >
              مخرجات خدماتنا
            </a>
            <a 
              href="#pricing" 
              className={`px-3 py-2 rounded-full transition-all ${activeSection === "pricing" ? "text-white bg-[#2D6FE8]/15 border border-[#2D6FE8]/25" : "hover:text-[#2D6FE8] hover:bg-white/5"}`}
            >
              الباقات الذكية
            </a>
            <a 
              href="#guarantees" 
              className={`px-3 py-2 rounded-full transition-all ${activeSection === "guarantees" ? "text-white bg-[#2D6FE8]/15 border border-[#2D6FE8]/25" : "hover:text-[#2D6FE8] hover:bg-white/5"}`}
            >
              ضماناتنا الذهبية
            </a>
            <a 
              href="#how-it-works" 
              className={`px-3 py-2 rounded-full transition-all ${activeSection === "how-it-works" ? "text-white bg-[#2D6FE8]/15 border border-[#2D6FE8]/25" : "hover:text-[#2D6FE8] hover:bg-white/5"}`}
            >
              آلية العمل
            </a>
            <a 
              href="#faq" 
              className={`px-3 py-2 rounded-full transition-all ${activeSection === "faq" ? "text-white bg-[#2D6FE8]/15 border border-[#2D6FE8]/25" : "hover:text-[#2D6FE8] hover:bg-white/5"}`}
            >
              الأسئلة الشائعة
            </a>
          </nav>

          {/* Head Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleOpenBooking()}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#2D6FE8] text-white hover:bg-[#2D6FE8]/90 transition-all shadow-lg hover:shadow-[#2D6FE8]/20"
            >
              احجز استشارة مجانية
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 rounded-full border border-white/5 hover:bg-white/5 text-slate-300"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-6 rounded-3xl border border-[#2D6FE8]/25 bg-[#0D0F14]/95 backdrop-blur-2xl shadow-2xl glow-blue"
          >
            <nav className="flex flex-col gap-2 font-bold text-slate-200 text-center text-sm">
              <a 
                href="#why-us" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-white/5 hover:text-[#2D6FE8]"
              >
                لماذا نحن؟
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-white/5 hover:text-[#2D6FE8]"
              >
                مخرجات خدماتنا
              </a>
              <a 
                href="#pricing" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-white/5 hover:text-[#2D6FE8]"
              >
                الباقات الذكية
              </a>
              <a 
                href="#guarantees" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-white/5 hover:text-[#2D6FE8]"
              >
                ضماناتنا الذهبية
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-white/5 hover:text-[#2D6FE8]"
              >
                آلية العمل
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 hover:text-[#2D6FE8]"
              >
                الأسئلة الشائعة
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION — Elegant centered layout */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-24 max-w-5xl mx-auto px-4 sm:px-6 z-10">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Main Text and Stats dynamic area */}
          <div className="flex flex-col items-center">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2D6FE8]/20 bg-[#2D6FE8]/10 text-xs font-bold text-[#2D6FE8] mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>🟢 نظام تسويق نشط في الجزائر</span>
            </div>

            {/* Arabic Headings in Two lines */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.2] mb-4">
              تسويق ذكي.
              <span className="block mt-1 bg-gradient-to-r from-[#2D6FE8] via-[#2D6FE8]/80 to-[#2D6FE8]/60 bg-clip-text text-transparent">
                نتائج حقيقية.
              </span>
            </h1>

            {/* Premium positioning subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mb-8">
              كما في الإرشادات: <strong className="text-white font-bold">MarketPath</strong> — نظام SaaS + وكالة متكاملة لجلب العملاء للأعمال المحلية في الجزائر
            </p>

            {/* CTA Dual Triggers */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full max-w-md mx-auto">
              <a 
                href="#pricing"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-center font-extrabold text-sm text-white bg-[#2D6FE8] hover:bg-[#2D6FE8]/90 transition-all shadow-lg hover:shadow-[#2D6FE8]/25"
              >
                اكتشف الباقات
              </a>
              <button 
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-center font-extrabold text-sm text-slate-200 border border-white/10 hover:border-[#2D6FE8]/40 bg-white/5 hover:bg-[#2D6FE8]/10 transition-all"
              >
                احجز استشارة مجانية
              </button>
            </div>

            {/* Stats count-up on load */}
            <div className="grid grid-cols-3 gap-8 sm:gap-16 border-t border-white/5 pt-8 w-full max-w-2xl text-center mx-auto">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#2D6FE8] font-mono select-none">
                  +{counters.localBusinesses}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-bold mt-1 block">نشاط تجاري محلي</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#2D6FE8] font-mono select-none">
                  {counters.proPackages}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-bold mt-1 block">باقة احترافية</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#2D6FE8] font-mono select-none">
                  {counters.guaranteePercent}٪
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-bold mt-1 block">ضمان التنفيذ</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PROBLEM SECTION — Why Us & Bottlenecks Card Grid */}
      <section id="why-us" className="py-20 md:py-24 border-t border-white/5 relative bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section titles */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/5 text-[#2D6FE8] text-xs font-bold tracking-wider inline-block mb-4">
              الفجوة الرقمية بالسوق الجزائري
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              لماذا تفشل الطرق التقليدية في تنمية أعمالكم؟
            </h2>
            <p className="text-sm text-slate-400 font-medium">
              بينما تتقدم خوارزميات الاستهداف في الجزائر، يشتكي الملاك من عدم جدوى الميزانيات وتكرار النماذج الباهتة. إليك الفجوة الحقيقية التي نصلحها:
            </p>
          </div>

          {/* Grid of 4 Problem card components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {painPoints.map((pain, idx) => {
              const PainIcon = pain.icon;
              return (
                <div 
                  key={pain.id}
                  className="p-6 rounded-2xl border border-white/5 bg-[#121620]/30 hover:border-[#2D6FE8]/30 hover:bg-[#121620]/60 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col text-right items-start"
                >
                  <div className="p-3 rounded-xl bg-[#121620] border border-white/5 text-[#2D6FE8] mb-5 group-hover:bg-[#2D6FE8]/10 group-hover:border-[#2D6FE8]/20 transition-all">
                    <PainIcon size={22} />
                  </div>
                  <h3 className="font-bold text-base text-white mb-2.5 group-hover:text-[#2D6FE8] transition-colors">
                    {pain.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {pain.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Value block conversion card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-[#2D6FE8]/20 bg-[#121620]/40 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-right">
            <div>
              <h4 className="font-bold text-base sm:text-lg text-white mb-2 flex items-center gap-2">
                <Award size={18} className="text-[#2D6FE8]" />
                نهتم بـ مبيعاتك الفعليه مثل الشركاء تماماً بالنتيجة
              </h4>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                نحن لا نختبئ خلف مصطلحات وصول معقدة أو لغة إعلانية جامدة. هدفنا الفعلي تقديم محتوى إبداعي وقنوات استهداف تقود الزبائن المباشرين لتدشين تعاقداتكم.
              </p>
            </div>
            <button 
              onClick={() => handleOpenBooking()}
              className="whitespace-nowrap px-6 py-3 rounded-full text-xs font-black bg-white hover:bg-[#2D6FE8] text-slate-900 hover:text-white active:scale-[0.98] transition-all shrink-0 shadow-lg"
            >
              افحص ميزانية مشروعك مجاناً
            </button>
          </div>

        </div>
      </section>

      {/* DUAL MODEL SECTION — حل واحد - طرفان */}
      <section className="py-20 md:py-24 border-t border-white/5 relative bg-[#0D0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/5 text-[#2D6FE8] text-xs font-bold tracking-wider inline-block mb-4">
              نموذج MarketPath الهجين
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              حل واحد — طرفان
            </h2>
            <p className="text-sm text-slate-400">
              لماذا نجمع بين تكنولوجيا البرمجيات وإدارة الإنتاج الإبداعي؟ لأن التكنولوجيا تضبط العمليات، والوكالة تصنع الشغف.
            </p>
          </div>

          {/* Split layouts: SaaS and Agency Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* SaaS Platform side */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#121620]/30 hover:border-[#2D6FE8]/20 transition-all flex flex-col text-right">
              <div className="inline-flex self-start px-2.5 py-1 text-[10px] font-black rounded-md bg-[#2D6FE8]/15 border border-[#2D6FE8]/20 text-[#2D6FE8] mb-4 uppercase">
                منصة SaaS الذكية
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">منظومة SaaS للتحكم والأداء</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                لوحة قيادة حية وبرمجيات ذكية تخلصك من عشوائية إدارة الاتصالات وتوضح عائدكم الإعلاني لحظة بلحظة.
              </p>
              
              <div className="flex flex-col gap-3.5 mt-auto">
                {saasFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="p-0.5 rounded-full bg-[#2D6FE8]/15 border border-[#2D6FE8]/20 text-[#2D6FE8] mt-0.5 shrink-0">
                      <Check size={12} />
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agency side */}
            <div className="p-6 sm:p-8 rounded-3xl border border-[#2D6FE8]/30 bg-[#121620]/50 glow-blue transition-all flex flex-col text-right">
              <div className="inline-flex self-start px-2.5 py-1 text-[10px] font-black rounded-md bg-[#2D6FE8]/15 border border-[#2D6FE8]/20 text-[#2D6FE8] mb-4 uppercase">
                إمكانيات الوكالة الاحترافية
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">إدارة الوكالة والإنتاج الإبداعي</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                نتكفل بتطوير سيناريوهات، صناعة ريلز احترافية في مقراتكم، إثارة دقة خرائط ورسم حملات إعلانية عالية الكفاءة.
              </p>
              
              <div className="flex flex-col gap-3.5 mt-auto">
                {agencyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="p-0.5 rounded-full bg-[#2D6FE8] text-white mt-0.5 shrink-0">
                      <Check size={12} />
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* WHO IT'S FOR SECTION — Sector Grid */}
      <section className="py-20 md:py-24 border-t border-white/5 relative bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/5 text-[#2D6FE8] text-xs font-bold tracking-wider inline-block mb-4">
              من نخدم وبكل فخر في الجزائر
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              منظومة مخصصة لمجالات النمو الفعال
            </h2>
            <p className="text-sm text-slate-400">
              لقد صممنا وضبطنا استراتيجيات مخصصة لكل تخصص تجاري محلي ليتوافق مع رغبة المستهلك الجزائري.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {sectors.map((sec) => {
              const SecIcon = sec.icon;
              return (
                <div 
                  key={sec.id}
                  className="p-5 sm:p-6 rounded-2xl border border-white/5 bg-[#121620]/30 hover:border-[#2D6FE8]/40 hover:bg-[#121620]/70 hover:-translate-y-2 hover:glow-blue transition-all duration-300 group flex flex-col text-right items-start"
                >
                  <div className="p-2 px-2.5 sm:p-3 rounded-xl bg-[#121620] border border-white/5 text-[#2D6FE8] mb-4.5 group-hover:bg-[#2D6FE8]/10 group-hover:text-white transition-all">
                    <SecIcon size={20} />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white mb-2">
                    {sec.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed font-normal">
                    {sec.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SERVICES DISPLAY SECTION — Tab Grid */}
      <section id="services" className="py-20 md:py-24 border-t border-white/5 relative bg-[#0D0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/5 text-[#2D6FE8] text-xs font-bold tracking-wider inline-block mb-4">
              منظومات الخدمة الشاملة
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              خدمات متكاملة تأخذ بيدك نحو الحصاد والسيادة الرقمية
            </h2>
            <p className="text-sm text-slate-400">
              لا تبدد ميزانية متجرك بتجربة فريلانسرز (معلقين) لا يتحملون المسؤولية. نحن نقدم لك فريقاً كاملاً يعمل بذكاء ودقة متناهية.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar with vertical select items */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <h4 className="text-slate-500 font-bold text-xs tracking-widest uppercase mb-1 text-right">تصفح ركائز خدماتنا:</h4>
              {services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`p-4 rounded-2xl text-right border transition-all flex items-center justify-between cursor-pointer duration-200 ${selectedServiceId === srv.id ? "bg-[#121620] border-[#2D6FE8]/40 text-[#2D6FE8] shadow-md shadow-[#2D6FE8]/5" : "bg-[#121620]/30 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"}`}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-bold text-sm sm:text-base">{srv.titleAr}</span>
                    <span className="text-[9px] font-mono opacity-50 uppercase tracking-wide">{srv.titleEn}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-350">
                    {srv.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Pane Detail item (animated) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {services.map((srv) => {
                  if (srv.id !== selectedServiceId) return null;

                  return (
                    <motion.div
                      key={srv.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.18 }}
                      className="p-6 sm:p-8 rounded-3xl border border-[#2D6FE8]/20 bg-[#121620]/75 backdrop-blur-md flex flex-col text-right relative min-h-[400px]"
                    >
                      <div className="absolute top-0 right-10 left-10 h-[2px] bg-gradient-to-r from-transparent via-[#2D6FE8]/40 to-transparent" />

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 border-b border-white/5 pb-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-white">{srv.titleAr}</h3>
                          <p className="text-xs text-[#2D6FE8] font-mono mt-0.5 tracking-wider">{srv.titleEn}</p>
                        </div>
                        <span className="px-3.5 py-1 text-xs font-bold rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/10 text-[#2D6FE8]">
                          {srv.badge}
                        </span>
                      </div>

                      <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-6">
                        {srv.description}
                      </p>

                      <div className="mt-auto">
                        <h4 className="font-bold text-xs text-[#2D6FE8] flex items-center gap-1.5 mb-4">
                          <CheckCircle2 size={13} />
                          المخرجات الملموسة والملفات المسلمة (Deliverables):
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {srv.deliverables.map((item, index) => (
                            <div key={index} className="flex items-start gap-2 bg-[#121620]/40 p-3 rounded-xl border border-white/5 hover:border-[#2D6FE8]/10">
                              <span className="text-[#2D6FE8] mt-1 shrink-0"><Check size={13} /></span>
                              <span className="text-xs text-slate-300 font-medium leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5 text-right w-full">
                          <button
                            onClick={() => handleOpenBooking()}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-[#2D6FE8] hover:bg-[#2D6FE8]/90 text-white active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                          >
                            <span>احجز باقتك في {srv.titleAr}</span>
                            <ArrowLeft size={14} />
                          </button>
                          <span className="text-[10px] text-slate-500">
                            * متوفر خدمة فردية أو ضمن باقة استمرار مخفضة.
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

      {/* PRICING PLANS SECTION with discount toggle */}
      <section id="pricing" className="py-20 md:py-24 border-t border-white/5 relative bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/5 text-[#2D6FE8] text-xs font-bold tracking-wider inline-block mb-4">
              الأسعار والاستثمارات
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              باقات شهرية واضحة ومدروسة تناسب موازنات النمو
            </h2>
            <p className="text-sm text-slate-400">
              لا توجد تكاليف خفية أو مفاجآت في الفاتورة. اشتراكات شهرية مرنة وبسيطة مع تسليم مخرجات حقيقية مضمونة وبأفضل ممارسات السوق.
            </p>

            {/* Bill toggle */}
            <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full border border-white/5 bg-[#121620]">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border ${billingPeriod === "monthly" ? "bg-[#2D6FE8] text-white border-transparent" : "text-slate-400 hover:text-slate-200 border-transparent"}`}
              >
                شهراً بشهر (مرن)
              </button>
              <button
                onClick={() => setBillingPeriod("quarterly")}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 border ${billingPeriod === "quarterly" ? "bg-[#2D6FE8] text-white border-transparent" : "text-slate-400 hover:text-slate-200 border-transparent"}`}
              >
                <span>الاشتراك الربع سنوي</span>
                <span className="px-1.5 py-0.5 text-[8px] font-black rounded bg-red-500 text-white animate-pulse">وفر ١٥٪</span>
              </button>
            </div>
          </div>

          {/* Pricing cards - two side-by-side (SaaS + Agency layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch mb-20">
            {pricingPackages.map((pkg) => {
              const priceNum = parseInt(pkg.price.replace(/,/g, ""));
              const displayPrice = billingPeriod === "quarterly" 
                ? Math.round(priceNum * 0.85).toLocaleString("en-US")
                : pkg.price;

              return (
                <div
                  key={pkg.id}
                  className={`relative p-6 sm:p-10 rounded-3xl flex flex-col text-right transition-all duration-350 ${pkg.isPopular ? "border-[#2D6FE8]/50 glow-blue bg-[#121620] scale-[1.01] lg:-translate-y-2 z-10" : "border border-white/5 bg-[#121620]/30 hover:border-white/10"}`}
                >
                  {/* Popular tag */}
                  {pkg.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-[10px] font-black bg-[#2D6FE8] text-white tracking-wider uppercase shadow-xl flex items-center gap-1">
                      <Sparkles size={11} className="animate-spin" />
                      الأكثر طلباً وفعالية
                    </div>
                  )}

                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-[#2D6FE8] uppercase tracking-wider block mb-1">{pkg.nameEn}</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{pkg.nameAr}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed min-h-[48px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing row */}
                  <div className="border-y border-white/5 py-5 mb-6 flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{displayPrice}</span>
                      <span className="text-xs font-bold text-slate-400 mr-2">دج / شهرياً</span>
                    </div>
                    {billingPeriod === "quarterly" && (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/10">
                        وفرت {(priceNum - Math.round(priceNum * 0.85)).toLocaleString()} دج/ش
                      </span>
                    )}
                  </div>

                  {/* Bullet features */}
                  <div className="mb-8 flex-grow">
                    <h4 className="font-bold text-[10px] uppercase text-slate-500 tracking-wider mb-4">أهم مخرجات الاشتراك المضمونة:</h4>
                    <div className="flex flex-col gap-3.5">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className={`p-0.5 rounded-full mt-1 shrink-0 ${pkg.isPopular ? "bg-[#2D6FE8]" : "bg-slate-800 text-[#2D6FE8]"}`}>
                            <Check size={11} className="text-white" />
                          </span>
                          <span className="text-xs text-slate-350 leading-relaxed font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing guarantee tag */}
                  <div className="p-4 rounded-xl bg-[#0D0F14]/70 border border-white/5 mb-6 text-xs text-slate-400 leading-relaxed">
                    <strong className="text-[#2D6FE8] font-bold block mb-1">🛡️ هيكل الضمان المضمن بالباقة:</strong>
                    {pkg.guarantee}
                  </div>

                  {/* Action */}
                  <div className="mt-auto">
                    <p className="text-[10px] text-slate-500 mb-4 text-center">مثالي لشركات: {pkg.perfectFor}</p>
                    <button
                      onClick={() => handleOpenBooking(pkg.id)}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${pkg.isPopular ? "bg-[#2D6FE8] hover:bg-[#2D6FE8]/95 text-white shadow-xl hover:shadow-[#2D6FE8]/10" : "border border-white/10 hover:border-[#2D6FE8]/30 hover:bg-[#121620] bg-white/5 text-slate-200"}`}
                    >
                      <span>ابدأ الاستثمار معنا الآن</span>
                      <ArrowLeft size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* GUARANTEES SECTION with lock layout styles */}
      <section id="guarantees" className="py-20 md:py-24 border-t border-white/5 relative bg-[#0D0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-red-500/25 bg-red-500/5 text-red-400 text-xs font-bold tracking-wider inline-block mb-4">
              الضمانات الذهبية المحققة
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              الضمان الحصين الثلاثي لأموال وعقود عملائنا بالكامل
            </h2>
            <p className="text-sm text-slate-400">
              الدفع مقابل خدمات التسويق في الجزائر كان يمثل قلقاً للملاك بسبب كثرة الوعود الزائفة. مع ماركتباث، كل دينار تضعه يقابله التزام قانوني متين وعادل.
            </p>
          </div>

          {/* 3 blocks matching 🔒 ضمان التسليم / 🎯 ضمان الثبات / 📍 ضمان الظهور */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((gt) => {
              // Custom matching header icons
              let guaranteeIconClass = "🔒";
              if (gt.id === "execution") guaranteeIconClass = "🔒";
              if (gt.id === "consistency") guaranteeIconClass = "🎯";
              if (gt.id === "visibility") guaranteeIconClass = "📍";

              return (
                <div 
                  key={gt.id}
                  className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#121620]/30 hover:border-[#2D6FE8]/20 transition-all flex flex-col justify-between text-right relative overflow-hidden"
                >
                  <div className="absolute top-4 left-4 text-white/5 select-none font-mono text-5xl font-black">
                    {guaranteeIconClass}
                  </div>

                  <div className="mb-6 relative z-10">
                    <span className="text-[9px] font-mono text-[#2D6FE8] uppercase tracking-wider font-bold mb-1 block">{gt.titleEn}</span>
                    <h3 className="text-base sm:text-lg font-black text-white mt-1 mb-3">{gt.titleAr}</h3>
                    <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
                      {gt.description}
                    </p>
                  </div>

                  <div className="mt-auto p-4 rounded-xl bg-[#0D0F14]/70 border border-[#2D6FE8]/15 text-xs text-slate-400 leading-relaxed font-normal">
                    <strong className="text-[#2D6FE8] font-extrabold block mb-1">التعويض القانوني والالتزام:</strong>
                    {gt.compensation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center max-w-lg mx-auto p-4 rounded-full border border-white/5 bg-[#121620]/60 text-[10px] sm:text-xs text-slate-400 flex items-center justify-center gap-2">
            <Award size={14} className="text-[#2D6FE8]" />
            <span>نعمل بميثاق التميز وأقصى ممارسات الشرف لحماية مصالح المستثمر والعميل الجزائري.</span>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION — 3-step timeline with connecting lines */}
      <section id="how-it-works" className="py-20 md:py-24 border-t border-white/5 relative bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1 rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/5 text-[#2D6FE8] text-xs font-bold tracking-wider inline-block mb-4">
              خطوات الإجابة والنمو
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              تبدأ من الحيرة، وتستقر عند النمو الشامل في ٣ خطوات فقط
            </h2>
            <p className="text-sm text-slate-400">
              لا نريد إشغال وقتك كصاحب عمل بالتعقيدات الفنية. لقد صممنا آلية بالغة العفوية والمرونة لتنفيذ حملاتك.
            </p>
          </div>

          {/* 3 Step Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {processSteps.map((step, idx) => (
              <div 
                key={step.id}
                className="relative p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#121620]/25 hover:border-[#2D6FE8]/20 transition-all text-right flex flex-col justify-between min-h-[300px]"
              >
                {/* Behind timeline step number */}
                <div className="absolute top-4 left-4 font-black text-4xl tracking-tight text-white/5 select-none font-mono">
                  {step.num}
                </div>

                <div className="relative z-10 mb-6">
                  <span className="px-2.5 py-0.5 text-[9px] font-mono text-[#2D6FE8] bg-[#2D6FE8]/10 border border-[#2D6FE8]/25 rounded font-extrabold uppercase">{step.timeframe}</span>
                  <h3 className="text-base sm:text-lg font-black text-white mt-3.5 mb-2">{step.titleAr}</h3>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-auto border-t border-white/5 pt-4">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">المخرج الملموس والملفات المسلمة:</span>
                  <span className="text-[11px] text-[#2D6FE8] font-bold leading-relaxed">{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline background linking line */}
          <div className="hidden md:block absolute top-[48%] left-12 right-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#2D6FE8]/20 to-transparent z-0" />

        </div>
      </section>

      {/* FAQS ACCORDION SECTION */}
      <section id="faq" className="py-20 md:py-24 border-t border-white/5 relative bg-[#0D0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/5 text-[#2D6FE8] text-xs font-bold tracking-wider inline-block mb-4">
              الشفافية الكاملة والإجابة
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 select-none">
              الأسئلة الشائعة التي تجول بخاطركم
            </h2>
            <p className="text-sm text-slate-400">
              نحب الوضوح. أجبنا هنا على الاستفسارات الفنية والمقراتية التي نتحصل عليها من الملاك والتجار الجزائريين.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-white/5 bg-[#121620]/30 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-right font-black text-xs sm:text-sm md:text-base text-white hover:text-[#2D6FE8] transition-colors cursor-pointer gap-4"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded bg-[#121620]/80 border border-white/5 text-[#2D6FE8] shrink-0">
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="border-t border-white/5 bg-[#0D0F14]/40"
                      >
                        <p className="p-5 sm:p-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
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

      {/* CTA / CONTACT DIRECT PANEL MODULE */}
      <section id="contact" className="py-20 md:py-28 border-t border-white/5 relative overflow-hidden bg-[#0B0D12]">
        
        {/* Halo Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2D6FE8]/5 blur-[120px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="p-8 sm:p-14 rounded-3xl border border-[#2D6FE8]/20 bg-[#121620]/50 backdrop-blur-md glow-blue text-center flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2D6FE8]/25 bg-[#2D6FE8]/10 text-[#2D6FE8] text-xs font-bold mb-6">
              <Zap size={13} className="text-[#2D6FE8] animate-pulse" />
              <span>جاهز تبدأ؟ نظامك التسويقي على بُعد رسالة واحدة</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              جاهز لحبس الأنفاس والبدء في تصاعد حقيقي؟
            </h2>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-10">
              احجز استشارتك المجانية غير الملزمة التي تبلغ مدتها ٢٠ دقيقة الآن مع أحد خبرائنا بالجزائز. سنفحص وضعيتك الحالية ونمنحك ٣ نصائح مباشرة للتنفيذ فوراً.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <button
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto px-10 py-4 rounded-full font-black text-base bg-[#2D6FE8] hover:bg-[#2D6FE8]/95 text-white hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
              >
                اصنع مسار نموك الآن
              </button>
            </div>

            {/* Direct details foot row */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/5 pt-8 w-full text-slate-400 text-xs font-medium">
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Phone size={13} className="text-[#2D6FE8]" />
                <a href="tel:+213558620107" dir="ltr">+213 (0) 558 62 01 07</a>
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Mail size={13} className="text-[#2D6FE8]" />
                <a href="mailto:contact.marketpath@gmail.com">contact.marketpath@gmail.com</a>
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-[#2D6FE8]" />
                <span>الجزائر العاصمة (Algiers, Algeria)</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* SASS HUMAN FOOTER FOOT */}
      <footer className="py-12 border-t border-white/5 bg-[#0D0F14] text-slate-400 text-xs text-right relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-right">
            <span className="text-xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-wide">
              MarketPath
            </span>
            <p className="text-[11px] text-slate-500">منظومة رقمية شاملة مكرَّسة لتميز ونمو الشركات والمشاريع بالجزائر.</p>
          </div>

          {/* Links map row */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-bold text-slate-400">
            <a href="#why-us" className="hover:text-white transition-colors">لماذا نحن</a>
            <a href="#services" className="hover:text-white transition-colors">مخرجات خدماتنا</a>
            <a href="#pricing" className="hover:text-white transition-colors">الباقات</a>
            <a href="#guarantees" className="hover:text-white transition-colors">الضمان الحصين</a>
            <a href="#faq" className="hover:text-white transition-colors">الأسئلة</a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-left">
            <p className="text-[11px] text-slate-500">© {new Date().getFullYear()} MarketPath. جميع الحقوق محفوظة.</p>
            <p className="text-[9px] text-slate-650 font-mono tracking-wider">CRAFTED FOR ALGERIAN LEADING BRANDS</p>
          </div>

        </div>
      </footer>

      {/* FULLY FUNCTIONAL LEAD-RESERVATION MODAL */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop lock blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseBooking}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl rounded-3xl border border-[#2D6FE8]/25 bg-[#121620] shadow-2xl overflow-hidden text-right flex flex-col max-h-[90vh]"
            >
              <div className="h-1.5 w-full bg-[#2D6FE8]" />
              
              <button
                onClick={handleCloseBooking}
                className="absolute top-4 left-4 p-2 rounded-full border border-white/5 bg-[#0D0F14]/50 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className="p-6 sm:p-8 overflow-y-auto">
                {!isSubmitted ? (
                  <>
                    <div className="mb-6">
                      <span className="px-2.5 py-0.5 rounded text-[9px] bg-[#2D6FE8]/10 border border-[#2D6FE8]/20 text-[#2D6FE8] font-bold mb-2 inline-block">مستشار رقمي مخصص</span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">احجز استشارتك المجانية المخططة</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        املأ هذا الاستبيان البسيط لنستعرض ونفحص معلومات مشروعكم في الجزائر قبل بدء الاتصال، لنقترح لك خطة ترويج مناسبة ومجربة مباشرة.
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
                            className="p-3 rounded-xl border border-white/5 bg-[#0D0F14] text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#2D6FE8]"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">رقم الهاتف (الواتساب مفضل):</label>
                          <input
                            type="tel"
                            required
                            placeholder="مثال: 0554316928"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-[#0D0F14] text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#2D6FE8]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">البريد الإلكتروني المهني:</label>
                          <input
                            type="email"
                            required
                            placeholder="info@younes-store.dz"
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-[#0D0F14] text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#2D6FE8]"
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
                            className="p-3 rounded-xl border border-white/5 bg-[#0D0F14] text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-[#2D6FE8]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">قطاع النشاط الاقتصادي في الجزائر:</label>
                          <select
                            value={bookingForm.sector}
                            onChange={(e) => setBookingForm({ ...bookingForm, sector: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-[#0D0F14] text-xs text-slate-300 focus:outline-none focus:border-[#2D6FE8] cursor-pointer"
                          >
                            <option value="retail">التجارة المحلية والمحلات والمعارض</option>
                            <option value="ecommerce">التجارة الإلكترونية والتوصيل (E-Commerce)</option>
                            <option value="medical">العيادات والخدمات الطبية والتجميلية</option>
                            <option value="realestate">العقارات والإنشاءات والمكاتب الهندسية</option>
                            <option value="education">التعليم والمدارس وأكاديميات التكوين</option>
                            <option value="industrial">المصانع التجارية والمبيعات الـ B2B</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300">الميزانية التسويقية الشهرية المتوقعة:</label>
                          <select
                            value={bookingForm.budget}
                            onChange={(e) => setBookingForm({ ...bookingForm, budget: e.target.value })}
                            className="p-3 rounded-xl border border-white/5 bg-[#0D0F14] text-xs text-slate-300 focus:outline-none focus:border-[#2D6FE8] cursor-pointer"
                          >
                            <option value="low">أقل من 30,000 دج شهرياً (تجريبي)</option>
                            <option value="medium">من 30,000 دج إلى 80,000 دج شهرياً</option>
                            <option value="high">من 80,000 دج إلى 150,000 دج شهرياً</option>
                            <option value="enterprise">أكثر من 150,000 دج شهرياً (نمو مكثف)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-300">تطلعات مخصصة أو روابط تواصلكم (اختياري):</label>
                        <textarea
                          rows={3}
                          placeholder="مثال: تحسين صدارة خرائط جوجل وزيادة تفاعل ومبيعات حساب الإنستقرام بالريلز..."
                          value={bookingForm.message}
                          onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                          className="p-3 rounded-xl border border-white/5 bg-[#0D0F14] text-xs text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-[#2D6FE8] resize-none"
                        />
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#2D6FE8] hover:bg-[#2D6FE8]/90 text-white active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#2D6FE8]/15"
                        >
                          {isSubmitting ? (
                            <span className="w-5 h-5 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                          ) : (
                            <>
                              <Send size={15} />
                              <span>تأكيد الحجز وبناء ملف المراجعة</span>
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
                    className="text-center py-8 flex flex-col items-center justify-center line-relaxed"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 text-xl font-black">
                      ✓
                    </div>
                    <span className="px-3 py-1 rounded bg-emerald-950/20 text-emerald-400 text-[10px] font-black mb-2 inline-block border border-emerald-500/20">
                      تم استلام طلب الاستشارة وتأمين الحجز!
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3">شكراً لثقتكم الغالية في MarketPath، {bookingForm.name}!</h3>
                    
                    <p className="text-slate-450 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
                      لقد تم جدولة بيانات مراجعة مشروعكم <strong className="text-white">({bookingForm.businessName})</strong> بنجاح. سنقوم بمراجعة صفحتكم ومحيط حضور جوجل وتحضير الإسقاط قبل بدء المكالمة.
                    </p>

                    <div className="p-4 rounded-xl bg-[#2D6FE8]/5 border border-[#2D6FE8]/25 max-w-md mb-6 text-right text-xs leading-relaxed">
                      <strong className="text-[#2D6FE8] font-bold block mb-1 flex items-center gap-1">
                        <Zap size={13} />
                        تسريع الاستجابة المباشرة لفرع الجزائر:
                      </strong>
                      للمطالبة بالاستجابة في أقل من ساعتين، ننصح العميل بالنقر على زر المراسلة التابع لواتساب المناوب ليتم سحب تذكرتكم للأولوية فورياً.
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:flex-row items-center justify-center max-w-sm">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-505 text-white transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <MessageSquare size={15} />
                        إرسال مباشر إلى الواتساب
                      </a>
                      <button
                        onClick={handleCloseBooking}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs text-slate-400 hover:text-white border border-white/5 hover:border-white/10 text-center font-bold"
                      >
                        إغلاق ومتابعة التصفح
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
