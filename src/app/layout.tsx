import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import DevToolsBlocker from '@/components/dev-tools-blocker';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

export const metadata: Metadata = {
  title: 'EduConnect',
  description: 'The all-in-one platform for modern education.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
          >
            <FirebaseClientProvider>
                {children}
                <Toaster />
                <FirebaseErrorListener />
            </FirebaseClientProvider>
          </ThemeProvider>
        <DevToolsBlocker />
      </body>
    </html>
  );
}
