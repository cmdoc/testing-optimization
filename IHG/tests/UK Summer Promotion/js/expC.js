// Hide the banner image at the top until the new banner loads
Bootstrapper.MVT.injectCSS("div.container div.image img { display:none; }");
Bootstrapper.MVT.injectCSS("div.container div.image { height: 342px; }");
Bootstrapper.MVT.injectCSS("a[href='#belgium'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#france'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#germany'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#italy'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#netherlands'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#portugal'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#russia'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#spain'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#turkey'] img { display:none; }");
Bootstrapper.MVT.injectCSS("a[href='#greatbritain'] img { display:none; }");

jQuery(document).ready(function () {

    // Let's set up all of our image URLs
    // PERCENT OFF
    var banner = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=pBDao7U16gjLA9PVpOykC%2f3MHleg2s7pzdIkeIrBhUk%3d&docid=016de2f0355ea4530acf49c7ff6ea95aa";

    var belgium = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=2buFi9h7mZwh32DOfktNdNJmmfWByPbDDXf1ANoF4p0%3d&docid=03a819f8e060142e99e5cb71d43a78e23";

    var france = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=FgGtb42m5Dj%2fTjfbAD4Q%2bi2cTDHb0IUBtFS8sgkz6TM%3d&docid=05064a8b050dc4289bb16fba8b51e32a3";

    var germany = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=CCDdxeZKC%2bWCDAa20yZtAkFx4oJ%2fmwo2dMD8S3b4Vqg%3d&docid=0a70c989a1641431b8c4b0c30c79b3ba2";

    var italy = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=eI6TmI0xEJdwBmG1IKgMsHsJQob7rHnSx5qT%2bo1vUaY%3d&docid=03ca9f71b4726425dbb7f9f6fb7a91218";

    var netherlands = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=i6Rb4e1N397CiD%2bnT3T9SLMezsSURxIoUj0iI6zYxvU%3d&docid=0b8259557670b401fafce4c190585e1a3";

    var portugal = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=mYf7HIGP2uETUM%2botNi129PjHU5Gp0U7aEDmkICAk%2b8%3d&docid=04023d496a7284743af1dc68b9c2d91c3";

    var russia = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=l8sHoUECAuEP9VPjkWK6Smul6bDiOn45gDx6JqJh75s%3d&docid=00159fa6b82bd43159a2a3c1e7f8573dc";

    var spain = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=bLwXpgsN0JSpbSWnC6nkJ9PMH4b3v9KIgd3Rg7Gy2QQ%3d&docid=0f1e04d6e474744d7b264f34ce7c28c7c";

    var turkey = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=GOsJBWIrd7SkCAudanQoaOPZ4P3coRy8M%2fbEL%2fnnBsU%3d&docid=0b1baf7d25dde4118a1388b9c3df61ea7";

    var ukireland = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=hokQcbbwX%2bhCj65DQ7iFpEbQ8TUUbJlqfxGUC4L9W6k%3d&docid=09376bd8ab969482585e83a3ebbd2a4b0";

    // Put in a .load() call so when the new banner image finishes loading we 
    // know when to show it.
    jQuery("div.container div.image img").load(function () {
        jQuery("div.container div.image img").show();
    });

    jQuery("a[href=#belgium] img").load(function () {
        jQuery("a[href=#belgium] img").show();
    });

    jQuery("a[href=#france] img").load(function () {
        jQuery("a[href=#france] img").show();
    });

    jQuery("a[href=#germany] img").load(function () {
        jQuery("a[href=#germany] img").show();
    });

    jQuery("a[href=#italy] img").load(function () {
        jQuery("a[href=#italy] img").show();
    });

    jQuery("a[href=#netherlands] img").load(function () {
        jQuery("a[href=#netherlands] img").show();
    });

    jQuery("a[href=#portugal] img").load(function () {
        jQuery("a[href=#portugal] img").show();
    });

    jQuery("a[href=#russia] img").load(function () {
        jQuery("a[href=#russia] img").show();
    });

    jQuery("a[href=#spain] img").load(function () {
        jQuery("a[href=#spain] img").show();
    });

    jQuery("a[href=#turkey] img").load(function () {
        jQuery("a[href=#turkey] img").show();
    });

    jQuery("a[href=#greatbritain] img").load(function () {
        jQuery("a[href=#greatbritain] img").show();
    });

    // Replace all of the images
    jQuery("div.container div.image img").attr("src", banner);
    jQuery("a[href=#belgium]").find("img").attr("src", belgium);
    jQuery("a[href=#france]").find("img").attr("src", france);
    jQuery("a[href=#germany]").find("img").attr("src", germany);
    jQuery("a[href=#italy]").find("img").attr("src", italy);
    jQuery("a[href=#netherlands]").find("img").attr("src", netherlands);
    jQuery("a[href=#portugal]").find("img").attr("src", portugal);
    jQuery("a[href=#russia]").find("img").attr("src", russia);
    jQuery("a[href=#spain]").find("img").attr("src", spain);
    jQuery("a[href=#turkey]").find("img").attr("src", turkey);
    jQuery("a[href=#greatbritain]").find("img").attr("src", ukireland);

});
