jQuery(document).ready(function () {

    // remove the ugly checkmark
    jQuery(".reserveNowMsgImgDiv").remove();

    // create a var to store the new html
    var taoCheck = '<svg class="taoCheckStyles"><use xlink:href="#taoCheckMark" /></svg>';
    var taoNewMsg = jQuery("<span>ALL ROOMS INCLUDE" + taoCheck + "Complimentary Breakfast" + taoCheck + "Free High-Speed Internet" + taoCheck + "Best Price Guarantee</span>");

    // replace the text with the new copy
    jQuery(".reserveNowMsgTextDiv").html(taoNewMsg);

});

