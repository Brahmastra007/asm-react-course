import MainHeader from '@/components/main-header/main-header';
import './globals.css';

/* If you add metadata to a layout, it will automatically be added to all the pages that are
wrapped by that layout unless a page specifies its own metadata. */

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
