"use client";

import React from "react";
import type { ServiceCategory } from "@/data/services";
import { ServicesTraditionIndex } from "@/components/services/ServicesTraditionIndex";
import { DarbarDoors } from "./DarbarDoors";

/** Tradition filter shared by the Darbar doors (visual index) and the service spreads. */
export function ServicesExplorer({ services }: { services: ServiceCategory[] }) {
  return (
    <ServicesTraditionIndex
      services={services}
      renderIndex={(isDimmed) => <DarbarDoors services={services} isDimmed={isDimmed} />}
    />
  );
}
