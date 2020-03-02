var listsize = 0, setofresult = 6, currentPage = 1, pageSize = 6, totalresultcount = 0, endingsoondays = 5, endingCount = 0;

var bankingchannel = ['all'];
var category = ['all'];
var brand = ['all'];
var orderbyfilter = '';

var lstAllGrabDeals;
var lstGrabDealsCat;

var GrabDealsFilterList = {};
var GrabDealsSortList = {};
var FilterByBankingChannel = [], FilterByCategory = [];
var utmsource = {
};


var grabdealsresponse;
var rescount;




function getByApi() {
    var currentURL = window.location.origin;          //"https://a.idealake.com";
    currentURL = currentURL + '/api/grab-deals-revamp/grabdealsrevamps'
    $.getJSON(currentURL, function (data) {  //https://a.idealake.com


        var a = JSON.stringify(data);
        //alert(a);
        grabdealsresponse = jQuery.parseJSON(a);
        sortedgrabdealsresponse = [];
        for (var i = 0; i < grabdealsresponse.value.length; i++) {
            var selectedDate = new Date(grabdealsresponse.value[i].ExpiryDate);
            //selectedDate = new Date(selectedDate.getTime() + (selectedDate.getTimezoneOffset() * 60000));            
            var now = new Date();
            if (selectedDate < now) {                
                
            } else {
                sortedgrabdealsresponse.push(grabdealsresponse.value[i]);
            }
        }
        grabdealsresponse.value = sortedgrabdealsresponse;
        totalresultcount = rescount = grabdealsresponse.value.length;
        Getbankingchanneldata(rescount);
        Getcategorydata(rescount);
        BindCategory();

        var mainURL = window.location.href;
        var urlBankingChannel = [], urlcategory = [];
        if ((mainURL.indexOf('?') > 0) && ((mainURL.substring(1).split('&').length) == 1) && (mainURL.indexOf('?cta') < 0)) {
            if (mainURL.indexOf('bankingchannel') > 0) {
                var Channel = getMainUrl();//["bankingchannel"];
                var urlBankingChannel = [];
                urlBankingChannel.push(decodeURI(Channel));
                BindGrabDeals(urlBankingChannel, category, brand, orderbyfilter);
            }
            else if (mainURL.indexOf('category') > 0) {
                var cat = getMainUrl();
                var urlcategory = [];
                urlcategory.push(decodeURI(cat));
                BindGrabDeals(bankingchannel, urlcategory, brand, orderbyfilter);
                for (var j = 0; j < urlcategory.length; j++) {
                    $("#dvGrabdealsCategory .chkCategory[data-value='" + urlcategory[j] + "']").prop("checked", true);
                }
            }
			else
			{
				BindGrabDeals(bankingchannel, category, brand, orderbyfilter);
			}

        }
        else if ((mainURL.indexOf('bankingchannel') > 0) && (mainURL.indexOf('category') > 0)) {
            var pairs = location.search.slice(1).split('&');

            for (i = 0; i < pairs.length; i++) {
                bits = pairs[i].split('=');

                if (bits[0] == 'bankingchannel') urlBankingChannel.push(decodeURI(bits[1]));
                else if (bits[0] == 'category') urlcategory.push(decodeURI(bits[1]));

            }

            for (var j = 0; j < urlcategory.length; j++) {
                $("#dvGrabdealsCategory .chkCategory[data-value='" + urlcategory[j] + "']").prop("checked", true);
            }
            BindGrabDeals(urlBankingChannel, urlcategory, brand, orderbyfilter);
        }
        else if ((mainURL.indexOf('bankingchannel') > 0) || (mainURL.indexOf('category') > 0)) {
            var pairs = location.search.slice(1).split('&');

            for (i = 0; i < pairs.length; i++) {
                bits = pairs[i].split('=');

                if (bits[0] == 'bankingchannel') {
                    urlBankingChannel.push(decodeURI(bits[1]));
                }
                else if (bits[0] == 'category') {
                    urlcategory.push(decodeURI(bits[1]));
                }
            }
            if (urlBankingChannel.length <= 0) {
                urlBankingChannel = ['all'];
            }
            else {
                urlcategory = ['all'];
            }

            for (var j = 0; j < urlcategory.length; j++) {
                $("#dvGrabdealsCategory .chkCategory[data-value='" + urlcategory[j] + "']").prop("checked", true);
            }
            BindGrabDeals(urlBankingChannel, urlcategory, brand, orderbyfilter);
        }
        //else  if (mainURL.indexOf('category') > 0) {
        //              var cat = getMainUrl();
        //              var urlcategory = [];
        //              urlcategory.push(decodeURI(cat));
        //              BindGrabDeals(bankingchannel, urlcategory, brand, orderbyfilter);
        //              for (var j = 0; j < urlcategory.length; j++) {
        //                  $("#dvGrabdealsCategory .chkCategory[data-value='" + urlcategory[j] + "']").prop("checked", true);
        //              }
        //          }
        else {
            BindGrabDeals(bankingchannel, category, brand, orderbyfilter);
        }
        //if (window.location.href.indexOf('?') > 0) {
        //    var urlBankingChannel = [];
        //    urlBankingChannel = getMainUrl()["bankingchannel"];
        //    //var urlBankingChannel = GetQueryStringValues('bankingchannel');
        //    BindGrabDeals(urlBankingChannel, category, brand, orderbyfilter);
        //}
        //else {
        //    BindGrabDeals(bankingchannel, category, brand, orderbyfilter);
        //}

    });
}


