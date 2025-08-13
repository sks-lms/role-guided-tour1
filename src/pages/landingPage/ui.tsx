import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, TrendingUp, Users, Shield, ArrowRight, Play, Check, Star, Menu, X, Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { LanguageSwitcher } from "@/components/languageSwitcher";
import { useHandler } from "./handler";
import { StudentLoginModal } from "@/components/modals/studentLogin";


export function LandingPage() {
  const [state, handlers] = useHandler();

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
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1585974738771-84483dd9f89f?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Students celebrating graduation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-secondary/80"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Floating Cards */}
          <div className="absolute top-20 left-10 animate-[float_6s_ease-in-out_infinite] opacity-20">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Video className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="absolute top-32 right-20 animate-[float_8s_ease-in-out_infinite] opacity-20">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="absolute bottom-32 left-20 animate-[float_7s_ease-in-out_infinite] opacity-20">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Users className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="absolute bottom-20 right-10 animate-[float_5s_ease-in-out_infinite] opacity-20">
            <div className="w-18 h-18 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center p-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                🚀 {state.t('hero.title')}
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-[slideUp_1s_ease-out] drop-shadow-2xl">
                {state.t('hero.title.main')}
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  {state.t('hero.title.sub')}
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto animate-[slideUp_1s_ease-out_0.2s_both] drop-shadow-lg">
                {state.t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center animate-[slideUp_1s_ease-out_0.4s_both]">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 group text-lg px-8 py-4 h-auto shadow-2xl"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {state.t('hero.cta.features')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  className="border-2 border-white/30 bg-white-100 text-white hover:border-transparent hover:bg-white/20 backdrop-blur-sm group text-lg px-8 py-4 h-auto shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {state.t('hero.cta.pricing')}
                </Button>
              </div>

              {/* Interactive Stats */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-white animate-[slideUp_1s_ease-out_0.6s_both]">
                <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-white group-hover:scale-110 transition-transform duration-300"></div>
                    ))}
                  </div>
                  <span className="font-semibold">{state.t('hero.info.students')}</span>
                </div>

                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <span className="font-semibold">{state.t('hero.info.rating')}</span>
                </div>

                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">{state.t('hero.info.online')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{state.t('features.title')}</h2>
            <p className="text-xl text-muted-foreground">{state.t('features.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Video,
                title: state.t('features.video'),
                description: state.t('features.video.desc')
              },
              {
                icon: TrendingUp,
                title: state.t('features.progress'),
                description: state.t('features.progress.desc')
              },
              {
                icon: Users,
                title: state.t('features.students'),
                description: state.t('features.students.desc')
              },
              {
                icon: Shield,
                title: state.t('features.security'),
                description: state.t('features.security.desc')
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in border-border/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{state.t('howitworks.title')}</h2>
            <p className="text-xl text-muted-foreground">{state.t('howitworks.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: state.t('howitworks.step1.title'),
                description: state.t('howitworks.step1.desc')
              },
              {
                step: "2",
                title: state.t('howitworks.step2.title'),
                description: state.t('howitworks.step2.desc')
              },
              {
                step: "3",
                title: state.t('howitworks.step3.title'),
                description: state.t('howitworks.step3.desc')
              }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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