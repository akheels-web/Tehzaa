export interface HyderabadMonument {
  id: string;
  name: string;
  builtEra: string;
  precinct: string;
  architecturalHighlight: string;
  celebrationRole: string;
  editorialCopy: string;
  image: string;
  alt: string;
  creditLicense: string;
}

export const HYDERABAD_MONUMENTS: HyderabadMonument[] = [
  {
    id: "charminar",
    name: "Charminar",
    builtEra: "1591 CE • Sultan Muhammad Quli Qutb Shah",
    precinct: "Laad Bazaar & Char Kaman, Old City",
    architecturalHighlight:
      "Four 56-metre limestone-and-granite minarets crowned with lotus petals, triple-arched facades, and an open-air second-storey mosque overlooking the four historic Char Kaman arches.",
    celebrationRole:
      "Laad Bazaar bridal chooda & pearl shopping trails, Old City pre-wedding walks, and Deccani Baraat heritage inspiration.",
    editorialCopy:
      "Nothing says Hyderabad quite like catching the first morning sun through Charminar's central arch with Char Kaman framed straight down the road. Every scalloped mehrab motif and warm stucco proportion we sketch begins right here in the Old City.",
    image: "/images/real-charminar.webp",
    alt: "Original photograph of Charminar in Hyderabad with all four minarets, stucco arches, and Char Kaman visible through the central archway",
    creditLicense: "DidierTais / Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    id: "chowmahalla-palace",
    name: "Chowmahalla Palace",
    builtEra: "1750–1880s • Asaf Jahi Nizams",
    precinct: "Khilwat, Motigalli, Old City",
    architecturalHighlight:
      "The iconic butter-cream and lime-stucco scalloped arches of Khilwat Mubarak Durbar Hall, twin rooftop chhatri cupolas, nineteen Belgian crystal chandeliers, and symmetrical courtyard lawns.",
    celebrationRole:
      "Grand Hyderabadi Nikkah, chandelier-lit Walima courtyard receptions, and corporate heritage gala dinners.",
    editorialCopy:
      "Step inside Khilwat Mubarak and you instantly feel the quiet tehzeeb of Hyderabad's Asaf Jahi courts. When we style Chowmahalla-inspired Nikkah or Walima evenings, we never fight those creamy scalloped arches — just fresh mogra strings and warm candlelight.",
    image: "/images/real-chowmahalla-palace.webp",
    alt: "Original photograph of Khilwat Mubarak at Chowmahalla Palace in Hyderabad showing the cream-and-yellow scalloped arches, twin rooftop cupolas, and palace lawn",
    creditLicense: "Sailko / Wikimedia Commons (CC BY 3.0)",
  },
  {
    id: "taj-falaknuma-palace",
    name: "Taj Falaknuma Palace",
    builtEra: "1893 CE • Nawab Vikar-ul-Umra & Nizam VI",
    precinct: "Falaknuma Hilltop, 2,000 ft over Hyderabad",
    architecturalHighlight:
      "Scorpion-shaped white Italianate Palladian colonnade crowned with the gilded Asaf Jahi emblem, sweeping double white-marble ceremonial staircase, and the famed 101-seat dining hall terrace.",
    celebrationRole:
      "Intimate multi-faith destination receptions, white-rose marble terrace cocktails, and visiting CXO hospitality.",
    editorialCopy:
      "Perched 2,000 feet above the city, Falaknuma's white Palladian colonnade and twin marble staircases need zero loud sets. Crisp ivory roses, delicate foliage along the balustrades, and candlelit city views do all the talking.",
    image: "/images/real-falaknuma-palace.webp",
    alt: "Original photograph of Taj Falaknuma Palace in Hyderabad displaying the white Palladian columns, gilded crest pediment, and double marble staircase",
    creditLicense: "Joe Lachoff / Wikimedia Commons (CC BY-SA 2.0)",
  },
  {
    id: "golconda-fort",
    name: "Golconda Fort",
    builtEra: "12th–16th Century • Kakatiya & Qutb Shahi Citadel",
    precinct: "Ibrahim Bagh, West Hyderabad",
    architecturalHighlight:
      "Monolithic Deccani granite bastions, acoustic Fateh Darwaza portico engineered to carry a hand-clap up to the citadel summit, and terraced stone arches leading to Bala Hisar.",
    celebrationRole:
      "Architectural pre-wedding portraits, heritage trail welcomes for out-of-town baraatis, and nearby Gandipet destination hospitality.",
    editorialCopy:
      "Before Banjara Hills or HITEC City existed, Golconda's granite arches and echoing hilltops shaped Hyderabad's sense of scale and welcome. That timeless stone geometry still guides how we frame outdoor mandaps and sunset courtyards across West Hyderabad.",
    image: "/images/real-golconda-fort.webp",
    alt: "Original photograph of Golconda Fort in Hyderabad showing stone citadel ramparts, Deccani arches, lush green lawns, and the hilltop Bala Hisar skyline",
    creditLicense: "Bernard Gagnon / Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    id: "taramati-baradari",
    name: "Taramati Baradari",
    builtEra: "Early 17th Century • Sultan Abdullah Qutb Shah",
    precinct: "Gandipet Corridor, near Golconda",
    architecturalHighlight:
      "Two-storey sandstone-and-lime pavilion raised on an open granite plinth with twelve tall pointed Deccani arches crafted to catch monsoon breezes and natural acoustic resonance.",
    celebrationRole:
      "Golden-hour Sangeet amphitheaters, terracotta-and-marigold Haldi lawns, open-air Qawwali nights, and hillside wedding pheras.",
    editorialCopy:
      "Ask any local Hyderabad couple where outdoor celebrations feel effortless — Taramati Baradari tops the list. Built for music and evening breeze overlooking Golconda, its tall twelve-doored arches look magical with simple marigold garlands and cane seating.",
    image: "/images/real-taramati-baradari.webp",
    alt: "Original photograph of Taramati Baradari in Hyderabad showing the raised stone plinth and symmetrical twelve-doored pointed Deccani arches",
    creditLicense: "Arvind.vindhu / Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    id: "qutb-shahi-tombs",
    name: "Qutb Shahi Tombs",
    builtEra: "1543–1687 CE • Qutb Shahi Dynasty",
    precinct: "Ibrahim Bagh Gardens, Tolichowki–Golconda",
    architecturalHighlight:
      "Monumental granite-and-stucco bulbous domes framed by pointed arcaded galleries, carved lotus finials, restored stepwells, and serene Charbagh heritage gardens.",
    celebrationRole:
      "Serene dawn bridal portraits, heritage architectural inspiration for lotus-crest mandaps, and curated guest cultural walks.",
    editorialCopy:
      "Surrounded by quiet Ibrahim Bagh palms and sunlit lawns, the Tomb of Muhammad Quli Qutb Shah—founder of Hyderabad—captures our city's calmest architectural poetry: grand granite proportions softened by lush gardens.",
    image: "/images/real-qutb-shahi-tombs.webp",
    alt: "Original photograph of the Tomb of Muhammad Quli Qutb Shah at the Qutb Shahi Tombs in Hyderabad framed by pointed arches and sunlit heritage gardens",
    creditLicense: "Bernard Gagnon / Wikimedia Commons (CC BY-SA 3.0)",
  },
];
