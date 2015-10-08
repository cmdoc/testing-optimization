// CP_RoomsRates

/* Rule Id: 837667 */
var mboxName = 'CP_RoomsRates',
  l = window.location;
if (!Bootstrapper.hasDOMLoaded() &&
/* START Conditions */ (
l.pathname.match(/^\/crowneplaza\/.*\/book\/?$/i) && l.search.match(/method=(roomRate|redirect)/i) && $data('gdl', 'language') === 'en' && ($data('gdl', 'country') === 'us' || $data('gdl', 'country') === 'gb')) || (
(l.hostname.indexOf("crowneplaza") > -1 || l.pathname.indexOf("crowneplaza") > -1) && l.pathname.indexOf("book") > -1 && $data('gdl', 'language') === 'en' && ($data('gdl', 'country') === 'us' || $data('gdl', 'country') === 'gb') && (l.search.indexOf("kayak") > -1 || l.search.indexOf("tripadvisor") > -1))
/* END Conditions - Do not edit below this */) {
  document.write('<div class="mboxDefault"></div>');
  var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
    country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
    login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
    pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '',
    propertyId = trackingJson.propertyCode ? 'propertyId=' + trackingJson.propertyCode : '';
  mboxCreate(mboxName, lang, country, login, pageId, propertyId);
}
