import Rotatable from './rotatable';
import { artboard } from './background/artboard';
import AnimatedBackground from './background/animated_background';

$(() => {
  /**
   * Animated Background
   * */ 
  const background = new AnimatedBackground('background-canvas', artboard);

  // Logic for Displaying Animated Background controls
  const $hideableElements = $('.hideable');
  const $contactSection = $('#contact');
  let elementsHidden = false;

  function toggleElementsVisibility() {
    if (!elementsHidden) window.scrollTo(0, document.body.scrollHeight);
    $hideableElements.toggleClass('invisible');
    $contactSection.toggleClass('no-touch');
    elementsHidden = !elementsHidden;
  }

  const $viewCtrPanelButton = $('#view-ctr-panel');
  const $bkgdButtons = $('#bkgd-buttons');

  function hideControls() {
    $viewCtrPanelButton.removeClass('active').html('&xutri;');
    $bkgdButtons.removeClass('show');
  }

  function showElements() {
    toggleElementsVisibility();
    hideControls();

    $(document).off('scroll', showElements);
  }

  $viewCtrPanelButton.on('click', function () {
    const $this = $(this);
    $this.toggleClass('active');
    if ($this.is('.active')) {
      $this.html('&xdtri;');
      if (!elementsHidden) {
        toggleElementsVisibility();
        setTimeout(() => $(document).on('scroll', showElements), 1500);
      }

    } else {
      $this.html('&xutri;');
    }

    $bkgdButtons.toggleClass('show');
  });

  // Changing Animated Background mode
  const hideLinesOption = document.getElementById('hide-lines');
  const $modeButtons = $('#bkgd-modes button');

  $('#bkgd-modes').on('click', 'button', function (e) {
    const $this = $(this);
    background.changeMouseMode($this.data('bkgdMode'));
    $modeButtons.removeClass('active');
    $this.addClass('active');

    // reset the background to its original form
    if ($this.data('bkgdMode') === 'default') {
      background.resetArtboard(artboard);
      hideLinesOption.checked = false;
      showElements();
    }

    hideControls();
  })

  hideLinesOption.addEventListener('click', () => background.toggleLines());

  /**
   * Rotating element
   * */ 
  const rotatable = new Rotatable($('.rotatable > *'));
  rotatable.startAnimation();
  let rotating = true;

  // Only rotate the element when visible
  const intro = document.getElementById('intro');
  window.addEventListener('scroll', function () {
    const pos = intro.getBoundingClientRect();
    if (
      pos.top < window.innerHeight 
      && pos.bottom >= 0
      && !rotating
    ) {
      rotatable.startAnimation();
      rotating = true;
    } else if (
      pos.top < 0
      && pos.bottom < 0
      && rotating
    ) {
      rotatable.stopAnimation();
      rotating = false;
    }
  });
  
  /**
   * Navigation menu button
   */ 
  $('#nav-menu').on('click', function (e) {
    if (!e.target.classList.contains('inert')) {
      $(this).toggleClass('expanded')
    }
  });

  /**
   * Projects panel
   */ 
  const $tabList = $('.tab-list');
  let $activeLink = $tabList.find('a.active');
  let $panel = $($activeLink.attr('href'));

  $tabList.on('click', '.panel-title', function (e) {
    e.preventDefault();
    const $link = $(this);
    const id = this.hash;

    if (id && !$link.is('.active')) {
      $panel.removeClass('active');
      $activeLink.removeClass('active');

      $panel = $(id).addClass('active');
      $activeLink = $link.addClass('active');
    }
  });

  // Code for image previews
  const $modal = $('.gallery .modal');
  const $previews = $modal.find('.img-preview');
  let currentPanelIdx;

  // Open full image preview
  $('.thumbs').on('click', '.thumb-panel', function () {
    currentPanelIdx = Number(this.dataset.idx);
    $previews.eq(currentPanelIdx).addClass('display');
    $modal.addClass('display');
  })

  // Close image preview
  $modal.on('click', function (e) {
    e.stopPropagation();
    if ($(e.target).is('.close-modal')) {
      $previews.removeClass('display');
      $modal.removeClass('display');
      currentPanelIdx = undefined;
    }
  })

  // View next/previous image
  $modal.find('.img-control').on('click', function () {
    const deltaIdx = Number(this.dataset.deltaIdx);
    let newIdx = (currentPanelIdx + deltaIdx) % $previews.length;
    if (newIdx < 0) {
      newIdx = $previews.length - 1;
    }

    $previews.eq(currentPanelIdx).removeClass('display');
    $previews.eq(newIdx).addClass('display');
    currentPanelIdx = newIdx;
  });

  /**
   * Selected elements pop in when scrolled to
   * */ 
  let $appearReady = $('.appear-ready');
  
  function elementPopIn() {
    $appearReady.each(function () {
      const pos = this.getBoundingClientRect();
      if (pos.top < (window.innerHeight * .65) || pos.bottom < 0) {
        $(this).removeClass('appear-ready');
        $appearReady = $('.appear-ready')
      }
    });

    if ($appearReady.length === 0) {
      $(window).off('scroll', elementPopIn);
    }
  }

  $(window).on('scroll', elementPopIn);
});