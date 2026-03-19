const slug = new URLSearchParams(window.location.search).get('slug') || 'blog';
const normalized = slug.toLowerCase();
const niceTitle = normalized.split('-').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ');
document.getElementById('categoryTitle').textContent = niceTitle;

const mappedCategory = {
  'blog': null,
  "what's-new": "What's New",
  'company-news': 'Company News',
  'inside-investing': 'Inside Investing'
}[normalized];

const list = mappedCategory ? window.MM_POSTS.filter(post => post.category === mappedCategory) : window.MM_POSTS;
document.getElementById('categoryList').innerHTML = list.map(post => `
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
`).join('');