var lstbankingchannel = ["Debit-Card", "Credit-Card", "UPI", "Internet-Banking", "Mobile-Banking"];
var lstcategories = ["Lifestyle", "Travel", "Bill-pay-and-Recharge", "Mobile-and-Electronics", "Gifting", "Online-Shopping", "RuPay", "EMI", "Visa", "Master-Card", "Axis-ASAP", "Others"];
var lstcategory = [];
var lstcat = [];
var lstcategorycount = [];
function Getbankingchanneldata(rescount) {

    for (i = 0; i < rescount; i++) {
        var bin_num = decimaltobinary(grabdealsresponse.value[i].BankingChannel);
        var arr = bin_num.split("");
        for (arrlen = 0; arrlen < lstbankingchannel.length; arrlen++) {
            if (lstbankingchannel.length != arr.length) {
                arr.splice(0, 0, "0");
            }
            else {
                break;
            }
        }

        arr = arr.reverse();
        var selectedbankingChannel = [];

        for (x = 0; x < arr.length; x++) {
            if (arr[x] == 1) {
                selectedbankingChannel.push(lstbankingchannel[x]);
            }
        }
        grabdealsresponse.value[i].BankingChannel = selectedbankingChannel.join(", ");
        //  mainbankingchannel.push(selectedbankingChannel.join(", ") + "_" + grabdealsresponse.value[i].Title);

    }


}

function Getcategorydata(rescount) {

    for (i = 0; i < rescount; i++) {
        var bin_num = decimaltobinary(grabdealsresponse.value[i].Category);
        var arr = bin_num.split("");
        for (catlength = 0; catlength < lstcategories.length; catlength++) {
            if (arr.length != lstcategories.length) {
                arr.splice(0, 0, "0");
            }
            else {
                break;
            }
        }
        arr = arr.reverse();
        var selectedcategory = [];

        for (x = 0; x < arr.length; x++) {
            if (arr[x] == 1) {
                selectedcategory.push(lstcategories[x]);
                if ((jQuery.inArray(lstcategories[x], lstcategory) == -1)) {
                    lstcategory.push(lstcategories[x]);
                }
                lstcategorycount.push(lstcategories[x]);
            }
        }
        grabdealsresponse.value[i].Category = selectedcategory.join(", ");
        //  mainbankingchannel.push(selectedbankingChannel.join(", ") + "_" + grabdealsresponse.value[i].Title);

    }

    for (var a = 0; a < lstcategorycount.length; a++) {
        if (lstcat[lstcategorycount[a]]) {
            lstcat[lstcategorycount[a]]++;
        }
        else {
            lstcat[lstcategorycount[a]] = 1;
        }
    }
}


function BindCategory() {
    if ($("#dvGrabdealsCategory").children().length == 0) {
        $("#dvGrabdealsCategory").html("");
        $.each(lstcategory, function (index, category) {


            var catcount = lstcat[category] > 0 ? "(" + lstcat[category] + ")" : "";
            var $li = $("<li><a href='javascript:void(0);' data-value='" + category.Value + "'>" + category.Title + " " + catcount + "</a></li>");
            $("#ulGrabDealsCategory").append($li);
            if (catcount != 0) {
                var $li = $(
                    "<div class='checkFeild'>" +
                    "<label for='" + category + "'>" +
                    "" + category.replace(/-/g, " ") + " " + catcount + "" +
                    "<input class='chkCategory' data-value='" + category + "' onchange='BindFilteredGrabDeals(this);' id='" + category + "' name='" + category + "' type='checkbox'>" +
                    "<div class='controlIndicator'></div>" +
                    "</label>" +
                    "</div>"
                );
                $("#dvGrabdealsCategory").append($li);
            }

        });

        //$("#dvGrabdealsCategory").append("<div class='clearApply'><span onclick='ClearCategoryFilter(this);' class='clear'>Clear |</span><span onclick='BindFilteredGrabDeals(this);' class='apply'>Apply</span></div>");
    }

}

