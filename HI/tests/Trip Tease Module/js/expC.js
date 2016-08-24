function taoTripTeaseModule() {

    // Replace original TT container with this
    jQuery('.row.trip-tease-container').each(function () {

        // PL: find the closest .resRow and input[type=hidden].selectedHotelCode => the value is what we need to put in data-pf-property
        var result = jQuery(this).closest('.resRow');
        var propertyCode = result.find('input[type=hidden].selectedHotelCode').val();

        // See if the propertyCode is in the list of Hotel Codes. If not, then
        // return true and skip to the next .row.trip-tease-container.
        if (jQuery.inArray( propertyCode, taoAllHotelCodes ) < 0 ) {
            return true;
        }

        // PL: use the property code in the show button (so that we know which widget to activate
        result.find('.taoCompare').data('pf-property', propertyCode.toLowerCase());

        // PL: use a global roomkey_config variable (found when inspecting the sources) to extract the params we need
        var checkin = roomkey_config.check_in_val;
        var checkout = roomkey_config.check_out_val;
        var adults = roomkey_config.guests_val;
        var children = 0; //TODO - is this really correct

        // PL: get the direct price
        var direct = result.find('.txtFromNow .mainCurrencyUnitValue.cc_number').text().trim();
        console.log('Hotel: ', propertyCode, ' checkin: ', checkin, ' checkout: ', checkout, ' adults: ', adults );
        jQuery(this).replaceWith(
            '<div '+
            'class="price-fighter-widget ' + propertyCode.toLowerCase() + '"' +
            'data-pf-hotelkey="6e7dd50235b6f9def5cbf723d630411f0507c358"' +
            'data-pf-property="' + propertyCode +'"' +
            'data-pf-currency="GBP"' +
            'data-pf-checkin="' + checkin + '"' +
            'data-pf-checkout="' + checkout+'"' +
            'data-pf-direct-price="' + direct + '"'+
            'data-pf-room-rate=""'+
            'data-pf-adults="' + adults + '"' +
            'data-pf-rooms="1"' +
            'data-pf-children="' + children + '"' +
            'data-pf-layout="skeleton-1"' +
            'data-pf-activation="deferred"' +
            'data-pf-custom-css="https://prodcache.internal.ihg.com/content/dam/etc/media_library/cn/0/cn/css/sr/tao-triptease-exp-C.css">' +
            '</div>');
    });

    // Move 'price-fighter-widget' into each '.pillBox' container
    jQuery('.pillBox').each(function(){

        jQuery(this).find('.price-fighter-widget').appendTo(jQuery(this) );

    });

    //PL reload paperboy
    jQuery.getScript('https://paperboy.triptease.net/IHG.js');

    // Remove widget when no dates are available or have not been selected
    jQuery('.priceInfoArea .bulkAvailLinkBox').parent().next().next().next().remove('.price-fighter-widget');
    jQuery('.priceInfoArea .priceMsgNotAvail').parent().parent().next().next().next().remove('.price-fighter-widget');
    // jQuery('.priceInfoArea .checkRates .selectDatesBtn').parent().parent().parent().next().next().next().remove('.price-fighter-widget');

}

jQuery(document).ready(function (jQuery){

    taoTripTeaseModule();

    // jQuery('body').on('click','#showMoreLink, #showAllLink', function(){
    //
    //     // Create a boolean that we keep track of just this click event and
    //     // make sure this code only runs when the user clicks on one of these
    //     // two buttons, but doesn't interfere with the other Ajax calls.
    //     var taoShowClick = true;
    //
    //     // Execute code if show more or show all buttons are clicked
    //     jQuery(document).ajaxComplete(function (event, request, settings) {
    //
    //         if (taoShowClick) {
    //             taoTripTeaseModule();
    //             // Paperboy.PriceCheck.deactivate(document.querySelectorAll('.price-fighter-widget'));
    //             // Paperboy.PriceCheck.activate(document.querySelectorAll('.price-fighter-widget'));
    //             taoShowClick = false;
    //         }
    //
    //     }); // End ajaxComplete();

   // });

});

