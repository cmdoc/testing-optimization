/**
 * Created by DaquinC on 8/12/2016.
 */
jQuery(document).ready(function (jQuery){

    // Replace original TT container with this
    jQuery('.row.trip-tease-container').each(function () {

        // PL: find the closest .resRow and input[type=hidden].selectedHotelCode => the value is what we need to put in data-pf-property
        var result = jQuery(this).closest('.resRow');
        var propertyCode = result.find('input[type=hidden].selectedHotelCode').val();

        // PL: use a global roomkey_config variable (found when inspecting the sources) to extract the params we need
        var checkin = roomkey_config.check_in_val;
        var checkout = roomkey_config.check_out_val;
        var adults = roomkey_config.guests_val;
        var children = 0; //TODO - is this really correct

        // PL: get the direct price
        var direct = result.find('div.priceNow span.mainCurrencyUnitValue.cc_number').text().trim();
        console.log('Hotel: ', propertyCode, ' checkin: ', checkin, ' checkout: ', checkout, ' adults: ', adults);
        jQuery(this).replaceWith(
            '<div '+
            'class="price-fighter-widget ' + propertyCode.toLowerCase() + '"' +
            'data-pf-hotelkey="6e7dd50235b6f9def5cbf723d630411f0507c358"' +
            'data-pf-property="' + propertyCode +'"' +
            'data-pf-currency="GBP"' +
            'data-pf-checkin="' + checkin + '"' +
            'data-pf-checkout="' + checkout+'"' +
            'data-pf-direct-price="' + direct + '"'+
            'data-pf-room-rate=""'+
            'data-pf-adults="' + adults + '"' +
            'data-pf-rooms="1"' +
            'data-pf-children="' + children + '"' +
            'data-pf-layout="skeleton-1"' +
            'data-pf-activation="deferred"' +
            'data-pf-custom-css="https://prodcache.internal.ihg.com/content/dam/etc/media_library/cn/0/cn/css/sr/tao-triptease-exp-C.css">' +
            '</div>');




    });

    /* THE FOLLOWING IS WHERE I LEFT OFF, AND MIGHT NOT BE THE RIGHT DIRECTION */
    // Move 'price-fighter-widget' into each '.pillBox' container
    jQuery('.pillBox').each(function(){

        var $ttWidget = jQuery(this).find('.price-fighter-widget');
        $ttWidget.appendTo(jQuery(this) );

        PFConfig.activate('.price-fighter-widget.' + $ttWidget.data('pf-property') );

    });

});