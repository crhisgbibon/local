'use strict';

function CalculateVh()
{
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

window.addEventListener('DOMContentLoaded', CalculateVh);
window.addEventListener('resize', CalculateVh);
window.addEventListener('orientationchange', CalculateVh);

const MENU = document.getElementById('MENU');
const MENU_HIDE = document.getElementById('MENU_HIDE');
const MENU2 = document.getElementById('MENU2');
const MENU_HIDE2 = document.getElementById('MENU_HIDE2');
const MENU_PLAY = document.getElementById('MENU_PLAY');
const MENU_LIST = document.getElementById('MENU_LIST');
const MENU_TAGS = document.getElementById('MENU_TAGS');
const SEARCH = document.getElementById('SEARCH');
const MENU_GET = document.getElementById('MENU_GET');
const MENU_CLEAR = document.getElementById('MENU_CLEAR');

const MENU_MIN = document.getElementById('MENU_MIN');
const MENU_NEXT = document.getElementById('MENU_NEXT');
const MENU_LOOP = document.getElementById('MENU_LOOP');
const MENU_RANDOM = document.getElementById('MENU_RANDOM');
const MENU_MUTE = document.getElementById('MENU_MUTE');
const MENU_LIST2 = document.getElementById('MENU_LIST2');
const MENU_TIMER = document.getElementById('MENU_TIMER');
const MENU_NAME = document.getElementById('MENU_NAME');

const TAG_LIST = document.getElementById('TAG_LIST');

const PLAY_LIST = document.getElementById('PLAY_LIST');
const PLAY_WINDOW = document.getElementById('PLAY_WINDOW');

const EDIT_SCREEN = document.getElementById('EDIT_SCREEN');
const EDIT_HOLDER = document.getElementById('EDIT_HOLDER');
const EDIT_ID = document.getElementById('EDIT_ID');
const EDIT_ADD = document.getElementById('EDIT_ADD');
const EDIT_LAST = document.getElementById('EDIT_LAST');
const EDIT_NEXT = document.getElementById('EDIT_NEXT');
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

const ADDTAGS = document.getElementsByClassName('tagAdd');
const ADDTAGS_LENGTH = ADDTAGS.length;
const REMOVETAGS = document.getElementsByClassName('tagRemove');
const REMOVETAGS_LENGTH = REMOVETAGS.length;

const SCREENS = [PLAY_LIST, TAG_LIST];

MENU_PLAY.onclick = function() { PlayPause(); };
MENU_HIDE.onclick = function() { TogglePanel(MENU); ToggleHide(); };
MENU_LIST.onclick = function() { SwitchPanel(SCREENS, 0); if(PLAY_LIST.style.display === '') PopulatePlaylist(); };
MENU_TAGS.onclick = function() { SwitchPanel(SCREENS, 1); };
MENU_GET.onclick = function() { GetTags(); };
MENU_CLEAR.onclick = function() { ClearTags(); };

MENU_MIN.onclick = function() { MinMode(); };
MENU_HIDE2.onclick = function() { TogglePanel(MENU); ToggleHide(); };
MENU_NEXT.onclick = function() { PickNext(); };
MENU_LOOP.onclick = function() { ToggleLoop(); };
MENU_RANDOM.onclick = function() { ToggleRandom(); };
MENU_MUTE.onclick = function() { ToggleMute(); };
MENU_LIST2.onclick = function() { SwitchPanel(SCREENS, 0); if(PLAY_LIST.style.display === '') PopulatePlaylist(); };


EDIT_LAST.onclick = function() { EditLast(); };
EDIT_NEXT.onclick = function() { EditNext(); };
EDIT_CLOSE.onclick = function() { TogglePanel(EDIT_SCREEN); };

let many = 0;
let index = 0;
let play = false;
let loop = false;
let random = true;
let mute = false;
let last = undefined;
MENU_RANDOM.style.backgroundColor = 'var(--highlight)';

MENU.style.width = '100%';

TogglePanel(EDIT_SCREEN);
TogglePanel(TAG_LIST);
TogglePanel(PLAY_LIST);
TogglePanel(PLAY_WINDOW);

AssignNames(NAMES);
AssignButtons(BUTTONS);
AssignRemove(REMOVETAGS);
AssignAdd(ADDTAGS);

let playlist = [];
let interval = undefined;

function TogglePanel(panel)
{
  if(typeof(panel) === 'string') panel = document.getElementById(panel);
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
    d.id = index + 'playlistDiv';

    let d1 = document.createElement('div');
    let d2 = document.createElement('div');
    let b1 = document.createElement('button');
    let b2 = document.createElement('button');

    d1.innerHTML = n.dataset.displayname;
    d2.innerHTML = JSON.parse(n.dataset.tags);
    b1.innerHTML = 'P';
    b1.onclick = function() { PickThis(index); };
    b2.innerHTML = 'R';
    b2.onclick = function() { RemoveThis(index); };

    d.appendChild(b1);
    d.appendChild(d1);
    d.appendChild(d2);
    d.appendChild(b2);

    PLAY_LIST.appendChild(d);
  }

  let d = document.createElement('div');
  d.id = 'tagManagerDiv';

  let i1 = document.createElement('input');
  i1.type = 'text';
  i1.id = 'tagManager';
  let b1 = document.createElement('button');
  b1.innerHTML = '-';
  b1.onclick = function() { RemoveTag(); };
  let b2 = document.createElement('button');
  b2.innerHTML = '+';
  b2.onclick = function() { AddTag(); };

  d.appendChild(b1);
  d.appendChild(i1);
  d.appendChild(b2);

  PLAY_LIST.appendChild(d);
}

