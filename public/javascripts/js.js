'use strict';

const MENU_LIST = document.getElementById('MENU_LIST');
const MENU_HIDE = document.getElementById('MENU_HIDE');
const MENU_MANY = document.getElementById('MENU_MANY');

const PLAYLIST = document.getElementById('PLAYLIST');

const EDIT_SCREEN = document.getElementById('EDIT_SCREEN');
const EDIT_ID = document.getElementById('EDIT_ID');
const EDIT_FILE = document.getElementById('EDIT_FILE');
const EDIT_NAME = document.getElementById('EDIT_NAME');
const EDIT_TAGS = document.getElementById('EDIT_TAGS');
const EDIT_SUBMIT = document.getElementById('EDIT_SUBMIT');
const EDIT_CLOSE = document.getElementById('EDIT_CLOSE');

const CONTROLS = document.getElementsByClassName('control');
const CONTROLS_LENGTH = CONTROLS.length;

const NAMES = document.getElementsByClassName('name');
const NAMES_LENGTH = NAMES.length;

MENU_HIDE.onclick = function() { ToggleHide(); };
MENU_LIST.onclick = function() { TogglePanel(PLAYLIST); };
EDIT_CLOSE.onclick = function() { TogglePanel(EDIT_SCREEN); };

TogglePanel(EDIT_SCREEN);
TogglePanel(PLAYLIST);
AssignNames(NAMES);

function ToggleHide()
{
  for(let i = 0; i < CONTROLS_LENGTH; i++)
  {
    if(CONTROLS[i].style.display === '') CONTROLS[i].style.display = 'none';
    else CONTROLS[i].style.display = '';
  }
}

function TogglePanel(panel)
{
  if(panel.style.display === '') panel.style.display = 'none';
  else panel.style.display = '';
}

function AssignNames()
{
  for(let i = 0; i < NAMES_LENGTH; i++)
  {
    NAMES[i].onclick = function() {
      ToggleName(NAMES[i]);
    };
  }
}

function ToggleName(name)
{
  let id = name.dataset.id;
  let fileLocation = name.dataset.filelocation;
  let displayName = name.dataset.displayname;
  let tags = name.dataset.tags;
  if(EDIT_SCREEN.style.display === 'none') TogglePanel(EDIT_SCREEN);
  EDIT_ID.value = id;
  EDIT_FILE.value = fileLocation;
  EDIT_NAME.value = displayName;
  EDIT_TAGS.value = tags;
}