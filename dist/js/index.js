"use strict";

document.querySelector('.menu-btn.open').addEventListener('click', function () {
  var menu = document.querySelector('.menu');
  changeClassesToOpened(menu, document.body);
  var closeBtn = document.querySelector('.menu-btn.close');
  closeBtn.addEventListener('click', function hide() {
    changeClassesToClosed(menu, document.body);
    this.removeEventListener('click', hide);
  });
});

function changeClassesToOpened(menu, body) {
  menu.classList.remove('menu-closed');
  menu.classList.add('menu-opened');
  body.classList.add('menu-open');
}

function changeClassesToClosed(menu, body) {
  menu.classList.remove('menu-opened');
  menu.classList.add('menu-closed');
  body.classList.remove('menu-open');
}