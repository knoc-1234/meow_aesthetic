import Image from "next/image";
import ContactForm from "./components/ContactForm";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { createFaqSchema, createPageMetadata } from "@/lib/seo";
import { businessPhone, sharedFaq, whatsappUrl } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Contact & Locations | Meow Aesthetics Singapore",
  description:
    "Find Meow Aesthetics at Marine Parade Central #03-202B and Woods Square Tower 1 #06-80. Open daily. Book via WhatsApp: +65 8771 3358.",
  path: "/contact",
});

const page = () => {
  const contactFaq = [
    ...sharedFaq,
    {
      question: "How do I book a facial or nail appointment?",
      answer:
        "The fastest way to book is via WhatsApp on +65 8771 3358. You can also send a request through the contact form on this page.",
    },
  ];

  return (
    <div className="bg-[#F7F7F7]">
      <JsonLd data={createFaqSchema(contactFaq)} />
      <div className="grid lg:grid-cols-[auto_700px] gap-14">
        <div className="p-8 lg:p-16 w-full lg:w-[85%] mx-auto">
          <div className="flex flex-col gap-5 py-5 w-full">
            <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
              Booking and enquiries
            </p>
            <h1 className="text-5xl font-semibold font-[--font-playfair]">
              Contact Meow Aesthetics Singapore
            </h1>
            <p>
              Contact Meow Aesthetics for gel nails, facials, lash treatments,
              same-day appointment enquiries, and booking support. We welcome
              clients looking for a nail appointment in Singapore, walk-in
              beauty services subject to availability, and WhatsApp-first
              booking.
            </p>
            <p>
              Marine Parade Central #03-202B and Woods Square Tower 1 #06-80.
              Open daily 11:30am to 7pm, with late-night appointments available
              at Marine Parade.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={whatsappUrl}
                className="bg-black text-white px-6 py-3 rounded-full"
              >
                Book via WhatsApp
              </Link>
              <Link
                href={`tel:${businessPhone.replace(/\s/g, "")}`}
                className="border border-black px-6 py-3 rounded-full"
              >
                Call {businessPhone}
              </Link>
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="hidden lg:block w-full">
          <div className="rounded-t-full size-full relative overflow-hidden">
            <Image
              quality={75}
              src={"/assets/contact.jpg"}
              alt="Contact-Meow"
              width={800}
              height={800}
              className="absolute top-0 left-0 size-full rounded-t-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
