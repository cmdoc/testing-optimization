// CW_HotelDetails

/* Rule Id: 1040445 */
if (location.hostname.match(/^((perftest|staging)\.)?www\.ihg\.com/i) && location.pathname.match(/^\/candlewood\/hotels\/.*\/hoteldetail\/?$/i)) {
  if ($data('gdl', 'language') === 'en' && ($data('gdl', 'country') === 'us' || $data('gdl', 'country') === 'gb')) {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
        country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
        login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
        pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '',
        propertyId = $data('hotelDetails', 'hotelId') ? 'propertyId=' + $data('hotelDetails', 'hotelId') : (window.trackingJson.hotelCode ? 'propertyId=' + window.trackingJson.hotelCode.toUpperCase() : '');
      document.write('<div class="mboxDefault"></div>');
      if (mboxCreate) {
        mboxCreate("CW_HotelDetails", lang, country, login, pageId, propertyId);
        if (location.hostname.match(/qa\./i)) console.log('cw_hoteldetails mbox created');
      }
    }
  }
}
