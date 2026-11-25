export interface Rasm {
  id: string;
  name: string;
  tradition: "Muslim" | "Telugu Hindu" | "Shared";
  meaning: string;
  weHandle: string;
  image: string;
  alt: string;
}

/** The seven wedding rites shown in "Hamari Rasmein". Facts only: no names, quotes or ratings. */
export const RASMEIN: Rasm[] = [
  {
    id: "sanchaq",
    name: "Sanchaq",
    tradition: "Muslim",
    meaning: "The groom's family arrives at the bride's home with her wedding joda, jewellery and gifts, carried on decorated thaals.",
    weHandle: "Sanchaq and Khada Dupatta thaal presentation corners, ready for the groom's family arrival.",
    image: "/images/bridal-entry-indian.webp",
    alt: "A bride in red bridal wear making her entry, framed by flowers",
  },
  {
    id: "manjha-haldi",
    name: "Manjha & Haldi",
    tradition: "Shared",
    meaning: "Turmeric paste for the bride and groom, in yellow clothes, with family songs: Manjha in Hyderabadi Muslim homes, Haldi and Mangala Snanam in Hindu ones.",
    weHandle: "Home-courtyard Manjha and Haldi canopies with marigold, gota-patti and a calm flow for elders.",
    image: "/images/haldi-mehendi-courtyard.webp",
    alt: "A sunlit marigold courtyard styled for a Haldi and Manjha ceremony",
  },
  {
    id: "mehendi",
    name: "Mehendi",
    tradition: "Shared",
    meaning: "An evening of henna, dholak songs and teasing, where the bride's hands are painted before the wedding day.",
    weHandle: "Bangle and mehendi corners, floor seating, music cues and chai that keeps coming.",
    image: "/images/family-celebration-indian.webp",
    alt: "Family members celebrating together at a colourful pre-wedding gathering",
  },
  {
    id: "pelli-pandiri",
    name: "Pelli Pandiri",
    tradition: "Telugu Hindu",
    meaning: "The wedding canopy of bamboo, banana stems and mango leaves; at the muhurtham, the couple place Jeelakarra Bellam on each other's heads.",
    weHandle: "Pelli Pandiri mandapams in banana trunks, banti puvvu and fresh mallige, timed to the muhurtham.",
    image: "/images/floral-mandap-indian.webp",
    alt: "A Telugu Pelli Pandiri mandapam dressed with banana trunks, marigolds and jasmine",
  },
  {
    id: "baraat",
    name: "Baraat",
    tradition: "Shared",
    meaning: "The groom's procession to the venue: Tasha-Marfa drums in Hyderabad, Dhol for Punjabi families, Pallaki and Nadaswaram for Telugu weddings.",
    weHandle: "Tasha-Marfa, Dhol and Pallaki processions, with every entry cue run safely and on time.",
    image: "/images/baraat-grand-entry.webp",
    alt: "A Hyderabad Baraat arriving with drummers, a vintage car and the groom's family",
  },
  {
    id: "nikkah",
    name: "Nikkah",
    tradition: "Muslim",
    meaning: "The marriage contract, Ijab-o-Qubul, before the qazi and witnesses, followed in Hyderabad by the Arsi Mushaf mirror moment.",
    weHandle: "Chowmahalla-inspired scalloped arches, Nikkah divans and a quiet space for Arsi Mushaf.",
    image: "/images/nikkah-walima-arch.webp",
    alt: "A cream scalloped arch stage styled for a Nikkah ceremony",
  },
  {
    id: "walima-vindhu",
    name: "Walima & Vindhu",
    tradition: "Shared",
    meaning: "The wedding feast: the Walima hosted by the groom's family after the Nikkah, and the Telugu Pelli Vindhu served on banana leaf.",
    weHandle: "Coal-dum biryani for the Walima and a sit-down Arati Aku Vindhu, from separate veg and non-veg kitchens.",
    image: "/images/hyd-muslim-dawat-spread.webp",
    alt: "A Hyderabadi wedding feast spread with dum biryani, lukhmi and qubani ka meetha",
  },
];
