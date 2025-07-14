import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'QuestForge',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}