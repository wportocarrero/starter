export const metadata = {
  title: "Kickstarter Clone",
  description: "Proyecto estilo Kickstarter con login tradicional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
