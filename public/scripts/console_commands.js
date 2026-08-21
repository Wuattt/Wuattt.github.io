 'use strict'
import { gameConsole, form, input } from './DOM_variables.js';
import { socket } from './multiplayer.js';


 export let isConsoleOpen = false;
 export let isControlPanelOpen = true;

 export function openConsole () {
     if (!gameConsole.style.display || gameConsole.style.visibility === 'hidden') {
         gameConsole.style.visibility = 'visible';
         isConsoleOpen = true;
     }
 }
 export function closeConsole () {
     if (gameConsole.style.visibility === 'visible') {
         gameConsole.style.visibility = 'hidden';
         isConsoleOpen = false;
     }
 }


  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value !== '') {
          socket.emit('chatmessage', input.value);
          let isSlashFirst = /^\//g.test(input.value);
          let usedCommand = document.createElement('p');
          usedCommand.innerHTML = input.value;
          if (isSlashFirst) {
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
                  commandList.innerHTML = '/exit /help /possess /reset /heal';
                  commandList.style.color = 'green';
                  commandList.style.visibility = 'visible';
                  setTimeout(() => {
                      commandList.style.visibility = 'inherit';
                  }, 2000);
                  input.before(commandList);
                  break;/*
              case '/possess':
                  if (controlledEntity == dragon) {
                      controlledEntity = cyclops;
                  } else {
                      controlledEntity = dragon;
                  }
                  break;
              case '/reset':
                  dragon.x = 450;
                  dragon.y = 322;
                  dragon.deg = 90;
                  cyclops.x = 650;
                  cyclops.y = 322;
                  cyclops.deg = 270;
                  break;
              case '/heal':
                  entitiesListGet().forEach((entity) => {
                      if (!entity.isDead) {
                          entity.energy = entity.maxEnergy;
                          entity.health = entity.maxHealth;
                      }
                  })
                  break;*/
              default:
                  if (isSlashFirst) {
                      let unknownCommandException = document.createElement('p');
                      unknownCommandException.innerHTML = 'Unknown command. Use "/help" to see the list of existing commands.';
                      unknownCommandException.style.color = 'red';
                      unknownCommandException.style.visibility = 'visible';
                      setTimeout(() => {
                          unknownCommandException.style.visibility = 'inherit';
                      }, 2000);
                      input.before(unknownCommandException);
              }
      }}
      closeConsole()
      input.value = '';
  });