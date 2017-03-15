var usernameEl = document.querySelector('#username');
var msgEl = document.querySelector('#msg');
var sendEl = document.querySelector('#send');

sendEl.addEventListener('click', function() {
  var username = usernameEl.value;
  var msg = msgEl.value;

  var body = JSON.stringify({
    msg: msg
  });

  fetch('/' + username + '/sendMsg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  }).then(function(res) {
    if(res.status === 201) {
      console.info('---- send success ----');
    }
  }).catch(function(error) {
    console.error(error);
  });
});

var recodesEl = document.querySelector('#recodes');
var evtSource = new EventSource('broadcast');
evtSource.addEventListener('broadcast', function(e) {
  var boradcast = JSON.parse(e.data).boradcast;
  var content = boradcast.reduce(function(memo, cur) {
    var time = cur.time;
    var username = cur.username;
    var msg = cur.msg;
    return memo + '<div>' + username + ' ' + time + '</div><p>' + ' ' + msg + '</p>';
  }, '');
  recodesEl.innerHTML = content;
});