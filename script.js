document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const sidebar = document.querySelector(".sidebar");

  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  const salesChartCtx = document.getElementById("salesChart");

  if (salesChartCtx) {
    const dataset1 = [
      12000, 14000, 11000, 14000, 8000, 5000, 9000, 6000, 14000, 10000, 12000,
      6000, 20000, 7000, 18000, 13000,
    ];
    const dataset2 = [
      5000, 6000, 8000, 8000, 5000, 6000, 5000, 5500, 10000, 7000, 4000, 5000,
      6000, 4000, 7000, 8000,
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const labels = [];
    for (let i = 0; i < dataset1.length; i++) {
      const weekNum = Math.floor(i / 7) + 1;
      labels.push(`${days[i % 7]} W${weekNum}`);
    }

    new Chart(salesChartCtx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Label1",
            data: dataset1,
            borderColor: "#4745A4",
            borderWidth: 3,
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#4f46e5",
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: "#fff",
          },
          {
            label: "Label2",
            data: dataset2,
            borderColor: "#F8CD70",
            borderWidth: 3,
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#F8CD70",
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
            align: "end",
            labels: {
              boxWidth: 12,
              padding: 20,
              font: {
                size: 12,
                family: "'Poppins', sans-serif",
              },
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
            backgroundColor: "#fff",
            titleColor: "#0D163A",
            bodyColor: "#0D163A",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            padding: 12,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            callbacks: {
              label: function (context) {
                return `${
                  context.dataset.label
                }: $${context.parsed.y.toLocaleString()}`;
              },
              labelColor: function (context) {
                return {
                  borderWidth: 2,
                  borderColor: context.dataset.borderColor,
                  backgroundColor: context.dataset.borderColor + "33",
                };
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 22000,
            grid: {
              drawBorder: false,
              color: "#e5e7eb",
              drawTicks: false,
            },
            ticks: {
              callback: function (value) {
                return "$" + value / 1000 + "k";
              },
              stepSize: 5000,
              font: {
                size: 12,
                family: "'Poppins', sans-serif",
              },
              color: "#6b7280",
              padding: 10,
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 12,
                family: "'Poppins', sans-serif",
              },
              color: "#6b7280",
              maxRotation: 0,
              callback: function (value, index) {
                return this.getLabelForValue(value).split(" ")[0];
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    });
  }

  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
      if (
        !sidebar.contains(event.target) &&
        event.target !== mobileMenuToggle
      ) {
        sidebar.classList.remove("active");
      }
    }
  });

  function handleResize() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
    }
  }

  window.addEventListener("resize", handleResize);
});
