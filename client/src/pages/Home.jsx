import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import your images
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
          Welcome to SaferSpace
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          A safe, anonymous space for girls and women in Kenya to share, heal,
          and find support.
        </p>
      </motion.section>

      {/* Feature Cards with Images and Animation */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            title: "Read & Share Stories",
            text: "Real, anonymous stories from survivors. Learn, feel seen, and gain hope.",
            link: "/community",
            button: "Go to Stories",
            image: stories,
          },
          {
            title: "Free Health Services",
            text: "Find safe, nearby healthcare options that support girls without cost.",
            link: "/services",
            button: "Find Services",
            image: healthcare,
          },
          {
            title: "Professional Support",
            text: "Get help from counselors, nurses, and mentors when you need it most.",
            link: "/support",
            button: "Get Support",
            image: support,
          },
        ].map(({ title, text, link, button, image }, index) => (
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
                src={image}
                alt={title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700">{title}</h3>
              <p className="text-sm text-gray-600 mt-2">{text}</p>
            </div>
            <Link
              to={link}
              className="mt-auto self-start bg-green-600 text-white px-4 py-2 text-sm rounded-full hover:bg-green-700 transition-colors duration-300"
            >
              {button}
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
