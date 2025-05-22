document.addEventListener("DOMContentLoaded", function () {
  // Show loading spinner on form submit
  const form = document.querySelector("form");
  const submitBtn = form.querySelector("button[type='submit']");
  form.addEventListener("submit", () => {
    submitBtn.classList.add("loading");
  });

  // Render sentiment chart if data is present
  const dataEl = document.getElementById("sentimentData");
  if (!dataEl) return; // no data to display

  const sentimentData = JSON.parse(dataEl.getAttribute("data-result"));

  const ctx = document.getElementById("sentimentChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Positive", "Neutral", "Negative"],
      datasets: [
        {
          label: "# of Comments",
          data: [sentimentData.positive, sentimentData.neutral, sentimentData.negative],
          backgroundColor: ["#198754", "#ffc107", "#dc3545"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Sentiment Analysis Summary",
          font: { size: 18 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  });
});
