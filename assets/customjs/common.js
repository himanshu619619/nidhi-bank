// generic functions start
function IsNumeric(e) {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    var keyCode = e.which ? e.which : e.keyCode
    //alert(keyCode);
    if ((keyCode >= 48 && keyCode <= 57) || keyCode == 46 || specialKeys.indexOf(keyCode) != -1) {
        return true;
    }
    else {
        return false;
    }
}
function OnlyAlphanumeric(e) { // Alphanumeric only
    var specialKeys = new Array();
    specialKeys.push(8);
    var k = (e.which) ? e.which : e.keyCode;
    if ((k > 47 && k < 58) || (k > 64 && k < 91) || (k > 96 && k < 123) || k == 0 || specialKeys.indexOf(k) != -1) {
        return true;
    }
    else {
        return false;
    }

}
function OnlyAlphabetic(obj, e) {
    //var regex = new RegExp("^[a-zA-Z ]*$");
    //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    //if (regex.test(str)) {
    //    return true;
    //}
    //e.preventDefault();
    //return false;
    var name = $(obj).val();
    if (name.length > 0) {
        var k = (e.which) ? e.which : e.keyCode;
        return ((k > 32 && k < 46) || (k > 46 && k < 65) || (k > 90 && k < 97) || (k == 46) || (k == 123 || (k == 125)) || (k == 126)) ? false : true;
    }
    else {
        var k = (e.which) ? e.which : e.keyCode;
        return ((k > 32 && k < 46) || (k > 46 && k < 65) || (k > 90 && k < 97) || (k == 32) || (k == 46) || (k == 123 || (k == 125)) || (k == 126)) ? false : true;
    }
}
function validateEmail(sEmail) {
    var regex = /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-zA-Z][a-zA-Z-0-9]*\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
    if (regex.test(sEmail.trim())) {
        return true;
    }
    else {
        return false;
    }
}
function validatePanNo(PanNo) {
    var regex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
    if (regex.test(PanNo)) {
        return true;
    }
    else {
        return false;
    }
}
function OnlyPrice(obj, e) {
    var charCode = (e.which) ? e.which : event.keyCode;
    var number = obj.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if (number.length > 1 && charCode == 46) {
        return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(obj);
    var dotPos = obj.value.indexOf(".");
    if (caratPos > dotPos && dotPos > -1 && (number[1].length > 1) && charCode != 8) {
        return false;
    }
    return true;
}
function getSelectionStart(o) {
    if (o.createTextRange) {
        var r = document.selection.createRange().duplicate()
        r.moveEnd('character', o.value.length)
        if (r.text == '') return o.value.length
        return o.value.lastIndexOf(r.text)
    } else return o.selectionStart
}
function OnlyQuantity(e) {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    var keyCode = e.which ? e.which : e.keyCode
    //alert(keyCode);
    if ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1) {
        return true;
    }
    else {
        return false;
    }
}

function GetUrlParam() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function GetUrlArray() {
    var hashes = window.location.href.split('index.html').slice(3);
    if (hashes[0].toLowerCase() == "sitefinity")
        return null;
    return hashes;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setCookieTillMidnight(cname, cvalue) {
    var date = new Date();
    var midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    var expires = "expires=" + midnight.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteCookie(cookiename) {
    try {
        var now = new Date();
        now.setMonth(now.getMonth() - 1);
        var expires = "expires=" + now.toUTCString();
        document.cookie = cookiename + "='';" + expires + ";path=/";
    } catch (e) {
        console.log(e);
    }
}
function SessionExpired() {
    try {
        deleteCookie(UserCookie);
        deleteCookie(UserToken);
        deleteCookie(UserAccId);
        deleteCookie(UserDetails);
        deleteCookie(BrokerName);
        deleteCookie(BranchId);
        deleteCookie(ClientCode);
        deleteCookie(StockCart);
        deleteCookie(MFCart);
        deleteCookie(StockBasketCart);
        deleteCookie(MFBasketCart);
        deleteCookie(Source);
        deleteCookie(EXEValidationSession);
        ///
        localStorage.removeItem('name');
        localStorage.removeItem('status');
        localStorage.removeItem('showconsent');
        _ss_track.api.remove_chat_widget();
    } catch (e) {
        console.log("GTM Error Remove Local Storage & _ss_track.api.remove_chat_widget()");
        console.log(e);
        console.log("============================================================");
    }
}
function Logout() {
    SessionExpired();
}

function AjaxCall(url, data, successEvent, failureEvent) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successEvent,
        error: failureEvent,
        async: true
    });
}
function AjaxCallHelper(url, data, successEvent, failureEvent) {
    $.ajax({
        type: "POST",
        url: "http://localhost:9008/" + url,//Local
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successEvent,
        error: failureEvent,
    });
}
function onFailure(msg) {
    console.log(msg);
    $("#loader").hide();
    $(".loginbtn").button("reset");
}

