function saveTokens() {
    const t1 = document.getElementById("acc1").value.trim();
    const t2 = document.getElementById("acc2").value.trim();
    localStorage.setItem("cursor_tokens", JSON.stringify({ t1, t2 }));
    document.getElementById("save-msg").innerText = "저장 완료";
}

window.addEventListener("DOMContentLoaded", () => {
    const saved = readStoredTokens();
    document.getElementById("acc1").value = saved.t1 || "";
    document.getElementById("acc2").value = saved.t2 || "";
});
