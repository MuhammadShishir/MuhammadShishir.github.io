function bp_get_querystring(n){n=location.search.split(n+"=")[1];return n?decodeURIComponent(n.split("&")[0]):null}
;