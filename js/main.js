let usageChart = null;

const chartDefaults = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } }
};

async function loadDashboard() {
    const table = document.getElementById("event-table");

    try {
        const data = await fetchJson("data/sample.json");

        document.getElementById("kpi-today").innerText = data.today ?? "-";
        document.getElementById("kpi-week").innerText = data.week ?? "-";
        document.getElementById("kpi-api").innerText = data.api ?? "-";
        document.getElementById("kpi-error").innerText = data.error ?? "-";

        if (usageChart) {
            usageChart.destroy();
        }

        usageChart = new Chart(document.getElementById("usageChart"), {
            type: "line",
            data: {
                labels: data.labels || [],
                datasets: [{ label: "Usage", data: data.usage || [], borderWidth: 2 }]
            },
            options: chartDefaults
        });

        const rawEvents = data.events;
        const events = Array.isArray(rawEvents) ? rawEvents : [];
        table.innerHTML = events.length
            ? events.map((ev) => `<tr><td>${escapeHtml(ev.time)}</td><td>${escapeHtml(ev.text)}</td><td>${escapeHtml(ev.status)}</td></tr>`).join("")
            : '<tr><td colspan="3">이벤트가 없습니다.</td></tr>';
    } catch (_) {
        ["kpi-today", "kpi-week", "kpi-api", "kpi-error"].forEach((id) => {
            document.getElementById(id).innerText = "—";
        });
        if (usageChart) {
            usageChart.destroy();
            usageChart = null;
        }
        table.innerHTML = '<tr><td colspan="3">대시보드 데이터를 불러오지 못했습니다.</td></tr>';
    }
}

loadDashboard();
