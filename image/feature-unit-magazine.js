var issue_id = $('#issue_id').val();
var slider;
var gptAd = '';
var two_btns = '';
var user_sub_checked_for_flipbook = false;
var begin_free_html = '<span>BEGIN YOUR 30 DAY FREE TRIAL <i class="fa fa-long-arrow-right" aria-hidden="true" style="margin-left: 15px;margin-top: 1px;"></i></span>';
var current_product_id = 0;
var today = new Date();
var mag_subscription = '';

function attach_free_trial_btn() {
    $(document).find(".subscription_popup .content_wrapper .content .free_trial_html_box").html($(document).find('.preview_magazine_photoswipe.active')[0].outerHTML);
}
if (mag_subscription == 'subscribed') {
    user_sub_checked_for_flipbook = true;
}

var magGtmEventFrom = "";
var magGtmreqwall = "No";
var firstLastAccess = false;
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};
var magsubParam = cnGetURLParameter('magsub');
var photoswipe_obj;
var photoswipe_obj_paid;
var subscriptionStatus = false;
if (magsubParam === undefined) {} else {
    dataLayer.push({
        'event': 'eventMagazineHome',
        'eventCategory': 'VOGUE India Magazine Subscription Discovery',
        'eventAction': 'Subscription Link in ' + magsubParam
    });
}
$(document).on('click', '.featured_pages ul li', function() {
    gtmMagazineHomeSubscribe("Home Page", "Featured Story Click");
});

function directTo(obj) {
    var href = $(obj).attr('data-href');
    var magazine_data_sub = check_subcription_magazine_data();
    if ($('body').find('.featured_unit_clicked').length == 1) {
        $('.subscription_popup').fadeOut();
        //$('#flipbook').turn('page', img_ids[0]+1);
    } else if ($('body').find('#clicked_toc_li').length == 1 && magazine_data_sub == false) {
        $(document).find('.currently_reading').trigger('click');
    } else {
        window.location = href;
    }
}
$(document).on('click', '.title_above_cover', function() {
    $(document).find('.main_cover_image.active').trigger('click');
});

// GTM Tracking
$(document).on('click', '.more-plans-magazine', function() {
    gtmMagazineHomeSubscribe("Home Page", "More Button Click");
});
$(document).on('click', '.main_cover_image_wrap .already_login_txt a', function() {
    gtmMagazineHomeSubscribe("Home Page", "Login Button Click");
});
$(document).on('click', '.subscription_popup .already_login_txt a', function() {
    gtmMagazineHomeSubscribe(magGtmEventFrom + " Page", "Login Button Click");
});
$(document).on('click', '.subscribe_part .content_btns', function() {
    gtmMagazineHomeSubscribe("Home Page - " + $(this).data("price"), "Subscribe Button Click");
});
$(document).on('click', '.subscribe_part .content_btns .button', function() {
    gtmPrintPlusDigital();
});
$(document).on('click', '.subscribe_part .content_btns .button2', function() {
    gtmDigital();
});
$(document).on('click', '.magazine_issues_wrapper .subscription_popup .content_btns', function() {
    gtmMagazineHomeSubscribe("PopUp Page - " + $(this).data("price") + " - " + magGtmEventFrom, "Subscribe Button Click");
});

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
    $('html,body').css('height', $(window).height());
    $('html,body').css('overflow', 'hidden');
}

function enableScroll() {
    // console.log('enabled')
    if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
    $('html,body').css('height', 'auto');
    $('html,body').css('overflow', 'initial');
}
if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler() {
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null) {
        var stat = document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement;
        if (stat != true) {
            $('#zoom_screen').removeClass('active');
            $('.magazine_issues_wrapper').removeClass('full_screen');
            $('.mainHeader').show();
            $('.topadbnr').show();
            enableScroll();
            $('body').css('padding-top', body_pt + 'px');
        }
    }
}
// mozfullscreenerror event handler
function errorHandler() {}
document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);
var body_pt;

function enable_fullScreen() {
    //    if (document.documentElement.requestFullscreen) {
    //        document.documentElement.requestFullscreen();
    //    } else if (document.documentElement.mozRequestFullScreen) {
    //        document.documentElement.mozRequestFullScreen();
    //    } else if (document.documentElement.webkitRequestFullscreen) {
    //        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    //    }
    $('#zoom_screen').addClass('active');
    $('.magazine_issues_wrapper').parents('#magazine_issues_unit').addClass('full_screen_unit');
    $('.magazine_issues_wrapper').addClass('full_screen');
    resize_flipbook();
    $('.mainHeader').hide();
    $('.topadbnr').hide();
    setTimeout(function() {
        $('body').css('padding-top', '0px');
        disableScroll();
    }, 700);
}

function disable_fullScreen() {
    //    if (document.cancelFullScreen) {
    //        document.cancelFullScreen();
    //    } else if (document.mozCancelFullScreen) {
    //        document.mozCancelFullScreen();
    //    } else if (document.webkitCancelFullScreen) {
    //        document.webkitCancelFullScreen();
    //    }
    $('#zoom_screen').removeClass('active');
    $('.magazine_issues_wrapper').parents('#magazine_issues_unit').removeClass('full_screen_unit');
    $('.magazine_issues_wrapper').removeClass('full_screen');
    $('.mainHeader').show();
    $('.topadbnr').show();
    enableScroll();
    onloadAjax.initCommonOnLoadResize();
    resize_flipbook();
}
// toggle full screen
function toggleFullScreen() {
    var toggle = false;
    // Set focus
    setTimeout('window.focus()', 1000);
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        enable_fullScreen();
        toggle = true;
    } else {
        disable_fullScreen();
        toggle = false;
    }
    window.addEventListener('resize', resize);
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
        // e.stopPropagation();
    });

    function loadApp() {
        var size = getSize();
    }

    function getSize() {
        var width = $(document).find('.flipbook_wrapper').width();
        var height = $(document).find('.flipbook_wrapper').height();
        return {
            width: width,
            height: height
        }
    }

    function resize() {
        if (toggle == false) {
            $('#flipbook').css('opacity', 0);
            setTimeout(function() {
                var size = getSize();
                $('#flipbook').turn('size', size.width, size.height);
                $('#flipbook').css('opacity', 1);
            }, 1000);
        } else {
            resize_flipbook();
        }
    }
    // Load App
    loadApp();
}

function resize_flipbook() {
    $('#flipbook').css('opacity', 0);
    setTimeout(function() {
        var window_height = $(window).height();
        var max_width_flipbook = window_height * 1.55;
        $('#flipbook').css('max-width', max_width_flipbook);
        // $('#flipbook').turn('size', max_width_flipbook, window_height);
        $('#flipbook').css('opacity', 1);
    }, 400);
}

function load_archives() {
    loader_wrap(true);
    $.ajax({
        url: action_url + '?action=load_list_of_issues',
        type: 'POST',
    }).done(function(html) {
        $('#archive').html(html);
        var laitems = 2
        if (isCnMobile) {
            laitems = 2;
            $('.magazine_issues_carousel').owlCarousel({
                items: laitems,
                mergeFit: true,
                autoWidth: false,
                nav: true,
                responsiveClass: true,
                mouseDrag: false,
                touchDrag: true
            });
        }
        loader_wrap(false);
    });
}

function magazine_pages_carousel(event) {
    var index = event.item.index + 1;
    var stat = false;
    $('.magazine_issues_carousel_pages').find('.owl-item:nth-child(' + index + ') .item_owl a').each(function() {
        var img_obj = $(this).find('.issue_thumb');
        var img_src = img_obj.data('src');
        lazy_load_img(img_src, $(this).find('img'));
    })
}

function load_magazine_pages(obj) {
    loader_wrap(true);
    var issue_id = obj.data('issue-id');
    $.ajax({
        url: action_url + '?action=load_list_of_issue_pages',
        type: 'POST',
        data: {
            "issue_id": issue_id
        }
    }).done(function(html) {
        $('#archive').html(html);
        $('.magazine_issues_carousel_pages').owlCarousel({
            items: 1,
            center: true,
            mergeFit: true,
            nav: true,
            responsiveClass: true,
            onInitialized: function(event) {
                magazine_pages_carousel(event);
            }
        });
        $('.magazine_issues_carousel_pages').on('changed.owl.carousel', function(event) {
            magazine_pages_carousel(event);
        })
        var archive_height = $('#archive').height();
        var item_margin_top = (archive_height - $('.magazine_issues_carousel_pages .owl-item').height()) / 2;
        $('.magazine_issues_carousel_pages .owl-item').css('margin-top', item_margin_top);
        loader_wrap(false);
        // list of magazines
    });
}

function enableZoom() {
    var curr_page = $("#flipbook").turn("page");
    $('.zoomContainer').remove();
    $('#flip_page_' + curr_page).elevateZoom({
        zoomType: "inner",
        cursor: "crosshair"
    });
    $(document).find('.body_appended_zoom.active').remove();
    if ($(document).find('#zoom_screen_2').length == 0) {
        $('.flipbook_wrapper').append('<a href="javascript:void(0)" id="zoom_screen_2"></a>');
    }
    $('#zoom_screen_2').removeClass('active');
}

function lazy_load_img(img_src, img_obj) {
    var img = new Image();
    img.src = img_src;
    if (img.width > 0 || img.height > 0) {
        if ($('#currently_reading_clicked').length == 1) {
            img_obj.css('opacity', '0');
            img.onload = function() {
                img_obj.attr('src', img.src);
                img_obj.css('opacity', '1');
            }
        } else {
            img_obj.attr('src', img.src);
            img_obj.css('opacity', '1');
        }
    } else {
        img_obj.css('opacity', '0');
        img.onload = function() {
            img_obj.attr('src', img.src);
            img_obj.css('opacity', '1');
        }
    }
}

function zoom_flipbook() {
    if (isCnMobile) enableZoom();
}

function flipbook_page_load(page) {
    console.log(page)
    var current_page = page;
    var previous_page = page - 1;
    if (page % 2 == 0) {
        //even
        current_page = page;
        previous_page = page + 1;
        var WsAttr = $('#flipbook .p' + current_page + ' .web_story_wrap a').attr('href');
        if (typeof WsAttr !== typeof undefined && WsAttr !== false) {
            gtmMagazineFlipbook(isssueName, current_page, magGtmreqwall);
        } else {
            gtmMagazineFlipbook(isssueName, previous_page, magGtmreqwall);
        }
        var WsAttr = $('#flipbook .p' + previous_page + ' .web_story_wrap a').attr('href');
        if (typeof WsAttr !== typeof undefined && WsAttr !== false) {
            gtmMagazineFlipbook(isssueName, current_page, magGtmreqwall);
        } else {
            gtmMagazineFlipbook(isssueName, previous_page, magGtmreqwall);
        }
        var issue_id = $('#issue_id').val();
        if (is_featured_block(page) == true) {} else {}
    }
    var img_src = $('#flip_page_' + current_page).data('src');
    var img_src_1 = $('#flip_page_' + previous_page).data('src');
    if (typeof img_src !== "undefined") {
        lazy_load_img(img_src, $('#flip_page_' + current_page));
    }
    if (typeof img_src_1 !== "undefined") {
        lazy_load_img(img_src_1, $('#flip_page_' + previous_page));
    }
    /* main_cover_img_carousel */
    // check_if_embed($('.flipbook_wrapper .p' + current_page));
    //  check_if_embed($('.flipbook_wrapper .p' + current_page));
    img_sequence('.flipbook_wrapper .p' + current_page);
    img_sequence('.flipbook_wrapper .p' + previous_page);
    /* ends main_cover_img_carousel */
}

function magazine_active(stat) {
    if (stat == true) {
        $('.posts_list_wrapper').addClass('magazine_displayed');
        $('#magazine_issues_unit #preview').addClass('magazine_displayed_2');
    } else {
        $('.posts_list_wrapper').removeClass('magazine_displayed');
        $('#magazine_issues_unit #preview').removeClass('magazine_displayed_2');
    }
}

function goto_first_module() {
    $('#magazine_issues_unit #preview>.row .div_1').addClass('active');
    $('#magazine_issues_unit #preview>.row .div_2').removeClass('active');
    $('.posts_list_wrapper').removeClass('magazine_displayed');
    $('.feature_unit_title').removeClass('currently_reading');
    $('.feature_unit_title').find('.title_pre').remove();
    $('.magazine_issues_wrapper').removeClass('full_screen');
}

