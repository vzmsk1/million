import { getHash } from '../components/main-a.js';

const gotoBlock = (
  targetBlock,
  noHeader = false,
  speed = 500,
  offsetTop = 0
) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = '';
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = 'header.header';
      headerItemHeight = document.querySelector(headerItem).offsetHeight;
    }
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    };
    // close menu if it's opened
    document.documentElement.classList.contains('menu-open')
      ? menuClose()
      : null;

    if (typeof SmoothScroll !== 'undefined') {
      // scroll with plugin
      new SmoothScroll().animateScroll(targetBlockElement, '', options);
    } else {
      // scroll without plugin
      let targetBlockElementPosition =
        targetBlockElement.getBoundingClientRect().top + scrollY;
      targetBlockElementPosition = headerItemHeight
        ? targetBlockElementPosition - headerItemHeight
        : targetBlockElementPosition;
      targetBlockElementPosition = offsetTop
        ? targetBlockElementPosition - offsetTop
        : targetBlockElementPosition;
      window.scrollTo({
        top: targetBlockElementPosition,
        behavior: 'smooth',
      });
    }
  } else {
    FLS(`[gotoBlock]: ${targetBlock} doesn't exist`);
  }
};

const pageNavigation = () => {
  document.addEventListener('click', pageNavigationAction);
  document.addEventListener('watcherCallback', pageNavigationAction);
  // main function
  function pageNavigationAction(e) {
    if (e.type === 'click') {
      const targetElement = e.target;
      if (targetElement.closest('[data-goto]')) {
        const gotoLink = targetElement.closest('[data-goto]');
        const gotoLinkSelector = gotoLink.dataset.goto
          ? gotoLink.dataset.goto
          : '';
        const noHeader = gotoLink.hasAttribute('data-goto-header')
          ? true
          : false;
        const gotoSpeed = gotoLink.dataset.gotoSpeed
          ? gotoLink.dataset.gotoSpeed
          : 500;
        const offsetTop = gotoLink.dataset.gotoTop
          ? parseInt(gotoLink.dataset.gotoTop)
          : 0;
        gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        e.preventDefault();
      }
    } else if (e.type === 'watcherCallback' && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (targetElement.dataset.watch === 'navigator') {
        const navigatorActiveItem = document.querySelector(
          `[data-goto]._navigator-active`
        );
        let navigatorCurrentItem;
        if (
          targetElement.id &&
          document.querySelector(`[data-goto="#${targetElement.id}"]`)
        ) {
          navigatorCurrentItem = document.querySelector(
            `[data-goto="#${targetElement.id}"]`
          );
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-goto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(
                `[data-goto=".${element}"]`
              );
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          navigatorCurrentItem
            ? navigatorCurrentItem.classList.add('_navigator-active')
            : null;
        } else {
          navigatorCurrentItem
            ? navigatorCurrentItem.classList.remove('_navigator-active')
            : null;
        }
      }
    }
  }
  // scroll by hash
  if (getHash()) {
    let goToHash;
    if (document.querySelector(`#${getHash()}`)) {
      goToHash = `#${getHash()}`;
    } else if (document.querySelector(`.${getHash()}`)) {
      goToHash = `.${getHash()}`;
    }
    goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
  }
};
pageNavigation();
