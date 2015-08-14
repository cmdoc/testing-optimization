﻿
// Grab the current URL and put it into a string for evaluation
var taoLocation = window.location.toString();

// See if the sortby=Rate Type is already in the URL.  If not, then hide the
// page, change the sortby value to Rate Type, and replace this page with the
// right one.
if (taoLocation.indexOf("qRRSrt=rc") == -1 && (localStorage.getItem("taoSortBy") != "Room" || localStorage.getItem("taoSortBy") == null)) {

    Bootstrapper.MVT.injectCSS("body { display:none; }");

    var taoNewLocation = taoLocation.replace("qRRSrt=rt", "qRRSrt=rc");
    setTimeout( function () {
        window.location.replace(taoNewLocation);
    }, 40);

}

// Watch for any interaction with the Sort By dropdown and update our
// localStorage key-value pair with what option was picked
jQuery(document).ready(function () {

    jQuery(".sortBy").on("click", function (e) {

        var taoTarget = jQuery(e.target);

        if (taoTarget.text().indexOf("Room") !== -1) {
            localStorage.setItem("taoSortBy", "Room");
        } else if (taoTarget.text().indexOf("Rate") !== -1) {
            localStorage.setItem("taoSortBy", "Rate");
        }
    });

});

// The standard click-tracking code:
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

        // When the user clicks on the "sortBy" DIV, see which input type
        // they clicked on and record it as click-tracking in Target.
        jQuery("input[value='rt']").on("click", function () {
            mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=sortBy-room"); //track sort by room clicks (RT)
        });

        jQuery("input[value='rc']").on("click", function () {
            mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=sortBy-rate"); //track sort by rate clicks (RC)
        });

    });

}(Adbett);
