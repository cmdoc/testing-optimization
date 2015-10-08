// EX_HotelDetails

/* Rule Id: 928537 */
/* Rule Id: 928528 */
if (location.hostname.match(/^(qa\.)?www\.ihg\.com/i) && location.pathname.match(/^\/holidayinnexpress\/hotels\/.*\/(hoteldetail)$/i)) {
  if (typeof trackingJson === 'object' && (trackingJson.siteLanguage && trackingJson.siteLanguage == 'en') && (trackingJson.siteCountry && (trackingJson.siteCountry == 'us' || trackingJson.siteCountry == 'gb'))) {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = trackingJson.siteLanguage ? 'language=' + trackingJson.siteLanguage : '',
        country = trackingJson.siteCountry ? 'country=' + trackingJson.siteCountry : '',
        login = trackingJson.loginType ? 'loginType=' + trackingJson.loginType : '',
        pageId = trackingJson.pageidbrand ? 'pageIdBrand=' + trackingJson.pageidbrand : '',
        propertyId = trackingJson.propertyCode ? 'propertyId=' + trackingJson.propertyCode : '';
      document.write('<div class="mboxDefault"></div>');
      mboxCreate("EX_HotelDetails", lang, country, login, pageId, propertyId);
    }
  }
}
