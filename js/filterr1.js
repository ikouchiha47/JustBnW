var parentCanvas, parentContext, imageObj, parentBuffer, h, w, rgba, fileName;

function $(tagname, classname){
	if(!classname)
		return document.getElementsByTagName(tagname);
	if(!tagname || tagname == '')
		return document.getElementsByClassName(classname);

	return document.querySelectorAll(tagname + '.' + classname);

}

function init(imageObj){
	var ctx, i, data,image,
	    len = $('canvas').length;
	parentCanvas = $('canvas')[0];
	parentContext = parentCanvas.getContext('2d');
	if(!parentContext) alert("err");
	w = (imageObj.naturalWidth);
	h = (imageObj.naturalHeight);
	parentCanvas.width = w;
	parentCanvas.height = h;
	parentContext.drawImage(imageObj, 0, 0, w, h);
	parentBuffer = parentContext.getImageData(0, 0, w, h);
	image = document.getElementById("canvas");
	if(!image){
		image = document.createElement('img');
		image.id = "canvas";
	} 	
	image.src = parentCanvas.toDataURL("image/png");
	$('','container')[0].appendChild(image);
	//fit();
}

function fit(){
	document.getElementById("canvas").src = "";
	document.getElementById("canvas").src = parentCanvas.toDataURL("image/png");
}

function Utils () {}

Utils.prototype.monochrome = function (brgba, rwt, gwt, bwt) {
	var opr, scale;
        scale = 1 / (rwt + gwt + bwt);
	rwt *= scale;
	gwt *= scale;
	bwt *= scale;

	opr = (+brgba.r) * rwt + (+brgba.g) * gwt + (+brgba.b) * bwt ;;
	
	return opr;
};

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
	var opr, adjust = mag * charge;
	opr = {
		r : (brgba.r + adjust),
	    g : (brgba.g + adjust),
		b : (brgba.b + adjust),
		a : brgba.a
	};
	return opr;
	
};

Utils.prototype.adjustContrast = function (brgba, mag, charge) {
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

Utils.prototype.adjustGamma = function (brgba, mag, charge) {
	var opr, factor = Math.pow(mag ,charge) - 1;
	opr = {
		r : Math.pow(brgba.r, factor),
	    g : Math.pow(brgba.g, factor),
		b : Math.pow(brgba.b, factor),
		a : brgba.a
	};
	return opr;
};

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


//var filter;

function process (index) {
	var i, j, len, data, layer, ctxn, buffer, utils;

	//len = $('canvas').length;
	utils = new Utils();

	if (index != 9 && index != 10 && index != 11 && index !=12) {
		ctxn = utils.getParentContext();
	} else {
		ctxn = utils.getthisContext();
	}

	buffer = ctxn.getImageData(0, 0, w, h);
	data = buffer.data;

	for(i = 0; i < data.length; i += 4){
		rgba = {
			r : data[i],
			g : data[i+1],
			b : data[i+2],
			a : data[i+3]
		};
		window['Effects'][index](rgba);
		data[i] = rgba.r;
		data[i+1] = rgba.g;
		data[i+2] = rgba.b;
	}

	ctxn.putImageData(buffer, 0, 0);
	fit();
}

function saveAsBlob(blob) {
	var i=0, filename,
			storage = navigator.getDeviceStorage('pictures'), req;
    
    var generate = function(){
    	var rand = Math.floor(Math.random() * 100001);
    	filename = fileName + "-" + rand + ".png";
    };
    generate();
	req = storage.addNamed(blob, filename);
	req.onsuccess = function() {
		alert("saved to gallery!");
	};

	req.onerror = function(e) {
			saveAsBlob(blob);
	};
}

function saveImage() {
	var canvas, dataURL, blob,
	    ua = window.navigator.userAgent,
	    utils = new Utils();
	canvas = utils.getthisCanvas();
	dataURL = canvas.toDataURL("image/png");

	if (ua.indexOf("Chrome") >= 0) {
		var link = document.createElement('a');
		link.download = "test.png";
		link.href = dataURL.replace("image/png", "image/octet-stream");
		link.click();
	} else if(ua.indexOf("Mozilla") >= 0) {
		blob = new Blob([dataURL], {type : "image/png"});
		canvas.toBlob( function(blob) {
			saveAsBlob(blob);
		}, "image/png");
	}
	else {
		document.location.href = dataURL;
	}
}


function handleSelect (evt) {
	imageObj = new Image();
	imageObj.addEventListener('load', function (){
		if(parentContext) {
			parentContext.clearRect(0, 0, w, h);
		}
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
	var file = evt.target.files[0];
	fileName = file.name;
	fileName = fileName.substring(0, fileName.lastIndexOf("."));
	imageObj.src = URL.createObjectURL(file);
}

function hide_seek(closenode, opennode, collapsenode) {
	var p;
	document.getElementById(closenode).onclick = function() { 
		p = document.getElementById(collapsenode); 
		p.removeAttribute('class');
		p.setAttribute('class','inactive'); 
	};

	document.getElementById(opennode).onclick = function() {
		p = document.getElementById(collapsenode);
		p.removeAttribute('class');
		p.setAttribute('class','active');
	};

}

($('body')[0]).onload = function () {
	if (!window.File) {
		alert("File Upload not Supported");
	} else {
		var fSelect = document.getElementById("files1");
		fSelect.addEventListener('change', handleSelect, false);
	}
	document.getElementById('upbutton').onclick = function() {
		document.getElementById('files1').click();
	}

	var p = document.getElementsByClassName('filters');
	for(var i = 0; i < p.length; i += 1){
		(function(_i){
			(document.getElementById(p[_i].id)).onclick = function(){
			       process(p[_i].id.toString());
			};
		})(i);
	}
	hide_seek('close', 'open', 'collapse');

};