/*
<div id="taoIconList">
    <p class="taoBkfst"><img src="">Complimentary Breakfast</p>
    <p class="taoWiFi"><img src="">Free High-Speed Internet</p>
    <p class="taoPrice"><img src="">Best Price Guaranteed</p>
</div>
*/

jQuery(document).ready(function () {

    jQuery("#taoIconList").insertAfter(jQuery(".sideColumn_callout").eq(0).find("address"));
    jQuery("#taoIconList").show();

});
