import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Faleminderit për abonimin! Kontrolloni email-in tuaj për një dhuratë mirëseardhjeje.");
      setEmail("");
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
                  placeholder="Shkruani adresën tuaj të email-it"
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
                className="rounded-full bg-primary hover:bg-primary/90 hover-glow"
              >
                Abonohu
                <Send className="ml-2 h-4 w-4" />
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
