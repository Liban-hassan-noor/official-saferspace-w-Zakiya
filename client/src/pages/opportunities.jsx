import { motion } from "framer-motion";
import { GraduationCap, Laptop2, Users2, School } from "lucide-react";
import { useTranslation } from "react-i18next";

const opportunities = [
  {
    icon: GraduationCap,
    titleKey: "opportunities.scholarshipsTitle",
    descKey: "opportunities.scholarshipsDesc",
  },
  {
    icon: Laptop2,
    titleKey: "opportunities.techTitle",
    descKey: "opportunities.techDesc",
  },
  {
    icon: Users2,
    titleKey: "opportunities.mentorshipTitle",
    descKey: "opportunities.mentorshipDesc",
  },
  {
    icon: School,
    titleKey: "opportunities.reentryTitle",
    descKey: "opportunities.reentryDesc",
  },
];

const Opportunities = () => {
  const { t } = useTranslation("opportunities");

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-pink-700 mb-10 text-center"
      >
        {t("opportunities.pageTitle")}
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {opportunities.map(({ icon: Icon, titleKey, descKey }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-md border border-pink-100 rounded-xl p-6 flex gap-4 items-start"
          >
            <Icon className="text-green-600 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">
                {t(titleKey)}
              </h3>
              <p className="text-gray-600 mt-2">{t(descKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Opportunities;
