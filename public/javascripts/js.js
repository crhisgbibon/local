'use strict';

const MENU_LIST = document.getElementById('MENU_LIST');
const MENU_INFO = document.getElementById('MENU_INFO');
const MENU_MANY = document.getElementById('MENU_MANY');
const MENU_TAGS = document.getElementById('MENU_TAGS');

const PLAYLIST = document.getElementById('PLAYLIST');

const TAGLIST = document.getElementById('TAGLIST');

const EDIT_SCREEN = document.getElementById('EDIT_SCREEN');
const EDIT_ID = document.getElementById('EDIT_ID');
const EDIT_FILE = document.getElementById('EDIT_FILE');
const EDIT_NAME = document.getElementById('EDIT_NAME');
const EDIT_TAGS = document.getElementById('EDIT_TAGS');
const EDIT_SUBMIT = document.getElementById('EDIT_SUBMIT');
const EDIT_CLOSE = document.getElementById('EDIT_CLOSE');

const ITEMS = document.getElementsByClassName('item');
const ITEMS_LENGTH = ITEMS.length;

const CONTROLS = document.getElementsByClassName('control');
const CONTROLS_LENGTH = CONTROLS.length;
const HOLDERS = document.getElementsByClassName('holder');
const HOLDERS_LENGTH = HOLDERS.length;

const NAMES = document.getElementsByClassName('name');
const NAMES_LENGTH = NAMES.length;

MENU_LIST.onclick = function() { TogglePanel(PLAYLIST); };
MENU_INFO.onclick = function() { ToggleHide(); };
MENU_MANY.onclick = function() { SwitchMany(); };
MENU_TAGS.onclick = function() { TogglePanel(TAGLIST); };

EDIT_CLOSE.onclick = function() { TogglePanel(EDIT_SCREEN); };

let many = 0;

TogglePanel(EDIT_SCREEN);
TogglePanel(PLAYLIST);
TogglePanel(TAGLIST);
AssignNames(NAMES);

function ToggleHide()
{
  if(CONTROLS_LENGTH !== HOLDERS_LENGTH) return;

  for(let i = 0; i < CONTROLS_LENGTH; i++)
  {
    if(CONTROLS[i].style.display === '')
    {
      CONTROLS[i].style.display = 'none';
      HOLDERS[i].style.maxHeight = '100%';
    }
    else
    {
      CONTROLS[i].style.display = '';
      HOLDERS[i].style.maxHeight = '75%';
    }
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
  let tags = JSON.parse(name.dataset.tags);
  if(EDIT_SCREEN.style.display === 'none') TogglePanel(EDIT_SCREEN);
  EDIT_ID.value = id;
  EDIT_FILE.value = fileLocation;
  EDIT_NAME.value = displayName;
  EDIT_TAGS.value = tags;
}

function SwitchMany()
{
  many++;
  if(many > 1) many = 0;
  for(let i = 0; i < ITEMS_LENGTH; i++)
  {
    if(many === 0)
    {
      ITEMS[i].style.height = '400px';
      ITEMS[i].style.width = '300px';
    }
    if(many === 1)
    {
      ITEMS[i].style.height = (window.innerHeight - 100) + 'px';
      ITEMS[i].style.width = window.innerWidth + 'px';
    }
  }
}

function Resize()
{
  if(many === 1)
  {
    for(let i = 0; i < ITEMS_LENGTH; i++)
    {
      ITEMS[i].style.height = (window.innerHeight - 100) + 'px';
      ITEMS[i].style.width = window.innerWidth + 'px';
    }
  }
}

window.addEventListener('resize', Resize);