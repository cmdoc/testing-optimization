/*
<div id="taoIconList">
    <p class="taoBkfst"><img src="">Complimentary Breakfast</p>
    <p class="taoWiFi"><img src="">Free High-Speed Internet</p>
    <p class="taoPrice"><img src="">Best Price Guaranteed</p>
</div>
*/

Bootstrapper.MVT.injectCSS("#LIRGGuestInfoLeftNav { display:none; }");

jQuery(document).ready(function () {

    jQuery("#LIRGGuestInfoLeftNav").replaceWith(jQuery("#taoIconList"));
    jQuery("#taoIconList").show();

});
