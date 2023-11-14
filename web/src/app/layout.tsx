import Script from 'next/script';
import './global.css';

export const metadata = {
  title: 'Dev tools - UUID, Password, Base64, JSON, URL',
  description: 'Dev tools - UUID & Password generators, Base64 encode/decode, JSON Pretifier/Minifie, URL encode/decode',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}