fetch("data/sample.json")
  .then(r => r.json())
  .then(data => {
      document.getElementById("kpi-today").innerText = data.today;
      document.getElementById("kpi-week").innerText = data.week;
      document.getElementById("kpi-api").innerText = data.api;
      document.getElementById("kpi-error").innerText = data.error;

      // chart
      new Chart(document.getElementById("usageChart"), {
          type: 'line',
          data: {
              labels: data.labels,
              datasets: [{ data: data.usage, borderWidth:2 }]
          }
      });

      // events
      const table = document.getElementById("event-table");
      data.events.forEach(ev => {
          table.innerHTML += `<tr><td>${ev.time}</td><td>${ev.text}</td><td>${ev.status}</td></tr>`;
      });
  });
