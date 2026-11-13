import { images } from "./assets/images.ts"
import type {
  AboutPanel,
  CatalogItem,
  FarmBlogPost,
  ImpactTile,
  SearchEntry,
  ServiceCard,
  ShopCategory,
  ShopProduct,
} from "./types.ts"

export const FARM_NAME = "Strong Livestock"
export const FARM_PHONE = "+250788000000"
export const FARM_PHONE_DISPLAY = "+250 788 000 000"
export const FARM_WHATSAPP = "250788000000"
export const FARM_EMAIL = "desk@stronglivestock.rw"
export const FARM_HOURS = "By appointment · 7:00 AM – 6:00 PM"
export const FARM_LOCATION = "Rugerero, Rwanda"

export const topBarTagline =
  "A growing pig business in Rugerero building a sustainable farm—pigs, manure, and regenerative crops."

export const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "farm-life", label: "Farm Life", href: "/farm-life" },
  { id: "shop", label: "Shop", href: "/shop" },
] as const

export const heroCopy = {
  title: "A growing pig business building a sustainable farm",
  subtitle:
    "Strong Livestock raises and sells pigs in Rugerero, Rwanda—improving our land, using manure wisely, and creating more income opportunities.",
  video: images.heroVideo,
  videoLabel: "Farm livestock video — Strong Livestock pig farming",
} as const

export const aboutIntro =
  "We started in March 2024 with two pigs on land provided by our mother. What began after high school is growing into a farm with a bigger purpose: produce pigs, use our land better, and create more income opportunities."

export const impactTiles: readonly ImpactTile[] = [
  {
    id: "barn",
    kind: "image",
    image: images.pigFacing,
    alt: "Daily livestock care on the Strong Livestock farm",
  },
  {
    id: "started",
    kind: "stat",
    value: "2024",
    label: "Started with two pigs",
    text: "Strong Livestock began in March 2024 in Rugerero on family land—turning a small idea after high school into a growing pig business.",
    href: "/story",
    tone: "cream",
  },
  {
    id: "breeds",
    kind: "image",
    image: images.pigsPair,
    alt: "Healthy pigs raised on the farm in Rugerero",
  },
  {
    id: "land",
    kind: "stat",
    value: "5 ha",
    label: "Farm land in use",
    text: "We are building a productive five-hectare farm where pigs and regenerative crops support each other—manure for soil, land for more income.",
    href: "/contact",
    tone: "gold",
  },
]

export const aboutPanels: readonly AboutPanel[] = [
  {
    id: "history",
    title: "Our Story",
    text: "We are Strong Livestock, a pig farming business based in Rugerero, Rwanda. We started our journey in March 2024 with just two pigs on land generously provided by our mother. What began as a small idea after finishing high school is growing into a business with a bigger purpose: to produce pigs, use our land better, and create more income opportunities.",
    image: {
      src: images.unsplashStoryStart,
      alt: "Farmers at work building a growing livestock business",
    },
  },
  {
    id: "mission",
    title: "What we do",
    text: "Our main activity is raising and selling pigs to generate income and grow our business. We also see value in pig manure, which can be sold or used on our farm to improve soil fertility and support crop production—so we can earn from more than one farm activity.",
    image: {
      src: images.pigsPair,
      alt: "Pigs raised for sale and farm income",
    },
  },
  {
    id: "vision",
    title: "Our Vision",
    text: "To build a sustainable and productive farm that combines pig farming with crop production, protects the environment, and creates more income opportunities. We want Strong Livestock to become a place where other farmers can learn practical skills and see how different farming activities work together.",
    image: {
      src: images.unsplashVisionFarmland,
      alt: "Open farmland for regenerative crops and livestock",
    },
  },
]

export const servicesHeading = {
  title: "How you can buy from Strong Livestock",
} as const

/**
 * Shop categories for /shop/:id filtering (filter UI later).
 * Landing service cards map onto these with clearer sales-channel labels.
 */
export const shopCategories: readonly ShopCategory[] = [
  {
    id: "pigs",
    label: "Live pigs & breeding stock",
    description:
      "B2B live pigs sold per kg to butcheries and meat traders; households and breeding buyers pay a fixed price by size.",
    href: "/shop/pigs",
  },
  {
    id: "manure",
    label: "Organic manure",
    description: "Organic manure fertilizer for crop farmers—sold by the kilogram.",
    href: "/shop/manure",
  },
  {
    id: "regen",
    label: "Regenerative farming",
    description: "Farm visits and learning tied to our five-hectare regenerative plans.",
    href: "/shop/regen",
  },
]

