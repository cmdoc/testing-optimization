// EX_RoomsRates

/* Rule Id: 837652 */
if (
location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && location.pathname.match(/^\/holidayinnexpress\/.*\/book$/i) && (location.search.match(/method=roomRate/i) || (location.search.match(/method=redirect/i) && location.search.match(/modifySearch=bookhotel/i)))) {
  if ($data('gdl', 'language') === 'en' && ($data('gdl', 'country') == 'us' || $data('gdl', 'country') == 'gb')) {
    if (!Bootstrapper.hasDOMLoaded()) {
      document.write('<div class="mboxDefault"></div>');
      var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
        country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
        login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
        pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '',
        propId = trackingJson.propertyCode ? 'propertyId=' + trackingJson.propertyCode : '',
        hotelCountry = '';
      if (typeof trackingJson !== 'undefined') {
        if (typeof trackingJson.hotelCityStateCountryCode !== 'undefined') {
          var hcscc_arr = trackingJson.hotelCityStateCountryCode.split(',');
          if (hcscc_arr.length >= 3) {
            hotelCountry = 'hotelCountry=' + hcscc_arr[2];
          }
        }
      }
      mboxCreate('EX_RoomsRates', lang, country, login, pageId, propId, hotelCountry);
    }
  }
}
