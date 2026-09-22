import Link from "next/link";
import Image from "next/image";
import diseases from "@/data/diseases.json";

export default function CropDiseases() {
  return (
    <div className="w-full bg-gray-100 min-h-screen p-10">
      <div className="flex flex-wrap justify-center gap-8">
        {diseases.map((disease) => (
          <Link key={disease.id} href={`/disease/${disease.id}`}>
            <div className="bg-white text-black p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer w-72 h-64">
              <Image
                src={disease.image}
                alt={disease.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-2 text-center">{disease.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
