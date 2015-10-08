// IHG_RewardsClub (IHG - Chase Offer My Account)

/* Rule Id: 838011 */
/*
if ( location.pathname.match(/\/rewardsclub\/(.*)\/account\/home\/?$/i) && $data('gdl', 'language') == 'en' && ($data('gdl', 'country') == 'us') ) {
  if (!Bootstrapper.hasDOMLoaded()) {
    document.write('<div class="mboxDefault"></div>');
    var lang = $data('gdl', 'language') ? 'language=' + $data('gdl', 'language') : '',
      country = $data('gdl', 'country') ? 'country=' + $data('gdl', 'country') : '',
      login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
      pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
    mboxCreate('IHG_RewardsClub_ChaseOffer', lang, country, login, pageId);
  }
}
*/

if (location.pathname.match(/\/rewardsclub\/(.*)\/account\/home\/?$/i)) {
  var c = Bootstrapper.Cookies.get("country_language").replace(/['"]+/g, "").toLowerCase(),
    c_country = "",
    c_language = "";
  if (c && c.indexOf("$:") > 0) {
    c = c.split("$:");
    if (typeof c[0] === "string" && c[0] !== "") c_country = c[0];
    if (typeof c[1] === "string" && c[1] !== "") c_language = c[1];
  }
  if (c_country === "us" && c_language === "en") {
    if (!Bootstrapper.hasDOMLoaded()) {
      document.write('<div class="mboxDefault"></div>');
      var login = $data('gdl', 'loginStatus') ? 'loginType=' + $data('gdl', 'loginStatus') : '',
        pageId = $data('gdl', 'pageIdBrand') ? 'pageIdBrand=' + $data('gdl', 'pageIdBrand') : '';
      lang = 'language=en';
      country = 'country=us';

      mboxCreate('IHG_RewardsClub_ChaseOffer', lang, country, login, pageId);
    }
  }
}
