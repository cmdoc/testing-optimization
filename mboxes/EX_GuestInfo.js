// EX_GuestInfo

//Manage 1 Rule ID is: 82268
/* Rule Id: 909846 */
if (((location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && location.pathname.match(/^\/holidayinnexpress\/.*\/book$/i)) || (location.hostname.match(/^www\.hiexpress\.com/i) && location.pathname.match(/^\/.*\/book$/i))) && ~location.search.indexOf('method=guestandpaymentinfo') && $data('gdl', 'brand') === 'ex') {
  if (typeof trackingJson === 'object' && (trackingJson.siteLanguage && trackingJson.siteLanguage == 'en') && (trackingJson.siteCountry && (trackingJson.siteCountry.toLowerCase() == 'us' || trackingJson.siteCountry.toLowerCase() == 'gb'))) {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = trackingJson.siteLanguage ? 'language=' + trackingJson.siteLanguage : '',
        country = trackingJson.siteCountry ? 'country=' + trackingJson.siteCountry : '',
        login = trackingJson.loginType ? 'loginType=' + trackingJson.loginType : '',
        pageId = trackingJson.pageidbrand ? 'pageIdBrand=' + trackingJson.pageidbrand : '',
        propertyId = trackingJson.propertyCode ? 'propertyId=' + trackingJson.propertyCode : '';
      document.write('<div class="mboxDefault"></div>');
      mboxCreate("EX_GuestInfo", lang, country, login, pageId, propertyId);
    }
  }
}
