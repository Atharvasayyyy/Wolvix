import "./globals.css";
import { AppProviders } from "@/providers/app-providers";

export const metadata = {
  title: "Wolvix - Startup Collaboration Network",
  description: "The future of startup collaboration platforms."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
