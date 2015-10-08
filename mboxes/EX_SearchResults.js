// EX_SearchResults

/* Rule Id: 537536 */
var mboxName = 'EX_SearchResults',
  l = window.location;
if (!Bootstrapper.hasDOMLoaded() &&
/* START Conditions */ ((l.hostname.match(/www\.ihg\.com$/i) && l.pathname.match(/^\/holidayinnexpress\/.*\/searchresult$/i)) || (l.hostname.match(/www\.hiexpress\.com$/i) && l.pathname.match(/\/searchresult$/i))) && $data('gdl', 'language') === 'en' && ($data('gdl', 'country') === 'us' || $data('gdl', 'country') === 'gb')
/* END Conditions - Do not edit below this */
) {
  document.write('<div class="mboxDefault"></div>');
  var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
    country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
    login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
    pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
  mboxCreate(mboxName, lang, country, login, pageId);
}
