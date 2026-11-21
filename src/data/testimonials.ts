export interface Testimonial {
  id: string;
  name: string;
  roleOrRelation: string;
  event: string;
  location: string;
  rating: number;
  quote: string;
  avatar?: string;
  celebrationImage: string;
  celebrationAlt: string;
  date: string;
  highlight: string;
  communityTag?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Venkateswara Rao & Padmavathi Garu",
    roleOrRelation: "Bride's Parents",
    event: "Telugu Pelli Pandiri & Arati Aku Vindhu",
    location: "Jubilee Hills",
    rating: 5,
    quote:
      "Our relatives from Vijayawada and Secunderabad are still talking about two things — how authentic the dawn Pelli Pandiri smelled with fresh malli & mango leaves, and the sit-down Mudda Pappu, Gutti Vankaya, and hot ghee Bobbatlu. Neither of us parents had to run around once!",
    celebrationImage: "/images/hyd-telugu-vindhu-leaf.webp",
    celebrationAlt: "Traditional Telugu Hindu Pelli Vindhu Bhojanam laid cleanly on an emerald banana leaf",
    date: "Muhurtham Season",
    highlight: "Our parents actually enjoyed the whole wedding tension-free!",
    communityTag: "Telugu Pelli",
  },
  {
    id: "test-2",
    name: "Mir Zeeshan Ali & Dr. Sara Begum",
    roleOrRelation: "Groom & Bride",
    event: "Sanchaq, Nikkah & Chowmahalla-Style Walima",
    location: "Old City & Banjara Hills",
    rating: 5,
    quote:
      "From wrapping Sara's Khada Dupatta Sanchaq thaals to creating a white scalloped arch with chandeliers that looked right out of Chowmahalla, they nailed every nuance. Guests went back for thirds on the Mutton Biryani, Sufiyani Biryani, and hot Qubani ka Meetha!",
    celebrationImage: "/images/hyd-muslim-dawat-spread.webp",
    celebrationAlt: "Authentic Hyderabadi Muslim wedding feast with Dum Biryani, Sufiyani Biryani, and Qubani ka Meetha",
    date: "Winter Walima",
    highlight: "Everyone STILL texts us asking who cooked the Biryani & Pathar!",
    communityTag: "Muslim Shaadi & Walima",
  },
  {
    id: "test-3",
    name: "Neha & Aditya Agarwal",
    roleOrRelation: "Bride & Groom",
    event: "Taramati Sunset Haldi, Marwari Phere & Jain Kitchen",
    location: "Taramati Baradari & Gandipet",
    rating: 5,
    quote:
      "Our elders were super particular about a 100% separate Pure Veg and no-onion-no-garlic Jain kitchen — Tehzaa gave us an isolated kitchen hall we personally inspected! And hosting our sunset sangeet at Taramati Baradari with marigold drapes and Golconda views felt surreal.",
    celebrationImage: "/images/real-taramati-baradari.webp",
    celebrationAlt: "Original photograph of Taramati Baradari stone pavilion in Hyderabad with twelve pointed Deccani arches",
    date: "Sunset Celebration",
    highlight: "Bilkul alag Jain kitchen gave our Dadi total peace of mind.",
    communityTag: "Marwari & Pure Veg",
  },
  {
    id: "test-4",
    name: "Harpreet & Simran Grewal",
    roleOrRelation: "Groom's Parents",
    event: "Morning Anand Karaj & Falaknuma Reception",
    location: "Gachibowli & Falaknuma",
    rating: 5,
    quote:
      "Two totally different moods in 12 hours — calm ivory silks and quiet morning respect for the Anand Karaj, then an all-out Punjabi Dhol Baraat followed by a gorgeous white candlelit Falaknuma terrace dinner. Smooth like clockwork!",
    celebrationImage: "/images/real-falaknuma-palace.webp",
    celebrationAlt: "Original photograph of Taj Falaknuma Palace white Palladian facade and grand double marble staircase in Hyderabad",
    date: "Festive Season",
    highlight: "Calm morning Anand Karaj, full-dhamaka evening Baraat!",
    communityTag: "Anand Karaj & Punjabi",
  },
  {
    id: "test-5",
    name: "Siddharth Verma",
    roleOrRelation: "VP Ops, CloudScale Global",
    event: "HICC Summit & Chowmahalla Gala",
    location: "HITEC City & Old City",
    rating: 5,
    quote:
      "Most event agencies do boring beige hotel setups. Tehzaa ran our daytime tech keynotes at HICC with zero AV glitches, kept Irani Chai & Filter Kaapi flowing all day, and blew our US visitors away with an evening Chowmahalla heritage dinner.",
    celebrationImage: "/images/real-chowmahalla-palace.webp",
    celebrationAlt: "Original photograph of Khilwat Mubarak at Chowmahalla Palace in Hyderabad with scalloped arches and lawns",
    date: "Annual Conclave",
    highlight: "Turned our regular corporate trip into our team's favorite Hyderabad memory.",
    communityTag: "HITEC City Corporate",
  },
  {
    id: "test-6",
    name: "Kavya & Rohan Deshmukh",
    roleOrRelation: "New Parents",
    event: "Seemantham, Namakaranam & Chai Parlor",
    location: "Madhapur",
    rating: 5,
    quote:
      "We only wanted 80 close family members at home — zero flashy hotel drama. They styled a sweet jasmine palna cradle in our verandah, served warm Filter Kaapi and Irani Chai to our uncles, and cleaned up without leaving a single petal on the floor!",
    celebrationImage: "/images/irani-chai-mithai-parlor.webp",
    celebrationAlt: "Irani Chai cups, Filter Kaapi tumblers, and Indian festive mithai counter",
    date: "Family Blessing",
    highlight: "Warm, personal, zero attitude — felt like family helping family.",
    communityTag: "Home Function",
  },
];
