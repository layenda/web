function loadDaily() {
    const date = document.getElementById("date-picker").value;
    if (!date) return alert("날짜를 선택하세요");

    fetch("data/events.json")
        .then(r => r.json())
        .then(all => {
            const filtered = all.filter(x => x.date === date);

            // chart
            const tokens = filtered.map(x => x.tokens);
            const hours = filtered.map(x => x.time);

            new Chart(document.getElementById("dailyChart"), {
                type: "bar",
                data: { labels: hours, datasets: [{ data: tokens }] }
            });

            // table
            const body = document.getElementById("daily-table");
            body.innerHTML = "";
            filtered.forEach(row => {
                body.innerHTML += `<tr>
                    <td>${row.time}</td>
                    <td>${row.action}</td>
                    <td>${row.tokens}</td>
                    <td>${row.status}</td>
                </tr>`;
            });
        });
}
