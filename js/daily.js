let dailyChart = null;

const dailyChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } }
};

function normalizeEvent(row) {
    const timestamp = row.timestamp ? new Date(row.timestamp) : null;
    const valid = timestamp && !Number.isNaN(timestamp.getTime());

    const date = row.date || (valid ? localYmd(timestamp) : "");
    const time = row.time || (valid ? localHm(timestamp) : "-");

    return {
        date,
        time,
        action: row.action || row.event_type || "-",
        tokens: typeof row.tokens === "number" ? row.tokens : (row.total_tokens || 0),
        status: row.status || "-"
    };
}

async function loadDaily() {
    const date = document.getElementById("date-picker").value;
    if (!date) {
        alert("날짜를 선택하세요");
        return;
    }

    const body = document.getElementById("daily-table");

    try {
        const all = await fetchJson("data/events.json");
        const list = Array.isArray(all) ? all : [];
        const normalized = list.map(normalizeEvent);
        const filtered = normalized.filter((x) => x.date === date);

        if (filtered.length === 0) {
            body.innerHTML = '<tr><td colspan="4">선택한 날짜 데이터가 없습니다.</td></tr>';
        } else {
            body.innerHTML = filtered.map((row) => `
                <tr>
                    <td>${escapeHtml(row.time)}</td>
                    <td>${escapeHtml(row.action)}</td>
                    <td>${escapeHtml(row.tokens)}</td>
                    <td>${escapeHtml(row.status)}</td>
                </tr>
            `).join("");
        }

        const tokens = filtered.map((x) => x.tokens);
        const hours = filtered.map((x) => x.time);
        const ctx = document.getElementById("dailyChart");

        if (dailyChart) {
            dailyChart.destroy();
        }

        dailyChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: hours,
                datasets: [{ label: "Tokens", data: tokens }]
            },
            options: dailyChartOptions
        });
    } catch (_) {
        if (dailyChart) {
            dailyChart.destroy();
            dailyChart = null;
        }
        body.innerHTML = '<tr><td colspan="4">이벤트 데이터를 불러오지 못했습니다.</td></tr>';
    }
}

function todayInputValue() {
    return localYmd(new Date());
}

window.addEventListener("DOMContentLoaded", () => {
    const picker = document.getElementById("date-picker");
    picker.value = todayInputValue();
    loadDaily();
});
