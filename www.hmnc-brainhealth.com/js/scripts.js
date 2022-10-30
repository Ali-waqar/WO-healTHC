/**
 * custom javascript/jquery codes
 * Date: 2020
 * Author: Sascha Barth
 */

"use strict";

// Add function to jQuery
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// end Add function to jQuery

$(document).ready(function() {

    // ignore "hash" links
    $('a[href="#"]').on('click', function() {
        return false;
    });

    // end ignore "hash" links

    // initialize bxslider (for options see: https://bxslider.com/options/)
    $('.slider').bxSlider({
        settingname: 'setting-value'
    });

    // end initialize bxslider

    // mask e-Mail Addresses
    $('a[name="mailMask"]').each(function() {
        var eMailAddress = $(this).text().replace('[at]', '@').replace('[dot]', '.');
        $(this).attr('href', 'mailto:' + eMailAddress);
        $(this).text(eMailAddress);
    });

    // end mask e-Mail Addresses

    // scroll to animation
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        // "fake" links handling
        if ($(this).attr('href') == '#') {
            return false;
        }

        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            history.pushState(null, null, target);
        });
    });

    var siteHash = window.location.hash;
    if (siteHash.length > 0) {
        $('html, body').stop().animate({
            'scrollTop': $(siteHash).offset().top
        }, 800, 'swing');
    }

    // end scroll to animation

    // mobile-nav
    $(document).on('click', '#mobile-nav, #close-nav', function() {
        $('#primary-nav').toggleClass('active');
    });

    // end mobile-nav

    // to top button visibility
    /*
    $(document).on('scroll', function() {
        let vpHeight = $(window).height();
        let scrollPos = $(document).scrollTop();

        if(scrollPos > vpHeight) {
            $('#to-top-btn').addClass('active');
        } else {
            $('#to-top-btn').removeClass('active');
        }
    });
     */

    // end to top button

    // sticky nav
    $(window).on('scroll', function() {
        if (window.scrollY > 10) {
            $('header').addClass('sticky');
        } else {
            $('header').removeClass('sticky');
        }
    });

    // end sticky nav


    // parallax effect on elements with class "parallax"
    $(window).on('scroll', function() {
        $('.parallax').each(function() {
            //var val = parseInt($(this).css('background-position-y')) - 0.01 * (window.scrollY + window.innerHeight - parseInt($(this).offset().top));
            //$(this).css('background-position', '0px ' + val + 'px');
        });
    });

    // end parallax effect

    // flipeffect for team
    /*
    $('.team-link').on('click', function (e) {
        e.preventDefault();
        var elemID = $(this).attr('href');
        $('#' + elemID + ' .inner-details').removeClass('animate__zoomOut');
        $('#' + elemID).addClass('show-item');
        $('#' + elemID + ' .inner-details').addClass('animate__zoomIn');
        $('#' + elemID).css('top', window.scrollY);
        $('.site-wrapper').addClass('blackout');
    });

    $('.close-team').on('click', function () {
        var elemID = $(this).data('id');
        $('#' + elemID + ' .inner-details').removeClass('animate__zoomIn');
        $('#' + elemID + ' .inner-details').addClass('animate__zoomOut');
        setTimeout(function () {
            $('#' + elemID).removeClass('show-item');
        }, 500);
        //$('#' + elemID + ' .inner-details').removeClass('animate__zoomOut');
        $('.site-wrapper').removeClass('blackout');
    });
     */

    // end flipeffect for team

    // fade in/out News
    if ($('body').hasClass('newsroom')) {
        var index = 1;
        $('.news-elem:not(".last-elem")').each(function() {
            if (index > 5) {
                $(this).parent('.col-12').addClass('news-hidden').hide();
            }
            index++;
        });
    }

    $('#loadMore').on('click', function() {
        $('.news-hidden').each(function() {
            $(this).fadeIn(500);
            $('#loadMore').hide();
        });
    });

    // end fade in/out News

    // project bars animation
    var flag = 'false';
    var flag_1 = 'false';
    var flag_2 = 'false';
    var flag_3 = 'false';
    $(window).on('scroll load', function() {
        if ($('body').hasClass('program-overview') && flag_1 == 'false') {
            if ($('.ketabon-bar').isInViewport()) {
                $('.ketabon-bar span').addClass('in-view');
                flag_1 = 'true';
            }
        }

        if ($('body').hasClass('program-overview') && flag_2 == 'false') {
            if ($('.nelivabon-bar').isInViewport()) {
                $('.nelivabon-bar span').addClass('in-view');
                flag_2 = 'true';
            }
        }

        if ($('body').hasClass('program-overview') && flag_3 == 'false') {
            if ($('.cortibon-bar').isInViewport()) {
                $('.cortibon-bar span').addClass('in-view');
                flag_3 = 'true';
            }
        }
    });


    $(window).on('scroll load', function() {
        if ($('body').hasClass('ketabon') && flag == 'false') {
            if ($('.ketabon-bar').isInViewport()) {
                $('.ketabon-bar span').addClass('in-view');
                flag = 'true';
            }
        }
    });

    $(window).on('scroll load', function() {
        if ($('body').hasClass('nelivabon') && flag == 'false') {
            if ($('.nelivabon-bar').isInViewport()) {
                $('.nelivabon-bar span').addClass('in-view');
                flag = 'true';
            }
        }
    });

    $(window).on('scroll load', function() {
        if ($('body').hasClass('cortibon') && flag == 'false') {
            if ($('.cortibon-bar').isInViewport()) {
                $('.cortibon-bar span').addClass('in-view');
                flag = 'true';
            }
        }
    });

    // end project bars animation

});

// Bootstrap Form Validation
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    // ajax for receiving form
                    $.ajax({
                        type: 'post',
                        url: '../send-mail.php',
                        data: $(this).serialize(),

                        success: function(response) {
                            response = JSON.parse(response, true);
                            if (response[0] == 1) {
                                $('#submit-btn').prop('disabled', true);
                                $('#form-response').html('<div class="alert alert-success">' + response[1] + '</div>');
                                $('form.was-validated').removeClass('was-validated');
                            } else {
                                $('#form-response').html('<div class="alert alert-warning">' + response[1] + '</div>');
                                console.log('Send Mail Error: ' + response[2]);
                                $('form.was-validated').removeClass('was-validated');
                            }
                        },
                        fail: function() {
                            $('#form-response').append('<div class="alert alert-danger">Something went terribly wrong! Please contact support...</div>');
                        }
                    });
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();