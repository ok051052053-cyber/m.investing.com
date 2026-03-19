function renderTicker() {
  const ticker = document.getElementById('ticker');
  if (!ticker) return;
  ticker.innerHTML = window.MM_BREAKING.map(item => `<span>${item}</span>`).join('');
}

const id = new URLSearchParams(window.location.search).get('id');
const post = window.MM_POSTS.find(item => item.id === id) || window.MM_POSTS[0];

document.title = `${post.title} | MM Investing`;
document.getElementById('breadcrumb').innerHTML = `<a href="index.html">Blog</a> <span>/</span> <a href="category.html?slug=${encodeURIComponent(post.category.toLowerCase().replaceAll(' ', '-'))}">${post.category}</a>`;
document.getElementById('articleTitle').textContent = post.title;
document.getElementById('articleMeta').innerHTML = `By <strong>${post.author}</strong> <span>•</span> ${post.category} <span>•</span> ${post.date}`;
document.getElementById('articleImage').src = post.image;
document.getElementById('articleImage').alt = post.title;
document.getElementById('articleBody').innerHTML = post.body.map(p => `<p>${p}</p>`).join('');

document.getElementById('relatedPosts').innerHTML = window.MM_POSTS.filter(item => item.id !== post.id).slice(0, 4).map(item => `
  <a class="mini-item" href="post.html?id=${item.id}">
    <img src="${item.image}" alt="${item.title}">
    <div>
      <strong>${item.title}</strong>
      <span>${item.date}</span>
    </div>
  </a>
`).join('');

renderTicker();
