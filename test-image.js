var google_image = require('google-image-query');

google_image.search("apple",10,function(url_list){

    console.log(url_list);

});
