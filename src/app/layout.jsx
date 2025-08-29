// src/app/layout.jsx
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Kickstarter Clone",
  description: "Plataforma de crowdfunding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* ✅ Navbar global */}
        <Navbar />
        
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
