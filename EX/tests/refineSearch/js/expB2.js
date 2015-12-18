// Create two new DIVs to put everything in
jQuery("#filterSortForm").append("<div id='taoNewFilters'></div>");
jQuery("#filterSortForm").append("<div id='taoNewSortOptions'></div>")

// Move the <form> to the new #taoNewFilters DIV
var $taoFilterSortForm = jQuery("#filterSortForm");
//jQuery("#taoNewFilters").append($taoFilterSortForm);
jQuery($taoFilterSortForm).insertAfter(jQuery("#modifySearch").next());

// Remove the existing 'Refine Your Results' 
jQuery("#sortOptions").remove();

// Move the "Apply" button to the form in the new DIV  
var $taoApplyButton = jQuery("#btnApplyFilter");
jQuery("#taoNewFilters").prepend("<div id='taoBlueButton' class='taoBlock'></div>");
jQuery("#taoBlueButton").append($taoApplyButton);
jQuery("#btnApplyFilter").attr("value", "apply filters");

// Insert a DIV for the Distance from Destination block
jQuery("#taoNewFilters").prepend("<div id='taoDistance' class='taoBlock'></div>");

// Grab the distance dropdown, radio buttons, and title.  Then move it to 
// the form in the new DIV
var $taoDistanceSelect = jQuery("#distanceFilter");
var $taoDistanceDiv = jQuery("#distanceFilter").next();
var $taoDistanceMiles = jQuery("#distanceFilter").siblings("label").eq(0);
var $taoDistanceKilos = jQuery("#distanceFilter").siblings("label").eq(1);
var $taoDistanceTitle = jQuery("#distanceFilter").siblings("span");

jQuery("#taoDistance").append($taoDistanceTitle);
jQuery("#taoDistance span").text("Distance from Destination");
jQuery("#taoDistance").append($taoDistanceSelect);
jQuery("#taoDistance").append($taoDistanceDiv);
jQuery("#taoDistance").append($taoDistanceMiles);
jQuery("#taoDistance").append($taoDistanceKilos);

// Insert the DIVs that I will need to move around the dropdowns in the filter
jQuery("#taoNewFilters").prepend("<div id='taoBrandsFilterBy' class='taoBlock'></div>");
jQuery("#taoNewFilters").prepend("<div id='taoRatingsAmenties' class='taoBlock'></div>");
jQuery("#taoBrandsFilterBy").prepend("<div id='taoFilterBy'></div>");
jQuery("#taoBrandsFilterBy").prepend("<div id='taoIHGBrands'></div>");
jQuery("#taoRatingsAmenties").prepend("<div id='taoAmenities'></div>");
jQuery("#taoRatingsAmenties").prepend("<div id='taoGuestRatings'></div>");

// Grab the SELECT and button-grp DIV for each dropdown
var $taoGuestsRatingsSelect = jQuery("#ratingsFilter");
var $taoGuestRatingsDiv = jQuery("#ratingsFilter").next();
var $taoAmenitiesSelect = jQuery("#amenitiesFilter");
var $taoAmenitiesDiv = jQuery("#amenitiesFilter").next();
var $taoIHGBrandsSelect = jQuery("#brandsFilter");
var $taoIHGBrandsDiv = jQuery("#brandsFilter").next();
var $taoFilterBySelect = jQuery("#miscFilter");
var $taoFilterByDiv = jQuery("#miscFilter").next();

// Move the four pairs into the new DIVs the were created
jQuery("#taoGuestRatings").append($taoGuestsRatingsSelect);
jQuery("#taoGuestRatings").append($taoGuestRatingsDiv);
jQuery("#taoAmenities").append($taoAmenitiesSelect);
jQuery("#taoAmenities").append($taoAmenitiesDiv);
jQuery("#taoIHGBrands").append($taoIHGBrandsSelect);
jQuery("#taoIHGBrands").append($taoIHGBrandsDiv);
jQuery("#taoFilterBy").append($taoFilterBySelect);
jQuery("#taoFilterBy").append($taoFilterByDiv);

// Finally, put the new 'Refine Your Results' title in place
jQuery("#taoNewFilters").prepend("<p><b>Refine Your Results</b></p>");


// Now, go to work on moving the sorting options and currency bar to the
// right spot, just below the new DIV.
var $taoSortingOpts = jQuery("#sortOptionsRow");
jQuery("#taoNewSortOptions").prepend($taoSortingOpts);


/*

// Insert the DIVs that I will need to move around the dropdowns in the filter
jQuery("<div id='taoFilterBy'></div>").insertAfter("#filterSortForm fieldset div.col-md-12");
jQuery("<div id='taoIHGBrands'></div>").insertAfter("#filterSortForm fieldset div.col-md-12");
jQuery("<div id='taoAmenities'></div>").insertAfter("#filterSortForm fieldset div.col-md-12");
jQuery("<div id='taoGuestRatings'></div>").insertAfter("#filterSortForm fieldset div.col-md-12");
jQuery("<div id='taoRatingsAmenties'></div>").insertAfter("#filterSortForm fieldset div.col-md-12");
jQuery("<div id='taoBrandsFilterBy'></div>").insertAfter("#filterSortForm fieldset div.col-md-12");


// Grab the SELECT and button-grp DIV for each dropdown
var $taoGuestsRatingsSelect = jQuery("#ratingsFilter");
var $taoGuestRatingsDiv = jQuery("#ratingsFilter").next();
var $taoAmenitiesSelect = jQuery("#amenitiesFilter");
var $taoAmenitiesDiv = jQuery("#amenitiesFilter").next();
var $taoIHGBrandsSelect = jQuery("#brandsFilter");
var $taoIHGBrandsDiv = jQuery("#brandsFilter").next();
var $taoFilterBySelect = jQuery("#miscFilter");
var $taoFilterByDiv = jQuery("#miscFilter").next();

// Move the four pairs into the new DIVs the were created
jQuery("#taoGuestRatings").append($taoGuestsRatingsSelect);
jQuery("#taoGuestRatings").append($taoGuestRatingsDiv);
jQuery("#taoAmenities").append($taoAmenitiesSelect);
jQuery("#taoAmenities").append($taoAmenitiesDiv);
jQuery("#taoIHGBrands").append($taoIHGBrandsSelect);
jQuery("#taoIHGBrands").append($taoIHGBrandsDiv);
jQuery("#taoFilterBy").append($taoFilterBySelect);
jQuery("#taoFilterBy").append($taoFilterByDiv);

*/