function BindGrabDeals(bankingchannel, category, brand, orderbyfilter) {
    $(".loader").show();

    // filter all offers

    var data = grabdealsresponse.value;



    if (bankingchannel.length > 0 && bankingchannel != "all") {
        data = jQuery.grep(data, function (product, i) {

            return bankingchannel.containsAny(product.BankingChannel.replace(/, /g, ",").split(","));
        });

    }

    if (category.length > 0 && category != "all") {
        data = jQuery.grep(data, function (product, i) {

            return category.containsAny(product.Category.replace(/, /g, ",").split(","));
        });

    }


    //Bind Category

    //Bind OfferText
    category != "all" ? $("#spnCategory").html(category) : $("#spnCategory").html("");
    bankingchannel != "all" ? $("#spnBankingChannel").html("for " + bankingchannel) : $("#spnBankingChannel").html();

    $("#spnGrabDealsCount").html("");
    $("#spnCategory").html("");

    $("#spnBankingChannel").html(data.length);



    if (orderbyfilter == "endingsoon") {
        data.sort(function (a, b) {
            var dateA = new Date(a.ExpiryDate);
            var dateB = new Date(b.ExpiryDate);
            return dateA - dateB;
        })

    }
    else if (orderbyfilter == "popularity") {
        data.sort(function (a, b) {

            var popA = a.Popularity;
            var popB = b.Popularity;
            return (popA === popB) ? 0 : popA ? -1 : 1;
            //return Number(popB) - Number(popA);
            ////if (popA < popB) return -1;
            //if (popA > popB) return 1;
            //return 0;
        });
    }
    else {

        data = data.reverse();
    }
    //Bind Grab Deals
    $.each(data, function (index, grabdeal) {
        //onclick=\"location.href = '" + grabdeal.UrlName + "';\"



        var $li = $(

            "<li class='tmainListing'>" +
            "<div class='grabDealBox'>" +
            "<div class='travelImgwrap'>" +
            //"<a href='" + grabdeal.UrlName + "' target='_blank'>" +
            "<img src='" + grabdeal.ImageUrl + "' alt='img' class='b-lazy'>" +
            // "</a>" +
            "</div>" +
            "<div class='travelContentwrap'>" +
            "<div class='tofferHeader'>" +
            "<h4>" + grabdeal.Title + "</h4>" +                      //<a href='" + grabdeal.UrlName + "' target='_blank'></a>
            "<div class='tofferShare'>" +
            "<ul>" +
            "<li><a onclick='ShareFn(this);' data-name='Facebook' data-key='" + grabdeal.UrlName + "' href='javascript:void(0);' class='icon-fb'></a></li>" +
            "<li><a onclick='ShareFn(this);' data-name='Twitter' data-key='" + grabdeal.UrlName + "' href='javascript:void(0);' class='icon-twitter'></a></li>" +
            /*"<li><a onclick='ShareFn(this);' data-name='Whatsapp' data-key='" + grabdeal.DetailPageUrl + "' href='javascript:void(0);' class='icon-whatsapp'></a></li>" +*/
            "</ul>" +
            "</div>" +
            "</div>" +
            "<p>" + grabdeal.Description + "</p>" +
            "<div class='tofferExpire'><span class='travelexpires'>Expires on  " + new Date(grabdeal.ExpiryDate).format('dd/mm/yyyy') + "</span><a href='" + grabdeal.DetailPageUrl + "' target='_blank' class='travelTnc'>Know More	</a></div>" +
            "<div class='tofferCards'></div>" +
            "</div>" +
            "</div>" +
            "</li>"

        );


        var grabDealBox = $li.find(".grabDealBox");
        var travelImgwrap = $li.find(".travelImgwrap");
        var tofferCards = $li.find(".tofferCards");

        //Date Conversion
        var ExDate = (new Date(grabdeal.ExpiryDate).format('dd/mm/yyyy')).split("../index.html").reverse().join("-");
        ExDate = new Date(ExDate);
        var currentDate = new Date(),
            diff = new Date(ExDate - currentDate),
            days = diff / 1000 / 60 / 60 / 24;
        if (days <= endingsoondays) {
            grabdeal.EndingSoon = true;

        }
        else {
            grabdeal.EndingSoon = false;
        }

        if (grabdeal.Popularity && grabdeal.EndingSoon) {
            grabDealBox.addClass("popularEnding popularTravel endingSoon");
            travelImgwrap.append("<div class='populartblock'><span>Popularity</span></div><div class='endingSoonblock'><span>Ending Soon</span></div>");
        }
        else {
            //Bind Popularity
            if (grabdeal.Popularity) {
                grabDealBox.addClass("popularTravel");
                travelImgwrap.append("<div class='populartblock'><span>Popularity</span></div>");
            }
            //Bind Ending Soon
            if (grabdeal.EndingSoon) {
                //endingCount++;
                //GrabDealsSortList.append(grabdeal);
                grabDealBox.addClass("endingSoon");
                travelImgwrap.append("<div class='endingSoonblock'><span>Ending Soon</span></div>");
            }
        }
        //Bind Banking Channel
        //$.each(grabdeal.lstbankingchannel, function (index, bankingchannel) {
        //    tofferCards.append("<span>" + bankingchannel.Title + ", </span>");
        //});

        for (var i = 0; i < grabdeal.BankingChannel.split(",").length; i++) {

            if (i == grabdeal.BankingChannel.split(",").length - 1)
                tofferCards.append("<span>" + grabdeal.BankingChannel.split(",")[i] + "</span>");
            else
                tofferCards.append("<span>" + grabdeal.BankingChannel.split(",")[i] + ", </span>");
        }

        //if (grabdeal.lstbankingchannel.length > 0)
        //    tofferCards.html(tofferCards.html().substring(0, tofferCards.html().length - 2));


        $("#ulGrabDeals").append($li);

    });

    listsize = $('#ulGrabDeals').children().length;

    if (listsize == 0) {
        var $emptyli = $(
            "<li class='tmainListing'>" +
            "<div class='grabDealBox'>" +
            "<p class='noData'>" + "Sorry, no data found" + "</p>" +
            "</div>" +
            "</li>"
        );

        $("#ulGrabDeals").append($emptyli);
    }

    listsize < 6 || listsize == totalresultcount ? $("#lnkGrabDealsListLoadMore").hide() : $("#lnkGrabDealsListLoadMore").show();

    BindAllGrabDealsEvents();

    $(".js-cancel").click();
    $(".loader").hide();

}





