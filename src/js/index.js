import Rotatable from './rotatable';
import { artboard } from './background/artboard';
import AnimatedBackground from './background/animated_background';

$(() => {
  // Animated Canvas
  const background = new AnimatedBackground('background-canvas', artboard)

  // Rotating element
  const rotatable = new Rotatable($('.rotatable > *'));
  rotatable.toggleAnimation();
  
  // Nav menu button
  $('#nav-menu').on('click', function (e) {
    if (!e.target.classList.contains('inert')) {
      $(this).toggleClass('expanded')
    }
  });

  // Code for projects panel
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
  const $modal = $('.modal');
  const $previews = $modal.find('.img-preview');
  let currentPanelIdx;

  // Open full image preview
  $('.thumbs').on('click', '.thumb-panel', function () {
    currentPanelIdx = Number(this.dataset.idx);
    $previews[currentPanelIdx].style.display = 'flex';
    $modal.css({ display: 'block' });
  })

  // Close image preview
  $modal.find('.close-modal').on('click', function () {
    $previews.css({ display: '' });
    $modal.css({ display: '' })
    currentPanelIdx = undefined;
  })

  // View next/previous image
  $modal.find('.nav-preview').on('click', function () {
    const deltaIdx = Number(this.dataset.deltaIdx);
    let newIdx = (currentPanelIdx + deltaIdx) % $previews.length;
    if (newIdx < 0) {
      newIdx = $previews.length - 1;
    }

    $previews[currentPanelIdx].style.display = '';
    $previews[newIdx].style.display = 'flex';
    currentPanelIdx = newIdx;
  });
});