function RefreshPage() {
    location.reload();
}
function Redirect(url) {
    location.href = url;
}
function redirection(section) {
    if (section == "home") {
        setTimeout(function () { Redirect("index.html"); }, 2000);
    }
    else {
        setTimeout(function () { location.reload(); }, 2000);
    }
}

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date();
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

function dateDiff(dt) {
    var timestamp = new Date(dt);
    var d = Math.abs(timestamp - new Date().getTime()) / 1000;                 // delta
    var r = {};                                                                // result
    var s = {                                                                  // structure
        year: 31536000,
        month: 2592000,
        week: 604800, // uncomment row to ignore
        day: 86400,   // feel free to add your own row
        hour: 3600,
        minute: 60,
        second: 1
    };

    Object.keys(s).forEach(function (key) {
        r[key] = Math.floor(d / s[key]);
        d -= r[key] * s[key];
    });
    return r;
};
function days_between(date1, date2) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms / ONE_DAY)
}
function GetMaxElapsedTime(time) {
    var elapsedtime;
    switch (true) {
        case time.year > 0:
            elapsedtime = time.year + " year" + (time.year < 2 ? "" : "s") + " ago";
            break;
        case time.month > 0:
            elapsedtime = time.month + " month" + (time.month < 2 ? "" : "s") + " ago";
            break;
        case time.week > 0:
            elapsedtime = time.week + " week" + (time.week < 2 ? "" : "s") + " ago";
            break;
        case time.day > 0:
            elapsedtime = time.day + " day" + (time.day < 2 ? "" : "s") + " ago";
            break;
        case time.hour > 0:
            elapsedtime = time.hour + " hour" + (time.hour < 2 ? "" : "s") + " ago";
            break;
        case time.minute > 0:
            elapsedtime = time.minute + " minute" + (time.minute < 2 ? "" : "s") + " ago";
            break;
        case time.second > 0:
            elapsedtime = time.second + " second" + (time.second < 2 ? "" : "s") + " ago";
            break;
    }
    return elapsedtime;
}

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        var blob = new Blob([format(template, ctx)]);
        var blobURL = window.URL.createObjectURL(blob);
        return blobURL;
    }
})();
function DownloadExcel(filename, tableID, sheetName) {
    var a = document.createElement('a');
    var todaysDate = moment().format('DD-MM-YYYY');
    var blobURL = tableToExcel(tableID, sheetName);
    $(a).attr('download', filename + ' ' + todaysDate + '.xls')
    $(a).attr('href', blobURL);
    //  a.click();

    if (navigator.userAgent.search("Firefox") > 0) {
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    else {
        a.click();
    }

}

function exportTableToCSV(a, b) {
    function j(a) {
        return a.get().join(f).split(f).join(h).split(e).join(g)
    }

    function k(a, b) {
        var c = $(b),
            d = c.find("td");
        return d.length || (d = c.find("th")), d.map(l).get().join(e)
    }

    function l(a, b) {
        return $(b).text().replace('"', '""')
    }
    var c = a.find("tr:has(th)"),
        d = a.find("tr:has(td)"),
        e = String.fromCharCode(11),
        f = String.fromCharCode(0),
        g = '","',
        h = '"\r\n"',
        i = '"';
    i += j(c.map(k)), i += h, i += j(d.map(k)) + '"',
    csvData = "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(i),
    window.navigator.msSaveBlob ? window.navigator.msSaveOrOpenBlob(new Blob([i], {
        type: "text/plain;charset=utf-8;"
    }), b) : $(this).attr({
        download: b,
        href: csvData,
        target: "_blank"
    })

}

function PrintDiv(id, docTitle) {
    try {
        var contents = $("#" + id).html();
        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        /// frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        ///
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        ///
        frameDoc.document.write('<html><head><title>' + docTitle + '</title>');
        ///
        frameDoc.document.write('<link href="/assets/css/vendor.min.css" rel="stylesheet" />');
        frameDoc.document.write('<link href="/assets/css/styles.min.css" rel="stylesheet" />');
        frameDoc.document.write('<link href="/assets/customCss/mystyle.min.css" rel="stylesheet" />');
        frameDoc.document.write('<link href="/assets/customCss/search.css" rel="stylesheet" />');
        frameDoc.document.write('</head><body>');
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        ///
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);

    } catch (e) {
        ToastPopup("Error", "Cannot print this page.");
    }
}

