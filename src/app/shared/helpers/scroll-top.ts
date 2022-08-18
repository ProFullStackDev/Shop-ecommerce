export const scrollableClass = 'main-wrap__scrollable';
export const pointerEventAbleClass = 'main-wrap__events';

export const html = (): HTMLElement | null => {
  if (!window) {
    return null;
  }
  const hmlTag = document.getElementsByTagName('html');
  return (hmlTag && hmlTag[0]) || null;
};

export const mainWrapper = (): HTMLElement | null => {
  if (!window) {
    return null;
  }
  const wrapper = window.document.getElementById('main-wrap');
  return wrapper || null;
};

export const addScroll = (): void => {
  const wrapper = mainWrapper();
  const htmlTag = html();
  if (wrapper && htmlTag) {
    wrapper.classList.add(scrollableClass);

    setTimeout(() => wrapper.classList.remove(scrollableClass), 200);
  }
};

export const removeScroll = (): void => {
  const wrapper = mainWrapper();
  const htmlTag = html();
  if (wrapper && htmlTag) {
    wrapper.classList.remove(scrollableClass);
  }
};

export const addPointerEvents = (): void => {
  const wrapper = mainWrapper();
  const htmlTag = html();
  if (wrapper && htmlTag) {
    wrapper.classList.add(pointerEventAbleClass);
  }
};

export const removePointerEvents = (): void => {
  const wrapper = mainWrapper();
  const htmlTag = html();
  if (wrapper && htmlTag) {
    wrapper.classList.remove(pointerEventAbleClass);
  }
};
