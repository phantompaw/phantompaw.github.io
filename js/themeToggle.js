document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeButton = document.getElementById("toggleTheme");
    const body = document.body;
    const currentTheme = localStorage.getItem("theme") || "dark";
    body.classList.add(currentTheme);

    function updateButtonText() {
        if (body.classList.contains("dark")) {
            toggleThemeButton.textContent = "切換到淺色模式";
        } else {
            toggleThemeButton.textContent = "切換到深色模式";
        }
    }

    toggleThemeButton.addEventListener("click", () => {
        body.classList.toggle("dark");
        body.classList.toggle("light");
        const newTheme = body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        updateButtonText();
    });

    updateButtonText();
});
