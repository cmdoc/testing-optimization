jQuery(document).ready(function (jQuery) {

    jQuery('<div class="taoFilterParent"></div>').prependTo('.tabwell #filterSortForm fieldset > .controls-row:eq(0)');

    // REMOVE UNWANTED FORM FIELDS
    jQuery('#filterSortForm .controls-row:eq(1)').hide(); // hide 'distance from destination' inputs

    // BUILD SHOW/HIDE EVENT
    jQuery('.spanOffset:eq(3)').addClass('taoPlus'); // add 'taoPlus' to initiate show/hide

    jQuery('.spanOffset.taoPlus').on('click', function (event) {
        event.preventDefault();
        jQuery('.tabwell #filterSortForm fieldset > .controls-row:eq(0)').slideToggle(500, function () {
            // animation complete
        });

        if ('label.spanOffset') {
            jQuery(jQuery(this).toggleClass('taoPlus taoMinus'));
        }
    });

    // BUILD AFTER AJAX COMPLETE FUNCTION
    jQuery(document).ajaxComplete(function (event, request, settings) {

        // BUILD  GUEST RATINGS BLOCK
        jQuery('<div class="taoRatings"><h3 class="taoRatingsHeading">Guest Ratings</h3></div>').prependTo('.taoFilterParent');
        jQuery('#ratingsFilter + .spanB1 > .dropdown-menu').appendTo('.taoRatings').wrapAll('<section></section>'); // Get dropmenu and add to 'taoRatings'
        jQuery('.taoRatings input:eq(0)').val('0'); // Change property type to checkbox, add value='x'
        jQuery('.taoRatings input:eq(1)').val('4');
        jQuery('.taoRatings input:eq(2)').val('3');
        jQuery('.taoRatings input:eq(3)').val('2');
        jQuery('.taoRatings input:eq(4)').val('1');
        jQuery('.taoRatings li:eq(1)').addClass('taoFourStars');
        jQuery('.taoRatings li:eq(2)').addClass('taoThreeStars');
        jQuery('.taoRatings li:eq(3)').addClass('taoTwoStars');
        jQuery('.taoRatings li:eq(4)').addClass('taoOneStar');
        jQuery('.taoFourStars label, .taoThreeStars label, .taoTwoStars label, .taoOneStar label').contents().filter(function () {
            return this.nodeType === 3;
        }).remove(); // remove label text from node
        jQuery('#ratingsFilter + .btn-group'); // Remove all "btn-group" drop down's in "col-md-12"
        jQuery('.taoRatings').prevAll('.taoRatings').remove();

        // GUEST RATINGS: ALLOW ONLY ONE CHECKBOX TO BE SELECTED
        jQuery('.taoRatings input:radio').on('click', function () {
            jQuery('.taoRatings input:radio').not(this).prop('checked', false);
        });

        // ADD "+" TO EACH INPUT
        jQuery('<span class="plus">+</span>').appendTo('.taoRatings li:gt(0)');
        jQuery('.plus').next('.plus').remove(); // remove duplicates

        /* ----------------------------------------------- */

        // BUILD AMENITIES BLOCK: Left Column
        jQuery('<div class="taoAmenities"><h3 class="taoAmenitiesHeading">Amenities</h3></div>').appendTo('.taoFilterParent');
        jQuery('#amenitiesFilter + .spanB1 > .dropdown-menu').appendTo('.taoAmenities').wrapAll('<section class="amenitiesLeftCol"></section>');

        // BUILD AMENITIES BLOCK: Right Column    
        jQuery('<section class="amenitiesRightCol"><ul class="multiselect-container dropdown-menu dimSelected"></ul></section>').insertAfter('.amenitiesLeftCol');
        var taoItems = jQuery('.amenitiesLeftCol li:gt(6)'); // Get list items greater than 7
        jQuery(taoItems).appendTo('.amenitiesRightCol ul');
        jQuery('.taoAmenities').nextAll('.taoAmenities').remove();
        jQuery('.amenitiesRightCol').prev('.amenitiesRightCol').remove(); // Remove duplicate


        // Capture a click on one of the amenities and figure out how to handle it
        jQuery('.amenitiesLeftCol input:checkbox, .amenitiesRightCol input:checkbox').on('click', function () {

            // Is this checkbox now checked?
            if (this.checked == true) {

                // Is this ALL AMENITES?
                if (jQuery(this).attr('value') == "all_amenities") {

                    // Add active and disabled classes to ALL AMENITES list item
                    jQuery("input[value='all_amenities']")
                            .prop('checked', true)
                            .attr('disabled', true)
                            .closest('li').addClass('disabled active');

                    // Loop through all the amenity checkboxes (except for ALL
                    // AMENITIES) and find the ones that are checked. Call a 
                    // click() function on each of these to unselect them.
                    jQuery('.amenitiesLeftCol .dimSelected li:gt(0) input, .amenitiesRightCol .dimSelected li input').each(function () {
                        if (jQuery(this).is(':checked')) {
                            jQuery(this).click();
                        }
                    });

                } else {  // This checkbox is not ALL AMENITIES

                    // Add active class to this list item
                    jQuery(this).closest('li').addClass('active');

                    // Is ALL AMENITIES checked?
                    if (jQuery("input[value='all_amenities']").is(':checked')) {

                        // Uncheck ALL AMENITIES, remove active class, and remove disabled
                        // attribute on ALL AMENITIES
                        jQuery("input[value='all_amenities']").prop('checked', false)
                               .attr('disabled', false)
                               .closest('li').removeClass('disabled active');
                    }

                }

            } else {  // This checkbox is not checked

                // Remove active class from this list item
                jQuery(this).closest('li').removeClass('active');

                // Are any other inputs checked?
                if (jQuery('.amenitiesLeftCol input:checkbox:checked, .amenitiesRightCol input:checkbox:checked').length == 0) {

                    // Check ALL AMENITIES;  Disable ALL AMENITIES; add active class to 
                    // ALL AMENITIES list item
                    jQuery("input[value='all_amenities']")
                            .prop('checked', true)
                            .attr('disabled', true)
                            .closest('li').addClass('disabled active');
                }
            }
        });

        /* ----------------------------------------------- */

        // BUILD BRANDS BLOCK: Left Column
        jQuery('<div class="taoBrands"><h3 class="taoBrandsHeading">IHG Brands</h3></div>').appendTo('.taoFilterParent');
        jQuery('#brandsFilter + .spanB1 > .dropdown-menu').insertAfter('.taoBrandsHeading').wrapAll('<section class="brandsLeftCol"></section>');

        // BUILD BRANDS BLOCK: Right Column    
        jQuery('<section class="brandsRightCol"></section>').insertAfter('.brandsLeftCol');
        var taoBrandItems = jQuery('.brandsLeftCol li:gt(6)');
        jQuery('.brandsRightCol').append('<ul class="multiselect-container dropdown-menu dimSelected"></ul>');
        jQuery(taoBrandItems).appendTo('.brandsRightCol ul');
        jQuery('.taoBrands').nextAll('.taoBrands').remove();
        jQuery('.brandsRightCol').prev('.brandsRightCol').remove(); // Remove duplicate
        jQuery('.brandsRightCol .multiselect-container:eq(1)').remove(); // Remove empty duplicate

        jQuery('.taoBrands .dimSelected input:checkbox:eq(0)').on('click', function () {

            // If 'All IHG Brands' is NOT checked, uncheck ALL inputs except 'EX'
            if (this.checked === false) {

                // Is this 'All IHG Brands'?
                if (jQuery(this).attr('value') == 'all_brands') {

                    // Add active and disabled classes to ALL AMENITES list item
                    jQuery("input[value='all_brands']")
                            .prop('checked', false)
                            .closest('li').addClass('active');

                    // Click on those checkboxes that are selected
                    jQuery('.taoBrands li:gt(1) input:checked').each(function () {
                        jQuery(this).click();
                    });

                }

            } else {

                // If 'All IHG Brands' IS checked, check ALL inputs
                if (jQuery(this).prop('checked') === true) {
                    jQuery('.taoBrands .dimSelected li').addClass('active');

                    // Click on those checkboxes that are selected
                    jQuery('.taoBrands .dimSelected li:gt(0) input:not(:checked)').each(function () {
                        jQuery(this).click();
                    });

                }

            }

        });

        jQuery('.taoBrands .dimSelected input:checkbox:gt(0)').on('click', function () {

            // If any signle brand is unchecked, also uncheck 'All IHG Brands', and remove classname 'active'
            if (this.checked === false) {

                // Is this any brand exept 'All IHG Brands'?
                if (jQuery(this).attr('value') != 'all_brands') {

                    // Remove 'active' class from 'ALL BRANDS' list item and uncheck its input
                    jQuery('input[value="all_brands"]')
                            .prop('checked', false)
                            .closest('li').removeClass('active');

                    // Each click, on any unchecked checkboxes
                    jQuery('.taoBrands .dimSelected li:gt(0) input:checked)').each(function () {
                        jQuery(this).click(); //simulate click
                    });

                }
            }

            // If more than 12 inputs are checked, also check 'All IHG BRANDS'
            if (this.checked === true) {

                // If 11 or more inputs are checked
                if (jQuery('.taoBrands .dimSelected input[type=checkbox]:checked').length > 11) {

                    jQuery('.taoBrands .checkbox input:checkbox:eq(0)')
                    .prop('checked', true)
                    .closest('li').addClass('active');

                    // Each click, on any unchecked checkboxes
                    jQuery('.taoBrands .dimSelected li:gt(0) input:checked)').each(function () {
                        jQuery(this).click(); //simulate click
                    });

                }
            }

        });

        /*
            jQuery('.taoBrands .dimSelected input:checkbox:eq(0)').on('click', function() {
              // If 'All IHG Brands' is NOT checked, uncheck ALL inputs except 'EX'
              if (jQuery(this).prop('checked') === false) {
                jQuery('.taoBrands .dimSelected input:checkbox:gt(1), .taoBrands .dimSelected input:checkbox:lt(1)').prop('checked', false);
                jQuery('.taoBrands li:lt(1), .taoBrands li:gt(1)').removeClass('active'); // remove class on all except 'EX'
              }
        
              // If 'All IHG Brands' IS checked, check ALL inputs
              if (jQuery(this).prop('checked') === true) {
                jQuery('.taoBrands .dimSelected input:checkbox').on('click', true);
                jQuery('.taoBrands .dimSelected li').addClass('active');
              }
            });
        
            // Clicking ANY input that does NOT have the value 'all_brands'
            jQuery('.taoBrands .checkbox input[value!=all_brands]').on('click', function() {
              if (jQuery(this).prop('checked') === true) {
                jQuery(this).parent().parent().parent().addClass('active'); // If this is clicked add class to list item
              } else {
                jQuery(this).parent().parent().parent().removeClass('active'); // If not remove the class name
                jQuery('.taoBrands .checkbox input:checkbox:eq(0)').prop('checked', false); // Uncheck 'All IHG Brands'
                jQuery('.taoBrands li:eq(0)').removeClass(); // Also remove 'active' from the 'All IHG Brands' list item
              }
            });
        
            // When any input after 'All IHG Brands' is checked
            jQuery('.taoBrands .checkbox input:checkbox:gt(0)').on('click', function() {
              // If 11 or more inputs are checked
              if (jQuery('.taoBrands .dimSelected input[type=checkbox]:checked').length > 11) {
                jQuery('.taoBrands .checkbox input:checkbox:eq(0)').prop('checked', true); // Check 'All IHG Brands'
                jQuery('.taoBrands .dimSelected li').addClass('active'); // Add the class name 'active' to the list item
              }
            });
        
        */

        /* ----------------------------------------------- */

        // BUILD FILTER BY BLOCK
        jQuery('<div class="taoFilterBy"><h3 class="taoFilterByHeading">Filter By</h3></div>').appendTo('.taoFilterParent');
        jQuery('#miscFilter + .spanB1 > .dropdown-menu').appendTo('.taoFilterBy');
        jQuery('.taoFilterBy').nextAll('.taoFilterBy').remove();

        // Allow only one (Smoking or non-smoking) checkbox to be selected
        jQuery('.taoFilterBy input:checkbox:eq(2)').on('click', function () {
            jQuery('.taoFilterBy input:checkbox:eq(3)').not(this).prop('checked', false); // uncheck if "non-smoking room"
            if (jQuery('.taoFilterBy input:checkbox:eq(2)').prop('checked') === true) {
                jQuery('.taoFilterBy li:eq(3)').removeClass('active'); // remove class 'active' if "non-smoking" is checked
            }
        });

        jQuery('.taoFilterBy input:checkbox:eq(3)').on('click', function () {
            jQuery('.taoFilterBy input:checkbox:eq(2)').removeClass('active').not(this).prop('checked', false); // uncheck if "smoking room"
            if (jQuery('.taoFilterBy input:checkbox:eq(3)').prop('checked') === true) {
                jQuery('.taoFilterBy li:eq(2)').removeClass('active');// remove class 'active' if "smoking" is checked
            }
        });

        /* ----------------------------------------------- */

        // REPOSITION 'APPLY' BUTTON
        jQuery('#btnApplyFilter').insertAfter('.taoFilterBy').val('Apply Filters');

        /* ----------------------------------------------- */

        // REMOVE DUPLICATE DIVs and BUTTON INPUTs AFTER INITIAL PAGE LOAD
        jQuery('#btnApplyFilter:eq(0) + .taoAmenities, #btnApplyFilter:eq(0) + .taoBrands, #btnApplyFilter:eq(0) + .taoFilterBy').remove();
        jQuery('.taoFilterBy:eq(1) ~ #btnApplyFilter').remove();

        /* ----------------------------------------------- */

        // REMOVE FILTER 'BUTTONS'
        jQuery('#ratingsFilter + .btn-group, #amenitiesFilter + .btn-group, #brandsFilter + .btn-group, #miscFilter + .btn-group').hide();

    }); // END AJAX COMPLETE FUNCTION

});

