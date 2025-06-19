const params = new URLSearchParams(window.location.search);
const city = params.get("city") || "杉並区";

const dummy = {
  labels: ["2024/6","2024/7","2024/8","2024/9","2024/10","2024/11","2024/12","2025/1","2025/2","2025/3","2025/4","2025/5"],
  total: [560000, 561000, 562000, 563000, 564000, 565000, 566000, 566500, 567000, 567500, 568000, 568500],
  foreign: [18000, 18100, 18200, 18300, 18400, 18500, 18600, 18700, 18800, 18900, 19000, 19100]
};

document.getElementById("title").textContent = `${city}の人口推移`;

const ctx = document.getElementById("chart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: dummy.labels,
    datasets: [
      {
        label: "日本人",
        data: dummy.total.map((t, i) => t - dummy.foreign[i]),
        backgroundColor: "rgba(59, 130, 246, 0.7)"
      },
      {
        label: "外国人",
        data: dummy.foreign,
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
