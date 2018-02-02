var tesseract = require('node-tesseract');

// Recognize text of any language in any format
tesseract.process(__dirname + '/images/anaelle-ocr.png',function(err, text) {
	if(err) {
		console.error(err);
	} else {
		console.log(text);
	}
});

// Recognize German text in a single uniform block of text and set the binary path
/*
var options = {
	l: 'deu',
	psm: 6,
	binary: '/usr/local/bin/tesseract'
// };*/
// tesseract.process(__dirname + '/images/ocr-test.png', options, function(err, text) {
// 	if(err) {
// 		console.error(err);
// 	} else {
// 		console.log(text);
// 	}
// });
