// =================== START =======================
//jshint strict:false
//jshint jquery:true
//jshint browser:true
//jshint camelcase:false
/*globals roomkey_config,Paperboy*/

function taoTripTeaseModule() {

    // create a boolean to track if a popup is visible or not
    var taoPopupVisible = false;

    // Set up a watch for all clicks on the page. If the widget is being shown,
    // then close it.
    jQuery('body').on('click', function () {
        if (taoPopupVisible === true) {
            jQuery('.show-widget').toggleClass('show-widget');
            taoPopupVisible = false;
        }
    });

    ///////////////////////////////////////////////////////

    // Create a counter so we grab only the first 6 approved properties.
    var taoCounter = 0;
    // Set the maximum number of properties we should put a widget on
    var taoWidgetMax = 6;

    // Replace original TT container with this
    jQuery('.row.trip-tease-container').each(function () {

        // PL: find the closest .resRow and input[type=hidden].selectedHotelCode => the value is what we need to put in data-pf-property
        var result = jQuery(this).closest('.resRow');
        var propertyCode = result.find('input[type=hidden].selectedHotelCode').val();

        // See if the propertyCode is in the list of Hotel Codes. If not, then
        // return true and skip to the next .row.trip-tease-container.
        debugger;
        if (jQuery.inArray( propertyCode, taoAllHotelCodes ) < 0 ) {
            debugger;
            jQuery('.price-fighter-widget').remove();
            return true;
        }

        // If we hit this point, that means this is an approved property!
        // Bump up the counter by 1. We check later to see if this reaches the
        // taoWidgetMax value and then break out of each loop if it does.
        taoCounter++;

        // Put in the HTML changes so we can style the call to open the widget
            // Remove original Nightly Rate
            //jQuery('.avgrate, .row .vatText').remove();
            result.find('.avgrate, .row .vatText').remove();

            // Place "Nightly Rate" text above price container
            jQuery('<span class="taoNightlyRate">Nightly Rate</span>').insertBefore(result.find('.priceNow'));

            result.find('.taoNightlyRate').each(function () {
                // Find each nightly rate and wrap it up
                jQuery(this).next('.priceNow').andSelf().wrapAll('<section class="taoPriceNowWrapper"></section>');
            });

            // Add anchor tag to each trigger widget pop-up
            jQuery('<a href="#" class="taoCompare">See how we compare</a>').insertAfter(result.find('.priceNow'));

        // PL: use the property code in the show button (so that we know which widget to activate
        result.find('.taoCompare').data('pf-property', propertyCode.toLowerCase());

        // PL: use a global roomkey_config variable (found when inspecintg the sources) to extract the params we need
        var checkin = roomkey_config.check_in_val;
        var checkout = roomkey_config.check_out_val;
        var adults = roomkey_config.guests_val;
        var children = 0; //TODO - is this really correct

        // PL: get the direct price
        var direct = result.find('.txtFromNow .mainCurrencyUnitValue.cc_number').text().trim();
        var direct = result.find('.priceNow .mainCurrencyUnitValue.cc_number').text().trim();
        // var direct = result.find('.priceNow .notranslate .cc_source').text().trim();
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
            'data-pf-custom-css="https://prodcache.internal.ihg.com/content/dam/etc/media_library/cn/0/cn/css/sr/tao-triptease-exp-B.css">' +
            '</div>');

        // See if we have hit the maximum of 6 approved properties. If so,
        // break out of this each loop by returning false.
        if (taoCounter === taoWidgetMax) {
            return false;
        }
    });

    //PL reload paperboy
    jQuery.getScript('https://paperboy.triptease.net/IHG.js',function(){
        Paperboy.on('priceCheck:apiComplete', function(event) {
            if(event.visible === false) {
                // widget won't show/hide the button
                // 1. find the widget
                // var widget = jQuery('.price-fighter-widget')[event.id];
                // 2. find the button
                // var button = jQuery(widget).closest('.priceInfoArea').find('.taoCompare');
                // 3. hide it
                // button.hide();

                // Remove price info styling
                /* var taoWrapper = jQuery('.taoPriceNowWrapper');
                 taoWrapper.css({
                 'background': 'none',
                 'border': 'none',
                 'padding': '0',
                 'overflow': 'visible'
                 }); */

                /* jQuery('.priceInfoArea').each(function(){
                 if(jQuery(this).children('.price-fighter-widget:hidden').length >= 1) {
                 jQuery('.taoCompare').remove();
                 }

                 var priceNow = jQuery('.priceNow');
                 if(priceNow.parent().is('section.taoPriceNowWrapper')) {
                 jQuery('.priceNow').unwrap();
                 }

                 jQuery(this).not(taoAllHotelCodes).remove('.price-fighter-widget');

                 jQuery('.avgrate, .row .vatText').show();
                 }); */

            }

        });


    });

    jQuery('<span class="closeBtn"></span>').appendTo('.price-fighter-widget');

    jQuery('.taoCompare').click(function (event) {
        if (taoPopupVisible === false) {

            // Show/hide widget container
            jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').toggleClass('show-widget');

            // PL: Deactivate all other widgets
            // Paperboy.PriceCheck.deactivate(document.querySelectorAll('.price-fighter-widget'));

            // PL: Activate the widget using a CSS selector
            //Paperboy.PriceCheck.reset(document.querySelector('.price-fighter-widget.'+$(this).data('pf-property')));
            // Paperboy.PriceCheck.activate(document.querySelector('.price-fighter-widget.'+$(this).data('pf-property')));

            // make taoPopupVisible true
            taoPopupVisible = true;

            // prevent page from scrolling to top after click event
            event.preventDefault();
            event.stopPropagation();

        } else {

            // PL: Deactivate all widgets using a CSS selector
            // Paperboy.PriceCheck.deactivate(document.querySelectorAll('.price-fighter-widget'));

            // check to see if this popup is open. If so, close it.
            if (jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').hasClass('show-widget')) {

                jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').toggleClass('show-widget');

                // prevent page from scrolling to top after click event
                event.preventDefault();
                event.stopPropagation();

            } else {

                // If it is not open, then close the other one and open this one.
                jQuery('.show-widget').toggleClass('show-widget');
                jQuery(this).closest('.priceInfoArea').find('.price-fighter-widget').toggleClass('show-widget');

                // PL: Activate
                //Paperboy.PriceCheck.reset(document.querySelecotr('.price-fighter-widget.'+$(this).data('pf-property')));
                // Paperboy.PriceCheck.activate(document.querySelector('.price-fighter-widget.'+$(this).data('pf-property')));

                // prevent page from scrolling to top after click event
                event.preventDefault();
                event.stopPropagation();

            }
        }

    });

}

jQuery(document).ready(function() {

    taoTripTeaseModule();

    jQuery('body').on('click','#showMoreLink, #showAllLink', function(){

        // Create a boolean that we keep track of just this click event and
        // make sure this code only runs when the user clicks on one of these
        // two buttons, but doesn't interfere with the other Ajax calls.
        var taoShowClick = true;

        // Execute code if show more or show all buttons are clicked
        jQuery(document).ajaxComplete(function (event, request, settings) {

            if (taoShowClick) {
                taoTripTeaseModule();
                // jQuery(document).unbind('ajaxComplete');
                taoShowClick = false;
            }
        }); // End ajaxComplete();
    });

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
// =================== END =======================

