// EX_HomePage

//Manage 1 Rule ID is: 82268
/* Rule Id: 781870 */
//Manage1 Rule ID is : 82268
if ((location.hostname.match(/^(qa\.|)www\.ihg\.com/i) && location.pathname.match(/^\/holidayinnexpress\/.*\/reservation$/i)) || (location.hostname.match(/^www\.holidayinnexpress\.com/i) && location.pathname.match(/^\/reservation$/i)) && $data('gdl', 'language') === 'en' && ($data('gdl', 'country') === 'us' || $data('gdl', 'country') === 'gb') && $data('gdl', 'brand') === 'ex') {
  if (!Bootstrapper.hasDOMLoaded()) {
    document.write('<div class="mboxDefault"></div>');
    var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
      country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
      login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
      pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
    /* Create Global Mbox */
    mboxCreate('EX_HomePage', lang, country, login, pageId);
  }
}
