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
    roleOrRelation: "Parents of the Bride",
    event: "Telugu Kalyana Mandapam & Traditional Vindhu Bhojanam",
    location: "Jubilee Hills, Hyderabad",
    rating: 5,
    quote:
      "Every detail of our daughter’s Muhurtham—from the fresh jasmine Pelli Pandiri and Nadaswaram welcome to the sit-down banana-leaf Vindhu Bhojanam—was arranged with deep respect for Telugu traditions. Our elders were moved by the warmth and punctuality of the entire team.",
    celebrationImage: "/images/floral-mandap-indian.webp",
    celebrationAlt: "Handcrafted Telugu Kalyana Mandapam draped in fresh jasmine and marigolds",
    date: "Muhurtham Season",
    highlight: "Sacred Telugu Traditions & Quiet Grace",
    communityTag: "Telugu Heritage Wedding",
  },
  {
    id: "test-2",
    name: "Neha & Aditya Agarwal",
    roleOrRelation: "Bride & Groom",
    event: "Marwari Haldi, Sangeet & Pure Vegetarian Jaimala",
    location: "Gandipet & Shamshabad, Hyderabad",
    rating: 5,
    quote:
      "Having a dedicated Pure Vegetarian and Jain-friendly kitchen with completely separate cookware gave our families total peace of mind. The marigold Haldi courtyard, lively Baraat procession, and sunset Phoolon ki Chadar felt straight out of a heritage postcard.",
    celebrationImage: "/images/haldi-mehendi-courtyard.webp",
    celebrationAlt: "Sunlit marigold Haldi and Mehendi courtyard celebration in Hyderabad",
    date: "Winter Celebration",
    highlight: "Dedicated Sattvic Kitchen & Courtyard Poetry",
    communityTag: "Marwari & North Indian Wedding",
  },
  {
    id: "test-3",
    name: "Mir Zeeshan Ali & Dr. Sara Begum",
    roleOrRelation: "Bride & Groom",
    event: "Deccani Nikkah & Shahi Dastarkhwan Walima",
    location: "Banjara Hills, Hyderabad",
    rating: 5,
    quote:
      "Tehzaa understood the quiet elegance we wanted for our Nikkah and Walima. The scalloped ivory floral arch, the Qawwali courtyard, and the wood-fired Kachche Gosht ki Dum Biryani served with impeccable dastarkhwan etiquette left every guest raving.",
    celebrationImage: "/images/nikkah-walima-arch.webp",
    celebrationAlt: "Scalloped ivory and floral Nikkah and Walima arch in Banjara Hills",
    date: "Winter Season",
    highlight: "Authentic Tehzeeb & Culinary Mastery",
    communityTag: "Hyderabadi Nikkah & Walima",
  },
  {
    id: "test-4",
    name: "Siddharth Verma",
    roleOrRelation: "VP Operations, CloudScale Global",
    event: "Annual Enterprise Leadership Summit & Award Gala",
    location: "HITEC City / HICC, Hyderabad",
    rating: 5,
    quote:
      "Technical reliability and executive hospitality are non-negotiable for our annual Hyderabad summit. Tehzaa delivered crisp wide-format LED staging, zero-delay delegate check-in, and an unforgettable evening gala dinner without a single hiccup.",
    celebrationImage: "/images/corporate-gala-hyderabad.webp",
    celebrationAlt: "Executive corporate leadership summit and gala dinner in HITEC City",
    date: "Enterprise Conclave",
    highlight: "Precision AV Production & Executive Polish",
    communityTag: "Corporate Summit & Gala",
  },
  {
    id: "test-5",
    name: "Harpreet & Simran Kaur Grewal",
    roleOrRelation: "Parents of the Groom",
    event: "Anand Karaj Morning & Punjabi Baraat Reception",
    location: "Secunderabad & Gachibowli, Hyderabad",
    rating: 5,
    quote:
      "From the serene morning floral arrangements for the Anand Karaj to the exuberant Dhol-led Baraat and evening reception, Tehzaa balanced reverence and celebration effortlessly. Their hospitality team looked after every visiting relative like family.",
    celebrationImage: "/images/baraat-grand-entry.webp",
    celebrationAlt: "Royal Punjabi Baraat procession with dhol and vintage motorcade",
    date: "Festive Season",
    highlight: "Heartfelt Hospitality Across Every Ceremony",
    communityTag: "Punjabi & Sikh Celebration",
  },
  {
    id: "test-6",
    name: "Kavya & Rohan Deshmukh",
    roleOrRelation: "New Parents",
    event: "Traditional Seemantham & Namakaranam Courtyard",
    location: "Madhapur, Hyderabad",
    rating: 5,
    quote:
      "For our baby’s Namakaranam, Tehzaa transformed our home courtyard with fresh mango-leaf toranams, a floral palna, and comforting home-style South Indian delicacies. It felt intimate, unhurried, and deeply memorable for three generations of our family.",
    celebrationImage: "/images/family-celebration-indian.webp",
    celebrationAlt: "Intimate Indian family blessing courtyard styled with brass lamps and florals",
    date: "Family Milestone",
    highlight: "Intimate Warmth for Family Milestones",
    communityTag: "Seemantham & Namakaranam",
  },
];
