﻿// Hide the new CTA message before we move it into place.
Bootstrapper.MVT.injectCSS(".hero-section img.lazyload { display:none; }");


jQuery(document).ready(function () {

    // Grab the hero image and change the image for desktop and tablet.
    var $taoHero = jQuery(".hero-section img.lazyload");
    $taoHero.attr("src", "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=aOFSrnDTQn0x0Bhz4u%2fN6V2E%2fn5vUoT%2fbwpKSHCWYdQ%3d&docid=073f3d36897054dc095c8fd304289d4d1");
    $taoHero.attr("data-desktop", "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=aOFSrnDTQn0x0Bhz4u%2fN6V2E%2fn5vUoT%2fbwpKSHCWYdQ%3d&docid=073f3d36897054dc095c8fd304289d4d1");
    $taoHero.attr("data-tablet", "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=aOFSrnDTQn0x0Bhz4u%2fN6V2E%2fn5vUoT%2fbwpKSHCWYdQ%3d&docid=073f3d36897054dc095c8fd304289d4d1");

    // Now wrap the image with a <a> tag
    $taoHero.wrap("<a href='/hotels/us/en/global/offers/member/yourrate' id='taoYourRateClick'></a>");

    // Finally, show the image
    $taoHero.show();
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
            mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=YourRate");
        });

    });

}(Adbett);
