jQuery(document).ready(function (jQuery) {

    // create a boolean to track if a popup is visible or not
    var taoPopupVisible = false;

    // Set up a watch for all clicks on the page. If the widget is being shown,
    // then close it.
    jQuery('body').on('click', function () {
        if (taoPopupVisible == true) {
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
        jQuery(this).replaceWith('<div class="price-fighter-widget" data-pf-hotelkey="6e7dd50235b6f9def5cbf723d630411f0507c358"></div>');
    });

    // Capture a click on the Compare Link and determine what needs to be done
    jQuery('.taoCompare').click(function (event) {
        if (taoPopupVisible == false) {

            // Show/hide widget container
            jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').toggleClass('show-widget');

            // make taoPopupVisible true
            taoPopupVisible = true;

            // prevent page from scrolling to top after click event
            event.preventDefault();
            event.stopPropagation();

        } else {

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

                // prevent page from scrolling to top after click event
                event.preventDefault();
                event.stopPropagation();

            }
        }

    });

    // Add data attribute for access to TripTease CSS
    jQuery('.srBody').attr('data-pf-custom-css', 'https://prodcache.internal.ihg.com/content/dam/etc/media_library/cn/0/cn/css/sr/tao-triptease-exp-B.css');

});

