let phrases = [
    '("student developer...")',
    '(“AI, Web and App Enthusiast”)'
];
let currentPhraseIndex = 0;
let i = 0;
let speed = 300;
let pauseBetweenPhrases = 1000;
let isErasing = false;

function animateTitle() {
    const title = document.querySelector('.hero-section h2');
    title.classList.add('move');
    setTimeout(() => {
        title.classList.remove('move');
    }, 500);
}

function typeWriter() {
    let currentPhrase = phrases[currentPhraseIndex];
    let textElement = document.getElementById("anim_text");

    if (!isErasing) {
        if (i < currentPhrase.length) {
            // Ajoute une seule lettre à la fois
            textElement.textContent = currentPhrase.slice(0, i + 1);
            i++;
            requestAnimationFrame(() => setTimeout(typeWriter, speed));
        } else {
            isErasing = true;
            setTimeout(() => {
                animateTitle();
                typeWriter();
            }, pauseBetweenPhrases);
        }
    } else {
        if (i > 0) {
            // Enlève une seule lettre à la fois
            textElement.textContent = currentPhrase.slice(0, i - 1);
            i--;
            requestAnimationFrame(() => setTimeout(typeWriter, speed / 2));
        } else {
            isErasing = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(() => {
                animateTitle();
                typeWriter();
            }, speed);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    typeWriter();
});