(function ( $ ) {

    /* Corousel */
    // var swiper = new Swiper('.swiper-container', {
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'custom',
    //         clickable: true,
    //         renderCustom: function (swiper, current, total) {
    //             var names = [];
    //             $(".welcome .swiper-slide").each(function(i) {
    //                 names.push($(this).data("name"));
    //             });
    //             var text = "<span>";
    //             for (var i = 1; i <= total; i++) {
    //                 if (current != i) {
    //                     text += "<span class='main_slider_label swiper-pagination-clickable' data-index='"+i+"'>" + names[i-1] + "</span>";
    //                 } else {
    //                     text += "<span class='main_slider_label swiper-pagination-clickable active_label' data-index='"+i+"'>" + names[i-1] + "</span>";
    //                 }
    //
    //             }
    //             text += "</span>";
    //             return text;
    //         }
    //     }
    // });



    // $('.welcome .main_slider_label').on('click', function(e){
    //     var clicked = $(this);
    //     var sliderTarget = $(clicked).data('index');
    //     if(!$(clicked).hasClass('active_label'))
    //     {
    //         swiper.slideTo(sliderTarget-1);
    //     }
    // });

    $( document ).find('.swiper-container').each(function (index) {
        var $this = $(this);
        var swiperTabs = $(this).find('.swiper-pagination');
        var blockSwiper = new Swiper($this, {
            pagination : {
                el: swiperTabs,
                clickable: true,
                type: 'custom',
                // slidesPerView: 1,
                loop: true,
                renderCustom: function (swiper, current, total) {
                    var names = [];
                    $this.find(".swiper-slide").each(function (i) {
                        names.push($(this).data("name"));
                    });
                    var text = "<div class='row'>";
                    for (var i = 1; i <= total; i++) {
                        if (current != i) {
                            text += "<div class=' col-sm-3'><div class='slider-tab' data-index='" + i + "'><span>0"+ i +"</span>" + names[i - 1] + "</div></div>";
                        } else {
                            text += "<div class=' col-sm-3'><div class='slider-tab active' data-index='" + i + "'><span>0"+ i +"</span>" + names[i - 1] + "</div></div>";
                        }
                    }
                    text += "</div>";
                    return text;
                },
            },
            on: {
                transitionEnd: function () {
                    $('.slider-tab').on('click', function () {
                        var target = $(this).data('index');
                        blockSwiper.slideTo(target-1);
                        return;
                    })
                }
            }
        });

        $('.slider-tab').on('click', function () {
            var target = $(this).data('index');
            blockSwiper.slideTo(target-1);
            return;
        })

    });

    // Шапка при скроле
    $(window).on('scroll', function(){
        if( $(this).scrollTop() > 0 ) {
            $('.header').addClass('inverse');
        }
        else {
            $('.header').removeClass('inverse');
        }
    });

})( jQuery );