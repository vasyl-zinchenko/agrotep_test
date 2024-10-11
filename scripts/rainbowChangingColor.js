import { fetchTitle } from './api.js';
import { rainbowColors } from './const.js';

const actionButton = document.querySelector('.call-action');
const title = document.querySelector('.title');
const textElement = document.querySelector('.text');

let currentColor = '';
let textHidden = false;

const hideTextElement = () => {
  return new Promise((resolve) => {
    const height = textElement.scrollHeight;
    textElement.style.height = `${height}px`;
    textElement.classList.add('fade-out');
    textElement.style.transition = '0.3s';

    setTimeout(() => {
      textElement.style.height = '0';
      resolve();
    }, 500);
  });
};

const showTitleText = (newTitle) => {
  title.style.opacity = '0';
  setTimeout(() => {
    title.textContent = newTitle;
    title.style.opacity = '1';
  }, 500);
};

actionButton.addEventListener('click', async () => {
  const newTitle = await fetchTitle();

  let randomColor;
  do {
    randomColor =
      rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  } while (randomColor === currentColor);

  actionButton.style.backgroundColor = randomColor;
  actionButton.style.border = `1px solid ${randomColor}`;

  currentColor = randomColor;

  if (!textHidden) {
    await hideTextElement();
    textHidden = true;
  }
  showTitleText(newTitle);
});
