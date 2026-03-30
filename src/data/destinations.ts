import zanskarImg from "@/assets/zanskar-valley.jpg";
import tirthanImg from "@/assets/tirthan-valley.jpg";
import majuliImg from "@/assets/majuli-island.jpg";
import spitiImg from "@/assets/spiti-valley.jpg";
import dzukouImg from "@/assets/dzukou-valley.jpg";
import gurezImg from "@/assets/gurez-valley.jpg";
import type { Destination } from "./types";

export const destinations: Destination[] = [
  {
    id: "zanskar",
    name: "Zanskar Valley",
    region: "North India",
    state: "Ladakh",
    image: zanskarImg,
    description: "A remote Himalayan valley with frozen rivers, ancient monasteries, and dramatic canyon landscapes untouched by mass tourism.",
    bestTime: "Jun–Sep",
    price: 18500,
    difficulty: "Challenging",
    featured: true,
  },
  {
    id: "tirthan",
    name: "Tirthan Valley",
    region: "North India",
    state: "Himachal Pradesh",
    image: tirthanImg,
    description: "A hidden gem in the Great Himalayan National Park — pristine trout streams, dense forests, and cozy homestays.",
    bestTime: "Mar–Jun",
    price: 8900,
    difficulty: "Easy",
    featured: true,
  },
  {
    id: "majuli",
    name: "Majuli Island",
    region: "Northeast India",
    state: "Assam",
    image: majuliImg,
    description: "The world's largest river island on the Brahmaputra — a living heritage of Vaishnavite monasteries and tribal culture.",
    bestTime: "Oct–Mar",
    price: 7500,
    difficulty: "Easy",
    featured: true,
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    region: "North India",
    state: "Himachal Pradesh",
    image: spitiImg,
    description: "A cold desert mountain valley with thousand-year-old monasteries perched on impossible cliffs at 12,500 ft.",
    bestTime: "May–Oct",
    price: 14200,
    difficulty: "Challenging",
    featured: true,
  },
  {
    id: "dzukou",
    name: "Dzükou Valley",
    region: "Northeast India",
    state: "Nagaland",
    image: dzukouImg,
    description: "Rolling green hills carpeted with seasonal wildflowers — the 'Valley of Flowers of the Northeast.'",
    bestTime: "Jun–Sep",
    price: 9800,
    difficulty: "Moderate",
  },
  {
    id: "gurez",
    name: "Gurez Valley",
    region: "North India",
    state: "Kashmir",
    image: gurezImg,
    description: "An alpine meadow paradise near the Line of Control — wildflowers, wooden villages, and the Kishanganga river.",
    bestTime: "May–Oct",
    price: 11500,
    difficulty: "Moderate",
  },
];

export const itineraryDatabase: Record<string, string[][]> = {
  "zanskar": [
    ["Arrive in Leh, acclimatize at altitude", "Explore Leh Palace & local markets", "Evening: Star-gazing session in the cold desert"],
    ["Drive to Zanskar via Pensi La pass", "Visit Drang-Drung Glacier viewpoint", "Arrive at Padum, explore ancient Karsha Monastery"],
    ["Chadar Trek preparation & river walk", "Visit Phugtal Monastery (cave monastery)", "Campfire dinner with Zanskari hosts"],
  ],
  "tirthan": [
    ["Arrive at Tirthan, check into riverside homestay", "Trout fishing in the pristine river", "Evening bonfire & local Himachali cuisine"],
    ["Trek to the Great Himalayan National Park entrance", "Explore waterfall trail & pine forests", "Visit the traditional Shringa Rishi Temple"],
    ["River crossing & nature walk", "Visit Jalori Pass & Raghupur Fort ruins", "Farewell lunch & depart"],
  ],
  "majuli": [
    ["Ferry ride to Majuli from Jorhat", "Visit Kamalabari Satra (neo-Vaishnavite monastery)", "Sunset walk along the riverbank"],
    ["Explore Mishing tribal villages", "Watch traditional mask-making artisans", "Attend a Sattriya dance performance"],
    ["Cycle through paddy fields & wetlands", "Visit Auniati Satra & ancient manuscripts", "Ferry back with local stories"],
  ],
  "spiti": [
    ["Arrive via Manali-Spiti highway", "Stop at Kunzum Pass for panoramic views", "Reach Kaza, acclimatize at 3,650m"],
    ["Visit Key Monastery & Kibber village", "Drive to Chandratal Lake (Moon Lake)", "Stargazing at one of India's highest settlements"],
    ["Explore Dhankar Monastery & fort ruins", "Visit fossil-rich Pin Valley National Park", "Depart via the stunning Spiti gorge road"],
  ],
  "dzukou": [
    ["Trek from Viswema village to Dzükou Valley", "Set up camp near the pristine stream", "Evening: Explore the bamboo groves & orchids"],
    ["Sunrise hike to the ridge for panoramic views", "Walk through the valley of wildflowers", "Naga tribal lunch cooked at campsite"],
    ["Explore the cave formations nearby", "Descend back to Viswema", "Evening: Traditional Naga feast & farewell"],
  ],
  "gurez": [
    ["Drive from Srinagar via Razdan Pass", "Arrive at Dawar, check into wooden guesthouse", "Evening walk by the Kishanganga river"],
    ["Hike to Habba Khatoon peak viewpoint", "Visit the ancient Sharda Peeth ruins trail", "Gujjar shepherd tea experience"],
    ["Explore Tulail Valley & flower meadows", "Visit the wooden mosque of Dawar", "Drive back via the scenic mountain pass"],
  ],
};