export const serviceCards: readonly ServiceCard[] = [
  {
    id: "b2b",
    title: "B2B live pigs",
    detail: "Butcheries & traders",
    image: images.pigsGroup,
    alt: "Live pigs for butcheries and meat traders",
    href: "/shop/pigs",
    category: "pigs",
  },
  {
    id: "household",
    title: "Household pigs",
    detail: "Families",
    image: images.serviceHouseholdPigs,
    alt: "Pigs for households and families",
    href: "/shop/pigs",
    category: "pigs",
  },
  {
    id: "breeding",
    title: "Breeding stock",
    detail: "Farmers & producers",
    image: images.serviceBreedingStock,
    alt: "Breeding stock for farmers and livestock producers",
    href: "/shop/pigs",
    category: "pigs",
  },
  {
    id: "manure",
    title: "Organic manure",
    detail: "Crop farmers",
    image: images.serviceOrganicManure,
    alt: "Organic manure fertilizer for crop farmers",
    href: "/shop/manure",
    category: "manure",
  },
]

/** Backdrop for the landing services section (Unsplash farm/livestock photo). */
export const servicesBackdrop = images.unsplashServicesBackdrop

export const shopIntro = {
  title: "Farm stock & produce",
  ctaLabel: "Shop now",
  ctaHref: "/shop",
  pageTitle: "Farm shop",
  pageParagraphs: [
    "Strong Livestock raises and sells pigs from our farm in Rugerero. Ask about live stock, manure for soil fertility, and upcoming crop produce as we grow regenerative farming on our five hectares.",
  ],
} as const

export const shopProducts: readonly ShopProduct[] = [
  {
    id: "b2b-live-pigs",
    name: "B2B live pigs",
    detail: "Live pigs for butcheries and meat traders—sold by weight (per kg)",
    image: images.pigsGroup,
    alt: "Live pigs for B2B sale at Strong Livestock",
    category: "pigs",
    pricingMode: "per_kg",
    priceRwf: 2000,
    minKg: 30,
    reviews: 12,
  },
  {
    id: "household-pigs",
    name: "Household pigs",
    detail: "Pigs for households and families—fixed price per animal",
    image: images.pigStanding,
    alt: "Pigs ready for household buyers",
    category: "pigs",
    pricingMode: "fixed",
    priceRwf: 40000,
    reviews: 10,
  },
  {
    id: "breeding-stock",
    name: "Breeding stock",
    detail: "Pigs for farmers and livestock producers—fixed price per animal",
    image: images.pigletWeaning,
    alt: "Breeding stock for farmers and producers",
    category: "pigs",
    pricingMode: "fixed",
    priceRwf: 80000,
    reviews: 8,
  },
  {
    id: "organic-manure",
    name: "Organic manure",
    detail: "Fertilizer for crop farmers—sold by the kilogram",
    image: images.manureSustainability,
    alt: "Organic pig manure for crop farmers",
    category: "manure",
    pricingMode: "per_kg",
    priceRwf: 150,
    minKg: 1,
    reviews: 6,
  },
  {
    id: "farm-visit",
    name: "Farm visit & advice",
    detail: "Learn practical skills from our growing regenerative pig farm",
    image: images.pigFieldWide,
    alt: "Visitors learning practical farming at Strong Livestock",
    category: "regen",
    pricingMode: "fixed",
    priceRwf: 25000,
    reviews: 5,
  },
]

