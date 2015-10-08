// CP_GuestInfo

//Manage 1 Rule ID is: 82268
/* Rule Id: 781876 */
if (((location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && location.pathname.match(/^\/crowneplaza\/.*\/book$/i)) || (location.hostname.match(/^www\.crowneplaza\.com/i) && location.pathname.match(/^\/.*\/book$/i))) && ~location.search.indexOf('method=guestandpaymentinfo') && $data('gdl', 'brand') === 'cp') {
  if (typeof trackingJson === 'object' && (trackingJson.siteLanguage && trackingJson.siteLanguage == 'en') && (trackingJson.siteCountry && (trackingJson.siteCountry == 'us' || trackingJson.siteCountry == 'gb'))) {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = trackingJson.siteLanguage ? 'language=' + trackingJson.siteLanguage : '',
        country = trackingJson.siteCountry ? 'country=' + trackingJson.siteCountry : '',
        login = trackingJson.loginType ? 'loginType=' + trackingJson.loginType : '',
        pageId = trackingJson.pageidbrand ? 'pageIdBrand=' + trackingJson.pageidbrand : '';
      document.write('<div class="mboxDefault"></div>');
      mboxCreate("CP_GuestInfo", lang, country, login, pageId);
    }
  }
}
