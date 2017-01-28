var carousel = function(wrapperClass) {
    var carouselJQName = '.' + wrapperClass + ' ';
var carouselStoreWidth = getCarouselWidth();
var currentPosition = 0;
var productsShowOnCarousel = 4;
var currentFirstItemNumber = 0;
var numOfProducts =  $(carouselJQName + '.carousel-wrapper .carousel-item').length;
var productsShowOnCarousel = 3;

function getCarouselWidth() {
    return $('.carousel' + carouselJQName).outerWidth();
}
function getNumberOfProductsToShowOnRollBack() {
    return numOfProducts - productsShowOnCarousel;
}
function getItemWidth() {
    return parseInt($(carouselJQName + '.carousel-item').css('width').match(/\d+/g));
}
function getItemMargin() {
    return parseInt($(carouselJQName + '.carousel-wrapper .carousel-item').css('margin-left').match(/\d+/g));
}
function getCurrentFirstItemNumber() {
    return currentFirstItemNumber;
}
function getTotalItemWidth() {
    return getItemWidth() + getItemMargin();
}
function changeCarouselPosition(pushFromRight) {
    
    $(carouselJQName + '.carousel-wrapper').css('transform', 'translateX(' + pushFromRight + 'px)');
}
function calculateMarginLeft(carouselWidth, itemWidth, productsShowOnCarousel, divideBy) {
    return (carouselWidth - itemWidth * productsShowOnCarousel ) / divideBy;
}
function setWidthsClosure(carouselWidth, itemWidth) {
    return function (productsShowOnCarousel, divideBy) {
        return (carouselWidth - itemWidth * productsShowOnCarousel ) / divideBy;
    }
}
function setcurrentFirstItemNumber(value) {
    currentFirstItemNumber = value;
}
function setProductsShowOnCarousel(value) {
    productsShowOnCarousel = value;
}
function changeCarouselSize(marginLeft, moveToRightFor) {
    $(carouselJQName + '.carousel-item').css('margin-left', marginLeft );
    $(carouselJQName + '.carousel-wrapper').css('left', -moveToRightFor);
    
}
function howManyItemsOnPage(numberOfItems, calcMarginFunc) {
    switch (numberOfItems) {
        case 1:
            setProductsShowOnCarousel(1);
            var marginLeft = calcMarginFunc(productsShowOnCarousel, 2);
            changeCarouselSize(marginLeft, 0);  
        break;
        case 2:
            setProductsShowOnCarousel(2);
            var marginLeft = calcMarginFunc(productsShowOnCarousel, 2);
            changeCarouselSize(marginLeft, marginLeft/2);
        break;
        case 3:
            setProductsShowOnCarousel(3);
            var marginLeft = calcMarginFunc(productsShowOnCarousel, 2);
            changeCarouselSize(marginLeft, marginLeft);
        break;
        case 4:
            setProductsShowOnCarousel(4);
            var marginLeft = calcMarginFunc(productsShowOnCarousel, 3);
            changeCarouselSize(marginLeft, marginLeft);
        break;
    }
}
function resizeCarousel() {
    var carouselWidth = getCarouselWidth();
    var itemWidth = getItemWidth();
    var calcMargin = setWidthsClosure(carouselWidth, itemWidth);
    
    if (carouselWidth < 560) {
        
        howManyItemsOnPage(1, calcMargin);
        
    } else if (carouselWidth >= 560 && carouselWidth < 850) {
        
        howManyItemsOnPage(2, calcMargin);
        
    } else if (carouselWidth >= 850 && carouselWidth < 1100) {
        
        howManyItemsOnPage(3, calcMargin);
        
    } else if (carouselWidth >= 1100) {
        
        howManyItemsOnPage(4, calcMargin);
        
    }

    var resizeFirstImagePosition = -1 * getCurrentFirstItemNumber() * getTotalItemWidth();
    if (resizeFirstImagePosition < -1*getNumberOfProductsToShowOnRollBack()*getTotalItemWidth() ) { 
        currentPosition = -1*getNumberOfProductsToShowOnRollBack() * getTotalItemWidth();
    } else {
        currentPosition = resizeFirstImagePosition;
    }
    
    changeCarouselPosition(currentPosition);
    
}
function navigatePrevious() {
    
    var countWhereToMoveSlider = currentPosition + getTotalItemWidth();
    
    if (+countWhereToMoveSlider > 0) { 
        currentPosition = parseInt( -1* getNumberOfProductsToShowOnRollBack() * getTotalItemWidth() );
        changeCarouselPosition(currentPosition);
        setcurrentFirstItemNumber(getNumberOfProductsToShowOnRollBack());
    } else {
        currentPosition = countWhereToMoveSlider; 
        changeCarouselPosition(currentPosition);
        setcurrentFirstItemNumber(getCurrentFirstItemNumber()-1);
    }
}
function navigateForward() {
     var countWhereToMoveSlider = currentPosition - getItemWidth() - getItemMargin();
    
    if (+countWhereToMoveSlider <  -1* getNumberOfProductsToShowOnRollBack() * getTotalItemWidth() ) {
        currentPosition = 0;
        changeCarouselPosition(currentPosition);
        setcurrentFirstItemNumber(0);
    } else {
        currentPosition = countWhereToMoveSlider;
        changeCarouselPosition(currentPosition);
        setcurrentFirstItemNumber(getCurrentFirstItemNumber()+1);
    }
}

function onResize() {
    if (carouselStoreWidth != getCarouselWidth()) {
        resizeCarousel();
        carouselStoreWidth = getCarouselWidth();
    }
     
}

resizeCarousel();

$(carouselJQName + '.nav-previous').on('click', navigatePrevious);
$(carouselJQName + '.nav-forward').on('click', navigateForward);
$(window).on('resize', onResize);

}

