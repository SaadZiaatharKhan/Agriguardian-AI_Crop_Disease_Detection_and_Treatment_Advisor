import Image from "next/image";
import ThemeToggle from "@/components/toggle-dark-mode";
import Wavy_Background_Behind_Problems from "@/components/start-site/wavy_background_behind_problems";
import Description_below_problems from "@/components/start-site/description";
import Globe from "@/components/start-site/globe";
import Sparkles_Effect_Button from "@/components/start-site/sparkles-effect-button";

export default function Home() {
  
  return (
    <main className="flex min-h-full justify-center flex-col items-center p-4 w-full overflow-x-hidden cursor-pointer select-none	">
      <nav className="flex items-center justify-between w-full p-2 sticky top-0 z-20">
      <Image height={100} width={100} src="/assets/images/logo.png" alt="Logo" />
      <ThemeToggle/>
      </nav>
      <div className="-z-10 w-full h-auto overflow-x-auto"><Wavy_Background_Behind_Problems/></div>
      <div><Description_below_problems/></div>
      <div>
        <Globe/>
      </div>
      <div className="text-5xl font-sans font-semibold text-green-800 m-5 p-5 dark:text-white">Amplify Your Farm Productivity</div>
      <div className="flex flex-col p-5 m-5 w-full h-full justify-center items-center md:flex-row">
        <div >
          <video src="/assets/videos/site-start-1.mp4" autoPlay muted loop width="700" height="580"></video>
        </div>
        <div>
          <h3 className="text-4xl text-black dark:text-white font-medium p-3 m-3">Get Instant Crop Diagnosis</h3>
          <p className="text-2xl text-black dark:text-white p-3 m-3">Take A Photo Of Your Sick Plant And Receive Free Treatment Recommendations In Seconds!</p>
        </div>
      </div>
      <div className="flex flex-col p-5 m-5 w-full h-full justify-center items-center md:flex-row">
        <div>
          <h3 className="text-4xl text-black dark:text-white font-medium p-3 m-3">Seek Professional Guidance</h3>
          <p className="text-2xl text-black dark:text-white p-3 m-3">Need some farming advice? Our community of experienced farmers is here to help. Ask your questions, share your knowledge, and grow together.</p>
        </div>
        <div>
          <video src="/assets/videos/site-start-2.mp4" autoPlay muted loop width="700" height="580"></video>
        </div>
      </div>
      <div className="flex flex-col p-5 m-5 w-full h-full justify-center items-center md:flex-row">
        <div>
          <video src="/assets/videos/site-start-3.mp4" autoPlay muted loop width="700" height="580"></video>
        </div>
        <div>
          <h3 className="text-4xl text-black dark:text-white font-medium p-3 m-3">Looking to optimize your crop yields?</h3>
          <p className="text-2xl text-black dark:text-white p-3 m-3">Want to protect your crops from diseases? Our library offers resources on prevention and treatment.</p>
        </div>
      </div>
      
      <div>
          <Sparkles_Effect_Button/>
      </div>

    </main>
  );
}