function goto_second_module() {
    $('#magazine_issues_unit #preview>.row .div_2').addClass('active');
    $('#magazine_issues_unit #preview>.row .div_1').removeClass('active');
    $('.posts_list_wrapper').addClass('magazine_displayed');
    $('.feature_unit_title').addClass('currently_reading');
}

function if_featured() {
    return featured_img_ids;
}

function is_featured_block(pageno) {
    var ids = featured_img_ids;
    var id_count = ids.indexOf(pageno);
    if (id_count >= 0) {
        return true;
    } else {
        return false;
    }
}

function check_subcription_magazine_data() {
    var magazine_sub_status = mag_subscription;
    if (magazine_sub_status == 'subscribed') {
        subscribed = true;
    } else {
        subscribed = false;
    }
    return subscribed;
}

function subcription_magazine_data() {
    var magazine_data = Cookies.get('mag_data');
    if (magazine_data === undefined) {
        subscribed = false;
    } else {
        magazine_data = JSON.parse(magazine_data);
        var subs_type = magazine_data['type'];
        var subs_issue_id = magazine_data['issue_id'];
        var current_magazine_id = $('#issue_id').val();
        var subscribed = false;
        if (current_magazine_id == subs_issue_id && (subs_type == 'monthly' || subs_type == 'yearly')) {
            subscribed = true;
        }
    }
    return subscribed;
}

function show_flipbook(issue_id, show_flipbook = '') {

    loader_wrap(true);
    // console.log(show_flipbook + ' show_flipbook')
    append_preview_txt(false);
    prepend_flip_txt(true);
    var status = $('#check_status').val();
    var show_flipbook_data = show_flipbook;
    if ($('#clicked_toc_li').length == 0 && $('body').find('.featured_unit_clicked').length < 0) {

        if (check_hash() != true) {
            if (user_sub_checked_for_flipbook == false) {
                if (is_featured_block(show_flipbook_data) == false) {
                    $(".subscription_popup").fadeIn();
                }
                gtmMagazineHomeSubscribe("PopUp Page  - " + magGtmEventFrom, "Subscribe Button Impressions");
                if (show_flipbook % 2 != 0) {
                    show_flipbook = show_flipbook + 1;
                    show_flipbook_data = show_flipbook;
                }
            } else {
                if (show_flipbook % 2 != 0) {
                    show_flipbook = show_flipbook + 1;
                }
            }
        }

        /*$.ajax({
            url: action_url + '?action=check_user_subscription_ajax',
            type: 'POST',
            async: false,
            data: {
                "issue_id": issue_id
            },
            success: function(data) {
                if (check_hash() != true) {
                    if (data == false || data == '' || data == 0) {
                        if (is_featured_block(show_flipbook_data) == false) {
                            $(".subscription_popup").fadeIn();
                        }
                        gtmMagazineHomeSubscribe("PopUp Page  - " + magGtmEventFrom, "Subscribe Button Impressions");
                        if (show_flipbook % 2 != 0) {
                            show_flipbook = show_flipbook + 1;
                            show_flipbook_data = show_flipbook;
                        }
                    } else {
                        if (show_flipbook % 2 != 0) {
                            show_flipbook = show_flipbook + 1;
                        }
                    }
                }
            },
            error: function(error) {
                // console.log(error)
            }
        });*/
        console.log(' flip 1')
    } else if ($('body').find('.featured_unit_clicked').length == 1) {
        console.log(' flip 2')
        if (show_flipbook % 2 != 0) {
            show_flipbook = show_flipbook + 1;
            show_flipbook_data = show_flipbook;
        }
    } else {}
    var subscribed = false;
    ///////////////////////////////////////
    if ($('body').find('.featured_unit_clicked').length == 1 && getCookie('radius_login_id') == '' && mag_subscription != 'subscribed') {
        $.ajax({
            url: action_url + '?action=load_free_flipbook',
            type: 'POST',
            // async: false,
            data: {
                "issue_id": issue_id,
                "show_flipbook_data": show_flipbook_data
            },
            success: function(data, status) {
                // console.log(data);
                loader_wrap(false);
                $('#check_status').val('true');
                highlight_article(show_flipbook);
                $(document).find('.tab-pane').each(function() {
                    var obj = $(this);
                    if (obj.hasClass('active')) {
                        if (obj.attr('id') == 'archive') {
                            $('#archive').removeClass('active');
                            $('#preview').addClass('active');
                        }
                    }
                })
                $('.flipbook_wrapper').find('#flipbook').remove();
                $('.flipbook_wrapper').prepend('<div id="flipbook"></div>');
                $('#flipbook').html(data.html);
                $('.left_wrap .div_1').removeClass('active');
                $('.left_wrap .div_2').addClass('active');
                $('#flipbook').css('opacity', '0');
                setTimeout(function() {
                    var display_var = 'double';
                    if (isCnMobile) display_var = 'single';
                    $('#flipbook').turn({
                        gradients: true,
                        autoCenter: true,
                        zoom: false,
                        display: display_var,
                        page: show_flipbook,
                        when: {
                            turning: function(e, page, view) {
                                var pageno = window.location.hash.substr(1);
                                var pagehash = pageno.split('-')[0];
                                pageno = pageno.split('-')[1];
                                var issue_id = $('#issue_id').val();
                            },
                            turned: function(e, page) {
                                flipbook_page_load(page);
                                mag_embed_opacity((page + 1), 1);
                                // console.log(page + ' page -')
                            }
                        }
                    });
                    $('#flipbook').css('opacity', '1');
                }, 1000);
                magazine_active(true);
            },
            error: function(error) {
                // console.log(error)
            }
        }).done(function(html) {});
    } else {
        //update_magazine_access_time();
        if (isCnMobile) {} else {
            $.ajax({
                url: action_url + '?action=load_flipbook',
                type: 'POST',
                //async: false,
                data: {
                    "issue_id": issue_id,
                    "show_flipbook_data": show_flipbook_data,
                    "subscription_status": mag_subscription
                },
                success: function(data, status) {
                    // console.log(data);
                    loader_wrap(false);
                    $('#check_status').val('true');
                    highlight_article(show_flipbook);
                    $(document).find('.tab-pane').each(function() {
                        var obj = $(this);
                        if (obj.hasClass('active')) {
                            if (obj.attr('id') == 'archive') {
                                $('#archive').removeClass('active');
                                $('#preview').addClass('active');
                            }
                        }
                    })
                    $('.flipbook_wrapper').find('#flipbook').remove();
                    $('.flipbook_wrapper').prepend('<div id="flipbook"></div>');
                    $('#flipbook').html(data.html);
                    $('.left_wrap .div_1').removeClass('active');
                    $('.left_wrap .div_2').addClass('active');
                    $('#flipbook').css('opacity', '0');
                    // setTimeout(function() {
                        var display_var = 'double';
                        if (isCnMobile) display_var = 'single';
                        $('#flipbook').turn({
                            gradients: true,
                            autoCenter: true,
                            zoom: false,
                            elevation: 130,
                            display: display_var,
                            page: show_flipbook,
                            when: {
                                turning: function(e, page, view) {
                                    var pageno = window.location.hash.substr(1);
                                    var pagehash = pageno.split('-')[0];
                                    pageno = pageno.split('-')[1];
                                    var issue_id = $('#issue_id').val();
                                    //var magazine_data_sub = check_subcription_magazine_data();
                                    if (mag_subscription == "subscribed") {
                                        subscribed = true;
                                    }
                                    if (subscribed == false) {
                                        var magazine_data_sub = check_subcription_magazine_data();
                                        if (is_featured_block(pageno) == false) {
                                            $(".subscription_popup").fadeIn();
                                        }
                                        activeZoom(false);
                                        /*$.ajax({
                                            url: action_url + '?action=check_user_subscription_ajax',
                                            type: 'POST',
                                            async: false,
                                            data: {
                                                "issue_id": issue_id
                                            },
                                            success: function(data) {
                                                if (data == false || data == 0) {
                                                    if (is_featured_block(pageno) == false) {
                                                        $(".subscription_popup").fadeIn();
                                                    }
                                                    activeZoom(false);
                                                } else {
                                                    subscribed = true;
                                                }
                                            }
                                        });*/
                                        if (magazine_data_sub == true) {
                                            subscribed = true;
                                        } else {
                                            if (is_featured_block(pageno) == false) {
                                                $(".subscription_popup").fadeIn();
                                            }
                                            activeZoom(false);
                                            /*$.ajax({
                                                url: action_url + '?action=check_user_subscription_ajax',
                                                type: 'POST',
                                                async: false,
                                                data: {
                                                    "issue_id": issue_id
                                                },
                                                success: function(data) {
                                                    if (data == false || data == 0) {
                                                        if (is_featured_block(pageno) == false) {
                                                            $(".subscription_popup").fadeIn();
                                                        }
                                                        activeZoom(false);
                                                    } else {
                                                        subscribed = true;
                                                    }
                                                }
                                            });*/
                                        }
                                    }
                                    console.log(page + ' page')
                                    flipbook_page_load(page);
                                },
                                turned: function(e, page) {
                                    flipbook_page_load(page);
                                    // console.log(page + ' page -')
                                }
                            }
                        });
                        $('#flipbook').css('opacity', '1');
                    // }, 1000);
                    magazine_active(true);
                },
                error: function(error) {
                    // console.log(error)
                }
            }).done(function(html) {});
        }
    }
    // console.log($('#check_status').val() + ' : status 1 ')
    return $('#check_status').val();
}

function loader_wrap(status) {
    if (status == true) {
        $(document).find('.loader_wrap').addClass('active');
    } else {
        $(document).find('.loader_wrap').removeClass('active');
    }
}
$(document).on('click', ".flip_img", function(e) {
    $(document).find('.zoomContainer').attr('style', 'z-index:88888');
})
$(document).on('click', "#open_right_toc", function(e) {
    $(document).find('.zoomContainer').css('z-index', '888');
})

function enable_zoom(stat) {
    if (stat == true) {
        if ($(".zoomContainer").css("z-index") > 888) {
            $(".zoomContainer").css("z-index", "888");
            $(document).find('.body_appended_zoom.active').remove();
            $('.flipbook_wrapper').append('<a href="javascript:void(0)" id="zoom_screen_2"></a>');
            $(document).find('#zoom_screen_2').removeClass('active');
        } else {
            zoom_flipbook();
            var i = 0;
            var my = setInterval(function() {
                i++;
                activeZoom(true);
                if (i == 2) {
                    clearInterval(my);
                }
                $('.flipbook_wrapper').find('#zoom_screen_2').remove();
                $('body').append('<a href="javascript:void(0)" id="zoom_screen_2" class="body_appended_zoom active"></a>');
                $(document).find('#zoom_screen_2').addClass('active');
            }, 10);
        }
    } else {
        $(".zoomContainer").remove();
        $(document).find('.body_appended_zoom.active').remove();
        $('.flipbook_wrapper').append('<a href="javascript:void(0)" id="zoom_screen_2"></a>');
        $(document).find('#zoom_screen_2').removeClass('active');
    }
}
if (isCnMobile) {
    $(document).on('click', "#zoom_screen_2", function(e) {
        //enable_zoom(true);
        var page_no = $(document).find('#flipbook').turn("page");
        var src = $(document).find('#flipbook .page.p' + page_no + ' .click_to_zoom').data('src');
        load_swipe(src);
    });
    $(document).on('click', ".pswp__button--close", function(e) {
        $('#zoom_screen_2').removeClass('active');
    });
}

function append_preview_txt(stat) {
    if ($('.title_pre').length > 0) {
        $('.title_pre').remove();
        $('.feature_unit_title').removeClass('currently_reading');
    }
    if (stat == true) {
        $('.feature_unit_title').append('<span class="title_pre"> - Preview</span>');
        $('.feature_unit_title').removeClass('currently_reading');
    }
}

function prepend_flip_txt(stat) {
    if ($('.title_pre').length > 0) {
        $('.title_pre').remove();
        $('.feature_unit_title').removeClass('currently_reading');
    }
    if (stat == true) {
        $('.feature_unit_title').prepend('<span class="title_pre">Currently Reading - </span>');
        $('.feature_unit_title').append('<span class="title_pre">Issue</span>');
        $('.feature_unit_title').addClass('currently_reading');
    }
}
var called = 0;

