import React, { useEffect, useState } from 'react';

interface Route {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

interface RouterProps {
  routes: Route[];
}

export const Router: React.FC<RouterProps> = ({ routes }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for our custom navigation event
    window.addEventListener('navigate', onLocationChange);
    
    // Listen for browser back/forward button
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('navigate', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  // Find the matching route
  const getRouteComponent = () => {
    // First, try to find exact matches
    const exactRoute = routes.find(
      (route) => route.exact && route.path === currentPath
    );

    if (exactRoute) {
      const RouteComponent = exactRoute.component;
      return <RouteComponent />;
    }

    // Then, try partial matches
    const route = routes.find((route) => {
      if (route.exact) return false;
      return currentPath.startsWith(route.path);
    });

    if (route) {
      const RouteComponent = route.component;
      return <RouteComponent />;
    }

    // Default route - could be a 404 component
    return <div>Page not found</div>;
  };

  return <>{getRouteComponent()}</>;
};