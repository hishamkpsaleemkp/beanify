/** Marketing copy & editorial content. Kept out of components so it's easy to edit or move to a CMS. */

export const TRUST_ITEMS = [
  { icon: "shield", title: "Premium Quality", text: "Durable fabrics and reinforced seams." },
  { icon: "cloud", title: "Designed for Comfort", text: "Supportive fill that moulds to you." },
  { icon: "sparkles", title: "Easy to Maintain", text: "Simple care for everyday life." },
  { icon: "home", title: "Made for Modern Homes", text: "Clean shapes in colours you'll love." },
] as const;

export const ROOM_CATEGORIES = [
  { title: "Living Room", image: "/images/scenes/category-living-room.webp", href: "/shop" },
  { title: "Bedroom", image: "/images/scenes/category-bedroom.webp", href: "/shop" },
  { title: "Kids Room", image: "/images/scenes/category-kids-room.webp", href: "/shop" },
  { title: "Gaming", image: "/images/scenes/category-gaming.webp", href: "/shop" },
  { title: "Reading Corner", image: "/images/scenes/category-reading-corner.webp", href: "/shop" },
] as const;

export const WHY_BEANIFY = [
  { n: "01", title: "Premium Materials", text: "Carefully chosen fabrics and fills, finished with reinforced stitching so every piece is made to last." },
  { n: "02", title: "Maximum Comfort", text: "A supportive, sink-in feel that adapts to how you sit, lean and stretch — whether it's five minutes or five hours." },
  { n: "03", title: "Modern Designs", text: "Clean silhouettes and a considered palette that sit naturally in contemporary Indian homes." },
  { n: "04", title: "Made for Everyday Living", text: "Easy to move, easy to care for and built to handle real life — from movie nights to homework hours." },
] as const;

export const INSTAGRAM_IMAGES = [
  { src: "/images/scenes/ig-1.webp", alt: "Beige Beanify lounger in a reading corner" },
  { src: "/images/scenes/ig-2.webp", alt: "Black Beanify bean bag in a gaming setup" },
  { src: "/images/scenes/ig-4.webp", alt: "Burgundy Beanify bean bag in a sunlit living room" },
  { src: "/images/scenes/ig-5.webp", alt: "Blush Beanify floor pouf beside a bed" },
  { src: "/images/scenes/ig-6.webp", alt: "Sage Beanify cushion on a sofa" },
  { src: "/images/scenes/ig-3.webp", alt: "Beanify Kids bean bag in a playroom" },
] as const;

/** Sample testimonials — replace with real customer reviews before launch. */
export const TESTIMONIALS = [
  { quote: "Honestly one of the most comfortable bean bags I've ever used. It looks great in my living room and I end up sitting on it more than the sofa.", name: "Aarav M.", place: "Bengaluru" },
  { quote: "Ordering on WhatsApp was so easy — quick replies, clear details and it arrived exactly as shown. The colour is even richer in person.", name: "Priya S.", place: "Mumbai" },
  { quote: "The Lounger has become the official reading spot in our house. Great build quality and it still looks brand new after months.", name: "Rohan K.", place: "Pune" },
  { quote: "Bought the Kids one for my daughter's room and now she won't leave it. Soft, sturdy and really easy to wipe clean.", name: "Meera N.", place: "Hyderabad" },
  { quote: "Finally, a bean bag that looks like proper furniture. Guests keep asking where it's from.", name: "Karan D.", place: "Delhi" },
] as const;

export const ABOUT_PROMISES = [
  { title: "Honest quality", text: "What you see is what you get — materials and finishing we'd happily put in our own homes." },
  { title: "Real support", text: "A real person on WhatsApp who helps you pick the right size and colour, and stays with you until it's delivered." },
  { title: "Comfort you can count on", text: "If something isn't right, tell us. We'll make it right." },
] as const;
