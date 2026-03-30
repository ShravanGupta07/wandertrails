import zanskar2 from "@/assets/zanskar-2.jpg";
import zanskar3 from "@/assets/zanskar-3.jpg";
import tirthan2 from "@/assets/tirthan-2.jpg";
import tirthan3 from "@/assets/tirthan-3.jpg";
import majuli2 from "@/assets/majuli-2.jpg";
import majuli3 from "@/assets/majuli-3.jpg";
import spiti2 from "@/assets/spiti-2.jpg";
import spiti3 from "@/assets/spiti-3.jpg";
import dzukou2 from "@/assets/dzukou-2.jpg";
import gurez2 from "@/assets/gurez-2.jpg";

export interface DestinationDetail {
  gallery: string[];
  longDescription: string;
  highlights: string[];
  includes: string[];
  altitude?: string;
  duration: string;
  groupSize: string;
}

export const destinationDetails: Record<string, DestinationDetail> = {
  zanskar: {
    gallery: [zanskar2, zanskar3],
    longDescription:
      "Zanskar Valley is one of the most remote and breathtaking regions in the Indian Himalayas. Nestled between the Great Himalayan Range and the Zanskar Range in Ladakh, this valley remains cut off from the world for over six months due to heavy snowfall. The legendary Chadar Trek — a frozen river walk through towering canyon walls — draws adventurers from across the globe. Ancient Buddhist monasteries like Phugtal (built into a cave) and Karsha dot the landscape, offering a spiritual dimension to the raw wilderness. The turquoise waters of the Zanskar River, the warmth of Zanskari homestays, and the silence of the cold desert make this a once-in-a-lifetime experience.",
    highlights: [
      "Walk the legendary Chadar frozen river trek",
      "Visit Phugtal Monastery — a cave monastery from the 12th century",
      "Explore Karsha, the largest monastery in Zanskar",
      "Stargazing in one of the darkest skies on Earth",
      "Experience authentic Zanskari homestay hospitality",
    ],
    includes: ["Accommodation in homestays & camps", "All meals during trek", "Experienced local guide & porters", "Permits and entry fees", "Transport from Leh"],
    altitude: "3,500m – 5,000m",
    duration: "6–8 Days",
    groupSize: "4–12 People",
  },
  tirthan: {
    gallery: [tirthan2, tirthan3],
    longDescription:
      "Tirthan Valley is Himachal Pradesh's best-kept secret — a pristine valley along the Tirthan River, gateway to the Great Himalayan National Park (a UNESCO World Heritage Site). Unlike the crowded hill stations of North India, Tirthan offers a tranquil escape with crystal-clear trout streams, dense cedar and pine forests, and cozy wooden homestays run by warm Himachali families. The valley is perfect for nature lovers, with trails leading to hidden waterfalls, alpine meadows, and the park's rich biodiversity of over 375 fauna species. Whether you're fly-fishing in the morning mist or hiking to Jalori Pass, Tirthan is pure mountain therapy.",
    highlights: [
      "Trout fishing in pristine Himalayan streams",
      "Trek inside the UNESCO Great Himalayan National Park",
      "Visit the ancient Shringa Rishi Temple",
      "Hike to Jalori Pass & Raghupur Fort ruins",
      "Stay in charming riverside wooden homestays",
    ],
    includes: ["Riverside homestay accommodation", "Home-cooked Himachali meals", "Guided nature walks & treks", "Fishing equipment rental", "Transport from Aut/Bhuntar"],
    altitude: "1,600m – 3,100m",
    duration: "3–5 Days",
    groupSize: "2–10 People",
  },
  majuli: {
    gallery: [majuli2, majuli3],
    longDescription:
      "Majuli is the world's largest river island, sitting majestically on the mighty Brahmaputra in Assam. This living cultural museum is home to neo-Vaishnavite monasteries called Sattras, where monks have preserved ancient art forms — mask-making, pottery, and the mesmerizing Sattriya dance — for over 500 years. Cycle through endless paddy fields, visit Mishing tribal villages built on stilts, and watch golden sunsets paint the river. Majuli is also a birdwatcher's paradise, with migratory species flocking to its wetlands every winter. Despite the threat of erosion, the island's spirit remains unbroken — warm, vibrant, and deeply rooted in tradition.",
    highlights: [
      "Visit centuries-old Vaishnavite Sattras (monasteries)",
      "Watch traditional mask-making artisans at work",
      "Cycle through lush paddy fields & wetlands",
      "Experience Sattriya classical dance performances",
      "Explore Mishing tribal villages on stilts",
    ],
    includes: ["Island guesthouse accommodation", "All meals (authentic Assamese cuisine)", "Bicycle rental for island exploration", "Ferry tickets (Jorhat–Majuli)", "Cultural guide & Sattra visits"],
    duration: "3–4 Days",
    groupSize: "2–15 People",
  },
  spiti: {
    gallery: [spiti2, spiti3],
    longDescription:
      "Spiti Valley — meaning 'The Middle Land' — is a cold desert mountain valley perched at 12,500 feet in Himachal Pradesh. Often called 'Little Tibet,' Spiti is a land of thousand-year-old monasteries clinging to impossible cliffs, fossil-rich valleys, and some of the highest inhabited villages on Earth. The drive through the Spiti gorge — with its dramatic switchbacks and sheer drops — is an adventure in itself. Key Monastery, Chandratal (Moon Lake), and the mummy of Gue are just a few of its wonders. The night sky here, unpolluted by light, reveals the Milky Way in its full glory. Spiti doesn't just change your itinerary — it changes your perspective.",
    highlights: [
      "Visit the iconic Key Monastery at 4,166m",
      "Camp at Chandratal — the mystical Moon Lake",
      "See the 500-year-old mummy at Gue village",
      "Drive the world's most dramatic mountain roads",
      "Stargaze at one of India's highest settlements",
    ],
    includes: ["Camps & guesthouse stays", "All meals during the trip", "4x4 vehicle with experienced driver", "Permits for restricted areas", "Camping gear at Chandratal"],
    altitude: "3,650m – 4,300m",
    duration: "7–9 Days",
    groupSize: "4–12 People",
  },
  dzukou: {
    gallery: [dzukou2],
    longDescription:
      "Dzükou Valley, straddling the border of Nagaland and Manipur, is often called the 'Valley of Flowers of the Northeast.' During monsoon season, the valley transforms into a sea of lilies, rhododendrons, and rare orchids carpeting the rolling green hills. The trek from Viswema village is moderately challenging but incredibly rewarding — you'll pass through bamboo groves, dense forests, and open ridges with panoramic views. Camping by the pristine stream with the stars overhead is an unforgettable experience. The Angami Naga people of the region add cultural depth to this natural wonder, with their rich traditions and legendary hospitality.",
    highlights: [
      "Trek through the 'Valley of Flowers of the Northeast'",
      "Camp beside pristine mountain streams",
      "Explore bamboo groves & rare orchid habitats",
      "Panoramic ridge walks with 360° views",
      "Experience Angami Naga tribal hospitality & cuisine",
    ],
    includes: ["Camping equipment & tents", "All meals (including Naga tribal lunch)", "Trek guide from Viswema", "Permits for the valley", "Transport to trailhead"],
    altitude: "2,400m – 2,700m",
    duration: "2–3 Days",
    groupSize: "4–10 People",
  },
  gurez: {
    gallery: [gurez2],
    longDescription:
      "Gurez Valley is Kashmir's last frontier — an alpine paradise near the Line of Control that remained closed to tourists for decades. Now open to Indian travelers with permits, Gurez offers an untouched landscape of wildflower meadows, wooden Dard Shin villages, and the emerald Kishanganga River carving through the valley. The legendary poetess Habba Khatoon is said to have lived here, and a peak named after her offers stunning panoramic views. Gujjar shepherds with their flocks, ancient Sharda Peeth ruins, and the wooden mosque of Dawar add layers of history and culture. Gurez is raw, real, and utterly magnificent.",
    highlights: [
      "Explore the untouched Habba Khatoon peak viewpoint",
      "Visit ancient Sharda Peeth ruins trail",
      "Experience Gujjar shepherd tea & hospitality",
      "Walk through Tulail Valley wildflower meadows",
      "Discover the charming wooden mosque of Dawar",
    ],
    includes: ["Wooden guesthouse accommodation", "Home-cooked Kashmiri meals", "Local guide with permits", "Transport from Srinagar via Razdan Pass", "Cultural heritage walks"],
    altitude: "2,400m – 3,500m",
    duration: "3–5 Days",
    groupSize: "2–8 People",
  },
};
