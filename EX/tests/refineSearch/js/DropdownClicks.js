Adbett=window.Adbett||{};
!function(A) {

    var DEFAULT_MBOX_NAME     = 'mboxClickTrack',
        DEFAULT_ACTION_EVENT  = 'click',
        DEFAULT_TRACKING_TYPE = 'delay';

    var _track = function(paramVal, mboxName){       
        (function(mbox) { var d = new Date(); if (window.mboxFactoryDefault) { var ub = mboxFactoryDefault.getUrlBuilder().clone(); ub.addParameter("mbox", mbox); ub.addParameter('mboxTime', d.getTime() - (d.getTimezoneOffset() * 60000)); ub.addParameters(Array.prototype.slice.call(arguments).slice(1)); var img = new Image(); img.src = ub.buildUrl().replace("/mbox/undefined", "/mbox/ajax"); img.style.display = "none"; if (document.body) document.body.insertBefore(img,document.body.firstChild); } 
        })( (typeof mboxName === 'string') ? mboxName : "mboxClickTrack", "clicked="+paramVal );
    };

    A.track = A.track||function(obj){
        var selector =    (typeof obj.selector  !== 'undefined') ? obj.selector    : '', 
            paramVal =    (typeof obj.value     !== 'undefined') ? obj.value       : '', 
            mboxName =    (typeof obj.mboxName  !== 'undefined') ? obj.mboxName    : DEFAULT_MBOX_NAME,
            type =        (typeof obj.type      !== 'undefined') ? obj.type        : DEFAULT_TRACKING_TYPE,
            actionEvent = (typeof obj.event     !== 'undefined') ? obj.event : DEFAULT_ACTION_EVENT;
        
        switch(type){
            case 'delay':
                jQuery(selector).on(actionEvent,function() {
                    _track(paramVal, mboxName);
                    if(typeof this.href === 'string')
                        setTimeout("location='" + this.href + "'",750);
                    return false;
                });
                break;
            case 'signaler':
                jQuery(selector).on(actionEvent,function() {
                    mboxFactoryDefault.getSignaler().signal(mboxName, mboxName, "clicked="+paramVal);
                });
                break;
            default:
                if (selector.length > 0)
                    jQuery(selector).on(actionEvent,function() { _track(paramVal, mboxName); });
                else
                    _track(paramVal, mboxName);                
        }
    };

    Adbett.setCookie = function(name,val,days,domain,path){
        var dt = new Date();
        dt.setTime(dt.getTime()+(days*24*60*60*1000));
        var _cookie = {
            name    : name,
            value   : val,
            days    : days,
            domain  : (domain) ? domain : "",
            path    : (path) ? path : "/",
            exp     : dt.toGMTString()
        };
        _saveCookie(_cookie);  
    };
    var _saveCookie = function(cookie){
        document.cookie = cookie.name+"="+cookie.value+
                "; expires="+cookie.exp+
                "; path="+cookie.path+""+
                ((cookie.domain!="")?"; domain="+cookie.domain:"");
    };
    Adbett.getCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };

    mboxFactoryDefault.addOnLoad(function () {

        // Create a set of boolean variables to track what filters are 
        // clicked on by the user
        var taoRatingsFilter = false,
            taoAmenitiesFilter = false,
            taoBrandsFilter = false,
            taoMiscFilter = false,
            taoDistanceFilter = false;

        // Whenever the user clicks on one of the items inside a filter, mark
        // the corresponding variable as true.
        jQuery("#ratingsFilter").next().find("label").on("click", function () {
            taoRatingsFilter = true;
        });

        jQuery("#amenitiesFilter").next().find("label").on("click", function () {
            taoAmenitiesFilter = true;
        });

        jQuery("#brandsFilter").next().find("label").on("click", function () {
            taoBrandsFilter = true;
        });

        jQuery("#miscFilter").next().find("label").on("click", function () {
            taoMiscFilter = true;
        });

        jQuery("#distanceFilter").next().find("label").on("click", function () {
            taoDistanceFilter = true;
        });

        // When the Apply Filter button is clicked, go through the list of
        // variables and see what filters have been altered
        jQuery("#btnApplyFilter").on('click', function () {
            if (taoRatingsFilter) {
                mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=ratings-filter"); //track clicks on Ratings Filter
            }
            if (taoAmenitiesFilter) {
                mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=amenties-filter"); //track clicks on Amenities Filter
            }
            if (taoBrandsFilter) {
                mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=brands-filter"); //track clicks on Brands Filter
            }
            if (taoMiscFilter) {
                mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=misc-filter"); //track clicks on Misc Filter
            }
            if (taoDistanceFilter) {
                mboxFactoryDefault.getSignaler().signal("mboxClickTrack", "mboxClickTrack", "clicked=distance-filter"); //track clicks on Distance Filter
            }
        });

    });

}(Adbett);