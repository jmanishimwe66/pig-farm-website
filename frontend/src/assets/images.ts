import heroPng from "./hero.png"
import manureSustainability from "./images/manure-sustainability.jpeg"
import pigCloseupTall from "./images/pig-closeup-tall.jpeg"
import pigFacing from "./images/pig-facing.jpeg"
import pigFieldWide from "./images/pig-field-wide.jpeg"
import pigProfileTall from "./images/pig-profile-tall.jpeg"
import pigStanding from "./images/pig-standing.jpeg"
import pigletBabyFace from "./images/piglet-baby-face.jpeg"
import pigletWeaning from "./images/piglet-weaning.jpeg"
import pigletsYard from "./images/piglets-yard.jpeg"
import pigsGroup from "./images/pigs-group.jpeg"
import pigsPair from "./images/pigs-pair.jpeg"
/** Our Story — farmers at work / farm beginning */
import unsplashStoryStart from "./images/unsplash-story-start.jpeg"
/** Unsplash — What we do (pigs on the farm) */
import unsplashWhatWeDo from "./images/unsplash-story-pigs.jpeg"
/** Unsplash — Our Vision (farmland / regenerative land) */
import unsplashVisionFarmland from "./images/unsplash-vision-farmland.jpeg"
/** Unsplash — Services section backdrop */
import unsplashServicesBackdrop from "./images/unsplash-services-backdrop.jpeg"
/** Household pigs service card — pigs in farm pens */
import serviceHouseholdPigs from "./images/service-household-pigs.jpeg"
/** Breeding stock service card — nursing piglets */
import serviceBreedingStock from "./images/service-breeding-stock.jpeg"
/** Organic manure service card — soil / compost in hands */
import serviceOrganicManure from "./images/service-organic-manure.jpeg"
/** Crop / soil work (supporting “what we do” manure & land) */
import unsplashWhatWeDoLand from "./images/unsplash-what-we-do.jpeg"

/**
 * Central image map — local assets + Unsplash downloads.
 * Hero farm video: Mixkit “Pig attached with a rope…” → /videos/hero.mp4
 * https://mixkit.co/free-stock-video/pig-attached-with-a-rope-to-a-tree-eats-from-11150/
 */
export const images = {
  hero: heroPng,
  manureSustainability,
  pigCloseupTall,
  pigFacing,
  pigFieldWide,
  pigProfileTall,
  pigStanding,
  pigletBabyFace,
  pigletWeaning,
  pigletsYard,
  pigsGroup,
  pigsPair,
  unsplashStoryStart,
  unsplashWhatWeDo,
  unsplashWhatWeDoLand,
  unsplashVisionFarmland,
  unsplashServicesBackdrop,
  serviceHouseholdPigs,
  serviceBreedingStock,
  serviceOrganicManure,
} as const

export type SiteImageKey = keyof typeof images
