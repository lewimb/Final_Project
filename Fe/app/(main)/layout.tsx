import Navbar from "@/components/Navbar";
import Carousel from "@/components/card";
import Footer from "@/components/footer";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
