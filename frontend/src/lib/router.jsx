"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);

const normalize = (path) => path || "/";

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(() => ({
    pathname: normalize(window.location.pathname),
    search: window.location.search
  }));

  const sync = useCallback(() => {
    setLocation({ pathname: normalize(window.location.pathname), search: window.location.search });
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [sync]);

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (!to) return;
    const url = new URL(to, window.location.origin);
    if (replace) window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    else window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    sync();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [sync]);

  const value = useMemo(() => ({ ...location, navigate }), [location, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function Link({ href, children, onClick, replace = false, ...props }) {
  const router = useRouter();

  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
        event.preventDefault();
        router.push(href, { replace });
      }}
      {...props}
    >
      {children}
    </a>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useRouter must be used inside RouterProvider");
  return {
    pathname: context.pathname,
    search: context.search,
    push: context.navigate,
    replace: (to) => context.navigate(to, { replace: true })
  };
}

export function useNavigate() {
  return useRouter().push;
}

export function usePathname() {
  return useRouter().pathname;
}

export function useSearchParams() {
  return new URLSearchParams(useRouter().search);
}

export function useParams() {
  const { pathname } = useRouter();
  const patterns = [
    ["/ideas/:id", /^\/ideas\/([^/]+)$/],
    ["/jobs/:id", /^\/jobs\/([^/]+)$/],
    ["/launches/:id", /^\/launches\/([^/]+)$/],
    ["/profile/:username", /^\/profile\/([^/]+)$/],
    ["/workspace/:projectId", /^\/workspace\/([^/]+)$/]
  ];

  for (const [pattern, regex] of patterns) {
    const match = pathname.match(regex);
    if (!match) continue;
    const key = pattern.match(/:([^/]+)/)?.[1];
    return key ? { [key]: decodeURIComponent(match[1]) } : {};
  }

  return {};
}

export function matchPath(pathname, pattern) {
  if (pattern === pathname) return {};
  const keys = [];
  const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, (part) => {
    keys.push(part.slice(1));
    return "([^/]+)";
  })}$`);
  const match = pathname.match(regex);
  if (!match) return null;
  return keys.reduce((params, key, index) => {
    params[key] = decodeURIComponent(match[index + 1]);
    return params;
  }, {});
}
