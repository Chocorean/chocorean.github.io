function updateStatus(id, status) {
  // find the td node with given id in plain js
  var td = document.getElementById(id);
  // set the status in the inner html
  td.innerHTML = status ? "✅" : "❌";

}

function serviceStatus(name, link, expected) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', link, true);
  xhr.timeout = 5000;
  xhr.onreadystatechange = function () {
    // when xhr is done
    if (xhr.readyState == 4) {
      updateStatus(name, xhr.status == expected);
    }
  };
  xhr.ontimeout = function () {
    console.error('The request for ' + link + ' timed out.');
    updateStatus(name, false);
  };
  xhr.onerror = function () {
    console.error('The request for ' + link + ' failed.');
    updateStatus(name, false);
  }
  xhr.send();
}