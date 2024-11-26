import ImageQuery from "@/components/ImageQuery";
import TextQuery from "@/components/TextQuery";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">

      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold">CLIP Query</h1>
        <p className="text-xl">CLIP Model finetuned Query User Interface</p>
        </div>  

      <div className="flex-row lg:flex justify-around mt-8">
        <div className="basis-1/2 m-2">
          <ImageQuery />
        </div>
        <div className="basis-1/2 m-2">
          <TextQuery />
        </div>
      </div>
    </div>
  );
}
