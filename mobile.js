// --- START OF FILE mobile.js ---

const centralText = document.getElementById('central-text');
const mobileTerminal = document.getElementById('mobile-terminal');
const terminalContent = document.getElementById('terminal-content');

// Funzione per scrivere effetto macchina da scrivere
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        // Aggiunge un blocco di caratteri alla volta per essere più veloce
        terminalContent.innerHTML += text.substring(i, i + 5); 
        // Scorre automaticamente verso il basso
        terminalContent.scrollTop = terminalContent.scrollHeight;
        setTimeout(function() {
            typeWriter(text, i + 5, fnCallback)
        }, 1); // Velocità di scrittura
    } else if (fnCallback) {
        fnCallback();
    }
}

function showMobileCV() {
    // Mostra il terminale
    mobileTerminal.classList.remove('hidden');
    terminalContent.innerHTML = "Initializing connection...\nLoading user data...\nACCESS GRANTED.\n\n";

    // Scarica il file CV
    fetch('cv.txt')
        .then(response => response.text())
        .then(data => {
            // Avvia l'effetto scrittura
            typeWriter(data, 0);
        })
        .catch(err => {
            terminalContent.innerHTML += "\n[ERROR] File not found.";
        });
}

function closeTerminal() {
    mobileTerminal.classList.add('hidden');
    terminalContent.innerHTML = ""; // Pulisce per la prossima volta
}

// Aggiunge l'evento di click/tap al testo centrale
centralText.addEventListener('click', () => {
    // Opzionale: controlla se è mobile, ma va bene anche per desktop come alternativa
    showMobileCV();
});
