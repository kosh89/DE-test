(() => {
  const ACTIVE_CLASS = 'active';
  const NAVIGATION_LINK_CLASS = 'navigation__link';

  const headerBurgerElement = document.querySelector('.header__burger');
  const burgerClassList = headerBurgerElement.classList;

  const headerNavigationElement = document.querySelector('.header__navigation');
  const headerNavigationClassList = headerNavigationElement.classList;

  const navigationElement = document.querySelector('.navigation');

  const removeActiveClasses = () => {
    burgerClassList.remove(ACTIVE_CLASS);
    headerNavigationClassList.remove(ACTIVE_CLASS);
  };

  const onHeaderBurgerClick = () => {
    if (burgerClassList.contains(ACTIVE_CLASS)) {
      removeActiveClasses();
    } else {
      burgerClassList.add(ACTIVE_CLASS);
      headerNavigationClassList.add(ACTIVE_CLASS);
    }
  };

  const onNavigationLinkClickHandler = (event) => {
    if (event.target.classList.contains(NAVIGATION_LINK_CLASS)) {
      removeActiveClasses();
    }
  };

  headerBurgerElement.addEventListener('click', onHeaderBurgerClick);
  navigationElement.addEventListener('click', onNavigationLinkClickHandler);
})();
