import React, { useEffect, useState, useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

console.log(GEMINI_API_KEY, typeof(GEMINI_API_KEY));

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function fetchAbout(disease, language) {

  const prompt = `Tell About ${disease} in 30 words in ${language}.`;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  return result.response.text();
}

async function fetchCauses(disease, severity, language) {
  
  const prompt = `Tell Causes of ${disease} of ${severity} in 90 words in ${language}.`;

  const result = await model.generateContent(prompt);
  
  return result.response.text();
}

async function fetchPrevention(disease, language) {

  const prompt = `Tell Prevention of ${disease} in 70 words in ${language}.`;

  const result = await model.generateContent(prompt);
  
  return result.response.text();
}

async function fetchAftermath(disease, severity, language) {

  const prompt = `Tell What to do after ${disease} of severity ${severity} in 90 words in ${language}`;

  const result = await model.generateContent(prompt);
  
  return result.response.text();
}

const StickyScroll = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Card({ data, language }) {
  const [about, setAbout] = useState('');
  const [causes, setCauses] = useState('');
  const [prevention, setPrevention] = useState('');
  const [aftermath, setAftermath] = useState('');

  useEffect(() => {
    async function fetchData() {
      const aboutText = await fetchAbout(data["Disease Prediction"], language);
      const causesText = await fetchCauses(data["Disease Prediction"], data["Severity"], language);
      const preventionText = await fetchPrevention(data["Disease Prediction"], language);
      const aftermathText = await fetchAftermath(data["Disease Prediction"], data["Severity"], language);

      setAbout(aboutText);
      setCauses(causesText);
      setPrevention(preventionText);
      setAftermath(aftermathText);
    }
    
    fetchData();
  }, [data]);

  const content = [
    {
      title: "Predicted Disease",
      description: `${data["Disease Prediction"]}`,
    },
    {
      title: "About",
      description: about,
    },
    {
      title: "Causes",
      description: causes,
    },
    {
      title: "Prevention",
      description: prevention,
    },
    {
      title: "What To Do Now?",
      description: aftermath,
    },
  ];

  return (
    <p className="h-fit w-fit bg-black">
      <div className="p-3">
        <StickyScroll content={content} />
      </div>
    </p>
  );
}


const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      
      <p className="text-white">{title}</p>
    </li>
  );
};
