/* =========================================================
   LOVE.EXE ❤️
   GENERIC ROMANTIC WEBSITE TEMPLATE
   ========================================================= */


/* =========================================================
   SCREEN CONTROLLER
   ========================================================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
    } else {
        console.error("Screen not found:", screenId);
    }
}


/* =========================================================
   MUSIC
   ========================================================= */

const music = document.getElementById("loveMusic");
const musicButton = document.getElementById("musicButton");


function startMusic() {

    if (!music) return;

    music.volume = 0.35;

    music.play()
        .then(() => {
            updateMusicButton();
        })
        .catch(() => {
            console.log("Music waiting for user interaction.");
        });
}


function updateMusicButton() {

    if (!musicButton || !music) return;

    if (music.paused) {

        musicButton.textContent = "♪";

        musicButton.classList.remove("playing");

        musicButton.title = "Play music";

    } else {

        musicButton.textContent = "♫";

        musicButton.classList.add("playing");

        musicButton.title = "Pause music";
    }
}


if (musicButton) {

    musicButton.addEventListener("click", () => {

        if (!music) return;

        if (music.paused) {

            music.play()
                .then(() => {
                    updateMusicButton();
                })
                .catch(() => {
                    console.log("Unable to play music.");
                });

        } else {

            music.pause();

            updateMusicButton();
        }

    });
}


if (music) {

    music.addEventListener("play", updateMusicButton);

    music.addEventListener("pause", updateMusicButton);
}


/* =========================================================
   LOADING SCREEN
   ========================================================= */

const progressBar =
    document.getElementById("progressBar");

const terminalText =
    document.getElementById("terminalText");


const loadingMessages = [

    "Initializing LOVE.EXE...",

    "Loading feelings...",

    "Checking heart status...",

    "Scanning memories...",

    "Finding your person...",

    "Preparing something special...",

    "Almost ready..."

];


let progress = 0;

let messageIndex = 0;


const loadingInterval = setInterval(() => {

    progress += 2;


    if (progressBar) {

        progressBar.style.width =
            progress + "%";
    }


    if (
        progress % 14 === 0 &&
        terminalText &&
        messageIndex < loadingMessages.length
    ) {

        terminalText.innerHTML +=
            "<br>> " +
            loadingMessages[messageIndex];

        messageIndex++;
    }


    if (progress >= 100) {

        clearInterval(loadingInterval);


        setTimeout(() => {

            showScreen("fingerprint-screen");

        }, 600);
    }

}, 45);


/* =========================================================
   FINGERPRINT SCANNER
   ========================================================= */

const fingerprintScanner =
    document.getElementById("fingerprintScanner");

const scanText =
    document.getElementById("scanText");


let scanning = false;


if (fingerprintScanner) {

    fingerprintScanner.addEventListener("click", () => {

        if (scanning) return;

        scanning = true;


        /* Start music after user interaction */

        startMusic();


        fingerprintScanner.classList.add("scanning");


        if (scanText) {

            scanText.textContent =
                "SCANNING...";
        }


        setTimeout(() => {

            if (scanText) {

                scanText.textContent =
                    "FINGERPRINT VERIFIED ✓";
            }

            fingerprintScanner.classList.remove("scanning");

            fingerprintScanner.classList.add("verified");

        }, 1800);


        setTimeout(() => {

            showScreen("welcome-screen");

            scanning = false;

        }, 2600);

    });

}


/* =========================================================
   WELCOME → HEART
   ========================================================= */

const openButton =
    document.getElementById("openButton");


if (openButton) {

    openButton.addEventListener("click", () => {

        startMusic();

        showScreen("heart-screen");

    });

}


/* =========================================================
   HEART → SECRET FILES
   ========================================================= */

const heartNext =
    document.getElementById("heartNext");


if (heartNext) {

    heartNext.addEventListener("click", () => {

        showScreen("secrets-screen");

        showSecretMessage();

    });

}


/* =========================================================
   SECRET MESSAGES
   ========================================================= */

const secretMessage =
    document.getElementById("secretMessage");

const secretNext =
    document.getElementById("secretNext");


const secretMessages = [

    "You make me smile without even trying. ❤️",

    "Sometimes I randomly think about you and smile like an idiot. 🫣💕",

    "You're not just someone I love... you're my favorite person. ❤️"

];


let secretIndex = 0;


function showSecretMessage() {

    if (!secretMessage) return;


    secretMessage.style.opacity = "0";


    setTimeout(() => {

        secretMessage.textContent =
            secretMessages[secretIndex];

        secretMessage.style.opacity = "1";

    }, 250);
}


