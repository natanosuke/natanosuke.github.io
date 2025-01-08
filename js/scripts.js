/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

document.addEventListener("DOMContentLoaded", function () {
    const archiveList = document.getElementById("archive-list");

    // `articles` 配列から月別アーカイブを生成
    const groupedArchives = groupArticlesByYearAndMonth(articles);

    const years = Object.keys(groupedArchives).sort((a, b) => b - a); // 新しい年が上に来るように並び替え

    years.forEach((year, index) => {
        const yearItem = document.createElement("li");
        const yearLink = document.createElement("a");
        yearLink.textContent = `${year}年`;
        yearLink.href = "#";
        yearLink.classList.add("year-link");

        const monthList = document.createElement("ul");
        monthList.classList.add("list-unstyled");

        // 最新の年は初期状態で展開、それ以外は非表示
        if (index !== 0) {
            monthList.classList.add("d-none");
        }

        // 月ごとにリストを追加
        Object.keys(groupedArchives[year])
            .sort((a, b) => b - a) // 新しい月が上に来るように並び替え
            .forEach(month => {
                const monthItem = document.createElement("li");
                const monthLink = document.createElement("a");

                // 月と記事数を表示
                const articleCount = groupedArchives[year][month].length;
                monthLink.textContent = `${month}月 (${articleCount})`;
                monthLink.href = "#";
                monthLink.addEventListener("click", () => {
                    displayArticlesForMonth(`${year}年${month}月`, groupedArchives[year][month]);
                });

                monthItem.appendChild(monthLink);
                monthList.appendChild(monthItem);
            });

        yearLink.addEventListener("click", function (e) {
            e.preventDefault();
            monthList.classList.toggle("d-none"); // 展開・折りたたみ
        });

        yearItem.appendChild(yearLink);
        yearItem.appendChild(monthList);
        archiveList.appendChild(yearItem);
    });
});

// 年と月で記事をグループ化
function groupArticlesByYearAndMonth(articles) {
    const grouped = {};

    articles.forEach(article => {
        const date = new Date(article.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        if (!grouped[year]) {
            grouped[year] = {};
        }

        if (!grouped[year][month]) {
            grouped[year][month] = [];
        }

        grouped[year][month].push(article);
    });

    return grouped;
}

// 指定した月の記事を表示（新しい順にソート）
function displayArticlesForMonth(month, articles) {
    const container = document.getElementById("articles-container");
    container.innerHTML = ""; // 既存の記事リストをクリア

    const header = document.createElement("h3");
    header.textContent = `${month}の記事一覧`;
    container.appendChild(header);

    const list = document.createElement("ul");

    // 記事を日付の新しい順にソート
    const sortedArticles = articles.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // ソートされた記事をリストに追加
    sortedArticles.forEach(article => {
        const listItem = document.createElement("li");

        // 日付部分を作成
        const date = new Date(article.date);
        const formattedDate = `[${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}]`;
        const dateSpan = document.createElement("span");
        dateSpan.textContent = `${formattedDate} `;
        dateSpan.style.fontWeight = "bold";

        // 記事タイトル部分を作成
        const link = document.createElement("a");
        link.href = article.link;
        link.textContent = article.title;

        // 日付とタイトルをリスト項目に追加
        listItem.appendChild(dateSpan);
        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    container.appendChild(list);
}