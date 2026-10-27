import { firestore } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export const siteConfig = {
  name: "SpaceCode",
  tagline: "Web development studio",
  description:
    "SpaceCode dizajnira i pravi veb-sajtove i veb aplikacije koje ce vam pomoci da se izdvojite od konkurencije.",
  email: "talk.spacecode@gmail.com",
  phone: "+381 61 192 64 74",
  phone2: "+381 64 562 41 81",
  website: "spacecodestudio.vercel.app",
  location: "Nis/Lazarevac, Serbia",
  social: {
    github: "https://github.com/getspacecode",
    instagram: "https://www.instagram.com/space_code.dev/",
  },
};
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PANEL_PASSWORD;
export const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/services", label: "Usluge" },
  { href: "/projects", label: "Projekti" },
  { href: "/about", label: "O name" },
  { href: "/news", label: "Novosti" },
  { href: "/review", label: "Recenzije" },
  { href: "/contact", label: "Kontakt" },
];
export async function getAvgRating(): Promise<number> {
  try {
    const snapshot = await getDocs(collection(firestore, "reviews"));

    if (snapshot.empty) {
      return 0;
    }

    const total = snapshot.docs.reduce((sum, doc) => {
      return sum + doc.data().rating;
    }, 0);

    return total / snapshot.size;
  } catch (err) {
    console.error(err);
    return 0;
  }
}
export async function getProjectsCount(): Promise<number> {
  try {
    const snapshot = await getDocs(collection(firestore, "projects"));

    return snapshot.size;
  } catch (err) {
    console.error(err);
    return 0;
  }
}
