(() => {
  const ACTIVE_CLASS = 'active';

  const headerBurgerElement = document.querySelector('.header__burger');
  const burgerClassList = headerBurgerElement.classList;

  const headerNavigationElement = document.querySelector('.header__navigation');
  const headerNavigationClassList = headerNavigationElement.classList;

  const navigationLinkElements = document.querySelectorAll('.navigation__link');

  const onHeaderBurgerClick = () => {
    if (burgerClassList.contains(ACTIVE_CLASS)) {
      burgerClassList.remove(ACTIVE_CLASS);
      headerNavigationClassList.remove(ACTIVE_CLASS);
    } else {
      burgerClassList.add(ACTIVE_CLASS);
      headerNavigationClassList.add(ACTIVE_CLASS);
    }
  }

  const onNavigationLinkClickHandler = () => {
    burgerClassList.remove(ACTIVE_CLASS);
    headerNavigationClassList.remove(ACTIVE_CLASS);
  }

  headerBurgerElement.addEventListener('click', onHeaderBurgerClick);
  navigationLinkElements.forEach((link) => {
    link.addEventListener('click', onNavigationLinkClickHandler);
  })
})();