function AddTag()
{
  let len = playlist.length;
  if(len === 0) return;
  let tag = document.getElementById('tagManager').value;
  if(tag === '') return;
  let send = [];
  for(let i = 0; i < len; i++)
  {
    let n = document.getElementById(playlist[i] + 'name');
    let t = document.getElementById(playlist[i] + 'tag');
    let oldTags = JSON.parse(n.dataset.tags);
    if(!oldTags.includes(tag))
    {
      oldTags.push(tag);
      let newTags = JSON.stringify(oldTags);
      n.dataset.tags = newTags;
      t.innerHTML = JSON.parse(newTags);
      send.push(JSON.stringify([playlist[i], newTags]));
    }
  }
  send = JSON.stringify(send);
  $.ajax(
  {
    method: "POST",
    url: "/updatetag",
    data:
    {
      send:send
    },
    success:function(result)
    {
      PopulatePlaylist();
    },
    error:function(result)
    {
      PopulatePlaylist();
    }
  });
}

function RemoveTag()
{
  let len = playlist.length;
  if(len === 0) return;
  let tag = document.getElementById('tagManager').value;
  if(tag === '') return;
  let send = [];
  for(let i = 0; i < len; i++)
  {
    let n = document.getElementById(playlist[i] + 'name');
    let t = document.getElementById(playlist[i] + 'tag');
    let oldTags = JSON.parse(n.dataset.tags);
    let iO = oldTags.indexOf(tag);
    if(oldTags[iO] === tag)
    {
      oldTags.splice(iO, 1);
      let newTags = JSON.stringify(oldTags);
      n.dataset.tags = newTags;
      t.innerHTML = JSON.parse(newTags);
      send.push(JSON.stringify([playlist[i], newTags]));
    }
  }
  send = JSON.stringify(send);
  $.ajax(
  {
    method: "POST",
    url: "/updatetag",
    data:
    {
      send:send
    },
    success:function(result)
    {
      PopulatePlaylist();
    },
    error:function(result)
    {
      PopulatePlaylist();
    }
  });
}

