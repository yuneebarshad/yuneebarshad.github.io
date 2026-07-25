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
  const selectedItem = Array.from(hierarchyItems).find(
    (item) => item.dataset.company === companyId
  );
  const activePanel = Array.from(companyInspectors).find(
    (panel) => panel.dataset.companyPanel === companyId
  );

  if (!selectedItem || !activePanel) return;

  hierarchyItems.forEach((item) => {
    const isSelected = item === selectedItem;
    item.classList.toggle('is-selected', isSelected);
    item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });

  companyInspectors.forEach((panel) => {
    panel.hidden = panel !== activePanel;
    panel.classList.remove('inspector-reveal');
  });

  // Replay a short, restrained reveal only after a deliberate company change.
  if (shouldFocusInspector && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.requestAnimationFrame(() => {
      activePanel.classList.add('inspector-reveal');
    });
  }

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
