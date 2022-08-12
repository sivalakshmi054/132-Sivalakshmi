function validateFloat(e, intDecimalPlaces) {
    var whichASC = (NS4) ? e.which : event.keyCode;
    var keyBS = 8;
    var keyDecimal = 46;
    var controlName = "";

    if (intDecimalPlaces == 0) {
        if (whichASC > 47 && whichASC < 58) {
            return true;
        }
        else {
            return false;
        }
    }
    if (NS4) {
        controlName = e.target.name;
        controlValue = e.target.value;
    }
    else {
        controlName = window.event.srcElement.getAttribute("name");
        if (window.event.srcElement.getAttribute("value") == null) {
            controlValue = "";
        }
        else {
            controlValue = window.event.srcElement.getAttribute("value");
        }
    }

    if ((((whichASC < 48) || (whichASC > 57)) && (!(whichASC == keyBS))) && (!(whichASC == keyDecimal))) {
        return (false);
    }
    else {
        if (whichASC == keyDecimal) {
            if (controlValue.indexOf(".") >= 0)
                return false;
            else
                return true;
        }
    }

    if (intDecimalPlaces != 0) {
        var el = window.event.srcElement;
        var cur_pos = cursor_pos(el);		// return the cursor position
        if (cur_pos > (controlValue.indexOf(".") + 1)) {
            var txt = '';
            var foundIn = '';
            txt = document.selection.createRange().text;
            if (controlValue.indexOf(".") >= 0) {
                if ((controlValue.length - controlValue.indexOf(".")) > intDecimalPlaces)
                    if (txt == "") return false;
            }
        }
    }
    return (true);
}
//Only Characters input.   //numbers & Special characters are not allowed
function varifychar(e) {
    if ((event.keyCode >= 33 && event.keyCode <= 64) || (event.keyCode >= 91 && event.keyCode <= 96) || (event.keyCode >= 123 && event.keyCode <= 126)) {
        alert("Numbers & Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}
//Only Special input      // numbers are not allowed 
function OnlySpecChar(e) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        alert("Numbers are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}

//Only hyphen
function OnlyDash(e) {
    if (event.keyCode != 46 && event.keyCode != 45 && event.keyCode > 31 ) {
        alert("hyphen only allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}

//Only Characters & numbers  //Special characters not allowed.
function NoSpecChar(e) {
    if ((event.keyCode >= 33 && event.keyCode <= 47) || (event.keyCode >= 58 && event.keyCode <= 64) || (event.keyCode >= 91 && event.keyCode <= 96) || (event.keyCode >= 123 && event.keyCode <= 126)) {
        alert("Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}
//Only numbers input.   //Characters are not allowed
function varifyNumberPositive(e) {
    if (event.keyCode < 44 || event.keyCode > 57 || event.keyCode == 47 || event.keyCode == 45 || event.keyCode == 46) {
        alert("Characters & Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}

//only & _ . special characters only allowed//
function NoSpecCharallowFew(e) {
    if ((event.keyCode >= 33 && event.keyCode <= 37) || (event.keyCode >= 39 && event.keyCode <= 44) || (event.keyCode == 47) || (event.keyCode >= 58 && event.keyCode <= 64) || (event.keyCode >= 91 && event.keyCode <= 96) || (event.keyCode >= 123 && event.keyCode <= 126)) {
        alert("Characters & Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}

//Only +- special characters & numbers  // characters not allowed.(Contact No.)
function OnlySpecCharNum(e) {
    if ((event.keyCode != 43 && event.keyCode != 45) && (!(event.keyCode >= 48 && event.keyCode <= 57))) {
        alert("Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}

//Only '. special characters & numbers  // special characters & characters not allowed.(Candidate Name.)
function ParticularSpecNumber(e) {
    if ((event.keyCode >= 33 && event.keyCode <= 38) || (event.keyCode >= 40 && event.keyCode <= 45) || (event.keyCode >= 58 && event.keyCode <= 64) || (event.keyCode >= 91 && event.keyCode <= 96) || (event.keyCode >= 123 && event.keyCode <= 126)) {
        alert("Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}


//Only '. special characters & numbers  // special characters & characters not allowed.(Candidate Name.)
function ParticularSpec(e) {
    if ((event.keyCode >= 33 && event.keyCode <= 38) || (event.keyCode >= 40 && event.keyCode <= 45) || (event.keyCode >= 47 && event.keyCode <= 64) || (event.keyCode >= 91 && event.keyCode <= 96) || (event.keyCode >= 123 && event.keyCode <= 126)) {
        alert("Numbers & Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}

function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '' || currVal == null)
        return true;

    var rxDatePattern = /^(\d{1,2})(-)(\S{1,3})(-)(\d{4})$/; //Declare Regex
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    var monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    //Checks for mm/dd/yyyy format.
    dtMonth = parseInt(monthList.indexOf(dtArray[3].toLowerCase())) + 1;
    dtDay = dtArray[1];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}


function EmailFormate(EmailIds) {

    //var txtDomain = $('#txtDomain').val();
    //var webSiteReg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    //if (txtDomain != '') {
    //    if (webSiteReg.test(txtDomain) == false) {
    //        alert('Invalid Domain/WebSite Format');
    //        return false;
    //    }
    //}
    var EmailId = EmailIds;
    if (EmailId == '' || EmailId == null)
        return true;

    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (EmailId != '') {
        if (emailReg.test(EmailId) == false) {
            return false;
        }
    }
    return true;
}

function DominFormat(dominIds) {
    var dominId = dominIds;
    if (dominId == '' || dominId == null)
        return true;

    // var webSiteReg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var webSiteReg = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (dominId != '') {
        if (webSiteReg.test(dominId) == false) {
            return false;
        }
    }
    return true;
}

// function DominFormat(dominIds) {
//     var dominId = dominIds;
//     if (dominId == '' || dominId == null)
//         return true;

//     var webSiteReg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

//     if (dominId != '') {
//         if (webSiteReg.test(dominId) == false) {
//             return false;
//         }
//     }
//     return true;
// }

//Only +- special characters & numbers  // characters not allowed.(Contact No. and Fax No.)
function OnlySpecCharNum(e) {
    if ((event.keyCode != 40 && event.keyCode != 41 && event.keyCode != 43 && event.keyCode != 45 && event.keyCode != 46) && (!(event.keyCode >= 48 && event.keyCode <= 57))) {
        alert("Characters & Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}

//Only . & numbers  // special characters & characters not allowed.(Decimal values)
function Numberdot(e) {
    if (!(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 46)) {
        alert("Characters & Special characters are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
}

function ParseDate(dateString) {
    return moment(dateString, "DD-MMM-YYYY")
}

function OnlyAcceptsLetterA(e) {
    if ((event.keyCode >= 32 && event.keyCode <= 47) || (event.keyCode >= 58 && event.keyCode <= 64) || (event.keyCode >= 66 && event.keyCode <= 96) || (event.keyCode >= 98 && event.keyCode <= 127)) {
        alert("Charac are not allowed.");
        if (event.preventDefault) {
            event.preventDefault();
        } else if (typeof event.returnValue !== "undefined") {
            event.returnValue = false;
        }
    }
 }
function divcollapse(tableid, imageId) {

    var x = document.getElementById(tableid);
    var i = document.getElementById(imageId);
   
    if (x.style.display === "none") {
        i.src = "../../img/collapse.gif"
        x.style.display = "block";
        document.getElementById(tableid + '_img').title = 'Click to Collapse';      
    } else {
       

        i.src = "../../img/expand.gif"
        x.style.display = "none";
        console.log(x.style.display);
        document.getElementById(tableid + '_img').title = 'Click to Expand';     

    }
    return true;
};

