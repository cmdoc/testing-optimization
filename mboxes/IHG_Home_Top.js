// IHG_Home_Top

/* Rule Id: 600694 */
if (location.pathname.match(/^\/hotels\/(us|gb)\/en\/reservation\/?$/i) && $data('gdl', 'language') == 'en' && ($data('gdl', 'country') == 'us' || $data('gdl', 'country') == 'gb') && $data('gdl', 'brand') === '6c') {
  if (!Bootstrapper.hasDOMLoaded()) {
    document.write('<div class="mboxDefault"></div>');
    var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
      country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
      login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
      pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
    mboxCreate('IHG_Home_Top', lang, country, login, pageId);
  }
}
