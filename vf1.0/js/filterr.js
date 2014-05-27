var parentCanvas, imageObj, parentBuffer, h, w, rgba, caches = { b: 0, c: 0};

function $(tagname, classname){
	if(!classname)
		return document.getElementsByTagName(tagname);
	if(!tagname || tagname == '')
		return document.getElementsByClassName(classname);

	return document.querySelectorAll(tagname + '.' + classname);

}

//draw the selected inamge on canvas

function init(imageObj){
	var ctx, i, data,
	    len = $('canvas').length;
	
	/*if (len > 1) {
		for(i = 0; i < len - 1; i +=1)
			$('div','container')[0].removeChild($('canvas')[len - 1]);
<<<<<<< HEAD
	}
=======
	}*/
>>>>>>> 317f6caee593b93dad39e0c6af18941e7ead2f7a

	parentCanvas = $('canvas')[0];
	ctx = parentCanvas.getContext('2d');

	w = (imageObj.naturalWidth < 500) ? imageObj.naturalWidth : 500;
	h = Math.round(imageObj.naturalHeight * (w/ imageObj.naturalWidth));
	parentCanvas.setAttribute('width',w);
	parentCanvas.setAttribute('height',h);
	
	ctx.drawImage(imageObj, 0, 0, w, h);
	parentBuffer = ctx.getImageData(0, 0, w, h);
	
}

//for adding new layers. One canvas on top of another
//Not currently used. Reserved for later
function Layer() {
	this.c = document.createElement('canvas');
	this.c.width = w;
	this.c.height = h;
}

