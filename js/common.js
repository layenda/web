function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`데이터 로드 실패: ${response.status}`);
    }
    return response.json();
}

function pad2(n) {
    return String(n).padStart(2, "0");
}

function localYmd(date) {
    if (!date || Number.isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function localHm(date) {
    if (!date || Number.isNaN(date.getTime())) return "-";
    return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function readStoredTokens() {
    try {
        return JSON.parse(localStorage.getItem("cursor_tokens") || "{}");
    } catch (_) {
        return {};
    }
}

function firstStoredToken() {
    const saved = readStoredTokens();
    return String(saved.t1 || saved.t2 || "").trim();
}
