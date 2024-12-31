document.addEventListener("DOMContentLoaded", () => {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;   
    const toggleThemeButton = document.getElementById("toggleTheme");
    const body = document.body;

    const currentTheme = localStorage.getItem("theme") || 
                         (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    body.classList.add(currentTheme);

    function updateButtonText() {
        toggleThemeButton.textContent = body.classList.contains("dark") ? "切換到淺色模式" : "切換到深色模式";
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