export const storyPage = {
  eyebrow: "Our story",
  title: "From two pigs to a sustainable farm",
  lead: "Strong Livestock is a growing pig business in Rugerero, Rwanda. We started in March 2024 with two pigs on land generously provided by our mother—and we are still learning, improving, and building every day.",
  sections: [
    {
      id: "begin",
      title: "How we began",
      text: "What began as a small idea after finishing high school is growing into a business with a bigger purpose: to produce pigs, use our land better, and create more income opportunities.",
      image: { src: images.pigletsYard, alt: "Early pig farming at Strong Livestock" },
    },
    {
      id: "improve",
      title: "How we are improving the farm",
      text: "We are working to create a farm that is well managed, productive, and comfortable for our animals. We have invested in improving our pig pens and installing a reliable water system, reducing our dependence on buying and transporting water. We are also putting better farm practices in place, including biosecurity, good animal care, and stronger management of farm resources.",
      image: { src: images.pigFacing, alt: "Improved pens and water systems" },
    },
    {
      id: "beyond",
      title: "Growing beyond pig farming",
      text: "We are starting to implement regenerative agriculture on our five-hectare farm. Our plans include planting crops and trees such as bananas, passion fruit, tamarillo, and vegetables, while using properly composted pig manure to improve the soil. Pig farming and crop production should support each other: the pigs provide manure for the crops, and the land becomes more productive.",
      image: { src: images.manureSustainability, alt: "Land for regenerative crops and livestock" },
    },
    {
      id: "next",
      title: "Our next steps",
      text: "Continue improving pig housing, animal care, and farm biosecurity. Strengthen water, feeding, and farm-management systems. Keep records of production costs, sales, and profits. Grow crop production and compost pig manure well. Build relationships with reliable buyers, including local butcheries. In the future, share our experience and train other farmers in practical farming skills.",
      image: { src: images.pigsPair, alt: "Daily farm work and planning ahead" },
    },
    {
      id: "believe",
      title: "What we believe",
      text: "At Strong Livestock, we believe farming is not just about raising animals. It is about using our resources wisely, learning every day, and building a sustainable future—for our family, our land, and other farmers who want to grow with us.",
      image: { src: images.pigCloseupTall, alt: "Healthy young stock for a sustainable future" },
    },
  ],
} as const

export const aboutPage = {
  eyebrow: "About us",
  heroTitle: "Strong Livestock",
  heroParagraphs: [
    "We are a growing pig business based in Rugerero, Rwanda. We started in March 2024 with just two pigs on land generously provided by our mother.",
    "What began as a small idea after finishing high school is growing into a farm with a bigger purpose: to produce pigs, use our land better, and create more income opportunities.",
    "We improve housing and water, use manure wisely for soil fertility, and are building regenerative crop production on our five hectares—so animals and land support each other.",
  ],
  heroImages: [
    {
      src: images.pigProfileTall,
      alt: "Daily care and housing at Strong Livestock in Rugerero",
    },
    {
      src: images.pigCloseupTall,
      alt: "Pigs raised on the farm in Rugerero",
    },
  ],
  stats: [
    { value: "2024", label: "Year we started with two pigs on family land" },
    { value: "5 ha", label: "Farm land for pigs, compost, and crops" },
    { value: "3", label: "Ways to work with us—pigs, manure, and regen" },
    { value: "Daily", label: "Care, biosecurity, and better farm practice" },
  ],
  expertise: {
    badge: "Our farm",
    title: "Building a well managed farm for animals and land",
    text: "We invest in better pens, a reliable water system, biosecurity, and stronger management of farm resources. Pig farming and crop production should support each other—manure for soil, land for more income.",
    image: {
      src: images.pigsPair,
      alt: "Pigs raised with care at Strong Livestock",
    },
  },
  offerings: {
    title: "Explore what we offer from the farm",
    image: {
      src: images.pigFacing,
      alt: "Healthy stock and regenerative plans on the farm",
    },
  },
  improvements: [
    "Improved pig pens for healthier, more comfortable animals",
    "Reliable water system to reduce buying and transporting water",
    "Biosecurity and better animal care practices",
    "Stronger management of farm resources and records",
  ],
  nextSteps: [
    "Keep improving housing, care, and biosecurity",
    "Strengthen water, feeding, and farm management",
    "Track costs, sales, and profits for better decisions",
    "Grow crops and compost manure well",
    "Build relationships with local butcheries and buyers",
    "Train other farmers in practical skills over time",
  ],
} as const

/** Featured products shown on the landing shop strip (same card UI as the full shop). */
export const featuredShopProducts = shopProducts.slice(0, 3)

export const catalog: readonly CatalogItem[] = shopProducts.map(({ id, name, detail, category }) => ({
  id,
  name,
  detail,
  href: `/shop/${category}`,
}))

export const interests = [
  "B2B live pigs (per kg)",
  "Household pigs (fixed by size)",
  "Breeding stock (fixed by size)",
  "Organic manure (per kg)",
  "Farm visit / training",
] as const

