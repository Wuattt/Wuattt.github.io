'use strict'
function openConsole () {
    if (!gameConsole.style.display || gameConsole.style.display == 'none') {
        gameConsole.style.display = 'grid';
        consoleIsOpen = true;
    }
}
function closeConsole () {
    if (gameConsole.style.display == 'grid') {
        gameConsole.style.display = 'none';
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
    input.before(usedCommand);
    switch (input.value) {
        case '/exit':
            closeConsole();
            break;
        case '/help':
            usedCommand = document.createElement('p');
            usedCommand.innerHTML = '/exit /help';
            usedCommand.style.color = 'green';
            input.before(usedCommand);
            break;
        default:
            if (isFlashFirst) {
                let unknownCommandException = document.createElement('p');
                unknownCommandException.innerHTML = 'Unknown command. Use "/help" to see the list of existing commands.';
                unknownCommandException.style.color = 'red';
                input.before(unknownCommandException);
            }
            break;
    }
    input.value = '';
});