let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

export const lockBodyScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const body = document.body;
  const root = document.documentElement;

  if (lockCount === 0) {
    previousOverflow = body.style.overflow || '';
    previousPaddingRight = body.style.paddingRight || '';

    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  lockCount += 1;
};

export const unlockBodyScroll = () => {
  if (typeof document === 'undefined') return;
  if (lockCount <= 0) return;

  lockCount -= 1;
  if (lockCount > 0) return;

  const body = document.body;
  body.style.overflow = previousOverflow;
  body.style.paddingRight = previousPaddingRight;
};

