// Plain (non-client) module so the server root layout can inline the script.

export const CURRENCY_STORAGE_KEY = "pixim_currency";

/**
 * Runs inline in <head> before first paint: a saved choice wins, otherwise visitors in
 * Bangladesh (Asia/Dhaka timezone or a Bangla/Bangladesh browser locale) get BDT and
 * everyone else USD. The result lives on <html data-currency>, which CSS uses to show
 * the matching price (see `.cur-usd` / `.cur-bdt` in globals.css).
 */
export const CURRENCY_BOOTSTRAP_SCRIPT = `(function(){try{var k='${CURRENCY_STORAGE_KEY}';var c=null;try{c=localStorage.getItem(k);}catch(e){}if(c!=='USD'&&c!=='BDT'){var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}var langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'']).join(',');c=(tz==='Asia/Dhaka'||tz==='Asia/Dacca'||/(^|,)bn\\b|-BD\\b/i.test(langs))?'BDT':'USD';}document.documentElement.setAttribute('data-currency',c);}catch(e){}})();`;
