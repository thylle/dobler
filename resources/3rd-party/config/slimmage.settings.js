window.slimmage = {
    verbose: false,
    tryWebP: false,
    maxWidth: 2048,
    widthStep: 160,
    jpegQuality: 90,
    jpegRetinaQuality: 80,
    webpTimeout: 0,
    adjustImageParameters: function (data) {
        var idealSize = data.width * data.dpr;
        // For custom sizes, add the images width to this array
        if ([123, 456, 789].indexOf(idealSize) !== -1) {
            data.requestedWidth = idealSize;
        }
    }
};