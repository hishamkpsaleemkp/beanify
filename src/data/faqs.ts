export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/** Answers marked (placeholder) should be confirmed with the Beanify team before launch. */
export const faqs: Faq[] = [
  {
    id: "what-is-beanify",
    question: "What is a Beanify bean bag?",
    answer:
      "Beanify makes premium bean bags and home-living pieces designed to look as good as they feel — a supportive, sink-in seat with a clean, modern shape, made for everyday living.",
  },
  {
    id: "choose-size",
    question: "How do I choose the right size?",
    answer:
      "Large suits most adults and is great for reading and relaxing. Go XL or XXL if you're taller, like to stretch out, or want a roomier seat. Kids and Junior sizes are made for children. Every product page lists approximate dimensions, and we're happy to help you choose on WhatsApp.",
  },
  {
    id: "material",
    question: "What material is used?",
    answer:
      "Our bean bags use a durable woven outer cover with a soft inner liner and premium EPS bean filling. Exact fabrics vary by product — see the Material section on each product page.",
  },
  {
    id: "washable",
    question: "Is the cover washable?",
    answer:
      "Most covers are best spot-cleaned with a damp cloth and mild soap. Cushion covers are removable and can be hand washed gently in cold water. Care instructions are listed on every product page.",
  },
  {
    id: "delivery",
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 5–7 working days after your order is confirmed on WhatsApp. Delivery times can vary by location — we'll share the exact timeline when you order.",
  },
  {
    id: "cod",
    question: "Do you offer COD?",
    answer:
      "Cash on delivery availability depends on your pincode. Message us on WhatsApp with your pincode and we'll confirm the payment options available for your area.",
  },
  {
    id: "how-to-order",
    question: "How can I order?",
    answer:
      "Pick your product, colour and size, then tap “Buy on WhatsApp”. WhatsApp opens with your selection pre-filled — send it to us and we'll confirm details, payment and delivery right there in the chat.",
  },
  {
    id: "returns",
    question: "What is the return policy?",
    answer:
      "If your order arrives damaged or not as described, message us on WhatsApp within 7 days of delivery with photos and we'll arrange a replacement or refund. For change-of-mind requests, products must be unused and in their original packaging.",
  },
  {
    id: "contact",
    question: "How do I contact Beanify?",
    answer:
      "The fastest way is WhatsApp — tap the green button on any page. You can also message us on Instagram @beanify.online or use the contact form.",
  },
];