function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}
function saveByteArray(reportName, byte) {
    var blob = new Blob([byte]);
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName + ".pdf";
    link.download = fileName;
    link.click();
};

function ExportToPDF(htmlContent, width, height, filename) {
    var params = {};
    params.html = htmlContent;
    params.wd = width;
    params.ht = height;
    params = JSON.stringify(params);

    AjaxCallHelper("HelperMethods.aspx/ReturnFile", params,
        function (response) {
            // on success
            /// console.log(response.d.length);
            if (response.d.length > 0) {
                var sampleArr = base64ToArrayBuffer(response.d);
                saveByteArray(filename + "_" + new Date().format("yyyymmdd"), sampleArr);
            }
            else {
                ToastPopup("error", "Cannot export to PDF.");
            }
        },
        function (err) {
            // on failure
            // console.log(err);
        });
}

function numDifferentiation(val) {
    var value = val;
    if (val < 0)
        value = Math.abs(value);

    if (value >= 10000000)
        value = (value / 10000000).toFixed(2) + ' Cr';

    else if (value >= 100000)
        value = (value / 100000).toFixed(2) + ' Lac';

    //else if (val >= 1000) val = (val / 1000).toFixed(2) + ' K';
    if (val < 0)
        value = "-" + value;
    else
        value = value;

    return value;
}
function commaSeparateNumber(val) {
    if (val != "" && val != undefined)
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
    else
        val = 0;

    return val;
}
function commaSeparateNumberNew(val) {
    var isNegative = false;
    if (val != "" && val != undefined) {
        var arr = [];
        if (val.toString().indexOf(".") > 0) {
            arr = val.toString().split('.');
            x = arr[0].toString();
        }
        else {
            x = val.toString();
        }

        if (x.toString().indexOf("-") > -1) {
            isNegative = true;
            x = x.toString().replace(/-/g, "");
        }

        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

        res = arr.length > 1 ? res + "." + arr[1] : res;

        if (isNegative) {
            res = "-" + res;
        }
    }
    else {
        res = 0;
    }
    return res;

}

//Conversion from decimal to binary

function decimaltobinary(val) {
    var binarynum = parseInt(val, 10).toString(2);
    return binarynum;
}


function openSharePopup(url) {
    window.open(url, '_blank', 'scroll=no,height=400,width=600,resizable=no,fullscreen=no,scrollbars=no,status=no');
}
function ToastPopup(popuptype, msg) {
    switch (popuptype) {
        case "success":
            BootstrapAlert.success({
                title: "Success!",
                message: msg,
                dissmissible: true,
            });
            break;
        case "error":
            BootstrapAlert.alert({
                title: "Error!",
                message: msg,
                dissmissible: true,
            });
            break;
        case "info":
            BootstrapAlert.info({
                title: "Info!",
                message: msg,
                dissmissible: true,
            });
            break;
        case "warning":
            BootstrapAlert.warning({
                title: "Warning!",
                message: msg,
                dissmissible: true,
            });
            break;
    }
}
function ReutrnNAIfBlank(value) {
    if (value == "" || value == null) {
        value = "NA";
    }
    return value;
}
function ReutrnZeroIfBlank(value) {
    if (value == "" || value == null) {
        value = "0";
    }
    return value;
}
function FormatString(strContent, maxchar) {
    var formatstring = "";
    if (strContent != "" && strContent != undefined) {
        if (strContent.length > maxchar)
            formatstring = strContent.substring(0, maxchar) + "...";
        else
            formatstring = strContent;
    }
    return formatstring;
}
function compareValues(key, order) {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        var varA = (typeof a[key] === 'string') ?
          a[key].toUpperCase() : a[key];
        var varB = (typeof b[key] === 'string') ?
          b[key].toUpperCase() : b[key];

        var comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
          (order == 'desc') ? (comparison * -1) : comparison
        );
    };
}

