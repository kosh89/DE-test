(() => {
  const ACTIVE_CLASS = 'active';
  const NAVIGATION_LINK_CLASS = 'navigation__link';

  const headerBurgerElement = document.querySelector('.header__burger');
  const burgerClassList = headerBurgerElement.classList;

  const headerNavigationElement = document.querySelector('.header__navigation');
  const headerNavigationClassList = headerNavigationElement.classList;

  const navigationElement = document.querySelector('.navigation');

  const removeActiveClasses = () => {
    window.utils.body.classList.remove(window.utils.STOP_SCROLL_CLASS, window.utils.STOP_SCROLL_CLASS + '--navigation');
    burgerClassList.remove(ACTIVE_CLASS);
    headerNavigationClassList.remove(ACTIVE_CLASS);
  };

  const onHeaderBurgerClick = () => {
    if (burgerClassList.contains(ACTIVE_CLASS)) {
      removeActiveClasses();
    } else {
      burgerClassList.add(ACTIVE_CLASS);
      headerNavigationClassList.add(ACTIVE_CLASS);
      window.utils.body.classList.add(window.utils.STOP_SCROLL_CLASS, window.utils.STOP_SCROLL_CLASS + '--navigation');
      document.addEventListener('keydown', onNavigationEscPressHandler);
    }
  };

  const onNavigationLinkClickHandler = (event) => {
    if (event.target.classList.contains(NAVIGATION_LINK_CLASS)) {
      removeActiveClasses();
    }
  };

  const onNavigationEscPressHandler = (event) => {
    if (event.key === window.utils.ESC_KEY) {
      removeActiveClasses();
    }
  };

  headerBurgerElement.addEventListener('click', onHeaderBurgerClick);
  navigationElement.addEventListener('click', onNavigationLinkClickHandler);
})();
