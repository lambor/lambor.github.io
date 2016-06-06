/**http://api.jquery.com/animate/*/
/**
All animated properties should be animated to a single numeric value, except as noted below;
 most properties that are non-numeric cannot be animated using basic jQuery functionality 
 (For example, width, height, or left can be animated but background-color cannot be, unless the jQuery.Color plugin is used)
 */
 /**solution*/
/**http://stackoverflow.com/questions/190560/jquery-animate-backgroundcolor*/
(function (d) {
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (f, e) {
        d.fx.step[e] = function (g) {
            if (!g.colorInit) {
                g.start = c(g.elem, e);
                g.end = b(g.end);
                g.colorInit = true
            }
            g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });

    function b(f) {
        var e;
        if (f && f.constructor == Array && f.length == 3) {
            return f
        }
        if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
            return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
        }
        if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
            return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
        }
        if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }
        if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }
        if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
            return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
    }
    function c(g, e) {
        var f;
        do {
            f = d.css(g, e);
            if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
                break
            }
            e = "backgroundColor"
        } while (g = g.parentNode);
        return b(f)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }
})(jQuery);

$(document).ready(function() {
    /**searched li*/
    var hash = window.location.hash;
    if(hash!="") {
        $(hash).css('color','#700');
        $(hash+"li").css('background-color','#333');
        $(hash+"li").animate({backgroundColor:'#ffffff'},'slow');
    }
    

	/* sidebar-right */
    $(".js-scroll-top").click(function() {
        $("html,body").animate({ scrollTop: 0}, 1000)
    });

    $(".js-scroll-down").click(function() {
        $("html,body").animate({ scrollTop: $("#footer").offset().top }, 1000)
    });

    /* search */
    var time1 = 0;
    var show = false;
    var names = new Array(); //文章名字等
    var urls = new Array(); //文章地址
    $(document).keyup(function(e) {
        var time2 = new Date().getTime();
        if (e.keyCode == 17) {
            var gap = time2 - time1;
            time1 = time2;
            if (gap < 500) {
                if (show) {
                    $('.search-dialog').modal('hide')
                    show = false;
                } else {
                    $('.search-dialog').modal('show')
                    show = true;
                    $("#search-content").val("");
                    window.setTimeout("$('#search-content').focus();", 500);
                }
                time1 = 0;
            }
        } else if (e.keyCode == 27) {
            $('.search-dialog').modal('hide')
            show = false;
            time1 = 0;
        }
    });

    $("#search-content").keyup(function(e) {
        var time2 = new Date().getTime();
        if (window.event.keyCode == 17) {
            var gap = time2 - time1;
            time1 = time2;
            if (gap < 500) {
                if (show) {
                    $('.search-dialog').modal('hide');
                    show = false;
                } else {
                    $('.search-dialog').modal('show')
                    $("#search-content").val("");
                    window.setTimeout("$('#search-content').focus();", 500);
                    show = true;
                }
                time1 = 0;
            }
        }
    });

    $('#search-dialog').on('hidden.bs.modal', function(e) {
        show = false;
    })

    $(".search-btn").click(function() {
        $("#search-content").val("");
        /*$('#search-content').focus();*/
        window.setTimeout("$('#search-content').focus();", 500);
    });

    $.getJSON("/assets/search.json").done(function(data) {
        if (data.code == 0) {
            for (var index in data.data) {
                var item = data.data[index];
                names.push(item.title);
                urls.push(item.url);
            }

            $("#search-content").typeahead({
                source: names,

                afterSelect: function(item) {
                    $('.search-dialog').modal('hide')
                    show = false;
                    window.location.href = (urls[names.indexOf(item)]);
                    return item;
                }
            });
        }
    });
});
