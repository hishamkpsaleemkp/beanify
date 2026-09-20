import { buildContactMessage, whatsappUrl } from "@/lib/whatsapp";

export interface EnquiryValues {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}

/**
 * Beanify has no backend yet, so enquiries are handed to WhatsApp (pre-filled).
 * When an API/CRM exists, POST `values` here and keep the WhatsApp URL as the fallback.
 */
export function submitEnquiry(values: EnquiryValues) {
  return { channel: "whatsapp" as const, url: whatsappUrl(buildContactMessage(values)) };
}
