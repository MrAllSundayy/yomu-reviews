/*dark mode*/
const toggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.textContent = "☀️";
}

toggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        toggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

/*contact form pop-up*/

/*progress bar*/
const progressBar = document.querySelector(".progress-bar");

if (progressBar) {
    window.addEventListener("scroll", () => {
        const percent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = percent + "%";
    });
}

/*back to top*/
const backToTopBtn = document.querySelector(".back-to-top");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/*favorites system - uses review id from supabase*/
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function toggleFavorite(id) {
    const favs = getFavorites();
    if (favs.includes(id)) {
        favs.splice(favs.indexOf(id), 1);
    } else {
        favs.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
}

/*add heart buttons to all cards on the page*/
function initFavorites() {
    const cards = document.querySelectorAll(".container");

    cards.forEach(function (card) {
        const link = card.querySelector("a[href*='review.html']");
        if (!link) return;

        /*get the review id from the link*/
        const url = new URL(link.href, window.location.origin);
        const id = parseInt(url.searchParams.get("id"));
        if (!id) return;

        /*create heart button*/
        const heartBtn = document.createElement("button");
        heartBtn.className = "favorite-btn";
        heartBtn.innerHTML = '<i class="fas fa-heart"></i>';

        if (getFavorites().includes(id)) {
            heartBtn.classList.add("favorited");
        }

        heartBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(id);
            heartBtn.classList.toggle("favorited");
        });

        card.appendChild(heartBtn);
    });
}