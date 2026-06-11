import type { HomepageContent } from "@/lib/types";

export const homepageContent: HomepageContent = {
  headerActions: [
    {
      title: "List Your Property",
      subtitle: "Grow your business!",
      variant: "ghost"
    },
    {
      title: "Introducing myBiz",
      subtitle: "Business Travel Solution",
      variant: "ghost"
    },
    {
      title: "My Trips",
      subtitle: "Manage your bookings",
      variant: "ghost"
    },
    {
      title: "Login or Create Account",
      subtitle: "",
      variant: "solid"
    }
  ],
  products: [
    { id: "flights", label: "Flights" },
    { id: "hotels", label: "Hotels" },
    { id: "homestays", label: "Homestays & Villas" },
    { id: "holidays", label: "Holiday Packages" },
    { id: "trains", label: "Trains" },
    { id: "buses", label: "Buses" },
    { id: "cabs", label: "Cabs" },
    { id: "forex", label: "Forex Card & Currency", badge: "new" },
    { id: "insurance", label: "Travel Insurance" }
  ],
  flightSearch: {
    headline: "Book International and Domestic Flights",
    tripTypes: ["One Way", "Round Trip", "Multi City"],
    from: {
      label: "From",
      code: "DEL",
      city: "Delhi",
      detail: "Indira Gandhi International Airport"
    },
    to: {
      label: "To",
      code: "BLR",
      city: "Bengaluru",
      detail: "Kempegowda International Airport"
    },
    departure: {
      label: "Departure",
      day: "18",
      monthYear: "Jun'26",
      weekday: "Thursday"
    },
    returnDate: {
      label: "Return",
      day: "",
      monthYear: "",
      weekday: "",
      helper: "Tap to add a return date for bigger discounts"
    },
    travellers: {
      adults: 1,
      children: 0,
      infants: 0,
      cabin: "Economy/Premium Economy"
    },
    fareTypes: [
      {
        id: "regular",
        title: "Regular",
        subtitle: "Regular fares"
      },
      {
        id: "student",
        title: "Student",
        subtitle: "Extra discounts/baggage"
      },
      {
        id: "senior",
        title: "Senior Citizen",
        subtitle: "Up to Rs. 600 off"
      },
      {
        id: "armed",
        title: "Armed Forces",
        subtitle: "Up to Rs. 600 off"
      },
      {
        id: "doctor",
        title: "Doctor and Nurses",
        subtitle: "Up to Rs. 600 off"
      }
    ]
  },
  loginCard: {
    title: "Start a New, Memorable Journey with MakeMyTrip",
    subtitle: "Up to 25% OFF on Your 1st Booking with us",
    imageUrl: "https://promos.makemytrip.com/gcc/Slice12x.png"
  },
  offers: [
    {
      label: "FLIGHTS",
      title: "BIG SAVINGS ON YOUR FIRST BOOKING",
      text: "Up to 35% OFF* on Flights & Hotels",
      imageUrl: "https://promos.makemytrip.com/appfest/2x//mmtglobal-116x116-02022026.jpg",
      expires: "30 Dec 26"
    },
    {
      label: "FLIGHTS",
      title: "Savings Alert: Get FLAT 8% OFF*",
      text: "when you book your International Flights with us.",
      imageUrl: "https://promos.makemytrip.com/appfest/2x//flights-116x116-02022026.jpg",
      expires: "30 Dec 26"
    },
    {
      label: "HOTELS",
      title: "Instant savings: Up to 25% OFF* on hotels",
      text: "Grab this great value deal on your next trip.",
      imageUrl: "https://promos.makemytrip.com/appfest/2x//hotels-116x116-02022026.jpg",
      expires: "30 Dec 26"
    }
  ],
  trustBadges: [
    {
      title: "MMT Select",
      text: "The Most-Rewarding Loyalty Program Globally",
      imageUrl: "https://promos.makemytrip.com/appfest/2x/MMT-Select-Icon.webp"
    },
    {
      title: "MMT Exclusive Hotels",
      text: "Avail Lowest Price Guarantee on select hotels",
      imageUrl: "https://promos.makemytrip.com/appfest/2x/Best-Price.webp",
      tagged: true
    },
    {
      title: "MMT Connect",
      text: "Best Flight Connections & Cheapest Fares",
      imageUrl: "https://promos.makemytrip.com/appfest/2x/Free-cancellation.webp"
    },
    {
      title: "24*7 Customer Support",
      text: "Call Support in less than 2 minutes",
      imageUrl: "https://promos.makemytrip.com/appfest/2x/Customer-support.webp"
    },
    {
      title: "Secured Payments",
      text: "Visa, Mastercard and more",
      imageUrl: "https://promos.makemytrip.com/appfest/2x/Trusted-Partners.webp"
    }
  ],
  routeGroups: [
    {
      title: "Top Flight Routes",
      links: [
        "Delhi to Mumbai flight",
        "Mumbai to Delhi flight",
        "Bangalore to Delhi flight",
        "Delhi to Bangalore flight",
        "Mumbai to Bangalore flight",
        "Pune to Delhi flight",
        "Delhi to Goa flight",
        "Chennai to Mumbai flight",
        "Hyderabad to Delhi flight",
        "Kolkata to Delhi flight",
        "Ahmedabad to Mumbai flight",
        "Goa to Delhi flight"
      ]
    },
    {
      title: "Airlines",
      links: [
        "Indigo",
        "Emirates",
        "Spicejet",
        "Air India",
        "Air India Express",
        "Vistara",
        "Qatar Airways",
        "Etihad Airways",
        "Flydubai",
        "Oman Air",
        "Thai Airways",
        "Turkish Airlines"
      ]
    },
    {
      title: "Product Offering",
      links: [
        "Flights",
        "Hotels",
        "Homestays",
        "Holiday Packages",
        "Train Tickets",
        "Bus Tickets",
        "Cab Booking",
        "Forex Card",
        "Travel Insurance"
      ]
    }
  ],
  seoBlocks: [
    {
      title: "Why MakeMyTrip?",
      body: "Established in 2000, MakeMyTrip has since positioned itself as one of the leading companies, providing great offers, competitive airfares, exclusive discounts, and a seamless online booking experience to many of its customers. The experience of booking your flight tickets, hotel stay, and holiday package through our desktop site or mobile app can be done with complete ease and no hassles at all."
    },
    {
      title: "Booking Flights with MakeMyTrip",
      body: "At MakeMyTrip, you can find the best of deals and cheap air tickets to any place you want by booking your tickets on our website or app. Being India's leading website for hotel, flight, and holiday bookings, MakeMyTrip helps you book flight tickets that are affordable and customized to your convenience."
    },
    {
      title: "Domestic Flights with MakeMyTrip",
      body: "MakeMyTrip is India's leading player for flight bookings. With the cheapest fare guarantee, experience great value at the lowest price. Instant notifications ensure current flight status, instant fare drops, amazing discounts, instant refunds and rebook options."
    }
  ]
};
