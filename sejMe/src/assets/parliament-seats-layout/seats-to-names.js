var members = [];
var seatToMember = {};
var currentSeat = 34;
var emptySeatKey = 'e';
var problemSeatKey = 'p';
var skippedSeats = [];

function getAllMemberNames() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.sejm.gov.pl/sejm/term10/MP', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      members = JSON.parse(xhr.responseText);
      console.log('Members fetched', members);
      prepareListeners();
    }
  };
  xhr.send();
}

function start() {
  getAllMemberNames();
}

function prepareListeners() {
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('keyup', onKeyup);
}

function onMouseUp(e) {
  let name = e.target.innerText;
  let member = getMemberByName(members, name);
  console.log('Trying from clicked element', name, member);
  if (!member && window.getSelection) {
    name = window.getSelection().toString();
    console.log('Trying from document selection', name, member);
    member = getMemberByName(members, name);
  }
  if (member) {
    seatToMember[currentSeat] = member.firstLastName;
    currentSeat++;
    e.target.remove();
  }
}

function onKeyup(e) {
  console.log(e.key);
  if (e.key === emptySeatKey) {
    skippedSeats.push({ num: currentSeat, reason: 'empty' });
    console.log('Skipping because empty', currentSeat);
    seatToMember[currentSeat++] = '';
  } else if (e.key === problemSeatKey) {
    skippedSeats.push({ num: currentSeat, reason: 'problem' });
    console.log('Skipping because problem', currentSeat);
    seatToMember[currentSeat++] = '';
  }
}

function getMemberByName(members, name) {
  name = name.trim();
  return (
    members.find(member => {
      const lastName = member.lastName.trim();
      const firstLetter = member.firstName[0];
      return lastName === name || `${firstLetter}. ${lastName}` === name;
    }) || null
  );
}

start();
