var nonpreemptiveLevel = null;
var preemptiveLevel = null;
var maxLevel = 25;
var INF = 1000000000;

var scenes = [
    null,
    {
        nJobs: 6,
        pMax: 6,
        cMax: 9
    },
    {
        nJobs: 6,
        pMax: 7,
        cMax: 9
    },
    {
        nJobs: 6,
        pMax: 8,
        cMax: 9
    },
    {
        nJobs: 6,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 7,
        pMax: 6,
        cMax: 9
    },
    {
        nJobs: 7,
        pMax: 7,
        cMax: 9
    },
    {
        nJobs: 7,
        pMax: 8,
        cMax: 9
    },
    {
        nJobs: 7,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 8,
        pMax: 6,
        cMax: 9
    },
    {
        nJobs: 8,
        pMax: 7,
        cMax: 9
    },
    {
        nJobs: 8,
        pMax: 8,
        cMax: 9
    },
    {
        nJobs: 8,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 9,
        pMax: 6,
        cMax: 9
    },
    {
        nJobs: 9,
        pMax: 7,
        cMax: 9
    },
    {
        nJobs: 9,
        pMax: 8,
        cMax: 9
    },
    {
        nJobs: 9,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 10,
        pMax: 6,
        cMax: 9
    },
    {
        nJobs: 10,
        pMax: 7,
        cMax: 9
    },
    {
        nJobs: 10,
        pMax: 8,
        cMax: 9
    },
    {
        nJobs: 10,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 11,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 12,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 13,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 14,
        pMax: 9,
        cMax: 9
    },
    {
        nJobs: 15,
        pMax: 9,
        cMax: 9
    },
]

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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