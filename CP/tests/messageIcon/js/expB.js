// Hide the old form before doing any of the changes.
Bootstrapper.MVT.injectCSS("#reserveNowMsg { display:none; }");

jQuery(document).ready(function () {

    // Find the #reserveNowMsg DIV and insert the image for this
    // experience after it
    jQuery('#reserveNowMsg').after('<img id="taoReserveNowImg" src="https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/cp/en/us/roomsrates/taoUrgMsgIconLockCPExpB.png" alt="Reserve now to ensure you get this low price. Rooms are limited." border="0" />')

});