// create an array that contains all of the hotel codes that are part of this
// campaign so we can make sure this happens only on the hotels it should.
var taoAllHotelCodes = [
    "ABZAA",
    "ABZCC",
    "ABZEC",
    "ABZEX",
    "ABZIG",
    "ABZWH",
    "AMSAA",
    "AMSAM",
    "AMSAP",
    "AMSAS",
    "AMSEA",
    "AMSNL",
    "AMSNT",
    "AMSOP",
    "AMSPC",
    "AMSUT",
    "ANRBE",
    "ANRHE",
    "ASDKE",
    "ASDUK",
    "AYLBK",
    "BBSHP",
    "BFSAN",
    "BFSAS",
    "BFSEX",
    "BFYVL",
    "BHTSF",
    "BHXAP",
    "BHXBP",
    "BHXBR",
    "BHXBS",
    "BHXCS",
    "BHXCT",
    "BHXEC",
    "BHXGB",
    "BHXIN",
    "BHXNC",
    "BHXPW",
    "BHXRD",
    "BHXSB",
    "BHXSC",
    "BHXSH",
    "BHXSL",
    "BHXSW",
    "BHXTS",
    "BHXWA",
    "BHXWM",
    "BHXWS",
    "BRDWD",
    "BREGC",
    "BRSAP",
    "BRSCC",
    "BRSCT",
    "BRSFR",
    "BRSNR",
    "BRUAP",
    "BRUBE",
    "BRUBR",
    "BRUZM",
    "BTNBL",
    "BTNCC",
    "BUTUK",
    "CAXDM",
    "CBGCC",
    "CBGDK",
    "CBGIM",
    "CBMUK",
    "CDFAP",
    "CDFBA",
    "CDFCY",
    "CHETR",
    "CHETS",
    "CHEUK",
    "CHEWR",
    "CRYUK",
    "CTBUK",
    "CVTAP",
    "CVTHR",
    "CVTKW",
    "CWLCN",
    "DBLBL",
    "DBLDD",
    "DBLEX",
    "DBLNP",
    "DBYRL",
    "DBYUK",
    "DFBKE",
    "DFBUK",
    "DNDEE",
    "DNFUK",
    "DNHPR",
    "DOTWC",
    "DSAUK",
    "DSAWW",
    "EAMLC",
    "EAMLN",
    "EDBCR",
    "EDBLH",
    "EDBPP",
    "EDBRM",
    "EDBUK",
    "EDIAP",
    "EDINI",
    "EDITE",
    "EINNL",
    "EKBUK",
    "ELLUK",
    "EMAMW",
    "EMART",
    "EMASS",
    "EMAUK",
    "EMLAP",
    "EXEUK",
    "FABHT",
    "FHLBK",
    "GHNCL",
    "GLCCH",
    "GLCEA",
    "GLCUK",
    "GLNUK",
    "GLWAP",
    "GLWCR",
    "GLWGC",
    "GLWGK",
    "GLWIN",
    "GLWRE",
    "GLWST",
    "GLWTH",
    "GNTBE",
    "GNTEP",
    "GSYEX",
    "GUISU",
    "HAGMS",
    "HRTUK",
    "HSLBE",
    "HSLTL",
    "HUYNH",
    "HUYUK",
    "HYCBK",
    "HYCCP",
    "IJMKE",
    "INVUK",
    "IPWEA",
    "IPWWE",
    "KENMI",
    "LCTUK",
    "LCTWS",
    "LDNNL",
    "LEEBH",
    "LEECC",
    "LEECD",
    "LEEEA",
    "LEEGF",
    "LEETL",
    "LEEUK",
    "LEIEX",
    "LGEMS",
    "LGWAP",
    "LGWUK",
    "LGWWO",
    "LHFUK",
    "LONAH",
    "LONBF",
    "LONBL",
    "LONBW",
    "LONCB",
    "LONCF",
    "LONCL",
    "LONCR",
    "LONCT",
    "LONCY",
    "LONEA",
    "LONEC",
    "LONEL",
    "LONEP",
    "LONET",
    "LONFR",
    "LONGG",
    "LONGH",
    "LONGM",
    "LONHA",
    "LONHI",
    "LONHS",
    "LONHT",
    "LONHU",
    "LONIN",
    "LONJU",
    "LONKC",
    "LONKE",
    "LONKT",
    "LONLH",
    "LONLK",
    "LONLT",
    "LONLU",
    "LONMF",
    "LONMR",
    "LONNO",
    "LONPM",
    "LONPW",
    "LONRP",
    "LONSA",
    "LONSF",
    "LONSG",
    "LONSH",
    "LONSI",
    "LONST",
    "LONSU",
    "LONSW",
    "LONTF",
    "LONUK",
    "LONVA",
    "LONVE",
    "LONVH",
    "LONWA",
    "LONWD",
    "LONWE",
    "LONWI",
    "LONWS",
    "LONWX",
    "LONXC",
    "LONXL",
    "LPLAD",
    "LPLAP",
    "LPLCP",
    "LPLHL",
    "LPLIL",
    "LPLKW",
    "LPLLS",
    "LPLRL",
    "LPLUK",
    "LTNAP",
    "LTNDU",
    "LTNHH",
    "LTNSO",
    "LTNSP",
    "LYXFX",
    "MAIKE",
    "MANCC",
    "MANUK",
    "MCHAS",
    "MCHCP",
    "MCHEA",
    "MCHMA",
    "MCHMC",
    "MCHOR",
    "MCHSA",
    "MCHSK",
    "MCHSS",
    "MCHWT",
    "MCSUK",
    "MDNUK",
    "MECVM",
    "MLKBK",
    "MLKEP",
    "MLKLR",
    "MSTNL",
    "NCLIN",
    "NCLJB",
    "NCLJM",
    "NCLMS",
    "NCLSQ",
    "NCLUK",
    "NCLWS",
    "NOTDE",
    "NOTUK",
    "NOTWS",
    "NPTCS",
    "NPTUK",
    "NWIAP",
    "NWICR",
    "NWINF",
    "NWISV",
    "OFDCN",
    "OFDKS",
    "OFDUK",
    "ORKKI",
    "ORMGP",
    "ORMKP",
    "ORMMJ",
    "ORMUK",
    "OSTBE",
    "PLHUK",
    "PMEGQ",
    "PMEHP",
    "PMESP",
    "POOUK",
    "PSTLC",
    "PTLDU",
    "PTRUK",
    "PTRWE",
    "QQZBA",
    "RCSKE",
    "REASO",
    "REATR",
    "REAUK",
    "REAWS",
    "RTMCS",
    "RUGNH",
    "SENCP",
    "SENES",
    "SENHI",
    "SFDUA",
    "SFFSO",
    "SIRUK",
    "SITBR",
    "SOABR",
    "SOAEL",
    "SOAFA",
    "SOAHP",
    "SOAUK",
    "SOAWC",
    "STDEX",
    "STDHM",
    "STNCO",
    "STNDC",
    "SWICC",
    "SWIMR",
    "SWIWE",
    "SWSSA",
    "SZDBR",
    "TELUK",
    "TNTSS",
    "TNTUK",
    "WARLS",
    "WARUK",
    "WDPUK",
    "WRTHA",
    "WRTRN",
    "WRTUK",
    "WXFBT",
    "XHUHR",
    "XNVUK",
    "XPTPS",
    "XQDBF",
    "XQLCR",
    "XSRSP",
    "XVGDL",
    "XVGNO",
    "XVJMH",
    "XVJUK",
    "XWDEX",
    "XWDWY",
    "XWHSF",
    "XWHUK",
    "YORTR",
    "YORUK",
    "YORYK",
    "ZYMEX",
    "EDIIN",
    "LTNST"
];