function sliderOnPage() {
    $(function() {
        $( "#slider-range" ).slider({
          range: true,
          min: 0,
          max: 1000,
          values: [ 0, 1000 ],
          slide: function( event, ui ) {
            $( "#price-amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
              console.log(ui);
          }
        });
        $( "#price-amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +" - $" + $( "#slider-range" ).slider( "values", 1 ) );
    })
}







// select-box windows 
$('.select-box-window').on('click', function(e) {  
    e.preventDefault();
    
    var selectBox = $(this).closest('.select-box');
    var state = selectBox.attr('data-state');
    
    if (state == 'open') {
        selectBox.attr('data-state', 'hidden');
        $(this).next('.select-box-dropdown').removeClass('show');
    } else {
        $(this).next('.select-box-dropdown').addClass('show');
        selectBox.trigger('focus');
        selectBox.attr('data-state', 'open');
    }
    
});

$('.select-box-dropdown, .select-box-window').mousedown(function() {
    return false;
});

$('.select-box').on('blur', function() {
        $(this).find('.select-box-dropdown').removeClass('show');
        $(this).attr('data-state', 'blur');
}); 

$('.select-box-dropdown li span, .select-box-dropdown:not(.links-dont-hide-dropdown) a').on('click', function() {
    var text = $(this).html();
    $(this).closest('.select-box').find('.select-box-selected').html(text);
    $(this).closest('.select-box-dropdown').removeClass('show');
    
    $(this).closest('.select-box').trigger('blur');
    $(this).closest('.select-box').attr('data-state', 'hidden');
    
});



// handling accordion 's
var accordion_item = '.accordion-item',
    accordion_head = '.accordion-openable .accordion-title',
    accordion_active = 'accordion-active';

function toggleAccordion() {
    $(this).parent(accordion_item).toggleClass(accordion_active);
    $(this).parent(accordion_item).siblings().removeClass(accordion_active);
}

$(accordion_head).on('click', toggleAccordion);


// handling responsive menu
$('#hamburger').on('click', function() {
    $('.menu').slideToggle();
})

// handling responsive sidebar
$('.sidebar-activator').on('click', function() {
    $('.sidebar').slideToggle();
    
    $('.sidebar-activator').toggleClass('sidebar-activator-up');
    if ($(this).hasClass('sidebar-activator-up')) {
        $(this).text('Hide filters');
    } else {
        $(this).text('Filter results');
    }

})

//quantity buttons
function quantityButtons() {
    $('.quantity-plus').click(function(e){
        e.preventDefault();
        fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal)) {
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            $('input[name='+fieldName+']').val(0);
        }
        
    });
    $(".quantity-minus").click(function(e) {
        e.preventDefault();
        fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            $('input[name='+fieldName+']').val(0);
        }
    });
}

//tabs 
function tabs() {
    $('.tabs-nav-link').on('click', function() {
        var goto = $(this).attr('data-goto');
        $(this).siblings().removeClass('tabs-active');
        $(this).addClass('tabs-active');
        
        $(goto).siblings().removeClass('show');
        $(goto).addClass('show');
    });
}