function stop_video() {
    var video = $("#cover_video").attr("src");
    video = video.replace("&autoplay=1", "&autoplay=0");
    $("#cover_video").attr("src", "");
    $("#cover_video").attr("src", video);
}
$(document).on('click', ".currently_reading", function(e) {
    //    var href = window.location.href;
    //
    //    if ($('#template_magazine_page').length == 1 || href.includes('/magazine') == true) {
    //        location.reload();
    //    } else {
    //        window.location.href = 'https://www.vogue.in/magazine/';
    //    }
    if ($('#currently_reading_clicked').length == 0) {
        $('body').append('<input type="hidden" id="currently_reading_clicked" >');
    }
    $('.subscription_popup').fadeOut();
    goto_first_module();
})
var sub_checked = false;
$(document).on('click', ".close_flipbook.full_screen_unit_in_close", function(e) {
    $(document).find('.loader_wrap').removeClass('active');
    $(document).find('.subscription_popup').fadeOut();
})
$(document).on('click', ".posts_list li a", function(e) {
    e.preventDefault();
    var status = $('#check_status').val();
    loader_wrap(true);
    magGtmEventFrom = "Index";
    gtmIndex(isssueName, $(this).data('page'));
    var issue_id = $(this).data('issue-id');
    var turn_page_id = $(this).data('index');
    $('.posts_list li a').removeClass('active');
    $('.magazine_issues_wrapper').parents('#magazine_issues_unit').addClass('full_screen_unit_in');
    enable_fullScreen();
    $(this).addClass('active');
    // stop_video();
    if ($('#clicked_toc_li').length == 0) {
        $('body').append('<input type="hidden" id="clicked_toc_li">');
    }
    var issue_id = $('#issue_id').val();
    if (called == 0) {
        var temp = 0;
        $('.posts_list li').each(function() {
            if ($(this).find('a').hasClass('active')) {
                temp++;
            }
        })
        if (temp > 0) {
            var magazine_data_sub = check_subcription_magazine_data();
            if (magazine_data_sub == true) {
                sub_checked = true;
                //fix for 0
                if(turn_page_id < 2) turn_page_id = 2;
                
                if (turn_page_id % 2 != 0) {
                    show_flipbook(issue_id, (turn_page_id - 1));
                } else {
                    show_flipbook(issue_id, turn_page_id);
                }
            } else {
                if (user_sub_checked_for_flipbook == false) {
                    $(".subscription_popup").fadeIn();
                    gtmMagazineHomeSubscribe("PopUp Page  - " + magGtmEventFrom, "Subscribe Button Impressions");
                    if (turn_page_id % 2 != 0) {
                        //turn_page_id = turn_page_id - 1;
                        show_flipbook(issue_id, (turn_page_id - 1));
                    } else {
                        show_flipbook(issue_id, turn_page_id);
                    }
                } else {
                    sub_checked = true;
                    if (turn_page_id % 2 != 0) {
                        //turn_page_id = turn_page_id - 1;
                        show_flipbook(issue_id, (turn_page_id - 1));
                    } else {
                        show_flipbook(issue_id, turn_page_id);
                    }
                }
                /*$.ajax({
                    url: action_url + '?action=check_user_subscription_ajax',
                    type: 'POST',
                    async: false,
                    data: {
                        "issue_id": issue_id
                    },
                    success: function(data) {
                        if (data == false || data == 0) {
                            $(".subscription_popup").fadeIn();
                            gtmMagazineHomeSubscribe("PopUp Page  - " + magGtmEventFrom, "Subscribe Button Impressions");
                            if (turn_page_id % 2 != 0) {
                                //turn_page_id = turn_page_id - 1;
                                show_flipbook(issue_id, (turn_page_id - 1));
                            } else {
                                show_flipbook(issue_id, turn_page_id);
                            }
                        } else {
                            sub_checked = true;
                            if (turn_page_id % 2 != 0) {
                                //turn_page_id = turn_page_id - 1;
                                show_flipbook(issue_id, (turn_page_id - 1));
                            } else {
                                show_flipbook(issue_id, turn_page_id);
                            }
                        }
                    }
                });*/
            }
        } else {
            status = show_flipbook(issue_id, turn_page_id);
        }
    } else {
        if (sub_checked == true) {
            if (status == 'true' || status == true) {
                $(document).find('#flipbook').turn("page", turn_page_id);
                loader_wrap(false);
            }
        } else {
            if (user_sub_checked_for_flipbook == false) {
                $(".subscription_popup").fadeIn();
                gtmMagazineHomeSubscribe("PopUp Page  - " + magGtmEventFrom, "Subscribe Button Impressions");
                activeZoom(false);
            } else {
                if (status == 'true' || status == true) {
                    $(document).find('#flipbook').turn("page", turn_page_id);
                    loader_wrap(false);
                }
            }
            /*$.ajax({
                url: action_url + '?action=check_user_subscription_ajax',
                type: 'POST',
                async: false,
                data: {
                    "issue_id": issue_id
                },
                success: function(data) {
                    // console.log(data + ' data else <- ');
                    if (data == false || data == 0) {
                        $(".subscription_popup").fadeIn();
                        gtmMagazineHomeSubscribe("PopUp Page  - " + magGtmEventFrom, "Subscribe Button Impressions");
                        activeZoom(false);
                    } else {
                        if (status == 'true' || status == true) {
                            $(document).find('#flipbook').turn("page", turn_page_id);
                            loader_wrap(false);
                        }
                    }
                }
            });*/
        }
    }
    called++;
    if (isCnMobile) {
        if ($(this).parents('.posts_list_wrapper').hasClass('active')) {
            $(this).parents('.posts_list_wrapper').removeClass('active');
        }
    }
});
//var status_2 = '';
var status_2 = $('#check_status').val();
var called_2 = 0;
$(document).on('click', "#preview_btn", function(e) {
    magGtmEventFrom = "Preview";
    gtmTopbarPreview(isssueName);
    e.preventDefault();
    $(".feature_unit_title, #open_right_toc, .index_txt").attr('style', 'display: block!important');
    //$('#archive_btn').trigger('click');
    $('#preview').removeClass('active');
    $('#archive').addClass('active');
    append_preview_txt(true);
    if (isCnMobile) {
        show_flipbook(isssueId, 1);
    } else {
        called_2 = 0;
        load_magazine_pages($(this));
    }
});
$(document).on('click', "#open_right_toc", function(e) {
    e.preventDefault();
    if ($(document).find('.posts_list_wrapper').hasClass('active')) {
        $(document).find('.posts_list_wrapper').removeClass('active');
    } else {
        $(document).find('.posts_list_wrapper').addClass('active');
    }
});
$(document).on('click', ".main_cover_image", function(e) {
    e.preventDefault();
    magGtmEventFrom = "Feature Unit";
    if ($('.preview_magazine_photoswipe').hasClass('active')) {
        $('.preview_magazine_photoswipe').trigger('click');
    } else {
        gtmMain_cover_image();
        if (isCnMobile == false) {
            show_flipbook(isssueId, 2);
            toggleFullScreen();
        }
    }
});
$(document).on('click', "#magazine_issues_unit #archive .item .list_a img", function(e) {});
$(document).on('click', "#magazine_issues_unit .list_page", function(e) {
    e.preventDefault();
    var issue_id = $(this).data('issue-id');
    var issue_page_id = $(this).data('page-id');
    var pageindex = $(this).data('index');
    gtmPreview_page(pageindex);
    var turn_page_id = $(this).data('index') + 1;
    if (called_2 == 0 || called_2 == '0') {
        $('#check_status').val(false);
        status_2 = show_flipbook(issue_id, turn_page_id);
    } else {
        if (status_2 == 'true' || status_2 == true) {
            $(document).find('#flipbook').turn("page", turn_page_id);
        }
    }
    append_preview_txt(false);
    prepend_flip_txt(true);
    called_2++;
});
$(document).on('change', ".profile_menu_2", function() {
    location.href = $(this).val();
});
var called_3 = 0;

function call_flipbook_frm_url(pageno) {
    var pagehash = pageno.split('-')[0];
    pageno = pageno.split('-')[1];
    if (pagehash == 'page') {
        var obj = $('.featured_pages_ul li[data-index="' + pageno + '"]');
        if (obj.length == 1) {
            window.history.pushState("", document.title, window.location.pathname);
            obj.trigger('click');
        } else {
            var issue_id = $(document).find(".posts_list li[data-index='" + pageno + "'] a").data('issue-id');
            var turn_page_id = pageno;
            show_flipbook(issue_id, turn_page_id);
        }
    }
}

function load_photoswipe_freebook_in(issue_id, obj_dp) {
    $.ajax({
        url: action_url + '?action=free_photoswipe_flipbook',
        type: 'POST',
        //async: false,
        data: {
            "issue_id": issue_id
        },
        success: function(data) {
            data = JSON.parse(data);
            var last_htm = '';
            setTimeout(function() {
                var myVar = setInterval(function() {
                    if ($('#two_btns').val() != '') {
                        var btn_html = '<strong><div class="subscribe_part"><div class="sub_common">' + $('#two_btns').val() + '</div>\n\
                                        <div class="common_div_bottom_subscription">' + $('.common_div_bottom_subscription').html() + '</div></strong>';
                        last_htm = '<div class="subscription_popup free_preview_last_screen">' + $('.subscription_popup').html() + '</div>';
                        data.push({
                            html: last_htm
                        });
                        clearInterval(myVar);
                        if ($('.photoswipe_flipbook .pswp__caption .subscribe_part').length == 0) {
                            $('.photoswipe_flipbook .pswp__caption').append(btn_html);
                        }
                    }
                }, 100);
            }, 1000);
            load_photoswipe_flipbook(data, obj_dp);
        }
    });
}

function load_photoswipe_freebook(obj) {
    var issue_id = obj.data('issue-id');
    var obj_dp = 1;
    try {
        obj_dp = obj.attr('data-page-index') - 1;
    } catch (err) {}
    if (obj_dp == undefined || obj_dp == 'undefined' || isNaN(obj_dp) == true) {
        obj_dp = 0;
    }
    load_photoswipe_freebook_in(issue_id, obj_dp);
}
$(document).on('click', ".mobile_featured_li .owl_2_img", function(e) {
    magGtmEventFrom = "Free Preview";
    $(document).find('.loader_wrap').addClass('active');
    var obj = $(this);
    if ($('.preview_magazine_photoswipe').hasClass('active') && mag_subscription != 'subscribed') {
        if (isCnMobile) {
            //            var src = obj.attr('data-hires');
            //            var obj_dp = obj.attr('data-page-index') - 1;
            //            $('.preview_magazine_photoswipe').trigger('click');
            //            $(document).find('.pswp').css('opacity', 0);
            //            setTimeout(function () {
            //                photoswipe_obj.goTo(obj_dp);
            //                $(document).find('.pswp').css('opacity', 1);
            //            }, 150);
            // stop_video();
            load_photoswipe_freebook(obj);
        }
    } else {
        var status = $('#check_status').val();
        e.preventDefault();
        // stop_video();
        var issue_id = obj.data('issue-id');
        var turn_page_id = obj.data('index');
        var obj_dp = obj.attr('data-index');
        //   loader_wrap(true);
        $.ajax({
            url: action_url + '?action=photoswipe_flipbook',
            type: 'POST',
            //async: false,
            data: {
                "issue_id": issue_id
            },
            success: function(data) {
                data = JSON.parse(data);
                load_photoswipe_flipbook(data, obj_dp);
            }
        });
        called_3++;
    }
})
$(document).on('click', ".featured_pages_ul li", function(e) {
    //show_flipbook();
    magGtmEventFrom = "Free Preview";
    var obj = $(this);
    if ($('body').find('.featured_unit_clicked').length == 0) {
        $('body').append('<input type="hidden" class="featured_unit_clicked" value="true">');
    } //
    var status = $('#check_status').val();
    e.preventDefault();
    loader_wrap(true);
    // stop_video();
    var issue_id = $(this).data('issue-id');
    var turn_page_id = $(this).data('index');
    if ($('.preview_magazine_photoswipe.active').length >= 1 || mag_subscription != 'subscribed') {
        // if free preview
        turn_page_id = obj.index() + 1;
    }
    if ($('body').find('#clicked_toc_li').length == 1) {
        called = 0;
    }
    if (called == 0) {
        status = show_flipbook(issue_id, turn_page_id);
    } else {
        if (status == 'true' || status == true) {
            $(document).find('#flipbook').turn("page", turn_page_id);
            loader_wrap(false);
        }
    }
    called_3++;
    if (!isCnMobile) {
        toggleFullScreen();
    }
    //goto_second_module();
    //$('.subscription_popup').hide()
});

