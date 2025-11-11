import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroPerfume from "@/assets/hero-perfume.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20 lg:pt-20">
      {/* Mobile App-like Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-secondary/10" />

      {/* Animated background gradient for desktop */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-background via-muted to-secondary/20" />

      {/* Floating particles effect - fewer on mobile */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Mobile App Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)]">
          {/* Mobile: Image First, Desktop: Text First */}
          {/* Floating Perfume Image - Prominent on Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full order-1 lg:order-2 mt-4 sm:-mt-12 lg:mt-0"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Mobile App Card Style Container */}
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-primary/20 shadow-2xl">
                <motion.img
                  src={heroPerfume}
                  alt="Shishe Parfumi Luksoz"
                  className="w-full max-w-[280px] sm:max-w-sm lg:max-w-md mx-auto drop-shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                />

                {/* Glow effect behind bottle */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl sm:blur-3xl -z-10 rounded-full opacity-60" />

                {/* Decorative sparkles for mobile app feel */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4"
                >
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary/40" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content - Mobile App Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 sm:space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Badge Style for Mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block mb-3 sm:mb-4"
              >
                <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs sm:text-sm">
                  KOLEKSION I RI 2024
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-[1.1] mb-4 sm:mb-6">
                Zbuloni{" "}
                <span className="gradient-text block sm:inline">Aromën</span>
                <br className="hidden sm:block" />
                <span className="sm:ml-2">Tuaj të Veçantë</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
            >
              Shijoni koleksionin tonë të kujdesur të parfumeve luksoze. Çdo
              shishe tregon një histori, çdo aromë kap një moment.
            </motion.p>

            {/* Mobile App Style Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow group h-14 sm:h-16 text-base sm:text-lg font-semibold w-full sm:w-auto rounded-2xl sm:rounded-2xl shadow-lg active:scale-95 transition-all"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Eksploroni Koleksionin
                <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-primary/10 h-14 sm:h-16 text-base sm:text-lg w-full sm:w-auto rounded-2xl sm:rounded-2xl active:scale-95 transition-all backdrop-blur-sm"
              >
                Gjeni Aromën Tuaj
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile App Style Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary/60 rounded-full flex justify-center p-1.5 sm:p-2 backdrop-blur-sm bg-background/50">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 sm:h-3 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
