$present = document.querySelector('.present');
$snapAnimation = document.querySelector('#snap-animation');
$greeting = document.querySelector('.greeting');
$buttonContainer = document.querySelector('.button-container');
$reset = document.querySelector('.reset');
$start = document.querySelector('.start');
$snowflakes = document.querySelector('.snowflakes');

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
  const snapUrl = getQueryParam('snapUrl');
  const fromStr = getQueryParam('from');
  const toStr = getQueryParam('to');
  if (snapUrl){
    $snapAnimation.src = snapUrl.replace('&editMode=true', '').replace('&editMode', '') + '&noRun&hideControls';
  }

  let message = "You got a present";
  if (fromStr) {
    message += ' from ' + fromStr;
  }
  if (toStr) {
    message = 'Hey ' + toStr + ', ' + message;
  }
  message += '!';
  $greeting.textContent = message;
}

start();
$reset.addEventListener('click', function() {
  window.location.reload();
});
$start.addEventListener('click', function() {
  startSnap()
});

$present.classList.add('visible');
$present.addEventListener('click', function(e) {
  setTimeout(function() {
    console.log('Hiding gift, Showing snap!');
    $present.classList.add('hidden');
    $present.classList.remove('visible');

    $snowflakes.classList.add('visible');
    $snowflakes.classList.remove('hidden');

    console.log('Starting Snap!');
    $snapAnimation.classList.add('visible');
    $snapAnimation.classList.remove('hidden');

    setTimeout(function() {
      startSnap();
    }, 1000);

    setTimeout(function() {
      $buttonContainer.classList.add('visible');
      $buttonContainer.classList.remove('hidden');
    }, 3000);
  }, 2000);
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