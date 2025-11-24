import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Ju lutem shkruani një email të vlefshëm");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save email to Supabase
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          { 
            email: email.toLowerCase().trim(),
            is_active: true
          }
        ]);

      if (error) {
        // Check if email already exists
        if (error.code === '23505') {
          toast.info("Ky email është tashmë i abonuar!");
        } else {
          throw error;
        }
      } else {
        toast.success("Faleminderit për abonimin! Kontrolloni email-in tuaj për një dhuratë mirëseardhjeje.");
        setEmail("");
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error("Diçka shkoi keq. Ju lutem provoni përsëri.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold"
            >
              Bëhu Pjesë e Klubit tonë të Aromave
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Abonohu për të marrë oferta ekskluzive, produkte të reja dhe udhëzime për aromat
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <motion.div
              animate={{
                scale: isFocused ? 1.02 : 1,
                boxShadow: isFocused
                  ? "0 20px 60px -10px rgba(232, 180, 168, 0.3)"
                  : "0 10px 30px -10px rgba(232, 180, 168, 0.1)",
              }}
              className="flex gap-2 glass-card rounded-full p-2 transition-all duration-300"
            >
              <Input
                type="email"
                  placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base px-6"
                required
              />
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="rounded-full bg-primary hover:bg-primary/90 hover-glow disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    <span className="ml-2">Duke u abonuar...</span>
                  </>
                ) : (
                  <>
                    Abonohu
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground"
          >
            Merrni 15% zbritje për porosinë tuaj të parë kur abonoheni
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
