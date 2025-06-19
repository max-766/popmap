const dummyData = [
  {
    name: "東京都 杉並区",
    year: 2025,
    total: [560000, 561000, 562500, 563000, 564000, 565000, 566000, 566500, 567000, 567500, 568000, 568500],
    foreign: [18000, 18100, 18200, 18300, 18350, 18400, 18500, 18600, 18700, 18800, 18900, 19000],
    labels: ["2024/6","2024/7","2024/8","2024/9","2024/10","2024/11","2024/12","2025/1","2025/2","2025/3","2025/4","2025/5"],
    trend: "増加中",
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
  filtered.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "card-bg rounded-xl shadow overflow-hidden";
    div.innerHTML = `
      <div class="card-overlay">
        <h2 class="text-lg font-semibold mb-2">${item.name}（${item.year}年）</h2>
        <p class="mb-2">傾向：${item.trend}</p>
        <canvas id="chart-${index}" height="200"></canvas>
      </div>
    `;
    results.appendChild(div);

    const ctx = document.getElementById(`chart-${index}`).getContext("2d");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: item.labels,
        datasets: [
          {
            label: '日本人',
            data: item.total.map((t, i) => t - item.foreign[i]),
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
          },
          {
            label: '外国人',
            data: item.foreign,
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: 'white' }
          },
        },
        scales: {
          x: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          },
          y: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          }
        }
      }
    });
  });
}

input.addEventListener("input", (e) => {
  const q = e.target.value;
  const filtered = dummyData.filter((item) => item.name.includes(q));
  render(filtered);
});

render(dummyData);
