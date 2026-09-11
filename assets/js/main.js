(() => {
  const config = window.SITE_CONFIG || {};
  const books = Array.isArray(window.BOOKS_DATA) ? window.BOOKS_DATA : [];
  const series = Array.isArray(window.SERIES_DATA) ? window.SERIES_DATA : [];
  const reading = Array.isArray(window.READING_DATA) ? window.READING_DATA : [];

  const esc = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const bookUrl = book => `book.html?id=${encodeURIComponent(book.id)}`;
  const isPublished = book => book.status === 'published';
  const statusLabel = book => book.statusLabel || (isPublished(book) ? 'Available Now' : 'Coming Soon');

  function statusBadge(book) {
    const dateText = !isPublished(book) && book.releaseDate ? ` · ${book.releaseDate}` : '';
    return `<span class="status-badge ${isPublished(book) ? 'published' : 'coming-soon'}">${esc(statusLabel(book) + dateText)}</span>`;
  }

  function subtitle(book) {
    return book.subtitle ? `<div class="book-subtitle">${esc(book.subtitle)}</div>` : '';
  }

  function seriesLine(book) {
    if (!book.seriesName) return '';
    const suffix = book.seriesOrder ? ` — Book ${book.seriesOrder}` : '';
    return `<div class="book-series">${esc(book.seriesName)}${esc(suffix)}</div>`;
  }

  function purchaseButtons(book) {
    const links = Array.isArray(book.purchaseLinks) ? book.purchaseLinks.filter(x => x && x.url) : [];
    if (!isPublished(book)) return `<span class="btn disabled" aria-disabled="true">Coming Soon</span>`;
    if (!links.length) return `<span class="availability-note">Purchase links will be added here.</span>`;
    return links.map(link => `<a class="btn" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.label || 'Buy Now')}</a>`).join('');
  }

  function ratingMarkup(value) {
    const rating = Number(value);
    if (!Number.isFinite(rating) || rating < 1) return `<span class="rating pending">Not rated yet</span>`;
    const rounded = Math.max(1, Math.min(5, Math.round(rating)));
    return `<span class="rating" aria-label="${rounded} out of 5 stars"><span aria-hidden="true">${'★'.repeat(rounded)}${'☆'.repeat(5 - rounded)}</span><small>${rounded}/5</small></span>`;
  }

  // Mobile navigation
  document.querySelectorAll('[data-nav-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.querySelector('[data-nav]');
      if (!nav) return;
      nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  });

  // Home page: featured book
  const featuredTarget = document.querySelector('[data-featured-book]');
  if (featuredTarget) {
    const book = books.find(item => item.featured) || books[0];
    if (!book) {
      featuredTarget.innerHTML = '<p>No featured book has been added yet.</p>';
    } else {
      featuredTarget.innerHTML = `
        <div class="book-art"><img src="${esc(book.cover)}" alt="${esc(book.title)}${book.subtitle ? `: ${esc(book.subtitle)}` : ''} book cover"></div>
        <div class="book-copy">
          ${statusBadge(book)}
          <h2 class="heading-font">${esc(book.title)}</h2>
          ${subtitle(book)}
          ${seriesLine(book)}
          ${(book.description || [book.shortDescription]).filter(Boolean).map(p => `<p>${esc(p)}</p>`).join('')}
          <div class="actions">${purchaseButtons(book)}<a class="btn secondary" href="${bookUrl(book)}">Learn More</a></div>
        </div>`;
    }
  }

  // Home page: series summary
  const homeSeriesTarget = document.querySelector('[data-home-series]');
  if (homeSeriesTarget) {
    if (!series.length) {
      homeSeriesTarget.innerHTML = '<p>No series have been added yet.</p>';
    } else {
      homeSeriesTarget.innerHTML = series.map(s => {
        const seriesBooks = books.filter(b => b.seriesId === s.id).sort((a, b) => (a.seriesOrder || 999) - (b.seriesOrder || 999));
        const cover = seriesBooks[0]?.cover || '';
        return `<article class="series-grid">
          <div class="series-thumb">${cover ? `<img src="${esc(cover)}" alt="${esc(s.name)} book cover">` : ''}</div>
          <div class="series-copy"><h2 class="heading-font">${esc(s.name)}</h2><p>${esc(s.description || '')}</p><p>${seriesBooks.map(b => `<a href="${bookUrl(b)}">${esc(b.title)}</a>`).join(' · ')}</p><p><a href="series.html#${esc(s.id)}">View Series</a></p></div>
        </article>`;
      }).join('');
    }
  }

  // Books page: all catalog entries
  const booksTarget = document.querySelector('[data-books-grid]');
  if (booksTarget) {
    booksTarget.innerHTML = books.map(book => `
      <article class="card" id="${esc(book.id)}">
        <a class="cover-link" href="${bookUrl(book)}"><img src="${esc(book.cover)}" alt="${esc(book.title)} book cover"></a>
        ${statusBadge(book)}
        <h2 class="heading-font"><a class="title-link" href="${bookUrl(book)}">${esc(book.title)}</a></h2>
        ${book.subtitle ? `<p class="card-subtitle"><em>${esc(book.subtitle)}</em></p>` : ''}
        ${book.seriesName ? `<p class="card-series">${esc(book.seriesName)}${book.seriesOrder ? ` — Book ${book.seriesOrder}` : ''}</p>` : ''}
        <p>${esc(book.shortDescription || '')}</p>
        <div class="actions"><a class="btn secondary" href="${bookUrl(book)}">Learn More</a>${purchaseButtons(book)}</div>
      </article>`).join('');
  }

  // Individual book page
  const detailTarget = document.querySelector('[data-book-detail]');
  if (detailTarget) {
    const id = new URLSearchParams(window.location.search).get('id');
    const book = books.find(item => item.id === id);
    if (!book) {
      document.title = 'Book Not Found | Sean Barboza';
      detailTarget.innerHTML = `<div class="not-found"><h1 class="heading-font">Book Not Found</h1><p>That book could not be found.</p><a class="btn" href="books.html">View All Books</a></div>`;
    } else {
      document.title = `${book.title} | Sean Barboza`;
      const meta = [
        book.releaseDate ? `Release: ${book.releaseDate}` : '',
        book.genre ? `Genre: ${book.genre}` : '',
        book.publisher ? `Publisher: ${book.publisher}` : '',
        book.isbn ? `ISBN: ${book.isbn}` : '',
        Array.isArray(book.formats) && book.formats.length ? `Formats: ${book.formats.join(', ')}` : ''
      ].filter(Boolean);
      detailTarget.innerHTML = `
        <article class="book-detail">
          <div class="book-detail-cover"><img src="${esc(book.cover)}" alt="${esc(book.title)} book cover"></div>
          <div class="book-detail-copy">
            ${statusBadge(book)}
            <h1 class="page-title heading-font">${esc(book.title)}</h1>
            ${subtitle(book)}
            ${seriesLine(book)}
            ${book.tagline ? `<p class="book-tagline">${esc(book.tagline)}</p>` : ''}
            ${meta.length ? `<div class="book-meta">${meta.map(item => `<span>${esc(item)}</span>`).join('')}</div>` : ''}
            <div class="book-description">${(book.description || []).map(p => `<p>${esc(p)}</p>`).join('')}</div>
            <div class="actions">${purchaseButtons(book)}<a class="btn secondary" href="books.html">All Books</a></div>
          </div>
        </article>`;
    }
  }

  // Series page: all series and their books
  const seriesTarget = document.querySelector('[data-series-list]');
  if (seriesTarget) {
    if (!series.length) {
      seriesTarget.innerHTML = '<p>No series have been added yet.</p>';
    } else {
      seriesTarget.innerHTML = series.map(s => {
        const seriesBooks = books.filter(b => b.seriesId === s.id).sort((a, b) => (a.seriesOrder || 999) - (b.seriesOrder || 999));
        const cover = seriesBooks[0]?.cover || '';
        return `<section class="series-page-row" id="${esc(s.id)}">
          <div>${cover ? `<img src="${esc(cover)}" alt="${esc(s.name)} cover">` : ''}</div>
          <div>
            <h2 class="heading-font">${esc(s.name)}</h2>
            <p>${esc(s.description || '')}</p>
            <div class="series-books">
              ${seriesBooks.map(book => `<div class="series-book-line"><span class="series-number">${book.seriesOrder ? `Book ${book.seriesOrder}` : 'Book'}</span><a href="${bookUrl(book)}">${esc(book.title)}${book.subtitle ? `: ${esc(book.subtitle)}` : ''}</a>${statusBadge(book)}</div>`).join('')}
            </div>
          </div>
        </section>`;
      }).join('');
    }
  }

  // What I'm Reading page
  const readingSections = [
    {
      selector: '[data-current-reading]',
      status: 'reading',
      mode: 'reading',
      empty: `<div class="empty-state"><h2 class="heading-font">Nothing Posted Yet</h2><p>Sean hasn't posted a current read yet. Check back soon.</p></div>`
    },
    {
      selector: '[data-to-be-read]',
      status: 'tbr',
      mode: 'tbr',
      empty: `<p class="muted-copy">Books I plan to read will appear here.</p>`
    },
    {
      selector: '[data-wish-list]',
      status: 'wishlist',
      mode: 'wishlist',
      empty: `<p class="muted-copy">Books on my wish list will appear here.</p>`
    },
    {
      selector: '[data-finished-reading]',
      status: 'finished',
      mode: 'finished',
      empty: `<p class="muted-copy">Finished books and reviews will appear here.</p>`
    }
  ];

  readingSections.forEach(section => {
    const target = document.querySelector(section.selector);
    if (!target) return;
    const items = reading.filter(item => item.status === section.status);
    target.innerHTML = items.length ? items.map(item => readingCard(item, section.mode)).join('') : section.empty;
  });

  function readingCard(item, mode) {
    const cover = item.cover
      ? `<img src="${esc(item.cover)}" alt="${esc(item.title)} book cover">`
      : `<div class="reading-cover-placeholder"><span>Book Cover</span></div>`;

    const labels = {
      reading: 'Reading Now',
      finished: 'Finished',
      tbr: 'To Be Read',
      wishlist: 'Wish List'
    };

    const dateBits = [];
    if (mode === 'reading' && item.startedOn) dateBits.push(`Started ${item.startedOn}`);
    if (mode === 'finished') {
      if (item.startedOn) dateBits.push(`Started ${item.startedOn}`);
      if (item.finishedOn) dateBits.push(`Finished ${item.finishedOn}`);
    }
    if ((mode === 'tbr' || mode === 'wishlist') && item.addedOn) dateBits.push(`Added ${item.addedOn}`);

    const thoughts = (mode === 'tbr' || mode === 'wishlist')
      ? (Array.isArray(item.notes) ? item.notes.filter(Boolean) : [])
      : (Array.isArray(item.review) ? item.review.filter(Boolean) : []);

    const detailsLabel = mode === 'finished'
      ? 'Read My Review'
      : mode === 'reading'
        ? 'Current Thoughts'
        : 'Notes';

    const details = thoughts.length
      ? `<details class="reading-review-details"><summary>${esc(detailsLabel)}</summary><div class="reading-review">${thoughts.map(p => `<p>${esc(p)}</p>`).join('')}</div></details>`
      : '';

    const accentClass = mode === 'reading' ? 'current-read' : mode === 'tbr' ? 'tbr-read' : mode === 'wishlist' ? 'wishlist-read' : '';

    return `<article class="reading-card ${accentClass}">
      <div class="reading-cover">${cover}</div>
      <div class="reading-copy">
        <div class="reading-status">${esc(labels[mode] || '')}</div>
        <h2 class="heading-font">${esc(item.title)}</h2>
        ${item.author ? `<p class="reading-author">by ${esc(item.author)}</p>` : ''}
        ${dateBits.length ? `<p class="reading-dates">${esc(dateBits.join(' · '))}</p>` : ''}
        ${mode === 'finished' ? ratingMarkup(item.rating) : ''}
        ${details}
      </div>
    </article>`;
  }

  // Contact email
  document.querySelectorAll('[data-contact-email]').forEach(link => {
    const email = config.contactEmail || 'your-email@example.com';
    link.textContent = email;
    link.href = `mailto:${email}`;
  });

  // Optional P.O. Box / mailing address
  const mailingAddressTarget = document.querySelector('[data-mailing-address]');
  if (mailingAddressTarget) {
    const lines = Array.isArray(config.mailingAddress) ? config.mailingAddress.filter(Boolean) : [];
    if (lines.length) {
      mailingAddressTarget.hidden = false;
      mailingAddressTarget.innerHTML = `<h2 class="heading-font">By Mail</h2><p class="mailing-address-intro">Reader mail can also be sent to:</p><address>${lines.map(line => `<span>${esc(line)}</span>`).join('')}</address>`;
    }
  }

  // Newsletter
  const signup = document.querySelector('[data-newsletter-form]');
  if (signup) {
    const endpoint = config.newsletterAction || '';
    if (endpoint) {
      signup.action = endpoint;
      signup.method = 'post';
    } else {
      signup.addEventListener('submit', event => {
        event.preventDefault();
        const status = signup.querySelector('[data-form-status]');
        if (status) status.textContent = 'Connect your mailing-list provider in assets/js/site-config.js to activate subscriptions.';
      });
    }
  }

  // Contact form
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const email = config.contactEmail || '';
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const sender = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
      if (!email || email === 'your-email@example.com') {
        alert('Add your email address in assets/js/site-config.js first.');
        return;
      }
      const subject = encodeURIComponent(`Website message from ${name || sender || 'reader'}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${sender}\n\n${message}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }

  const year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = year; });
})();
