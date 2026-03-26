document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  const plusIconSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V5H11V11H5V13H11V19H13V13H19V11H13Z" fill="#032E15"/></svg>`;
  const minusIconSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 13H5V11H19V13Z" fill="#032E15"/></svg>`;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isExpanded = item.classList.contains('expanded');
      
      // Close all
      accordionItems.forEach(i => {
        i.classList.remove('expanded');
        i.classList.add('collapsed');
        i.querySelector('.accordion-icon').innerHTML = plusIconSVG;
      });
      
      if (!isExpanded) {
        item.classList.remove('collapsed');
        item.classList.add('expanded');
        item.querySelector('.accordion-icon').innerHTML = minusIconSVG;
      }
    });
  });
});
