import { notFound } from "next/navigation";
import Image from "next/image";
import diseases from "@/data/diseases.json";

export default function DiseaseDetail({ params }) {
  console.log("Params received:", params); // Debugging
  const { id } = params;
  const disease = diseases.find((d) => d.id === id);

  if (!disease) {
    console.log("Disease not found:", id); // Debugging
    return notFound();
  }

  return (
    <div className="min-h-screen p-6 text-black bg-gray-100 h-[100vh]">
      <h1 className="text-3xl font-bold text-center mb-4">{disease.name}</h1>
      <Image
        src={disease.image}
        alt={disease.name}
        width={400}
        height={300}
        className="mx-auto rounded-lg shadow-md"
      />
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg pt-10 h-[100vw]">
        <p className=" text-2xl "><strong>Symptoms:</strong> {disease.symptoms}</p>
        <p className=" text-2xl "><strong>Organic Control:</strong> {disease.organic_control}</p>
        <p className=" text-2xl "><strong>Chemical Control:</strong> {disease.chemical_control}</p>
        <p className=" text-2xl "><strong>Causes:</strong> {disease.causes}</p>
        <p className=" text-2xl "><strong>Prevention:</strong> {disease.prevention}</p>
      </div>
    </div>
  );
}
