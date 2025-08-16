import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, TrendingUp, Users, Shield, ArrowRight, Play, Check, Star, Menu, X, Twitter, Instagram, Facebook, Linkedin, BookOpen, Award, Globe, Zap, Youtube } from "lucide-react";
import { LanguageSwitcher } from "@/components/languageSwitcher";
import { useHandler } from "./handler";
import { StudentLoginModal } from "@/components/modals/studentLogin";
import { YouTubeConnectModal } from "@/components/modals/YouTubeConnectModal";
import heroImage from "@/assets/hero-education.jpg";

export function LandingPage() {
  const [state, handlers] = useHandler();
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);

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
              <LanguageSwitcher variant="minimal" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsYouTubeModalOpen(true)}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:border-red-800 dark:text-red-300"
              >
                <Youtube className="mr-2 h-4 w-4" />
                Test Modal
              </Button>
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
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              {state.isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {state.isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border/50">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
                <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
                <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                  <LanguageSwitcher variant="minimal" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsYouTubeModalOpen(true)}
                    className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:border-red-800 dark:text-red-300"
                  >
                    <Youtube className="mr-2 h-4 w-4" />
                    Test Modal
                  </Button>
                  <Button variant="outline" onClick={() => handlers.setIsStudentModalOpen(true)}>
                    Student
                  </Button>
                  <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={(e) => handlers.handleTutorLogin(e)}>
                    Teacher's
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Education background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <Badge className="mb-6 bg-gradient-primary text-white hover:shadow-glow">
                🚀 Transform Education Today
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                {state.t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {state.t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group" onClick={(e) => handlers.handleTutorLogin(e)}>
                  {state.t('hero.cta.teach')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="hover:shadow-elegant transition-all duration-300" onClick={() => handlers.setIsStudentModalOpen(true)}>
                  <Play className="mr-2 h-5 w-5" />
                  {state.t('hero.cta.learn')}
                </Button>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <Card className="relative border-border/50 backdrop-blur-sm bg-background/80">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Users, label: "Students", value: "10K+" },
                      { icon: BookOpen, label: "Courses", value: "500+" },
                      { icon: Award, label: "Certificates", value: "2K+" },
                      { icon: Globe, label: "Countries", value: "50+" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{state.t('features.title')}</h2>
            <p className="text-xl text-muted-foreground">{state.t('features.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Video,
                title: state.t('features.video.title'),
                description: state.t('features.video.desc')
              },
              {
                icon: TrendingUp,
                title: state.t('features.analytics.title'),
                description: state.t('features.analytics.desc')
              },
              {
                icon: Users,
                title: state.t('features.collaboration.title'),
                description: state.t('features.collaboration.desc')
              },
              {
                icon: Shield,
                title: state.t('features.security.title'),
                description: state.t('features.security.desc')
              }
            ].map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-elegant transition-all duration-300 group animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
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

          <div className="mt-8 pt-8 flex flex-col gap-3 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>{state.t("footer.copyright")}</p>
            <p className="text-primary">{state.t("footer.developed")}</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StudentLoginModal 
        open={state.isStudentModalOpen}
        onOpenChange={(open) => handlers.setIsStudentModalOpen(open)}
      />
      
      <YouTubeConnectModal 
        open={isYouTubeModalOpen}
        onOpenChange={setIsYouTubeModalOpen}
      />
    </div>
  );
}