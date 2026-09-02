import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';

/**
 * A ~120-line History API router with the same surface as the react-router-dom
 * primitives this site uses: BrowserRouter, Routes, Route, Link, NavLink,
 * useLocation, useNavigate.
 *
 * Why it exists: the build environment cannot reach the npm registry, so the
 * site ships with zero new dependencies and still has real URLs, real back/
 * forward behaviour and AnimatePresence-driven route transitions. To switch to
 * the real library later: `npm i react-router-dom` and replace this file's
 * exports with `export * from 'react-router-dom'` — no component changes.
 */

export type Location = { pathname: string; search: string; hash: string; key: string };

const read = (): Location =>
  typeof window === 'undefined'
    ? { pathname: '/', search: '', hash: '', key: 'ssr' }
    : {
        pathname: window.location.pathname || '/',
        search: window.location.search,
        hash: window.location.hash,
        key: String(window.history.state?.key ?? 'root'),
      };

type Ctx = { location: Location; navigate: (to: string, opts?: { replace?: boolean }) => void };

const RouterContext = createContext<Ctx | null>(null);

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(read);

  useEffect(() => {
    const onPop = () => setLocation(read());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;
    const key = Math.random().toString(36).slice(2, 8);
    const url = new URL(to, window.location.origin);
    if (url.pathname === window.location.pathname && !opts?.replace) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history[opts?.replace ? 'replaceState' : 'pushState']({ key }, '', url);
    setLocation(read());
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

function useRouter(): Ctx {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('Router hooks must be used inside <BrowserRouter>.');
  return ctx;
}

export const useLocation = () => useRouter().location;
export const useNavigate = () => useRouter().navigate;

export type RouteProps = { path: string; element: ReactElement };
/** Declarative marker consumed by <Routes>; never rendered directly. */
export function Route(_props: RouteProps): ReactElement | null {
  return null;
}

export function Routes({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const defs: RouteProps[] = [];
  const walk = (node: ReactNode) => {
    if (Array.isArray(node)) return node.forEach(walk);
    const el = node as ReactElement<RouteProps> | null;
    if (el && typeof el === 'object' && 'props' in el && el.props?.path) defs.push(el.props);
  };
  walk(children);
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const match = defs.find((d) => d.path === clean) ?? defs.find((d) => d.path === '*');
  return match ? match.element : null;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; replace?: boolean };

export function Link({ to, replace, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate();
  const external = /^(https?:|mailto:|tel:|#)/.test(to);
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (external || event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (rest.target === '_blank' || event.button !== 0) return;
        event.preventDefault();
        navigate(to, { replace });
      }}
      {...rest}
    />
  );
}

type NavLinkProps = Omit<LinkProps, 'className' | 'children'> & {
  className?: string | ((state: { isActive: boolean }) => string);
  children?: ReactNode | ((state: { isActive: boolean }) => ReactNode);
  end?: boolean;
};

export function NavLink({ className, children, end = true, ...rest }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = end ? pathname === rest.to : pathname.startsWith(rest.to);
  return (
    <Link
      {...rest}
      aria-current={isActive ? 'page' : undefined}
      className={typeof className === 'function' ? className({ isActive }) : className}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </Link>
  );
}
