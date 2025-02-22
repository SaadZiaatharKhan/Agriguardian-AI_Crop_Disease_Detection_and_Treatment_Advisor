"use client"

import { useState } from "react"

export default function Fertilizer({data}){

    const [land,setland] = useState(1)

    function setland_function() {
        setland(land + 1);
      }

    function reset_setland_function() {
        setland(1);
      }

    return(
        <main>
            <div className="flex border-solid border-2 border-black bg-white dark:bg-slate-800">
            <div className="flex flex-col m-3 p-3 border-solid border-2 border-black bg-green-300 dark:bg-black justify-center items-center">
                <h4 className="text-2xl m-2 p-2">Fertilizer Name:</h4>
                <p className="text-5xl m-2 p-2">{`${data["Fertilizer"]}`}</p>
            </div>
            <div className="flex flex-col m-3 p-3 border-solid border-2 border-black bg-green-300 dark:bg-black justify-center items-center">
                <h4 className="text-2xl m-2 p-2">Land(in Acre):</h4>
                <p className="text-5xl m-2 p-2">{land}</p>
            </div>
            <div className="flex flex-col m-3 p-3 border-solid border-2 border-black bg-green-300 dark:bg-black justify-center items-center">
                <h4 className="text-2xl m-2 p-2">Fertilizer Amount(in kg):</h4>
                <p className="text-5xl m-2 p-2">{(data["Fertilizer Amount (kg/acre)"]*land).toFixed(2)}</p>
            </div>
            <div className="flex flex-col m-3 p-3 border-solid border-2 border-black bg-white dark:bg-black justify-center items-center">
                <button className="border-solid border-2 border-black bg-sky-400 m-3 p-3" onClick={setland_function}>ADD</button>
                <button className="border-solid border-2 border-black bg-sky-400 m-3 p-3" onClick={reset_setland_function}>RESET</button>
            </div>
            </div>
            <div className="text-red-800 text-sm p-2 m-2">
            <p>NOTE: THIS DATA IS AI GENERATED. ALWAYS CONSULT EXPERTS BEFORE USING ANY FERTILIZERS.</p>
            </div>
        </main>
    )
} 