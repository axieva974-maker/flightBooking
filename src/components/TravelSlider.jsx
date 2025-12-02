import { useState } from "react";
import { motion } from "framer-motion";
import e1 from "../assets/images/e1.jpg";
import e2 from "../assets/images/e2.jpg";

const images = [e1, e2];

export default function TravelSlider({ onFinish }) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index + 1 >= images.length) {
      onFinish && onFinish();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Dim background */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onFinish}
      ></div>

      {/* Modal container with red border and glow */}
      <div className="relative w-80 max-w-sm bg-white rounded-3xl overflow-hidden z-10 p-4 border-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
        {/* Title */}
        <div className="text-center py-4 font-semibold text-lg text-gray-900">
          Travel around the world
        </div>

        {/* Slider */}
        <div className="relative h-38 w-full  flex justify-center items-center">
          <motion.img
            key={index}
            src={images[index]}
            alt="slide"
            className="w-64 h-64 object-contain"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-gray-500 text-sm mt-1">EUROPE</p>

          <button
            onClick={nextSlide}
            className="w-full mt-6 bg-red-600 text-white py-3 rounded-full text-lg font-semibold shadow-md active:scale-95 transition"
          >
            Continue
          </button>

          <p className="text-xs text-gray-400 mt-2">powered by TripSiri</p>
        </div>
      </div>
    </div>
  );
}
