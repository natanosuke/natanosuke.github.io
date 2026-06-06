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
                monthLink.textContent = `>${month}月 (${articleCount})`;
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
// サイドバー
const archiveData = [
    { year: 2011, profitLoss: "-11,787円" },
    { year: 2012, profitLoss: "+101,347円" },
    { year: 2013, profitLoss: "+532,806円" },
    { year: 2014, profitLoss: "+86,757円"},
    { year: 2015, profitLoss: "+64,067円" },
    { year: 2016, profitLoss: "+-0円" },
    { year: 2017, profitLoss: "+-0円" },
    { year: 2018, profitLoss: "+-0円" },
    { year: 2019, profitLoss: "+-0円" },
    { year: 2020, profitLoss: "+65,268円" },
    { year: 2021, profitLoss: "+-0円" },
    { year: 2022, profitLoss: "+31,200円" },
    { year: 2023, profitLoss: "+-0円" },
    { year: 2024, profitLoss: "+7,417,155円" },
    { year: 2025, profitLoss: "+4,694,666円" },
    { year: 2026, profitLoss: "+6,121,584円" }
];

// データを年の降順でソート
archiveData.sort((a, b) => b.year - a.year);

// 初期表示する行数
const INITIAL_VISIBLE_COUNT = 5;
let currentIndex = INITIAL_VISIBLE_COUNT;

const archiveTableBody = document.getElementById("archive-table-body");
const loadMoreButton = document.getElementById("load-more");
const resetButton = document.getElementById("reset");

function renderTable(data, startIndex = 0, count = data.length) {
    archiveTableBody.innerHTML = "";

    for (let i = startIndex; i < startIndex + count && i < data.length; i++) {
        const entry = data[i];
        const row = document.createElement("tr");

        const yearCell = document.createElement("td");
        yearCell.textContent = entry.year;

        const profitLossCell = document.createElement("td");
        profitLossCell.textContent = entry.profitLoss;

        row.appendChild(yearCell);
        row.appendChild(profitLossCell);

        archiveTableBody.appendChild(row);
    }
}

renderTable(archiveData, 0, INITIAL_VISIBLE_COUNT);

loadMoreButton.addEventListener("click", () => {
    renderTable(archiveData);
    currentIndex = archiveData.length;

    loadMoreButton.style.display = "none";
    resetButton.style.display = "block";
});

resetButton.addEventListener("click", () => {
    renderTable(archiveData, 0, INITIAL_VISIBLE_COUNT);
    currentIndex = INITIAL_VISIBLE_COUNT;

    loadMoreButton.style.display = "block";
    resetButton.style.display = "none";
});

let currentPage = 1;
const itemsPerPage = 24;
let currentArticles = [];

document.addEventListener("DOMContentLoaded", function () {
    const assetLink = document.querySelector(".asset-link");

    if (!assetLink) return;

    assetLink.addEventListener("click", function (e) {
        e.preventDefault();

        currentArticles = articles
            .filter(article => article.category === "資産残高と収支報告")
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        currentPage = 1;
        renderAssetArticlesPage();
    });
});

function renderAssetBalanceChart(container) {
    const chartWrapper = document.createElement("div");
    chartWrapper.className = "mt-5 mb-4";

    const chartTitle = document.createElement("h4");
    chartTitle.textContent = "月別資産残高の推移";
    chartWrapper.appendChild(chartTitle);

    const canvas = document.createElement("canvas");
    chartWrapper.appendChild(canvas);

    container.appendChild(chartWrapper);

    const chartData = [...monthlyAssetData].sort((a, b) => {
        return new Date(a.date + "-01") - new Date(b.date + "-01");
    });

    // 横軸は年ごとに表示
    const labels = chartData.map(item => {
        const [year, month] = item.date.split("-");
        return month === "01" ? `${year}年` : "";
    });

    const values = chartData.map(item => item.assetBalance);

    new Chart(canvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "資産残高",
                data: values,
                tension: 0.3,
                fill: false,

                // 月ごとの●
                pointRadius: 4,
                pointHoverRadius: 8,
                pointHitRadius: 15
            }]
        },
        options: {
            responsive: true,

            interaction: {
                mode: "nearest",
                intersect: true
            },

            plugins: {
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            const index = context[0].dataIndex;
                            const [year, month] = chartData[index].date.split("-");
                            return `${year}年${month}月`;
                        },
                        label: function (context) {
                            return `資産額: ${context.raw.toLocaleString()}円`;
                        }
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        color: function (context) {
                            const label = labels[context.index];

                            // 年ラベルがある場所だけ縦線を表示
                            return label !== ""
                                ? "rgba(0, 0, 0, 0.15)"
                                : "rgba(0, 0, 0, 0)";
                        }
                    }
                },

                y: {
                    ticks: {
                        stepSize: 10000000,
                        callback: function (value) {
                            return `${value / 10000}万円`;
                        }
                    }
                }
            }
        }
    });
}
function renderAssetArticlesPage() {
    const container = document.getElementById("articles-container");
    container.innerHTML = "";

    const header = document.createElement("h3");
    header.textContent = "資産残高と収支報告の一覧";
    container.appendChild(header);

    const list = document.createElement("ul");

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = currentArticles.slice(start, end);

    pageItems.forEach(article => {
        const listItem = document.createElement("li");

        const date = new Date(article.date);
        const formattedDate =
            `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;

        const dateSpan = document.createElement("span");
        dateSpan.textContent = `${formattedDate} `;
        dateSpan.style.fontWeight = "bold";

        const link = document.createElement("a");
        link.href = article.link;
        link.textContent = article.title;

        listItem.appendChild(dateSpan);
        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    container.appendChild(list);

    const pager = document.createElement("div");
    pager.className = "clearfix mt-4";

    if (currentPage > 1) {
        const newer = document.createElement("a");
        newer.href = "#";
        newer.className = "btn btn-primary float-left pager-link";
        newer.textContent = "← Newer Posts";
        newer.addEventListener("click", function (e) {
            e.preventDefault();
            currentPage--;
            renderAssetArticlesPage();
        });
        pager.appendChild(newer);
    }

    if (currentPage * itemsPerPage < currentArticles.length) {
        const older = document.createElement("a");
        older.href = "#";
        older.className = "btn btn-primary float-right pager-link";
        older.textContent = "Older Posts →";
        older.addEventListener("click", function (e) {
            e.preventDefault();
            currentPage++;
            renderAssetArticlesPage();
        });
        pager.appendChild(older);
    }

    container.appendChild(pager);

    const viewAllButton = document.querySelector(".view-all-posts-btn");
    if (viewAllButton) {
        viewAllButton.style.display = "none";
    }

    // グラフを戻るボタンの上に表示
    renderAssetBalanceChart(container);

    const backButton = document.createElement("a");
    backButton.href = "index.html";
    backButton.className = "btn btn-secondary d-block mx-auto mt-4";
    backButton.textContent = "戻る";
    container.appendChild(backButton);
}