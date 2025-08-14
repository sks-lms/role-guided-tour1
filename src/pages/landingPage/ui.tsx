import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, TrendingUp, Users, Shield, ArrowRight, Play, Check, Star, Menu, X, Twitter, Instagram, Facebook, Linkedin, BookOpen, Award, Globe, Zap } from "lucide-react";
import { LanguageSwitcher } from "@/components/languageSwitcher";
import { useHandler } from "./handler";
import { StudentLoginModal } from "@/components/modals/studentLogin";
import { useEffect, useState } from "react";
import heroEducation from "@/assets/hero-education.jpg";
import studentsLearning from "@/assets/students-learning.jpg";
import onlineLearning from "@/assets/online-learning.jpg";
import teacherClassroom from "@/assets/teacher-classroom.jpg";


export function LandingPage() {
  const [state, handlers] = useHandler();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-xl">SK Solutions</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* <Button variant="outline" onClick={(e) => handlers.handleStudentLogin(e)}>
                Student
              </Button> */}
              <LanguageSwitcher variant="minimal" />
              <Button variant="outline" onClick={() => handlers.setIsStudentModalOpen(true)}>
                Student
              </Button>
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={(e) => handlers.handleTutorLogin(e)}>
                Teacher's
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handlers.toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle mobile menu"
            >
              {state.isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${state.isMobileMenuOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="py-4 space-y-4 border-t border-border/50 mt-4 text-center">
              <a
                href="#home"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => handlers.setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => handlers.setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => handlers.setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => handlers.setIsMobileMenuOpen(false)}
              >
                Contact
              </a>

              <div className="flex flex-col space-y-2 pt-4">
                <div className="mb-3">
                  <LanguageSwitcher className="w-full" />
                </div>
                {/* <Button variant="outline" onClick={(e) => { handlers.handleStudentLogin(e); handlers.setIsMobileMenuOpen(false); }}>
                  Student
                </Button> */}
                <Button variant="outline" onClick={() => { handlers.setIsStudentModalOpen(true); handlers.setIsMobileMenuOpen(false); }}>
                  Student
                </Button>
                <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={(e) => { handlers.handleTutorLogin(e); handlers.setIsMobileMenuOpen(false); }}>
                  Teacher's
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Student Login Modal */}
      <StudentLoginModal
        open={state.isStudentModalOpen}
        onOpenChange={handlers.setIsStudentModalOpen}
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 px-4">
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <img
            src={heroEducation}
            alt="Students in modern classroom learning together"
            className="w-full h-[120%] object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-secondary/80"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Animated Background Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          {/* Dynamic Floating Cards with Morphing */}
          <div className="absolute top-20 left-10 animate-[float_6s_ease-in-out_infinite] opacity-30 hover:opacity-50 transition-opacity duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-500">
              <BookOpen className="h-10 w-10 text-white animate-pulse" />
            </div>
          </div>
          <div className="absolute top-32 right-20 animate-[float_8s_ease-in-out_infinite_1s] opacity-30">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-glow/40 to-primary/30 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 hover:rotate-12 transition-transform duration-700">
              <Award className="h-12 w-12 text-white animate-[glow-pulse_2s_ease-in-out_infinite]" />
            </div>
          </div>
          <div className="absolute bottom-32 left-20 animate-[float_7s_ease-in-out_infinite_2s] opacity-30">
            <div className="w-18 h-18 bg-gradient-to-br from-secondary/40 to-accent/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 hover:scale-125 transition-transform duration-500">
              <Globe className="h-9 w-9 text-white animate-[spin_10s_linear_infinite]" />
            </div>
          </div>
          <div className="absolute bottom-20 right-10 animate-[float_5s_ease-in-out_infinite_0.5s] opacity-30">
            <div className="w-22 h-22 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 backdrop-blur-md rounded-2xl flex items-center justify-center p-4 shadow-2xl border border-white/20 hover:-rotate-6 transition-transform duration-600">
              <Zap className="h-10 w-10 text-white animate-bounce" />
            </div>
          </div>
          
          {/* Additional Micro Animations */}
          <div className="absolute top-1/2 left-1/4 animate-[float_4s_ease-in-out_infinite_3s] opacity-20">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Video className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute top-3/4 right-1/4 animate-[float_6s_ease-in-out_infinite_1.5s] opacity-20">
            <div className="w-14 h-14 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center rotate-45">
              <Users className="h-7 w-7 text-white -rotate-45" />
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="relative z-20 container mx-auto px-6 md:px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="mb-8 bg-gradient-to-r from-white/25 to-white/15 text-white border-white/40 backdrop-blur-md hover:bg-white/30 transition-all duration-500 hover:scale-105 shadow-2xl text-lg px-6 py-2">
                🚀 {state.t('hero.title')}
              </Badge>

              <h1 className="text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight drop-shadow-2xl">
                <span className="inline-block animate-[slideUp_1s_ease-out] hover:scale-105 transition-transform duration-300">
                  {state.t('hero.title.main')}
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-[slideUp_1s_ease-out_0.2s_both] hover:scale-105 transition-transform duration-300 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
                  {state.t('hero.title.sub')}
                </span>
              </h1>

              <p className="text-xl lg:text-3xl text-white/95 mb-10 leading-relaxed max-w-4xl mx-auto animate-[slideUp_1s_ease-out_0.4s_both] drop-shadow-lg font-light">
                {state.t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-14 justify-center animate-[slideUp_1s_ease-out_0.6s_both]">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/95 hover:scale-110 hover:shadow-2xl transition-all duration-500 group text-xl px-10 py-6 h-auto shadow-2xl rounded-2xl font-semibold relative overflow-hidden"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10">{state.t('hero.cta.features')}</span>
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button
                  size="lg"
                  className="border-2 border-white/40 bg-white/10 text-white hover:border-white/60 hover:bg-white/20 backdrop-blur-md group text-xl px-10 py-6 h-auto shadow-2xl hover:scale-110 transition-all duration-500 rounded-2xl font-semibold relative overflow-hidden"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">{state.t('hero.cta.pricing')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>

              {/* Enhanced Interactive Stats */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-white animate-[slideUp_1s_ease-out_0.8s_both]">
                <div className="flex items-center space-x-4 bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-md rounded-2xl px-8 py-4 hover:bg-white/30 transition-all duration-500 hover:scale-110 cursor-pointer group shadow-2xl border border-white/20">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-3 border-white group-hover:scale-125 transition-transform duration-500 shadow-lg animate-[bounce_2s_infinite]"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                  <span className="font-semibold text-lg">{state.t('hero.info.students')}</span>
                </div>

                <div className="flex items-center space-x-3 bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-md rounded-2xl px-8 py-4 hover:bg-white/30 transition-all duration-500 hover:scale-110 cursor-pointer group shadow-2xl border border-white/20">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star 
                        key={i} 
                        className="h-6 w-6 fill-yellow-400 text-yellow-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-[glow-pulse_2s_ease-in-out_infinite]" 
                        style={{ animationDelay: `${i * 0.1}s` }} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-lg">{state.t('hero.info.rating')}</span>
                </div>

                <div className="flex items-center space-x-3 bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-md rounded-2xl px-8 py-4 hover:bg-white/30 transition-all duration-500 hover:scale-110 cursor-pointer group shadow-2xl border border-white/20">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse relative"></div>
                  </div>
                  <span className="font-semibold text-lg">{state.t('hero.info.online')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer group">
          <div className="w-8 h-14 border-2 border-white/60 rounded-full flex justify-center group-hover:border-white/80 transition-colors duration-300 backdrop-blur-sm bg-white/10">
            <div className="w-2 h-6 bg-gradient-to-b from-white to-white/50 rounded-full mt-2 animate-[slideDown_2s_ease-in-out_infinite] group-hover:from-yellow-300 group-hover:to-orange-300 transition-colors duration-300"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className={`transition-all duration-1000 delay-200 ${scrollY > 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
                ✨ {state.t('features.title')}
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {state.t('features.title')}
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {state.t('features.subtitle')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: state.t('features.video'),
                description: state.t('features.video.desc'),
                gradient: "from-blue-500 to-cyan-500",
                delay: "0s"
              },
              {
                icon: TrendingUp,
                title: state.t('features.progress'),
                description: state.t('features.progress.desc'),
                gradient: "from-green-500 to-emerald-500",
                delay: "0.1s"
              },
              {
                icon: Users,
                title: state.t('features.students'),
                description: state.t('features.students.desc'),
                gradient: "from-purple-500 to-pink-500",
                delay: "0.2s"
              },
              {
                icon: Shield,
                title: state.t('features.security'),
                description: state.t('features.security.desc'),
                gradient: "from-orange-500 to-red-500",
                delay: "0.3s"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`transition-all duration-700 ${scrollY > 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: feature.delay }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 border-border/50 bg-card/50 backdrop-blur-sm h-full relative overflow-hidden">
                  {/* Animated background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-8 text-center relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                      <feature.icon className="h-10 w-10 text-white group-hover:animate-bounce" />
                    </div>
                    <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
                  </CardContent>
                  
                  {/* Hover effect corners */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-full"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full"></div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={studentsLearning}
            alt="Students learning together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className={`transition-all duration-1000 delay-300 ${scrollY > 400 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30 hover:bg-secondary/30 transition-all duration-300">
                🎯 How It Works
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">{state.t('howitworks.title')}</h2>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{state.t('howitworks.subtitle')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 z-0">
              <div className="w-full h-full bg-gradient-to-r from-primary to-secondary animate-shimmer"></div>
            </div>
            <div className="hidden md:block absolute top-1/2 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-secondary to-primary transform -translate-y-1/2 z-0">
              <div className="w-full h-full bg-gradient-to-r from-secondary to-primary animate-shimmer"></div>
            </div>
            
            {[
              {
                step: "1",
                title: state.t('howitworks.step1.title'),
                description: state.t('howitworks.step1.desc'),
                gradient: "from-blue-500 to-blue-600",
                icon: BookOpen
              },
              {
                step: "2",
                title: state.t('howitworks.step2.title'),
                description: state.t('howitworks.step2.desc'),
                gradient: "from-green-500 to-green-600",
                icon: Users
              },
              {
                step: "3",
                title: state.t('howitworks.step3.title'),
                description: state.t('howitworks.step3.desc'),
                gradient: "from-purple-500 to-purple-600",
                icon: Award
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`text-center group relative z-10 transition-all duration-700 ${scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className={`w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-8 text-white font-bold text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl relative overflow-hidden`}>
                  <span className="relative z-10">{item.step}</span>
                  <item.icon className="absolute inset-0 m-auto h-12 w-12 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </div>
                <h3 className="font-bold text-2xl mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground/80 transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{state.t('pricing.title')}</h2>
            <p className="text-xl text-muted-foreground">{state.t('pricing.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/50 hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">{state.t('pricing.monthly')}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">$16.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Up to 50 students",
                    "All analytics",
                    "Video uploads",
                    "Email support",
                    "Cancel anytime"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full" variant="outline" onClick={(e) => handlers.handleTutorSubscriptionLogin(e, 'monthly')}>
                  {state.t('pricing.cta.getstarted')}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/50 shadow-glow relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-primary">{state.t('pricing.feature')}</Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">{state.t('pricing.annual')}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">$179.99</span>
                  <span className="text-muted-foreground">/year</span>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Up to 50 students",
                    "All analytics",
                    "Video uploads",
                    "Email support",
                    "2 months free"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={(e) => handlers.handleTutorSubscriptionLogin(e, 'annual')}>
                  {state.t('pricing.cta.getstarted')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{state.t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">{state.t('cta.subtitle')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/20 hover:text-white backdrop-blur-sm group shadow-2xl hover:scale-105 transition-all duration-300" onClick={(e) => handlers.handleTutorLogin(e)}>
              {state.t('cta.teach')}
            </Button>
            <Button size="lg" variant="outline" className="border-white bg-white/30 text-white hover:bg-white/50 hover:text-white hover:border-transparent backdrop-blur-sm group shadow-2xl hover:scale-105 transition-all duration-300">
              {state.t('cta.learn')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-xl">SK Solutions</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-muted-foreground px-4">
              <a href="#" className="hover:text-primary transition-colors">About Us</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <ul className="flex gap-4 list-none m-0 p-0">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-periwinkleBlue text-2xl flex items-center justify-center w-10 h-10 rounded-full bg-powderBlue transition-colors duration-200 ease-in-out hover:text-purple-600 hover:bg-lightPurple">
                  <Twitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-periwinkleBlue text-2xl flex items-center justify-center w-10 h-10 rounded-full bg-powderBlue transition-colors duration-200 ease-in-out hover:text-purple-600 hover:bg-lightPurple">
                  <Instagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-periwinkleBlue text-2xl flex items-center justify-center w-10 h-10 rounded-full bg-powderBlue transition-colors duration-200 ease-in-out hover:text-purple-600 hover:bg-lightPurple">
                  <Facebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-periwinkleBlue text-2xl flex items-center justify-center w-10 h-10 rounded-full bg-powderBlue transition-colors duration-200 ease-in-out hover:text-purple-600 hover:bg-lightPurple">
                  <Linkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-8 flex flex-col gap-3 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>{state.t('footer.copyright')}</p>
            <p className="text-primary">{state.t('footer.developed')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};