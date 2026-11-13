export interface ServiceOffering {
  title: string;
  description: string;
  highlights: string[];
}

export interface MenuCollection {
  title: string;
  subtitle: string;
  items: string[];
  dietaryNote?: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  galleryImages: string[];
  offerings: ServiceOffering[];
  menuCollections?: MenuCollection[];
  startingPrice?: string;
  idealFor: string[];
}

export const SERVICES: ServiceCategory[] = [
  {
    id: "floral-decorations",
    slug: "floral-decor",
    title: "Floral & Event Decorations",
    subtitle: "Architectural Mandaps, Heritage Pelli Pandiris & Botanical Artistry",
    shortDescription:
      "Bespoke floral installations, traditional Telugu Kalyana Mandapams, Nikkah arches, Jaimala stages, and sunlit Haldi & Mehendi courtyards crafted across Hyderabad.",
    fullDescription:
      "At Tehzaa Celebrations, floral architecture bridges sacred Indian tradition with timeless editorial restraint. Whether weaving fragrant jasmine and banana-leaf pillars for a morning Telugu Pelli Pandiri, sculpting velvet-and-ivory floral domes for a Nikkah and Walima, or dressing an open-air Marwari Jaimala pavilion in marigold and heirloom brass, every installation is composed from fresh stems sourced daily from regional farms and specialist growers.",
    heroImage: "/images/floral-mandap-indian.webp",
    galleryImages: [
      "/images/floral-mandap-indian.webp",
      "/images/haldi-mehendi-courtyard.webp",
      "/images/nikkah-walima-arch.webp",
    ],
    startingPrice: "₹1,50,000",
    idealFor: [
      "Telugu Kalyana Mandapams & Pelli Pandiri",
      "North Indian Jaimala, Haldi & Sangeet Stages",
      "Nikkah, Walima & Cathedral Reception Florals",
      "Anand Karaj & Heritage Courtyard Weddings",
    ],
    offerings: [
      {
        title: "Kalyana Mandapam, Pelli Pandiri & Nikkah Architecture",
        description:
          "Hand-carved wooden and brass-accented mandaps, sacred mango-leaf toranams, and scalloped architectural arches dressed with fresh mogra, Rajnigandha, roses, and orchids.",
        highlights: [
          "Authentic South Indian banana-stalk, coconut-frond, and jasmine-curtain Pelli Pandiris",
          "Regal Jaimala pavilions and scalloped Nikkah/Walima backdrops in ivory, antique gold, and burgundy",
          "Custom floral pews, altar arches, and candlelit reception tablescapes for Christian ceremonies",
        ],
      },
      {
        title: "Haldi, Mehendi & Sangeet Courtyards",
        description:
          "Sunlit courtyard lounges with hand-knotted marigold garlands, artisanal floral jhoolas, brass urlis with floating lotuses, and vibrant textile canopies.",
        highlights: [
          "Custom floral swing (jhoola) seating and hand-painted terracotta accents",
          "Fragrant genda phool cascades, mogra gajra bars, and artisanal bangle-station styling",
          "Warm evening transitions with fairy-light canopies, crystal chandeliers, and stage acoustics",
        ],
      },
      {
        title: "Walkways, Welcome Foyers & Tablescape Design",
        description:
          "Cohesive sensory storytelling from the first step onto the venue lawn to every guest dining table.",
        highlights: [
          "Linen-draped dining tables with hand-thrown stoneware, brass taper holders, and low floral runners",
          "Calligraphed welcome easels and floral-framed family portrait galleries",
          "Fragrant jasmine-and-rose petal corridors illuminated by warm glass hurricanes",
        ],
      },
    ],
  },
  {
    id: "catering-services",
    slug: "catering",
    title: "Catering & Food Services",
    subtitle: "Authentic Hyderabadi Dastarkhwan, Telugu Vindhu Bhojanam & Pan-Indian Gastronomy",
    shortDescription:
      "Time-honored Hyderabadi Dum Biryani, traditional banana-leaf Telugu Vindhu Bhojanam, royal North Indian & Mughlai spreads, Pure Vegetarian & Jain kitchens, and live culinary theatres.",
    fullDescription:
      "In Hyderabad, hospitality is measured by the warmth and abundance of the table. Tehzaa’s culinary brigade brings together master Hyderabadi khansamas, seasoned South Indian Brahmin and Telugu Vindhu chefs, royal North Indian halwais, and contemporary culinary directors. From slow wood-fired Kachche Gosht ki Dum Biryani and brass-vessel Telugu feasts on fresh plantain leaves to dedicated Pure Vegetarian and Sattvic Jain kitchens, every dish is prepared fresh on site with heritage spices and strict hygiene.",
    heroImage: "/images/catering-hyderabadi-feast.webp",
    galleryImages: [
      "/images/catering-hyderabadi-feast.webp",
      "/images/catering-indian-thali.webp",
      "/images/hero-indian-wedding.webp",
    ],
    startingPrice: "₹850 per plate",
    idealFor: [
      "Traditional Telugu Banana-Leaf Vindhu Bhojanam",
      "Royal Hyderabadi & Mughlai Dastarkhwan",
      "North Indian, Marwari & Pure Vegetarian / Jain Feasts",
      "Corporate Galas & Private Farmhouse Soirées",
    ],
    offerings: [
      {
        title: "Hyderabadi & Deccani Royal Dastarkhwan",
        description:
          "Slow-cooked heirloom recipes sealed in copper degs and served with graceful silver-service etiquette.",
        highlights: [
          "Wood-fired Kachche Gosht ki Dum Biryani, Zafrani Chicken Biryani, and Subz Dum Tehri",
          "Charcoal-seared Pathar ka Gosht, Shikampuri Kebab, and slow-simmered Mutton Marag",
          "Mirchi ka Salan, Baghara Baingan, Dum ka Murgh, Double ka Meetha, and Khubani ka Meetha",
        ],
      },
      {
        title: "Telugu & South Indian Traditional Vindhu Bhojanam",
        description:
          "Authentic ceremonial sit-down banana-leaf service celebrating Andhra and Telangana festive cuisine.",
        highlights: [
          "Gutti Vankaya Kura, Ulavacharu Biryani, Pulihora, Mamidikaya Pappu, and Gongura Pachadi",
          "Handcrafted festive sweets: Boorelu, Bobbatlu, Pootharekulu, and warm Semiya Payasam",
          "Live brass-tumbler Filter Kaapi and traditional paan-supari hospitality",
        ],
      },
      {
        title: "Pure Vegetarian, Jain & North Indian Heritage Kitchens",
        description:
          "Strictly segregated vegetarian cookware and dedicated Sattvic culinary teams alongside royal North Indian spreads.",
        highlights: [
          "Separate utensils, prep zones, and serviceware for Pure Vegetarian and no-onion-no-garlic Jain menus",
          "Old Delhi Chaat Gali, 24-Hour Dal Makhani, Paneer Lababdar, Dal Baati Churma, and Kashmiri Pulao",
          "Live Jalebi with Kesar Rabri, Matka Kulfi, Banarasi Paan, and Irani Chai with Osmania Biscuits",
        ],
      },
    ],
    menuCollections: [
      {
        title: "Hyderabadi & Deccani Royal Classics",
        subtitle: "Copper-deg slow cooking and regal Nizami dastarkhwan traditions",
        items: [
          "Kachche Gosht ki Dum Biryani",
          "Zafrani Chicken Biryani",
          "Subz Dum Tehri",
          "Pathar ka Gosht",
          "Shikampuri Kebab",
          "Mutton Marag",
          "Mirchi ka Salan",
          "Baghara Baingan",
          "Dum ka Murgh",
          "Double ka Meetha",
          "Khubani ka Meetha",
        ],
      },
      {
        title: "Telugu & South Indian Traditional Feast (Vindhu Bhojanam)",
        subtitle: "Authentic banana-leaf ceremonial dining rooted in Telangana and Andhra heritage",
        items: [
          "Traditional Banana Leaf Service",
          "Gutti Vankaya Kura",
          "Pulihora",
          "Ulavacharu Biryani",
          "Mamidikaya Pappu",
          "Gongura Pachadi",
          "Boorelu",
          "Bobbatlu",
          "Pootharekulu",
          "Semiya Payasam",
          "Live Filter Kaapi",
        ],
        dietaryNote: "Available as 100% Traditional Vegetarian Sadhya / Vindhu",
      },
      {
        title: "North Indian & Royal Rajasthani / Mughlai Spread",
        subtitle: "Bustling bazaar chaats, rich slow-simmered gravies, and heirloom mithai",
        items: [
          "Old Delhi Chaat Gali",
          "24-Hour Dal Makhani",
          "Paneer Lababdar",
          "Dal Baati Churma",
          "Kashmiri Pulao",
          "Sheermal & Tandoori Breads",
          "Live Jalebi with Kesar Rabri",
          "Matka Kulfi & Banarasi Paan",
        ],
      },
      {
        title: "Pure Vegetarian & Jain-Friendly Kitchens",
        subtitle: "Dedicated segregated culinary preparation for sacred ceremonies",
        items: [
          "Dedicated Pure Vegetarian Cookware & Prep Zone",
          "Sattvic & No-Onion-No-Garlic Ceremonial Menus",
          "Kesar Badam Thandai & Dry-Fruit Halwas",
          "Artisanal Farali & Temple-Style Offerings",
          "Separate Brass & Silver Serviceware",
        ],
        dietaryNote: "100% Segregated Utensils, Oils & Dedicated Chefs",
      },
      {
        title: "Live Interactive Stations & Global Haute Cuisine",
        subtitle: "Theatrical live cooking counters blending regional craft with international flair",
        items: [
          "Charcoal Tandoor & Sigdi Grills",
          "Appam & Coconut Stew Counter",
          "Irani Chai & Osmania Biscuits Bar",
          "Artisanal Pasta & Aged Cheese Wheel",
          "Pan-Asian Wok & Dim Sum Cart",
        ],
      },
    ],
  },
  {
    id: "baraat",
    slug: "baraat",
    title: "Baraat & Grand Entries",
    subtitle: "Ceremonial Processions, Bridal Phoolon Ki Chadar & Acoustic Precision",
    shortDescription:
      "Joyous groom baraat processions, South Indian Pallaki & Nadaswaram welcomes, vintage motorcades, brass and dhol ensembles, and poetic bridal walkways.",
    fullDescription:
      "An entrance sets the emotional cadence for the entire celebration. Whether orchestrating a vibrant North Indian baraat with Punjabi dhol players and vintage tourers, a dignified South Indian ceremonial welcome accompanied by traditional Nadaswaram and Tasha-Marfa ensembles, or a serene bridal procession beneath a hand-stitched Phoolon ki Chadar, Tehzaa choreographs every cue with safety, poise, and cinematic timing.",
    heroImage: "/images/baraat-grand-entry.webp",
    galleryImages: [
      "/images/baraat-grand-entry.webp",
      "/images/bridal-entry-indian.webp",
      "/images/hero-indian-wedding.webp",
    ],
    startingPrice: "₹75,000",
    idealFor: [
      "Groom Baraat Processions & Royal Carriages",
      "Bridal Phoolon Ki Chadar & Pallaki Walkways",
      "Nadaswaram, Shehnai & Dhol Ensembles",
      "Walima & Reception Couple Grand Entries",
    ],
    offerings: [
      {
        title: "Heritage Baraat Motorcades & Processions",
        description:
          "Graceful, high-energy processions led by veteran percussionists, vintage vehicles, and coordinated escort teams.",
        highlights: [
          "Restored vintage convertibles, decorated ceremonial steeds, and traditional Bagghi carriages",
          "Live Punjabi Dhol, brass band ensembles, Hyderabadi Marfa, and classical Nadaswaram-Thavil troupes",
          "Dedicated route stewards managing lighting, crowd flow, and venue-gate timing",
        ],
      },
      {
        title: "Poetic Bridal Entries & Phoolon Ki Chadar",
        description:
          "Heartfelt bridal arrivals framed in fresh florals, live instrumentalists, and soft golden lighting.",
        highlights: [
          "Hand-woven jasmine and rose Phoolon ki Chadar canopies and traditional South Indian Pallaki palanquins",
          "Live violinists, flute ensembles, and bespoke soundtrack transitions",
          "Synchronized rose-petal showers and venue-certified smokeless cold sparkler fountains",
        ],
      },
      {
        title: "Reception & Sangeet Couple Reveals",
        description:
          "Dramatic, understated stage arrivals engineered for photography and guest emotion.",
        highlights: [
          "Warm low-lying atmospheric mist and sculptural architectural stage lighting",
          "Custom entrance choreography with family welcome circles and live percussionists",
          "Zero-smoke indoor-safe pyrotechnic and lighting synchronization",
        ],
      },
    ],
  },
  {
    id: "corporate-events",
    slug: "corporate-events",
    title: "Corporate Events",
    subtitle: "Executive Summits, Award Galas & Brand Launches in HITEC City",
    shortDescription:
      "Precision-led conferences, leadership offsites, product unveilings, and black-tie gala dinners across Hyderabad’s HITEC City, Financial District, and Gachibowli.",
    fullDescription:
      "Serving Hyderabad’s global technology, pharmaceutical, and financial corridors across HITEC City, Madhapur, and the Financial District, Tehzaa brings architectural polish and clockwork execution to enterprise gatherings. From multi-track conferences at HICC and leadership conclaves at ITC Kohenur to refined evening award banquets, we manage stage engineering, delegate hospitality, and culinary curation under one disciplined roof.",
    heroImage: "/images/corporate-gala-hyderabad.webp",
    galleryImages: [
      "/images/corporate-gala-hyderabad.webp",
      "/images/catering-hyderabadi-feast.webp",
      "/images/hero-indian-wedding.webp",
    ],
    startingPrice: "₹2,00,000",
    idealFor: [
      "Enterprise Tech Summits & Town Halls",
      "Executive Leadership Offsites & Board Dinners",
      "Product Launches & Brand Showcases",
      "Annual Recognition & Gala Evenings",
    ],
    offerings: [
      {
        title: "Stage Architecture & Broadcast AV Engineering",
        description:
          "Custom scenic stage builds integrated with high-resolution LED walls, directional line-array audio, and multi-cam streaming.",
        highlights: [
          "Wide-format P2.5/P3 LED keynote backdrops and dynamic stage lighting",
          "Redundant audio routing, confidence monitors, and live hybrid broadcast capability",
          "Brand-accurate scenic fabrication, podium detailing, and exhibition booths",
        ],
      },
      {
        title: "Delegate Registration & VIP Executive Protocol",
        description:
          "Frictionless guest arrival, badging, and backstage speaker hospitality.",
        highlights: [
          "Express QR check-in desks, branded lanyards, and multilingual floor concierges",
          "Private greenroom lounges for keynote dignitaries and board leadership",
          "Curated executive gift hampers showcasing Hyderabadi pearls, Bidri craft, and artisanal teas",
        ],
      },
      {
        title: "Gala Dinners, Networking Lounges & Entertainment",
        description:
          "Coordinated daytime-to-evening room transformations paired with elevated dining and live acoustic acts.",
        highlights: [
          "Award-night cue management, trophy reveals, and curated ambient music",
          "Gourmet multi-cuisine buffets and interactive artisan mocktail lounges",
          "Full venue compliance, fire-safety sign-offs, and teardown logistics",
        ],
      },
    ],
  },
  {
    id: "family-celebrations",
    slug: "family-celebrations",
    title: "Social & Family Celebrations",
    subtitle: "Seemantham, Namakaranam, Anniversaries & Jubilee Hills Soirées",
    shortDescription:
      "Warm, thoughtfully styled family milestones including Seemantham, Namakaranam, Gruhapravesham, milestone birthdays, silver & golden jubilees, and farmhouse retreats.",
    fullDescription:
      "A family’s cherished milestones deserve the same artistic care and gracious hospitality as a grand wedding. Tehzaa designs intimate, deeply personal celebrations across Hyderabad’s residences, private clubs, and scenic Gandipet and Moinabad farmhouses—honoring sacred South Indian Seemantham and Namakaranam traditions, Gruhapravesham blessings, milestone birthdays, and 25th or 50th anniversary evenings.",
    heroImage: "/images/family-celebration-indian.webp",
    galleryImages: [
      "/images/family-celebration-indian.webp",
      "/images/haldi-mehendi-courtyard.webp",
      "/images/catering-indian-thali.webp",
    ],
    startingPrice: "₹95,000",
    idealFor: [
      "Seemantham, Baby Showers & Namakaranam",
      "Gruhapravesham & Traditional House Blessings",
      "Silver & Golden Wedding Anniversaries",
      "1st Birthdays & Private Farmhouse Retreats",
    ],
    offerings: [
      {
        title: "Cultural Milestones: Seemantham, Namakaranam & Gruhapravesham",
        description:
          "Respectful, serene floral and ceremonial styling tailored to home courtyards and boutique banquet halls.",
        highlights: [
          "Fresh mango-leaf toranams, floral swings, brass lamps, and traditional seating arrangements",
          "Authentic home-style vegetarian feasts and return-gift hampers curated with silver or brass accents",
          "Calm coordination with family priests, musicians, and photographers",
        ],
      },
      {
        title: "Silver, Ruby & Golden Anniversary Galas",
        description:
          "Intimate generational tribute evenings celebrating enduring family bonds.",
        highlights: [
          "Curated archival family photo walls and warm candlelit banquet seating",
          "Live ghazal ensembles, classical instrumentalists, or nostalgic retro acoustic bands",
          "Custom multi-generational dining menus tailored to elders and younger guests alike",
        ],
      },
      {
        title: "Milestone Birthdays & Private Farmhouse Retreats",
        description:
          "Turnkey styling and hospitality at Jubilee Hills residences, Banjara Hills lawns, and Moinabad villas.",
        highlights: [
          "Storybook pastel 1st-birthday installations, artisanal dessert tables, and family host games",
          "Outdoor fairy-light canopies, poolside lounge cabanas, and live acoustic sundowners",
          "Complete setup, housekeeping, valet management, and post-event restoration",
        ],
      },
    ],
  },
];
