const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const card = document.getElementById("card");
const success = document.getElementById("success");

const heartsContainer = document.querySelector(".hearts");


// =====================================================
// POSIZIONE INIZIALE DEL PULSANTE NO
// =====================================================

function setInitialNoPosition() {

    const yesRect =
        yesBtn.getBoundingClientRect();

    const noRect =
        noBtn.getBoundingClientRect();

    const gap = 20;
    const margin = 20;


    /*
        Posizione iniziale:
        il NO viene messo a destra del SÌ.
    */

    let left =
        yesRect.right + gap;

    let top =
        yesRect.top;


    /*
        Dimensioni della finestra.
    */

    const viewportWidth =
        document.documentElement.clientWidth;

    const viewportHeight =
        document.documentElement.clientHeight;


    /*
        Limiti massimi.
    */

    const maxLeft =
        viewportWidth -
        noRect.width -
        margin;

    const maxTop =
        viewportHeight -
        noRect.height -
        margin;


    /*
        Se non c'è spazio a destra,
        mettiamo il NO a sinistra del SÌ.
    */

    if (left > maxLeft) {

        left =
            yesRect.left -
            noRect.width -
            gap;
    }


    /*
        Limite orizzontale.
    */

    left =
        Math.max(
            margin,
            Math.min(
                left,
                maxLeft
            )
        );


    /*
        Limite verticale.
    */

    top =
        Math.max(
            margin,
            Math.min(
                top,
                maxTop
            )
        );


    /*
        Posizione definitiva.
    */

    noBtn.style.position = "fixed";

    noBtn.style.left =
        `${left}px`;

    noBtn.style.top =
        `${top}px`;

    noBtn.style.right = "auto";

    noBtn.style.bottom = "auto";

    noBtn.style.transform = "none";
}


// =====================================================
// IMPOSTA POSIZIONE ALL'AVVIO
// =====================================================

window.addEventListener(
    "load",
    setInitialNoPosition
);


// =====================================================
// PULSANTE NO
// =====================================================

function moveNoButton() {

    /*
        Rendiamo il pulsante indipendente
        dalla card.
    */

    noBtn.style.position = "fixed";

    noBtn.style.margin = "0";

    noBtn.style.right = "auto";

    noBtn.style.bottom = "auto";

    /*
        Nessuna rotazione:
        evitiamo che il pulsante possa
        oltrepassare i bordi.
    */

    noBtn.style.transform = "none";


    /*
        Aspettiamo l'aggiornamento del browser.
    */

    requestAnimationFrame(() => {

        const button =
            noBtn.getBoundingClientRect();


        /*
            Dimensioni REALI della viewport.
        */

        const width =
            document.documentElement.clientWidth;

        const height =
            document.documentElement.clientHeight;


        /*
            Margine di sicurezza.
        */

        const margin = 20;


        /*
            Dimensioni del pulsante.
        */

        const buttonWidth =
            button.width;

        const buttonHeight =
            button.height;


        /*
            Limiti massimi.
        */

        const maxLeft =
            Math.max(
                margin,
                width -
                buttonWidth -
                margin
            );


        const maxTop =
            Math.max(
                margin,
                height -
                buttonHeight -
                margin
            );


        /*
            Coordinate casuali.
        */

        let left =
            margin +
            Math.random() *
            Math.max(
                0,
                maxLeft - margin
            );


        let top =
            margin +
            Math.random() *
            Math.max(
                0,
                maxTop - margin
            );


        /*
            Primo controllo di sicurezza.
        */

        left =
            Math.max(
                margin,
                Math.min(
                    left,
                    maxLeft
                )
            );


        top =
            Math.max(
                margin,
                Math.min(
                    top,
                    maxTop
                )
            );


        /*
            Applichiamo la posizione.
        */

        noBtn.style.left =
            `${left}px`;

        noBtn.style.top =
            `${top}px`;


        /*
            CONTROLLO FINALE.

            Controlliamo la posizione reale
            dopo che il browser ha spostato
            il pulsante.
        */

        requestAnimationFrame(() => {

            const final =
                noBtn.getBoundingClientRect();


            let correctedLeft =
                left;

            let correctedTop =
                top;


            /*
                Controllo SINISTRA.
            */

            if (
                final.left <
                margin
            ) {

                correctedLeft +=
                    margin -
                    final.left;
            }


            /*
                Controllo DESTRA.
            */

            if (
                final.right >
                width - margin
            ) {

                correctedLeft -=
                    final.right -
                    (width - margin);
            }


            /*
                Controllo SOPRA.
            */

            if (
                final.top <
                margin
            ) {

                correctedTop +=
                    margin -
                    final.top;
            }


            /*
                Controllo SOTTO.
            */

            if (
                final.bottom >
                height - margin
            ) {

                correctedTop -=
                    final.bottom -
                    (height - margin);
            }


            /*
                Limite assoluto finale.
            */

            correctedLeft =
                Math.max(
                    margin,
                    Math.min(
                        correctedLeft,
                        width -
                        buttonWidth -
                        margin
                    )
                );


            correctedTop =
                Math.max(
                    margin,
                    Math.min(
                        correctedTop,
                        height -
                        buttonHeight -
                        margin
                    )
                );


            /*
                Posizione definitiva.
            */

            noBtn.style.left =
                `${correctedLeft}px`;

            noBtn.style.top =
                `${correctedTop}px`;
        });
    });
}


// =====================================================
// MOUSE - PC
// =====================================================

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


// =====================================================
// TOUCH - IPHONE / TABLET
// =====================================================

noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


// =====================================================
// CLICK DI SICUREZZA
// =====================================================

noBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveNoButton();

    }
);


// =====================================================
// PULSANTE SI
// =====================================================

yesBtn.addEventListener(
    "click",
    function () {

        card.style.display = "none";

        success.style.display = "flex";

        createHeartExplosion();
    }
);


// =====================================================
// CUORI DI SFONDO
// =====================================================

const heartTypes = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💓",
    "💘",
    "🌸",
    "🌷"
];


function createHeart() {

    const heart =
        document.createElement("div");


    heart.classList.add("heart");


    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];


    heart.style.left =
        `${Math.random() * 100}%`;


    heart.style.fontSize =
        `${14 + Math.random() * 25}px`;


    heart.style.animationDuration =
        `${6 + Math.random() * 6}s`;


    heart.style.animationDelay =
        `${Math.random()}s`;


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        () => {
            heart.remove();
        },
        13000
    );
}


// =====================================================
// CREAZIONE CONTINUA DEI CUORI
// =====================================================

setInterval(
    createHeart,
    450
);


// =====================================================
// ESPLOSIONE DOPO IL SI
// =====================================================

function createHeartExplosion() {

    const explosionTypes = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "💘",
        "🌸",
        "🌹",
        "🌷"
    ];


    for (
        let i = 0;
        i < 50;
        i++
    ) {

        setTimeout(
            () => {

                const heart =
                    document.createElement(
                        "div"
                    );


                heart.classList.add(
                    "heart"
                );


                heart.textContent =
                    explosionTypes[
                        Math.floor(
                            Math.random() *
                            explosionTypes.length
                        )
                    ];


                heart.style.left =
                    `${Math.random() * 100}%`;


                heart.style.bottom =
                    `${20 + Math.random() * 40}%`;


                heart.style.fontSize =
                    `${20 + Math.random() * 30}px`;


                heart.style.animationDuration =
                    `${2 + Math.random() * 3}s`;


                heartsContainer.appendChild(
                    heart
                );


                setTimeout(
                    () => {
                        heart.remove();
                    },
                    6000
                );

            },
            i * 45
        );
    }
}