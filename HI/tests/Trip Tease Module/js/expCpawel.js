=============
//jshint strict:false
//jshint jquery:true
//jshint browser:true
//jshint camelcase:false
/*globals roomkey_config,Paperboy*/
 
// PL the above are linter directives so they can be removed by the build
jQuery(document).ready(function () {
 
    // create a boolean to track if a popup is visible or not
    var taoPopupVisible = false;
 
    // Set up a watch for all clicks on the page. If the widget is being shown,
    // then close it.
    jQuery('body').on('click', function () {
        if (taoPopupVisible === true) {
            jQuery('.show-widget').toggleClass('show-widget');
            taoPopupVisible = false;
        }
    });
 
    // Remove original Nightly Rate
    jQuery('.avgrate, .row .vatText').remove();

    // Place "Nightly Rate" text above price container
    jQuery('<span class="taoNightlyRate">Nightly Rate</span>').insertBefore('.priceNow');

    jQuery('.taoNightlyRate').each(function () {
        // Find each nightly rate and wrap it up
        jQuery(this).next('.priceNow').andSelf().wrapAll('<section class="taoPriceNowWrapper"></section>');
    });

    // Add anchor tag to each trigger widget pop-up
    jQuery('<a href="#" class="taoCompare">See how we compare</a>').insertAfter('.priceNow');

    // Replace original TT container with this
    jQuery('.row.trip-tease-container').each(function () {
        // PL: find the closest .resRow and input[type=hidden].selectedHotelCode => the value is what we need to put in data-pf-property
        var result = jQuery(this).closest('.resRow');
        var propertyCode = result.find('input[type=hidden].selectedHotelCode').val();
        // PL: use the property code in the show button (so that we know which widget to activate
        result.find('.taoCompare').data('pf-property', propertyCode.toLowerCase());
        // PL: use a global roomkey_config variable (found when inspecintg the sources) to extract the params we need
        var checkin = roomkey_config.check_in_val;
        var checkout = roomkey_config.check_out_val;
        var adults = roomkey_config.guests_val;
        var children = 0; //TODO - is this really correct
        // PL: get the direct price
        var direct = result.find('.txtFromNow .mainCurrencyUnitValue.cc_number').text().trim();
        console.log('Hotel: ', propertyCode, ' checkin: ', checkin, ' checkout: ', checkout, ' adults: ', adults );
        jQuery(this).replaceWith(
            '<div '+
                'class="price-fighter-widget ' + propertyCode.toLowerCase() + '"' +
                'data-pf-hotelkey="6e7dd50235b6f9def5cbf723d630411f0507c358"' +
                'data-pf-property="' + propertyCode +'"' +
                'data-pf-currency="GBP"' +
                'data-pf-checkin="' + checkin + '"' +
                'data-pf-checkout="' + checkout+'"' +
                'data-pf-direct-price="' + direct + '"'+
                'data-pf-room-rate=""'+
                'data-pf-adults="' + adults + '"' +
                'data-pf-rooms="1"' +
                'data-pf-children="' + children + '"' +
                'data-pf-layout="skeleton-1"' +
                'data-pf-activation="deferred"' +
                'data-pf-custom-css="https://prodcache.internal.ihg.com/content/dam/etc/media_library/cn/0/cn/css/sr/tao-triptease-exp-B.css">' +
            '</div>');
    });

    jQuery('.taoCompare').click(function (event) {
        if (taoPopupVisible === false) {

            // Show/hide widget container
            jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').toggleClass('show-widget');

            // PL: Deactivate all other widgets
            Paperboy.PriceCheck.deactivate(document.querySelectorAll('.price-fighter-widget'));
            // PL: Activate the widget using a CSS selector
            //Paperboy.PriceCheck.reset(document.querySelector('.price-fighter-widget.'+$(this).data('pf-property')));
            Paperboy.PriceCheck.activate(document.querySelector('.price-fighter-widget.'+$(this).data('pf-property')));

            // make taoPopupVisible true
            taoPopupVisible = true;

            // prevent page from scrolling to top after click event
            event.preventDefault();
            event.stopPropagation();

        } else {

            // PL: Deactivate all widgets using a CSS selector
            Paperboy.PriceCheck.deactivate(document.querySelectorAll('.price-fighter-widget'));

            // check to see if this popup is open. If so, close it.
            if (jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').hasClass('show-widget')) {

                jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').toggleClass('show-widget');

                // prevent page from scrolling to top after click event
                event.preventDefault();
                event.stopPropagation();

            } else {

                // If it is not open, then close the other one and open this one.
                jQuery('.show-widget').toggleClass('show-widget');
                jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').toggleClass('show-widget');

                // PL: Activate
                //Paperboy.PriceCheck.reset(document.querySelecotr('.price-fighter-widget.'+$(this).data('pf-property')));
                Paperboy.PriceCheck.activate(document.querySelector('.price-fighter-widget.'+$(this).data('pf-property')));

                // prevent page from scrolling to top after click event
                event.preventDefault();
                event.stopPropagation();

            }
        }

    });

    //PL reload paperboy
    jQuery.getScript('https://paperboy.triptease.net/IHG.js');
 
});