function isGuid(stringToTest) {
    if (stringToTest[0] === "{") {
        stringToTest = stringToTest.substring(1, stringToTest.length - 1);
    }
    var regexGuid = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
    return regexGuid.test(stringToTest);
}

function handleSelect(ctrl, target) {
    if (ctrl.value != "" && ctrl.value != "javascript:void(0)")
        target == "" ? window.location = ctrl.value : window.open(ctrl.value, target);
}

function setIFrameSrc(iFrameID, type, url) {
    var myFrame = $('#' + iFrameID);
    url = url.replace(/ /g, '-').toLowerCase();
    $(myFrame).attr('src', url);
    return false;
}

// GENERIC FUNCTIONS ENDS


function setIFrameSrcMenu_New(iFrameID, postcodeValue, campaigncode) {
    var myFrame = $('#' + iFrameID);
    var url = '/retail/accounts/apply-now?ProdName=' + postcodeValue;
    url = url.replace(/ /g, '-').toLowerCase();
    $(myFrame).attr('src', url);
    //$('.mega_menu_overlay').addClass('apply_now_overlay');
    //setTimeout("$('.apply_now_form_container_new').show()", 100);
    //$("html, body").animate({ scrollTop: 0 }, "slow");

    $('.apply_now_form_container_new').show();
    return false;
}


function openSharePopup(url) {
    window.open(url, '_blank', 'scroll=no,height=400,width=600,resizable=no,fullscreen=no,scrollbars=no,status=no');
}

