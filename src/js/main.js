'use strict';

const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const menuLabel = document.querySelector('[data-menu-label]');
const header = document.querySelector('[data-header]');
const navigationLinks = document.querySelectorAll('.site-nav__link');
const currentYear = document.querySelector('[data-current-year]');

const desktopBreakpoint = 768;

const menuIsOpen = () =>
	menuButton?.getAttribute('aria-expanded') === 'true';

const openMenu = () => {
	if (!menuButton || !navigation) return;

	menuButton.setAttribute('aria-expanded', 'true');
	navigation.classList.add('is-open');
	document.body.classList.add('menu-open');

	if (menuLabel) {
		menuLabel.textContent = 'Zamknij menu';
	}
};

const closeMenu = () => {
	if (!menuButton || !navigation) return;

	menuButton.setAttribute('aria-expanded', 'false');
	navigation.classList.remove('is-open');
	document.body.classList.remove('menu-open');

	if (menuLabel) {
		menuLabel.textContent = 'Otwórz menu';
	}
};

const toggleMenu = () => {
	if (menuIsOpen()) {
		closeMenu();
	} else {
		openMenu();
	}
};

menuButton?.addEventListener('click', toggleMenu);

navigationLinks.forEach((link) => {
	link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
	if (event.key !== 'Escape' || !menuIsOpen()) return;

	closeMenu();
	menuButton?.focus();
});

window.addEventListener('resize', () => {
	if (window.innerWidth >= desktopBreakpoint && menuIsOpen()) {
		closeMenu();
	}
});

const updateHeader = () => {
	if (!header) return;

	header.classList.toggle('is-scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', updateHeader, {
	passive: true,
});

updateHeader();

if (currentYear) {
	currentYear.textContent = new Date().getFullYear();
}