(function() {
  'use strict';

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render html.

          getJSON(e.target.result, function(err, data) {
            data.forEach((parent) => {
              build(parent)
            })



            function build (item) {
              if (item.hasOwnProperty('content')) {
                console.log('Even Further!');
                build(item.content)
              } else {
                console.log('YOU FOUND ME!');
              }
            }
            //for each item in the json file
            //if the item has a child/children
            // data.forEach((item) => {
            //   for (var key in item) {
            //     console.log(key);
            //   }
            // })







            // data.forEach((parent) => {
            //   var span = document.createElement('span');
            //   span.innerHTML = `<${parent.tag}><${parent.content.tag}>${parent.content.content}</${parent.content.tag}></${parent.tag}>`
            //   document.getElementById('list').insertBefore(span, null);
            // })

          });
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);



  var getJSON = function(url, callback) {
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

}());
