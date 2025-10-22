'use strict'
function openConsole () {
    if (!gameConsole.style.display || gameConsole.style.visibility == 'hidden') {
        gameConsole.style.display = 'grid';
        gameConsole.style.visibility = 'visible';
        consoleIsOpen = true;
    }
}
function closeConsole () {
    if (gameConsole.style.visibility == 'visible') {
        gameConsole.style.visibility = 'hidden';
        consoleIsOpen = false;
    }
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFlashFirst = /^\//g.test(input.value);
    let usedCommand = document.createElement('p');
    usedCommand.innerHTML = input.value;
    if (isFlashFirst) {
        usedCommand.style.color = 'gray';
    }
    usedCommand.style.visibility = 'visible';
    setTimeout(() => {
        usedCommand.style.visibility = 'inherit';
    }, 2000);
    input.before(usedCommand);
    switch (input.value) {
        case '/exit':
            closeConsole();
            break;
        case '/help':
            let commandList = document.createElement('p');
            commandList.innerHTML = '/exit /help';
            commandList.style.color = 'green';
            commandList.style.visibility = 'visible';
            setTimeout(() => {
                commandList.style.visibility = 'inherit';
            }, 2000);
            input.before(commandList);
            closeConsole();
            break;
        case '/possess':
            if (controlledEntity == dragon) {
                controlledEntity = cyclops;
            } else {
                controlledEntity = dragon;
            }
            closeConsole();
            break;
        default:
            if (isFlashFirst) {
                let unknownCommandException = document.createElement('p');
                unknownCommandException.innerHTML = 'Unknown command. Use "/help" to see the list of existing commands.';
                unknownCommandException.style.color = 'red';
                unknownCommandException.style.visibility = 'visible';
                setTimeout(() => {
                    unknownCommandException.style.visibility = 'inherit';
                }, 2000);
                input.before(unknownCommandException);
            }
            closeConsole();
            break;
    }
    input.value = '';
});