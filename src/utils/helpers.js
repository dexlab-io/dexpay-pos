import { debounce } from 'lodash';
import { elements } from '../theme';

// Usage: await timeout(3000);
export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const truncateHash = (hash, length = 22) => {
  const startHash = hash.substring(0, length);
  const lastHash = hash.substr(hash.length - 4);
  return `${startHash}...${lastHash}`;
};

export const checkWindowSize = (init = true, cb) => {
  const maxMobileWidth = elements.mobileBreakpoint;
  let isMobile = window.innerWidth < maxMobileWidth;
  if (init) {
    return isMobile;
  }

  return window.addEventListener(
    'resize',
    debounce(
      () => {
        isMobile = window.innerWidth < maxMobileWidth;
        cb(isMobile);
      },
      200,
      false
    ),
    false
  );
};
