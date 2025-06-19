const params = new URLSearchParams(window.location.search);
const city = params.get("city");

const dummyDetails = {
  "杉並区": {
    year: 2025,
    labels: ["2024/6","2024/7","2024/8","2024/9","2024/10","2024/11","2024/12","2025/1","2025/2","2025/3","2025/4","2025/5"],
    total: [560000,561000,562500,563000,564000,565000,566000,566500,567000,567500,568000,568500],
    foreign: [18000,18100,18200,18300,18350,18400,18500,18600,18700,18800,18900,19000]
  }
};

if (city && dummyDetails[city]) {
  document.getElementById("title").textContent = `${city}（${dummyDetails[city].year}年）`;

  const japanese = dummyDetails[city].total.map((t, i) => t - dummyDetails[city].foreign[i]);
  const foreign = dummyDetails[city].foreign;

  const ctx = document.getElementById("detailChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: dummyDetails[city].labels,
      datasets: [
        {
          label: "日本人",
          data: japanese,
          backgroundColor: "rgba(59, 130, 246, 0.7)"
        },
        {
          label: "外国人",
          data: foreign,
          backgroundColor: "rgba(239, 68, 68, 0.8)"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" }
      },
      scales: {
        x: { grid: { color: "rgba(0,0,0,0.05)" } },
        y: { grid: { color: "rgba(0,0,0,0.05)" } }
      }
    }
  });

  document.getElementById("note").textContent = "※ ダミーデータ表示中です（後ほど実データ連携）";
}
