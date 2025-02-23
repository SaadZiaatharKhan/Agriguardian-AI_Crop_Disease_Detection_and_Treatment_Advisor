import { notFound } from "next/navigation";
import Image from "next/image";
import schemes from "@/data/schemes.json";

export default function SchemeDetail({ params }) {
  console.log("Params received:", params); // Debugging
  const { id } = params;
  const scheme = schemes.find((d) => d.id === id);

  if (!scheme) {
    console.log("scheme not found:", id); // Debugging
    return notFound();
  }

  return (
    <div className="min-h-screen p-6 text-black bg-gray-100 h-[100vh]">
      <h1 className="text-3xl font-bold text-center mb-4">{scheme.name}</h1>
      <Image
        src={scheme.image}
        alt={scheme.name}
        width={400}
        height={300}
        className="mx-auto rounded-lg shadow-md"
      />
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg pt-10 h-[100vw]">
        <p className=" text-2xl "><strong>benefits:</strong> {scheme.benefits}</p>
        <p className=" text-2xl "><strong>eligibility:</strong> {scheme.eligibility}</p>
        <p className=" text-2xl "><strong>application process:</strong> {scheme.application_process}</p>
        <p className=" text-2xl "><strong>government body:</strong> {scheme.government_body}</p>
        <p className=" text-2xl "><strong>Prevention:</strong> {scheme.prevention}</p>
      </div>
    </div>
  );
}
