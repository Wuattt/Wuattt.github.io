let resolveGameReady;
export const gameReady = new Promise ((resolve) => {
    resolveGameReady = resolve;
});

const readyState = {
    connected: false,
    firstStateReceived: false,
}

function checkReady() {
    const isReady = Object.values(readyState).every(Boolean);
    if (isReady) resolveGameReady();
    console.log(isReady);
}

export function markConnected () {
    readyState.connected = true;
    checkReady();
}

export function markFirstStateReceived () {
    readyState.firstStateReceived = true;
    checkReady();
}

