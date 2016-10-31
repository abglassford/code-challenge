(function() {
  'use strict';

  function handleFileSelect(evt) {
    var files = evt.target.files;
    var span = document.createElement('span');
    var reader = new FileReader();
    for (var i = 0, f; f = files[i]; i++) {
      reader.onload = (function(file) {
        return function(e) {
          $.getJSON(e.target.result, function(data) {
            data.forEach((element) => {
              span.innerHTML += build(element)
            })
             $('#list').empty().append(span);
          });
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
  $('#files').on('change', handleFileSelect);
}());

//create html out of json object
function build(element) {
  if (Array.isArray(element.content)) {
    var htmlArr = [];
    element.content.forEach((item) => htmlArr.push(build(item)))
    return `<${element.tag}>${htmlArr.join('')}</${element.tag}>`
  } else if (typeof(element.content) == 'string'){
    return `<${element.tag}>${element.content}</${element.tag}>`
  } else {
    return `<${element.tag}>${build(element.content)}</${element.tag}>`
  }
}
