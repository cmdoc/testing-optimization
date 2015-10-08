// HI_RoomsRates

/* Rule Id: 1021324 */
var mboxName = 'HI_RoomsRates',
  l = window.location;
if (!Bootstrapper.hasDOMLoaded() &&
/* START Conditions */ (
l.pathname.match(/^\/holidayinn\/.*\/book\/?$/i) && l.search.match(/method=(roomRate|redirect&modifySearch=)/i) && $data('gdl', 'language') === 'en' && $data('gdl', 'country') === 'gb') || (
(l.hostname.indexOf("holidayinn") > -1 || l.pathname.indexOf("holidayinn") > -1) && l.pathname.indexOf("book") > -1 && $data('gdl', 'language') === 'en' && $data('gdl', 'country') === 'gb' && (l.search.indexOf("kayak") > -1 || l.search.indexOf("tripadvisor") > -1))
/* END Conditions - Do not edit below this */) {
  document.write('<div class="mboxDefault"></div>');
  var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
    country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
    login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
    pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '',
    propertyId = trackingJson.propertyCode ? 'propertyId=' + trackingJson.propertyCode : '';
  hotelCountry = '';
  if (typeof trackingJson !== 'undefined') {
    if (typeof trackingJson.hotelCityStateCountryCode !== 'undefined') {
      var hcscc_arr = trackingJson.hotelCityStateCountryCode.split(',');
      if (hcscc_arr.length >= 3) {
        hotelCountry = 'hotelCountry=' + hcscc_arr[2];
      }
    }
  }
  mboxCreate(mboxName, lang, country, login, pageId, propertyId, hotelCountry);
}
