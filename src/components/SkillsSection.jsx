import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const skills = [
  // Mobile Development
  { name: "Flutter/Dart", level: "intermediate", category: "mobile" },
  { name: "SwiftUI/Swift", level: "intermediate", category: "mobile" },
  
  // Web Development
  { name: "HTML/CSS", level: "intermediate", category: "web" },
  { name: "JavaScript", level: "intermediate", category: "web" },
  { name: "React", level: "learning", category: "web" },
  { name: "PHP", level: "learning", category: "web" },
  
  // Systems & Infrastructure
  { name: "C++", level: "advanced", category: "systems" },
  { name: "C", level: "advanced", category: "systems" },
  { name: "Java", level: "intermediate", category: "systems" },
  { name: "Docker", level: "intermediate", category: "systems" },
  { name: "Bash", level: "intermediate", category: "systems" },
  { name: "OpenGL", level: "learning", category: "systems" },
  { name: "Erlang", level: "learning", category: "systems" },
  
  // Data & AI
  { name: "SQL", level: "advanced", category: "data" },
  { name: "R", level: "learning", category: "data" },
  { name: "Python", level: "intermediate", category: "data" },
];

const categories = ["all", "mobile", "web", "systems", "data"];

const getLevelColor = (level) => {
  switch (level) {
    case "learning":
      return "border-yellow-500/50 text-yellow-700 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-500/10";
    case "intermediate": 
      return "border-blue-500/50 text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10";
    case "advanced":
      return "border-green-500/50 text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-500/10";
    default:
      return "border-gray-500/50 text-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-500/10";
  }
};

export const SkillsSection = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {t("skills.title")}
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t("skills.description")}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {t(`skills.categories.${category}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-4 rounded-lg shadow-xs card-hover border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base">{skill.name}</h3>
              </div>
              
              <div className="flex justify-end">
                <span 
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium border",
                    getLevelColor(skill.level)
                  )}
                >
                  {t(`skills.levels.${skill.level}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
