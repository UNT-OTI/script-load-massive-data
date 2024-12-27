import { createEstudiantes } from '@/app/controllers/estudiantesController';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return createEstudiantes(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
