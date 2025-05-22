import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush } from 'react-icons/fa';
import '../pages/pages-css/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 md:px-12">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6">About Desi Etsy</h1>
        <p className="text-gray-700 text-xl leading-relaxed max-w-4xl mx-auto">
          At <span className="font-semibold text-blue-700">Desi Etsy</span>, we empower local Indian artisans to showcase their talent to the world. We’re more than just a marketplace – we’re a celebration of tradition, creativity, and craftsmanship.
        </p>
      </motion.div>

      {/* Team Section */}
      <section className="mt-20 max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          {/* Sambhav Raj */}
          <motion.div
            className="bg-white shadow-md rounded-lg p-8 text-center hover:shadow-xl transition duration-300"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="text-blue-500 text-5xl mb-4 mx-auto">
              <FaPaintBrush />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sambhav Raj</h2>
            <p className="text-sm text-gray-500 mt-1">Frontend Developer</p>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              Specialist in React.js, UI/UX, and responsive design. Sambhav ensures a seamless and engaging experience for every Desi Etsy visitor.
            </p>
          </motion.div>

          {/* Rehman Shaik */}
          <motion.div
            className="bg-white shadow-md rounded-lg p-8 text-center hover:shadow-xl transition duration-300"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="text-green-500 text-5xl mb-4 mx-auto">
              <FaCode />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Rehman Shaik</h2>
            <p className="text-sm text-gray-500 mt-1">Backend Developer</p>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              Expert in Node.js, databases, and server architecture. Rehman powers the engine behind Desi Etsy’s smooth and secure operations.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-24 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We aim to bridge the gap between rural artisans and global buyers. Through technology, we’re helping small businesses thrive, preserve Indian heritage, and promote sustainable economic growth.
        </p>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-24 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Contact Us</h2>
        <p className="text-gray-700 text-lg">📧 <span className="font-medium">support@desi-etsy.com</span></p>
        <p className="text-gray-700 text-lg mt-1">📍 <span className="font-medium">Based in India – Delivering Worldwide</span></p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
