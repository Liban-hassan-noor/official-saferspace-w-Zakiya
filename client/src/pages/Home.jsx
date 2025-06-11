import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import healthcare from "../assets/healthcare.jpg";
import stories from "../assets/stories.jpg";
import support from "../assets/support.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Home = () => {
  const { t } = useTranslation();

  const cards = t("home.cards", { returnObjects: true });

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      {/* Hero Section */}
      <motion.section
        className="text-center mb-12 px-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          {t("home.heroTitle")}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {t("home.heroSubtitle")}
        </p>
      </motion.section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white border border-pink-100 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-6 flex flex-col"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <div className="mb-4">
              <img
                src={[stories, healthcare, support][index]}
                alt={card.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{card.text}</p>
            </div>
            <Link
              to={["/community", "/services", "/support"][index]}
              className="mt-auto self-start bg-green-600 text-white px-4 py-2 text-sm rounded-full hover:bg-green-700 transition-colors duration-300"
            >
              {card.button}
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
// This code defines a Home component for a React application that uses Framer Motion for animations and react-i18next for internationalization.