function check_hash() {
    var pageno = window.location.hash.substr(1);
    var pagehash = pageno.split('-')[0];
    pageno = pageno.split('-')[1];
    if (pagehash == 'page') {
        return true;
    }
}
var appended = 0;

function activeZoom(stat) {
    if (stat == true) {
        appended++;
        var flipbook = $("#flipbook");
        var offset = flipbook.offset();
        var left = offset.left;
        var top = offset.top;
        if (appended == 1) {
            $(document).find('body').append('<style> .zoomContainer { top: ' + top + 'px!important  }</style>');
        }
        $(document).find('.zoomContainer').attr('style', 'z-index:88888; ');
        $(document).find('.zoomWindowContainer>div').show();
    } else {
        $(document).find('.zoomContainer').attr('style', 'z-index:888');
        $(document).find('.zoomWindowContainer>div').hide();
    }
}

function check_hash_pop() {
    var pageno = window.location.hash.substr(1);
    var pagehash = pageno.split('-')[0];
    pageno = pageno.split('-')[1];
    if (pagehash == 'page') {

        if (user_sub_checked_for_flipbook == false) {
            if (is_featured_block(pageno) == false) {
                $(".subscription_popup").fadeIn();
            }
            activeZoom(false);
        }
        // console.log('here ')
        /*var issue_id = $('#issue_id').val();
        $.ajax({
            url: action_url + '?action=check_user_subscription_ajax',
            type: 'POST',
            async: false,
            data: {
                "issue_id": issue_id
            },
            success: function(data) {
                if (data == false || data == 0) {
                    if (is_featured_block(pageno) == false) {
                        $(".subscription_popup").fadeIn();
                    }
                    activeZoom(false);
                }
            }
        });*/
    }
}

function turn_page_flipbook(direction) {
    $('#flipbook').turn(direction);
    var page = $('#flipbook').turn('page');
    highlight_article(page);
    //  loader before embed
    $('#flipbook .p' + (page - 1) + ' .magazine-embed').css('opacity', 0);
    $('#flipbook .p' + page + ' .magazine-embed').css('opacity', 0);
    $('#flipbook .p' + (page + 1) + ' .magazine-embed').css('opacity', 0);
    //pinterest_embed(page);
}
$(document).on('click', '.next_btn.flipbook', function() {
    var eventLabelTitle = isssueName;
    gtmMagazineArrows(eventLabelTitle, "Right Arrow");
    var pageno = window.location.hash.substr(1);
    var pagehash = pageno.split('-')[0];
    pageno = pageno.split('-')[1];
    var issue_id = $('#issue_id').val();
    if ($('.preview_magazine_photoswipe.active').length >= 1 || mag_subscription != 'subscribed') {
        // if free preview
        featured_img_ids = [1, 2, 3, 4];
    }
    email = getCookie('radius_login_email');
    if ($('body').find('.featured_unit_clicked').length == 1 && email == '' && mag_subscription != 'subscribed') {
        var current_page = $("#flipbook").turn("page");
        var current_index = featured_img_ids.indexOf(current_page);
        if (current_index == -1) {
            current_index = 1;
        }
        var next_index = current_index + 1;
        var total_featured = $('.featured_pages_ul li').length;
        if (current_index == featured_img_ids[featured_img_ids.length - 1] || current_index == (total_featured - 1)) {
            next_page = featured_img_ids[0];
            $(".subscription_popup").fadeIn();
        } else {
            var next_page = featured_img_ids[next_index] + 1;
            $("#flipbook").turn("page", next_page);
            mag_embed_opacity(next_page, 1);
        }
    } else {
        if (pagehash == 'page') {
            //mag_subscription
            if (user_sub_checked_for_flipbook == false) {
                if (is_featured_block(pageno) == false) {
                    $(".subscription_popup").fadeIn();
                }
                activeZoom(false);
                /*$.ajax({
                    url: action_url + '?action=check_user_subscription_ajax',
                    type: 'POST',
                    async: false,
                    data: {
                        "issue_id": issue_id
                    },
                    success: function(data) {
                        if (data == false || data == 0) {
                            if (is_featured_block(pageno) == false) {
                                $(".subscription_popup").fadeIn();
                            }
                            activeZoom(false);
                        } else {
                            user_sub_checked_for_flipbook = true;
                            turn_page_flipbook('next');
                        }
                    }
                });*/
            } else {
                turn_page_flipbook('next');
            }
        } else {
            turn_page_flipbook('next');
        }
    }
    zoom_flipbook();
    //
    //    setTimeout(function(){
    //    (function(d, s, id){
    //        var js, pjs = d.getElementsByTagName(s)[0];
    //        if (d.getElementById(id)) {return;}
    //        js = d.createElement(s); js.id = id;
    //        js.src = "//assets.pinterest.com/sdk/sdk.js";
    //        pjs.parentNode.insertBefore(js, pjs);
    //    }(document, 'script', 'pinterest-jssdk'));
    //
    //    console.log('  here pin')
    //
    //    }, 3000);
})
$(document).on('click', '.prev_btn.flipbook', function() {
    var eventLabelTitle = isssueName;
    gtmMagazineArrows(eventLabelTitle, "Left Arrow");
    var pageno = window.location.hash.substr(1);
    var pagehash = pageno.split('-')[0];
    pageno = pageno.split('-')[1];
    var issue_id = $('#issue_id').val();
    if ($('.preview_magazine_photoswipe.active').length >= 1 || mag_subscription != 'subscribed') {
        // if free preview
        featured_img_ids = [1, 2, 3, 4];
    }
    // console.log(featured_img_ids + 'featured_img_ids')
    email = getCookie('radius_login_email');
    if ($('body').find('.featured_unit_clicked').length == 1 && email == '') {
        var current_page = $("#flipbook").turn("page") - 1;
        var current_index = featured_img_ids.indexOf(current_page);
        var prev_index = current_index - 2;
        if (current_index == 1 || current_index == 0) {
            //$(".subscription_popup").fadeIn();
            $('.currently_reading').trigger('click');
            disable_fullScreen();
        } else {
            var prev_page = featured_img_ids[prev_index] + 1;
            $("#flipbook").turn("page", prev_page);
            mag_embed_opacity(next_page, 1);
        }
    } else {
        if (pagehash == 'page') {
            if (user_sub_checked_for_flipbook == false) {
                if (is_featured_block(pageno) == false) {
                    $(".subscription_popup").fadeIn();
                }
                activeZoom(false);
                /*var issue_id = $('#issue_id').val();
                $.ajax({
                    url: action_url + '?action=check_user_subscription_ajax',
                    type: 'POST',
                    async: false,
                    data: {
                        "issue_id": issue_id
                    },
                    success: function(data) {
                        if (data == false || data == 0) {
                            if (is_featured_block(pageno) == false) {
                                $(".subscription_popup").fadeIn();
                            }
                            activeZoom(false);
                        } else {
                            turn_page_flipbook('previous');
                        }
                    }
                });*/
            } else {
                turn_page_flipbook('previous');
            }
        } else {
            turn_page_flipbook('previous');
        }
    }
    zoom_flipbook();
})
//$(document).on('click', '#archive_btn', function () {
//
//});
$(document).on('click', '#archive_btn', function() {
    // console.log(1)
    $('#archive_tab_li').addClass('active');
    gtmTopbarArchive();
    load_archives();
    $(".subscription_popup").fadeOut();
    activeZoom(true);
    $(".feature_unit_title, #open_right_toc, .index_txt").attr('style', 'display: none!important');
    $(document).find('#magazine_issues_unit #archive').addClass('active');
    $(document).find('#magazine_issues_unit #preview').removeClass('active');
});
$(document).on('click', '#archive_tab_li.active', function() {
    $('#archive_tab_li').removeClass('active');
    $(document).find('#magazine_issues_unit #archive').removeClass('active');
    $(document).find('#magazine_issues_unit #preview').addClass('active');
    $(".feature_unit_title, #open_right_toc").attr('style', 'display: block!important');
});
//$(document).on('click', '#archive_btn', function () {
//    var obj = $(this).parents('li');
//
//    if( $('#archive_tab_li').hasClass('active')){
//        alert(1);
//        $('#archive_tab_li').removeClass('active');
//        $(document).find('#magazine_issues_unit #archive').removeClass('active');
//        $(document).find('#magazine_issues_unit #preview').addClass('active');
//    }else{
//     alert(2);
//         $('#archive_tab_li').addClass('active');
//         gtmTopbarArchive();
//         load_archives();
//         $(".subscription_popup").fadeOut();
//         activeZoom(true);
//         $(".feature_unit_title, #open_right_toc, .index_txt").attr('style', 'display: none!important');
//         $(document).find('#magazine_issues_unit #archive').addClass('active');
//        $(document).find('#magazine_issues_unit #preview').removeClass('active');
//    }
//});
if (isCnMobile == false) {
    $(document).on('click', '#flipbook .click_to_zoom', function() {
        //        toggleFullScreen();
        //        var page_id = $(this).attr('data-id');
        //        page_id = page_id.replace("flip_page_", "");
        //        $(document).find('#flipbook').turn("page", page_id);
    });
}
$(document).on('click', '#youtube_play_img', function() {
    $(document).find('#youtube_cover_img').trigger('click');
});

function free_trial_product_id() {
    //get_trial_subscription_api_2_cn
    var data_json;
    $(document).find('.api2_free_trial span').text("Processing...");
    $.ajax({
        type: 'GET',
        url: "/wp-admin/admin-ajax.php",
        async: false,
        data: "action=get_trial_subscription_api_2_cn",
        success: function(data) {
            var product_id = data.product_id;
            var coupon_id = data.coupon_id;
            var campaign_slug = data.guid;
            var referrer = encodeURIComponent(document.referrer);
            var email = Cookies.get('radius_login_email');
            var status = create_free_trial(product_id, email, referrer, campaign_slug, coupon_id);
            if (status == 200) {
                location.reload()
            }
            if (status == 400) {
                //alert("Trial subscription for the user on the same product already exists.")
            }
        }
    });
    return data_json;
}
$(document).on('click', '.preview_magazine_photoswipe', function() {
    if ($(this).hasClass('api2_free_trial')) {
        free_trial_product_id();
    } else {
        if (isCnMobile) {
            if ($(this).hasClass('active')) {
                load_photoswipe_freebook_in($(this).data('issue-id'), 0);
            }
        } else {
            if (!$(this).hasClass('redirect')) {
                $('.featured_pages_ul li:first-child').trigger('click');
            }
        }
    }
});
$(document).on('click', '#youtube_cover_img', function() {
    var video_src = 'http:' + $(this).data('video-src') + '&autoplay=1&showinfo=0&controls=0';
    var video_id = $(this).data('video-id');
    gtmVideoLoad();
    //$(document).find('#cover_video').attr('src', video_src + '&amp;autoplay=1&amp;controls=0&amp;showinfo=0');
    $(document).find('#cover_video').attr('src', video_src);
    $(document).find('#cover_video').addClass('active');
});
$(document).on('click', '.view_as_web,.view_as_label', function() {
    gtmViewAsWeb(isssueName);
    var index = $(this).data('index') + 1;
    var href = $(document).find(".posts_list li[data-index='" + index + "'] a").data('href');
    // console.log(href + index)
    if (href != '') {
        location.href = href;
    }
});

function highlight_article(current_page) {
    $('.posts_list').find('li').each(function() {
        $(this).find('a').removeClass('active');
        if ($(this).data('index') == current_page || $(this).data('index') == (current_page - 1)) {
            $(this).find('a').addClass('active');
            // console.log($(this).find('a').position().top);
            if ($('#preview').find('.first_portion.active')) {
                var top = $(this).find('a').position().top;
                // console.log(top);
                $('.posts_list').mCustomScrollbar("destroy");
                $('.posts_list').mCustomScrollbar();
                $('.posts_list').mCustomScrollbar("scrollTo", top, {
                    scrollInertia: 0,
                    mouseWheel: {
                        preventDefault: true
                    }
                });
            }
            try {} catch (err) {}
        }
    })
}

function time() {
    var d = new Date();
    // console.log(d.toLocaleString());
}