function BindAllGrabDealsEvents() {
    $(".tofferShare ul").show();
}


function checkAllbanking(banking) {
    return banking == "all";
}
function checkAllcategory(category) {
    return category == "all";
}
function BindFilteredGrabDeals(ctrl) {

    var bankingchannel = [];
    //if ($("#ulBankingChannel li.current").length == 0) {
    //    bankingchannel = ['all'];
    //} else {
    //    $.each($("#ulBankingChannel li.current"), function (index, currentli) {
    //        bankingchannel.push($(currentli).find("a").data("value"));
    //    });
    //}

    if ($("#dvBankingChannel div.dvbankingchannelall .chkbankingchannel").is(":checked")) {
        bankingchannel = ['all'];

    } else {
        $.each($("#dvBankingChannel .chkbankingchannel:checked"), function (index, currentli) {
            bankingchannel.push($(currentli).data("value"));
        });
        if (bankingchannel.length == 0)
            bankingchannel = ['all'];

    }

    if (bankingchannel.find(checkAllbanking)) { FilterByBankingChannel = []; }
    else { FilterByBankingChannel = bankingchannel; }

    FilterByBankingChannel = FilterByBankingChannel.sort(function (a, b) {
        return a - b
    });


    var category = [];
    //if ($("#ulGrabDealsCategory li a.active").length == 0) {
    //    category = ['all'];
    //} else {
    //    $.each($("#ulGrabDealsCategory li a.active"), function (index, currentlnk) {
    //        category.push($(currentlnk).data("value"));
    //    });
    //}

    if ($("#dvGrabdealsCategory .checkFeild").length == 0) {
        if (FilterByCategory.length > 0) {
            category = FilterByCategory;
        } else {
            category = ['all'];
        }
    }
    else {

        if ($("#dvGrabdealsCategory .checkFeild input[type=checkbox]:checked").length == 0) {
            category = ['all'];
        } else {

            $.each($("#dvGrabdealsCategory .checkFeild input[type=checkbox]:checked"), function (index, currentchk) {
                category.push($(currentchk).data("value"));
            });
        }
    }


    if (category.find(checkAllcategory)) { FilterByCategory = []; }
    else { FilterByCategory = category; }

    FilterByCategory = FilterByCategory.sort(function (a, b) {
        return a - b
    });

    var brand = [];
    if ($("#dvGrabdealsBrand .checkFeild input[type=checkbox]:checked").length == 0) {
        brand = ['all'];
    } else {

        $.each($("#dvGrabdealsBrand .checkFeild input[type=checkbox]:checked"), function (index, currentchk) {
            brand.push($(currentchk).data("value"));
        });
    }

    var orderbyfilter = $("#ddlorderbyfilter").val();

    currentPage = 1;
    setofresult = 6;
    pageSize = 6;

    $("#ulGrabDeals").empty();

    BindGrabDeals(bankingchannel, category, brand, orderbyfilter);

    for (var j = 0; j < FilterByCategory.length; j++) {
        $("#dvGrabdealsCategory .chkCategory[data-value='" + FilterByCategory[j] + "']").prop("checked", true);
    }

    GrabDealsFilterList = {
        bankingchannel: FilterByBankingChannel,
        category: FilterByCategory
    };


    var utmsourceparam = "";
    utmsourceparam = utmsource != null ? $.param(utmsource) : "";
    var grabDealsArr = $.param(GrabDealsFilterList, true);
    if ((grabDealsArr == "" || grabDealsArr.SortByList == "") && utmsourceparam == "") {
        //location.replace(window.location.protocol + "//" + window.location.host + window.location.pathname);

        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({
            path: grabDealsArr
        }, '', newurl + utmsourceparam + grabDealsArr);

        return false;
    }
    else {
        var grabDealsArr = $.param(GrabDealsFilterList, true);

        //utmsourceparam = grabDealsArr != "" ? utmsourceparam + "&" : utmsourceparam;
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?"
            //  window.history.pushState({ path: grabDealsArr }, '', newurl + grabDealsArr);
            window.history.pushState({
                path: grabDealsArr
            }, '', newurl + utmsourceparam + grabDealsArr);
        }
    }


}

