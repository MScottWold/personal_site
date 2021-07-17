import Rotatable from './rotatable';
import { artboard } from './background/artboard';
import Constellation from './background/constellation';

$(() => {
  /**
   * Constellation background
   * */
  const constellationManager = {
    constellation: new Constellation('background-canvas', artboard),

    $hideableElements: $('.hideable'),

    $contactSection: $('#contact'),
    
    $viewCtrPanelButton: $('#view-ctr-panel'),
    
    $bkgdButtons: $('#bkgd-buttons'),
    
    $modeButtons: $('#bkgd-modes button'),
    
    hideLinesOption: document.getElementById('hide-lines'),

    elementsHidden: false,

    _toggleElementsVisibility: function () {
      if (!this.elementsHidden) window.scrollTo(0, document.body.scrollHeight);
      this.$hideableElements.toggleClass('invisible');
      this.$contactSection.toggleClass('no-touch');
      this.elementsHidden = !this.elementsHidden;
    },

    _hideControls: function () {
      this.$viewCtrPanelButton.removeClass('active').html('&xutri;');
      this.$bkgdButtons.removeClass('show');
    },

    _showElements: function () {
      this._toggleElementsVisibility();
      this._hideControls();
  
      $(document).off('scroll.showElem');
    },

    _toggleCtrPanel: function (e) {
      const $button = $(e.currentTarget);
      $button.toggleClass('active');
      if ($button.is('.active')) {
        $button.html('&xdtri;');
        if (!this.elementsHidden) {
          this._toggleElementsVisibility();
          setTimeout(() => {
            $(document).on(
              'scroll.showElem', 
              this._showElements.bind(this)
            )
          }, 1000);
        }

      } else {
        $button.html('&xutri;');
      }

      this.$bkgdButtons.toggleClass('show');
    },

    _changeMode: function (e) {
      // Changing Constellation mode
      const $button = $(e.currentTarget);
      this.constellation.changeMouseMode($button.data('bkgdMode'));
      this.$modeButtons.removeClass('active');
      $button.addClass('active');

      // reset the constellation to its original form
      if ($button.data('bkgdMode') === 'default') {
        this.constellation.resetArtboard(artboard);
        this.hideLinesOption.checked = false;
        this._showElements();
      }

      this._hideControls();
    },

    init: function () {
      this.$viewCtrPanelButton.on('click', this._toggleCtrPanel.bind(this));
      $('#bkgd-modes').on('click', 'button', this._changeMode.bind(this));
      this.hideLinesOption.addEventListener('click', () => {
        this.constellation.toggleLines()
      });
    },
  };

  constellationManager.init();


  /**
   * Rotating element
   * */
  const rotatableManager = {
    rotatable: new Rotatable($('.rotatable > *')),

    rotating: true,

    intro: document.getElementById('intro'),

    _rotateWhenVisible: function () {
      // Only rotate the element when visible
      const pos = this.intro.getBoundingClientRect();
      if (
        pos.top < window.innerHeight
        && pos.bottom >= 0
        && !this.rotating
      ) {
        this.rotatable.startAnimation();
        this.rotating = true;
      } else if (
        pos.top < 0
        && pos.bottom < 0
        && this.rotating
      ) {
        this.rotatable.stopAnimation();
        this.rotating = false;
      }
    },

    init: function () {
      window.addEventListener('scroll', this._rotateWhenVisible.bind(this));
      this.rotatable.startAnimation();
    }
  };

  rotatableManager.init();


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
  const projectsManager = {
    $tabList: $('.tab-list'),

    _changeTab: function (e) {
      e.preventDefault();
      const $link = $(e.currentTarget);
      const id = e.currentTarget.hash;

      if (id && !$link.is('.active')) {
        this.$panel.removeClass('active');
        this.$activeLink.removeClass('active');

        this.$panel = $(id).addClass('active');
        this.$activeLink = $link.addClass('active');
      }
    },

    init() {
      this.$activeLink = this.$tabList.find('a.active');
      this.$panel = $(this.$activeLink.attr('href'));
      this.$tabList.on('click', '.panel-title', this._changeTab.bind(this));
    }
  };

  projectsManager.init();


  // Code for image previews
  const imgModalManager = {
    $modal: $('.gallery .modal'),

    _openImg: function (e) {
      this.currentPanelIdx = Number(e.currentTarget.dataset.idx);
      this.$previews.eq(this.currentPanelIdx).addClass('display');
      this.$modal.addClass('display');
    },

    _closeImg: function (e) {
      e.stopPropagation();
      if ($(e.target).is('.close-modal')) {
        this.$previews.removeClass('display');
        this.$modal.removeClass('display');
        this.currentPanelIdx = undefined;
      }
    },

    _navImgs: function (e) {
      const deltaIdx = Number(e.currentTarget.dataset.deltaIdx);
      let newIdx = (this.currentPanelIdx + deltaIdx) % this.$previews.length;
      if (newIdx < 0) {
        newIdx = this.$previews.length - 1;
      }

      this.$previews.eq(this.currentPanelIdx).removeClass('display');
      this.$previews.eq(newIdx).addClass('display');
      this.currentPanelIdx = newIdx;
    },

    init: function () {
      this.$previews = this.$modal.find('.img-preview');
      $('.thumbs').on('click', '.thumb-panel', this._openImg.bind(this));
      this.$modal.on('click', this._closeImg.bind(this));
      this.$modal.find('.img-control').on('click', this._navImgs.bind(this));
    },
  };

  imgModalManager.init();

  /**
   * Selected elements pop in when scrolled to
   * */
  const popInManager = {
    $appearReady: $('.appear-ready'),

    _elementPopIn: function () {
      this.$appearReady.each((i, ele) => {
        const pos = ele.getBoundingClientRect();
        if (pos.top < (window.innerHeight * .65) || pos.bottom < 0) {
          $(ele).removeClass('appear-ready');
          this.$appearReady = $('.appear-ready')
        }
      });

      if (this.$appearReady.length === 0) {
        $(window).off('scroll.popInManager');
      }
    },

    init: function () {
      $(window).on('scroll.popInManager', this._elementPopIn.bind(this));
    }
  };
  
  popInManager.init();
});