// CP_Global (Web QA only -- no Web Prod)

//Manage 1 Rule ID is: 82268
/* Rule Id: 989181 */
if ((location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && location.pathname.match(/^\/crowneplaza\//i))) {
  if ($data('gdl', 'language') === 'en' && ($data('gdl', 'country') === 'us' || $data('gdl', 'country') === 'gb')) {
    if (typeof Bootstrapper.hasDOMLoaded() !== 'undefined' && !Bootstrapper.hasDOMLoaded()) {
      var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
        country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
        login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
        pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '',
        propertyId = $data('hotelDetails', 'hotelId') ? 'propertyId=' + $data('hotelDetails', 'hotelId') : (window.trackingJson.hotelCode ? 'propertyId=' + window.trackingJson.hotelCode.toUpperCase() : '');

      document.write('<div class="mboxDefault"></div>');
      /* Create Global Mbox */
      if (mboxCreate) {
        mboxCreate('CP_Global', lang, country, login, pageId, propertyId);
        if (location.hostname.match(/qa\./i)) console.log("new CP_Global mbox created");
      }
    }
  }
}
