function startCarousel (carousel) {
    var itemClassName = "carousel_photo";
    var items = carousel.querySelectorAll('.' + itemClassName);
    var totalItems = items.length;
    var slide = 0;
    var moving = true;
    var interval;
    var playing = true;
    var pauseButton = document.getElementsByClassName("carousel_button--pause")
    var playButton = document.getElementsByClassName("carousel_button--play")

    // Set classes
    function setInitialClasses() {
        // Flaggs the next, previous and current items.
        // Assumes > 3 items. This is checked in moveCarouselTo(). 
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");
    }

    // Set event listeners to check if buttons are clicked or left/right arrow keys are pressed
    function setEventListeners() {
        var next = carousel.querySelector('.carousel_button--next');
        var prev = carousel.querySelector('.carousel_button--prev');
        var pause = carousel.querySelector('.carousel_button--pause');
        var play = carousel.querySelector('.carousel_button--play');

        next.addEventListener('click', moveNext);
        prev.addEventListener('click', movePrev);
        pause.addEventListener('click', pausePlay);
        play.addEventListener('click', pausePlay);
        addEventListener('keydown', (event) => {
            if (event.keyCode === 39) { moveNext(); } 
            else if (event.keyCode === 37) { movePrev(); }
            else if (event.keyCode === 80) { pausePlay(); }
        });
    }

    // Automatically looping through pictuers 
    function tick() {
        moveNext();
    }
    // Stop/start autoplay  
    function pausePlay() {
        if (playing) {
            clearInterval(interval);
            pauseButton[0].style.visibility = 'hidden';
            playButton[0].style.visibility = 'visible';
        } else {
            pauseButton[0].style.visibility = 'visible';
            playButton[0].style.visibility = 'hidden';
            interval = setInterval(tick, 2000);
        }
        playing = !playing;
    }
    
    // Next picture navigation handler
    function moveNext() {
        // check if moving
        if (!moving) {

            // count through slides but return to 0 if on last slide.
            if (slide === (totalItems - 1)) {
                slide = 0;
            } else {
                slide++;
            }

            // Update slide
            moveCarouselTo(slide);
        }
    }

    // Previouse picture navigation handler
    function movePrev() {
        // check if moving
        if (!moving) {

            // count down through slides but go to last slide if on 0.
            if (slide === (0)) {
                slide = totalItems - 1;
            } else {
                slide--;
            }

            // Update slide
            moveCarouselTo(slide);
        }
    }

    function disableInteraction () {
        // 'moving' = true for duration of transmittion (300ms)
        moving = true;
        // setTimeout exicutes function once after given time.
        setTimeout(function() {
            moving = false
        }, 300);
    }

    function moveCarouselTo(slide) {
        
        // Only allow interaction if carousel is not moving
        if (!moving) {
            
            disableInteraction();

            var newPrevious = slide - 1;
            var newNext = slide + 1;
            var oldPrevious = slide -2;
            var oldNext = slide + 2;

            // If more that three items
            if ((totalItems) > 3) {

                // Check if new slides are out of bounds
                if (newPrevious <= 0) {
                    oldPrevious = (totalItems - 1);
                } else if (newNext >= (totalItems -1)) {
                    oldNext = 0;
                }

                // Checks and updates if slide is at the beginning/end
                if (slide === 0) {
                    newPrevious = (totalItems -1);
                    oldPrevious = (totalItems -2);
                } else if (slide === (totalItems - 1)) {
                    newPrevious = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }

                // Reset old next/prev elements to default classes
                items[oldPrevious].className = itemClassName;
                items[oldNext].className = itemClassName;

                // Add new classes
                items[newPrevious].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active";
                items[newNext].className = itemClassName + " next";
            }
        }
    }

    function initCarousel() {
        setInitialClasses();
        setEventListeners();
        moving = false;
        interval = setInterval(tick, 2000);
    }

    initCarousel();
}

startCarousel(document.querySelector('#carousel1'));
startCarousel(document.querySelector('#carousel2'));