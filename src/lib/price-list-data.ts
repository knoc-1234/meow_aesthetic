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
      { title: "Lash Lift + Tint / 1D Classic", price: "38" },
      { title: "2D Souffle / YY Lashes", price: "48" },
      { title: "3D Lightweight / Wetlook Lashes", price: "48" },
      { title: "Foxy / Mermaid / Fairy Lashes", price: "58" },
      { title: "Sunflower / Thai / Comic Lashes", price: "58" },
      { title: "Wispy Kim K / Wispy YY Lashes", price: "58" },
      { title: "4D - 6D Super Volume Lashes", price: "58" },
      { title: "8D - Mega Volume Lashes", price: "68" },
      { title: "Removal Only", price: "18" },
    ],
  },
  {
    title: "Lash Treatments Price List",
    items: [
      { title: "Lash Lift + Tint / 1D Classic", price: "68" },
      { title: "2D Souffle / YY Lashes", price: "78" },
      { title: "3D Lightweight / Wetlook Lashes", price: "88" },
      { title: "Foxy / Mermaid / Fairy Lashes", price: "98" },
      { title: "Sunflower / Thai / Comic Lashes", price: "108" },
      { title: "Wispy Kim K / Wispy YY Lashes", price: "108" },
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
      {
        title: "Classic Gel Mani/Pedi + Unlimited Designs",
        price: "88",
      },
      {
        title: "Classic Gel Mani Extensions + Unlimited Designs",
        price: "128",
      },
      { title: "Chrome / Cat Eye", price: "20 additional" },
      { title: "Ombre Gel Mani", price: "88" },
      { title: "Marble Gel Mani", price: "88" },
      { title: "Gel Removal", price: "20 additional" },
      { title: "Gel Extension Removal", price: "30 additional" },
      {
        title: "Classic Gel Mani + Classic Gel Pedi With Hand And Foot Spa",
        price: "108",
      },
    ],
  },
];
