function getInputToken() {
    const input = document.getElementById("token");
    const value = input.value.trim();
    return value || firstStoredToken();
}

async function testConnection() {
    const status = document.getElementById("api-status");
    const output = document.getElementById("live-data");
    const token = getInputToken();

    if (!token) {
        status.innerText = "토큰을 입력하거나 설정 페이지에서 저장하세요.";
        output.innerText = "-";
        return;
    }

    status.innerText = "연결 시도 중...";
    output.innerText = "-";

    try {
        const response = await fetch("https://api.cursor.sh/v1/analytics", {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (!response.ok) {
            status.innerText = `연결 실패 (${response.status})`;
            output.innerText = JSON.stringify(data, null, 2);
            return;
        }

        status.innerText = "연결 성공";
        output.innerText = JSON.stringify(data, null, 2);
    } catch (_) {
        status.innerText = "연결 실패 (네트워크 오류)";
        output.innerText = "-";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("token");
    const token = firstStoredToken();
    if (token) {
        input.value = token;
    }
});
