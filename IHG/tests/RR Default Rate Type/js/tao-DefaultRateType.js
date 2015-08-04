// Grab the current URL and put it into a string for evaluation
var taoLocation = window.location.toString();
debugger;

// See if the sortby=Rate Type is already in the URL.  If not, then hide the
// page, change the sortby value to Rate Type, and replace this page with the
// right one.
if (taoLocation.indexOf("qRRSrt=rc") < 0) {

    Bootstrapper.MVT.injectCSS("body { display:none; }");

    var taoNewLocation = taoLocation.replace("qRRSrt=rt", "qRRSrt=rc");
    window.location.replace(taoNewLocation);

}


// window.location = trackingJson.urlType + '://' + document.location.host + document.location.pathname + '/map' + document.location.search;

