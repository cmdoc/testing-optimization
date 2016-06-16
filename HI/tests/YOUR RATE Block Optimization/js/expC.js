jQuery(document).ready(function () {

    // Find all of the crossed out (old) prices in the YOUR RATE blocks
    // and remove them.
    jQuery("div#memberExclusivePriceInfoArea span.priceBefore").remove();

    // Find all of the existing "Member Discount" DIVs and remove them
    jQuery("div#memberExclusivePriceInfoArea div.breakfastLabel").remove();

    // Insert new "MEMBER DISCOUNT" span
    jQuery("div.memberRateTypeLineItemRight").prepend("<span class='taoMemberDiscount'>member discount</span>");

    // Insert new text div for wording in grey box
    jQuery("div.memberRateTypeLineItemRight .rateSelectionArea").append("<div class='taoGreyBoxText'><span class='taoGreyBoxTextBold'>Not a member yet?</span><br />Choose this great rate and<br /><span class='taoGreyBoxTextMango'>join for free</span> while you book.</div>");

});
