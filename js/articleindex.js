document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#articles-container");

    // 最新3つの記事を取得
    const latestArticles = articles.reverse().slice(-6).reverse(); // 最新3つを取得し、正しい順序に並べる

    // 記事をHTMLに変換
    const articlesHTML = latestArticles.map(article => `
        <article class="post-preview">
            <a href="${article.link}">
                <h2 class="post-title">${article.title}</h2>
                <h3 class="post-subtitle">${article.subtitle}</h3>
            </a>
            <p class="post-meta">
                Posted on ${article.date}
            </p>
        </article>
        <hr>
    `).join("");

    // HTMLに挿入
    container.innerHTML = articlesHTML;
});