function load_sub_1(guid) {
    // console.log(guid);
    //var postid = 'product_id';
    //var guid = '03045ca31b69e59c02ba8127ddbecb5a';
    if (guid == "") {
        $("#button1").remove();
        $("#button1_popup").remove();
        $(".subscribe_part").removeClass("active");
        return false
    }
    //time();
    $.ajax({
        type: 'GET',
        url: "https://ecom.cnidigital.in/wp-admin/admin-ajax.php",
        //data: "action=getproductdata1" + "&postid=" + postid,
        data: "action=get_campaign_products" + "&guid=" + guid,
        success: function(data) {
            if (data.error == 1) {
                // console.log("merror");
                $.ajax({
                    type: 'GET',
                    url: "https://ecom.cnidigital.in/wp-admin/admin-ajax.php",
                    //data: "action=getproductdata1" + "&postid=" + postid,
                    data: "action=get_campaign_products" + "&guid=" + guidMain,
                    success: function(data) {
                        if (data.error == 1) {
                            // console.log("serror");
                        } else {
                            subscription_button_html(data);
                        }
                    }
                });
            } else {
                subscription_button_html(data);
            }
        }
    });
}

function replace_vogue_title(title) {
    title = title.toUpperCase();
    //    title = title.replace("VOGUE - ", "");
    //    title = title.replace("VOGUE-", "");
    //    title = title.replace("VOGUE", "");
    return title;
}

function subscription_button_html(data) {
    // console.log("nerror");
    var output = data;
    var product1 = output.products[0];
    var product2 = output.products[1];
    updateButtonHtml(product1, 1);
    updateButtonHtml(product2, 2);
    $('#two_btns').val(two_btns);
}

function updateButtonHtml(product, target) {
    if (product == undefined) {
        $(document).find('.subscribe_part').removeClass('active');
        $(document).find('#button' + target).remove();
    } else {
        var title = product.name;
        if (product.desc) title = replace_vogue_title($('<div/>').html(product.desc).text());
        var originalPrice = product.regular_price;
        var salePrice = product.discount_price;
        var productId = product.id;
        if (salePrice == undefined) {
            salePrice = originalPrice; //product-id productPrice campaignId
            var buttonHtml = '<a href="/subscription/' + campaignSlug + '/product/' + productId + '"  data-productId="' + productId + '" data-productPrice="' + salePrice + '"  data-campaignId="' + campaignSlug + '"   class="button"><div class="btn_inner">' + title + '<label><span class=""><i class="fa fa-inr" aria-hidden="true"></i> ' + salePrice + '</span></label></div></a>';
        } else {
            var buttonHtml = '<a href="/subscription/' + campaignSlug + '/product/' + productId + '" data-productId="' + productId + '" data-productPrice="' + salePrice + '"  data-campaignId="' + campaignSlug + '" class="button"><div class="btn_inner">' + title + '<label><i class="fa fa-inr" aria-hidden="true" style="opacity: 0.7;"></i><span class="strike"> ' + originalPrice + '</span><span class=""><i class="fa fa-inr" aria-hidden="true"></i> ' + salePrice + '</span></label></div></a>';
        }
        $('#button' + target).data('price', salePrice);
        $('#button' + target + '_popup').data('price', salePrice);
        $(document).find('#button' + target).append(buttonHtml);
        $(document).find('#button' + target + '_popup').append(buttonHtml);
        two_btns += '<div class="content_btns" id="button' + target + '"> ' + $(document).find('#button' + target).html() + '</div>';
        $(document).find('.subscribe_part').removeClass('active');
        applyIntPrice(originalPrice, salePrice, target);
    }
}

