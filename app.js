const dummyData = [
  {
    name: "東京都 杉並区",
    year: 2020,
    total: 567000,
    japanese: 548000,
    foreign: 19000,
    rate: 3.3,
    trend: "増加中",
  },
  {
    name: "大阪府 西成区",
    year: 2020,
    total: 110000,
    japanese: 100000,
    foreign: 10000,
    rate: 9.1,
    trend: "横ばい",
  },
];

const input = document.getElementById("search");
const results = document.getElementById("results");

function render(filtered) {
  results.innerHTML = "";
  if (filtered.length === 0) {
    results.innerHTML = "<p class='text-sm text-gray-500'>該当する市区町村が見つかりません。</p>";
    return;
  }
  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.className = "card-bg rounded-xl shadow overflow-hidden";
    div.innerHTML = `
      <div class="card-overlay">
        <h2 class="text-lg font-semibold mb-2">${item.name}（${item.year}年）</h2>
        <p>総人口：${item.total.toLocaleString()}人</p>
        <p>日本人：${item.japanese.toLocaleString()}人</p>
        <p>外国人：${item.foreign.toLocaleString()}人（${item.rate}%）</p>
        <p>傾向：${item.trend}</p><a href="details.html?city=${encodeURIComponent(item.name)}" class="text-blue-300 underline block mt-2">詳細を見る</a></div>
    `;
    results.appendChild(div);
  });
}

input.addEventListener("input", (e) => {
  const q = e.target.value;
  const filtered = dummyData.filter((item) => item.name.includes(q));
  render(filtered);
});

render(dummyData);
