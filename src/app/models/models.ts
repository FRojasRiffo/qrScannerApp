export interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    contraseña: string;
    tipo: string;
  }
  
  export interface Asignatura {
    id: number;
    nombre: string;
    sigla: string;
    seccion: string;
    docente_id: number;
    asistencias?: Asistencia[];
    estudiante_id: number;
  }
  
  export interface Asistencia {
    id: string;
    estudiante_id: number;
    asignaturaId: number;  // Ajustado para coincidir con el JSON
    fecha: string;
    estado: string;
    seccion?: string;  // Añadido el campo 'seccion'
  }
  
  