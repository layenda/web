const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (dark) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "dark.css";
    document.head.appendChild(link);
}
