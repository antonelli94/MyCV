// Selettore dell'elemento di testo centrale
const textElement = document.getElementById('central-text');

// Le due frasi tra cui alternarsi
const phrase1 = "find my cv";
const phrase2 = "open console";

// Caratteri casuali per l'effetto "scramble"
const chars = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Funzione che applica l'effetto scramble e cambia il testo.
 * @param {string} newText - Il testo finale da visualizzare.
 */
function scrambleAndSetText(newText) {
    const originalText = textElement.textContent;
    const duration = 800; // Durata dello scramble in ms
    let startTime = null;

    textElement.classList.add('scrambling');
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;

        if (elapsedTime < duration) {
            let scrambledText = "";
            for (let i = 0; i < originalText.length; i++) {
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                scrambledText += randomChar;
            }
            textElement.textContent = scrambledText;
            textElement.setAttribute('data-text', scrambledText);
            
            requestAnimationFrame(animate);
        } else {
            textElement.textContent = newText;
            textElement.setAttribute('data-text', newText);
            textElement.classList.remove('scrambling');
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Funzione di loop con tempi asimmetrici.
 */
function startTextLoop() {
    let isShowingPhrase1 = true;

    const runNextStep = () => {
        const currentDuration = isShowingPhrase1 ? 5000 : 1000;
        const nextPhrase = isShowingPhrase1 ? phrase2 : phrase1;

        setTimeout(() => {
            scrambleAndSetText(nextPhrase);
            isShowingPhrase1 = !isShowingPhrase1;
            runNextStep();
        }, currentDuration);
    };

    runNextStep();
}

// Avvia il loop quando la pagina è pronta
startTextLoop();