export const farmLife = {
  eyebrow: "From the farm blog",
  title: "Learning every day. Building a sustainable future.",
  text: "At Strong Livestock, farming is not just about raising animals. It is about using our resources wisely, improving housing and water, and growing crops that work with our pigs.",
  posts: [
    {
      id: "our-story",
      title: "How we started with two pigs",
      excerpt: "March 2024 in Rugerero—family land, a small idea, and a bigger purpose.",
      body: "We are Strong Livestock, a pig farming business based in Rugerero, Rwanda. We started our journey in March 2024 with just two pigs on land generously provided by our mother. What began as a small idea after finishing high school is growing into a business with a bigger purpose: to produce pigs, use our land better, and create more income opportunities. Every improvement we make—pens, water, biosecurity—builds on that first step.",
      cover: { src: images.pigletsYard, alt: "Early pig farming at Strong Livestock" },
      gallery: [
        { src: images.pigsGroup, alt: "Pigs in our improving pens" },
        { src: images.pigletWeaning, alt: "Young stock on the farm" },
        { src: images.pigletBabyFace, alt: "Calm handling of young pigs" },
      ],
    },
    {
      id: "improving-farm",
      title: "Improving pens, water, and care",
      excerpt: "Better housing, a reliable water system, and stronger biosecurity.",
      body: "We are working to create a farm that is well managed, productive, and comfortable for our animals. We have invested in improving our pig pens and installing a reliable water system, reducing our dependence on buying and transporting water. We are also putting better farm practices in place, including biosecurity, good animal care, and stronger management of farm resources—alongside records of costs, sales, and profits so we can make better decisions.",
      cover: { src: images.pigFacing, alt: "Improved pens and animal care" },
      gallery: [
        { src: images.pigStanding, alt: "Feeding and daily husbandry" },
        { src: images.pigsPair, alt: "Housing improvements on the farm" },
        { src: images.pigCloseupTall, alt: "Healthy stock under better management" },
      ],
    },
    {
      id: "regenerative",
      title: "Pigs and crops working together",
      excerpt: "Five hectares, composted manure, and regenerative plans for bananas, passion fruit, and more.",
      body: "We are starting to implement regenerative agriculture on our five-hectare farm. Our plans include planting crops and trees such as bananas, passion fruit, tamarillo, and vegetables, while using properly composted pig manure to improve the soil. We want pig farming and crop production to support each other: the pigs provide manure for the crops, and the land becomes more productive and creates additional sources of income. In the future, we also want to share our experience and train other farmers in practical farming skills.",
      cover: { src: images.manureSustainability, alt: "Land ready for regenerative farming" },
      gallery: [
        { src: images.pigFieldWide, alt: "Farm land for crops and trees" },
        { src: images.pigProfileTall, alt: "Livestock that supports soil fertility" },
        { src: images.pigletsYard, alt: "Young pigs at the heart of our farm system" },
      ],
    },
  ] satisfies readonly FarmBlogPost[],
} as const

export const contactCopy = {
  title: "Visit Strong Livestock",
  text: "Reach us in Rugerero about live pigs, manure, farm visits, or growing with us. We confirm availability and price by phone or WhatsApp.",
} as const

export const searchEntries: readonly SearchEntry[] = [
  {
    href: "/",
    title: "Home",
    text: "Strong Livestock — pig farming in Rugerero, Rwanda",
  },
  {
    href: "/about",
    title: "About Strong Livestock",
    text: "Who we are, what we do, and how we are improving the farm",
  },
  {
    href: "/story",
    title: "Our story",
    text: "From two pigs in March 2024 to regenerative plans on five hectares",
  },
  {
    href: "/#services",
    title: "Services",
    text: "Pig sales, manure, and regenerative farming — shop categories",
  },
  {
    href: "/shop",
    title: "Farm shop",
    text: "Live pigs, piglets, manure, and farm visits",
  },
  {
    href: "/shop/pigs",
    title: "Shop · Raising & selling pigs",
    text: "Live pigs, growers, and piglets",
  },
  {
    href: "/shop/manure",
    title: "Shop · Manure & soil fertility",
    text: "Pig manure and composted manure",
  },
  {
    href: "/shop/regen",
    title: "Shop · Regenerative farming",
    text: "Farm visits and regenerative farm offerings",
  },
  {
    href: "/checkout",
    title: "Checkout",
    text: "Confirm your request and send it on WhatsApp",
  },
  {
    href: "/farm-life",
    title: "Farm life",
    text: "Farm stories on starting, improving the farm, and regenerative plans",
  },
  {
    href: "/contact",
    title: "Contact",
    text: `${FARM_PHONE_DISPLAY} · ${FARM_LOCATION}`,
  },
]
