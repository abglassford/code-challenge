(function() {
  'use strict';
    console.log('hello');

  if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log('success!');
  // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

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
            data.forEach((thing) => {
              var span = document.createElement('span');
              span.innerHTML = `<${thing.tag}"> ${thing.content.content} </${thing.tag}>`
              document.getElementById('list').insertBefore(span, null);
            })

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
