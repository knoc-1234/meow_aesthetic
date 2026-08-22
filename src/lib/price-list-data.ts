export type PriceListItem = {
  title: string;
  price: string;
};

export type PriceListSection = {
  title: string;
  items: PriceListItem[];
};

export const priceListSections: PriceListSection[] = [
  {
    title: "Lash Touchup Price List",
    items: [
      { title: "Lash Lift + Tint / 1D Classic", price: "68" },
      { title: "2D Souffle / YY Lashes", price: "78" },
      { title: "3D Lightweight / Wetlook Lashes", price: "88" },
      { title: "Wispy Kim K / Wispy YY Lashes", price: "108" },
      { title: "Foxy / Mermaid / Fairy Lashes", price: "128" },
      { title: "Sunflower / Thai / Comic Lashes", price: "128" },
      { title: "4D - 6D Super Volume Lashes", price: "118" },
      { title: "8D - Mega Volume Lashes", price: "128" },
      { title: "Removal Only", price: "15" },
    ],
  },

  {
    title: "Lash Treatments Price List",
    items: [
      { title: "Lash Lift + Tint / 1D Classic", price: "68" },
      { title: "2D Souffle / YY Lashes", price: "78" },
      { title: "3D Lightweight / Wetlook Lashes", price: "88" },
      { title: "Wispy Kim K / Wispy YY Lashes", price: "108" },
      { title: "Foxy / Mermaid / Fairy Lashes", price: "128" },
      { title: "Sunflower / Thai / Comic Lashes", price: "128" },
      { title: "4D - 6D Super Volume Lashes", price: "118" },
      { title: "8D - Mega Volume Lashes", price: "128" },
      { title: "Lower Lashes", price: "28" },
    ],
  },

  {
    title: "IPL & Spa Price List",
    items: [
      {
        title: "IPL Upper / Lower Lip With Whitening Mask (Male)",
        price: "78",
      },
      {
        title: "IPL Upper Lip With Whitening Mask (Female)",
        price: "58",
      },
      { title: "IPL For Two Full Hands (Female)", price: "188" },
      { title: "IPL For Two Half Hands (Female)", price: "128" },
      { title: "IPL For Two Full Legs (Female)", price: "258" },
      { title: "IPL For Two Half Legs (Female)", price: "158" },
      { title: "IPL For Two Full Hands (Male)", price: "288" },
      { title: "IPL For Two Half Hands (Male)", price: "188" },
      { title: "IPL For Two Full Legs (Male)", price: "288" },
      { title: "IPL For Two Half Legs (Male)", price: "158" },
      { title: "Hand Spa", price: "38" },
      { title: "Foot Spa", price: "58" },
      { title: "Hand And Foot Whitening Mask", price: "38" },
    ],
  },

  {
    title: "Facial Treatments Price List",
    items: [
      { title: "Hydrafacial With Serum", price: "88" },
      { title: "Bojin Meridian Facial", price: "78" },
      { title: "Deep Cleansing Facial", price: "78" },
      { title: "Deep Aqua Cleansing Treatment", price: "78" },
      { title: "Hydration Treatment", price: "68" },
      { title: "Gua Sha Treatment", price: "78" },
      { title: "Vitamin C Whitening Treatment", price: "78" },
      { title: "24K Gold Anti-Aging Treatment", price: "108" },
      { title: "Blackhead Facial", price: "68" },
      { title: "Acne Treatment", price: "78" },
      { title: "Eye Treatment", price: "48" },
      { title: "Eye Gua Sha", price: "58" },
      { title: "IPL First Trial", price: "30 to 60" },
    ],
  },

  {
    title: "Nail Services Price List",
    items: [
      { title: "Express Gel Mani", price: "30" },
      { title: "Express Gel Pedi", price: "40" },
      { title: "Express Gel Mani + Pedi", price: "60" },

      { title: "Classic Mani", price: "30" },
      { title: "Classic Pedi", price: "40" },
      { title: "Classic Mani + Pedi", price: "60" },

      { title: "Classic Gel Mani", price: "48" },
      { title: "Classic Gel Pedi", price: "58" },
      { title: "Classic Gel Mani + Pedi", price: "88" },

      {
        title: "Classic Gel Mani + Simple Design / Cateye / Chrome",
        price: "88",
      },
      {
        title: "Classic Gel Pedi + Simple Design / Cateye / Chrome",
        price: "88",
      },
      {
        title: "Classic Gel Mani & Pedi + Simple Design / Cateye / Chrome",
        price: "176",
      },

      { title: "Classic Gel Mani + Extension", price: "128" },
      {
        title: "Classic Gel Mani + Extension + Design",
        price: "208",
      },
      {
        title: "Classic Gel Mani + Pedi + Extension",
        price: "146",
      },
      {
        title: "Classic Gel Mani + Unlimited Design",
        price: "128",
      },

      { title: "Overlay", price: "30" },
      { title: "Extension", price: "12 per finger / 80 per set" },
      { title: "Gel Removal", price: "15" },
      { title: "Extension Removal", price: "40" },
      { title: "Chrome / Cateye / Ombre", price: "25" },
      { title: "Callus Treatment", price: "68 to 88" },
      { title: "Fungus Treatment", price: "28 to 38" },

      {
        title: "Classic Gel Mani/Pedi + Unlimited Designs",
        price: "88",
      },
      {
        title: "Classic Gel Mani Extensions + Unlimited Designs",
        price: "128",
      },
      {
        title: "Classic Gel Mani + Classic Gel Pedi With Hand And Foot Spa",
        price: "108",
      },
    ],
  },

  {
    title: "Brow Embroidery Price List",
    items: [
      { title: "Basic Embroidery", price: "599" },
      { title: "First Time Trial", price: "388" },
      { title: "Touch Up", price: "200" },
    ],
  },

  {
    title: "Lip Embroidery Price List",
    items: [
      { title: "Basic", price: "799" },
      { title: "First Time Trial", price: "588" },
      { title: "Touch Up", price: "250 to 288" },
    ],
  },
];