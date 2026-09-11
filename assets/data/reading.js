/*
  ============================================================
  WHAT I'M READING — EDIT THIS FILE TO MANAGE YOUR READING PAGE
  ============================================================

  STATUS OPTIONS:
    "reading"   -> Currently Reading
    "finished"  -> Past Reads & Reviews
    "tbr"       -> To Be Read
    "wishlist"  -> Wish List

  RATING:
    Use 1 through 5 for finished books. Otherwise use null.

  COVER:
    Put cover images in assets/images/reading/ and use forward slashes.
    Example: "assets/images/reading/between-two-fires.webp"

  REVIEW / NOTES:
    For reading or finished books, put your thoughts in review: [ ... ].
    These paragraphs are shown inside a collapsible section.

    For To Be Read or Wish List books, use notes: [ ... ] if you want to
    remember why you added the book. Notes are optional.
*/

window.READING_DATA = [
  {
    id: "between-two-fires",
    title: "Between Two Fires",
    author: "Christopher Buehlman",
    cover: "assets/images/reading/Between Two Fires.webp",
    status: "reading",
    startedOn: "September 5, 2026",
    finishedOn: "",
    addedOn: "",
    rating: null,
    review: [
          "I’m at the halfway point of Between Two Fires by Christopher Buehlman, and so far I’m really enjoying it. The medieval setting is bleak, filthy, and dangerous, but what has impressed me most is the atmosphere. There’s a constant feeling that something is wrong with the world, even during the quieter moments.",
    
    "The relationship between Thomas, Delphine, and Matthieu has also become the strongest part of the book for me. They’re starting to feel less like three people traveling together and more like an actual group, which makes the darker moments hit harder.",
    
    "The horror has been strange in the best way. It doesn’t feel like a traditional monster story as much as a journey through a world where Hell is slowly bleeding into reality. Some scenes have been genuinely unsettling, while others have felt almost dreamlike.",
    
    "At the halfway point, I’m definitely invested. I’m curious to see how much further the story leans into the religious and supernatural elements, and where it ultimately takes these characters."
    ],
    notes: []
  },
{
    id: "drawing-of-three",
    title: "The Dark Tower II: The Drawing of the Three",
    author: "Stephen King",
    cover: "assets/images/reading/drawingofthree.jpeg",
    status: "tbr",
    startedOn: "",
    finishedOn: "",
    addedOn: "",
    rating: null,
    review: [],
    notes: [
      "The next insallment of the Dark Tower Series."
    ]
  },
  {
    id: "the-road",
    title: "The Road",
    author: "Cormac McCarthy",
    cover: "assets/images/reading/TheRoad.jpg",
    status: "finished",
    startedOn: "October 12, 2026",
    finishedOn: "October 26, 2026",
    addedOn: "",
    rating: 4,
    review: [
      "The Road is a bleak but powerful post-apocalyptic story about a father and son traveling through a burned, dying America. McCarthy gives very little explanation for what destroyed the world, which keeps the focus on survival and the relationship between the two characters.",
	
	"The writing style takes some getting used to, especially the lack of quotation marks and sparse dialogue, but it fits the empty world perfectly. The story can feel repetitive at times, but the tension, atmosphere, and emotional weight make it memorable.",

	  "At its heart, The Road is less about the end of the world and more about what it means to remain human when almost everything else is gone.",
    ],
    notes: []
  },
    {
    id: "ghost-story",
    title: "Ghosr Story",
    author: "Peter Straub",
    cover: "assets/images/reading/ghost story.jpg",
    status: "wishlist",
    startedOn: "",
    finishedOn: "",
    addedOn: "",
    rating: null,
    review: [],
    notes: [
      ""
    ]
  }
  /*
  COPY ONE OF THESE EXAMPLES TO ADD MORE BOOKS.

  {
    id: "finished-book-title",
    title: "Finished Book Title",
    author: "Author Name",
    cover: "assets/images/reading/finished-book-title.jpg",
    status: "finished",
    startedOn: "September 2026",
    finishedOn: "October 2026",
    addedOn: "",
    rating: 4,
    review: [
      "My review paragraph goes here."
    ],
    notes: []
  },

  {
    id: "to-be-read-title",
    title: "To Be Read Title",
    author: "Author Name",
    cover: "assets/images/reading/to-be-read-title.jpg",
    status: "tbr",
    startedOn: "",
    finishedOn: "",
    addedOn: "September 2026",
    rating: null,
    review: [],
    notes: [
      "Optional note about why I want to read this."
    ]
  },

  {
    id: "wish-list-title",
    title: "Wish List Title",
    author: "Author Name",
    cover: "assets/images/reading/wish-list-title.jpg",
    status: "wishlist",
    startedOn: "",
    finishedOn: "",
    addedOn: "September 2026",
    rating: null,
    review: [],
    notes: [
      "Optional note about why this is on my wish list."
    ]
  }
  */
];
