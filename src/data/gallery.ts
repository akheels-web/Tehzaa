export type GalleryCategory =
  | "All"
  | "Weddings"
  | "Floral"
  | "Catering"
  | "Corporate"
  | "Family";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Weddings" | "Floral" | "Catering" | "Corporate" | "Family";
  location: string;
  venue: string;
  image: string;
  description: string;
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

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Sacred Telugu Kalyana Mandapam & Pelli Pandiri",
    category: "Weddings",
    location: "Jubilee Hills, Hyderabad",
    venue: "JRC Convention Lawns",
    image: "/images/floral-mandap-indian.webp",
    description:
      "Hand-carved teak Kalyana Mandapam adorned with fresh jasmine curtains, banana-stalk pillars, and mango-leaf toranams for a morning Jeelakarra Bellam & Talambralu ceremony.",
    tags: ["Telugu Wedding", "Kalyana Mandapam", "Pelli Pandiri", "Jasmine"],
    date: "Muhurtham Collection",
  },
  {
    id: "gal-2",
    title: "Deccani Nikkah & Scalloped Walima Pavilion",
    category: "Weddings",
    location: "Banjara Hills, Hyderabad",
    venue: "Taj Krishna Heritage Lawn",
    image: "/images/nikkah-walima-arch.webp",
    description:
      "An architectural scalloped ivory-and-gold Nikkah pavilion framed with fragrant mogra garlands, glass lanterns, and an evening Qawwali lounge.",
    tags: ["Nikkah & Walima", "Heritage Arch", "Qawwali Night", "Banjara Hills"],
    date: "Winter Season",
  },
  {
    id: "gal-3",
    title: "Shahi Hyderabadi Dastarkhwan & Copper Deg Feast",
    category: "Catering",
    location: "Gachibowli, Hyderabad",
    venue: "ITC Kohenur Grand Ballroom",
    image: "/images/catering-hyderabadi-feast.webp",
    description:
      "Wood-fired Kachche Gosht ki Dum Biryani, live Pathar ka Gosht on granite slabs, Zafrani Marag, and silver-plated Double ka Meetha service.",
    tags: ["Hyderabadi Biryani", "Shahi Dastarkhwan", "Live Grills", "Gachibowli"],
    date: "Signature Culinary",
  },
  {
    id: "gal-4",
    title: "Traditional Vindhu Bhojanam & Royal Indian Thali",
    category: "Catering",
    location: "Secunderabad, Hyderabad",
    venue: "Secunderabad Club Heritage Courtyard",
    image: "/images/catering-indian-thali.webp",
    description:
      "Authentic Telugu banana-leaf Vindhu Bhojanam featuring Gutti Vankaya, Ulavacharu Biryani, and Bobbatlu alongside dedicated Pure Vegetarian & North Indian chaat counters.",
    tags: ["Vindhu Bhojanam", "Banana Leaf Feast", "Pure Vegetarian", "Secunderabad"],
    date: "Ceremonial Dining",
  },
  {
    id: "gal-5",
    title: "Sunlit Marigold Haldi & Mehendi Courtyard",
    category: "Floral",
    location: "Gandipet, Hyderabad",
    venue: "Lakefront Heritage Villa",
    image: "/images/haldi-mehendi-courtyard.webp",
    description:
      "Cascading saffron and yellow marigold drapes, brass urlis floating with lotus blooms, and hand-woven floral swings for an intimate Marwari Haldi morning.",
    tags: ["Haldi & Mehendi", "Marigold Decor", "Floral Jhoola", "Gandipet"],
    date: "Daytime Courtyard",
  },
  {
    id: "gal-6",
    title: "Royal Punjabi Baraat & Dhol Procession",
    category: "Weddings",
    location: "Shamshabad, Hyderabad",
    venue: "Novotel Airport Heritage Gardens",
    image: "/images/baraat-grand-entry.webp",
    description:
      "A vibrant Baraat procession led by live Punjabi Dhol ensembles, decorated vintage tourers, and warm evening illumination leading to the Jaimala stage.",
    tags: ["Baraat", "Vintage Procession", "Dhol Ensemble", "Jaimala"],
    date: "Evening Procession",
  },
  {
    id: "gal-7",
    title: "Bridal Phoolon Ki Chadar & Floral Walkway",
    category: "Floral",
    location: "Begumpet, Hyderabad",
    venue: "Chiran Fort Heritage Grounds",
    image: "/images/bridal-entry-indian.webp",
    description:
      "An emotional bridal arrival beneath a hand-knotted tube-rose and jasmine Phoolon ki Chadar, escorted with live shehnai and acoustic violinists.",
    tags: ["Bridal Entry", "Phoolon Ki Chadar", "Floral Walkway", "Begumpet"],
    date: "Twilight Entry",
  },
  {
    id: "gal-8",
    title: "Enterprise Leadership Summit & Annual Gala",
    category: "Corporate",
    location: "HITEC City, Hyderabad",
    venue: "Hyderabad International Convention Centre (HICC)",
    image: "/images/corporate-gala-hyderabad.webp",
    description:
      "End-to-end technical production featuring a wide-format P2.5 LED keynote stage, precision acoustic engineering, and executive gala dining.",
    tags: ["Corporate Summit", "HITEC City", "Keynote Stage", "Gala Dinner"],
    date: "Enterprise Conclave",
  },
  {
    id: "gal-9",
    title: "Candlelit Cathedral & Anand Karaj Reception",
    category: "Weddings",
    location: "Banjara Hills, Hyderabad",
    venue: "Park Hyatt The Manor",
    image: "/images/hero-indian-wedding.webp",
    description:
      "An heirloom reception hall dressed in warm ivory linen, antique brass candelabras, and low botanical runners honoring multi-faith family traditions.",
    tags: ["Luxury Reception", "Candlelit Tablescape", "Botanical Decor", "Park Hyatt"],
    date: "Grand Reception",
  },
  {
    id: "gal-10",
    title: "Traditional Seemantham & Namakaranam Celebration",
    category: "Family",
    location: "Jubilee Hills, Hyderabad",
    venue: "Private Residence Courtyard",
    image: "/images/family-celebration-indian.webp",
    description:
      "A serene family blessing ceremony styled with fresh mango-leaf toranams, floral cradle accents, heirloom silverware, and traditional home-style hospitality.",
    tags: ["Seemantham", "Namakaranam", "Family Milestone", "Jubilee Hills"],
    date: "Family Blessing",
  },
  {
    id: "gal-11",
    title: "Golden Jubilee 50th Anniversary Soirée",
    category: "Family",
    location: "Moinabad, Hyderabad",
    venue: "Private Farmhouse Retreat",
    image: "/images/family-celebration-indian.webp",
    description:
      "A multi-generational evening beneath fairy-lit banyan canopies with live ghazal performances, archival family portraits, and curated Hyderabadi dining.",
    tags: ["Anniversary Gala", "Farmhouse Soirée", "Ghazal Evening", "Moinabad"],
    date: "Milestone Evening",
  },
  {
    id: "gal-12",
    title: "Financial District FinTech Awards Conclave",
    category: "Corporate",
    location: "Financial District, Hyderabad",
    venue: "Sheraton Hyderabad Grand Ballroom",
    image: "/images/corporate-gala-hyderabad.webp",
    description:
      "Executive award evening with architectural stage lighting, attentive delegate hospitality, and interactive artisan dining stations.",
    tags: ["Award Night", "Financial District", "Executive Protocol", "Corporate"],
    date: "Annual Awards",
  },
];
