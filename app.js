
document.addEventListener("DOMContentLoaded", () => {
  const data = [
    { name: "東京都 杉並区", year: 2020, total: 567000, japanese: 548000, foreign: 19000, rate: 3.3, trend: "増加中" },
    { name: "大阪府 西成区", year: 2020, total: 110000, japanese: 100000, foreign: 10000, rate: 9.1, trend: "横ばい" },
    { name: "神奈川県 川崎市", year: 2020, total: 1540000, japanese: 1450000, foreign: 90000, rate: 5.8, trend: "増加中" }
  ];

  const main = document.getElementById("mainContent");
  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "bg-cover bg-center text-white rounded-xl overflow-hidden shadow relative";
    div.style.backgroundImage = "url('images/background.jpg')";
    div.innerHTML = `
      <div class="p-4 bg-black/50">
        <h2 class="text-lg font-semibold">${item.name}（${item.year}年）</h2>
        <p>総人口：${item.total.toLocaleString()}人</p>
        <p>日本人：${item.japanese.toLocaleString()}人</p>
        <p>外国人：${item.foreign.toLocaleString()}人（${item.rate}%）</p>
        <p>傾向：${item.trend}</p>
        <div class="text-right"><a href="details.html" class="mt-2 inline-block text-sm underline text-white">詳細を見る</a></div>
      </div>
    `;
    main.appendChild(div);
  });
});
