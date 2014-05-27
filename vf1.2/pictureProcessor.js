importScripts("tools.js");

self.onmessage = function (e) {
    var canvasData = e.data.data;
    var binaryData = canvasData.data;
    var f = e.data.process;
    var l = e.data.length;
    var index = e.data.index;

    if(f == 'red'){
    	filter.red(binaryData,l);
    }
    else if(f == 'green'){
    	filter.green(binaryData,l);
    }
    else if(f == 'blue'){
    	filter.blue(binaryData,l);
    }
    else if(f == 'normal'){
    	filter.normal(binaryData,l);
    }
    else if(f == 'yellow'){
    	filter.yellow(binaryData,l);
    }
    else if(f == 'orange'){
    	filter.orange(binaryData,l);
    }
    else if(f == 'purple'){
    	filter.purple(binaryData,l);
    }
    else if(f == 'sepia'){
    	filter.sepia(binaryData,l);
    }
    else if(f == 'subbright'){
    	filter.adjustBrightness(binaryData,l, -8);
    }
    else if(f == 'addbright'){
    	filter.adjustBrightness(binaryData,l, 8);
    }
    else if(f == 'subcontrast'){
    	filter.adjustContrast(binaryData,l, -6);
    }
    else if(f == 'addcontrast'){
    	filter.adjustContrast(binaryData,l, 6);
    }
    else {
    	alert("Oops!! Something Went Wrong");
    }

    self.postMessage({ result: canvasData, index: index });
};
