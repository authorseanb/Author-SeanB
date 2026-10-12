# Quick Content Editing Cheat Sheet

## Book changes
Edit `assets/data/books.js`.

- Not released yet: `status: "coming-soon"`
- Released: `status: "published"`
- Release date: `releaseDate: "October 24, 2026"`
- Home-page featured book: `featured: true`
- Add retailers inside `purchaseLinks`
- Add a new book by copying the template at the bottom of the file

For a coming-soon book with a release date, the site automatically shows the status and date together, for example:

`COMING SOON · OCTOBER 24, 2026`

`We Who Remain: The Fall` is currently set to release October 24, 2026.

## What I'm Reading
Edit `assets/data/reading.js`.

Status options:

- Current book: `status: "reading"`
- Finished book/review: `status: "finished"`
- To Be Read: `status: "tbr"`
- Wish List: `status: "wishlist"`

For finished books, use `rating: 1` through `rating: 5`.

Your review paragraphs go inside `review: [ ... ]`. Reviews and current-reading thoughts are automatically collapsible on the website.

For To Be Read and Wish List entries, optional notes go inside `notes: [ ... ]`.

Put reading cover images in `assets/images/reading/`. Use forward slashes in paths and make sure the file extension matches the real file (`.jpg`, `.png`, `.webp`, etc.).

## P.O. Box / reader mail
Edit `assets/js/site-config.js` and fill in `mailingAddress`:

```js
mailingAddress: [
  'Sean Barboza',
  'P.O. Box 123',
  'Your City, TX 12345'
],
```

If `mailingAddress` is left empty (`[]`), the mailing-address block stays hidden automatically.

## Editing on GitHub
You can edit these files directly on GitHub.com using the pencil/Edit button and Commit Changes. GitHub Pages republishes automatically.


## Preorders and Forms

- `We Who Remain` preorder links live in `assets/data/books.js`. Use `status: "preorder"` while preorder buttons should be visible before release.
- The homepage mailing-list form, contact form, and beta-reader form use FormSubmit to deliver submissions to `authorseanb@gmail.com`. After deploying, submit each form once and confirm any activation email from FormSubmit.
- The beta reader page is `beta-readers.html`.
- Form confirmation pages are `newsletter-thanks.html`, `beta-thanks.html`, and `contact-thanks.html`.
