import { randomBytes } from 'node:crypto';

export type CompletedWork = {
  workId: string;
  customerName: string;
  customerEmail?: string | null;
  species: string;
  installedAt: string;
  location: string;
};

export function createPassportFromCompletedWork(work: CompletedWork) {
  const token = randomBytes(8).toString('hex');
  const installed = new Date(`${work.installedAt}T12:00:00-03:00`);
  const nextControl = new Date(installed);
  nextControl.setDate(nextControl.getDate() + 7);

  return {
    token,
    workId: work.workId,
    customerName: work.customerName,
    customerEmail: work.customerEmail ?? null,
    species: work.species,
    installedAt: work.installedAt,
    location: work.location,
    stage: 'installed' as const,
    nextControlAt: nextControl.toISOString().slice(0, 10),
    path: `/clientes/${token}`,
  };
}