function ClearCategoryFilter(ctrl) {
    $("#dvGrabdealsCategory .chkCategory").prop("checked", false);
    BindFilteredGrabDeals(ctrl);
}

function ClearBrandFilter(ctrl) {
    $("#dvGrabdealsBrand .chkBrand").prop("checked", false);
    BindFilteredGrabDeals(ctrl);
}






$(document).ready(function () {

    $("div.dvbankingchannelall .chkbankingchannel").prop('checked', true);
    //GetDatebyAPI();
    getByApi();
    DecodeUrl();

    //$("#dvbankingchannel .chkbankingchannel").trigger("change");

    //BindData();

    //$("#ulBankingChannel > li > a").click(function (e) {
    //    e.preventDefault();
    //    $("#ulBankingChannel > li").removeClass("current");
    //    $(this).parent("li").addClass("current");

    //    BindFilteredGrabDeals(this);

    //});

    //// banking channels filter
    //$("#dvBankingChannel .chkbankingchannel").change(function (e) {


    //    // e.preventDefault();

    //    if ($(this).data("value") == "all") {
    //        //  $(".checkBox-line input").prop('checked', $("#dvBankingChannel div.dvbankingchannelall .chkbankingchannel").is(":unchecked")); //change all checkboxes checked status

    //        if ($(this).is(":checked")) {
    //            $("div.dvbankingchannelall .chkbankingchannel").addClass("checkActive");
    //            $(".dvbankingchannelother input").prop('checked', false);
    //            $(".dvbankingchannelother").removeClass("checkActive");


    //        } else {
    //            $("#dvBankingChannel .checkBox-line").removeClass("checkActive");

    //        }
    //    }
    //    else {
    //        if ($(this).is(":checked")) {
    //            $(this).parents('.checkBox-line').addClass("checkActive");
    //            $("div.dvbankingchannelall .chkbankingchannel").prop('checked', false);
    //            $(".dvbankingchannelall").removeClass("checkActive");
    //        } else {
    //            $(this).parents('.checkBox-line').removeClass("checkActive");
    //            //var chkArray = [];
    //            //$(".dvbankingchannelother:checked").each(function () {
    //            //    chkArray.push($(this).val());
    //            //});
    //            //if (chkArray.length === 0) {
    //            //    $("div.dvbankingchannelall .chkbankingchannel").prop('checked', true);
    //            //}
    //        }
    //    }


    //    BindFilteredGrabDeals(this);
    //});


    $("#ddlorderbyfilter").change(function () {
        BindFilteredGrabDeals(this);

    });




    //$(window).scroll(function () {
    //    var wWidth = 0;
    //    var windoWidth = $(window).width();
    //    if (windoWidth > 768) {
    //        wWidth = 150;
    //    }
    //    else { wWidth = 50; }
    //    if (($(window).scrollTop() + $(window).height() - parseInt(wWidth)) >= $('.grabDealsLoadMore').offset().top) {

    //        if ($("#ulGrabDeals li.tmainListing").length == data.length)
    //            return false;

    //        var bankingchannel = [];
    //        if ($("#ulBankingChannel li.current").length == 0) {
    //            bankingchannel = ['all'];
    //        } else {
    //            $.each($("#ulBankingChannel li.current"), function (index, currentli) {
    //                bankingchannel.push($(currentli).find("a").data("value"));
    //            });
    //        }

    //        if ($("#dvBankingChannel div.dvbankingchannelall .chkbankingchannel").is(":checked")) {
    //            bankingchannel = ['all'];
    //        } else {
    //            $.each($("#dvBankingChannel .chkbankingchannel:checked"), function (index, currentli) {
    //                bankingchannel.push($(currentli).data("value"));
    //            });
    //            if (bankingchannel.length == 0)
    //                bankingchannel = ['all'];
    //        }

    //        var category = [];
    //        if ($("#ulGrabDealsCategory li a.active").length == 0) {
    //            category = ['all'];
    //        } else {
    //            $.each($("#ulGrabDealsCategory li a.active"), function (index, currentlnk) {
    //                category.push($(currentlnk).data("value"));
    //            });
    //        }

    //        if ($("#dvGrabdealsCategory .checkFeild input[type=checkbox]:checked").length == 0) {
    //            category = ['all'];
    //        } else {

    //            $.each($("#dvGrabdealsCategory .checkFeild input[type=checkbox]:checked"), function (index, currentchk) {
    //                category.push($(currentchk).data("value"));
    //            });
    //        }


    //        var brand = [];
    //        if ($("#dvGrabdealsBrand .checkFeild input[type=checkbox]:checked").length == 0) {
    //            brand = ['all'];
    //        } else {

    //            $.each($("#dvGrabdealsBrand .checkFeild input[type=checkbox]:checked"), function (index, currentchk) {
    //                brand.push($(currentchk).data("value"));
    //            });
    //        }

    //        var orderbyfilter = $("#ddlorderbyfilter").val();

    //        currentPage += 1;
    //        setofresult = (setofresult + 6 <= listsize) ? setofresult + 6 : listsize;

    //        BindGrabDeals(bankingchannel, category, brand, orderbyfilter);

    //    }
    //});


});

