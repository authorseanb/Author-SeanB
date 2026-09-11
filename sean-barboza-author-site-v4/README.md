# Sean Barboza Author Website

A static author website built specifically for GitHub Pages. No database, WordPress, PHP, framework, or build process is required.

## The important change: you do NOT edit the Books HTML anymore

The catalog is now data-driven. Your book information lives in one file:

`assets/data/books.js`

The site reads that file and automatically builds:

- the featured book on the Home page
- the complete Books page
- each individual book detail page
- the Series page
- Coming Soon / Available Now labels
- release dates on coming-soon books
- retailer buttons after you add purchase links

That means adding a future novel does **not** require building another HTML page.

---

# Adding or changing a book

Open:

`assets/data/books.js`

Each book has one block containing its title, subtitle, cover, status, series, descriptions, release date, formats, and purchase links.

### While a book is unfinished

Use:

```js
status: "coming-soon",
statusLabel: "Coming Soon",
purchaseLinks: []
```

The site will show **Coming Soon** instead of a purchase button.

`We Who Remain: The Fall`, `The Long Road Home`, and `2168` are currently set as coming soon. `We Who Remain: The Fall` has a release date of October 24, 2026.

### When the book is released

Change:

```js
status: "published",
statusLabel: "Available Now",
```

Then add retailer links:

```js
purchaseLinks: [
  { label: "Amazon", url: "https://your-link-here" },
  { label: "Barnes & Noble", url: "https://your-link-here" },
  { label: "Kobo", url: "https://your-link-here" }
]
```

You can add one retailer or many.

You can also fill in:

```js
releaseDate: "October 15, 2027",
genre: "Post-Apocalyptic Fiction",
publisher: "",
isbn: "",
formats: ["Paperback", "eBook", "Hardcover"]
```

### Add an entirely new book

1. Upload the new cover to `assets/images/`.
2. Open `assets/data/books.js`.
3. Copy the **NEW BOOK TEMPLATE** at the bottom of the file.
4. Paste it into `window.BOOKS_DATA`.
5. Change the fields.
6. Commit the change.

The new book automatically appears on the site.

To make a new book the featured title on the Home page, set:

```js
featured: true
```

Set the previous featured book to `false`.

---

# Adding a new series

Series information is also inside:

`assets/data/books.js`

Add a block to `window.SERIES_DATA`:

```js
{
  id: "my-series",
  name: "My Series",
  description: "Description of the series."
}
```

Then give every book in that series:

```js
seriesId: "my-series",
seriesName: "My Series",
seriesOrder: 1
```

Change `seriesOrder` to 2, 3, and so on for later books.

---

# What I'm Reading Now

The new page is:

`reading.html`

Everything shown there is controlled by:

`assets/data/reading.js`

The file contains an example you can copy.

### Currently reading

Use:

```js
{
  id: "book-title",
  title: "Book Title",
  author: "Author Name",
  cover: "assets/images/reading/book-cover.jpg",
  status: "reading",
  startedOn: "September 2026",
  finishedOn: "",
  rating: null,
  review: [
    "What I'm thinking about it so far."
  ]
}
```

### After you finish it

Change:

```js
status: "finished",
finishedOn: "September 2026",
rating: 4,
```

Then replace the review text with your finished thoughts. The page automatically moves the book into **Past Reads & Reviews** and displays the star rating. Reviews and current thoughts appear in a collapsible section.

Ratings can be 1 through 5.

### To Be Read

Use `status: "tbr"`. Optional notes can go in `notes: [ ... ]`.

### Wish List

Use `status: "wishlist"`. Optional notes can go in `notes: [ ... ]`.

Put reading-book covers in:

`assets/images/reading/`

If you do not want to add a cover, leave:

```js
cover: ""
```

and the website will use a simple placeholder.

---

# Editing directly on GitHub.com

You do not have to download the website every time you want to update it.

For example, to change what you're reading:

1. Open your website repository on GitHub.
2. Open `assets/data/reading.js`.
3. Click the pencil **Edit** button.
4. Make your changes.
5. Click **Commit changes**.
6. GitHub Pages will republish the site automatically.

Do the same with `assets/data/books.js` whenever a book changes or you release a new one.

---

# General site settings

Open:

`assets/js/site-config.js`

Use it for:

- your contact email
- mailing-list provider endpoint
- future social links
- your optional P.O. Box / mailing address

Book purchase links no longer go in this file; they belong directly with each book in `assets/data/books.js`.

---

# Publishing with GitHub Pages

## Option A — username.github.io

Create a repository named exactly:

`YOUR-GITHUB-USERNAME.github.io`

Upload everything **inside this folder** to the repository root.

In GitHub open:

**Settings → Pages → Deploy from a branch → main → / (root)**

Your site will appear at:

`https://YOUR-GITHUB-USERNAME.github.io/`

## Option B — normal repository

You can also use a repository such as `author-website`.

Enable GitHub Pages from the `main` branch and `/ (root)`.

The site will appear at:

`https://YOUR-GITHUB-USERNAME.github.io/author-website/`

The website uses relative paths, so either setup works.

---

# Custom domain

After you own a domain such as `seanbarboza.com`, add it under:

**Settings → Pages → Custom domain**

GitHub will provide the DNS instructions for your registrar.

---

# Mailing list

GitHub Pages cannot store email addresses by itself. Connect MailerLite, Kit, Buttondown, Brevo, or another provider by putting its form endpoint in `newsletterAction` inside `assets/js/site-config.js`.

Until you add an endpoint, the Subscribe button displays a setup reminder instead of losing a reader's email.

---

# Main files

- `index.html` — Home
- `about.html` — About
- `books.html` — automatically generated catalog
- `book.html` — automatically generated individual book view
- `series.html` — automatically generated series listing
- `reading.html` — What I'm Reading Now + reviews
- `contact.html` — Contact
- `assets/data/books.js` — **edit books here**
- `assets/data/reading.js` — **edit reading/reviews here**
- `assets/js/site-config.js` — contact/mailing-list settings
- `assets/css/style.css` — visual styling
