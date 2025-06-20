
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("populationChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月"],
      datasets: [
        {
          label: "日本人",
          data: [3200, 3100, 3150, 3250, 3300, 3400, 3350, 3280, 3320, 3380, 3450, 3500],
          backgroundColor: "rgba(54, 162, 235, 0.6)"
        },
        {
          label: "外国人",
          data: [200, 220, 210, 230, 240, 260, 250, 248, 252, 258, 260, 270],
          backgroundColor: "rgba(255, 99, 132, 0.6)"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "直近12ヶ月の人口推移（例）"
        }
      }
    }
  });
});
