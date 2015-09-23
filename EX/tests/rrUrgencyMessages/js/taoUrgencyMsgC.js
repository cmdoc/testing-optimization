// Hide the current urgency message before doing any of the changes.
Bootstrapper.MVT.injectCSS("span.roomTypeDesc > div.urgentMsgCss { display:none; }");

jQuery(document).ready(function () {

    // Go through each of the targeted urgency messages and change their 
    // CSS classes to display them the way we want.
    jQuery("span.roomTypeDesc > div.urgentMsgCss").each(function () {
        jQuery(this).find("img").attr("class", "urgentMsgImg taoUrgencyClockGreen");
        jQuery(this).find("span").eq(0).attr("class", "taoUrgencyMsg taoGreen");
        jQuery(this).find("span").eq(1).addClass("taoUrgencyTextGreen");
    });

    // Now the changes are done, so show the new look
    jQuery("span.roomTypeDesc > div.urgentMsgCss").show();
});