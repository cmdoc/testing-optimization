﻿jQuery(document).ready(function () {

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

    /******* Account Information Fields *******/
    // Create a DIV for the Account Information fields
    jQuery("<div id='taoAccountInfo'><h2>Account Information</h2></div>").insertAfter(".indicatesRequiredFields");

    // Create a default DIV for the Account Info fields
    var taoDefaultAcctInfo = "<div class='taoAccountBlock'></div>";

    // Create Title block
    var taoNewTitle = taoDefaultAcctInfo;
    var taoExistingTitle = jQuery("#PCREnroll_personTitle");
    jQuery("#taoAccountInfo").append(taoNewTitle);
    jQuery("#taoAccountInfo .taoAccountBlock").last().append(taoExistingTitle);
    jQuery("#taoAccountInfo .taoAccountBlock").last().find("option").first().text("Title");

    // Create FirstName Block
    var taoNewFirstName = taoDefaultAcctInfo;
    var taoExistingFirstName = jQuery("#firstName");
    var taoExistingFirstNameLabel = jQuery("div.formField").eq(0).find("label").text().trim();
    jQuery("#taoAccountInfo").append(taoNewFirstName);
    jQuery("#taoAccountInfo .taoAccountBlock").last().append(taoExistingFirstName);
    jQuery("#taoAccountInfo .taoAccountBlock input").last().attr("placeholder", taoExistingFirstNameLabel);

    // Create LastName Block
    var taoNewLastName = taoDefaultAcctInfo;
    var taoExistingLastName = jQuery("#lastName");
    var taoExistingLastNameLabel = jQuery("div.formField").eq(1).find("label").text().trim();
    jQuery("#taoAccountInfo").append(taoNewLastName);
    jQuery("#taoAccountInfo .taoAccountBlock").last().append(taoExistingLastName);
    jQuery("#taoAccountInfo .taoAccountBlock input").last().attr("placeholder", taoExistingLastNameLabel);

    // Create EmailAddress Block
    var taoNewEmail = taoDefaultAcctInfo;
    var taoExistingEmail = jQuery("#emailAddress");
    var taoExistingEmailLabel = jQuery("div.formField").eq(2).find("label").text().trim();
    jQuery("#taoAccountInfo").append(taoNewEmail);
    jQuery("#taoAccountInfo .taoAccountBlock").last().append(taoExistingEmail);
    jQuery("#taoAccountInfo .taoAccountBlock input").last().attr("placeholder", taoExistingEmailLabel);
    jQuery("#taoAccountInfo .taoAccountBlock").last().addClass("taoClear");


    // Create ConfirmEmailAddress Block
    var taoNewEmail2 = taoDefaultAcctInfo;
    var taoExistingEmail2 = jQuery("#confirmEmailAddress");
    var taoExistingEmail2Label = jQuery("div.formField").eq(3).find("label").text().trim();
    jQuery("#taoAccountInfo").append(taoNewEmail2);
    jQuery("#taoAccountInfo .taoAccountBlock").last().append(taoExistingEmail2);
    jQuery("#taoAccountInfo .taoAccountBlock input").last().attr("placeholder", taoExistingEmail2Label);

    // Create CreatePin Block
    var taoNewPin = taoDefaultAcctInfo;
    var taoExistingPin = jQuery("#pin");
    jQuery("#taoAccountInfo").append(taoNewPin);
    jQuery("#taoAccountInfo .taoAccountBlock").last().append(taoExistingPin);
    jQuery("#taoAccountInfo .taoAccountBlock input").last().attr("placeholder", "Create PIN (4 digits)");
    jQuery("#taoAccountInfo .taoAccountBlock").last().addClass("taoClear");

    // Create VerifyPin Block
    var taoNewPin2 = taoDefaultAcctInfo;
    var taoExistingPin2 = jQuery("#verifyPin");
    var taoExistingPin2Label = jQuery("div.formField").eq(5).find("label").text().trim();
    jQuery("#taoAccountInfo").append(taoNewPin2);
    jQuery("#taoAccountInfo .taoAccountBlock").last().append(taoExistingPin2);
    jQuery("#taoAccountInfo .taoAccountBlock input").last().attr("placeholder", taoExistingPin2Label);


    // Find the phrase 'Make note of your PIN for future use' and remove it
    jQuery("#verifyPin").parents(".formField").next().remove();

    // Move the email help icon to within the A tag, reposition it, and remove the text
    var taoEmailHelpImg = jQuery("#emailHelp").find("img");
    jQuery("#emailHelp a").html(taoEmailHelpImg);
    var taoEmailHelpA = jQuery("#emailHelp a");
    jQuery("#emailHelp").css("display", "none");
    jQuery(taoEmailHelpA).insertBefore(".checkbox.section");
    jQuery("#emailPopupLink").css("position", "relative").css("top", "72px").css("right", "339px");

    /******* Mailing Address Fields *******/
    // Create a DIV for the Mailing Address fields and move title there
    jQuery("<div id='taoMailingAddr'><h2>Mailing Address</h2></div>").insertAfter("#taoAccountInfo");

    var taoDefaultMailingBracket = "<div class='taoMailingBlock'></div>";

    // Create Street input
    var taoNewStreet = taoDefaultMailingBracket;
    var taoExistingStreetLabel = jQuery("#address1Label label").text();
    var taoExistingStreetInput = jQuery("#addressField1");
    jQuery("#taoMailingAddr").append(taoNewStreet);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingStreetInput);
    jQuery("#taoMailingAddr .taoMailingBlock input").last().attr("placeholder", taoExistingStreetLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoFlushRight");

    // Create County Dropdown
    var taoNewCountry = taoDefaultMailingBracket;
    var taoExistingCountrySelect = jQuery("#countrySelect");
    jQuery("#taoMailingAddr").append(taoNewCountry);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingCountrySelect);
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoClear");

    // Create State/Province/County input
    var taoNewState = taoDefaultMailingBracket;
    var taoExistingStateLabel = jQuery("#stateLabel label").text();
    var taoExistingStateInput = jQuery("#stateBox");
    jQuery("#taoMailingAddr").append(taoNewState);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingStateInput);
    jQuery("#taoMailingAddr .taoMailingBlock input").last().attr("placeholder", taoExistingStateLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoFlushRight");

    // Create City input
    var taoNewCity = taoDefaultMailingBracket;
    var taoExistingCityLabel = jQuery("#cityLabel label").text();
    var taoExistingCityInput = jQuery("#city");
    jQuery("#taoMailingAddr").append(taoNewCity);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingCityInput);
    jQuery("#taoMailingAddr .taoMailingBlock input").last().attr("placeholder", taoExistingCityLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoClear");

    // Create Postal Code input
    var taoNewZip = taoDefaultMailingBracket;
    var taoExistingZipLabel = jQuery("#postalCodeLabel label").text();
    var taoExistingZipInput = jQuery("#postalCode");
    jQuery("#taoMailingAddr").append(taoNewZip);
    jQuery("#taoMailingAddr .taoMailingBlock").last().prepend(taoExistingZipInput);
    jQuery("#taoMailingAddr .taoMailingBlock input").last().attr("placeholder", taoExistingZipLabel);
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoFlushRight");

    // Create Address Type input
    var taoNewAddrType = taoDefaultMailingBracket;
    var taoExistingAddrTypeInput = jQuery("#residenceRadio").parents(".field").html();
    jQuery("#taoMailingAddr").append(taoNewAddrType);
    jQuery("#taoMailingAddr .taoMailingBlock").last().append(taoExistingAddrTypeInput);
    jQuery("#taoMailingAddr .taoMailingBlock .taoMailingLabel").last().remove();
    jQuery("#taoMailingAddr .taoMailingBlock").last().addClass("taoClear");

    // Replace label for Residence/Business radio buttons to Residence/Office
    jQuery("label[for='businessRadio']").text("Office");

});
