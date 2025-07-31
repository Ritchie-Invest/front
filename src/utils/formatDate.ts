export type DateFormatType = 'overlay' | 'full' | 'short';

export function formatDate(date: Date, type: DateFormatType = 'full'): string {
  switch (type) {
    case 'overlay':
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    case 'short':
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
      });
    case 'full':
    default:
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
  }
}
