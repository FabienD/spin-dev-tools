import './global.css';

export const metadata = {
  title: 'Dev tools',
  description: 'A collection of dev tools',
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