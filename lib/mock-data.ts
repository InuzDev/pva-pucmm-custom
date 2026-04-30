export type Course = {
  id: string;
  code: string;
  name: string;
  professor: string;
  credits: number;
  grade: number; // 0-100
  letter: string;
  progress: number; // 0-100
  color: string; // tailwind class for swatch
};

export type Homework = {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  dueDate: string; // ISO
  status: "pending" | "submitted" | "graded" | "late";
  type: "tarea" | "examen" | "proyecto" | "quiz";
  weight: number; // % of grade
};

export type CalendarEvent = {
  id: string;
  title: string;
  course: string;
  date: string; // ISO date "YYYY-MM-DD"
  time?: string;
  type: "clase" | "examen" | "entrega" | "evento";
};

export const courses: Course[] = [
  {
    id: "1",
    code: "ISC-355",
    name: "Ingeniería de Software",
    professor: "Dr. Manuel Pérez",
    credits: 4,
    grade: 92,
    letter: "A",
    progress: 78,
    color: "bg-emerald-500",
  },
  {
    id: "2",
    code: "MAT-241",
    name: "Cálculo Diferencial",
    professor: "Lic. Carmen Ruiz",
    credits: 4,
    grade: 85,
    letter: "B+",
    progress: 65,
    color: "bg-amber-500",
  },
  {
    id: "3",
    code: "ISC-310",
    name: "Bases de Datos",
    professor: "Ing. Roberto Díaz",
    credits: 3,
    grade: 88,
    letter: "B+",
    progress: 72,
    color: "bg-sky-500",
  },
  {
    id: "4",
    code: "FIL-101",
    name: "Filosofía Contemporánea",
    professor: "Dra. Laura Méndez",
    credits: 3,
    grade: 95,
    letter: "A",
    progress: 80,
    color: "bg-rose-500",
  },
  {
    id: "5",
    code: "ING-201",
    name: "Inglés Intermedio",
    professor: "Mr. James Walker",
    credits: 2,
    grade: 90,
    letter: "A-",
    progress: 70,
    color: "bg-violet-500",
  },
];

// Helper: today + n days, returns YYYY-MM-DD
function inDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export const homeworks: Homework[] = [
  {
    id: "h1",
    title: "Diagrama de clases — Sistema bancario",
    course: "Ingeniería de Software",
    courseCode: "ISC-355",
    dueDate: inDays(1),
    status: "pending",
    type: "tarea",
    weight: 10,
  },
  {
    id: "h2",
    title: "Examen parcial — Derivadas",
    course: "Cálculo Diferencial",
    courseCode: "MAT-241",
    dueDate: inDays(3),
    status: "pending",
    type: "examen",
    weight: 25,
  },
  {
    id: "h3",
    title: "Proyecto final — Modelo ER",
    course: "Bases de Datos",
    courseCode: "ISC-310",
    dueDate: inDays(7),
    status: "pending",
    type: "proyecto",
    weight: 30,
  },
  {
    id: "h4",
    title: "Ensayo — Ética y tecnología",
    course: "Filosofía Contemporánea",
    courseCode: "FIL-101",
    dueDate: inDays(-2),
    status: "graded",
    type: "tarea",
    weight: 15,
  },
  {
    id: "h5",
    title: "Quiz semanal #4",
    course: "Inglés Intermedio",
    courseCode: "ING-201",
    dueDate: inDays(-1),
    status: "submitted",
    type: "quiz",
    weight: 5,
  },
  {
    id: "h6",
    title: "Sprint review — Equipo Alpha",
    course: "Ingeniería de Software",
    courseCode: "ISC-355",
    dueDate: inDays(5),
    status: "pending",
    type: "proyecto",
    weight: 20,
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "e1",
    title: "Clase magistral",
    course: "ISC-355",
    date: inDays(0),
    time: "10:00",
    type: "clase",
  },
  {
    id: "e2",
    title: "Entrega diagrama",
    course: "ISC-355",
    date: inDays(1),
    time: "23:59",
    type: "entrega",
  },
  {
    id: "e3",
    title: "Examen parcial",
    course: "MAT-241",
    date: inDays(3),
    time: "08:00",
    type: "examen",
  },
  {
    id: "e4",
    title: "Tutoría grupal",
    course: "ISC-310",
    date: inDays(2),
    time: "14:00",
    type: "clase",
  },
  {
    id: "e5",
    title: "Conferencia abierta",
    course: "FIL-101",
    date: inDays(4),
    time: "16:00",
    type: "evento",
  },
  {
    id: "e6",
    title: "Proyecto ER",
    course: "ISC-310",
    date: inDays(7),
    time: "23:59",
    type: "entrega",
  },
  {
    id: "e7",
    title: "Sprint review",
    course: "ISC-355",
    date: inDays(5),
    time: "11:00",
    type: "clase",
  },
];

export const student = {
  name: "María Fernández",
  initials: "MF",
  id: "2024-1547",
  career: "Ingeniería de Software",
  semester: "5to semestre",
  email: "mfernandez@ce.pucmm.edu.do",
};
