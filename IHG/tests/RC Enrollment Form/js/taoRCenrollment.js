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

    // Create a DIV for the Account Information fields and move them all there
    jQuery("<div id='taoAccountInfo'></div>").insertAfter(".indicatesRequiredFields");
    var taoAcctInfoTitle = jQuery("#formHeaderWrapper");
    var taoTitleDropdown = jQuery(".dropdown.section");
    var taoFirstName = jQuery("div.formField").eq(0);
    var taoLastName = jQuery("div.formField").eq(1);
    var taoEmail1 = jQuery("div.formField").eq(2);
    var taoEmail2 = jQuery("div.formField").eq(3);
    var taoPin1 = jQuery("div.formField").eq(4);
    var taoPin2 = jQuery("div.formField").eq(5);

    jQuery("#taoAccountInfo").append(taoAcctInfoTitle);
    jQuery("#taoAccountInfo").append(taoTitleDropdown);
    jQuery("#taoAccountInfo").append(taoFirstName);
    jQuery("#taoAccountInfo").append(taoLastName);
    jQuery("#taoAccountInfo").append(taoEmail1);
    jQuery("#taoAccountInfo").append(taoEmail2);
    jQuery("#taoAccountInfo").append(taoPin1);
    jQuery("#taoAccountInfo").append(taoPin2);

    // Create a DIV for the Mailing Address fields and move title there
    jQuery("<div id='taoMailingAddr'><h2>Mailing Address</h2></div>").insertAfter("#taoAccountInfo");

    var taoDefaultMailingBracket = "<div class='taoMailingBlock'>" +
                                        "<div class='taoMailingLabel'>" +
                                            "<label></label>" +
                                            "<img src='./index-saveas_files/0001.gif' alt='Indicates required field' title='Indicates required field'>" +
                                        "</div>" +
                                   "</div>";

    // Create Street input
    var taoNewStreet = taoDefaultMailingBracket;
    var taoExistingStreetLabel = jQuery("#address1Label label");
    var taoExistingStreetInput = jQuery("#addressField1");
    jQuery("#taoMailingAddr").append(taoNewStreet);
    jQuery("#taoMailingAddr .taoMailingBlock .taoMailingLabel").last().prepend(taoExistingStreetLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingStreetInput);
    
    // Create County Dropdown
    var taoNewCountry = taoDefaultMailingBracket;
    var taoExistingCountryLabel = jQuery("#countryLabel label");
    var taoExistingCountrySelect = jQuery("#countrySelect");
    jQuery("#taoMailingAddr").append(taoNewCountry);
    jQuery("#taoMailingAddr .taoMailingBlock .taoMailingLabel").last().prepend(taoExistingCountryLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingCountrySelect);
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoClear");
    // Remove the text of the first select option so it doesn't conflict with label
    jQuery("#taoMailingAddr .taoMailingBlock").last().find("option").first().text("");

    // Create State/Province/County input
    var taoNewState = taoDefaultMailingBracket;
    var taoExistingStateLabel = jQuery("#stateLabel label");
    var taoExistingStateInput = jQuery("#stateBox");
    jQuery("#taoMailingAddr").append(taoNewState);
    jQuery("#taoMailingAddr .taoMailingBlock .taoMailingLabel").last().prepend(taoExistingStateLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingStateInput);

    // Create City input
    var taoNewCity = taoDefaultMailingBracket;
    var taoExistingCityLabel = jQuery("#cityLabel label");
    var taoExistingCityInput = jQuery("#city");
    jQuery("#taoMailingAddr").append(taoNewCity);
    jQuery("#taoMailingAddr .taoMailingBlock .taoMailingLabel").last().prepend(taoExistingCityLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingCityInput);
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoClear");

    // Create Postal Code input
    var taoNewZip = taoDefaultMailingBracket;
    var taoExistingZipLabel = jQuery("#postalCodeLabel label");
    var taoExistingZipInput = jQuery("#postalCode");
    jQuery("#taoMailingAddr").append(taoNewZip);
    jQuery("#taoMailingAddr .taoMailingBlock .taoMailingLabel").last().prepend(taoExistingZipLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingZipInput);

    // Create Address Type input
    var taoNewAddrType = taoDefaultMailingBracket;
    var taoExistingAddrTypeInput = jQuery("#residenceRadio").parents(".field").html();
    jQuery("#taoMailingAddr").append(taoNewAddrType);
    jQuery("#taoMailingAddr .taoMailingBlock").last().append(taoExistingAddrTypeInput);
    jQuery("#taoMailingAddr .taoMailingBlock .taoMailingLabel").last().remove();
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoClear");

    /******* User interactions with form *******/
    // If user clicks on .taoMailingLabel, then hide the label and put cursor in 
    // related input field
    jQuery(".taoMailingLabel").on("focus, click", function () {
        jQuery(this).hide();
        jQuery(this).parents(".taoMailingBlock").find("input").focus();
        jQuery(this).parents(".taoMailingBlock").find("select").focus();
    });


});
