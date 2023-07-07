import Image from "next/image";
import PanoViewer from "./PanoViewer";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <PanoViewer />
    </main>
  );
}
