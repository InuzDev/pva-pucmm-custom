"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { homeworks, type Homework } from "@/lib/mock-data";
import {
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const filters: { id: "all" | Homework["status"]; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "pending", label: "Pendientes" },
  { id: "submitted", label: "Entregadas" },
  { id: "graded", label: "Calificadas" },
];

const typeIcon: Record<Homework["type"], React.ReactNode> = {
  tarea: <ClipboardList className="size-4" />,
  examen: <GraduationCap className="size-4" />,
  proyecto: <FileText className="size-4" />,
  quiz: <HelpCircle className="size-4" />,
};

const statusVariant: Record<
  Homework["status"],
  "default" | "secondary" | "success" | "warning" | "destructive"
> = {
  pending: "warning",
  submitted: "secondary",
  graded: "success",
  late: "destructive",
};

const statusLabel: Record<Homework["status"], string> = {
  pending: "Pendiente",
  submitted: "Entregada",
  graded: "Calificada",
  late: "Atrasada",
};

function formatDue(dateISO: string): string {
  const due = new Date(dateISO);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diff = Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  const formatter = new Intl.DateTimeFormat("es-DO", {
    day: "2-digit",
    month: "short",
  });
  if (diff === 0) return `Hoy · ${formatter.format(due)}`;
  if (diff === 1) return `Mañana · ${formatter.format(due)}`;
  if (diff > 1 && diff < 7) return `En ${diff} días · ${formatter.format(due)}`;
  if (diff < 0)
    return `Hace ${Math.abs(diff)} día${Math.abs(diff) === 1 ? "" : "s"}`;
  return formatter.format(due);
}

export function HomeworksTab() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const filtered =
    filter === "all" ? homeworks : homeworks.filter((h) => h.status === filter);

  return (
    <Card>
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Tareas y entregas</CardTitle>
          <CardDescription>
            Todas las actividades evaluadas de tus asignaturas activas.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                filter === f.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/40",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        {filtered.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-12 text-center text-sm">
            <ClipboardList className="size-6" />
            No hay tareas en esta categoría.
          </div>
        ) : (
          <ul className="divide-border -mx-6 divide-y border-t border-border">
            {filtered.map((hw) => (
              <li key={hw.id}>
                <button className="hover:bg-accent/40 group flex w-full items-center gap-4 px-6 py-4 text-left transition-colors">
                  <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                    {typeIcon[hw.type]}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{hw.title}</p>
                    </div>
                    <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                      <span className="font-mono">{hw.courseCode}</span>
                      <span aria-hidden>·</span>
                      <span className="truncate">{hw.course}</span>
                      <span aria-hidden>·</span>
                      <span>Vale {hw.weight}%</span>
                    </div>
                  </div>
                  <div className="hidden flex-col items-end gap-1.5 sm:flex">
                    <Badge variant={statusVariant[hw.status]}>
                      {statusLabel[hw.status]}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {formatDue(hw.dueDate)}
                    </span>
                  </div>
                  <ChevronRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
