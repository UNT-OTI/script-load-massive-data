const Estudiante = require('../models/Estudiante');

const createEstudiantes = async (req, res) => {
  try {
    const { estudiantes, est_escuela } = req.body;
    console.log("escuela seleccionada: ", est_escuela);
    console.log(req.body);

    if (!estudiantes || estudiantes.length === 0) {
      return res.status(400).json({ error: 'No hay estudiantes para insertar' });
    }

    const estudiantesInsertados = await Promise.all(
      estudiantes.map((estudiante) =>
        Estudiante.create({
          est_codigo: estudiante.est_codigo,
          est_nombres: estudiante.est_nombres,
          est_apellidos: estudiante.est_apellidos,
          est_escuela,
          est_sexo: estudiante.sexo,
          est_domicilio: estudiante.est_domicilio,
          est_sede: estudiante.idsede,
          est_estado: 1,
        })
      )
    );

    res.status(201).json({
      message: 'Estudiantes insertados correctamente',
      estudiantes: estudiantesInsertados,
    });
  } catch (error) {
    console.error('Error al insertar estudiantes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { createEstudiantes };
