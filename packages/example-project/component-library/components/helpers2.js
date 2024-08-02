const findItemLabel = (componentEl) => {
  const itemEl = componentEl.closest('my-item');
  if (itemEl) {
    return itemEl.querySelector('my-label');
  }
  return null;
};
const renderHiddenInput = (always, container, name, value, disabled) => {
  if (always || hasShadowDom(container)) {
    let input = container.querySelector('input.aux-input');
    if (!input) {
      input = container.ownerDocument.createElement('input');
      input.type = 'hidden';
      input.classList.add('aux-input');
      container.appendChild(input);
    }
    input.disabled = disabled;
    input.name = name;
    input.value = value || '';
  }
};
const hasShadowDom = (el) => {
  return !!el.shadowRoot && !!el.attachShadow;
};

export { findItemLabel as f, renderHiddenInput as r };