if (secretNext) {

    secretNext.addEventListener("click", () => {

        secretIndex++;


        if (secretIndex < secretMessages.length) {

            showSecretMessage();

        } else {

            showScreen("game-screen");

            startGame();
        }

    });

}


/* =========================================================
   MINI GAME
   ========================================================= */

const gameP =
    document.getElementById("gameP");

const gameCounter =
    document.getElementById("gameCounter");

const gameComplete =
    document.getElementById("gameComplete");

const finalButton =
    document.getElementById("finalButton");


let found = 0;

let gameStarted = false;


/* ---------------------------------------------------------
   RANDOM POSITION
   --------------------------------------------------------- */

function randomizeP() {

    if (!gameP) return;


    const gameArea =
        document.querySelector(".game-area");


    if (!gameArea) return;


    const maxX =
        Math.max(
            10,
            gameArea.clientWidth -
            gameP.offsetWidth -
            15
        );


    const maxY =
        Math.max(
            10,
            gameArea.clientHeight -
            gameP.offsetHeight -
            15
        );


    const x =
        Math.random() * maxX;


    const y =
        Math.random() * maxY;


    gameP.style.left =
        x + "px";


    gameP.style.top =
        y + "px";
}


/* ---------------------------------------------------------
   UPDATE GAME COUNTER
   --------------------------------------------------------- */

function updateGameCounter() {

    if (!gameCounter) return;

    gameCounter.textContent =
        found + " / 5";
}


/* ---------------------------------------------------------
   START GAME
   --------------------------------------------------------- */

function startGame() {

    found = 0;

    gameStarted = true;


    updateGameCounter();


    if (gameComplete) {

        gameComplete.style.display =
            "none";
    }


    if (finalButton) {

        finalButton.classList.add("hidden");
    }


    setTimeout(() => {

        randomizeP();

    }, 100);

}


/* ---------------------------------------------------------
   CATCH P
   --------------------------------------------------------- */

if (gameP) {

    gameP.addEventListener("click", () => {

        if (!gameStarted) return;


        found++;


        updateGameCounter();


        if (found >= 5) {

            gameStarted = false;


            if (gameComplete) {

                gameComplete.style.display =
                    "block";
            }


            if (finalButton) {

                finalButton.classList.remove(
                    "hidden"
                );
            }


            /* Move P away */

            gameP.style.display =
                "none";


        } else {

            randomizeP();
        }

    });

}


/* =========================================================
   GAME → FINAL SCRAPBOOK
   ========================================================= */

if (finalButton) {

    finalButton.addEventListener("click", () => {

        showScreen("final-screen");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   MEMORY PHOTO POPUP
   ========================================================= */

const memoryImages =
    document.querySelectorAll(".memory-image img");


memoryImages.forEach(image => {

    image.addEventListener("click", (event) => {

        event.stopPropagation();


        /* Don't open popup for broken images */

        if (
            !image.complete ||
            image.naturalWidth === 0
        ) {
            return;
        }


        const popup =
            document.createElement("div");


        popup.className =
            "photo-popup";


        const popupImage =
            document.createElement("img");


        popupImage.src =
            image.src;


        popupImage.alt =
            image.alt || "Memory";


        popup.appendChild(
            popupImage
        );


        document.body.appendChild(
            popup
        );


        popup.addEventListener("click", () => {

            popup.remove();

        });

    });

});


/* =========================================================
   FLOATING HEARTS
   ========================================================= */

function createFloatingHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "floating-heart";


    heart.textContent =
        "♥";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.bottom =
        "-20px";


    heart.style.fontSize =
        (12 + Math.random() * 16) + "px";


    heart.style.animationDuration =
        (3 + Math.random() * 3) + "s";


    document.body.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 6500);

}


setInterval(() => {

    /* Only create hearts occasionally */

    if (
        document.querySelector(
            "#heart-screen.active"
        ) ||
        document.querySelector(
            "#final-screen.active"
        )
    ) {

        createFloatingHeart();
    }

}, 700);


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener("resize", () => {

    if (gameStarted) {

        randomizeP();
    }

});


/* =========================================================
   INITIAL MUSIC BUTTON
   ========================================================= */

updateMusicButton();


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cLOVE.EXE ❤️",
    "color:#ff4f91;font-size:24px;font-weight:bold;"
);

console.log(
    "Welcome to the little love website."
);