function applyIntPrice(originalPrice, salePrice, target) {
    if (country_code == "INT") {
        /*$.ajax({
            type: 'GET',
            url: "https://api.fixer.io/latest?symbols=INR,USD&base=INR",
            success: function (data) {*/
        result = 1 / 69;
        originalPrice = originalPrice * result;
        originalPrice = originalPrice.toFixed(2);
        salePrice = salePrice * result;
        salePrice = salePrice.toFixed(2);
        $('#button' + target).data('price', salePrice);
        $('#button' + target + '_popup').data('price', salePrice);
        $('#button' + target + ' .btn_inner label').html('<i class="fa fa-usd" aria-hidden="true" style="opacity: 0.7;"></i><span class="strike"> ' + originalPrice + '</span><span class=""><i class="fa fa-usd" aria-hidden="true"></i> ' + salePrice + '</span>');
        $('#button' + target + '_popup .btn_inner label').html('<i class="fa fa-usd" aria-hidden="true" style="opacity: 0.7;"></i><span class="strike"> ' + originalPrice + '</span><span class=""><i class="fa fa-usd" aria-hidden="true"></i> ' + salePrice + '</span>');
        /*}
        });*/
    }
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

function remove_morePlans_inner() {
    if ($('#subscribe_part').find('.more-plans-magazine').length > 0) {
        var new_more = $('#subscribe_part').find('.more-plans-magazine').get(0).outerHTML;
        $('#subscribe_part').find('.more-plans-magazine').remove();
        if ($('.common_div_bottom_subscription').length > 0) {
            $('.common_div_bottom_subscription').find('.more-plans-magazine').remove();
            $('.common_div_bottom_subscription').append(new_more);
        }
    }
}

function calculate_days_different(today, date) {
    // mongo
    var date2 = new Date(today);
    var date1 = new Date(date);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDifference;
}

function get_subscription_status_by_product(purchased_products_list, product_id) {
    var status = false;
    var remaining_days = 0;
    var subscription_type = '';
    for (var i = 0; i < purchased_products_list.length; i++) {
        if (purchased_products_list[i].ecom_product_id == product_id) {
            status = purchased_products_list[i].status;
            remaining_days = calculate_days_different(today, purchased_products_list[i].end_date);
            subscription_type = purchased_products_list[i].subscription_type;
        }
    }
    //mongo
    return {
        'status': status,
        'remaining_days': remaining_days
    };
}

function get_subscriptions() {
    //mongo
}

function get_purchased_products(email_id) {
    var purchased_products_with_status = new Array();
    //var purchased_products_with_status = {}
    //mongo
    $.ajax({
        type: 'GET',
        url: "/wp-admin/admin-ajax.php",
        async: false,
        data: "action=mongo_apis&api_type=subscriptions&email=" + email_id,
        success: function(data) {
            var subscription_array = JSON.parse(data);
            if (subscription_array.MessageCode != 404) {
                var subscription_data = subscription_array.data;
                for (var i = 0; i < subscription_data.length; i++) {
                    console.log(subscription_data[i])
                    var ecom_product_id = subscription_data[i].ecom_product_id;
                    var status = subscription_data[i].status;
                    var end_date = subscription_data[i].end_date;
                    var subscription_type = subscription_data[i].subscription_type;
                    //var subscription_type = subscription_data[i].subscription_type;
                    purchased_products_with_status.push({
                        ecom_product_id,
                        status,
                        end_date,
                        subscription_type
                    });
                    //purchased_products_with_status.push(ecom_product_id);
                    //purchased_products_with_status[i] = ecom_product_id;
                    //purchased_products_with_status[i] = {"ecom_product_id": ecom_product_id, "status": status, "end_date": end_date};
                    //purchased_products_with_status[i].push = ({'ecom_product_id':ecom_product_id, "status": status, "end_date": end_date});
                }
            }
        }
    });
    return purchased_products_with_status;
}

function just_purchased_products_ids(purchased_products_list) {
    var purchased_products_ids = [];
    for (var i = 0; i < purchased_products_list.length; i++) {
        purchased_products_ids.push(purchased_products_list[i].ecom_product_id);
    }
    return purchased_products_ids;
}

function just_purchased_active_products_ids(purchased_products_list) {
    var purchased_products_ids = [];
    for (var i = 0; i < purchased_products_list.length; i++) {
        if (purchased_products_list[i].status == 'active') {
            purchased_products_ids.push(purchased_products_list[i].ecom_product_id);
        }
    }
    return purchased_products_ids;
}

function check_previous_purchase(purchased_products_list) {
    var purchased_products_ids = [];
    var previouse_purchase = false;
    if (purchased_products_list.length > 0) {
        previouse_purchase = true;
    }
    return previouse_purchase;
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function get_subscriptions_details_by_product(product_id, email) {
    var dataReturn;
    $.ajax({
        type: 'GET',
        async: false,
        url: "/wp-admin/admin-ajax.php",
        data: "action=mongo_apis&api_type=subscriptions_by_product&product_id=" + product_id + "&email=" + email,
        success: function(data) {
            dataReturn = data;
        }
    });
    return dataReturn;
}

function get_subscriptions_by_product_from_array(purchased_products_list, product_id) {
    var subs_data;
    for (var i = 0; i < purchased_products_list.length; i++) {
        console.log(purchased_products_list[i].ecom_product_id);
        console.log(product_id)
        if (purchased_products_list[i].ecom_product_id == product_id) {
            subs_data = purchased_products_list[i];
            console.log(subs_data)
            //purchased_products_ids.push(purchased_products_list[i].ecom_product_id);
        }
    }
    return subs_data;
}

function if_user_subscribed(purchased_products_ids, magazine_product_valid_ids, purchased_products_list) {
    var subscription_status = "expired";
    var subscription_type = "";
    var email = Cookies.get('radius_login_email');
    var remaining_days = 0;
    for (var i = 0; i < purchased_products_ids.length; i++) {
        var status = isInArray(purchased_products_ids[i].toString(), magazine_product_valid_ids);
        if (status == true) {
            subscription_status = "active";
            current_product_id = purchased_products_ids[i];
            var subscription_data = get_subscriptions_by_product_from_array(purchased_products_list, purchased_products_ids[i]);
            subscription_type = subscription_data.subscription_type;
            remaining_days = calculate_days_different(today, subscription_data.end_date);
        }
    }
    return {
        "subscription_status": subscription_status,
        "subscription_type": subscription_type,
        "remaining_days": remaining_days
    };
}

function create_free_trial(product_id, email, referrer, campaign_slug, coupon_id) {
    var status;
    $.ajax({
        type: 'GET',
        async: false,
        url: "/wp-admin/admin-ajax.php",
        data: "action=mongo_apis&api_type=create_free_trial&product_id=" + product_id + "&email=" + email + "&referrer=" + referrer + "&campaign_slug=" + campaign_slug + "&coupon_id=" + coupon_id,
        success: function(data) {
            data = JSON.parse(data);
            status = data.MessageCode;
        }
    });
    return status;
}

function get_trial_product_id() {
    var product_id;
    $.ajax({
        type: 'GET',
        url: "/wp-admin/admin-ajax.php",
        async: false,
        data: "action=get_trial_subscription_api_2_cn",
        success: function(data) {
            product_id = data.product_id;
            var coupon_id = data.coupon_id;
            var campaign_slug = data.guid;
        }
    });
    return product_id;
}

function get_trial_subscriptions_details_by_product(product_id, email) {
    var dataReturn;
    var status;
    $.ajax({
        type: 'GET',
        async: false,
        url: "/wp-admin/admin-ajax.php",
        data: "action=mongo_apis&api_type=trial_subscriptions_by_product&product_id=" + product_id + "&email=" + encodeURIComponent(email),
        success: function(data) {
            dataReturn = JSON.parse(data);
            console.log(dataReturn);
            if (dataReturn.MessageCode != 404) {
                dataReturn = dataReturn.data[0];
                Cookies.set('trial_history', true);
            }

            if(dataReturn.MessageCode == 404){
                Cookies.set('trial_history', false);
            }
        }
    });
    return dataReturn;
}

function checksub(guid) {
    // $.ajax({
    //     type: 'GET',
    //     url: "/wp-admin/admin-ajax.php",
    //     data: "action=mongo_apis&api_type=subscriptions&email=testcondenast@gmail.com",
    //     success: function (data) {
    //         console.log('subscriptions')
    //         console.log(data);
    //     }
    // });
    // $.ajax({
    //     type: 'GET',
    //     url: "/wp-admin/admin-ajax.php",
    //     data: "action=mongo_apis&api_type=subscriptions_by_product&product_id=17506&email=testcondenast@gmail.com",
    //     success: function (data) {
    //         console.log('here')
    //         console.log(data);
    //     }
    // });
    //time();
    var issue_id = $('#issue_id').val();
    email = getCookie('radius_login_email');
    if (email == '') {
        $("#subscribe_part").hide();
        $(".mag_btn_wrap").hide();

        $(".common_div_bottom_subscription").hide();
        $(".posts_list_wrapper").addClass('posts_list_full_height');
        //time();
        /*$('.more-plans-magazine').show();
        var logouthtml = "<h3> " + marketing_text + " <span class='subscribe_lbl'>SUBSCRIBE NOW</span><span class='pls_span_txt'></span> </h3> <div class='content_btns' id='button1'> </div><div class='content_btns' id='button2'></div><hr class='common_line'/>";
        $('#subscribe_part').append(sub_html(logouthtml));
        remove_morePlans_inner();
        $(".title_above_cover").removeClass('active');*/
        $(".preview_magazine_photoswipe").addClass('active');
        if (trial_subscription == "yes") {
            $(".preview_magazine_photoswipe").addClass('redirect');
            $(".preview_magazine_photoswipe").addClass('animated');
            $(".preview_magazine_photoswipe").addClass('pulse');
            $(".preview_magazine_photoswipe").attr('href', 'https://' + CN_LR_siteName + '.hub.loginradius.com/RequestHandlor.aspx?apikey=' + CN_LR_apiKey + '&provider=facebook&callback=http%3A%2F%2Fwww.vogue.in%2Fmagazine%2F%3Frsource%3Dpaywall-trial-magazine-featureunit&same_window=1&callbacktype=QueryString');
            $(".preview_magazine_photoswipe").html(begin_free_html);
            show30Day(true);
        }
        load_sub_1(guid);
    } else {
        $('.more-plans-magazine').hide();
        var issue_id = $(document).find('#issue_id').val();
        var email_id = Cookies.get('radius_login_email');
        //alert(email_id)
        var encoded_email = btoa(email_id);
        //var product_id = 17506;
        var purchased_products_list = get_purchased_products(email_id);
        console.log(purchased_products_list);
        //var subscription_response = get_subscription_status_by_product(purchased_products_list, product_id);
        //var subscription_status = subscription_response.status;
        //get_trial_subscriptions_details_by_product(product_id, email_id);
        var purchased_products_ids = just_purchased_products_ids(purchased_products_list);
        var active_purchased_product_ids = just_purchased_active_products_ids(purchased_products_list);
        var subscription_status_data = if_user_subscribed(active_purchased_product_ids, magazineProductIds, purchased_products_list);
        var subscription_status = subscription_status_data.subscription_status;
        var subscription_type = subscription_status_data.subscription_type;
        var remaining_days = subscription_status_data.remaining_days;
        // 1st get trial product id
        var trial_product_id = get_trial_product_id();
        // 2nd Check if user is having trial of that product or not
        var trial_subscription_status = false;
        var status_of_trial_subscription = get_trial_subscriptions_details_by_product(trial_product_id, email_id);
        if (status_of_trial_subscription.status == "active") {
            trial_subscription_status = true;
        }
        var previouse_purchase = check_previous_purchase(purchased_products_list);
        $("#subscribe_part").fadeIn();


        //trial_subscription_status = false;


        if (subscription_status == "active") {
            if (subscription_type == "digital") {
                var magHtml = '<h3 class="ends_in"> Read <a href="javascript:call_magazine();">this issue</a> <br/> or browse <a href="javascript:call_archive()">archives</a> <span class="pls_span_txt"> Subscription ends in ' + remaining_days + ' days. </span></div>';
                $('#subscribe_part').html(sub_html(magHtml));
                $('#subscribe_part').removeClass('active');
                mag_subscription = 'subscribed';
            } else {
                var magHtml = '<div class="gm_wrap gm_txt" style="border: 0;padding-bottom: 0;"><h3> <span class="get_more_vogue_txt">Get more Vogue</span> <span class="pls_span_txt"> Read <a href="javascript:call_magazine();">this issue</a> <br/> or browse <a href="javascript:call_archive()">archives</a> </span> </h3> <div class="content_btns" id="button1"> </div><div class="content_btns" id="button2"> </div></div></div><hr class="common_line"><a class="more-plans-magazine test" href="/subscription/?subscribe=MagazineLandingFeatureUnit&tab=Digital" style="color: #ccc;display: table;font-size: 13px;margin: 6px auto; margin-bottom: 0">More plans <i class="fa fa-chevron-right"  style="vertical-align:middle" aria-hidden="true"></i></a></hr>';
                $('#subscribe_part').html(sub_html(magHtml));
                get_campaign_products(purchased_products_ids);
            }
            remove_morePlans_inner();
            $(".already_login_txt").hide();
            $(".preview_magazine_photoswipe").removeClass('active');
            $(".title_above_cover").addClass('active');
            $('.or_seperator').hide();
            subscriptionStatus = true;
        } else if (trial_subscription_status == true) {
            remaining_days = calculate_days_different(today, status_of_trial_subscription.end_date);
            // remaining_days = calculate_days_different(today, end_date);
            //
            // var remaining_days = subscription_status_data.remaining_days;
            //status_of_trial_subscription.status
            var magHtml = '<h3 class="ends_in"> Read <a href="javascript:call_magazine();">this issue</a> <br/> or browse <a href="javascript:call_archive()">archives</a> <span class="pls_span_txt"> Subscription ends in ' + remaining_days + ' days. </span></div>';
            $('#subscribe_part').html(sub_html(magHtml));
            $('#subscribe_part').removeClass('active');
            mag_subscription = 'subscribed';
            remove_morePlans_inner();
            $(".already_login_txt").hide();
            $(".preview_magazine_photoswipe").removeClass('active');
            $(".title_above_cover").addClass('active');
            $('.or_seperator').hide();
            subscriptionStatus = true;
        } else {
            if (previouse_purchase == true) {
                var magHtml = '<div class="content_btns" id="button1"> </div><div class="content_btns" id="button2"> </div><hr class="common_line">\n\<a class="more-plans-magazine test" href="/subscription/?subscribe=MagazineLandingFeatureUnit&tab=Digital" style="color: #ccc;display: table;font-size: 13px;margin: 6px auto; margin-bottom: 0">More plans <i class="fa fa-chevron-right"  style="vertical-align:middle" aria-hidden="true"></i></a></hr>';
                $('#subscribe_part').html(sub_html(magHtml));
                $(".already_login_txt").hide();
                $(".preview_magazine_photoswipe").addClass('active');
                $('.or_seperator').show();
                $(".title_above_cover").removeClass('active');
                $(".subscription_popup .getitnow").remove();
                 
                if (trial_subscription == "yes") {
                     
                    $(".preview_magazine_photoswipe").addClass('redirect');
                    $(".preview_magazine_photoswipe").addClass('animated');
                    $(".preview_magazine_photoswipe").addClass('pulse');
                    //$(".preview_magazine_photoswipe").attr('href', '/register/?rsource=paywall-trial-magazine-featureunit&referrer=' + window.location.pathname + '&campaign=30-day-free-trial-vogue-168');
                    $(".preview_magazine_photoswipe").attr('href', 'javascript:void(0)');
                    $(".preview_magazine_photoswipe").addClass('api2_free_trial');
                    $(".preview_magazine_photoswipe").html(begin_free_html);
                    $(document).find('.posts_list_wrapper .mag_btn_wrap').fadeIn();
                    // $(document).find(".subscription_popup .content_wrapper .content .free_trial_html_box").html($(document).find('.preview_magazine_photoswipe.active')[0].outerHTML);
                    show30Day(true);
                }
            } else {
                var magHtml = '<h3>' + marketing_text + '</h3> <div class="content_btns" id="button1"> </div><div class="content_btns" id="button2"> </div><hr class="common_line"><a class="more-plans-magazine test" href="/subscription/?subscribe=MagazineLandingFeatureUnit&tab=Digital" style="color: #ccc;display: table;font-size: 13px;margin: 6px auto; margin-bottom: 0">More plans <i class="fa fa-chevron-right"  style="vertical-align:middle" aria-hidden="true"></i></a></hr>';
                $('#subscribe_part').html(sub_html(magHtml));
                $(".already_login_txt").hide();
                $(".preview_magazine_photoswipe").addClass('active');
                $(".title_above_cover").removeClass('active');
                 
                if (trial_subscription == "yes") {
                     
                    $(".preview_magazine_photoswipe").addClass('redirect');
                    $(".preview_magazine_photoswipe").addClass('animated');
                    $(".preview_magazine_photoswipe").addClass('pulse');
                    //$(".preview_magazine_photoswipe").attr('href', '/register/?rsource=paywall-trial-magazine-featureunit&referrer=' + window.location.pathname + '&campaign=30-day-free-trial-vogue-168');
                    $(".preview_magazine_photoswipe").attr('href', 'javascript:void(0)');
                    $(".preview_magazine_photoswipe").addClass('api2_free_trial');
                    $(".preview_magazine_photoswipe").html(begin_free_html);
                    // $(document).find(".subscription_popup .content_wrapper .content .free_trial_html_box").html($(document).find('.preview_magazine_photoswipe.active')[0].outerHTML);
                    show30Day(true);
                }
            }
            get_campaign_products();

 
            if(trial_subscription_status==false && subscription_status=='expired'){

                if(Cookies.get('trial_history') == 'true'){
                    $(".already_login_txt, .mag_btn_wrap").hide();
                    $(".preview_magazine_photoswipe").removeClass('active');
                    $(".title_above_cover").addClass('active');
                    $('.or_seperator').hide();
                    $('#subscribe_part.subscribe_part').prepend('<span class="trial_expired">Your trial is expired.</span>')
                }
                
            }



        }
        //        $.ajax({
        //            type: 'GET',
        //            crossDomain: true,
        //            url: "https://8gymmx7yp4.execute-api.ap-southeast-1.amazonaws.com/Dev/trialsubscription/"+encoded_email,
        //            beforeSend: setHeader,
        //            success: function (data) {
        //                console.log(data);
        //            }
        //        })
        // $.ajax({
        //     type: 'POST',
        //     url: "https://ecom.cnidigital.in/global-api/api.php",
        //     data: {
        //         action: "check_user_subscription_magazine",
        //         email_id: email,
        //         site: "vogue",
        //         product_ids: magazineProductIds
        //     },
        //     success: function (data) {
        //
        //         // Cookies.set('mag_sub', data['status']);
        //
        //         if(mag_subscription!='subscribed'){
        //             mag_subscription = data['status'];
        //         }
        //
        //         if (data.status == "subscribed")
        //         {
        //             if (data.subscription.type == "subscription")
        //             {
        //                 var magHtml = '<h3 class="ends_in"> Read <a href="javascript:call_magazine();">this issue</a> <br/> or browse <a href="javascript:call_archive()">archives</a> <span class="pls_span_txt"> Subscription ends in ' + data.subscription.days + ' days. </span></div>';
        //                 $('#subscribe_part').html(sub_html(magHtml));
        //                 $('#subscribe_part').removeClass('active');
        //             } else {
        //                 var magHtml = '<div class="gm_wrap gm_txt" style="border: 0;padding-bottom: 0;"><h3> <span class="get_more_vogue_txt">Get more Vogue</span> <span class="pls_span_txt"> Read <a href="javascript:call_magazine();">this issue</a> <br/> or browse <a href="javascript:call_archive()">archives</a> </span> </h3> <div class="content_btns" id="button1"> </div><div class="content_btns" id="button2"> </div></div></div><hr class="common_line"><a class="more-plans-magazine test" href="/subscription/?subscribe=MagazineLandingFeatureUnit&tab=Digital" style="color: #ccc;display: table;font-size: 13px;margin: 6px auto; margin-bottom: 0">More plans <i class="fa fa-chevron-right"  style="vertical-align:middle" aria-hidden="true"></i></a></hr>';
        //                 $('#subscribe_part').html(sub_html(magHtml));
        //                 get_campaign_products(data.subscription.purchased_products);
        //             }
        //             remove_morePlans_inner();
        //             $(".already_login_txt").hide();
        //             $(".preview_magazine_photoswipe").removeClass('active');
        //             $(".title_above_cover").addClass('active');
        //             $('.or_seperator').hide();
        //             subscriptionStatus = true;
        //         } else {
        //
        //             console.log('-----------------------------------------------------')
        //             console.log(magazineProductIds+ ' magazineProductIds');
        //             console.log(data);
        //
        //             if (data.previous_purchase == true) {
        //                 var magHtml = '<div class="content_btns" id="button1"> </div><div class="content_btns" id="button2"> </div><hr class="common_line">\n\<a class="more-plans-magazine test" href="/subscription/?subscribe=MagazineLandingFeatureUnit&tab=Digital" style="color: #ccc;display: table;font-size: 13px;margin: 6px auto; margin-bottom: 0">More plans <i class="fa fa-chevron-right"  style="vertical-align:middle" aria-hidden="true"></i></a></hr>';
        //                 $('#subscribe_part').html(sub_html(magHtml));
        //                 $(".already_login_txt").hide();
        //                 $(".preview_magazine_photoswipe").addClass('active');
        //                 $('.or_seperator').show();
        //                 $(".title_above_cover").removeClass('active');
        //                 $(".subscription_popup .getitnow").remove();
        //
        //                 if (trial_subscription == "yes")
        //                 {
        //                     $(".preview_magazine_photoswipe").addClass('redirect');
        //                     $(".preview_magazine_photoswipe").addClass('animated');
        //                     $(".preview_magazine_photoswipe").addClass('pulse');
        //                     $(".preview_magazine_photoswipe").attr('href', '/register/?rsource=paywall-trial-magazine-featureunit&referrer=' + window.location.pathname + '&campaign=30-day-free-trial-vogue-168');
        //                     $(".preview_magazine_photoswipe").html(begin_free_html);
        //                     // $(document).find(".subscription_popup .content_wrapper .content .free_trial_html_box").html($(document).find('.preview_magazine_photoswipe.active')[0].outerHTML);
        //                     show30Day(true);
        //                 }
        //             } else {
        //                 var magHtml = '<h3>' + marketing_text + '</h3> <div class="content_btns" id="button1"> </div><div class="content_btns" id="button2"> </div><hr class="common_line"><a class="more-plans-magazine test" href="/subscription/?subscribe=MagazineLandingFeatureUnit&tab=Digital" style="color: #ccc;display: table;font-size: 13px;margin: 6px auto; margin-bottom: 0">More plans <i class="fa fa-chevron-right"  style="vertical-align:middle" aria-hidden="true"></i></a></hr>';
        //                 $('#subscribe_part').html(sub_html(magHtml));
        //                 $(".already_login_txt").hide();
        //                 $(".preview_magazine_photoswipe").addClass('active');
        //                 $(".title_above_cover").removeClass('active');
        //                 if (trial_subscription == "yes")
        //                 {
        //                     $(".preview_magazine_photoswipe").addClass('redirect');
        //                     $(".preview_magazine_photoswipe").addClass('animated');
        //                     $(".preview_magazine_photoswipe").addClass('pulse');
        //                     $(".preview_magazine_photoswipe").attr('href', '/register/?rsource=paywall-trial-magazine-featureunit&referrer=' + window.location.pathname + '&campaign=30-day-free-trial-vogue-168');
        //                     $(".preview_magazine_photoswipe").html(begin_free_html);
        //                     // $(document).find(".subscription_popup .content_wrapper .content .free_trial_html_box").html($(document).find('.preview_magazine_photoswipe.active')[0].outerHTML);
        //                    show30Day(true);
        //                 }
        //             }
        //             get_campaign_products();
        //         }
        //     }
        // });
    }
}

function get_campaign_products(subscribed_products = []) {
    $.ajax({
        type: 'GET',
        url: "https://ecom.cnidigital.in/wp-admin/admin-ajax.php",
        data: "action=get_campaign_products" + "&guid=" + guid,
        success: function(data) {
            if (data.error == 1) {
                // console.log("loginerror");
                $.ajax({
                    type: 'GET',
                    url: "https://ecom.cnidigital.in/wp-admin/admin-ajax.php",
                    data: "action=get_campaign_products" + "&guid=" + guidMain,
                    success: function(data) {
                        if (data.error == 1) {
                            // console.log("sloginerror");
                        } else {
                            // console.log("slogsus");
                            var output = data;
                            var product1 = output.products[0];
                            var product2 = output.products[1];
                            var productid = product1.id;
                            var magid1 = productid;
                            /////////////product2////////////////
                            if (product2 == undefined) {
                                var magid2 = "";
                            }
                            if (product2 != undefined) {
                                var productid2 = product2.id;
                                var magid2 = productid2;
                            }
                            if (jQuery.inArray(magid1, subscribed_products) === -1) {
                                updateButtonHtml(product1, 1);
                            }
                            if (jQuery.inArray(magid2, subscribed_products) === -1) {
                                updateButtonHtml(product2, 2);
                            }
                        }
                    }
                });
            } else {
                // console.log("logsus");
                var output = data;
                var product1 = output.products[0];
                var product2 = output.products[1];
                var productid = product1.id;
                var magid1 = productid;
                /////////////product2////////////////
                if (product2 == undefined) {
                    var magid2 = "";
                }
                if (product2 != undefined) {
                    var productid2 = product2.id;
                    var magid2 = productid2;
                }
                if (jQuery.inArray(magid1, subscribed_products) === -1) {
                    updateButtonHtml(product1, 1);
                }
                if (jQuery.inArray(magid2, subscribed_products) === -1) {
                    updateButtonHtml(product2, 2);
                }
            }
        }
    });
}

function call_archive() {
    $("#archive_btn").trigger("click");
}

function call_magazine() {
    //$(document).find(".title_above_cover.active").trigger("click");
    $(document).find(".main_cover_image.active").trigger("click");
}

function load_sub(product_id) {
    var postid = product_id;
    if (postid == "") {
        $("#button2").remove();
        $("#button2_popup").remove();
        $(".subscribe_part").removeClass("active");
        return false
    }
    $.ajax({
        type: 'POST',
        url: "https://ecom.cnidigital.in/wp-admin/admin-ajax.php",
        data: "action=getproductdata" + "&postid=" + postid,
        success: function(data) {
            var output = jQuery.parseJSON(data);
            // console.log('op', output);
            var output = jQuery.parseJSON(data);
            var title = output.title;
            var sale = output.sale_price;
            var regular = output.regularprice;
            var period2 = output.subscription_period;
            createCookie("period2", period2, "1");
            $('#button2').data('price', sale);
            $('#button2_popup').data('price', sale);
            $(document).find('#button2').append('<a href="/pay-for-magazine/' + postid + '" class="button"><div class="btn_inner"> ' + title + '<label><i class="fa fa-inr" aria-hidden="true" style="opacity: 0.7;"></i><span class="strike"> ' + regular + '</span><span class=""><i class="fa fa-inr" aria-hidden="true"></i> ' + sale + '</span></label></div></a>');
            $(document).find('#button2_popup').append('<a href="/pay-for-magazine/' + postid + '" class="button"><div class="btn_inner">' + title + '<label><i class="fa fa-inr" aria-hidden="true" style="opacity: 0.7;"></i><span class="strike"> ' + regular + '</span><span class=""><i class="fa fa-inr" aria-hidden="true"></i> ' + sale + '</span></label></div></a>');
            $(document).find('.subscribe_part').removeClass('active');
        }
    });
}
$(function() {
    if (isCnMobile) {
        var owl = $('.mobile_landing_carousel');
        owl.owlCarousel({
            nav: true,
            autoWidth: true,
            items: 1,
            margin: 5,
            autoplay: false,
            autoplayHoverPause: true,
            loop: true
        });
        owl.on('changed.owl.carousel', function(event) {
            var item = event.item.index;
            if (item > 1) {
                // owl.trigger('to.owl.carousel', [0, 10, true])
            }
        })
        $(".mobile_landing_carousel .owl-next").click(function() {
            //owl.trigger('stop.owl.autoplay');
        })
        $('#magazine_issues_unit #preview>.row').addClass('active');
        $('#magazine_issues_unit #preview>.row .first_portion').css('opacity', 0);
        var tmpImg = new Image();
        tmpImg.onload = function() {
            var img_width = document.querySelector('.main_cover_image').naturalWidth;
            var img_height = document.querySelector('.main_cover_image').naturalHeight;
            var calc_width = $('.main_cover_image').width();
            var calc_height = (calc_width * img_height) / img_width;
            //$('.mobile_landing_carousel.owl-carousel .owl-item, .main_cover_image_wrap_inner').height(calc_height);
            $('#magazine_issues_unit #preview>.row').removeClass('active');
            $('#magazine_issues_unit #preview>.row .first_portion').css('opacity', 1);
        };
        tmpImg.src = $('.main_cover_image').attr('src');
    }
    var length_of_items_inner = $(document).find('.magazine_preview_issues_carousel .item').length;
    if (length_of_items_inner > 3) {
        var magazine_preview_issues_carousel = $('.magazine_preview_issues_carousel');
        setTimeout(function() {
            var vheight = $('.magazine_preview_issues_carousel').find('.owl-item img').height();
            $(document).find('.magazine_preview_issues_carousel').height(vheight + 25);
        }, 3000);
        magazine_preview_issues_carousel.owlCarousel({
            nav: true,
            autoWidth: true,
            items: 3,
            margin: 5,
            navText: ["", ""],
            mergeFit: true,
            autoplay: true,
            center: true,
            autoplayHoverPause: true,
            loop: true,
            startPosition: 1
        });
        var length_of_items = $(document).find('.magazine_preview_issues_carousel .owl-item').length;
        if (length_of_items < 4) {
            $(document).find('.magazine_preview_issues_carousel .owl-nav.disabled').hide();
        }
        $(".magazine_preview_issues_carousel .owl-prev").on("click touch", function() {
            magazine_preview_issues_carousel.trigger("prev.owl.carousel");
        });
        $(".magazine_preview_issues_carousel .owl-next").on("click touch", function() {
            magazine_preview_issues_carousel.trigger("next.owl.carousel");
        });
    }
    /* main_cover_img_carousel */
    if (isCnMobile) {
        img_sequence('.mobile_landing_carousel .owl-item.active ');
    } else {
        img_sequence('.first_portion.div_1');
    }
    /* ends main_cover_img_carousel */
});
var email;

/*function cn_lr_login_cookie_callback() {
    if (lrMagazineCallback) {
        lrMagazineCallback = false;
        email = Cookies.get('radius_login_email');
        checksub(guid);
    }
}*/

function cn_lr_logout_callback() {
    if (lrMagazineCallback) {
        // show30Day(true);
        lrMagazineCallback = false;
        checksub(guid);
    }
}
window.lrCallbacks.loggedInCookie.push('lr_logged_in_callback');
lr_logged_in_callback = function(token) {
    if ($(document).find('#magazine_issues_unit').length > 0) {
        $(document).find("#subscribe_part").fadeIn();
        $(document).find('#subscribe_part').addClass('active');
        email = Cookies.get('radius_login_email');
        checksub(guid);
    }
}

$(window).resize(function() {
    var flip_win = $("#flipbook").width();
    var flip_win_h = $("#flipbook").height();
});

function call_preview_module(pagehash) {
    if (pagehash == 'preview') {
        if (isCnMobile) {
            $(document).find('.preview_magazine_photoswipe').trigger('click');
        } else {
            setTimeout(function() {
                $(document).find('.featured_pages_ul>li:first-child').trigger('click');
            }, 1000);
        }
    }
}
$(function() {
    call_preview_module(window.location.hash.substr(1));
})
$(window).load(function() {
    call_flipbook_frm_url(window.location.hash.substr(1));
    $('.posts_list').mCustomScrollbar({
        scrollInertia: 200,
        mouseWheel: {
            preventDefault: true
        }
    });
})

function sub_html(data) {
    return '<div class="sub_common">' + data + '</div>';
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function load_swipe(img) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    // build items array
    if (typeof img === 'string') {
        var items = [{
            src: img,
            w: 700,
            h: 896,
            title: ''
        }];
    } else {
        var items = img;
    }
    // define options (if needed)
    var options = {
        // history & focus options are disabled on CodePen
        history: false,
        fullscreenEl: false,
        loop: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        tapToToggleControls: false,
        captionEl: true,
        addCaptionHTMLFn: function(item, captionEl, isFake) {
            // item      - slide object
            // captionEl - caption DOM element
            // isFake    - true when content is added to fake caption container
            //             (used to get size of next or previous caption)
            var item_html = item.html;
            setTimeout(function() {
                if (item.html != '') {
                    captionEl.children[0].innerHTML = item_html;
                    img_sequence('.main_cover_img_carousel_wrap_photoswipe');
                }
            }, 100);
            // return true;
            setTimeout(function() {
                //
                //                var btn_html = '<div class="subscribe_part">' + $('#subscribe_part').html() + '</div>\n\
                //<div class="common_div_bottom_subscription">' + $('.common_div_bottom_subscription').html() + '</div>';
                var myVar = setInterval(function() {
                    if ($('#two_btns').val() != '') {
                        var btn_html = '<div class="subscribe_part"><div class="sub_common">' + $('#two_btns').val() + '</div>\n\
        <div class="common_div_bottom_subscription">' + $('.common_div_bottom_subscription').html() + '</div>';
                        if (!item.title) {
                            captionEl.children[0].innerHTML = '<strong>' + btn_html + '</strong>';
                            return false;
                        }
                        captionEl.children[0].innerHTML = '<strong>' + btn_html + '</strong>';
                        clearInterval(myVar);
                    }
                }, 100);
            }, 1000);
            return true;
        },
    };
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    photoswipe_obj = gallery;
    gallery.init();
    //    photoswipe_obj.listen('afterChange', function () {
    //        img_sequence('.pswp__item');
    //
    //        if ($(document).find('#thinglink').length == 0) {
    //            $(document).find('body').append('<div id="thinglink"><script>__tlid = "45116017210294279";setTimeout(function(){(function(d,t){var s=d.createElement(t),x=d.getElementsByTagName(t)[0];s.type="text/javascript";s.async=true;s.src="//cdn.thinglink.me/jse/embed.js";x.parentNode.insertBefore(s,x);})(document,"script");},0);</script></div>')
    //        }
    //
    //    });
}

function update_magazine_access_time() {
    if (Cookies.get('radius_login_token') && !firstLastAccess) {
        token = Base64.decode(Cookies.get('radius_login_token'));
        token = token.substring(0, token.length - 14);
        $.ajax({
            url: "https://api.loginradius.com/identity/v2/auth/account?apikey=" + CN_LR_apiKey,
            contentType: "application/json",
            crossDomain: true,
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + token ); }
        }).done(function(profile) {
            $.ajax({
                url: '//sso.cnidigital.in/magazine-api.php',
                type: 'POST',
                data: {
                    "ID": profile.ID,
                    "Uid": profile.Uid,
                    "SiteName": "vogue",
                    "CustomFields": profile.CustomFields
                },
                crossDomain: true
            }).done(function() {
                /* webengage 18 */
                //webengage_user_access_push(profile);
            });
        });
        firstLastAccess = true;
    }
}

