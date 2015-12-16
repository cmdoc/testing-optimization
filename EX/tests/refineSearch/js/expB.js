// Insert a DIV for the Distance from Destination block
jQuery("<div id='taoDistance'></div>").insertAfter("#filterSortForm fieldset div.col-md-12");

// Grab the distance dropdown, radio buttons, and title
var $taoDistanceSelect = jQuery("#distanceFilter");
var $taoDistanceDiv = jQuery("#distanceFilter").next();
var $taoDistanceMiles = jQuery("#distanceFilter").siblings("label").eq(0);
var $taoDistanceKilos = jQuery("#distanceFilter").siblings("label").eq(1);
var $taoDistanceTitle = jQuery("#distanceFilter").siblings("span");

// Move everything to the new DIV
jQuery("#taoDistance").append($taoDistanceTitle);
jQuery("#taoDistance span").text("Distance from Destination");
jQuery("#taoDistance").append($taoDistanceSelect);
jQuery("#taoDistance").append($taoDistanceDiv);
jQuery("#taoDistance").append($taoDistanceMiles);
jQuery("#taoDistance").append($taoDistanceKilos);

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

// Move Guest Ratings and Amenties into a new DIV
var $taoGuestRatings = jQuery("#taoGuestRatings");
var $taoAmenities = jQuery("#taoAmenities");
var $taoIHGBrands = jQuery("#taoIHGBrands");
var $taoFilterBy = jQuery("#taoFilterBy");
jQuery("#taoRatingsAmenties").append($taoGuestRatings);
jQuery("#taoRatingsAmenties").append($taoAmenities);
jQuery("#taoBrandsFilterBy").append($taoIHGBrands);
jQuery("#taoBrandsFilterBy").append($taoFilterBy);


// Organize the new DIVs so they stack correctly
