jQuery(document).ready(function () {

    // create a variable that holds the checkmark icon
    var taoCheck = '<svg xmlns="http://www.w3.org/2000/svg" class="taoCheckStyles"><path d="M48.4 75.9h0L19.2 46.7l13.3-13.3 15.9 15.9 35.7-35.7C75.2 5.2 63.2 0 50 0c-27.6 0-50 22.4-50 50C0 77.6 22.4 100 50 100c27.6 0 50-22.4 50-50 0-7.5-1.7-14.6-4.7-21L48.4 75.9z"/></svg>';

    // Look up all rows for rates and insert #taoFreeBrkfst DIV 
    jQuery("<div class='taoFreeBrkfst'>" + taoCheck + " This room includes free breakfast and Internet!</div>").insertAfter(".headerWrapper span.roomLongDescription");

});