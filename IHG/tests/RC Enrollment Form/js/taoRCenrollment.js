jQuery(document).ready(function () {

    // Remove the H2 text that says 'Terms and Conditions'
    jQuery("h2[title='Terms and Conditions']").text("");

    // Replace the text beside the T&C checkbox
    var taoPopoutIcon = '<img src="https://www.ihg.com/content/dam/etc/media_library/branded/6c/cn/icons/0001.gif" alt="Link will open in new browser window." title="Link will open in new browser window.">';
    var taoNewTCUrl = "https://www.ihg.com/hotels/us/en/global/customer_care/member-tc";
    var taoNewTC = "I have reviewed and accept the <a href='" + taoNewTCUrl + "'>" +
                   "Terms and Conditions</a> " + taoPopoutIcon +". I also certify I " +
                   "am at least 18 years old and of lawful age."
    jQuery(".text.parbase.text_3.LinkMorpher").html(taoNewTC);

    // Remove the class 'form_rightcol' from the parent div on the checkbox area
    var taoCheckBoxParentDiv = jQuery(".text.parbase.text_3.LinkMorpher").parents(".form_rightcol");
    jQuery(taoCheckBoxParentDiv).children("img[title='Required']").remove();
    jQuery(taoCheckBoxParentDiv).removeClass("form_rightcol");

    // Remove the paragraph of text above the TC checkbox
    jQuery(".basichtml.parbase.section").remove();

    // Remove the divs with class 'notRequiredPlaceHolder'
    jQuery(".notRequiredPlaceHolder").remove();

    // Remove old security images so we can replace them with new ones
    jQuery("div#securityLogos img").remove();
    var taoNewTrusteLogo = "./index-saveas_files/trusteLogo.png";
    var taoNewTrusteUrl = "https://www.ihg.com/hotels/us/en/global/customer_care/privacy_statement";
    var taoNewCyberTrustLogo = "./index-saveas_files/cybertrustLogo.png";
    var taoNewCyberTrustUrl = "http://secure.omniroot.com/en/find/sealct.cfm?cn=www.ichotelsgroup.com";
    var taoNewTrusteImg = "<a href='" + taoNewTrusteUrl + "' alt='Select to learn more about TRUSTe.' target='_blank'>" +
                          "<img src='" + taoNewTrusteLogo + "'></a>";
    var taoNewCyberTrustImg = "<a href='" + taoNewCyberTrustUrl + "' alt='Select to view CyberTrust certificate verification. " +
                              "Website will open in a new window.' target='_blank'><img src='" + taoNewCyberTrustLogo + "'></a>";
    jQuery("#securityLogos").prepend(taoNewCyberTrustImg).prepend(taoNewTrusteImg);

    // Add in new set of horizontal IHG logs
    var taoNewIHGLogos = "./index-saveas_files/horizontalIHGLogos.png";
    var taoNewIHGImg = "<img src='" + taoNewIHGLogos + "' />";
    jQuery(taoNewIHGImg).insertAfter("#securityLogos");

    // Insert clear: left on formField divs to get the form to line up correctly
    jQuery("#emailAddress").parents(".formField").css("clear", "left").css("margin-left", "-9px");
    jQuery("#pin").parents(".formField").css("clear", "left").css("margin-left", "-9px");

    // Find the phrase 'Make note of your PIN for future use' and remove it
    jQuery("#verifyPin").parents(".formField").next().remove();

    // Remove the '4-digit number' text and change the label for PIN
    document.getElementById("pin").nextSibling.nodeValue = "";
    jQuery("#pin").parents(".form_row").find("label").text("Create PIN (4 digits)");

    // Move the email help icon to within the A tag, reposition it, and remove the text
    var taoEmailHelpImg = jQuery("#emailHelp").find("img");
    jQuery("#emailHelp a").html(taoEmailHelpImg);
    var taoEmailHelpA = jQuery("#emailHelp a");
    jQuery("#emailHelp").css("display", "none");
    jQuery(taoEmailHelpA).insertBefore(".checkbox.section");
    jQuery("#emailPopupLink").css("position", "relative").css("top", "72px").css("right", "339px");


});
