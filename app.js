const dummyData = [
  { name: "東京都 杉並区", pref: "東京都", year: 2020, total: 567000, japanese: 548000, foreign: 19000, rate: 3.3, trend: "増加中" },
  { name: "大阪府 西成区", pref: "大阪府", year: 2020, total: 110000, japanese: 100000, foreign: 10000, rate: 9.1, trend: "横ばい" }
];

const prefectures = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県",
  "岐阜県","静岡県","愛知県","三重県",
  "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
  "鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県",
  "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"
];

const search = document.getElementById("search");
const select = document.getElementById("prefectureSelect");
const content = document.getElementById("mainContent");

prefectures.forEach(p => {
  const option = document.createElement("option");
  option.value = p;
  option.textContent = p;
  select.appendChild(option);
});

function render(data) {
  content.innerHTML = "";
  if (data.length === 0) {
    content.innerHTML = "<p class='text-sm text-gray-500'>該当する市区町村が見つかりません。</p>";
    return;
  }
  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "relative bg-cover bg-center text-white max-w-md mx-auto rounded-xl shadow";
    card.style.backgroundImage = "url('images/background.jpg')";
    card.innerHTML = `
      <div class="p-4 bg-black/50 rounded-xl">
        <h2 class="text-lg font-semibold">${item.name}（${item.year}年）</h2>
        <p>総人口：${item.total.toLocaleString()}人</p>
        <p>日本人：${item.japanese.toLocaleString()}人</p>
        <p>外国人：${item.foreign.toLocaleString()}人（${item.rate}%）</p>
        <p>傾向：${item.trend}</p>
        <div class="text-right mt-2">
          <a href="details.html?city=${encodeURIComponent(item.name)}" class="text-white underline text-sm">詳細を見る</a>
        </div>
      </div>
    `;
    content.appendChild(card);
  });
}

function filterData() {
  const q = search.value.trim();
  const p = select.value;
  const result = dummyData.filter(
    d => (!q || d.name.includes(q)) && (!p || d.pref === p)
  );
  render(result);
}

search.addEventListener("input", filterData);
select.addEventListener("change", filterData);

render(dummyData);
