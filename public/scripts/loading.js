let resolveGameReady;
export const gameReady = new Promise ((resolve) => {
    resolveGameReady = resolve;
});

export const readyState = {
    connected: false,
    firstStateReceived: false,
}

function checkReady() {
    const isReady = Object.values(readyState).every(Boolean);
    if (isReady) resolveGameReady();
}

export function markConnected () {
    readyState.connected = true;
    checkReady();
}

let resolveFirstStateReceived;
export const FirstStateReceived = new Promise ((resolve) => {
    resolveFirstStateReceived = resolve;
});

export function markFirstStateReceived () {
    readyState.firstStateReceived = true;
    resolveFirstStateReceived();
    checkReady();
}

