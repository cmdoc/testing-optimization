	jQuery(document).ready( function () {

		// Grab all of the .rewardRate <div>s, loop through them, and 
		// change their HTML/CSS to display as a dropdown instead of a 
		// radio button.
		jQuery(".rewardRate").each(function() {

			// Grab everything inside .rewardRate and wrap it with new <div>s 
			// containing dropdown classes
			var rewardRateInnerHtml = jQuery(this).html();
			jQuery(this).html("<div class='tao-drop'>" + rewardRateInnerHtml + "</div>");
			jQuery(this).find(".tao-drop").wrap("<div class='tao-drop-wrap'></div>");

			// Insert .result class <div>
			jQuery(this).find(".tao-drop-wrap").prepend("<div class='tao-result'>" +
															"<span class='tao-choose'>Choose...</span>" +
															"<span class='tao-arrow'>&#9662;</span>" +
														"</div>");

			// Grab everything inside .drop inner <div>s.  Loop through them
			// and build new structure with all <span>s and hidden <input>
			// inside new <label><span> wrapper
			jQuery(this).find(".tao-drop div").each(function () {
				var radioButton = jQuery(this).children("input[type='radio']").prop('outerHTML');
				jQuery(this).children("input[type='radio']").remove();
				var dropOption = jQuery(this).html();
				jQuery(this).html(radioButton + 
							 "<label><span class='tao-rewardText'>" +
							 	dropOption +
							 "</span></label>");
			});

		});


		// DropLabel jQuery:
		// When the user clicks on the label inside the dropdown, open up the view
		// of all options to choose from
		jQuery(".tao-result").click(function() {
		    jQuery(this).siblings(".tao-drop").slideToggle("fast");
		});

		// When the user clicks on one of the options inside the dropdown, put 
		// that option in the .drop-wrap .result box, trigger a click on the 
		// radio button, and close the dropdown.
		jQuery(".tao-drop label").on("click", function() {
		    var labelText = jQuery(this).find(".tao-rewardText").html();
		   	var dropDownArrow = "<span class='tao-arrow'>&#9662;</span>";
		    jQuery(this).parents(".tao-drop-wrap").children(".tao-result").html(labelText + dropDownArrow);
		    jQuery(this).siblings("input[type='radio']").click();
//		    jQuery(this).parents(".tao-drop").slideUp("fast");
		    jQuery(this).parents(".tao-drop").hide();

		    // update the value of the input (submit) button with the value of 
		    // the radio button selected and points needed.  To do this, grab the 
		    // name attribute of the button, split it into an array, change the 
		    // values for the total points and selected radio button value,
		    // and then finally write that back to the button's name attribute.
		    var submitName = jQuery(this).parents(".priceInfoArea").siblings(".rateSelectionArea")
		    		.find("input").attr("name");
		    var nameArray = submitName.split("_");

		    nameArray[3] = jQuery(this).siblings("input[type='radio']").val();
		    nameArray[5] = jQuery(this).find(".points").text().trim().replace(",", "");

		    var newSubmitName = nameArray.join("_");

		    jQuery(this).parents(".priceInfoArea").siblings(".rateSelectionArea")
		    		.find("input").attr("name", newSubmitName);

		});

	});
