export type CulinaryCourse =
  | "Shuruwat"
  | "Royal Dastarkhwan"
  | "Pelli Vindhu"
  | "Live Counter"
  | "Meetha & Chai";

export interface CulinaryDishDetail {
  name: string;
  course: CulinaryCourse;
  note: string;
  vessel?: string;
  veg?: boolean;
}

export interface ServiceOffering {
  title: string;
  description: string;
  highlights: string[];
}

export interface MenuCollection {
  title: string;
  subtitle: string;
  items: string[];
  dishes?: CulinaryDishDetail[];
  image?: string;
  aromaNote?: string;
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
    title: "Kirrak Wedding & Event Decor",
    subtitle: "Telugu Pelli Pandiris, Chowmahalla Nikkah Arches & Zero Copy-Paste Sets",
    shortDescription:
      "Bespoke sets built fresh for your vibe — from sacred Telugu Pelli Pandiris with banana trunks and banti puvvu to Chowmahalla-style Nikkah stages, Sanchaq thaals, Falaknuma pastels, and Taramati sunset courtyards.",
    fullDescription:
      "No tension about recycled catalogue backdrops! Our Hyderabad designers sketch every mandap and stage around your real venue — whether it's Belgian-chandelier grandeur under Chowmahalla's cream arches, white marble romance at Taj Falaknuma, golden-hour stone vistas at Taramati Baradari, or a dawn Telugu Muhurtham Pelli Pandiri draped in fresh mallige and mango thoranalu.",
    heroImage: "/images/real-chowmahalla-palace.webp",
    galleryImages: [
      "/images/real-chowmahalla-palace.webp",
      "/images/floral-mandap-indian.webp",
      "/images/real-falaknuma-palace.webp",
      "/images/real-taramati-baradari.webp",
    ],
    startingPrice: "₹1,50,000",
    idealFor: [
      "Hindu: Telugu Pelli Pandiri & Agni Kundam Mandapams",
      "Muslim: Nikkah Stages, Sanchaq & Manjha Gota-Patti",
      "Marwari & Punjabi: Jharokha Jaimala & Haldi Courts",
      "Sikh Anand Karaj, Christian & Fusion Weddings",
    ],
    offerings: [
      {
        title: "Telugu Pelli Pandiri & Hindu Mandapams",
        description:
          "Proper traditional vibes tuned right — real banana trunks, mango leaf thoranalu, fresh banti puvvu (marigolds), jasmine curtains, and vented Agni Kundam seating on peatalu.",
        highlights: [
          "Hand-strung malli (jasmine) and vermillion-yellow floral mandapams ready before dawn Muhurtham",
          "Talambralu & Jeelakarra-Bellam visual moments designed around family photography angles",
          "Marwari & Punjabi Jharokha stages and Haldi courtyards with brass urlis",
        ],
      },
      {
        title: "Muslim Nikkah, Sanchaq & Walima Styling",
        description:
          "Chowmahalla-inspired white & butter-cream scalloped arches, plush Nikkah divans for Ijab-o-Qubul & Arsi-Mushaf mirror moments, plus vibrant gota-patti Manjha nights.",
        highlights: [
          "Decorated Sanchaq & Khada Dupatta thaal presentation corners for the groom's family arrival",
          "Confined home-courtyard Manjha-nishan canopies and vibrant bangle/mehendi corners",
          "Belgian crystal chandeliers, mogra chidiya strings, and candlelit Walima receptions",
        ],
      },
      {
        title: "Falaknuma Pastels, Taramati Sunset & Sanctuaries",
        description:
          "White Italian-marble floral styling, earthy Taramati cane & terracotta sunset lounges, tranquil Anand Karaj canopies, and cathedral aisles.",
        highlights: [
          "Clean white peony, rose, and eucalyptus styling complementing Falaknuma staircases",
          "Low white bolster Palki Sahib canopies with soft golden acoustic calm for Anand Karaj",
          "Architectural seating plans, family portrait walls, and warm candle pathways",
        ],
      },
    ],
  },
  {
    id: "catering-services",
    slug: "catering",
    title: "Dil se Dawat & Wedding Catering",
    subtitle: "Proper Hyderabadi Shaadi Menus, Telugu Arati Aku Vindhu & Pure Veg Alag Kitchen",
    shortDescription:
      "Biryani bina dawat? Nakko ji! From wood-fired Mutton Dum Biryani, Sufiyani Biryani, Lukhmi & Pathar ka Gosht to pure vegetarian Arati Aku Telugu Pelli Vindhu Bhojanam and strictly separate Jain kitchens.",
    fullDescription:
      "In Hyderabad, guests judge an entire wedding by one question: 'Khana kaisa tha?' Our third-generation Bawarchikhana khansamas and seasoned Telugu Vindhu masters serve food people still talk about years later — real coal-dum Mutton & Sufiyani Biryani, Saudi Champagne welcome bars, banana-leaf Gutti Vankaya & Ulavacharu, and a 100% isolated Pure Veg & Jain kitchen where even spoons never cross.",
    heroImage: "/images/hyd-muslim-dawat-spread.webp",
    galleryImages: [
      "/images/hyd-muslim-dawat-spread.webp",
      "/images/hyd-telugu-vindhu-leaf.webp",
      "/images/catering-hyderabadi-feast.webp",
      "/images/irani-chai-mithai-parlor.webp",
    ],
    startingPrice: "₹850 per plate",
    idealFor: [
      "Hyderabadi Muslim Shaadi & Walima Dawat",
      "Telugu Hindu Arati Aku Pelli Vindhu Bhojanam",
      "100% Isolated Pure Veg & No-Onion-Garlic Jain",
      "Saudi Champagne, Irani Chai & Filter Kaapi Bars",
    ],
    offerings: [
      {
        title: "Hyderabadi Muslim Shaadi & Walima Spread",
        description:
          "Classic Nizami course flow from Saudi Champagne & hot Mutton Marag at the door to copper-handi Biryani and triple Hyderabadi mithai.",
        highlights: [
          "Kachche Gosht ki Mutton Dum Biryani alongside creamy white Sufiyani Biryani & Mirchi ka Salan",
          "Crispy square qeema Lukhmi, black-granite Pathar ka Gosht, Shikampur & Chicken 65",
          "Warm Qubani ka Meetha with malai, Double ka Meetha, Kaddu ki Kheer & clay-pot Badam Firni",
        ],
      },
      {
        title: "Telugu Hindu Pelli Vindhu Bhojanam (Arati Aku)",
        description:
          "Full traditional banana-leaf sit-down feast served in loving pankti order — Panakam & Pesarattu in the morning, classic Andhra-Telangana curries for Muhurtham lunch.",
        highlights: [
          "Mudda Pappu with Avakaya & melting desi ghee, Chintapandu Pulihora & Gutti Vankaya Kura",
          "Mamidikaya Pappu, Ulavacharu with thick cream, Gongura Pachadi & crisp Minapa Garelu",
          "Hot ghee Bobbatlu (Bakshalu), delicate Atreyapuram Pootharekulu, Boorelu & Filter Kaapi",
        ],
      },
      {
        title: "Bilkul Alag Pure Veg, Jain & Reception Buffets",
        description:
          "Locked Pure Vegetarian & Sattvic Jain cooking zone — untouched vessels, dedicated halwais — plus lively Telangana Non-Veg & North Indian reception spreads.",
        highlights: [
          "Zero cross-contamination guarantee for Pure Veg Telugu, Marwari & Jain families",
          "Telangana reception favorites: Bagara Khana, Natu Kodi / Mutton Pulusu & Apollo Fish",
          "Live Old Delhi Chaat Gali, 24-Hour Dal Makhani, Irani Chai & Meetha Paan bars",
        ],
      },
    ],
    menuCollections: [
      {
        title: "Hyderabadi Muslim Shaadi & Walima Dawat",
        subtitle: "Classic Nizami Dastarkhwan — from Saudi Champagne & Lukhmi to Dum Biryani & Firni",
        image: "/images/hyd-muslim-dawat-spread.webp",
        aromaNote: "Coal dum, saffron-cardamom milk, fried birista & rosewater",
        items: [
          "Saudi Champagne & Badam Milk",
          "Pathar ka Gosht (Granite Stone)",
          "Crispy Qeema Lukhmi",
          "Mutton Marag & Paan Naan",
          "Kachche Gosht ki Mutton Dum Biryani",
          "Sufiyani Biryani (Creamy White Nizami)",
          "Mirchi ka Salan & Dahi ki Chutney",
          "Dum ka Murgh & Zafrani Korma",
          "Double ka Meetha & Qubani ka Meetha",
          "Kaddu ki Kheer & Clay-Pot Badam Firni",
        ],
        dishes: [
          {
            name: "Saudi Champagne, Lukhmi & Pathar ka Gosht",
            course: "Shuruwat",
            vessel: "Black Granite Stone & Brass Tray",
            note: "Guests get welcomed with chilled fruity Saudi Champagne, crisp square qeema-stuffed Lukhmi, and spiced lamb roasted right over heated Deccani stone.",
          },
          {
            name: "Mutton Marag with Sheermal & Paan Naan",
            course: "Shuruwat",
            vessel: "Tinned Copper Lagan",
            note: "Thin, peppery almond-pistachio mutton soup served piping hot before the mains — pairs ekdum top with sweet saffron Sheermal.",
          },
          {
            name: "Kachche Gosht ki Mutton Dum Biryani",
            course: "Royal Dastarkhwan",
            vessel: "Atta-Sealed Copper Handi",
            note: "Raw marinated mutton layered under fluffy long-grain basmati, saffron milk, birista, and pudina on live coal dum.",
          },
          {
            name: "Sufiyani Biryani & Zafrani Mutton Korma",
            course: "Royal Dastarkhwan",
            vessel: "Silvered Degchi",
            note: "Mild, ultra-rich white Nizami biryani scented with green cardamom & mace — zero artificial color, pure old-city royalty.",
          },
          {
            name: "Mirchi ka Salan, Dum ka Murgh & Malai Paya",
            course: "Royal Dastarkhwan",
            vessel: "Heavy Brass Handi",
            note: "Mandatory nutty peanut-sesame-tamarind Mirchi ka Salan alongside creamy almond-onion Dum ka Murgh and classic breakfast Malai Paya.",
          },
          {
            name: "Double ka Meetha, Qubani Malai, Kaddu Kheer & Firni",
            course: "Meetha & Chai",
            vessel: "Clay Sakoras & Silver Bowls",
            note: "Never just one sweet — stewed apricot Qubani with thick malai, saffron Double ka Meetha, bottle-gourd Kaddu ki Kheer, plus Lychee Cream & Sulaimani Chai.",
            veg: true,
          },
        ],
      },
      {
        title: "Telugu Hindu Pelli Vindhu Bhojanam (Arati Aku)",
        subtitle: "Full banana-leaf ceremonial sit-down feast — authentic Telangana & Andhra soul food",
        image: "/images/hyd-telugu-vindhu-leaf.webp",
        aromaNote: "Melting cow ghee over Mudda Pappu, curry leaves, Avakaya & roasted jaggery",
        dietaryNote: "100% Traditional Pure Vegetarian Arati Aku",
        items: [
          "Panakam, Majjiga & Nannari Sharbat",
          "Pesarattu-Upma & Minapa Garelu",
          "Mudda Pappu + Avakaya + Desi Ghee",
          "Chintapandu Pulihora",
          "Gutti Vankaya Kura",
          "Ulavacharu with Fresh Cream",
          "Mamidikaya Pappu & Pachi Pulusu",
          "Atreyapuram Pootharekulu & Hot Bobbatlu",
          "Paramannam, Ariselu & Daddojanam",
        ],
        dishes: [
          {
            name: "Panakam, Spiced Majjiga & Pesarattu-Upma",
            course: "Shuruwat",
            vessel: "Brass Tumbler & Hot Tawa",
            note: "Auspicious jaggery-cardamom Panakam & cool buttermilk for Muhurtham arrivals, plus morning Idli, Minapa Garelu, Uggani & crispy Pesarattu.",
            veg: true,
          },
          {
            name: "Mudda Pappu, Avakaya & Melting Desi Ghee",
            course: "Pelli Vindhu",
            vessel: "Fresh Arati Aku (Banana Leaf)",
            note: "No Telugu wedding starts without steaming white Annam, plain mashed Mudda Pappu, spicy Avakaya pickle, Kandi Podi, and a generous spoon of warm ghee.",
            veg: true,
          },
          {
            name: "Chintapandu Pulihora & Gutti Vankaya Kura",
            course: "Pelli Vindhu",
            vessel: "Fresh Plantain Leaf",
            note: "Tangy peanut-tempered tamarind rice beside stuffed baby brinjals simmered in roasted sesame-peanut gravy — total showstopper on the leaf.",
            veg: true,
          },
          {
            name: "Mamidikaya Pappu, Pachi Pulusu & Ulavacharu Cream",
            course: "Pelli Vindhu",
            vessel: "Kalchatti & Silver Katori",
            note: "Green-mango dal, raw tamarind summer Pachi Pulusu, thick sweet-spicy Andhra wedding Sambar, and slow-reduced horsegram Ulavacharu with fresh cream.",
            veg: true,
          },
          {
            name: "Bendakaya-Aratikaya Vepudu & Daddojanam",
            course: "Pelli Vindhu",
            vessel: "Seasoned Bronze Tray",
            note: "Crisp ladies-finger and raw-banana dry fries, Gongura & Dosakaya pachadis, finishing calmly with pomegranate-studded curd rice (Daddojanam).",
            veg: true,
          },
          {
            name: "Bobbatlu, Atreyapuram Pootharekulu & Semiya Payasam",
            course: "Meetha & Chai",
            vessel: "Warm Brass Platter",
            note: "Hot ghee-soaked chana-jaggery Bobbatlu (Bakshalu), delicate sugar-ghee Pootharekulu, sesame Ariselu, Paramannam & brass Filter Kaapi.",
            veg: true,
          },
        ],
      },
      {
        title: "Telangana Non-Veg Reception & North Indian Classics",
        subtitle: "Sangeet & Evening Reception favorites uniting Telangana spice with Old Delhi chaat",
        image: "/images/catering-hyderabadi-feast.webp",
        aromaNote: "Smoky Apollo Fish, fiery Natu Kodi curry, chaat imli & 24-hour Dal Makhani",
        items: [
          "Bagara Khana & Telangana Mutton Pulusu",
          "Natu Kodi Pulusu & Chicken 65",
          "Apollo Fish & Crisp Minced-Keema Mirchi Bajji",
          "Old Delhi Chaat Gali",
          "24-Hour Dal Makhani & Dal Baati Churma",
          "Live Crispy Jalebi with Kesar Rabri",
        ],
        dishes: [
          {
            name: "Apollo Fish, Chicken 65 & Keema Mirchi Bajji",
            course: "Shuruwat",
            vessel: "Live Hot Tawa",
            note: "Hyderabad reception crowd-pleasers served piping hot during Sangeet and Walima starters — spicy, garlicky, and gone in seconds.",
          },
          {
            name: "Bagara Khana with Natu Kodi / Mutton Pulusu",
            course: "Royal Dastarkhwan",
            vessel: "Heavy Copper Lagan",
            note: "Whole-spice aromatic Bagara rice paired with authentic Telangana country-chicken curry or fiery bone-in mutton masala.",
          },
          {
            name: "Old Delhi Chaat Gali & Dal Baati Churma",
            course: "Live Counter",
            vessel: "Hammered Brass Tawa",
            note: "Crisp Palak Patta Chaat, five-water Pani Puri, stuffed Aloo Tikki, plus rich 24-hour coal-simmered Dal Makhani for North Indian & Marwari guests.",
            veg: true,
          },
          {
            name: "Live Kesar Jalebi, Rabri & Matka Kulfi",
            course: "Meetha & Chai",
            vessel: "Flat Copper Tai",
            note: "Hot saffron jalebis straight out of the kadhai served over chilled rabri alongside pistachio matka kulfi.",
            veg: true,
          },
        ],
      },
      {
        title: "Pure Veg & Sattvic Jain — Bilkul Alag Kitchen",
        subtitle: "Zero cross-contact: isolated utensils, oils, prep zone & dedicated chefs",
        image: "/images/catering-indian-thali.webp",
        aromaNote: "Pure cow ghee, roasted jeera, hing, kesar badam & fresh temple flowers",
        dietaryNote: "100% Isolated Cookware & Strict Jain Protocol",
        items: [
          "Isolated Pure Veg & Jain Cooking Hall",
          "Zero Onion, Zero Garlic & Root-Free Jain Menu",
          "Chilled Kesar Badam Thandai",
          "Jodhpuri Gatte & Kaju Panchratna",
          "Moong Dal Halwa in Pure Ghee",
        ],
        dishes: [
          {
            name: "Kesar Badam Thandai & Farali Chaat",
            course: "Shuruwat",
            vessel: "Dedicated Clean Glassware",
            note: "Freshly stone-ground almond-rose milk cooler and crisp temple-style snacks prepared miles away from any non-veg prep.",
            veg: true,
          },
          {
            name: "Jain Panchratna Sabzi, Gatte & Dal Tadka",
            course: "Royal Dastarkhwan",
            vessel: "Untouched Steel & Brass",
            note: "Strictly no-onion, no-garlic, root-free recipes bursting with cashew-melon seed richness, jeera tadka, and hing.",
            veg: true,
          },
          {
            name: "Warm Badam & Moong Dal Halwa",
            course: "Meetha & Chai",
            vessel: "Heavy Brass Kadhai",
            note: "Slow-roasted split lentils in pure ghee studded with sliced pistachios and warm green cardamom.",
            veg: true,
          },
        ],
      },
      {
        title: "Irani Chai, Sulaimani, Paan & Late-Night Counters",
        subtitle: "Because nobody leaves a Hyderabad wedding without chai and a meetha paan!",
        image: "/images/irani-chai-mithai-parlor.webp",
        aromaNote: "Strong boiled mawa Irani chai, lemon Sulaimani, Osmania biscuits & gulkand",
        items: [
          "Irani Chai & Warm Osmania Biscuits",
          "Digestive Lemon-Spice Sulaimani Chai",
          "Meetha, Gulkand & Zarda Paan Bar",
          "Lychee Cream & Sunrise Pudding",
          "Brass Davara Filter Kaapi",
        ],
        dishes: [
          {
            name: "Irani Chai Samovar & Bakery Osmania Biscuits",
            course: "Meetha & Chai",
            vessel: "Porcelain Finjal Cup & Brass Tray",
            note: "Slow-reduced creamy mawa tea served with sweet-salty butter Osmania biscuits — keeps Sangeet & post-Nikkah guests smiling past midnight.",
            veg: true,
          },
          {
            name: "Post-Biryani Sulaimani Chai & Live Paan Counter",
            course: "Meetha & Chai",
            vessel: "Clear Glass & Silver Paan Daans",
            note: "Spiced black lemon Sulaimani tea paired with custom folded rose-gulkand Meetha Paan and traditional aromatic Zarda options.",
            veg: true,
          },
          {
            name: "Walima Trending Lychee Cream & Sunrise Pudding",
            course: "Meetha & Chai",
            vessel: "Chilled Dessert Parlor",
            note: "Contemporary Hyderabadi Valima crowd favorites layered fresh with chilled whipped cream, seasonal fruits, and crushed pistachios.",
            veg: true,
          },
        ],
      },
    ],
  },
  {
    id: "baraat",
    slug: "baraat",
    title: "Full Dhamaka Baraat & Grand Entries",
    subtitle: "Hyderabadi Tasha-Marfa, Punjabi Dhol, Vintage Bagghis & Phoolon Ki Chadar",
    shortDescription:
      "Big-energy groomsman Baraats with Hyderabadi Tasha-Marfa & Punjabi Dhol, antique Falaknuma-style carriages, Telugu Pallaki & Nadaswaram welcomes, and emotional bridal Phoolon ki Chadar walks.",
    fullDescription:
      "An entrance sets the mood for the whole night! Whether you want thunderous Hyderabadi Tasha-Marfa beats outside a Taj Krishna lawn, a classic Punjabi Dhol & Bagghi carriage procession, a traditional sunrise Nadaswaram & Pallaki welcome, or an understated bridal walk under jasmine-and-rose Phoolon ki Chadar, our crew runs every cue safely and right on time.",
    heroImage: "/images/baraat-grand-entry.webp",
    galleryImages: [
      "/images/baraat-grand-entry.webp",
      "/images/bridal-entry-indian.webp",
      "/images/real-chowmahalla-palace.webp",
      "/images/real-falaknuma-palace.webp",
    ],
    startingPrice: "₹75,000",
    idealFor: [
      "Hyderabadi Tasha-Marfa & Sufi Qawwali Welcomes",
      "Punjabi Dhol, Brass Band & Vintage Bagghi",
      "Telugu Pallaki & Dawn Nadaswaram Processions",
      "Jasmine Phoolon Ki Chadar & Cold Sparklers",
    ],
    offerings: [
      {
        title: "Hyderabadi Marfa, Punjabi Baraat & Bagghis",
        description:
          "High-energy street-to-stage processions guided calmly by ground captains who handle gates, sound timings, and family coordination.",
        highlights: [
          "Authentic Hyderabadi Tasha-Marfa troupes alongside Punjabi Dhol and vintage convertibles",
          "Rosewater, attar, and silver-thali Istiqbal / Milni gate welcomes between both families",
          "Strict sound-curfew and hotel-driveway safety compliance around Banjara & Jubilee Hills",
        ],
      },
      {
        title: "Telugu Pallaki & Bridal Phoolon Ki Chadar",
        description:
          "Graceful bridal entrances beneath fresh hand-strung jasmine and garden roses set to live Nadaswaram, flute, or violin.",
        highlights: [
          "Weight-balanced fresh mogra Phoolon ki Chadar canopies and decorated Pallaki seats",
          "Venue-approved smokeless cold sparklers and low mist for ballroom first looks",
          "Zero stress on brothers, sisters, and elders carrying the canopy",
        ],
      },
    ],
  },
  {
    id: "corporate-events",
    slug: "corporate-events",
    title: "Corporate Events Minus The Bore",
    subtitle: "HITEC City Keynotes, HICC Summits & Falaknuma Client Gala Dinners",
    shortDescription:
      "Sharp stage setups, P2.5 LED walls, smooth QR registration, and unforgettable Chowmahalla or Falaknuma gala dinners so visiting CXOs actually love Hyderabad.",
    fullDescription:
      "Hyderabad's global tech and pharma teams deserve better than stiff beige hotel conferences. We combine industrial-strength AV & stage production at HICC and ITC Kohenur with genuine Deccani hospitality — Irani Chai breaks, copper-deg dinners at heritage palaces, and seamless speaker coordination.",
    heroImage: "/images/corporate-gala-hyderabad.webp",
    galleryImages: [
      "/images/corporate-gala-hyderabad.webp",
      "/images/real-falaknuma-palace.webp",
      "/images/hyd-muslim-dawat-spread.webp",
      "/images/irani-chai-mithai-parlor.webp",
    ],
    startingPrice: "₹2,00,000",
    idealFor: [
      "HICC & HITEC City Tech Summits",
      "Taj Falaknuma & Chowmahalla Client Galas",
      "Product Launches & Annual Town Halls",
      "Executive Leadership Offsites",
    ],
    offerings: [
      {
        title: "Crisp LED Stages, Sound & Hybrid Streaming",
        description:
          "Clean custom stage carpentry paired with bright P2.5 LED walls, zero-feedback audio, and multi-cam live feeds.",
        highlights: [
          "Same-day daytime summit to black-tie awards dinner room flip",
          "Smooth speaker greenrooms and multi-track cue handling",
          "Full HICC, ITC Kohenur & Financial District technical compliance",
        ],
      },
      {
        title: "Hyderabadi Hospitality That Wows Visiting Teams",
        description:
          "Turn standard coffee breaks into Irani Chai & Filter Kaapi bars and finish the week with a heritage palace dinner.",
        highlights: [
          "Express QR check-in desks with helpful bilingual floor hosts",
          "Bidriware, Pochampally silk & artisan chocolate delegate hampers",
          "Multi-dietary gala menus (Halal, Pure Veg, Vegan, Gluten-Free)",
        ],
      },
    ],
  },
  {
    id: "family-celebrations",
    slug: "family-celebrations",
    title: "Ghar Ke Functions & Family Milestones",
    subtitle: "Seemantham, Sanchaq, Manjha, Aqiqah, Anniversaries & Gandipet Villas",
    shortDescription:
      "Warm, stress-free styling and homestyle food for Seemantham, Namakaranam, Gruhapravesham, Muslim Sanchaq, Manjha & Aqiqah, 50th anniversaries, and Moinabad farmhouse weekends.",
    fullDescription:
      "Not every big day needs a 1,000-person ballroom! Some of our favorite days happen inside Jubilee Hills living rooms, Old City courtyards, and breezy Gandipet villas — hanging fresh mango-leaf thoranalu for a Seemantham, dressing golden gota-patti corners for a bride's Manjha & Sanchaq, or setting up twinkling banyan-tree fairy lights for Amma & Nanna's 25th anniversary.",
    heroImage: "/images/family-celebration-indian.webp",
    galleryImages: [
      "/images/family-celebration-indian.webp",
      "/images/real-taramati-baradari.webp",
      "/images/haldi-mehendi-courtyard.webp",
      "/images/irani-chai-mithai-parlor.webp",
    ],
    startingPrice: "₹95,000",
    idealFor: [
      "Hindu: Seemantham, Namakaranam & Gruhapravesham",
      "Muslim: Sanchaq, Manjha, Dholki & Aqiqah",
      "Silver & Golden Wedding Anniversaries",
      "1st Birthdays & Gandipet Farmhouse Weekends",
    ],
    offerings: [
      {
        title: "Hindu Home Rituals (Seemantham, Naming & Housewarming)",
        description:
          "Respectful home-sized floral swings, fresh mango thoranalu, brass oil lamps, and comforting banana-leaf vegetarian meals.",
        highlights: [
          "Hand-woven jasmine cradles (Palna) & traditional wooden swings",
          "Homestyle Arati Aku food packed neatly alongside tamboolam return bags",
          "Quiet setup and spotless clean-up before we pack out",
        ],
      },
      {
        title: "Muslim Home Mehfils (Sanchaq, Manjha & Aqiqah)",
        description:
          "Vibrant gota-patti yellow backdrops, Khada Dupatta & Sanchaq thaal styling, cozy floor cushions, live dholki audio, and small-batch Deg Biryanis.",
        highlights: [
          "Dedicated Thaal decoration & bridal floral veil canopies",
          "Chilled Badam Milk, hot Lukhmi & Double ka Meetha family trays",
          "Cozy Gandipet & Moinabad villa retreats with acoustic ghazal nights",
        ],
      },
    ],
  },
];
