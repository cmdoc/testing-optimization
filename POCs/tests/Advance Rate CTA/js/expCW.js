jQuery(document).ready(function () {

    // Set up some variables for later use
    var taoNewHeroImg = "http://ihg.scene7.com/is/image/ihg/CW_AdvantagePricing_Hero_EN_rev?fmt=jpg";
    var $taoHero = jQuery("ul.slides .sl-init img").eq(0);
    var taoRatePage = "/hotels/us/en/global/offers/member/yourrate";

    // Create the mutationObserver for watching when the class changes for our
    // new Your Rate hero image
    var $taoYourRateHeroLi = jQuery("ul.slides .sl-init").eq(0);
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === "class") {

                // SUCCESS! The class attr has changed on our hero image item.
                // Look at the classes for the <li>. If it contains 
                // 'flex-active-slide' then put the <a> tag around the cloned 
                // image.  If not, then remove the <a> tag.
                var taoImgClasses = $(mutation.target).prop(mutation.attributeName);
                if (taoImgClasses.indexOf("flex-active-slide") >= 0) {
                    jQuery("ul.slides .sl-init div.slide-caption").wrap("<a href='" + taoRatePage + "' id='taoClick'></a>");
                } else {
                    jQuery("ul.slides .sl-init div.slide-caption").unwrap();
                }
            }
        });
    });

    // Activate the observer and set it to watch the attributes
    observer.observe($taoYourRateHeroLi[0], {
        attributes: true
    });

    // Now that the mutation observer is set up, let's make all of the changes
    // we need. 
    // Replace the image src for the first image in the carousel
    $taoHero.attr("src", taoNewHeroImg);
    $taoHero.attr("data-desktop", taoNewHeroImg);
    $taoHero.attr("data-tablet", taoNewHeroImg);
    $taoHero.attr("data-mobile", taoNewHeroImg);

});

// Adobe Target Click Tracking
Adbett = window.Adbett || {};
!function (A) {

    var DEFAULT_MBOX_NAME = 'mboxClickTrack',
        DEFAULT_ACTION_EVENT = 'click',
        DEFAULT_TRACKING_TYPE = 'delay';

    var _track = function (paramVal, mboxName) {
        (function (mbox) {
            var d = new Date(); if (window.mboxFactoryDefault) { var ub = mboxFactoryDefault.getUrlBuilder().clone(); ub.addParameter("mbox", mbox); ub.addParameter('mboxTime', d.getTime() - (d.getTimezoneOffset() * 60000)); ub.addParameters(Array.prototype.slice.call(arguments).slice(1)); var img = new Image(); img.src = ub.buildUrl().replace("/mbox/undefined", "/mbox/ajax"); img.style.display = "none"; if (document.body) document.body.insertBefore(img, document.body.firstChild); }
        })((typeof mboxName === 'string') ? mboxName : "mboxClickTrack", "clicked=" + paramVal);
    };

    A.track = A.track || function (obj) {
        var selector = (typeof obj.selector !== 'undefined') ? obj.selector : '',
            paramVal = (typeof obj.value !== 'undefined') ? obj.value : '',
            mboxName = (typeof obj.mboxName !== 'undefined') ? obj.mboxName : DEFAULT_MBOX_NAME,
            type = (typeof obj.type !== 'undefined') ? obj.type : DEFAULT_TRACKING_TYPE,
            actionEvent = (typeof obj.event !== 'undefined') ? obj.event : DEFAULT_ACTION_EVENT;

        switch (type) {
            case 'delay':
                jQuery(selector).on(actionEvent, function () {
                    _track(paramVal, mboxName);
                    if (typeof this.href === 'string')
                        setTimeout("location='" + this.href + "'", 750);
                    return false;
                });
                break;
            case 'signaler':
                jQuery(selector).on(actionEvent, function () {
                    mboxFactoryDefault.getSignaler().signal(mboxName, mboxName, "clicked=" + paramVal);
                });
                break;
            default:
                if (selector.length > 0)
                    jQuery(selector).on(actionEvent, function () { _track(paramVal, mboxName); });
                else
                    _track(paramVal, mboxName);
        }
    };

    Adbett.setCookie = function (name, val, days, domain, path) {
        var dt = new Date();
        dt.setTime(dt.getTime() + (days * 24 * 60 * 60 * 1000));
        var _cookie = {
            name: name,
            value: val,
            days: days,
            domain: (domain) ? domain : "",
            path: (path) ? path : "/",
            exp: dt.toGMTString()
        };
        _saveCookie(_cookie);
    };
    var _saveCookie = function (cookie) {
        document.cookie = cookie.name + "=" + cookie.value +
                "; expires=" + cookie.exp +
                "; path=" + cookie.path + "" +
                ((cookie.domain != "") ? "; domain=" + cookie.domain : "");
    };
    Adbett.getCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    mboxFactoryDefault.addOnLoad(function () {

        jQuery("#taoYourRateClick").on('click', function () {
            mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=YourRateCW");
        });

    });

}(Adbett);
