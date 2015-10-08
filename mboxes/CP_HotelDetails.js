// CP_HotelDetails

/* Rule Id: 628766 */
if (location.pathname.match(/\/(hoteldetail|hotel-reviews)\/?$/i) && $data('gdl', 'brand') === 'cp') {
  if ($data('gdl', 'language') == 'en' && ($data('gdl', 'country') == 'us' || $data('gdl', 'country') == 'gb')) {
    if (!Bootstrapper.hasDOMLoaded()) {
      var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
        country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
        login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
        pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
      document.write('<div class="mboxDefault"></div>');
      mboxCreate("CP_HotelDetails", lang, country, login, pageId);
    }
  }
}
