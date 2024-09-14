import Navbar from "@/components/Navbar";
import Carousel from "@/components/card";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
