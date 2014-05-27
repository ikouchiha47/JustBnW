"use strict";

var imageObj, processor, parentCanvas, parentContext,
    secondCanvas, secondContext, len, log, fileName;

function $(name){
    if(name.substring(0,1) == '.'){
        return document.getElementsByClassName(name.substring(1));
    }
    else if(name.substring(0,1) == '#'){
        return document.getElementById(name.substring(1));
    }
    else {
        return document.querySelectorAll(name);
    }
}


    function init(imageObj){
        parentCanvas = $('#source');
        parentCanvas.width = imageObj.naturalWidth;
        parentCanvas.height = imageObj.naturalHeight;

        if (!parentCanvas.getContext) {
            alert("Canvas not supported. Please install a HTML5 compatible browser.");
            return;
        }

        parentContext = parentCanvas.getContext("2d");
        len = parentCanvas.width * parentCanvas.height * 4;

        parentContext.drawImage(imageObj, 0, 0, parentCanvas.width, parentCanvas.height);  
        secondCanvas = $('#target');
        secondCanvas.width = parentCanvas.width;
        secondCanvas.height = parentCanvas.height;
        secondContext = secondCanvas.getContext('2d');    
    }

    function imageProcess (canvas, tempContext) {
        var start = new Date().getTime();
        var workersCount = (canvas.width > 1280)? 3 : 5;
        var finished = 0;
        var segmentLength = len / workersCount;
        var blockSize = canvas.height / workersCount;


        var onWorkEnded = function (e) {
            var canvasData = e.data.result;
            var index = e.data.index;

            secondContext.putImageData(canvasData, 0, blockSize * index);

            finished++;

            if (finished == workersCount) {
                worker.terminate();
                var diff = new Date().getTime() - start;
                log.innerHTML = diff + " ms";
            }
        };

        for (var index = 0; index < workersCount; index++) {
            var worker = new Worker("pictureProcessor.js");
            worker.onmessage = onWorkEnded;

            var canvasData = tempContext.getImageData(0, blockSize * index, canvas.width, blockSize);
            worker.postMessage({ data: canvasData, index: index, length: segmentLength, process : processor });
        }

    };
    
    function saveAsBlob(blob) {
    var i=0, filename,
            storage = navigator.getDeviceStorage('pictures'), req;
    
    var generate = function(){
        var rand = Math.floor(Math.random() * 100001);
        filename = fileName + "-" + rand + ".png";
    };
    generate();
    req = storage.addNamed(blob, filename);
    alert(filename);
    req.onsuccess = function() {
        alert("saved to gallery!");
    };

    req.onerror = function(e) {
            saveAsBlob(blob);
    };
}


function saveImage() {
    var canvas, dataURL, blob,
        ua = window.navigator.userAgent;
    canvas = secondCanvas;
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
        window.open(dataURL);
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

$('#red').onclick = function(){
    if(parentCanvas){
        processor = 'red';
       imageProcess(parentCanvas,parentContext);
    } else {
        alert("Choose an Image!!");
    }
};

$('#green').onclick = function(){
    if(parentCanvas){
        processor = 'green';
        imageProcess(parentCanvas,parentContext);
    } else {
        alert("Choose an Image!!");
    }
};

$('#blue').onclick = function(){
    if(parentCanvas){
        processor = 'blue';
       imageProcess(parentCanvas,parentContext);
   } else {
        alert("Choose an Image!!");
    }
};

$('#normal').onclick = function(){
    if(parentCanvas){
        processor = 'normal';
        imageProcess(parentCanvas,parentContext);
    } else {
        alert("Choose an Image!!");
    }
};

$('#orange').onclick = function(){
    if(parentCanvas){
        processor = 'orange';
        imageProcess(parentCanvas,parentContext);
    } else {
        alert("Choose an Image!!");
    }
};

$('#yellow').onclick = function(){
    if(parentCanvas){
        processor = 'yellow';
        imageProcess(parentCanvas,parentContext);
    } else {
        alert("Choose an Image!!");
    }
};

$('#purple').onclick = function(){
    if(parentCanvas){
        processor = 'purple';
        imageProcess(parentCanvas,parentContext);
    } else {
        alert("Choose an Image!!");
    }

};

$('#sepia').onclick = function(){
    if(parentCanvas){
        processor = 'sepia';
        imageProcess(secondCanvas,secondContext);
    } else {
        alert("Choose an Image!!");
    }

};

$('#9').onclick = function(){
    if(parentCanvas){
        processor = "subbright";
        imageProcess(secondCanvas,secondContext);
    } else {
        alert("Choose an Image!!");
    }
};

$('#10').onclick = function(){
    if(parentCanvas){
        processor = "addbright";
        imageProcess(secondCanvas,secondContext);
    } else {
        alert("Choose an Image!!");
    }
};

$('#11').onclick = function(){
    if(parentCanvas){
        processor = "subcontrast";
        imageProcess(secondCanvas,secondContext);
    } else {
        alert("Choose an Image!!");
    }
};

$('#12').onclick = function(){
    if(parentCanvas){
        processor = "addcontrast";
        imageProcess(secondCanvas,secondContext);
    } else {
        alert("Choose an Image!!");
    }
};


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
    hide_seek('close', 'open', 'collapse');
    log = $('#log');
};

