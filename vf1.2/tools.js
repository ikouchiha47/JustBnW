
function Filters() {}

Filters.prototype.colorscale = function(rwt, gwt, bwt) {
        var opr, scale;
        scale = 1 / (rwt + gwt + bwt);
        this.rwt = rwt * scale;
        this.gwt = gwt * scale;
        this.bwt = bwt * scale;

};

Filters.prototype.colorDistance = function(scale, dest, src) {
    return (scale * dest + (1 - scale) * src);
};

Filters.prototype.noise =function() {
    return Math.random() * 0.5 + 0.5;
}

Filters.prototype.red = function (binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var r = binaryData[i];
        binaryData[i] = r;
        binaryData[i + 1] = r;
        binaryData[i + 2] = r;
    }
};

Filters.prototype.blue = function (binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var b = binaryData[i + 2];
        binaryData[i] = b;
        binaryData[i + 1] = b;
        binaryData[i + 2] = b;
    }
};

Filters.prototype.green = function (binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var g = binaryData[i + 1];
        binaryData[i] = g;
        binaryData[i + 1] = g;
        binaryData[i + 2] = g;
    }
};

Filters.prototype.orange = function (binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var res = 0.65*binaryData[i]+ 0.35 * binaryData[i + 1];
        binaryData[i] = res;
        binaryData[i + 1] = res;
        binaryData[i + 2] = res;
    }
}

Filters.prototype.normal = function (binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var res = 0.34*binaryData[i]+ 0.32 * binaryData[i + 1]+ 0.34*binaryData[i+2];
        binaryData[i] = res;
        binaryData[i + 1] = res;
        binaryData[i + 2] = res;
    }
}

Filters.prototype.yellow = function (binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var res = 0.5*binaryData[i]+ 0.5 * binaryData[i + 1];
        binaryData[i] = res;
        binaryData[i + 1] = res;
        binaryData[i + 2] = res;
    }
}

Filters.prototype.purple = function (binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var res = 0.5*binaryData[i]+ 0.5 * binaryData[i + 2];
        binaryData[i] = res;
        binaryData[i + 1] = res;
        binaryData[i + 2] = res;
    }
};

Filters.prototype.adjustBrightness = function(binaryData, l, mag) {
    for(var i = 0; i < l; i += 4) {
        binaryData[i] = binaryData[i] + mag;
        binaryData[i+1] = binaryData[i+1] + mag;
        binaryData[i+2] = binaryData[i+2] +mag;
    }
};

Filters.prototype.adjustContrast = function(binaryData, l, mag) {
    var factor = (259 * (mag + 255)) / (255 * (259 + mag));
    for(var i = 0; i < l; i += 4) {
        binaryData[i] = factor * (binaryData[i] - 128) + 128;
        binaryData[i+1] = factor* (binaryData[i+1] - 128) + 128;
        binaryData[i+2] = factor* (binaryData[i+2] - 128) + 128;
    }
};

Filters.prototype.sepia = function(binaryData, l){
    for(var i = 0; i < l; i += 4){
        var r = binaryData[i],g = binaryData[i + 1],
            b = binaryData[i + 2];

        binaryData[i] = this.colorDistance(this.noise(), (r * 0.393) + (g * 0.769) + (b * 0.189), r);
        binaryData[i + 1] = this.colorDistance(this.noise(), (r * 0.349) + (g * 0.686) + (b * 0.168), g);
        binaryData[i + 2] = this.colorDistance(this.noise(), (r * 0.272) + (g * 0.534) + (b * 0.131), b);
    }
};

var filter = new Filters();
