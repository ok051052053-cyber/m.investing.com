const params = new URLSearchParams(window.location.search);
let activeCategory = params.get('category') || 'All';
let currentPage = Number(params.get('page') || 1);
const pageSize = 4;

function renderTicker() {
  const ticker = document.getElementById('ticker');
  if (!ticker) return;
  ticker.innerHTML = window.MM_BREAKING.map(item => `<span>${item}</span>`).join('');
}

function makePostCard(post) {
  return `
    <article class="post-card">
      <a class="post-thumb" href="post.html?id=${post.id}">
        <img src="${post.image}" alt="${post.title}">
      </a>
      <div class="post-content">
        <div class="post-meta-top"><span class="chip">${post.category}</span></div>
        <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
        <div class="post-meta">By <strong>${post.author}</strong> <span>•</span> ${post.date}</div>
        <p>${post.excerpt}</p>
      </div>
    </article>
  `;
}

function renderTabs() {
  const root = document.getElementById('filterTabs');
  if (!root) return;
  root.innerHTML = window.MM_CATEGORIES.map(cat => `
    <button class="tab ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">${cat}</button>
  `).join('');
  root.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      currentPage = 1;
      renderPosts();
      renderTabs();
    });
  });
}

function renderPosts() {
  const list = document.getElementById('postList');
  const pager = document.getElementById('pagination');
  if (!list || !pager) return;

  const filtered = activeCategory === 'All'
    ? window.MM_POSTS
    : window.MM_POSTS.filter(post => post.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);
  list.innerHTML = visible.map(makePostCard).join('');

  pager.innerHTML = Array.from({ length: totalPages }, (_, i) => `
    <button class="page-btn ${currentPage === i + 1 ? 'active' : ''}" data-page="${i + 1}">${i + 1}</button>
  `).join('') + (totalPages > 1 ? `<button class="page-btn next-btn" data-page="${Math.min(totalPages, currentPage + 1)}">Next</button>` : '');

  pager.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = Number(btn.dataset.page);
      renderPosts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function renderMiniLists() {
  const latest = document.getElementById('latestMini');
  const popular = document.getElementById('popularMini');
  if (latest) {
    latest.innerHTML = window.MM_POSTS.slice(0, 4).map(post => `
      <a class="mini-item" href="post.html?id=${post.id}">
        <img src="${post.image}" alt="${post.title}">
        <div>
          <strong>${post.title}</strong>
          <span>${post.date}</span>
        </div>
      </a>
    `).join('');
  }
  if (popular) {
    popular.innerHTML = window.MM_POSTS.filter(post => post.popular).slice(0, 4).map(post => `
      <a class="mini-item" href="post.html?id=${post.id}">
        <img src="${post.image}" alt="${post.title}">
        <div>
          <strong>${post.title}</strong>
          <span>${post.category}</span>
        </div>
      </a>
    `).join('');
  }
}

renderTicker();
renderTabs();
renderPosts();
renderMiniLists();