function detect_photoswipe_direction(current, updated, total) {
    var direction;
    if (current == total && updated == 1) {
        // next
        direction = 'right';
    } else if (updated == total && current == 1) {
        // prev
        direction = 'left';
    } else if (current < updated) {
        // next
        direction = 'right';
    } else if (current > updated) {
        // prev
        direction = 'left';
    }
    return direction;
}

function pinterest_embed(page = '') {
    var htm = '<div id="pinit_main"><script async defer src="//assets.pinterest.com/js/pinit_main.js" type="text/javascript" data-pin-build="doBuild"></script></div>';
    var htm2 = '<div id="pinit_main2"><script async defer src="//platform.instagram.com/en_US/embeds.js" ></script></div>';
    var htm3 = '<div id="pinit_main3"><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>';
    $(document).find('#pinit_main').remove();
    $(document).find('#pinit_main2').remove();
    $(document).find('#pinit_main3').remove();
    $(document).find('body').append(htm);
    $(document).find('body').append(htm2);
    $(document).find('body').append(htm3);
    setTimeout(function() {
        try {
            // twttr.widgets.load()
            window.instgrm.Embeds.process();
            twttr.widgets.load();
            googletag.pubads().refresh([gptAd]);
        } catch (err) {}
    }, 1500);
    setTimeout(function() {
        try {
            if (page != '') {
                $('#flipbook .p' + (page - 1) + ' .magazine-embed').css('opacity', 1);
                $('#flipbook .p' + page + ' .magazine-embed').css('opacity', 1);
                $('#flipbook .p' + (page + 1) + ' .magazine-embed').css('opacity', 1);
            }
        } catch (err) {}
    }, 3000);
}

