/*
  ============================================================
  BOOKS — THIS IS THE MAIN FILE TO EDIT WHEN YOUR CATALOG CHANGES
  ============================================================

  HOW TO ADD A BOOK:
  1. Put the cover image in assets/images/
  2. Copy one complete book object below.
  3. Give it a unique id using lowercase words and hyphens.
  4. Change the fields.
  5. Save this file. The Home, Books, Series, and individual book pages update automatically.

  STATUS OPTIONS:
    "published"    -> shows Available Now and retailer buttons
    "coming-soon"  -> shows Coming Soon and no Buy Now button

  RELEASE DATE:
  Enter dates as readable text, for example: "October 24, 2026".
  Coming-soon books automatically show "Releases October 24, 2026".

  PURCHASE LINKS:
  Add as many stores as you want after publication, for example:
    purchaseLinks: [
      { label: "Amazon", url: "https://..." },
      { label: "Barnes & Noble", url: "https://..." },
      { label: "Kobo", url: "https://..." }
    ]

  If a book is not part of a series, use:
    seriesId: "",
    seriesName: "",
    seriesOrder: null
*/

window.BOOKS_DATA = [
  {
    id: "we-who-remain",
    title: "We Who Remain",
    subtitle: "The Fall",
    cover: "assets/images/we-who-remain.jpg",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    featured: true,

    seriesId: "remain-series",
    seriesName: "The Remain Series",
    seriesOrder: 1,

    tagline: "When nearly everything is gone, what is still worth saving?",
    shortDescription: "A weaponized influenza tears through the country, leaving scattered survivors to decide what is worth saving when nearly everything else is gone.",
    description: [
      "When a classified military bioweapon escapes from a New Mexico research facility, the government loses control before it even realizes containment has failed. Within weeks, a weaponized influenza kills more than ninety-nine percent of humanity, collapsing civilization in a matter of days.",
      "Across the country, strangers fight to survive as the world they knew disappears around them."
    ],

    releaseDate: "October 24, 2026",
    genre: "",
    publisher: "",
    isbn: "",
    formats: [],
    purchaseLinks: []
  },

  {
    id: "the-long-road-home",
    title: "The Long Road Home",
    subtitle: "",
    cover: "assets/images/the-long-road-home.jpg",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    featured: false,

    seriesId: "",
    seriesName: "",
    seriesOrder: null,

    tagline: "",
    shortDescription: "A dark survival story about the distance between safety and home when the dead refuse to stay behind.",
    description: [
      "A dark survival story about the distance between safety and home when the dead refuse to stay behind."
    ],

    releaseDate: "",
    genre: "",
    publisher: "",
    isbn: "",
    formats: [],
    purchaseLinks: []
  },

  {
    id: "2168",
    title: "2168",
    subtitle: "The Frontier Never Ends.",
    cover: "assets/images/2168.jpg",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    featured: false,

    seriesId: "",
    seriesName: "",
    seriesOrder: null,

    tagline: "The Frontier Never Ends.",
    shortDescription: "In a shattered future America, a bounty hunter rides through the Colorado frontier where old laws, new powers, and survival collide.",
    description: [
      "In a shattered future America, a bounty hunter rides through the Colorado frontier where old laws, new powers, and survival collide."
    ],

    releaseDate: "",
    genre: "",
    publisher: "",
    isbn: "",
    formats: [],
    purchaseLinks: []
  }
];

window.SERIES_DATA = [
  {
    id: "remain-series",
    name: "The Remain Series",
    description: "A pandemic survival series following the people left behind after civilization collapses with terrifying speed."
  }
];

/*
  NEW BOOK TEMPLATE — copy this block into BOOKS_DATA above:

  {
    id: "new-book-title",
    title: "New Book Title",
    subtitle: "",
    cover: "assets/images/new-book-cover.jpg",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    featured: false,

    seriesId: "",
    seriesName: "",
    seriesOrder: null,

    tagline: "",
    shortDescription: "Short description for book cards.",
    description: [
      "Longer description paragraph one.",
      "Longer description paragraph two."
    ],

    releaseDate: "",
    genre: "",
    publisher: "",
    isbn: "",
    formats: [],
    purchaseLinks: []
  }
*/
