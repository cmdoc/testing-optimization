// IHG_GuestInfo

/* Rule Id: 783177 */
if (location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && location.pathname.match(/^\/hotels\/.*\/book$/i) && location.search.match(/method=(guestandpaymentinfo|redirect&modifySearch=bookhotel)/i)) {
  if (typeof trackingJson === 'object' && (trackingJson.siteLanguage && trackingJson.siteLanguage == 'en') && (trackingJson.siteCountry && (trackingJson.siteCountry == 'us' || trackingJson.siteCountry == 'gb'))) {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = trackingJson.siteLanguage ? 'language=' + trackingJson.siteLanguage : '',
        country = trackingJson.siteCountry ? 'country=' + trackingJson.siteCountry : '',
        login = trackingJson.loginType ? 'loginType=' + trackingJson.loginType : '',
        pageId = trackingJson.pageidbrand ? 'pageIdBrand=' + trackingJson.pageidbrand : '';
      document.write('<div class="mboxDefault"></div>');
      mboxCreate("IHG_GuestInfo", lang, country, login, pageId);
    }
  }
}
