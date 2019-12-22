const throttle = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    if ( !timeout ) timeout = setTimeout( later, wait );
    if (callNow) func.apply(context, args);
  };
}

const contactToggle = document.getElementById('site_contact_toggle');
const navToggle = document.getElementById('site_nav_toggle');
const headerNav = document.getElementById('site_nav');
const contactClose = document.getElementById('site_drawer_close');

navToggle.addEventListener('click', function(){
    headerNav.classList.add('open');
});

contactToggle.addEventListener('click', function(){
    headerNav.classList.add('open');
});

contactClose.addEventListener('click', function(){
    headerNav.classList.remove('open');
});

function addMobile() {
    console.log('hi');
    if (window.matchMedia('(max-width: 640px)').matches) {
        document.body.classList.add('mobile');
    }
    else {
        document.body.classList.remove('mobile');
    }
}

addMobile();

window.addEventListener('resize', throttle(addMobile, 150));