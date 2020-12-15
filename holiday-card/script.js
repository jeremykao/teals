$present = document.querySelector('.present');
$snapAnimation = document.querySelector('#snap-animation');
$greeting = document.querySelector('.greeting');
$reset = document.querySelector('.reset');

function sendMessage(apiMethod, params = []) {
  $snapAnimation.contentWindow.postMessage(
    { selector: apiMethod, params: params },
    '*'
  );
}

function startSnap() {
  console.log('Clicked Green Flag');
  sendMessage('broadcast', ['__shout__go__']);
}

function start() {
  const snapUrl = getQueryParam('snapUrl').replace('&editMode=true', '').replace('&editMode', '');
  const fromStr = getQueryParam('from');
  const toStr = getQueryParam('to');
  $snapAnimation.src = snapUrl + '&noRun&hideControls';

  let message = "You got a present";
  if (fromStr) {
    message += 'from ' + fromStr;
  }
  if (toStr) {
    message = 'Hey ' + toStr + ', ' + message;
  }
  $greeting.textContent = message;
}

start();
$reset.addEventListener('click', function() {
  window.location.reload();
});

$present.classList.add('visible');
$present.addEventListener('touchend', function(e) {
  console.log('Hiding gift, Showing snap!');
  this.classList.add('hidden');
  this.classList.remove('visible');

  $snapAnimation.classList.remove('hidden');
  $snapAnimation.classList.add('visible');

  setTimeout(function() {
    console.log('Starting Snap!');
    startSnap();
  }, 1000);

  setTimeout(function() {
    console.log('Showing Reset button');
    $reset.classList.add('visible');
    $reset.classList.remove('hidden');
  }, 3000);
});

function getQueryParam(qp) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == qp) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query param %s not found', qp);
}