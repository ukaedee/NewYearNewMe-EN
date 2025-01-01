export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return true; // SSRの場合はモバイルとして扱う
  
  return /iPhone|Android|Mobile|webOS/i.test(window.navigator.userAgent);
}; 