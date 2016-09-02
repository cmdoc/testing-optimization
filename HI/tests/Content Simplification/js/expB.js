// Hide the hotel description
Bootstrapper.MVT.injectCSS(".row.hotelDesc { display: none; }");

// Hide the address, phone numbers, and distance information
Bootstrapper.MVT.injectCSS(".row.addressRow { display: none; }");
Bootstrapper.MVT.injectCSS(".row.phoneRow { display: none; }");
Bootstrapper.MVT.injectCSS(".row.distanceRow { display: none; }");

jQuery("document").ready(function(){

    // Click track functions
    jQuery(".detailsBtn").on("click", function () {
        mboxPixelTrack('mboxClickTrack', 'clicked=detailsClick');
    });

    jQuery(".mapsBtn").on("click", function () {
        mboxPixelTrack('mboxClickTrack', 'clicked=mapsClick');
    });

    jQuery(".photoViewerWrapper").on("click", function () {
        mboxPixelTrack('mboxClickTrack', 'clicked=galleryClick');
    });

});

///////////////////////////////////////////////////////////////////////////////
// F U N C T I O N S
function mboxPixelTrack(mbox) {
    // Code stolen from Adobe's Proactive Chat. This should track click events.
    var d = new Date();
    var ub = mboxFactoryDefault.getUrlBuilder().clone();
    ub.addParameter("mbox", mbox);
    ub.addParameter('mboxTime', d.getTime() - (d.getTimezoneOffset() * 60000));
    ub.addParameters(Array.prototype.slice.call(arguments).slice(1));
    var img = new Image();
    img.src = ub.buildUrl().replace("/mbox/undefined", "/mbox/ajax");
    img.style.display = "none";
    if (document.body) {
        document.body.insertBefore(img, document.body.firstChild);
    }
}