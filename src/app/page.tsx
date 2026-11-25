import { ArchPortalHero } from "@/components/landing/ArchPortalHero";
import { PelliShaadiScene } from "@/components/landing/PelliShaadiScene";
import { DarbarsGallery } from "@/components/landing/DarbarsGallery";
import { DegReveal } from "@/components/landing/DegReveal";
import { VenueMap } from "@/components/landing/VenueMap";
import { RasmeinThread } from "@/components/landing/RasmeinThread";
import { DawatnamaCTA } from "@/components/landing/DawatnamaCTA";

/** The Falaknuma Marble landing page: seven scenes, one night at a Nizam's wedding. */
export default function HomePage() {
  return (
    <div className="flex w-full flex-col bg-marble text-ink">
      <ArchPortalHero />
      <PelliShaadiScene />
      <DarbarsGallery />
      <DegReveal />
      <VenueMap />
      <RasmeinThread />
      <DawatnamaCTA />
    </div>
  );
}
