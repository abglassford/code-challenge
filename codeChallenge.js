(function() {
  'use strict';

  function handleFileSelect(evt) {
    var files = evt.target.files;
    var span = document.createElement('span');
    var reader = new FileReader();
    for (var i = 0, f; f = files[i]; i++) {
      reader.onload = (function(file) {
        return function(e) {
          getJSON(e.target.result, function(err, data) {
            data.forEach((element) => {
              span.innerHTML += build(element)
            })
             document.getElementById('list').insertBefore(span, null);
          });
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
}());
//create html out of json object
function build(element) {
  if (Array.isArray(element.content)) {
    var htmlArr = [];
    element.content.forEach((item) => htmlArr.push(build(item)))
    return htmlArr.join('')
  }
  if (typeof(element.content) === 'string'){
    return `<${element.tag}>${element.content}</${element.tag}>`
    build(element.content)
  } else {
    return `<${element.tag}>${build(element.content)}</${element.tag}>`
  }
}
//convert file to json object
function getJSON (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    var status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  xhr.send();
};
