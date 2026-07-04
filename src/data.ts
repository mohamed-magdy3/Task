import { Product } from "./types";

import image1 from "../assets/images/1.jpg";
import image1g from "../assets/images/1g.jpg";
import image1s from "../assets/images/1s.jpg";
import image2 from "../assets/images/2.webp";
import image2s from "../assets/images/2s.webp";
import image3 from "../assets/images/3.jpg";
import image3b from "../assets/images/3b.jpg";
import image4 from "../assets/images/4.webp";
import image5 from "../assets/images/5.webp";
import image5b from "../assets/images/5b.webp";

import card from "../assets/images/card.webp";
import sense from "../assets/images/sense.webp";
import senseHub from "../assets/images/senseHub.webp";



export const PRODUCTS: Product[] = [
  {
    id: "cam1",
    name: "Wyze Cam v4",
    description: "The clearest Wyze Cam ever made.",
    category: "CAMERAS",
    price: 27.98,
    originalPrice: 35.98,
    savings: "Save 22%",
    imageUrl: image1,
    variants: [
      { id: "white", name: "White", imageUrl: image1 },
      { id: "grey", name: "Grey", imageUrl: image1g },
      { id: "black", name: "Black", imageUrl: image1s },
    ],
  },
  {
    id: "cam2",
    name: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt security camera.",
    category: "CAMERAS",
    price: 23.99,
    originalPrice: 28.99, 
    savings: "Save 17%",
    imageUrl: image2,
    variants: [
      { id: "white", name: "White", imageUrl: image2 },
      { id: "black", name: "Black", imageUrl: image2s },
    ],
  },
  {
    id: "cam3",
    name: "Wyze Cam Floodlight v2",
    description:
      "2K floodlight camera with a 160° wide-angle view for your garage.",
    category: "CAMERAS",
    price: 69.98,
    originalPrice: 89.98,
    savings: "Save 22%",
    imageUrl: image3,
    variants: [
      { id: "white", name: "White", imageUrl: image3 },
      { id: "black", name: "Black", imageUrl: image3b },
    ],
  },
  {
    id: "cam4",
    name: "Wyze Duo Cam Doorbell",
    description: "Two cameras. Two views. Double the porch protection.",
    category: "CAMERAS",
    price: 69.98,
    originalPrice: 69.98,
    imageUrl: image4,
    variants: [],
  },
  {
    id: "cam5",
    name: "Wyze Battery Cam Pro",
    description:
      "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.",
    category: "CAMERAS",
    price: 89.98,
    originalPrice: 89.98,
    imageUrl: image5,
    variants: [
      { id: "white", name: "White", imageUrl: image5 },
      { id: "black", name: "Black", imageUrl: image5b },
    ],
  },
  {
    id: "plan1",
    name: "Cam Unlimited",
    description: "Professional monitoring and cloud storage.",
    category: "PLAN",
    price: 9.99,
    originalPrice: 12.99,
    variants: [],
  },
  {
    id: "sen1",
    name: "Wyze Sense Motion Sensor",
    description: "Detects motion in your home.",
    category: "SENSORS",
    price: 29.99, 
    originalPrice: 29.99,
    imageUrl: sense, // تمت إضافة مسار الصورة الأساسي
    variants: [
      { id: "white", name: "White", imageUrl: sense },
    ],
  },
  {
    id: "sen2",
    name: "Wyze Sense Hub (Required)",
    description: "Connects all your sensors.",
    category: "SENSORS",
    price: 0, 
    originalPrice: 29.92,
    imageUrl: senseHub,
    variants: [{ id: "white", name: "White", imageUrl: senseHub }],
  },
  {
    id: "acc1",
    name: "Wyze MicroSD Card (256GB)",
    description: "Local storage for continuous recording.",
    category: "ACCESSORIES",
    price: 20.98, 
    originalPrice: 20.98,
    imageUrl: card, 
    variants: [
      { id: "black", name: "Black", imageUrl: card },
    ],
  },
];