import { rainbowColors } from './const.js';

const boxes = document.querySelectorAll('.draggable-element');
let draggedElement = null;

function changeColors() {
  const features = document.querySelectorAll('.feature');

  [...features].forEach((box, index) => {
    const randomColor =
      rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    box.style.setProperty('background-color', randomColor, 'important');

    [...features][index] = box;
  });
}

boxes.forEach((box) => {
  box.addEventListener('dragstart', (e) => {
    draggedElement = e.target;
    e.target.classList.add('dragging');
  });

  box.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });

  box.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (e.target !== draggedElement) {
      e.target.classList.add('dragged-over');
    }
  });

  box.addEventListener('dragleave', (e) => {
    e.target.classList.remove('dragged-over');
  });

  box.addEventListener('drop', (e) => {
    e.preventDefault();
    e.target.classList.remove('dragged-over');

    const targetElement = e.target.closest('.draggable-element');
    if (targetElement && targetElement !== draggedElement) {
      let draggedIndex = [...boxes].indexOf(draggedElement);
      let targetIndex = [...boxes].indexOf(targetElement);

      [boxes[draggedIndex].innerHTML, boxes[targetIndex].innerHTML] = [
        boxes[targetIndex].innerHTML,
        boxes[draggedIndex].innerHTML,
      ];

      changeColors();
    }
  });
});
