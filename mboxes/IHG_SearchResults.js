// IHG_SearchResults

/* Rule Id: 842404 */
if (location.pathname.match(/\/reservation\/searchresult\/?$/i) && $data('gdl', 'language') == 'en' && $data('gdl', 'country') == 'us' && $data('gdl', 'brand') === '6c') {
  if (!Bootstrapper.hasDOMLoaded()) {
    document.write('<div class="mboxDefault"></div>');
    var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
      country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
      login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
      pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
    mboxCreate('IHG_SearchResults', lang, country, login, pageId);
  }
}
