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
    // NO PRICE OFFERED
    var banner = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=WaOkhk%2bFIe0lr3pdVNZXFiI9Iqy2Csbn8ahc%2bs%2fBmz8%3d&docid=094306e15cc3f407da686ee01fc1ec641";

    var belgium = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=D1vwEAenQqEBmSZcsXmaMWHnb2fP8WR12XiDRODBm1w%3d&docid=055c89382733448088274687e7c7268f8";

    var france = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=BaI33j9MzRdzsu4YTj8qNx%2faBVxmj9kP77hQiHZuzS8%3d&docid=0f304ee0c637446118db315ebd46e9a23";

    var germany = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=%2fq0a1Gu%2f4I2%2bj21TPJkuJXaBSeUokroW1KPBohjB9tM%3d&docid=08d119af4a3404e50868072d9ea1a5920";

    var italy = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=tmdLCB%2bRAOOFL5mHsEiHse3AAan2cijHtA6wxWnqSCA%3d&docid=0f7609f763f534b65af104bd454d192b3";

    var netherlands = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=wfEi8p8WBYUcCYftDNwzP3hbvhU511mMt9nqQWDDooA%3d&docid=0f7c587069e814259bef3b67a4d5bac3b";

    var portugal = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=FGvUYIWZbM4PH2zenW7td7BoIMQIc1lGPlnZ14gybuY%3d&docid=0c6cc3e304d2c4cdb971ef27def704cac";

    var russia = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=p8ojxRqmHJCtHFk%2f1Ak%2fuemRR%2bfNAAACnw%2b9I1TRa7w%3d&docid=010b8f405756b4d57aef7b01f35e57274";

    var spain = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=EkUbZwCwG%2bPJo7V29t8JzKhMMg3qv%2f8borWFJN02hNE%3d&docid=0f2ee541cf54840d889c4478d0725321a";

    var turkey = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=tmdLCB%2bRAOOFL5mHsEiHse3AAan2cijHtA6wxWnqSCA%3d&docid=0f7609f763f534b65af104bd454d192b3";

    var ukireland = "https://ihg-my.sharepoint.com/personal/chris_daquin_ihg_com/_layouts/15/guestaccess.aspx?guestaccesstoken=9ppMZVKOYTgqAG1HlvPDcx50ciiiqK4FFJCts4voFFc%3d&docid=0c4cb4eb88d35403397db6d2adce132e2";

    // Put in a .load() call so when the new image finishes loading we 
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

