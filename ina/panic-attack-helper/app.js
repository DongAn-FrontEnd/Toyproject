const calmerPhrases = [
    "Anxiety does not own you.",
    "Focus on slowing your breathing.",
    "Breathe in, and breathe out.",
    "Breathe in, and breathe out.",
    "Continue to breathe purposefully.",
    "Try to focus on something that brings you pleasure.",
    "Sip on something warm.",
    "Call a loved one.",
    "Remember that you are never alone.",
    "Even if it sometimes feels like you are.",
    "Breathe in, and breathe out.",
    "Breathe in, and breathe out.",
    "Don't worry about the past, present, or future.",
    "Just breathe In.",
    "Breathe in, and breathe out.",
    "Breathe in, and breathe out.",
    "You are more than your anxiety.",
    "This feeling will end. I promise.",
    "You are going to be okay.",
    "Breathe in, and breathe out.",
    "Breathe in, and breathe out.",
];
const introPage = document.querySelector("#introPage");
const calmerText = document.querySelector("#calmer-text");
const fasterButton = document.querySelector("#fasterButton");
const slowerButton = document.querySelector("#slowerButton");
const helpButton = document.querySelector("#helpButton");
const circle = document.querySelector("#circle");
const durationText = document.querySelector("#durationText");
let duration = 7;

function changePhrase(i) {
    if (calmerPhrases.length > i) {
        setTimeout(function () {
            calmerText.innerHTML = calmerPhrases[i];
            changePhrase(++i);
        }, 7000);
    } else if (calmerPhrases.length == i) {
        changePhrase(0);
    }
}

function playSlower() {
    duration++;
    if (duration < 15) {
        circle.style.animation = `light_anim ${duration}s ease infinite`;
        calmerText.style.animation = `fadeIn ${duration}s infinite`;
    } else {
        duration = 15;
        circle.style.animation = `light_anim 15s ease infinite`;
        calmerText.style.animation = `fadeIn 15s infinite`;
    }
    durationText.innerHTML = `Breahthing duration : ${duration} sec`;
}

function playFaster() {
    duration--;
    if (duration > 4) {
        circle.style.animation = `light_anim ${duration}s ease infinite`;
        calmerText.style.animation = `fadeIn ${duration}s infinite`;
        durationText.innerHTML = `Breahthing duration : ${duration} sec`;
    } else {
        duration = 4;
        circle.style.animation = `light_anim 4s ease infinite`;
        calmerText.style.animation = `fadeIn 4s infinite`;
        durationText.innerHTML = `Slower breathing will help you recover.`;
    }

}

function textFadeInOut() {
    durationText.style.opacity = 1;
    setTimeout(() => {
        durationText.style.opacity = 0;
    }, 1000);
}

function fadeOut() {
    introPage.style.display = "none";
}
helpButton.addEventListener("click", changePhrase(0));
helpButton.addEventListener("click", fadeOut);
fasterButton.addEventListener("click", playFaster);
fasterButton.addEventListener("click", textFadeInOut);
slowerButton.addEventListener("click", playSlower);
slowerButton.addEventListener("click", textFadeInOut);