function MinMode()
{
  let tohide = document.getElementsByClassName('tohide');
  if(tohide.length === 0) return;
  let len = tohide.length;
  if(tohide[0].style.display === '')
  {
    for(let i = 0; i < len; i++)
    {
      tohide[i].style.display = 'none';
    }
  }
  else
  {
    for(let i = 0; i < len; i++)
    {
      tohide[i].style.display = '';
    }
  }
}

function ToggleHide()
{
  if(document.body.style.paddingTop === '0px')
  {
    document.body.style.paddingTop = '50px';
    document.documentElement.style.setProperty('--play_window_top', 'calc(var(--vh) * 7.5)');
    document.documentElement.style.setProperty('--play_window_height', 'calc(var(--vh) * 92.5)');
  }
  else
  {
    document.body.style.paddingTop = '0px';
    document.documentElement.style.setProperty('--play_window_top', '0');
    document.documentElement.style.setProperty('--play_window_height', 'calc(var(--vh) * 100)');
  }
}

function ToggleLoop()
{
  loop = !loop;
  if(loop) MENU_LOOP.style.backgroundColor = 'var(--highlight)';
  else MENU_LOOP.style.backgroundColor = 'var(--front)';
}

function ToggleRandom()
{
  random = !random;
  if(random) MENU_RANDOM.style.backgroundColor = 'var(--highlight)';
  else MENU_RANDOM.style.backgroundColor = 'var(--front)';
}

