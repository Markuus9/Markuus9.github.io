import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      e.target,
      import.meta.env.VITE_PUBLIC_KEY
    )
    .then((result) => {
      console.log(result.text);
      setTimeout(() => {
        toast({
          title: t("contact.success"),
          description: t("contact.successDescription"),
        });
        setIsSubmitting(false);
      }, 1500);
      setFormData({ name: "", email: "", message: "" });
    }, (error) => {
      console.error(error.text);
      toast({
        title: t("contact.error"),
        description: t("contact.errorDescription"),
        variant: "destructive",
      });
      setIsSubmitting(false);
    });
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {t("contact.title")}
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t("contact.description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
              {t("contact.info.title")}
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 justify-center md:justify-start">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-start md:text-left">{t("contact.info.email")}</h4>
                  <a
                    href="mailto:marcgomezasensio@icloud.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    marcgomezasensio@icloud.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4 justify-start md:justify-start">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-start md:text-left">{t("contact.info.location")}</h4>
                  <span className="text-muted-foreground">
                    Barcelona, Spain
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8 w-full">
              <h4 className="font-medium mb-4 text-center md:text-left">{t("contact.info.connect")}</h4>
              <div className="flex space-x-6 justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/in/marc-gomez-asensio/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-primary" />
                </a>
                <a 
                  href="https://github.com/Markuus9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div
            className="bg-card p-8 rounded-lg shadow-xs flex flex-col items-center md:items-stretch"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-center">{t("contact.sendMessage")}</h3>

            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder={t("contact.placeholders.name")}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder={t("contact.placeholders.email")}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                  placeholder={t("contact.placeholders.message")}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? t("contact.sending") : t("contact.send")}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
