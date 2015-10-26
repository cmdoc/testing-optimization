jQuery(document).ready(function () {

    // Grab the hotels we want to move
    var crownePlaza = jQuery("#results_row_NYCMH").html();
    var interContinental = jQuery("#results_row_NYCHC").html();
    var indigo = jQuery("#results_row_NYCIN").html();

    // Let's try append to simply move the nodes
    jQuery("#results_row_NYCIN").prependTo("#searchResultContainer");
    jQuery("#results_row_NYCMH").prependTo("#searchResultContainer");
    jQuery("#results_row_NYCHC").prependTo("#searchResultContainer");

});