<<<<<<< HEAD
Layer.prototype.newLayer = function() {
=======
Layer.prototype.newLayer = function() { //append a newly created canvas element
>>>>>>> 317f6caee593b93dad39e0c6af18941e7ead2f7a
	var len = $('canvas').length;
	this.c.id = len;
	$('div','container')[0].appendChild(this.c);
};

<<<<<<< HEAD
Layer.prototype.copyParent = function() {
=======
Layer.prototype.copyParent = function() { //copy the original image for the new canvas maybe
>>>>>>> 317f6caee593b93dad39e0c6af18941e7ead2f7a
	var len = $('canvas').length,
	    ctx2 = $('canvas')[len-1].getContext('2d');
	ctx2.drawImage(imageObj, 0, 0, w, h);
	return ctx2;
};

<<<<<<< HEAD
Layer.prototype.copyCurrent = function() {
=======
Layer.prototype.copyCurrent = function() { // copy the current image of the visible topmost canvas
>>>>>>> 317f6caee593b93dad39e0c6af18941e7ead2f7a
	var len = $('canvas').length,
	    prevCanvas = $('canvas')[len-2],
	    ctx2 = $('canvas')[len-1].getContext('2d');
	ctx2.drawImage(prevCanvas, 0, 0);
	return ctx2;
};

//Utility library.
function Utils () {}


Utils.prototype.getthisCanvas = function () {//get the canvas object for the topmost canvas visible to user
	var len = $('canvas').length;
	return $('canvas')[len-1];
};

Utils.prototype.getthisContext = function() { //get th context of the topmost canvas
	var len = $('canvas').length,
	    ctx2 = $('canvas')[len - 1].getContext('2d');
	return ctx2;
};

Utils.prototype.getParentContext = function() { //get the context of the original image uploaded
	var ct = parentCanvas.getContext('2d');
	ct.drawImage(imageObj,0, 0, w, h); // before returning the parent context the original image is drawn on topmost canvas
	return ct;
};	

Utils.prototype.monochrome = function (brgba, rwt, gwt, bwt) { //conerting the image to single color
	var opr, scale;
        scale = 1 / (rwt + gwt + bwt);
	rwt *= scale;
	gwt *= scale;
	bwt *= scale;

	opr = parseInt(brgba.r) * rwt + parseInt(brgba.g) * gwt + parseInt(brgba.b) * bwt ;
	
	return opr;
};

<<<<<<< HEAD
Utils.prototype.getthisCanvas = function () {
	var len = $('canvas').length;
	return $('canvas')[len-1];
};

Utils.prototype.getthisContext = function() {
	var len = $('canvas').length,
	    ctx2 = $('canvas')[len - 1].getContext('2d');
	return ctx2;
};

Utils.prototype.getParentContext = function() {
	var ct = parentCanvas.getContext('2d');
	ct.drawImage(imageObj,0, 0, w, h);
	return ct;
};	

Utils.prototype.adjustBrightness = function (brgba, mag, charge) {
=======
Utils.prototype.adjustBrightness = function (brgba, mag, charge) { //adjust the brightness
	//charge can be +ve or -ve. i.e increase or decrease
	//mag is the magnitude of adjustment
>>>>>>> 317f6caee593b93dad39e0c6af18941e7ead2f7a
	var opr, adjust = mag * charge;
	opr = {
		r : (brgba.r + adjust),
	        g : (brgba.g + adjust),
		b : (brgba.b + adjust),
		a : brgba.a
	};
	return opr;
	
};

Utils.prototype.adjustContrast = function (brgba, mag, charge) { //ajus the contrast
	var opr, adjust = mag * charge,
	    factor = (259 * (adjust + 255)) / (255 * (259 - adjust));
	opr = {
		r : (factor * (brgba.r   - 128) + 128),
	        g : (factor * (brgba.g   - 128) + 128),
		b : (factor * (brgba.b   - 128) + 128),
		a : brgba.a
	};
	return opr;
};

Utils.prototype.adjustGamma = function (brgba, mag, charge) { //adjust the whiteness. resered for later
	var opr, factor = Math.pow(mag ,charge) - 1;
	opr = {
		r : Math.pow(brgba.r, factor),
	        g : Math.pow(brgba.g, factor),
		b : Math.pow(brgba.b, factor),
		a : brgba.a
	};
	return opr;
};

Utils.prototype.vigenette = function (brgba, mag, charge) { //make a radial white gradient
//reserved for later
};


//applying different lens filter
//the chrome of the image is adjusted and a rgba object a=is returned for each pixel
//is called from process()
var Effects = {
	'1' : function redfilterbw (brgba) {
		var utils = new Utils();
		var res = utils.monochrome(brgba, 1, 0, 0);
		rgba = {
			r : res,
			g : res,
			b : res,
			a : brgba.a
		};
	},

	'2' : function bluefilterbw(brgba) {
		var utils = new Utils();
		var res = utils.monochrome(brgba, 0, 0, 1);
		rgba = {
			r : res,
			g : res,
			b : res,
			a : brgba.a
		};
	},

	'3' : function greenfilterbw (brgba) {
		var utils = new Utils();
		var res = utils.monochrome(brgba, 0, 1, 0);
		rgba = {
			r : res,
			g : res,
			b : res,
			a : brgba.a
		};
	},

	'4' : function simplebw(brgba){
		var utils = new Utils();
		var res = utils.monochrome(brgba, 2, 1, 1);
		rgba = {
			r : res,
			g : res,
			b : res,
			a : brgba.a
		};
	},

	'5' : function composite1 (brgba) {
		var utils = new Utils();
		var res = utils.monochrome(brgba, 5, 1, 4);
		rgba = {
			r : res,
			g : res,
			b : res,
			a : brgba.a
		};
	},
	'6' : function orangebw (brgba) {
		var utils = new Utils();
		var res = utils.monochrome(brgba, 1, 1, 0);
		rgba = {
			r : res,
			g : res,
			b : res,
			a : brgba.a
		};
		
	},
	'7' : function orangebw (brgba) {
		var utils = new Utils();
		var res = utils.monochrome(brgba, 2, 1, 0);
		rgba = {
			r : res,
			g : res,
			b : res,
			a : brgba.a
		};
		
	},
	'8' : function purplebw (brgba) {
		var utils = new Utils();
		var res = utils.monochrome(brgba, 1, 0, 1);
		rgba = {
			r : res,
			g : res,
			b : res,
			a : brgba.a
		};
		
	},
	'9' : function subbrightness(brgba) {
		var utils = new Utils();
		var res = utils.adjustBrightness(brgba,8,-1);
		rgba = {
			r : res.r,
			g : res.g,
			b : res.b,
			a : brgba.a
		};
	},
	'10' : function addbrightness(brgba) {
		var utils = new Utils();
		var res = utils.adjustBrightness(brgba,8,1);
		rgba = {
			r : res.r,
			g : res.g,
			b : res.b,
			a : brgba.a
		};
	},
	'11' : function subcontrast(brgba) {
		var utils = new Utils();
		var res = utils.adjustContrast(brgba,5,-1);
		rgba = {
			r : res.r,
			g : res.g,
			b : res.b,
			a : brgba.a
		};
	},
	'12' : function addcontrast(brgba) {
		var utils = new Utils();
		var res = utils.adjustContrast(brgba,5,1);
		rgba = {
			r : res.r,
			g : res.g,
			b : res.b,
			a : brgba.a
		};
	}

};



//main function that calls the specific functions for manipulaating each pixel on image
function process (index) {
	var i, j, len, data, layer, ctxn, buffer, utils;

	len = $('canvas').length;
	utils = new Utils();
	
	//if the user clicks on brightness or contrast adjustment, get the current Context
	//otherwise get the original image context
	
	if (index != 9 && index != 10 && index != 11 && index !=12) {
		/*if(len > 2)
		  $('div','container')[0].removeChild($('canvas')[len - 1]);
		  layer = new Layer();
		  layer.newLayer();*/

		ctxn = utils.getParentContext();
	} else {
		ctxn = utils.getthisContext();
	}

	buffer = ctxn.getImageData(0, 0, w, h);
	data = buffer.data; //get buffered image array containing pixel information 

	for(i = 0; i < data.length; i += 4){ //seperate the rgba values and manipulate them
		rgba = {
			r : data[i],
			g : data[i+1],
			b : data[i+2],
			a : data[i+3]
		};
		window['Effects'][index](rgba); //translates to Effects[id](parameters)
		//put the new data back. rba has been declared global. Some the last change made are reflected here
		data[i] = parseInt(rgba.r);
		data[i+1] = parseInt(rgba.g);
		data[i+2] = parseInt(rgba.b);
	}

	ctxn.putImageData(buffer, 0, 0); //put back the new buffer to display the new image
}

function saveImage() { //save the image to local disk
	var canvas, dataURL,
	    ua = window.navigator.userAgent,
	    utils = new Utils();

	canvas = utils.getthisCanvas();
	dataURL = canvas.toDataURL("image/png");
	
	//if its chrome initiate a download else open the image in browser seperately
	
	if (ua.indexOf("Chrome") > 0) {
		var link = document.createElement('a');
		link.download = "test.png";
		link.href = dataURL.replace("image/png", "image/octet-stream");
		link.click();
	} else {
		document.link.href = dataURL.replace("image/png", "image/octet-stream");
		/*var link = document.createElement('a');
		link.download = "test.png";
		link.href = dataURL;
		document.getElementById('dlink').appendChild(link);
		link.click();*/
	}
}


function handleSelect (evt) {
	imageObj = new Image();
	imageObj.addEventListener('load', function (){
		init(imageObj);
		var save = document.getElementById('save');
		save.onclick = saveImage;
	}, false);
	imageObj.addEventListener('change', function (){
		init(imageObj);
		var save = document.getElementById('save');
		save.onclick = saveImage;
	}, false);
	imageObj.crossOrigin = 'Anonymous';
	imageObj.src = URL.createObjectURL(evt.target.files[0]);
}


($('body')[0]).onload = function () {
	if (!window.File) {
		alert("File Upload not Supported");
	} else {
		var fSelect = document.getElementById("files1");
		fSelect.addEventListener('change', handleSelect, false);
	}
	var p = document.getElementsByClassName('filters');
	for(var i = 0; i < p.length; i += 1){
		(function(_i){
			(document.getElementById(p[_i].id)).onclick = function(){
			       process(p[_i].id.toString());
			};
		})(i);
	}

};




