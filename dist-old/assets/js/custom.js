$(document).ready(function (e) {
    var click = 0;
   

    function setMenuBar() {
        $(document).on('click', '.moveright',function(e)
            //$('.moveright').on('click', function (e) 
            {
                if (click == 0) {
                    $('app-root').find('.parentClass').addClass('col-md-12');
                    $('app-root').find('.parentClass').removeClass('col-md-9');
                    $('app-root').find('.sidebar').css('right', '-25%');
                    

                    click = 1;
                }
                else if (click == 1) {
                    $('app-root').find('.parentClass').addClass('col-md-9');
                    $('app-root').find('.parentClass').removeClass('col-md-12');
                    $('app-root').find('.sidebar').css('right', '0px');
                    click = 0;
                }
                $(this).find('i').toggleClass('fa-angle-right fa-angle-left');
            });

            if ($(window).width() < 768) {
                var click1 = 0;
                $(document).on('click', '.moveright',function(e) {
                    if (click1 == 1) {
                        $('app-root').find('.sidebar').css('right', '-100%');
                        click1 = 0;
                    }
                    else if (click1 == 0) {
                        $('app-root').find('.sidebar').css('right', '0px');
                        click1 = 1;
                    }

                    $(this).find('i').toggleClass('fa-angle-left fa-angle-right');
                });
            }

            if ($(window).width() >= 768 && $(window).width() < 1000) {
                var click1 = 0;
                $(document).on('click', '.moveright',function(e) {
                    if (click1 == 1) {
                        $('app-root').find('.sidebar').css('right', '-100%');
                        click1 = 0;
                    }
                    else if (click1 == 0) {
                        $('app-root').find('.sidebar').css('right', '0px');
                        click1 = 1;
                    }

                    $(this).find('i').toggleClass('fa-angle-right fa-angle-left');
                });
            }
    };
    setMenuBar();

    $(window).resize(function() {
        setMenuBar();
    });

    



    /*======FIXED HEADER ON SCROLL======*/
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 1) {
            $(".navbar").addClass("fixed");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".navbar").removeClass("fixed");
        }
    });
    $(document).ready(function(){
        
    });
});



    

var extUtilityObject = (function() {

    return {
      applyRightArrowCss: function() {
          //console.log('apply right arrow css');
        var currUrl = window.location.href;
        if (currUrl.indexOf('/video') != -1)
        {
            if ($(window).width() > 767) {
                //$('app-root').find('.attr-nav').css('margin-right', '55px');
                //$('app-root').find('.header-social').css('right', '83px');
            }
            else{
                $('app-root').find('.attr-nav').css('margin-right', '20px');
                $('app-root').find('.header-social').css('right', '18px');
            }
            
        }
      },
      initializeDropDowns: function() {
        $('.user_drop').click( function(event){
            event.stopPropagation();
            $('.showme').toggle();
        });

        $(document).click( function(){
            $('.showme').hide();
        });
        $(document).click( function(){
            $('#autoSearchDrop').hide();
        });
     }
    }

   
  })(extUtilityObject||{})