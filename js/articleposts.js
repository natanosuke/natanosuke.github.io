document.addEventListener("DOMContentLoaded", () => {
    const previousButton = document.getElementById("previous-post");
    const nextButton = document.getElementById("next-post");

    // 現在の記事のリンクを取得
    const currentArticleLink = window.location.pathname.split("/").pop(); // 現在のURLのファイル名
    const currentIndex = articles.findIndex(article => article.link.endsWith(currentArticleLink)); // 現在の記事のインデックス

    // 記事が見つからない場合はボタンを非表示
    if (currentIndex === -1) {
        previousButton.style.visibility = "hidden";
        nextButton.style.visibility = "hidden";
        console.error("現在の記事がリストに見つかりませんでした。");
        return;
    }

    // ボタンのリンクを設定
    function updateButtons() {
        // 前の記事
        if (currentIndex > 0) {
            previousButton.href = articles[currentIndex - 1].link;
            previousButton.style.visibility = "visible";
        } else {
            previousButton.style.visibility = "hidden"; // 最初の記事の場合は非表示
        }

        // 次の記事
        if (currentIndex < articles.length - 1) {
            nextButton.href = articles[currentIndex + 1].link;
            nextButton.style.visibility = "visible";
        } else {
            nextButton.style.visibility = "hidden"; // 最後の記事の場合は非表示
        }
    }

    // ボタンを初期化
    updateButtons();
});

