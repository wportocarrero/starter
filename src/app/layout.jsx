// src/app/layout.jsx
export const metadata = { title: "Kickstarter Clone" };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow">
          <div className="max-w-6xl mx-auto p-4">
            <a href="/" className="font-bold text-xl">Kickstarter Clone</a>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
