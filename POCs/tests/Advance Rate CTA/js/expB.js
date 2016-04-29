// Hide the current urgency message before doing any of the changes.
Bootstrapper.MVT.injectCSS("#taoCTA { display:none; }");

jQuery(document).ready(function () {

    // Take the #taoCTA <div> and place it in the right spot
    var $taoCTA = jQuery("#taoCTA").detach();
    $taoCTA.appendTo(".hero-section .tile-image")

    // Now that it's in the right spot, show it
    jQuery("#taoCTA").show();
});