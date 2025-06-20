
const dummyData = [
  { name: "東京都 杉並区", pref: "東京都", year: 2020, total: 567000, japanese: 548000, foreign: 19000, rate: 3.3, trend: "増加中" },
  { name: "大阪府 西成区", pref: "大阪府", year: 2020, total: 110000, japanese: 100000, foreign: 10000, rate: 9.1, trend: "横ばい" }
];

function render(data, target) {
  target.innerHTML = "";
  if (data.length === 0) {
    target.innerHTML = "<p class='text-sm text-gray-500'>該当する市区町村が見つかりません。</p>";
    return;
  }
  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "relative bg-cover bg-center text-white rounded-xl shadow overflow-hidden";
    div.style.backgroundImage = "url('images/background.jpg')";
    div.innerHTML = `
      <div class="p-4 bg-black/50 rounded-xl">
        <h2 class="text-lg font-semibold mb-2">${item.name}（${item.year}年）</h2>
        <p>総人口：${item.total.toLocaleString()}人</p>
        <p>日本人：${item.japanese.toLocaleString()}人</p>
        <p>外国人：${item.foreign.toLocaleString()}人（${item.rate}%）</p>
        <p>傾向：${item.trend}</p>
        <div class="text-right mt-4">
          <a href="details.html?city=${encodeURIComponent(item.name)}" class="text-white underline text-sm">詳細を見る</a>
        </div>
      </div>
    `;
    target.appendChild(div);
  });
}

const search = document.getElementById("search");
const prefSelect = document.getElementById("prefectureSelect");
const mainContent = document.getElementById("mainContent");

function filterData(q, pref) {
  return dummyData.filter(
    item =>
      (!q || item.name.includes(q)) &&
      (!pref || item.pref === pref)
  );
}

search.addEventListener("input", () => {
  render(filterData(search.value, prefSelect.value), mainContent);
});
prefSelect.addEventListener("change", () => {
  render(filterData(search.value, prefSelect.value), mainContent);
});

render(dummyData, mainContent);
