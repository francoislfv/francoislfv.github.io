document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.querySelector('.scroll-button');
    const image = document.querySelector('.scrollable-container img');
    let scrollInterval;
    let scrollPosition = 0;

    scrollButton.addEventListener('mousedown', function() {
        scrollInterval = setInterval(function() {
            scrollPosition -= 5; // Adjust the scroll speed as needed
            image.style.transform = `translateY(${scrollPosition}px)`;
        }, 100);
    });

    scrollButton.addEventListener('mouseup', function() {
        clearInterval(scrollInterval);
    });

    scrollButton.addEventListener('mouseleave', function() {
        clearInterval(scrollInterval);
    });
});