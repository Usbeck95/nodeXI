"use strict";
const $ = function (foo) {
    return document.getElementById(foo);
}
const init = function() {
    const fctry = "countrySelectForm";
    if ($(fctry)) {
        $(fctry).addEventListener("submit", function() {
            $(fctry).action += "/DNK";
            $(fctry).submit();
        })
    }
}
//window.addEventListener("load", init);