Array.prototype.indexOfAny = function (array) {
    return this.findIndex(function (v) { return array.indexOf(v) != -1; });
}

Array.prototype.containsAny = function (array) {
    return this.indexOfAny(array) != -1;
}

function DecodeUrl() {
    var decodedUri = decodeURIComponent(window.location.href);
    var match = decodedUri.match(/[^=&?]+\s*=\s*[^&#]*/g);
    var obj = {};
    if (match == null) {
        //BindData();
    }
    else {
        for (var i = match.length; i--;) {
            var spl = match[i].split("=");
            var name = spl[0].replace("[]", "");
            var value = spl[1];

            if (name == "bankingchannel") {
                FilterByBankingChannel.push(value);
                obj[name] = obj[name] || [];
                var arrvalue = value.split(',');

                for (var j = 0; j < arrvalue.length; j++) {
                    $("#dvBankingChannel .chkbankingchannel[data-value='" + arrvalue[j] + "']").prop("checked", true);
                    $("#dvBankingChannel .chkbankingchannel[data-value='" + arrvalue[j] + "']").parents('.checkBox-line').addClass("checkActive");
                }
                $("div.dvbankingchannelall .chkbankingchannel").prop('checked', false);
                obj[name].push(value);

            }
            else if (name == "category") {
                FilterByCategory.push(value);
                obj[name] = obj[name] || [];
                var arrvalue = value.split(',');

                for (var j = 0; j < arrvalue.length; j++) {
                    $("#dvGrabdealsCategory .chkCategory[data-value='" + arrvalue[j] + "']").prop("checked", true);
                    //$("#dvGrabdealsCategory .chkCategory[data-value='" + arrvalue[j] + "']").parents('.checkBox-line').addClass("checkActive");
                }

                obj[name].push(value);

            }
            else { }
        }
        BindFilteredGrabDeals();
    }

}

function GrabDealsFilterByPopularity(allgrabdeal) {
    return allgrabdeal.Popularity >= true;
}

//Code of getting data from Code behind

//function BindData() {

//    currentPage = 1;
//    setofresult = 6;
//    pageSize = 6;

//    BindAllGrabDeals(bankingchannel, category, brand, orderbyfilter);
//}

////function grabOffersCheck() {
////    $('.loansListWrapper input:checkbox').change(function () {
////        if ($(this).is(":checked")) {
////            $(this).parents('.checkBox-line').addClass("checkActive");
////        } else {
////            $(this).parents('.checkBox-line').removeClass("checkActive");
////        }
////    });
////    $("#select_all").change(function () { //"select all" change 
////        $(".checkBox-line input").prop('checked', $(this).prop("checked")); //change all ".checkbox" checked status
////    });
////    $('.checkBox-line input').change(function () {
////        //uncheck "select all", if one of the listed checkbox item is unchecked
////        if (false == $(this).prop("checked")) { //if this item is unchecked
////            $("#select_all").prop('checked', false); //change "select all" checked status to false
////            $(".loansListWrapper").find("#select_all").parents('.checkBox-line').removeClass("checkActive");
////        }
////        //check "select all" if all checkbox items are checked
////        if ($('.checkBox-line input:checked').length == $('.checkBox-line input').length) {
////            $("#select_all").prop('checked', true);
////        }
////    });
////}

//function BindAllGrabDeals(bankingchannel, category, brand, orderbyfilter) {
//    $(".loader").show();
//    var response = AjaxService.GetGrabDealsList(bankingchannel, category, brand, orderbyfilter, currentPage, pageSize, endingsoondays);

//    //  var lstAllGrabDeals = jQuery.parseJSON(response[0]);
//    totalresultcount = parseInt(response[1]);
//    var lstbankingchannel = jQuery.parseJSON(response[2]);
//    var lstcategory = jQuery.parseJSON(response[3]);
//    var lstbrand = jQuery.parseJSON(response[4]);
//    var dtmaxpublishedtime = response[5];

//    //Bind Category
//    if ($("#dvGrabdealsCategory").children().length == 0) {
//        $("#dvGrabdealsCategory").html("");
//        $.each(lstcategory, function (index, category) {

//            var catcount = category.Count > 0 ? "(" + category.Count + ")" : "";
//            //var $li = $("<li><a href='javascript:void(0);' data-value='" + category.Value + "'>" + category.Title + " " + catcount + "</a></li>");
//            //$("#ulGrabDealsCategory").append($li);
//            if (catcount != 0) {
//                var $li = $(
//                    "<div class='checkFeild'>" +
//                    "<label for='" + category.Value + "'>" +
//                    "" + category.Title + " " + catcount + "" +
//                    "<input class='chkCategory' data-value='" + category.Value + "' onchange='BindFilteredGrabDeals(this);' id='" + category.Value + "' name='" + category.Value + "' type='checkbox'>" +
//                    "<div class='controlIndicator'></div>" +
//                    "</label>" +
//                    "</div>"
//                );
//                $("#dvGrabdealsCategory").append($li);
//            }

//        });

//        //$("#dvGrabdealsCategory").append("<div class='clearApply'><span onclick='ClearCategoryFilter(this);' class='clear'>Clear |</span><span onclick='BindFilteredGrabDeals(this);' class='apply'>Apply</span></div>");
//    }


//    //Bind Brand
//    if ($("#dvGrabdealsBrand").children().length == 0) {
//        $("#dvGrabdealsBrand").html("");
//        $.each(lstbrand, function (index, brand) {

//            var brandcount = brand.Count > 0 ? "(" + brand.Count + ")" : "";
//            var $li = $(
//                "<div class='checkFeild'>" +
//                "<label for='" + brand.Value + "'>" +
//                "" + brand.Title + "" +
//                "<input class='chkBrand' data-value='" + brand.Value + "' id='" + brand.Value + "' onchange='BindFilteredGrabDeals(this);' name='" + brand.Value + "' type='checkbox'>" +
//                "<div class='controlIndicator'></div>" +
//                "</label>" +
//                "</div>"
//            );
//            $("#dvGrabdealsBrand").append($li);
//        });

//        //$("#dvGrabdealsBrand").append("<div class='clearApply'><span onclick='ClearBrandFilter(this);' class='clear'>Clear |</span><span onclick='BindFilteredGrabDeals(this);' class='apply'>Apply</span></div>");
//    }

//    //Bind OfferText
//    category != "all" ? $("#spnCategory").html(category) : $("#spnCategory").html("");
//    bankingchannel != "all" ? $("#spnBankingChannel").html("for " + bankingchannel) : $("#spnBankingChannel").html("");

//    $("#spnGrabDealsCount").html("");
//    $("#spnCategory").html("");

//    $("#spnBankingChannel").html(totalresultcount);

//    //Sorting by expiry data
//    //lstAllGrabDeals.sort(function (a, b) {
//    //    var dateA = new Date(a.OfferValidity), dateB = new Date(b.OfferValidity);
//    //    return dateA - dateB;
//    //});
//    //Bind GrabDeals
//    $.each(lstAllGrabDeals, function (index, grabdeal) {
//        //onclick=\"location.href = '" + grabdeal.UrlName + "';\"
//        var $li = $(

//            "<li class='tmainListing'>" +
//            "<div class='grabDealBox'>" +
//            "<div class='travelImgwrap'>" +
//            //"<a href='" + grabdeal.UrlName + "' target='_blank'>" +
//            "<img src='" + grabdeal.BackgroundImage + "' alt='img' class='b-lazy'>" +
//            // "</a>" +
//            "</div>" +
//            "<div class='travelContentwrap'>" +
//            "<div class='tofferHeader'>" +
//            "<h4>" + grabdeal.Title + "</h4>" +                      //<a href='" + grabdeal.UrlName + "' target='_blank'></a>
//            "<div class='tofferShare'>" +
//            "<ul>" +
//            "<li><a onclick='ShareFn(this);' data-name='Facebook' data-key='" + grabdeal.UrlName + "' href='javascript:void(0);' class='icon-fb'></a></li>" +
//            "<li><a onclick='ShareFn(this);' data-name='Twitter' data-key='" + grabdeal.UrlName + "' href='javascript:void(0);' class='icon-twitter'></a></li>" +
//            "<li><a onclick='ShareFn(this);' data-name='Whatsapp' data-key='" + grabdeal.UrlName + "' href='javascript:void(0);' class='icon-whatsapp'></a></li>" +
//            "</ul>" +
//            "</div>" +
//            "</div>" +
//            "<p>" + grabdeal.Text + "</p>" +
//            "<div class='tofferExpire'><span class='travelexpires'>Expires on  " + grabdeal.strOffervalidity + "</span><a href='" + grabdeal.UrlName + "' target='_blank' class='travelTnc'>Know More	</a></div>" +
//            "<div class='tofferCards'></div>" +
//            "</div>" +
//            "</div>" +
//            "</li>"
//        );

//        var grabDealBox = $li.find(".grabDealBox");
//        var travelImgwrap = $li.find(".travelImgwrap");
//        var tofferCards = $li.find(".tofferCards");

//        if (grabdeal.Popularity && grabdeal.EndingSoon) {
//            grabDealBox.addClass("popularEnding popularTravel endingSoon");
//            travelImgwrap.append("<div class='populartblock'><span>Popularity</span></div><div class='endingSoonblock'><span>Ending Soon</span></div>");
//        }
//        else {
//            //Bind Popularity
//            if (grabdeal.Popularity) {
//                grabDealBox.addClass("popularTravel");
//                travelImgwrap.append("<div class='populartblock'><span>Popularity</span></div>");
//            }
//            //Bind Ending Soon
//            if (grabdeal.EndingSoon) {
//                grabDealBox.addClass("endingSoon");
//                travelImgwrap.append("<div class='endingSoonblock'><span>Ending Soon</span></div>");
//            }
//        }
//        //Bind Banking Channel
//        //$.each(grabdeal.lstbankingchannel, function (index, bankingchannel) {
//        //    tofferCards.append("<span>" + bankingchannel.Title + ", </span>");
//        //});

//        for (var i = 0; i < grabdeal.lstbankingchannel.length; i++) {

//            if (i == grabdeal.lstbankingchannel.length - 1)
//                tofferCards.append("<span>" + grabdeal.lstbankingchannel[i].Title + "</span>");
//            else
//                tofferCards.append("<span>" + grabdeal.lstbankingchannel[i].Title + ", </span>");
//        }

//        //if (grabdeal.lstbankingchannel.length > 0)
//        //    tofferCards.html(tofferCards.html().substring(0, tofferCards.html().length - 2));


//        $("#ulGrabDeals").append($li);

//    });

//    listsize = $('#ulGrabDeals').children().length;

//    if (listsize == 0) {
//        var $emptyli = $(
//            "<li class='tmainListing'>" +
//            "<div class='grabDealBox'>" +
//            "<p class='noData'>" + "Sorry, no data found" + "</p>" +
//            "</div>" +
//            "</li>"
//        );

//        $("#ulGrabDeals").append($emptyli);
//    }

//    listsize < 6 || listsize == totalresultcount ? $("#lnkGrabDealsListLoadMore").hide() : $("#lnkGrabDealsListLoadMore").show();

//    BindAllGrabDealsEvents();

//    $(".js-cancel").click();
//    $(".loader").hide();
//}

//function getMainUrl(sParam) {
//    var sPageURL = window.location.search.substring(1),
//     sURLVariables = sPageURL.split('&');
//    for (var i = 0; i < sURLVariables.length; i++) {
//        var sParameterName = sURLVariables[i].split('=');
//        if (sParameterName[0] == sParam) {
//            return sParameterName[1];
//        }
//    }
//}​
function getMainUrl() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[1]);
        //vars[hash[0]] = hash[1];
    }
    return vars;
}

