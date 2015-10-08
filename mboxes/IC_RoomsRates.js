// IC_RoomsRates

/* Rule Id: 837653 */
if (
location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && location.pathname.match(/^\/intercontinental\/.*\/book$/i) && (location.search.match(/method=roomRate/i) || (location.search.match(/method=redirect/i) && location.search.match(/modifySearch=bookhotel/i)))) {
  if (typeof trackingJson === 'object' && (trackingJson.siteLanguage && trackingJson.siteLanguage === 'en') && (trackingJson.siteCountry && (trackingJson.siteCountry === 'us' || trackingJson.siteCountry === 'gb'))) {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = trackingJson.siteLanguage ? 'language=' + trackingJson.siteLanguage : '',
        country = trackingJson.siteCountry ? 'country=' + trackingJson.siteCountry : '',
        login = trackingJson.loginType ? 'loginType=' + trackingJson.loginType : '',
        pageId = trackingJson.pageidbrand ? 'pageIdBrand=' + trackingJson.pageidbrand : '',
        propertyId = trackingJson.propertyCode ? 'propertyId=' + trackingJson.propertyCode : '';

      document.write('<div class="mboxDefault"></div>');
      if (mboxCreate) mboxCreate("IC_RoomsRates", lang, country, login, pageId, propertyId);

      if (location.hostname.match(/qa\./i)) console.log("ic_roomsrates mbox created");
    }
  }
}
