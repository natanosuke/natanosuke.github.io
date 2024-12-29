document.addEventListener("DOMContentLoaded", () => {
    const articlesContainer = document.getElementById("articles-container");
    const newerPostButton = document.getElementById("newer-post");
    const olderPostButton = document.getElementById("older-post");
    const pageNumbersContainer = document.getElementById("page-numbers");

    const articlesPerPage = 6; // 1ページに表示する記事数
    const totalPages = Math.ceil(articles.length / articlesPerPage); // 総ページ数
    let currentPage = 0; // 現在のページ（0始まり）

    // 現在のページに基づいて記事を表示
    function displayArticles(page) {
        const startIndex = page * articlesPerPage; // 表示を開始する記事のインデックス
        const endIndex = startIndex + articlesPerPage; // 表示を終了する記事のインデックス
        const currentArticles = articles.slice(startIndex, endIndex); // 現在のページに表示する記事リスト

        articlesContainer.innerHTML = currentArticles
            .map(article => `
                <article class="post-preview">
                    <a href="${article.link}">
                        <h2 class="post-title">${article.title}</h2>
                        <h3 class="post-subtitle">${article.subtitle}</h3>
                    </a>
                    <p class="post-meta">Posted on ${article.date}</p>
                </article>
                <hr>
            `)
            .join("");
    }

    // ページ番号を生成
    function renderPageNumbers() {
        let html = "";
        for (let i = 0; i < totalPages; i++) {
            if (i === 0 || i === totalPages - 1 || Math.abs(i - currentPage) <= 2) {
                html += `<a href="#" class="${i === currentPage ? "active" : ""}" data-index="${i}">${i + 1}</a>`;
            } else if (
                (i === currentPage - 3 && currentPage > 3) || 
                (i === currentPage + 3 && currentPage < totalPages - 4)
            ) {
                html += `<span>...</span>`;
            }
        }
        pageNumbersContainer.innerHTML = html;

        // 各ページ番号にイベントリスナーを追加
        pageNumbersContainer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const newPage = parseInt(link.getAttribute("data-index"), 10);
                if (newPage !== currentPage) {
                    currentPage = newPage;
                    updatePager();
                }
            });
        });
    }

    // ページャーボタンを更新
    function updatePagerLinks() {
        newerPostButton.style.visibility = currentPage > 0 ? "visible" : "hidden";
        olderPostButton.style.visibility = currentPage < totalPages - 1 ? "visible" : "hidden";
    }

    // ページ全体の更新
    function updatePager() {
        displayArticles(currentPage);
        renderPageNumbers();
        updatePagerLinks();
    }

    // イベントリスナー
    newerPostButton.addEventListener("click", (e) => {
        if (currentPage > 0) {
            currentPage--;
            updatePager();
        }
        e.preventDefault();
    });

    olderPostButton.addEventListener("click", (e) => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updatePager();
        }
        e.preventDefault();
    });

    // 初期表示
    updatePager();
});