//function getMainUrl() {
//    var vars = [], hash;
//    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//    for (var i = 0; i < hashes.length; i++) {
//        vars = hashes[i].split('=');

//        //vars.push(hash[0]);
//       vars = vars[1];
//    }
//    return vars;
//}


$("#dvBankingChannel .chkbankingchannel").change(function (e) {


    // e.preventDefault();

    if ($(this).data("value") == "all") {
        //  $(".checkBox-line input").prop('checked', $("#dvBankingChannel div.dvbankingchannelall .chkbankingchannel").is(":unchecked")); //change all checkboxes checked status

        if ($(this).is(":checked")) {
            $("div.dvbankingchannelall .chkbankingchannel").addClass("checkActive");
            $(".dvbankingchannelother input").prop('checked', false);
            $(".dvbankingchannelother").removeClass("checkActive");


        } else {
            $("#dvBankingChannel .checkBox-line").removeClass("checkActive");

        }
    }
    else {
        if ($(this).is(":checked")) {
            $(this).parents('.checkBox-line').addClass("checkActive");
            $("div.dvbankingchannelall .chkbankingchannel").prop('checked', false);
            $(".dvbankingchannelall").removeClass("checkActive");
        } else {
            $(this).parents('.checkBox-line').removeClass("checkActive");
            //var chkArray = [];
            //$(".dvbankingchannelother:checked").each(function () {
            //    chkArray.push($(this).val());
            //});
            //if (chkArray.length === 0) {
            //    $("div.dvbankingchannelall .chkbankingchannel").prop('checked', true);
            //}
        }
    }


    BindFilteredGrabDeals(this);
});