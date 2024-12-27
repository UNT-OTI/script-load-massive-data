import Escuela from '@/app/models/Escuela';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const escuelas = await Escuela.findAll();
      res.status(200).json(escuelas);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Método ${req.method} no permitido.`);
    }
  } catch (error) {
    console.error('Error en la API:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
