"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { homeworks } from "@/lib/mock-data";
import { AlertTriangle, ArrowUpRight, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

function daysUntil(dateISO: string): number {
  const due = new Date(dateISO);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function urgencyLevel(days: number): "critical" | "soon" | "normal" {
  if (days <= 1) return "critical";
  if (days <= 3) return "soon";
  return "normal";
}

const urgencyMeta = {
  critical: {
    label: "Urgente",
    icon: <Flame className="size-3" />,
    badge: "destructive" as const,
    accent: "border-l-destructive",
  },
  soon: {
    label: "Próximo",
    icon: <AlertTriangle className="size-3" />,
    badge: "warning" as const,
    accent: "border-l-amber-500",
  },
  normal: {
    label: "A tiempo",
    icon: <Clock className="size-3" />,
    badge: "secondary" as const,
    accent: "border-l-primary",
  },
};

function formatDue(dateISO: string): string {
  const days = daysUntil(dateISO);
  if (days < 0) return `Atrasada ${Math.abs(days)}d`;
  if (days === 0) return "Vence hoy";
  if (days === 1) return "Vence mañana";
  return `Vence en ${days} días`;
}

export function PendingTab() {
  const pending = homeworks
    .filter((h) => h.status === "pending")
    .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));

  const critical = pending.filter((h) => daysUntil(h.dueDate) <= 1).length;
  const soon = pending.filter((h) => {
    const d = daysUntil(h.dueDate);
    return d > 1 && d <= 3;
  }).length;
  const totalWeight = pending.reduce((acc, h) => acc + h.weight, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardDescription>Pendientes totales</CardDescription>
            <Clock className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <span className="font-serif text-4xl tracking-tight">
              {pending.length}
            </span>
            <p className="text-muted-foreground mt-1 text-xs">
              {totalWeight}% del peso total en juego
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardDescription>Urgentes</CardDescription>
            <Flame className="text-destructive size-4" />
          </CardHeader>
          <CardContent>
            <span className="font-serif text-destructive text-4xl tracking-tight">
              {critical}
            </span>
            <p className="text-muted-foreground mt-1 text-xs">
              Vencen hoy o mañana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardDescription>Próximas (≤3 días)</CardDescription>
            <AlertTriangle className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <span className="font-serif text-4xl tracking-tight">{soon}</span>
            <p className="text-muted-foreground mt-1 text-xs">
              Mantén el ritmo esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cola de pendientes</CardTitle>
          <CardDescription>
            Ordenadas por fecha de entrega más próxima.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {pending.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-12 text-center text-sm">
              ¡Estás al día! No tienes pendientes.
            </div>
          ) : (
            pending.map((hw) => {
              const days = daysUntil(hw.dueDate);
              const urgency = urgencyLevel(days);
              const meta = urgencyMeta[urgency];
              return (
                <div
                  key={hw.id}
                  className={cn(
                    "border-border bg-card hover:bg-accent/40 group flex flex-col gap-3 rounded-lg border border-l-4 p-4 transition-colors sm:flex-row sm:items-center sm:gap-4",
                    meta.accent,
                  )}
                >
                  <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant={meta.badge}>
                        {meta.icon}
                        {meta.label}
                      </Badge>
                      <span className="text-muted-foreground text-xs font-mono">
                        {hw.courseCode}
                      </span>
                    </div>
                    <p className="truncate text-sm font-medium">{hw.title}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {hw.course} · Vale {hw.weight}% de la nota final
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1">
                    <div className="text-right">
                      <p
                        className={cn(
                          "text-sm font-semibold",
                          urgency === "critical" && "text-destructive",
                          urgency === "soon" && "text-amber-600 dark:text-amber-400",
                        )}
                      >
                        {formatDue(hw.dueDate)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(hw.dueDate).toLocaleDateString("es-DO", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0">
                      Abrir
                      <ArrowUpRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
