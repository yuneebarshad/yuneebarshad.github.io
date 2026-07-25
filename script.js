// Mobile navigation
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Experience Hierarchy: update the Inspector when a company is selected.
const hierarchyItems = document.querySelectorAll('.hierarchy-item[data-company]');
const companyInspectors = document.querySelectorAll('.company-inspector[data-company-panel]');
const careerInspector = document.getElementById('careerInspector');

function selectCompany(companyId, shouldFocusInspector = false) {
  hierarchyItems.forEach((item) => {
    const isSelected = item.dataset.company === companyId;
    item.classList.toggle('is-selected', isSelected);
    item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });

  companyInspectors.forEach((panel) => {
    const isActive = panel.dataset.companyPanel === companyId;
    panel.hidden = !isActive;
    panel.classList.toggle('is-active', isActive);
  });

  // On mobile, the Hierarchy and Inspector stack vertically. Scroll to the
  // selected Inspector only after the visitor deliberately changes company.
  if (shouldFocusInspector && careerInspector && window.matchMedia('(max-width: 760px)').matches) {
    window.setTimeout(() => {
      careerInspector.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }
}

hierarchyItems.forEach((item) => {
  item.addEventListener('click', () => selectCompany(item.dataset.company, true));
});