function load_photoswipe_flipbook(items, open_element) {
    $('.magazine_issues_wrapper .nav.nav-tabs ').css('z-index', '9');
    $('.photoswipe_flipbook').css('opacity', '0');
    var pswpElement = document.querySelectorAll('.photoswipe_flipbook')[0];
    var options = {
        history: true,
        fullscreenEl: false,
        loop: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        tapToToggleControls: false,
        captionEl: true,
        addCaptionHTMLFn: function(item, captionEl, isFake) {
            var item_html = item.html;
            setTimeout(function() {
                if (item.html != '') {
                    captionEl.children[0].innerHTML = item_html;
                    img_sequence('.main_cover_img_carousel_wrap_photoswipe');
                }
            }, 100);
            return true;
        },
    };
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    photoswipe_obj_paid = gallery;
    gallery.init();
    setTimeout(function() {
        photoswipe_obj_paid.goTo(parseInt(open_element));
        $('.photoswipe_flipbook').css('opacity', '1');
    }, 600);
    var total_items = photoswipe_obj_paid.options.getNumItemsFn();
    photoswipe_obj_paid.listen('afterChange', function() {
        //$(document).find('.pswp__caption__center').html('');
        var direction = detect_photoswipe_direction(open_element, photoswipe_obj_paid.getCurrentIndex(), total_items);
        open_element = photoswipe_obj_paid.getCurrentIndex();
        photoswipe_arrow_click(direction);
        clearInterval(slider);
        try {
            pinterest_embed();
        } catch (err) {}
        setTimeout(function() {
            try {
                $('.main_cover_img_carousel_wrap_photoswipe  .magazine-embed').css('opacity', 1);
            } catch (err) {}
        }, 6500);
    });
    try {
        photoswipe_obj_paid.listen('close', function() {
            loader_wrap(false);
            photoswipe_obj_paid.destroy();
        });
    } catch (err) {}
}
$(document).on('click', '.flipbook_wrapper .main_cover_img_carousel_wrap', function() {
    if (!isCnMobile) {
        $(this).parents('div').find('.click_to_zoom').trigger('click');
    }
});

function photoswipe_arrow_click(direction) {
    var eventLabelTitle;
    if (direction == 'right') {
        eventLabelTitle = isssueName;
    }
    if (direction == 'left') {
        eventLabelTitle = isssueName;
    }
    gtmMagazineArrows(eventLabelTitle, direction + " Arrow");
}
$(document).on('click', '.owl-item .main_cover_image', function() {
    //    $.ajax({
    //        url: action_url + '?action=photoswipe_flipbook',
    //        type: 'POST',
    //        data: {
    //            "issue_id": issue_id
    //        },
    //        success: function (data) {
    //            data = JSON.parse(data);
    //            load_photoswipe_flipbook(data, 0);
    //        }
    //    });
    if (mag_subscription == 'subscribed') {
        //$(document).find('.mobile_landing_carousel .owl-item .mobile_featured_li .owl_2_img[data-page-index="1"]').trigger('click');
        var obj = $(this);
        // stop_video();
        var issue_id = obj.data('issue-id');
        var obj_dp = 1;
        //   loader_wrap(true);
        $.ajax({
            url: action_url + '?action=photoswipe_flipbook',
            type: 'POST',
            //async: false,
            data: {
                "issue_id": issue_id
            },
            success: function(data) {
                data = JSON.parse(data);
                load_photoswipe_flipbook(data, obj_dp);
            }
        });
    } else {
        load_photoswipe_freebook($(this));
    }
    // load_photoswipe_freebook($(this));
});

function img_sequence(parent) {
    var obj = parent + ' .main_cover_img_carousel';
    var total_imgs = $(obj).find('img').length;
    var frame_speed = 400;
    var type = 'abnormal'; // normal, abnormal
    if (parent == '.first_portion.div_1') {
        frame_speed = parseInt($('.main_cover_img_carousel_wrap').attr('data-frame_speed'));
    } else {
        frame_speed = parseInt($(obj).find('.data_frame').data('frame_speed'));
    }
    if (frame_speed > 999) {
        $(obj).find('img').addClass('crossfade');
    }
    if ($(obj).hasClass('init') == false) {
        if (total_imgs > 1) {
            var active = 1;
            var direction;
            slider = setInterval(function() {
                if (type == 'abnormal') {
                    $(obj).find('img').removeClass('active');
                    $(obj).find('img:nth-child(' + active + ')').addClass('active');
                    if (active == (total_imgs)) {
                        direction = 'reverse';
                    }
                    if (active == 1) {
                        direction = 'forward';
                    }
                    if (direction == 'forward') {
                        active++;
                    }
                    if (direction == 'reverse') {
                        active--;
                    }
                    if (active == 0) {
                        active = 1;
                    }
                } else {
                    $(obj).find('img').removeClass('active');
                    $(obj).find('img:nth-child(' + active + ')').addClass('active');
                    if (active == (total_imgs)) {
                        active = 0;
                    }
                    active++;
                }
            }, frame_speed);
        }
    }
    $(obj).addClass('init');
}

function goto_href(url) {
    if (url != '' && url != 'undefined' && url != undefined) {
        $("<a>").attr("href", url).attr("target", "_blank")[0].click();
        //location.href = url;
    }
}
$(document).on('click', ".close_flipbook", function(e) {
    $(document).find('.feature_unit_title').trigger('click');
    disable_fullScreen();
    called = 0;
})

function mag_embed_opacity(page, opacity) {
    $('#flipbook .p' + (page - 1) + ' .magazine-embed').css('opacity', opacity);
    $('#flipbook .p' + page + ' .magazine-embed').css('opacity', opacity);
    $('#flipbook .p' + (page + 1) + ' .magazine-embed').css('opacity', opacity);
}

function check_if_embed(obj) {
    var htm = '';
    obj = obj.find('.magazine-embed');
    if (obj.data('embed')) {
        obj.find('.magazine-embed-inner').remove();
        htm += '<div class="magazine-embed" ><div class="magazine-embed-inner">';
        htm += obj.data('embed');
        htm += '</div></div>';
    }
    obj.html(htm);
}

function show30Day(status) {
    var email = getCookie('radius_login_email');
    //if (email == '' || mag_subscription != 'subscribed')
    {
        if (status == true) {
            if (!$('.day30_popup').is(":visible")) {
                gtmMagazineHomeSubscribe("30 days free popup", "Impression");
            }
            $(document).find('.day30_popup').fadeIn();
            setTimeout(function() {
                $(document).find('.day30_popup a').addClass('animated');
                $(document).find('.day30_popup a').addClass('pulse');
            }, 1800);
            setTimeout(function() {
                $(document).find('.day30_popup').fadeOut();
            }, 7000);
        } else {
            $(document).find('.day30_popup').fadeOut();
        }
    }
}

function date_obj(str_date) {
    //    var mydate = new Date(str_date);
    //    //return mydate.toDateString();
    //    return mydate;
    return new Date(str_date);
    //return new Date(str_date).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}

function webengage_user_access_push(profile) {
    var current_domain = window.location.hostname;
    var brand = ''; // vogue = 0, gq = 1, cnt = 2, ad = 3
    var title = '';
    var params = {};
    if (current_domain.search("vogue.in") >= 0) {
        brand = 0;
        title = 'vogue';
    }
    if (current_domain.search("gqindia.com") >= 0) {
        brand = 1;
        title = 'gq';
    }
    if (current_domain.search("cntraveller.in") >= 0) {
        brand = 2;
        title = 'cnt';
    }
    if (current_domain.search("architecturaldigest.in") >= 0) {
        brand = 3;
        title = 'ad';
    }
    var first_access_array = profile.CustomFields.mag_first_access;
    var last_access_array = profile.CustomFields.mag_last_access;
    var first_access;
    var last_access;
    try {
        first_access = first_access_array.split(",");
        last_access = last_access_array.split(",");
    } catch (err) {
        first_access = first_access_array;
        last_access = last_access_array;
    }
    var first_access_str = first_access[brand];
    var last_access_str = last_access[brand];
    first_access_str = date_obj(first_access_str);
    last_access_str = new Date();
    console.log(first_access_str);
    console.log(last_access_str);
    //
    //    var first_access_date = new Date(first_access[brand]);
    //    first_access[brand] = first_access_date.toDateString();
    //
    //
    //
    //    var last_access_date = new Date(last_access_str);
    //    last_access_str = last_access_date.toDateString();
    if (title == 'vogue') {
        params.vogue_first_access = first_access_str;
        params.vogue_last_access = last_access_str;
    }
    if (title == 'gq') {
        params.gq_first_access = first_access_str;
        params.gq_last_access = last_access_str;
    }
    if (title == 'cnt') {
        params.cnt_first_access = first_access_str;
        params.cnt_last_access = last_access_str;
    }
    if (title == 'ad') {
        params.ad_first_access = first_access_str;
        params.ad_last_access = last_access_str;
    }
    console.log(isLoggedIn + ' isLoggedIn');
    console.log(params + ' params');
    //if (isLoggedIn) webengage.user.setAttribute(params);
}

function setHeader(xhr) {
    xhr.setRequestHeader('x-api-key', 'cbuMXoJGrO9vS4sOp04LM5zPLBrvensN6b5wsZqH');
}