function ShareFn(data) {
    var sharetype = $(data).data('name').toLowerCase();
    var domainurl = location.protocol + '//' + location.hostname;
    var detailurl = domainurl + '/' + $(data).data('key');
   // var url = $(data).data('key');
    var url = location.href;

    var sharetext = $(document).find("title")[0].text.trim().replace(/%/g, "-per-").replace(/&/g, "-and-").replace(/\./g, "").replace(/'/g, "~").replace(/\|/g, "").replace(/ /g, "-").replace(/;/g, ',');

    var shareurl = "";

    if (sharetype == "facebook") {
        shareurl = 'https://www.facebook.com/sharer/sharer.php?u=' + detailurl;
    }
    else if (sharetype == "twitter") {
        shareurl = 'https://twitter.com/intent/tweet?text=' + sharetext + '&url=' + detailurl;
    }
    else if (sharetype == "linkedin") {
        shareurl = 'https://www.linkedin.com/shareArticle?mini=true&title=' + sharetext + '&summary=&url=' + detailurl;
    }
    else if (sharetype == "gplus") {
        shareurl = 'https://plus.google.com/share?url=' + detailurl;
    }
    else if (sharetype == "whatsapp") {
        //shareurl = 'whatsapp://send?text=url' + url;
        //shareurl = 'whatsapp://send?text=' + sharetext + '&url=' + detailurl;
		 shareurl = 'whatsapp://send?url=' + detailurl+ '&text=' + detailurl;
      
        /* if (sharetext.toLowerCase().indexOf('progress') != -1) { 
            shareurl = 'whatsapp://send?text=' + url + '?cta=homepage-read-all-progress-with-us-blog';
          
        } */
    }

    openSharePopup(shareurl);
    return false;
}


function SetCompareAllAttrs(ctrl) {
    var href = $(ctrl).data("href");
    var compareids = $(ctrl).data("compareids");
    var comparetype = $(ctrl).data("comparetype");
    var ismobile = $(ctrl).data("ismobile");
    var regularorexclusiv = $(ctrl).data("regularorexclusiv") == null ? "" : $(ctrl).data("regularorexclusiv");

    var result = AjaxService.SetCompareAllAttrs(href, compareids, comparetype, ismobile, regularorexclusiv);

    if (result == "true")
        location.href = href;
}



function gotoLink(ctrl) {

    var eventCategory = $(ctrl).data("eventcategory");
    var eventAction = $(ctrl).data("eventaction");
    var eventLabel = $(ctrl).data("eventlabel");
    var event = $(ctrl).data("event");

    //Check whether eventLabel value contains simple value or URL.
    //If URL, then append full URL if not
    if (eventLabel.startsWith("index.html") || eventLabel.startsWith("http")) {
        if (eventLabel.indexOf(window.location.host) > -1 || eventLabel.indexOf("www.axisbank.com") > -1 || eventLabel.indexOf("http") > -1)
        { }
        else {
            eventLabel = window.location.protocol + "//" + window.location.host + eventLabel;
        }
    }

    dataLayer.push({
        'eventCategory': eventCategory,
        'eventAction': eventAction,
        'eventLabel': eventLabel,
        'event': event
    });
}

//Mobile Optimization of Links
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//Mobile Optimization of Links

$(document).ready(function () {

    //Mobile Optimization of Links
    var app = getUrlVars()["app"];
    if (app == 'y') {
        $(".topBand").remove();
        $(".topMenu").remove();
        $(".breadcrumSect").remove();
        $(".bannerWrapper").remove();
        $("footer").remove();
    }
    //Mobile Optimization of Links

    $(document).on("click", ".js-hamburger", function (e) {
        e.preventDefault();
        var mobileMenuPersonalHTML = AjaxService.GetMobileMenuContent("mobileMenuPersonal_new");
        $(".mobiNav").html(mobileMenuPersonalHTML);
        $("body").css("position", "fixed");
        $("body").css("width", "100%");
        $(".overLay").show();
        $(".mobiNav").animate({
            left: "0"
        });
		$(".mobiNav").focus();
		$("body").hasClass("wob")?$(".mobileMenu .logoSect img").attr("src","assets/images/logo-white.png"):$(".mobileMenu .logoSect img").attr("src","assets/images/logo.png")
    });
    $(document).on("click", ".js-business", function (e) {
        e.preventDefault();
        var mobileMenuBusinessHTML = AjaxService.GetMobileMenuContent("BusinessHomeMainMenuMobile_new");
        $(".mobiNav").html(mobileMenuBusinessHTML);
        $("body").css("position", "fixed");
        $("body").css("width", "100%");
        $(".overLay").show();
        $(".mobiNav").animate({
            left: "0"
        });
    });
    $(document).on("click", ".js-personal", function (e) {
        e.preventDefault();
        var mobileMenuPersonalHTML = AjaxService.GetMobileMenuContent("mobileMenuPersonal_new");
        $(".mobiNav").html(mobileMenuPersonalHTML);
    });

    $(document).on('click', '.axisappDownlLink', function (event) {
        event.preventDefault();
        if ($('.android').length) {
            window.open("https://play.google.com/store/apps/details?id=com.axis.mobile&amp;hl=en", '_blank')
        }
        else if ($('.ios').length) {
            window.open("https://itunes.apple.com/in/app/axis-bank-mobile-banking/id699582556?mt=8", '_blank');
        }
    });

    //To stick the menu when page is loaded from middle
    $(window).scrollTop() > 44 ? $("body").addClass("header-fixed") : $("body").removeClass("header-fixed");

    $(".breadcrumSect").css("top", "0px");

    $(document).on("click", ".close, .cancel, .accept", function (e) {
        $(".dealPopup, .overLay").hide(),
        $("body").removeClass("topMenuOpen")
    });

    $(document).on("click", ".js-bankDigiClk", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var URL = $(this).data("href");
        setIFrameSrc("iframeApplyNow", "iframeApplyNow", URL);
        $(".popupWrap, .popOverlay").fadeIn();
        $("body").addClass("topMenuOpen");
    });
    $(document).on("click", ".closeBtn", function (e) {
        $(".popupWrap, .popOverlay").hide();
        $("body").removeClass("topMenuOpen");
    });

    $('.lnksubscribenow').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var type = $(this).data("type");
        var url = $(this).data("url");
        setIFrameSrc("IframePopup", type, url)
        $("#iframeModal").modal("show");

        //$("#IframePopup body").css("background", "none !important");

    });





});

