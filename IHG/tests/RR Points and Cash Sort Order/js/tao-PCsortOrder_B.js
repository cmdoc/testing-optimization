jQuery(document).ready(function () {

    // Grab all of the .rewardRate <div>s, loop through them, and 
    // change the order of the radio buttons
    jQuery(".rewardRate").each(function () {
        var taoRadioCount = jQuery(this).children("div").length;
        var taoRadio1 = jQuery(this).children("div").eq(0);
        var taoRadio2 = jQuery(this).children("div").eq(1);
        var taoRadio3 = jQuery(this).children("div").eq(2);
        var taoNewOrder = "";

        // If there are any radio button options, then re-arrange their order.
        // If the third item doesn't exist, then don't include it.
        if (taoRadioCount > 0) {
            if (taoRadio3.html() != undefined) {
                taoNewOrder = "<div>" + taoRadio1.html() + "</div><div>" + taoRadio3.html() + "</div><div>" + taoRadio2.html() + "</div>";
            } else {
                taoNewOrder = "<div>" + taoRadio1.html() + "</div><div>" + taoRadio2.html() + "</div>";
            }

            jQuery(this).html(taoNewOrder);
        }

    });

});