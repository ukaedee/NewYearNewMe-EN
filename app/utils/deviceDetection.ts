export const isMobile = (userAgent: string): boolean => {
  return /iPhone|Android|Mobile|webOS/i.test(userAgent);
};

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const result = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
  
  console.log('UserAgent:', window.navigator.userAgent);
  console.log('isMobileDevice result:', result);
  
  return result;
}; 