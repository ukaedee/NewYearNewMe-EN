export const isMobile = (userAgent: string): boolean => {
  return /iPhone|Android|Mobile|webOS/i.test(userAgent);
};

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;

  // スマートフォンの判定（タブレットを除外）
  return /Android.*Mobile|iPhone/i.test(
    navigator.userAgent
  );
}; 