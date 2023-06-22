import React, { type ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/AppLayout/Layout/PageWrapper";
import { type IRouteType } from "./IRoute";

const generateRoute = (routes: IRouteType[]): ReactNode => {
  return routes.map((route, index) =>
    route.index ? (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>{route.element}</PageWrapper>}
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={<PageWrapper state={route.child != null ? undefined : route.state}>{route.element}</PageWrapper>}
        key={index}
      >
        {route.child != null && generateRoute(route.child)}
      </Route>
    ),
  );
};

// export const routes: ReactNode = generateRoute(appRoutes);
