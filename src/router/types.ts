import type { UIMatch, Location } from '@remix-run/react';

export type RouteHandle<Data = unknown, LocationState = unknown> =
    | {
          breadcrumb?: (
              match: RouteMatch<Data>,
              location: Location<LocationState>
          ) => React.ReactNode;
      }
    | undefined;

export type RouteMatch<Data = unknown> = UIMatch<Data, RouteHandle<Data>>;
