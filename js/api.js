function testConnection() {
    const token = document.getElementById("token").value;
    if (!token) return;

    fetch("https://api.cursor.sh/v1/analytics", {
        headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => {
          document.getElementById("api-status").innerText = "연결 성공";
          document.getElementById("live-data").innerText = JSON.stringify(d,null,2);
      })
      .catch(() => {
          document.getElementById("api-status").innerText = "연결 실패";
      });
}