$(window).on("load", function () {
    var loanstabindex = $(".loansListWrapper .owl-stage .owl-item li.active").parent(".owl-item").index();
    $('.loansListWrapper .owl-carousel').trigger('to.owl.carousel', [loanstabindex, 500, true]);

    sendToMoneyTabsActive();
});

function sendToMoneyTabsActive() {

setTimeout(function(){
    var str = window.location.href;
    var lastSlash = str.lastIndexOf("index.html");
    str.substring(lastSlash+1);
     var tabName =  str.substring(lastSlash+1);

    $('.' + tabName).addClass('active');

},500);

//20.05.19
$(document).ready(function () {
	if($(window).width() < 768){
	$('.bannerWrapper').prepend("<div class='emibnrOverlay'></div>");
	
	}
});

//22.05.19
$(document).ready(function(){
  
var app = getParameterByName('app');
        if (app == 'y' || app == 'Y') {
            $('.latestTitle').show();
            $('header').hide();
            $('.breadcrumSect').hide();
            $('#bannerLt').hide();
            $('.latestP').hide();
            $('.digitalBank').hide();
            $('.socialWrap').hide();
            $('.rgtSide').addClass('brdNone');
            $('footer').hide();
            $("#HomePageStrip").hide();
			$(".progressUs .tabBox").hide();
			$(".backArw").show();
			$('.progressUsSlider').addClass('mrgTop');
			$('.fdOpn').hide();
          
          $("a.linkEffect, a.backArw").click(function() {
		  var theHref = $(this).attr("href");
		  if (theHref.indexOf("?app") === -1) {
				$(this).attr("href", theHref + "?app=y");
			}
		});
		var url = document.location.href;
		if (url.toLowerCase().indexOf('latest-articles/index.html') >= 0) {
       $('.topSearchBox').hide();
     }
     if (url.toLowerCase().indexOf('money-matters/index.html') >= 0) {
       $('.topSearchBox').hide();
     }
	 if (url.toLowerCase().indexOf('tech-talk/index.html') >= 0) {
       $('.topSearchBox').hide();
     }
	 if (url.toLowerCase().indexOf('food-travel/index.html') >= 0) {
       $('.topSearchBox').hide();
     }
	 if (url.toLowerCase().indexOf('how-to-series/index.html') >= 0) {
       $('.topSearchBox').hide();
     }
        }
  
  var field = 'app';
        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
          
        };
  
});
// 11.06.19
$(document).ready(function(e) {
 if($(".topSearchBox").length){
   $(".topSearchBox").simpleScrollFollow({
       limit_elem: ".progressUsSlider",
       limit_elem: ".articleDetail"
   })
}
});



// 13.06.19
var setCookie = function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        var getCookie = function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }

        jQuery(document).ready(function ($) {
			$(".topbandBg").show();
            console.log(getCookie("closed"));
            if (getCookie("closed") == "closed") {
                $(".topbandBg").hide();
            }

            jQuery(".closeBand").click(function () {
                jQuery(".topbandBg").slideUp(500);
                setCookie("closed", "closed", 365)
            });
        });

// 26.06.19
$(".nav a").each(function() {
    //console.log($(this).attr('href'));
    if ((window.location.pathname.indexOf($(this).attr('href'))) > -1) {
        $(this).find('li').addClass('active');
    }
});

// 05.08.19
$(document).scroll(function () {
  if(window.innerWidth < 860){
    var y = $(this).scrollTop();
    if (y > 300) {
        $('.mob-apply').fadeIn();
    } else {
        $('.mob-apply').fadeOut();
    }
	
	if (y > 950) {
        $('.mob-apply-calc').fadeIn();
    } else {
        $('.mob-apply-calc').fadeOut();
    }
}
});

// 26.08.19
$(function(){
		$('#myid li a').filter(function(){
			$('#myid li:first-child').addClass('active');
			return this.href==location.href}).parent().addClass('active').siblings().removeClass('active')
		$('#myid li a').click(function(){
			$(this).parent().addClass('active').siblings().removeClass('active')	
		})
	})



     // $('.countriesDetailsBox').find(urlStringName).addClass('active').trigger('click');  
    /*console.log($('.' + str.substring(lastSlash+1));
    console.log('hjkhkhkhk' + str.substring(lastSlash+1));
    console.log('hjkhkhkhk'); */

    // console.log($('.countriesDetailsBox').find('.middle-east').length);
}