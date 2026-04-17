(function(){
  var year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();
})();

(function(){
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('siteNav');
  if(!btn || !nav) return;

  function closeMenu(){
    btn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav--open');
  }

  function toggleMenu(){
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('nav--open', !open);
  }

  btn.addEventListener('click', function(e){
    e.preventDefault();
    toggleMenu();
  });

  nav.addEventListener('click', function(e){
    if(e.target && e.target.tagName === 'A') closeMenu();
  });

  document.addEventListener('click', function(e){
    if(!nav.classList.contains('nav--open')) return;
    if(nav.contains(e.target) || btn.contains(e.target)) return;
    closeMenu();
  });

  window.addEventListener('resize', function(){
    if(window.innerWidth >= 860) closeMenu();
  });
})();

(function(){
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.filter-chip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.service-card'));
  if(!filterButtons.length || !cards.length) return;

  filterButtons.forEach(function(button){
    button.addEventListener('click', function(){
      var filter = button.getAttribute('data-filter');

      filterButtons.forEach(function(item){ item.classList.remove('is-active'); });
      button.classList.add('is-active');

      cards.forEach(function(card){
        var category = card.getAttribute('data-category');
        var show = filter === 'all' || category === filter;
        card.hidden = !show;
      });
    });
  });
})();

(function(){
  var toggles = Array.prototype.slice.call(document.querySelectorAll('.service-toggle'));
  if(!toggles.length) return;

  toggles.forEach(function(toggle){
    toggle.addEventListener('click', function(){
      var card = toggle.closest('.service-card');
      if(!card) return;
      var more = card.querySelector('.service-more');
      if(!more) return;

      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.textContent = expanded ? 'Ver detalhes' : 'Esconder detalhes';
      more.hidden = expanded;
      card.classList.toggle('service-card--open', !expanded);
    });
  });
})();

(function(){
  var img = document.getElementById('profilePhoto');
  var wrap = document.getElementById('profilePhotoWrap');
  if(img && wrap){
    function apply(){
      if(img.complete && img.naturalWidth > 0){
        wrap.classList.add('has-photo');
      } else {
        wrap.classList.remove('has-photo');
      }
    }
    img.addEventListener('load', apply);
    img.addEventListener('error', apply);
    apply();
  }

  var lightbox = document.getElementById('photoLightbox');
  var close = document.querySelector('.lightbox__close');
  if(!wrap || !lightbox || !close) return;

  wrap.addEventListener('click', function(){
    lightbox.hidden = false;
    document.body.classList.add('modal-open');
  });

  close.addEventListener('click', function(){
    lightbox.hidden = true;
    document.body.classList.remove('modal-open');
  });

  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox){
      lightbox.hidden = true;
      document.body.classList.remove('modal-open');
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !lightbox.hidden){
      lightbox.hidden = true;
      document.body.classList.remove('modal-open');
    }
  });
})();
