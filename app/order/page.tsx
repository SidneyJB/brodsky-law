import { redirect } from "next/navigation";

/** Temporarily: order flow disabled; send visitors to the contact form. */
export default function OrderPage() {
  redirect("/contact");
}
