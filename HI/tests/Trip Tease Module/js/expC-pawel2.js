function taoTripTeaseModule() {

    // Replace original TT container with this
    jQuery('.row.trip-tease-container').each(function () {

        // PL: find the closest .resRow and input[type=hidden].selectedHotelCode => the value is what we need to put in data-pf-property
        var result = jQuery(this).closest('.resRow');
        var propertyCode = result.find('input[type=hidden].selectedHotelCode').val();

        // See if the propertyCode is in the list of Hotel Codes. If not, then
        // return true and skip to the next .row.trip-tease-container.
        if (jQuery.inArray( propertyCode, taoAllHotelCodes ) < 0 ) {
            return true;
        }

        // PL: use the property code in the show button (so that we know which widget to activate
        result.find('.taoCompare').data('pf-property', propertyCode.toLowerCase());

        // PL: use a global roomkey_config variable (found when inspecting the sources) to extract the params we need
        var checkin = roomkey_config.check_in_val;
        var checkout = roomkey_config.check_out_val;
        var adults = roomkey_config.guests_val;
        var children = 0; //TODO - is this really correct

        // PL: get the direct price
        //var direct = result.find('.txtFromNow .mainCurrencyUnitValue.cc_number').text().trim();
        var direct = result.find('.priceNow .mainCurrencyUnitValue.cc_number').text().trim();
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
            'data-pf-layout="skeleton-1"' +            'data-pf-custom-css="https://prodcache.internal.ihg.com/content/dam/etc/media_library/cn/0/cn/css/sr/tao-triptease-exp-C.css">' +
            '</div>');
    });

    // Move 'price-fighter-widget' into each '.pillBox' container
    jQuery('.pillBox').each(function(){

        jQuery(this).find('.price-fighter-widget').appendTo(jQuery(this) );

    });
    // Remove widget when no dates are available or have not been selected
    jQuery('.priceInfoArea .bulkAvailLinkBox').parent().next().next().next().remove('.price-fighter-widget');
    jQuery('.priceInfoArea .priceMsgNotAvail').parent().parent().next().next().next().remove('.price-fighter-widget');

    //PL reload paperboy
    jQuery.getScript('https://paperboy.triptease.net/IHG.js');

}