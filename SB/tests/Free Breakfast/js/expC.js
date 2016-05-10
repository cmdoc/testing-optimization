<svg xmlns="http://www.w3.org/2000/svg" style="display: none">
	<symbol id="taoCheckMark" viewBox="0 0 100 125">
			<path d="M48.44 75.93h0L19.23 46.73l13.31-13.31 15.9 15.9 35.73-35.73C75.22 5.19 63.23 0.02 50 0.02c-27.61 0-49.99 22.38-49.99 49.99C0.01 77.61 22.39 100 50 100c27.61 0 49.99-22.39 49.99-49.99 0-7.5-1.7-14.58-4.66-20.97L48.44 75.93z"/>
	</symbol>
</svg>


jQuery(document).ready(function () {

    // create a variable that holds the checkmark icon
    var taoCheck = '<svg class="taoCheckStyles"><use xlink:href="#taoCheckMark" /></svg>';

    // Look up all rows for rates and insert #taoFreeBrkfst DIV 
    jQuery("<div class='taoFreeBrkfst'>" + taoCheck + " This room includes free breakfast and Internet!</div>").insertAfter(".headerWrapper span.roomLongDescription");

});

