export interface Destination {
  id: string;
  name: string;
  region: string;
  state: string;
  image: string;
  description: string;
  bestTime: string;
  price: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  featured?: boolean;
}
