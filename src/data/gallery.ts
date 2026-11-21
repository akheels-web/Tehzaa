export type GalleryCategory =
  | "All"
  | "Weddings"
  | "Floral"
  | "Catering"
  | "Corporate"
  | "Family";

export type GalleryTradition =
  | "All Traditions"
  | "Hindu Ceremonies"
  | "Muslim Ceremonies"
  | "Sikh & Christian"
  | "Hyderabadi Culinary"
  | "Corporate & Galas";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Weddings" | "Floral" | "Catering" | "Corporate" | "Family";
  tradition: Exclude<GalleryTradition, "All Traditions">;
  location: string;
  venue: string;
  image: string;
  description: string;
  craftNotes: string;
  tags: string[];
  date: string;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Weddings",
  "Floral",
  "Catering",
  "Corporate",
  "Family",
];

export const GALLERY_TRADITIONS: GalleryTradition[] = [
  "All Traditions",
  "Hindu Ceremonies",
  "Muslim Ceremonies",
  "Sikh & Christian",
  "Hyderabadi Culinary",
  "Corporate & Galas",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-13",
    title: "Chowmahalla Khilwat-Style Crystal & Mogra Reception",
    category: "Weddings",
    tradition: "Muslim Ceremonies",
    location: "Old City, Hyderabad",
    venue: "Chowmahalla Palace Khilwat Courtyard",
    image: "/images/real-chowmahalla-palace.webp",
    description:
      "Pale butter-cream scalloped arches draped with fresh mogra garlands and sparkling chandeliers for an unforgettable Hyderabadi Walima evening.",
    craftNotes:
      "Fresh jasmine strings hung cleanly without touching antique lime stucco, lighting up the fountain courtyard naturally.",
    tags: ["Chowmahalla Palace", "Walima Reception", "Mogra & Chandeliers", "Old City"],
    date: "Signature Royal",
  },
  {
    id: "gal-14",
    title: "Proper Hyderabadi Shaadi Dawat — Biryani to Qubani",
    category: "Catering",
    tradition: "Hyderabadi Culinary",
    location: "Banjara Hills, Hyderabad",
    venue: "Taj Krishna Heritage Lawn",
    image: "/images/hyd-muslim-dawat-spread.webp",
    description:
      "Copper handis of Kachche Gosht ki Dum Biryani, creamy white Sufiyani Biryani, crispy Lukhmi, stone-seared Pathar ka Gosht, plus Qubani & Double ka Meetha.",
    craftNotes:
      "Full coal-dum kitchen set up out of guest sightlines so every round hits the buffet piping hot.",
    tags: ["Dum Biryani", "Sufiyani Biryani", "Lukhmi & Pathar", "Qubani Malai"],
    date: "Shaadi Dawat",
  },
  {
    id: "gal-15",
    title: "Traditional Telugu Pelli Vindhu Bhojanam on Arati Aku",
    category: "Catering",
    tradition: "Hyderabadi Culinary",
    location: "Jubilee Hills, Hyderabad",
    venue: "JRC Convention Lawns",
    image: "/images/hyd-telugu-vindhu-leaf.webp",
    description:
      "Sunlight sit-down Muhurtham feast: Mudda Pappu with Avakaya & ghee, Chintapandu Pulihora, Gutti Vankaya, Ulavacharu, Bobbatlu & Atreyapuram Pootharekulu.",
    craftNotes:
      "Cooked inside a locked 100% Pure Vegetarian kitchen wing and served in loving pankti order by seasoned hosts.",
    tags: ["Pelli Vindhu", "Arati Aku", "Pure Veg", "Gutti Vankaya & Pootharekulu"],
    date: "Muhurtham Lunch",
  },
  {
    id: "gal-16",
    title: "Taj Falaknuma Hilltop Rose & Marble Reception",
    category: "Weddings",
    tradition: "Sikh & Christian",
    location: "Falaknuma, Hyderabad",
    venue: "Taj Falaknuma Palace Terrace",
    image: "/images/real-falaknuma-palace.webp",
    description:
      "All-white Italian marble verandah lined gently with ivory roses, blush peonies, and candle lanterns overlooking Hyderabad's twinkling skyline.",
    craftNotes:
      "Soft pastels designed to complement the white palace marble rather than fight it.",
    tags: ["Taj Falaknuma Palace", "White Marble", "Candlelight", "Hilltop Views"],
    date: "Winter Reception",
  },
  {
    id: "gal-17",
    title: "Taramati Baradari Sunset Sangeet & Arches",
    category: "Floral",
    tradition: "Hindu Ceremonies",
    location: "Gandipet Corridor, Hyderabad",
    venue: "Taramati Baradari Pavilion",
    image: "/images/real-taramati-baradari.webp",
    description:
      "Golden-hour marigold drapes, cane lounge seating, terracotta pots, and breezy fairy lights weaving across open stone arches overlooking Golconda Fort.",
    craftNotes:
      "Earthy open-air styling built to frame the historic 12-arched stone silhouette at dusk.",
    tags: ["Taramati Baradari", "Sunset Sangeet", "Golconda Views", "Marigold"],
    date: "Golden Hour",
  },
  {
    id: "gal-1",
    title: "Sacred Telugu Pelli Pandiri & Dawn Kalyana Mandapam",
    category: "Weddings",
    tradition: "Hindu Ceremonies",
    location: "Jubilee Hills, Hyderabad",
    venue: "JRC Convention Lawns",
    image: "/images/floral-mandap-indian.webp",
    description:
      "Real banana stalks, mango leaf thoranalu, fresh malli jasmine, and a vented Agni Kundam for dawn Jeelakarra-Bellam & Mangalya Dharanam.",
    craftNotes:
      "Teak four-pillar Pandiri conditioned early morning so every flower stays crisp through Talambralu.",
    tags: ["Telugu Pelli", "Pelli Pandiri", "Jasmine", "Muhurtham"],
    date: "Dawn Muhurtham",
  },
  {
    id: "gal-2",
    title: "Deccani Nikkah & Arsi-Mushaf Mirror Pavilion",
    category: "Weddings",
    tradition: "Muslim Ceremonies",
    location: "Banjara Hills, Hyderabad",
    venue: "Taj Krishna Heritage Lawn",
    image: "/images/nikkah-walima-arch.webp",
    description:
      "Ivory scalloped floral backdrop crafted for peaceful Ijab-o-Qubul vows, delicate parda screens, and an intimate Arsi-Mushaf mirror moment.",
    craftNotes:
      "Calm white mogra and antique brass fanoos lighting tailored around elders' seating.",
    tags: ["Nikkah Stage", "Arsi-Mushaf", "Ijab-o-Qubul", "Banjara Hills"],
    date: "Nikkah Morning",
  },
  {
    id: "gal-18",
    title: "Midnight Irani Chai, Filter Kaapi & Mithai Parlor",
    category: "Catering",
    tradition: "Hyderabadi Culinary",
    location: "Jubilee Hills, Hyderabad",
    venue: "Private Villa Courtyard",
    image: "/images/irani-chai-mithai-parlor.webp",
    description:
      "Porcelain cups of creamy Irani Chai with warm Osmania biscuits beside frothy brass-davara Filter Kaapi, Double ka Meetha, and hot Jalebi-Rabri.",
    craftNotes:
      "Twin heritage beverage counters — everyone's favorite hangout spot once the DJ kicks off.",
    tags: ["Irani Chai", "Filter Kaapi", "Osmania Biscuits", "Live Mithai"],
    date: "Late-Night Counter",
  },
  {
    id: "gal-5",
    title: "Yellow Gota-Patti Manjha & Marwari Haldi Courtyard",
    category: "Floral",
    tradition: "Hindu Ceremonies",
    location: "Gandipet, Hyderabad",
    venue: "Osmansagar Waterfront Villa",
    image: "/images/haldi-mehendi-courtyard.webp",
    description:
      "Sun-soaked yellow marigold cascades, flower-filled brass urlis, and a floral jhoola swing that works equally well for Telugu Haldi or Hyderabadi Manjha.",
    craftNotes:
      "Waterproof floral flooring with organic turmeric bowls and gota-patti bangles on tap.",
    tags: ["Haldi & Manjha", "Banti Puvvu", "Floral Jhoola", "Gandipet"],
    date: "Daytime Courtyard",
  },
  {
    id: "gal-6",
    title: "Full Dhamaka Baraat, Marfa & Vintage Bagghi",
    category: "Weddings",
    tradition: "Hindu Ceremonies",
    location: "Shamshabad, Hyderabad",
    venue: "Novotel Airport Heritage Gardens",
    image: "/images/baraat-grand-entry.webp",
    description:
      "High-energy Punjabi Dhol and Hyderabadi Tasha-Marfa processions leading antique tourers right up to the Jaimala & gate Milni.",
    craftNotes:
      "Tight driveway coordination with dedicated route captains so the baraat hits the mandap right on cue.",
    tags: ["Baraat & Marfa", "Vintage Tourer", "Dhol", "Jaimala"],
    date: "Evening Procession",
  },
  {
    id: "gal-7",
    title: "Fresh Jasmine Phoolon Ki Chadar Walk",
    category: "Floral",
    tradition: "Hindu Ceremonies",
    location: "Begumpet, Hyderabad",
    venue: "Chiran Fort Heritage Grounds",
    image: "/images/bridal-entry-indian.webp",
    description:
      "A heartwarming bridal walk beneath hand-knotted white tube-rose and rose buds carried by brothers, accompanied by live acoustic strings.",
    craftNotes:
      "Feather-light concealed bamboo frame wrapped completely in chilled jasmine buds.",
    tags: ["Phoolon Ki Chadar", "Bridal Entry", "Jasmine", "Begumpet"],
    date: "Twilight Entry",
  },
  {
    id: "gal-8",
    title: "HITEC City Leadership Summit & Gala Night",
    category: "Corporate",
    tradition: "Corporate & Galas",
    location: "HITEC City, Hyderabad",
    venue: "HICC Novotel Convention Centre",
    image: "/images/corporate-gala-hyderabad.webp",
    description:
      "Bright wide-screen LED keynote production transforming cleanly into a relaxed black-tie dinner with regional tasting stations.",
    craftNotes:
      "Zero audio hiccups during morning keynotes, followed by fast 45-minute gala room flip.",
    tags: ["Corporate Summit", "HITEC City", "HICC", "Gala Dinner"],
    date: "Enterprise Summit",
  },
  {
    id: "gal-9",
    title: "Golconda Garden Anand Karaj & Cathedral Sanctuary",
    category: "Weddings",
    tradition: "Sikh & Christian",
    location: "Gachibowli, Hyderabad",
    venue: "Golconda Resorts Courtyard",
    image: "/images/anand-karaj-cathedral-garden.webp",
    description:
      "Calm morning ivory-chanderi pavilion with white hydrangeas, blush roses, and clean bolster seating built with deep reverence for sacred rituals.",
    craftNotes:
      "Elevated respectful Palki Sahib canopy with gentle dawn misting on open lawns.",
    tags: ["Anand Karaj", "Cathedral Garden", "Ivory Silk", "Morning Ceremony"],
    date: "Morning Sanctuary",
  },
  {
    id: "gal-10",
    title: "Sanchaq Thaals, Seemantham & Home Blessings",
    category: "Family",
    tradition: "Hindu Ceremonies",
    location: "Jubilee Hills, Hyderabad",
    venue: "Private Residence Verandah",
    image: "/images/family-celebration-indian.webp",
    description:
      "Intimate ghar-ka-function styling featuring fresh mango thoranalu, decorated bridal Sanchaq/Khada Dupatta trays, or a floral cradle for naming day.",
    craftNotes:
      "Compact apartment- and villa-friendly decor packed down cleanly at midnight.",
    tags: ["Sanchaq", "Seemantham", "Ghar Function", "Jubilee Hills"],
    date: "Home Celebration",
  },
  {
    id: "gal-11",
    title: "Moinabad Banyan-Canopy 50th Anniversary Dinner",
    category: "Family",
    tradition: "Muslim Ceremonies",
    location: "Moinabad, Hyderabad",
    venue: "Private Farmhouse Retreat",
    image: "/images/hero-indian-wedding.webp",
    description:
      "Starlit family tribute evening under banyan trees with printed nostalgia photo walls, live acoustic ghazals, and hot copper-deg dining.",
    craftNotes:
      "Full farmhouse standby power, cozy heaters/coolers, and elder-friendly seating heights.",
    tags: ["50th Anniversary", "Farmhouse Party", "Ghazal Night", "Moinabad"],
    date: "Milestone Evening",
  },
  {
    id: "gal-12",
    title: "Financial District CXO Conclave & Awards Night",
    category: "Corporate",
    tradition: "Corporate & Galas",
    location: "Financial District, Hyderabad",
    venue: "Sheraton Hyderabad Ballroom",
    image: "/images/corporate-gala-hyderabad.webp",
    description:
      "Warm hospitality-first executive evening pairing sleek stage design with Bidriware speaker mementos and artisanal Hyderabadi dining.",
    craftNotes:
      "Express QR registration desks and bespoke pearl-and-Bidri executive gift boxes.",
    tags: ["Financial District", "Award Night", "Bidri Gifting", "Corporate"],
    date: "Annual Awards",
  },
  {
    id: "gal-19",
    title: "Charminar & Laad Bazaar Heritage Wedding Trail",
    category: "Weddings",
    tradition: "Muslim Ceremonies",
    location: "Old City, Hyderabad",
    venue: "Charminar & Char Kaman Precinct",
    image: "/images/real-charminar.webp",
    description:
      "Early morning bridal pearl-and-chooda walks beneath the iconic 1591 minarets and Char Kaman arches before heading into Khilwat receptions.",
    craftNotes:
      "Dawn crowd timing and guest hospitality curated smoothly around Old City heritage landmarks.",
    tags: ["Charminar", "Old City", "Heritage Walk", "Chooda & Pearls"],
    date: "Heritage Icon",
  },
  {
    id: "gal-20",
    title: "Golconda Citadel Ramparts & Deccani Stone Arches",
    category: "Floral",
    tradition: "Hindu Ceremonies",
    location: "Ibrahim Bagh, Hyderabad",
    venue: "Golconda Fort Precinct",
    image: "/images/real-golconda-fort.webp",
    description:
      "Sweeping granite bastions and open green citadel lawns inspiring Tehzaa's stone-toned mandap plinths, brass diyas, and sunset acoustic evenings.",
    craftNotes:
      "Architectural reverence with zero invasive mounting around ASI-protected heritage walls.",
    tags: ["Golconda Fort", "Bala Hisar", "Deccani Arches", "Heritage Study"],
    date: "Architectural Study",
  },
  {
    id: "gal-21",
    title: "Qutb Shahi Tombs & Ibrahim Bagh Garden Inspiration",
    category: "Family",
    tradition: "Sikh & Christian",
    location: "Ibrahim Bagh, Hyderabad",
    venue: "Qutb Shahi Tombs Heritage Park",
    image: "/images/real-qutb-shahi-tombs.webp",
    description:
      "Tranquil domes rising out of restored Charbagh gardens — the exact architectural harmony behind our calm morning garden ceremonies and portrait trails.",
    craftNotes:
      "Curated visiting-family heritage tours paired with shaded Irani Chai refreshment stops.",
    tags: ["Qutb Shahi Tombs", "Ibrahim Bagh", "Charbagh Gardens", "Guest Experience"],
    date: "Garden Heritage",
  },
];
