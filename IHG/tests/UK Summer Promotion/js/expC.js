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
    var banner = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Desktop-IHG-percentage.jpg";

    var belgium = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Belgium_percent_308x308.jpg";

    var france = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/France_percent_308x308.jpg";

    var germany = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Germany_percent_473x473.jpg";

    var italy = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Italy_percent_308x308.jpg";

    var netherlands = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Netherlands_percent_308x308.jpg";

    var portugal = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Portugal_percent_308x308.jpg";

    var russia = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Russia_percent_308x308.jpg";

    var spain = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Spain_percent_308x308.jpg";

    var turkey = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/Turkey_percent_308x308.jpg";

    var ukireland = "https://prodcache.internal.ihg.com/content/dam/etc/media_library/branded/6c/en/us/lp/inc3314608_tao_uk_summer_pro/GB_percent_473x473.jpg";

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