function ToggleMute()
{
  mute = !mute;
  if(mute) MENU_MUTE.style.backgroundColor = 'var(--highlight)';
  else MENU_MUTE.style.backgroundColor = 'var(--front)';

  let video = document.getElementById('activevideoplayer');
  if(video !== null)
  {
    if(mute) video.muted = true;
    else video.muted = false;
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

function AssignAdd()
{
  for(let i = 0; i < ADDTAGS_LENGTH; i++)
  {
    ADDTAGS[i].onclick = function() {
      AddToTags(ADDTAGS[i].dataset.tag);
    };
  }
}

function AssignRemove()
{
  for(let i = 0; i < REMOVETAGS_LENGTH; i++)
  {
    REMOVETAGS[i].onclick = function() {
      RemoveFromTags(REMOVETAGS[i].dataset.tag);
    };
  }
}

function AddToTags(tagToAdd)
{
  let tags = [];
  if(SEARCH.value !== null) tags = SEARCH.value.split(',');
  if(!tags.includes(tagToAdd)) tags.push(tagToAdd);
  if(tags[0] === '') tags.splice(0, 1);
  SEARCH.value = tags;
}

function RemoveFromTags(tagToRemove)
{
  let tags = SEARCH.value.split(',');
  if(tags.includes(tagToRemove))
  {
    let iO = tags.indexOf(tagToRemove);
    tags.splice(iO, 1);
  }
  if(tags[0] === '') tags.splice(0, 1);
  SEARCH.value = tags;
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
  PopulatePlaylist();
}

function ToggleName(name)
{
  if(EDIT_SCREEN.style.display === 'none')
  {
    TogglePanel(EDIT_SCREEN);
  }
  EDIT_HOLDER.innerHTML = '';
  let id = name.dataset.id;
  let fileLocation = name.dataset.filelocation;
  let fileType = name.dataset.filetype;
  let displayName = name.dataset.displayname;
  let tags = [];
  if(name.dataset.tags !== undefined) tags = JSON.parse(name.dataset.tags);

  if(playlist.includes(id))
  {
    EDIT_ADD.innerHTML = '-';
  }
  else
  {
    EDIT_ADD.innerHTML = '+';
  }

  EDIT_ADD.onclick = function() {

    AddToPlaylist(id);

    if(playlist.includes(id))
    {
      EDIT_ADD.innerHTML = '-';
    }
    else
    {
      EDIT_ADD.innerHTML = '+';
    }

  };

  if(fileType === 'image')
  {
    EDIT_HOLDER.innerHTML = `
      <img class='holder' src=" ` + ('/images/' + fileLocation) + `" '>
    `;
  }
  else if(fileType === 'video')
  {
    EDIT_HOLDER.innerHTML = `
      <video class='holder' controls src=" ` + ('/videos/' + fileLocation) + `" '>
    `;
  }
  if(EDIT_SCREEN.style.display === 'none') TogglePanel(EDIT_SCREEN);
  EDIT_ID.value = id;
  EDIT_FILE.value = fileLocation;
  EDIT_NAME.value = displayName;
  EDIT_TAGS.value = tags;
}

function EditNext()
{
  let id = EDIT_ID.value;
  id++;
  if(id >= NAMES_LENGTH) id = 1;
  EDIT_ID.value = id;
  let newName = document.getElementById(id + 'name');
  if(newName !== null)
  {
    ToggleName(newName);
  }
}

function EditLast()
{
  let id = EDIT_ID.value;
  id--;
  if(id < 1) id = NAMES_LENGTH - 1;
  EDIT_ID.value = id;
  let newName = document.getElementById(id + 'name');
  if(newName !== null)
  {
    ToggleName(newName);
  }
}

function PlayPause()
{
  play = !play;
  if(play)
  {
    MENU_PLAY.innerHTML = 'Pause';
    PLAY_WINDOW.style.display = '';
  }
  else
  {
    MENU_PLAY.innerHTML = 'Play';
    PLAY_WINDOW.style.display = 'none';
  }
  PickOne();
}

function PickThis(id)
{
  let iO = 0;
  if(playlist.includes(id))
  {
    iO = playlist.indexOf(id);
    last = iO;
  }
  else last = 0;
  TogglePanel(PLAY_LIST);
  PlayThis(iO);
  if(!play)
  {
    play = true;
    MENU_PLAY.innerHTML = 'Pause';
    PLAY_WINDOW.style.display = '';
  }
}

function RemoveThis(id)
{
  let i = playlist.indexOf(id);
  playlist.splice(i, 1);
  let el = document.getElementById(id + 'playlistDiv');
  if(el !== null) PLAY_LIST.removeChild(el);
}

function PickOne()
{
  if(playlist.length === 0) return;
  if(play)
  {
    let i = undefined;
    if(loop)
    {
      if(last === undefined)
      {
        i = 0;
        last = i;
      }
      else
      {
        i = last;
      }
    }
    else
    {
      if(random)
      {
        i = Math.floor(Math.random() * playlist.length);
        last = i;
      }
      else
      {
        if(last === undefined)
        {
          i = 0;
          last = i;
        }
        else
        {
          i = parseInt(last) + 1;
          if(i >= playlist.length) i = 0;
          last = i;
        }
      }
    }
    PlayThis(i);
  }
}

function PlayThis(i)
{
  PLAY_WINDOW.innerHTML = '';
  MENU_NAME.innerHTML = '';
  clearInterval(interval);
  let n = document.getElementById(playlist[i] + 'name');
  let fileType = n.dataset.filetype;
  let fileLocation = n.dataset.filelocation;
  let displayName = n.dataset.displayname;

  MENU_NAME.innerHTML = displayName;

  if(fileType === 'image')
  {
    let image = document.createElement('img');
    image.src = '/images/' + fileLocation;
    PLAY_WINDOW.appendChild(image);
    let timer = MENU_TIMER.value;
    if(timer < 1) timer = 1;
    interval = setInterval(PickOne, (timer * 1000));
  }

  if(fileType === 'video')
  {  
    let video = document.createElement('video');
    video.controls = true;
    video.id = 'activevideoplayer';
    video.src = '/videos/' + fileLocation;
    if(mute) video.muted = true;
    video.play();
    video.addEventListener('ended', PickOne, { once: true });
    PLAY_WINDOW.appendChild(video);
  }
}

function PickNext()
{
  clearInterval(interval);
  PickOne();
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
  PLAY_LIST.innerHTML = '';
}