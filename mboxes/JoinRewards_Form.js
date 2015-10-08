// JoinRewards_Form

/* Rule Id: 1038439 */
if (
(
location.pathname.match(/\/rewardsclub\/(us|gb)\/en\/join\/(register|join)\/?$/i)) && $data('gdl', 'language') == 'en' && (
$data('gdl', 'country') == 'us' || $data('gdl', 'country') == 'gb')) {
  if (!Bootstrapper.hasDOMLoaded()) {
    document.write('<div class="mboxDefault"></div>');
    var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
      country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
      login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
      pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
    mboxCreate('JoinRewards_Form', lang, country, login, pageId);
  }
}
