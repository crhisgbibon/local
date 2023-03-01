'use strict';

const MENU = document.getElementById('MENU');
const MENU_HIDE = document.getElementById('MENU_HIDE');
const MENU2 = document.getElementById('MENU2');
const MENU_HIDE2 = document.getElementById('MENU_HIDE2');
const MENU_PLAY = document.getElementById('MENU_PLAY');
const MENU_LIST = document.getElementById('MENU_LIST');
const MENU_INFO = document.getElementById('MENU_INFO');
const MENU_MANY = document.getElementById('MENU_MANY');
const MENU_TAGS = document.getElementById('MENU_TAGS');
const SEARCH = document.getElementById('SEARCH');
const MENU_GET = document.getElementById('MENU_GET');
const MENU_CLEAR = document.getElementById('MENU_CLEAR');
const MENU_NEXT = document.getElementById('MENU_NEXT');

const PLAY_LIST = document.getElementById('PLAY_LIST');

const TAG_LIST = document.getElementById('TAG_LIST');

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

const BUTTONS = document.getElementsByClassName('button');
const BUTTONS_LENGTH = BUTTONS.length;

const SCREENS = [PLAY_LIST, TAG_LIST];

MENU_HIDE.onclick = function() { TogglePanel(MENU); ToggleHide(); };
MENU_HIDE2.onclick = function() { TogglePanel(MENU); ToggleHide(); };
MENU_PLAY.onclick = function() { PlayPause(); };
MENU_LIST.onclick = function() { SwitchPanel(SCREENS, 0); if(PLAY_LIST.style.display === '') PopulatePlaylist(); };
MENU_INFO.onclick = function() { ToggleInfo(); };
MENU_MANY.onclick = function() { SwitchMany(); };
MENU_TAGS.onclick = function() { SwitchPanel(SCREENS, 1); };
MENU_GET.onclick = function() { GetTags(); };
MENU_CLEAR.onclick = function() { ClearTags(); };
MENU_NEXT.onclick = function() { PickNext(); };

EDIT_CLOSE.onclick = function() { TogglePanel(EDIT_SCREEN); };

let many = 0;
let index = 0;
let play = false;

MENU.style.width = '100%';

TogglePanel(EDIT_SCREEN);
TogglePanel(PLAY_LIST);
TogglePanel(TAG_LIST);

AssignNames(NAMES);
AssignButtons(BUTTONS);

let playlist = [];
let current = undefined;
let interval = undefined;
let timer = 5;

function ToggleInfo()
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

function SwitchPanel(array, index)
{
  for(let i = 0; i < array.length; i++)
  {
    if(i === index) if(array[i].style.display === '') array[i].style.display = 'none'; else array[i].style.display = '';
    else array[i].style.display = 'none';
  }
}

function PopulatePlaylist()
{
  PLAY_LIST.innerHTML = '';
  if(playlist.length === 0) return;

  for(let i = 0; i < playlist.length; i++)
  {
    let index = playlist[i];
    let n = document.getElementById(index + 'name');
    let d = document.createElement('div');
    d.className = 'playlistDiv';

    let d1 = document.createElement('div');
    let b1 = document.createElement('button');
    let b2 = document.createElement('button');

    d1.innerHTML = n.dataset.displayname;
    b1.innerHTML = 'P';
    b2.innerHTML = 'R';

    d.appendChild(b1);
    d.appendChild(d1);
    d.appendChild(b2);

    PLAY_LIST.appendChild(d);
  }
}

function ToggleHide()
{
  if(document.body.style.paddingTop === '0px') document.body.style.paddingTop = '50px';
  else
  {
    document.body.style.paddingTop = '0px';
    if(current !== undefined)
    {
      current.scrollIntoView();
    }
  }
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

function AssignButtons()
{
  for(let i = 0; i < BUTTONS_LENGTH; i++)
  {
    BUTTONS[i].onclick = function() {
      AddToPlaylist(BUTTONS[i].dataset.id);
    };
  }
}

function AddToPlaylist(index)
{
  if(playlist.includes(index))
  {
    let i = playlist.indexOf(index);
    playlist.splice(i, 1);
    document.getElementById(index + 'button').innerHTML = '+';
  }
  else
  {
    playlist.push(index);
    document.getElementById(index + 'button').innerHTML = '-';
  }
}

function ToggleName(name)
{
  if(EDIT_SCREEN.style.display === '')
  {
    TogglePanel(EDIT_SCREEN);
    return;
  }
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
  if(many === 0)
  {
    MENU_MANY.innerHTML = 'One';
  }
  if(many === 1)
  {
    MENU_MANY.innerHTML = 'Many';
  }
  for(let i = 0; i < ITEMS_LENGTH; i++)
  {
    if(many === 0)
    {
      ITEMS[i].style.height = '300px';
      ITEMS[i].style.width = '400px';
      ITEMS[i].style.marginBottom = 0;
    }
    if(many === 1)
    {
      ITEMS[i].style.height = (window.innerHeight * 0.95) + 'px';
      ITEMS[i].style.width = (window.innerWidth * 0.95) + 'px';
      ITEMS[i].style.marginBottom = (window.innerWidth * 0.05) + 'px';
    }
  }
}

function PlayPause()
{
  play = !play;
  if(play)
  {
    MENU_PLAY.innerHTML = 'Pause';
    document.body.overflow = 'hidden';
  }
  else
  {
    MENU_PLAY.innerHTML = 'Play';
    document.body.overflow = 'auto';
  }
  PickOne();
}

function PickOne()
{
  if(playlist.length === 0) return;
  clearInterval(interval);
  if(play)
  {
    let r = Math.floor(Math.random() * playlist.length);
    let p = document.getElementById(playlist[r] + 'item');
    p.scrollIntoView();
    current = p;
    let c = document.getElementById(playlist[r] + 'content');
    if(c.className === 'video')
    {
      c.play();
      c.addEventListener('ended', PickOne, { once: true });
    }
    else if(c.className === 'image')
    {
      interval = setInterval(PickOne, timer * 1000);
    }
  }
}

function PickNext()
{
  clearInterval(interval);
  PickOne();
}

function Resize()
{
  if(many === 1)
  {
    for(let i = 0; i < ITEMS_LENGTH; i++)
    {
      ITEMS[i].style.height = (window.innerHeight * 0.95) + 'px';
      ITEMS[i].style.width = (window.innerWidth * 0.95) + 'px';
      ITEMS[i].style.marginBottom = (window.innerWidth * 0.05) + 'px';
    }
  }
  if(play && current !== undefined)
  {
    current.scrollIntoView();
  }
}

function GetTags()
{
  playlist.length = 0;
  let search = SEARCH.value;
  let tags = search.split(',')
  let TAGS_LENGTH = tags.length;

  for(let i = 0; i < TAGS_LENGTH; i++)
  {
    tags[i] = tags[i].trim();
    tags[i] = tags[i].toUpperCase();
  }

  for(let i = 0; i < NAMES_LENGTH; i++)
  {
    let json = JSON.parse(NAMES[i].dataset.tags);
    let JSON_LENGTH = json.length;
    for(let j = 0; j < JSON_LENGTH; j++)
    {
      json[j] = json[j].trim();
      json[j] = json[j].toUpperCase();
      if(tags.includes(json[j]))
      {
        if(!playlist.includes(NAMES[i].dataset.id)) playlist.push(NAMES[i].dataset.id);
      }
    }
  }
}

function ClearTags()
{
  SEARCH.value = '';
  playlist.length = 0;
}

window.addEventListener('resize', Resize);