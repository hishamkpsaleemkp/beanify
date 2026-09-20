export interface LegalSection {
  heading: string;
  body: string[];
}

export const LEGAL_UPDATED = "20 September 2026";

/**
 * Starter policy text based on how this site works (browse → order over WhatsApp, no online payments).
 * Have it reviewed by a legal professional before launch.
 */
export const privacySections: LegalSection[] = [
  {
    heading: "Who we are",
    body: ["Beanify (“we”, “us”) is a Bean Bag & Home Living brand. This policy explains what information we collect when you use this website and how we use it."],
  },
  {
    heading: "Information we collect",
    body: [
      "We don't run online accounts or take payments on this website. The information we may receive comes from you directly:",
      "• Details you share with us on WhatsApp, Instagram or email when you enquire or place an order — such as your name, phone number, delivery address and product choices.",
      "• Details you enter in our contact form (name, phone/email and message).",
      "• Basic, anonymous usage data (such as pages visited and device type) if analytics tools are enabled on the site.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use your information to respond to enquiries, confirm and deliver orders, provide support and improve our products and website. We do not sell your personal information.",
    ],
  },
  {
    heading: "WhatsApp and third-party services",
    body: [
      "When you tap “Buy on WhatsApp” or “Chat on WhatsApp”, you are taken to WhatsApp (a service of Meta) to continue the conversation. Messages you send there are subject to WhatsApp's own privacy policy. Our links to Instagram work the same way.",
    ],
  },
  {
    heading: "Data on your device",
    body: [
      "Your wishlist is saved only in your browser (local storage) on your own device. We don't receive it, and you can clear it at any time by clearing your browser data.",
    ],
  },
  {
    heading: "Data sharing & retention",
    body: [
      "We share order details with delivery partners only as needed to fulfil your order. We keep order and support records only as long as needed for those purposes and to meet legal obligations.",
    ],
  },
  {
    heading: "Your choices",
    body: ["You can ask us to access, correct or delete the personal information we hold about you by messaging us on WhatsApp or emailing us."],
  },
  {
    heading: "Contact",
    body: ["Questions about this policy? Reach us via the Contact page."],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Using this website",
    body: ["By using this website you agree to these terms. Please read them along with our Privacy Policy. If you don't agree, please don't use the site."],
  },
  {
    heading: "How ordering works",
    body: [
      "Beanify doesn't offer an online checkout. Selecting a product and tapping “Buy on WhatsApp” opens a pre-filled WhatsApp message to us. An order is only confirmed once we've replied to confirm availability, price, payment and delivery details.",
    ],
  },
  {
    heading: "Products, pricing & availability",
    body: [
      "We try to show colours, sizes and prices accurately, but photographs and screens may vary slightly from the actual product. Prices are in Indian Rupees (INR) and may change; the price confirmed in the WhatsApp chat applies to your order. Products are subject to availability.",
    ],
  },
  {
    heading: "Payment",
    body: ["Payment methods and any applicable options (such as cash on delivery) are confirmed with you on WhatsApp before your order is dispatched."],
  },
  {
    heading: "Delivery",
    body: ["Estimated delivery times are shared when your order is confirmed and may vary by location. Delays caused by couriers or events outside our control are not the responsibility of Beanify."],
  },
  {
    heading: "Returns & replacements",
    body: [
      "If your order arrives damaged or not as described, contact us on WhatsApp within 7 days of delivery with photos, and we'll arrange a replacement or refund. For change-of-mind requests, products must be unused and in their original packaging. See our FAQs for more.",
    ],
  },
  {
    heading: "Intellectual property",
    body: ["All content on this website — including the Beanify name, logo, images and text — belongs to Beanify and may not be copied or reused without permission."],
  },
  {
    heading: "Limitation of liability",
    body: ["To the extent permitted by law, Beanify isn't liable for indirect or consequential losses arising from use of this website. Nothing in these terms limits your statutory consumer rights."],
  },
  {
    heading: "Changes & governing law",
    body: ["We may update these terms from time to time; the latest version is always on this page. These terms are governed by the laws of India."],
  },
  {
    heading: "Contact",
    body: ["Questions about these terms? Reach us via the Contact page."],
  },
];
