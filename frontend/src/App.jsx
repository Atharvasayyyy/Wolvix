import { AppProviders } from "@/providers/app-providers";
import { RouterProvider, matchPath, usePathname } from "@/lib/router";
import LandingPage from "@/app/(marketing)/page";
import LoginPage from "@/app/(auth)/login/page";
import SignupPage from "@/app/(auth)/signup/page";
import ForgotPasswordPage from "@/app/(auth)/forgot-password/page";
import PlatformLayout from "@/app/(platform)/layout";
import DashboardPage from "@/app/(platform)/dashboard/page";
import IdeasPage from "@/app/(platform)/ideas/page";
import IdeaDetailPage from "@/app/(platform)/ideas/[id]/page";
import CreateIdeaPage from "@/app/(platform)/ideas/create/page";
import TeamsPage from "@/app/(platform)/teams/page";
import ProjectsPage from "@/app/(platform)/projects/page";
import WorkspacePage from "@/app/(platform)/workspace/[projectId]/page";
import ProfilePage from "@/app/(platform)/profile/[username]/page";
import ProfileSettingsPage from "@/app/(platform)/settings/profile/page";
import AchievementsPage from "@/app/(platform)/achievements/page";
import LeaderboardPage from "@/app/(platform)/leaderboard/page";
import NotificationsPage from "@/app/(platform)/notifications/page";
import LaunchesPage from "@/app/(platform)/launches/page";
import LaunchDetailPage from "@/app/(platform)/launches/[id]/page";
import HiringPage from "@/app/(platform)/hiring/page";
import JobDetailPage from "@/app/(platform)/jobs/[id]/page";
import AiToolsPage from "@/app/(platform)/ai-tools/page";
import { useAuthStore } from "@/store/auth-store";

const platformRoutes = [
  ["/dashboard", DashboardPage],
  ["/ideas/create", CreateIdeaPage],
  ["/ideas/:id", IdeaDetailPage],
  ["/ideas", IdeasPage],
  ["/teams", TeamsPage],
  ["/projects", ProjectsPage],
  ["/workspace/:projectId", WorkspacePage],
  ["/profile/:username", ProfilePage],
  ["/settings/profile", ProfileSettingsPage],
  ["/achievements", AchievementsPage],
  ["/leaderboard", LeaderboardPage],
  ["/notifications", NotificationsPage],
  ["/launches/:id", LaunchDetailPage],
  ["/launches", LaunchesPage],
  ["/hiring", HiringPage],
  ["/jobs/:id", JobDetailPage],
  ["/ai-tools", AiToolsPage]
];

const protectedPrefixes = ["/dashboard", "/ideas/create", "/workspace", "/teams", "/projects", "/settings", "/notifications", "/achievements", "/ai-tools", "/launches", "/hiring", "/jobs"];

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-white/58">This Wolvix route does not exist.</p>
      </div>
    </main>
  );
}

function RouteSwitch() {
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);

  if (pathname === "/") return <LandingPage />;
  if (pathname === "/login") return <LoginPage />;
  if (pathname === "/signup") return <SignupPage />;
  if (pathname === "/forgot-password") return <ForgotPasswordPage />;

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !hydrated) {
    return (
      <main className="grid min-h-screen place-items-center px-4 text-sm text-white/58">
        Restoring Wolvix session...
      </main>
    );
  }

  if (isProtected && !token) {
    window.history.replaceState({}, "", `/login?next=${encodeURIComponent(pathname)}`);
    return <LoginPage />;
  }

  for (const [pattern, Page] of platformRoutes) {
    if (matchPath(pathname, pattern)) {
      return (
        <PlatformLayout>
          <Page />
        </PlatformLayout>
      );
    }
  }

  return <NotFoundPage />;
}

export default function App() {
  return (
    <RouterProvider>
      <AppProviders>
        <RouteSwitch />
      </AppProviders>
    </RouterProvider>
  );
}
