
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("populationChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月"],
      datasets: [
        {
          label: "日本人",
          data: [3000, 3200, 3100, 2900, 3000, 3100, 3000, 3100, 3050, 3200, 3150, 3300],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "外国人",
          data: [300, 320, 310, 290, 300, 310, 300, 310, 305, 320, 315, 330],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "直近12ヶ月の人口推移（例）"
        }
      }
    }
  });
});
