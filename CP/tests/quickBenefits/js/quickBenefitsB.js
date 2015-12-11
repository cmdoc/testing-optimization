jQuery(document).ready(function() {

    // Grab the possible points from the offer
    var taoPointsOffer = jQuery(".sectionQuickEnroll .quickEnrollLeftHead span span").text().trim();

    // Change the offer text for experience two
    var taoNewOfferB = "Earn <b><span>" + taoPointsOffer + "</span> points</b> with this booking, " +
        "receive <b>free internet at any of our " +
        "hotels</b> and enjoy many other great benefits of " +
        "the <b>FREE IHG<sup>&reg;</sup> Rewards Club</b>."
    jQuery(".sectionQuickEnroll .quickEnrollLeftHead span").html(taoNewOfferB);

});