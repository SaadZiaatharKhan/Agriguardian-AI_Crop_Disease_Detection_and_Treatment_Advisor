"use client";
import React from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import AnimatedToolTip from "./animated-tooltip";

export default function LinkPreviewText3() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <h1 className="text-neutral-500 dark:text-neutral-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-bold	text-b">Technology Stack:
      </h1>
      <div className="w-fit flex flex-wrap space-x-3">
        <div className="flex flex-col">
          <h3 className="text-2xl">Frontend:</h3>
          <LinkPreview url="https://html.com/" className="font-bold">
            HTML
          </LinkPreview>
          <LinkPreview url="https://css3.com/" className="font-bold">
            CSS
          </LinkPreview>
          <LinkPreview url="https://www.javascript.com/" className="font-bold">
            JavaScript
          </LinkPreview>
          <LinkPreview url="https://react.dev/" className="font-bold">
            React
          </LinkPreview>
          <LinkPreview url="https://angular.dev/" className="font-bold">
            Angular
          </LinkPreview>
          <LinkPreview url="https://vitejs.dev/" className="font-bold">
            Vite
          </LinkPreview>
          <LinkPreview url="https://tailwindcss.com/" className="font-bold">
            TailWindCSS
          </LinkPreview>
          <LinkPreview url="https://nextjs.org/" className="font-bold">
            NextJS
          </LinkPreview>
          <LinkPreview url="https://ui.shadcn.com/" className="font-bold">
            ShadCN
          </LinkPreview>
          <LinkPreview url="https://ui.aceternity.com/" className="font-bold">
            AceternityUI
          </LinkPreview>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl">Backend:</h3>
          <LinkPreview url="https://nextjs.org/" className="font-bold">
            NextJS
          </LinkPreview>
          <LinkPreview url="https://nodejs.org/en" className="font-bold">
            NodeJS
          </LinkPreview>
          <LinkPreview url="https://expressjs.com/" className="font-bold">
            ExpressJS
          </LinkPreview>
          <LinkPreview url="https://www.djangoproject.com/" className="font-bold">
            Django
          </LinkPreview>
          <LinkPreview url="https://fastapi.tiangolo.com/" className="font-bold">
            FastAPI
          </LinkPreview>
          <LinkPreview url="https://getstream.io/" className="font-bold">
            Stream
          </LinkPreview>
          <LinkPreview url="https://open-meteo.com/" className="font-bold">
            Open-Meteo
          </LinkPreview>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl">Database:</h3>
          <LinkPreview url="https://appwrite.io/" className="font-bold">
            AppWrite
          </LinkPreview>
          <LinkPreview url="https://www.mongodb.com/" className="font-bold">
            MongoDB
          </LinkPreview>
          <LinkPreview url="https://www.mysql.com/" className="font-bold">
            MySQL
          </LinkPreview>
          <LinkPreview url="https://www.postgresql.org/" className="font-bold">
            PostgreSQL
          </LinkPreview>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl">Mobile Application:</h3>
          <LinkPreview url="https://reactnative.dev/" className="font-bold">
            React Native
          </LinkPreview>
          <LinkPreview url="https://www.nativewind.dev/" className="font-bold">
            NativeWind
          </LinkPreview>
          <LinkPreview url="https://expo.dev/" className="font-bold">
            Expo
          </LinkPreview>
          <LinkPreview url="https://developer.android.com/studio" className="font-bold">
            Android Studio
          </LinkPreview>
          <LinkPreview url="https://flutter.dev/" className="font-bold">
            Flutter
          </LinkPreview>
          <LinkPreview url="https://kotlinlang.org/" className="font-bold">
            Kotlin
          </LinkPreview>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl">ML Model Training:</h3>
          <LinkPreview url="https://www.python.org/" className="font-bold">
            Python
          </LinkPreview>
          <LinkPreview url="https://scikit-learn.org/stable/" className="font-bold">
            Scikit-Learn
          </LinkPreview>
          <LinkPreview url="https://keras.io/" className="font-bold">
            Keras
          </LinkPreview>
          <LinkPreview url="https://www.tensorflow.org/learn" className="font-bold">
            TensorFlow
          </LinkPreview>
          <LinkPreview url="https://pytorch.org/" className="font-bold">
            PyTorch
          </LinkPreview>
          <LinkPreview url="https://opencv.org/" className="font-bold">
            OpenCV
          </LinkPreview>
          <LinkPreview url="https://huggingface.co/" className="font-bold">
            HuggingFace
          </LinkPreview>
          <LinkPreview url="https://www.kaggle.com/" className="font-bold">
            Kaggle
          </LinkPreview>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl">Generative AI:</h3>
          <LinkPreview url="https://platform.openai.com/docs/overview" className="font-bold">
            OpenAI
          </LinkPreview>
          <LinkPreview url="https://mistral.ai/" className="font-bold">
            MistralAI
          </LinkPreview>
          <LinkPreview url="https://ollama.com/" className="font-bold">
            Ollama
          </LinkPreview>
          <LinkPreview url="https://gemini.google.com/app?hl=en-IN" className="font-bold">
            Gemini
          </LinkPreview>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl">Version Control:</h3>
          <LinkPreview url="https://git-scm.com/" className="font-bold">
            Git
          </LinkPreview>
          <LinkPreview url="https://github.com/" className="font-bold">
            GitHub
          </LinkPreview>
          <LinkPreview url="https://about.gitlab.com/" className="font-bold">
            GitLab
          </LinkPreview>
          </div>
      </div>
      <h1 className="text-neutral-500 dark:text-neutral-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-bold	text-b">Members:
      </h1>
    </div>
  );
}
