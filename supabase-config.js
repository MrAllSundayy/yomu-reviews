/*supabase config - replace with your own values*/
const SUPABASE_URL = "https://fcujqhexqfggceeewgii.supabase.co";
const SUPABASE_KEY = "sb_publishable_-Vubj-nnYCBNGX5yJbwOUw_3AsBecQu";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/*stars helper - converts rating number to star icons*/
function getStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += "★";
        } else if (i - 0.5 <= rating) {
            stars += "⯪";
        } else {
            stars += "☆";
        }
    }
    return stars;
}

/*time ago helper*/
function timeAgo(dateString) {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    const days = Math.floor(seconds / 86400);
    if (days === 0) return "today";
    if (days === 1) return "1 day ago";
    if (days < 7) return days + " days ago";
    if (days < 14) return "1 week ago";
    return Math.floor(days / 7) + " weeks ago";
}

/*card builder - creates a review card element*/
function createReviewCard(review) {
    const card = document.createElement("article");
    card.className = "container";

    card.innerHTML =
        '<a href="review.html?id=' + review.id + '">' +
            '<img src="' + review.image_url + '" alt="' + review.title + ' cover">' +
        '</a>' +
        '<div class="container-content">' +
            '<h4>' + review.title + '</h4>' +
            '<p class="genre">' + review.genre + ' · ' + getStars(review.rating) + '</p>' +
            '<p class="short-gist">' + review.gist + '</p>' +
            '<a href="review.html?id=' + review.id + '" class="read-more">Read Review</a>' +
        '</div>';

    return card;
}
