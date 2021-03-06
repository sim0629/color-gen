/* Color Generator */

var ColorGenerator = function() {
    var self = this;

    this.base = 3;
    this.offset = 0;
    this.saturation = 0.8;
    this.value = 0.95;

    var getHueFromInt = function(n) {
        var base = self.base;
        var hue = self.offset;
        var v = 1;
        while(n > 0) {
            v = v / base;
            hue = hue + v * (n % base);
            n = parseInt(n / base);
        }
        while(hue < 0) hue = hue + 1;
        while(hue >= 1) hue = hue - 1;
        return hue;
    };

    var getHexString = function(n) {
        return ("00" + n.toString(16)).slice(-2);
    };

    var getColorFromRGB = function(r, g, b) {
        var fragments = [
            "#",
            getHexString(r),
            getHexString(g),
            getHexString(b)
        ];
        return fragments.join("");
    };

    var getColorFromHue = function(hue) {
        var h = hue * 6;

        var f = h - parseInt(h);
        var s = self.saturation;
        var v = self.value * 255;

        var x = parseInt(v);
        var y = parseInt(v * (1 - s));
        var z = parseInt(v * (1 - f * s));
        var w = parseInt(v * (1 - (1 - f) * s));

        switch(parseInt(h) % 6) {
            case 0:
                return getColorFromRGB(x, w, y);
            case 1:
                return getColorFromRGB(z, x, y);
            case 2:
                return getColorFromRGB(y, x, w);
            case 3:
                return getColorFromRGB(y, z, x);
            case 4:
                return getColorFromRGB(w, y, x);
            case 5:
                return getColorFromRGB(x, y, z);
        }
        return undefined;
    };

    this.FromInt = function(n) {
        n = parseInt(n);
        if(isNaN(n) || n < 0) return null;
        return getColorFromHue(getHueFromInt(n));
    };
};
