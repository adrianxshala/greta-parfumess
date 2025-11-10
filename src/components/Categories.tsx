import { motion } from "framer-motion";
import { Flower2, Trees, Citrus, Sparkles } from "lucide-react";

const categories = [
  {
    name: "Floral",
    icon: Flower2,
    description: "Delicate & romantic",
    color: "from-pink-400 to-rose-400",
  },
  {
    name: "Woody",
    icon: Trees,
    description: "Warm & earthy",
    color: "from-amber-600 to-orange-600",
  },
  {
    name: "Citrus",
    icon: Citrus,
    description: "Fresh & energizing",
    color: "from-yellow-400 to-orange-400",
  },
  {
    name: "Oriental",
    icon: Sparkles,
    description: "Exotic & sensual",
    color: "from-purple-500 to-pink-500",
  },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Explore by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect scent family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group cursor-pointer"
              >
                <div className="glass-card rounded-2xl p-8 text-center space-y-4 hover-glow transition-all duration-300 h-full">
                  {/* Gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  />
                  
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${category.color} p-4 flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="relative">
                    <h3 className="font-serif text-2xl font-semibold">{category.name}</h3>
                    <p className="text-muted-foreground text-sm mt-2">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
