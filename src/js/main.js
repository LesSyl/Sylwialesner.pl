'use strict'

const SELECTORS = {
	menuButton: '[data-menu-toggle]',
	navigation: '[data-navigation]',
	menuLabel: '[data-menu-label]',
	header: '[data-header]',
	navigationLinks: '.site-nav__link',
	currentYear: '[data-current-year]',
	businessButton: '[data-business]',
	businessPanel: '[data-business-panel]',

}

const DESKTOP_BREAKPOINT = 768


const menuButton = document.querySelector(SELECTORS.menuButton)
const navigation = document.querySelector(SELECTORS.navigation)
const menuLabel = document.querySelector(SELECTORS.menuLabel)
const header = document.querySelector(SELECTORS.header)
const navigationLinks = document.querySelectorAll(SELECTORS.navigationLinks)
const currentYear = document.querySelector(SELECTORS.currentYear)

const businessButtons = document.querySelectorAll(
    SELECTORS.businessButton,
);

const businessPanels = document.querySelectorAll(
    SELECTORS.businessPanel,
);


const prefersReducedMotion = window.matchMedia(
	'(prefers-reduced-motion: reduce)',
)

const setMenuState = (isOpen, { restoreFocus = false } = {}) => {
	if (!menuButton || !navigation) return

	menuButton.setAttribute('aria-expanded', String(isOpen))
	menuButton.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu')
	navigation.classList.toggle('is-open', isOpen)
	document.body.classList.toggle('menu-open', isOpen)

	if (menuLabel) {
		menuLabel.textContent = isOpen ? 'Zamknij menu' : 'Otwórz menu'
	}

	if (restoreFocus) {
		menuButton.focus()
	}
}

const isMenuOpen = () => menuButton?.getAttribute('aria-expanded') === 'true'

const openMenu = () => {
	setMenuState(true)

	if (!prefersReducedMotion.matches) {
		navigationLinks[0]?.focus()
	}
}

const closeMenu = (restoreFocus = false) => {
	setMenuState(false, { restoreFocus })
}

menuButton?.addEventListener('click', () => {
	if (isMenuOpen()) {
		closeMenu()
		return
	}

	openMenu()
})

navigationLinks.forEach(link => {
	link.addEventListener('click', () => closeMenu())
})

document.addEventListener('keydown', event => {
	if (event.key === 'Escape' && isMenuOpen()) {
		closeMenu(true)
	}
})

window.addEventListener(
	'resize',
	() => {
		if (window.innerWidth >= DESKTOP_BREAKPOINT && isMenuOpen()) {
			closeMenu()
		}
	},
	{ passive: true },
)

const updateHeader = () => {
	header?.classList.toggle('is-scrolled', window.scrollY > 20)
}

window.addEventListener('scroll', updateHeader, { passive: true })
updateHeader()

if (currentYear) {
	currentYear.textContent = new Date().getFullYear()
}

const setBusiness = (type) => {
    businessButtons.forEach((button) => {
        const isActive = button.dataset.business === type;

        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    businessPanels.forEach((panel) => {
        const isActive = panel.dataset.businessPanel === type;

        panel.classList.toggle('is-active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
    });
};

businessButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setBusiness(button.dataset.business);
    });
});
