
jQuery(document).ready(function (jQuery) {

  jQuery('<div class="taoFilterParent"></div>').prependTo('.tabwell #filterSortForm fieldset > .controls-row:eq(0)');

  // REMOVE UNWANTED FORM FIELDS
  jQuery('#filterSortForm .controls-row:eq(1)').hide(); // hide 'distance from destination' inputs

  // BUILD SHOW/HIDE EVENT
  jQuery('.spanOffset:eq(3)').addClass('taoPlus'); // add 'taoPlus' to initiate show/hide

  jQuery('.spanOffset.taoPlus').on('click', function (event) {
    event.preventDefault();
    jQuery('.tabwell #filterSortForm fieldset > .controls-row:eq(0)').slideToggle(500, function() {
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
    jQuery('.taoFourStars label, .taoThreeStars label, .taoTwoStars label, .taoOneStar label').contents().filter(function() {
      return this.nodeType === 3;
    }).remove(); // remove label text from node
    jQuery('#ratingsFilter + .btn-group'); // Remove all "btn-group" drop down's in "col-md-12"
    jQuery('.taoRatings').prevAll('.taoRatings').remove();

    // GUEST RATINGS: ALLOW ONLY ONE CHECKBOX TO BE SELECTED
    jQuery('.taoRatings input:radio').on('click', function() {
      jQuery('.taoRatings input:radio').not(this).prop('checked', false);
    });  

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

    // ALL AMENITIES: REMOVE 'DISABLED' ATTRIBUTE AND UNCHECK CHECKBOX
    jQuery('.amenitiesLeftCol input:checkbox, .amenitiesRightCol input:checkbox').change(function() {
      jQuery('.disabled input:checkbox').removeAttr('disabled').prop("checked", false); // disable checkbox
      jQuery('.amenitiesLeftCol li:eq(0)').removeClass('disabled active'); // remove classes on first list item only
    });

    // ALL AMENITIES: ADD 'DISABLED' ATTRIBUTE AND CLASS NAME, CHECK/UNCHECK CHECKBOX
    jQuery('.amenitiesLeftCol .dimSelected li:first-child input:checkbox').change(function() {
      jQuery(this).attr('disabled', true).prop('checked', true);
      jQuery('.amenitiesLeftCol .dimSelected li:first-child').addClass('disabled active');
      jQuery('.amenitiesLeftCol .dimSelected li:gt(0) input, .amenitiesRightCol .dimSelected li input').prop('checked', false);
    });

    // If any checkbox is checked, and 'All Amenities' is NOT checked, disable 'All Amenities'
    jQuery('.taoAmenities .dimSelected input:checkbox:eq(0)').change(function () {
        jQuery(this).prop('checked', jQuery(this).prop('checked')).attr('disabled', true); // disable
        jQuery('.taoAmenities .dimSelected input:checkbox:gt(0)').prop('checked', false); // uncheck
    });

    // If any checkbox greater than 'All Amenities' is checked, uncheck and enable 'All Amenities'
    jQuery('.taoAmenities .dimSelected input:checkbox:gt(0)').change(function () {
      jQuery('.taoAmenities .dimSelected input:checkbox:eq(0)').attr('disabled', false).prop('checked', false); // enable all checkboxes
    });

    // If ALL checkboxes are unchecked, check and disable 'All Amenities'
    jQuery('.taoAmenities .dimSelected input:checkbox:gt(0)').change(function() {
      if (jQuery(this).prop('checked') === false) { // if 'All Amenities' is NOT checked
        if (jQuery(".taoAmenities input[type=checkbox]:checked").length < 1) { // if ANY checkbox less than this is checked
          jQuery('.taoAmenities .dimSelected input:checkbox:eq(0)').attr('disabled', true).prop('checked', true); // check and disable 'All Amenities'
          jQuery('.amenitiesLeftCol li:eq(0)').addClass('disabled active'); // add classes 'disabled' and 'active'
          jQuery('.amenitiesLeftCol li, .amenitiesRightCol li').addClass('active'); // add class name 'active'
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

    // If 'All IHG Brands' is NOT selected, uncheck ALL inputs except 'EX'
    /*jQuery('.taoBrands .dimSelected input:checkbox:eq(0)').change(function() {
      // uncheck all checkboxes
      if (jQuery(this).prop('checked') === false) {
        jQuery('.taoBrands .dimSelected input:checkbox:gt(1), .taoBrands .dimSelected input:checkbox:lt(1)').prop('checked', false);
        jQuery('.taoBrands li:lt(1), .taoBrands li:gt(1)').removeClass('active'); // remove class on all except 'EX'
        //alert("All IHG Brands was unchecked.");
      }
    });*/

    // If 'All IHG Brands' is selected, check ALL inputs
    /*jQuery('.taoBrands .dimSelected input:checkbox:eq(0)').change(function() {
      if (jQuery(this).prop('checked') === true) {
        jQuery('.taoBrands .dimSelected input:checkbox').prop('checked', true);
        jQuery('.taoBrands .dimSelected li').addClass('active');
        //alert("All IHG Brands was checked.");
      }
    });*/

    // If any input AFTER 'All Brands' is unchecked, uncheck 'All Brands'
    jQuery('.taoBrands .dimSelected input:checkbox:gt(0)').change(function() {
      if (jQuery(this).prop('checked') === false) {
        if (jQuery(".taoBrands input[type=checkbox]:checked").length > 1) { // if ANY checkbox greater than this is checked
          jQuery('.taoBrands .dimSelected input:checkbox:eq(0)').prop('checked', false); // uncheck 'All Brands'
          jQuery('.taoBrands .dimSelected li').removeClass('active'); // remove class
          //alert("All IHG Brands was unchecked.");
        }
      }
    });

    /* ----------------------------------------------- */

    // BUILD FILTER BY BLOCK
    jQuery('<div class="taoFilterBy"><h3 class="taoFilterByHeading">Filter By</h3></div>').appendTo('.taoFilterParent');
    jQuery('#miscFilter + .spanB1 > .dropdown-menu').appendTo('.taoFilterBy');
    jQuery('.taoFilterBy').nextAll('.taoFilterBy').remove();

    // Allow only one (Smoking or non-smoking) checkbox to be selected
    jQuery('.taoFilterBy input:checkbox:eq(2)').on('click', function() {
      jQuery('.taoFilterBy input:checkbox:eq(3)').not(this).prop('checked', false); // uncheck if "non-smoking room"
      if (jQuery('.taoFilterBy input:checkbox:eq(2)').prop('checked') === true) {
        jQuery('.taoFilterBy li:eq(3)').removeClass('active'); // remove class 'active' if "non-smoking" is checked
      }
    });

    jQuery('.taoFilterBy input:checkbox:eq(3)').on('click', function() {
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
