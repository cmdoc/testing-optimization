// IHG_RoomsRates

/* Rule Id: 1042502 */
if (
location.pathname.match(/^\/hotels\/.*\/book$/i) && location.search.match(/method=(roomRate|redirect.*modifySearch=bookhotel)/i)) {
  if (($data('gdl', 'country').toLowerCase() === 'us' || $data('gdl', 'country').toLowerCase() === 'gb') && $data('gdl', 'language').toLowerCase() === 'en') {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = $data('gdl', 'language').toLowerCase() ? 'language=' + $data('gdl', 'language').toLowerCase() : '',
        country = $data('gdl', 'country').toLowerCase() ? 'country=' + $data('gdl', 'country').toLowerCase() : '',
        login = trackingJson.loginType ? 'loginType=' + trackingJson.loginType : '',
        pageId = trackingJson.pageidbrand ? 'pageIdBrand=' + trackingJson.pageidbrand : '',
        propertyId = trackingJson.propertyCode ? 'propertyId=' + trackingJson.propertyCode : '';
      document.write('<div class="mboxDefault"></div>');
      mboxCreate("IHG_RoomsRates", lang, country, login, pageId, propertyId);
      console.log("mbox created");
    }
  }
}
