document.addEventListener("DOMContentLoaded", () => {
    console.log("%c停止你的動作!%c\n這是專門提供給開發人員的瀏覽器功能\n請勿複製貼上可疑的程式碼\nΣ(っ °Д °;)っ", "color: red; font-size: 4em; font-weight: 900;", "color: yellow; font-size: 2em; font-weight: 900;");
    const themeSwitch = document.getElementById("theme-switch");
    const percentageText = document.getElementById("percentage");
    const progressBar = document.getElementById("progress-box");
    const loading = document.getElementById("loading");
    let percentage = 0;

    const interval = setInterval(() => {
        percentage += 1;
        percentageText.textContent = `${percentage}%`;
        progressBar.style.width = `${percentage}%`;

        if (percentage >= 100) {
            clearInterval(interval);
            $(loading).slideUp(500, 'swing');
            setTimeout(() => {
                $("body").css("overflow-y", "auto");
            }, 50);
            console.log("Loading Complete");
        }
    }, 10);
});
