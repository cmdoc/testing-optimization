jQuery(document).ready(function () {

    // Create the HTML nodes
    var taoContainer = jQuery('<div id="taoGeoramaCallout"></div>');
    var taoMap = jQuery('<div id="taoGeoramaMap"><a href="http://www.ihg.com/hotels/us/en/global/reservations/maps"><img src="images/Geo-world-mini.jpg" /></a></div>');
    var taoCTA = jQuery('<div id="taoGeoramaCTA"></div>');
    var taoHeader = jQuery('<h3>Explore Hotels by Map or Interest</h3>');
    var taoText = jQuery("<p>IHG's interactive map makes it easy to find the perfect accommodations the world over. Whether you dream of strolling on the white sand beaches of a tropical isle or want to hike through an exotic rain forest, IHG has a property nearby.</p>");
    var taoButtons = jQuery('<button id="taoSearchByMap">Search by Map</button><button id="taoSearchByInterest">Search by Interest</button>');

    // Put the nodes into the right positions
    jQuery(taoHeader).appendTo(taoCTA);
    jQuery(taoText).appendTo(taoCTA);
    jQuery(taoButtons).appendTo(taoCTA);
    jQuery(taoMap).appendTo(taoContainer);
    jQuery(taoCTA).appendTo(taoContainer);
    jQuery(taoContainer).insertBefore('#ourbrands');

    // Click actions for buttons
    jQuery("#taoSearchByMap").on("click", function() {
        window.location.href = "http://www.ihg.com/hotels/us/en/global/reservations/maps";
    });

    jQuery("#taoSearchByInterest").on("click", function() {
        window.location.href = "http://www.ihg.com/hotels/us/en/global/reservations/maps";
    });

});