import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/mock-data";
import { TrendingUp, Award, BookOpen } from "lucide-react";

export function GradesTab() {
  const average =
    courses.reduce((acc, c) => acc + c.grade, 0) / courses.length;
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const topCourse = [...courses].sort((a, b) => b.grade - a.grade)[0];

  return (
    <div className="flex flex-col gap-6">
      {/* summary stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardDescription>Promedio general</CardDescription>
            <TrendingUp className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl tracking-tight">
                {average.toFixed(1)}
              </span>
              <span className="text-muted-foreground text-sm">/ 100</span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              +2.4 vs. semestre anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardDescription>Créditos en curso</CardDescription>
            <BookOpen className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl tracking-tight">
                {totalCredits}
              </span>
              <span className="text-muted-foreground text-sm">
                en {courses.length} asignaturas
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Carga académica regular
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardDescription>Mejor asignatura</CardDescription>
            <Award className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl tracking-tight">
                {topCourse.grade}
              </span>
              <Badge variant="success">{topCourse.letter}</Badge>
            </div>
            <p className="text-muted-foreground mt-1 truncate text-xs">
              {topCourse.code} · {topCourse.name}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* per-course grades */}
      <Card>
        <CardHeader>
          <CardTitle>Calificaciones por asignatura</CardTitle>
          <CardDescription>
            Resumen de tu desempeño actual en el período en curso.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="border-border -mx-6 grid grid-cols-12 gap-4 border-b px-6 pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <div className="col-span-6 md:col-span-5">Asignatura</div>
            <div className="col-span-3 md:col-span-3 hidden md:block">Profesor</div>
            <div className="col-span-3 md:col-span-2">Progreso</div>
            <div className="col-span-3 md:col-span-2 text-right">Nota</div>
          </div>
          <ul className="divide-border -mx-6 divide-y">
            {courses.map((course) => (
              <li
                key={course.id}
                className="hover:bg-accent/40 grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors"
              >
                <div className="col-span-6 md:col-span-5 flex items-center gap-3 min-w-0">
                  <div
                    aria-hidden
                    className={`${course.color} size-2.5 shrink-0 rounded-full`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {course.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {course.code} · {course.credits} cr.
                    </p>
                  </div>
                </div>
                <div className="col-span-3 hidden md:block">
                  <p className="text-muted-foreground truncate text-sm">
                    {course.professor}
                  </p>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <div className="flex flex-col gap-1.5">
                    <Progress value={course.progress} />
                    <span className="text-muted-foreground text-xs">
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2">
                  <span className="font-serif text-2xl leading-none tracking-tight">
                    {course.grade}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {course.letter}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
