// CP_SearchResults

/* Rule Id: 781874 */
if (((window.location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && window.location.pathname.match(/^\/crowneplaza\/.*\/searchresult$/i)) || (window.location.hostname.match(/^www\.crowneplaza\.com/i) && window.location.pathname.match(/\/searchresult$/i))) && $data('gdl', 'language') === 'en' && ($data('gdl', 'country') === 'us' || $data('gdl', 'country') === 'gb') && $data('gdl', 'brand') === 'cp') {
  if (!Bootstrapper.hasDOMLoaded()) {
    document.write('<div class="mboxDefault"></div>');
    var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
      country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
      login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
      pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
    mboxCreate('CP_SearchResults', lang, country, login, pageId);
  }
}
