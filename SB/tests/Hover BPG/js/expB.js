jQuery("document").ready(function () {
    
    // Create a div and insert it under the Check Rates button
    jQuery("<div class='taoHoverBPG'><img src='../images/taoBrownCheck15x15.png' />Best Price Guarantee</div>").insertAfter(jQuery(".bookAnchor"));

    jQuery(".checkRates .bookAnchor").on("mouseover", function () {
        jQuery(this).closest(".row").find(".taoHoverBPG").show();
    });

    jQuery(".checkRates .bookAnchor").on("mouseout", function () {
        jQuery(this).closest(".row").find(".taoHoverBPG").hide();
    });

});
