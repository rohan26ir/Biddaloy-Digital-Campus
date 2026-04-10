import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header><Navbar /></header>
      
      <main>
        {children}
      </main>
      
      <footer><Footer /></footer>
    </>
  );
}