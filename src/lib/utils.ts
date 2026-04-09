type ClassValue = string | boolean | null | undefined | Record<string, boolean> | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  return inputs.map(i => {
    if (typeof i === 'string') return i;
    if (Array.isArray(i)) return cn(...i);
    if (typeof i === 'object' && i !== null) {
      return Object.entries(i).filter(([, v]) => v).map(([k]) => k).join(' ');
    }
    return '';
  }).filter(Boolean).join(' ');
}
