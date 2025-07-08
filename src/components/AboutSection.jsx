import { Briefcase, Code, User, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {t("about.title").split(" ")[0]} <span className="text-primary">{t("about.title").split(" ").slice(1).join(" ")}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                {/* Placeholder para imagen */}
                <GraduationCap className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Marc Gómez Asensio</h3>
                <p className="text-primary font-medium">{t("about.role")}</p>
              </div>
            </div>

            <p className="text-muted-foreground">
              {t("about.description")}
            </p>

            <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-4 py-2 rounded-full w-fit">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {t("about.currentStatus")}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contact" className="cosmic-button">
                {t("contact.title")}
              </a>
              <a
                href="https://www.linkedin.com/in/marc-gomez-asensio/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center"
              >
                {t("about.viewLinkedin")}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{t("about.experience.mobile.title")}</h4>
                  <p className="text-muted-foreground">
                    {t("about.experience.mobile.description")}
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{t("about.experience.fullstack.title")}</h4>
                  <p className="text-muted-foreground">
                    {t("about.experience.fullstack.description")}
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{t("about.experience.teamwork.title")}</h4>
                  <p className="text-muted-foreground">
                    {t("about.experience.teamwork.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
