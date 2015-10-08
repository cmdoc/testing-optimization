//HI_SearchResults

/* Rule Id: 845013 */
if (location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && location.pathname.match(/^\/holidayinn\/.*\/searchresult$/i)) {
  if (typeof trackingJson === 'object' && $data('gdl', 'country') === 'us' && $data('gdl', 'language') === 'en') {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
        country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
        login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
        pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';

      document.write('<div class="mboxDefault"></div>');
      if (mboxCreate) mboxCreate("HI_SearchResults", lang, country, login, pageId);
    }
  }
}
