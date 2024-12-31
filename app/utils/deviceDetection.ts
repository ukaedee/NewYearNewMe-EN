export const isMobile = (userAgent: string): boolean => {
  return /iPhone|Android|Mobile|webOS/i.test(userAgent);
}; 