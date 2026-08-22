export type CareStage = 'installed' | '48h' | 'day7' | 'first-cut' | 'day30' | 'seasonal';

export type Passport = {
  token: string;
  customerName: string;
  species: string;
  installedAt: string;
  location: string;
  stage: CareStage;
  nextControlAt: string;
  whatsappText: string;
  notes: string[];
};

const passports: Record<string, Passport> = {
  c8f2a1b7e490: {
    token: 'c8f2a1b7e490',
    customerName: 'Cristian',
    species: 'Celebration Bermuda',
    installedAt: '2026-08-22',
    location: 'Mendoza',
    stage: 'installed',
    nextControlAt: '2026-08-29',
    whatsappText: 'Hola Alfombra Verde, quiero enviar las fotos del control de 7 días de mi césped.',
    notes: [
      'Mantener humedad pareja durante el arraigue inicial.',
      'Evitar tránsito intenso los primeros días.',
      'No realizar el primer corte hasta verificar arraigue y crecimiento activo.',
    ],
  },
};

export function getPassport(token: string) {
  return passports[token] ?? null;
}
