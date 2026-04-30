"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calendarEvents, type CalendarEvent } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const eventColor: Record<CalendarEvent["type"], string> = {
  clase: "bg-sky-500",
  examen: "bg-rose-500",
  entrega: "bg-amber-500",
  evento: "bg-violet-500",
};

const eventLabel: Record<CalendarEvent["type"], string> = {
  clase: "Clase",
  examen: "Examen",
  entrega: "Entrega",
  evento: "Evento",
};

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function buildMonth(year: number, month: number) {
  // First Monday on or before the 1st
  const first = new Date(year, month, 1);
  const dayOfWeek = (first.getDay() + 6) % 7; // 0 = Mon
  const start = new Date(year, month, 1 - dayOfWeek);
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  return cells;
}

export function CalendarTab() {
  const today = new Date();
  const [cursor, setCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState<string>(toISO(today));

  const cells = useMemo(
    () => buildMonth(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  );

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of calendarEvents) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date)!.push(e);
    }
    return map;
  }, []);

  const selectedEvents = (eventsByDate.get(selected) ?? []).sort((a, b) =>
    (a.time ?? "").localeCompare(b.time ?? ""),
  );

  const monthLabel = `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`;

  function shift(months: number) {
    setCursor(
      new Date(cursor.getFullYear(), cursor.getMonth() + months, 1),
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div className="flex flex-col gap-1">
            <CardTitle className="font-serif text-2xl tracking-tight capitalize">
              {monthLabel}
            </CardTitle>
            <CardDescription>
              Tus clases, exámenes y entregas del mes.
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => shift(-1)}
              aria-label="Mes anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
                setSelected(toISO(today));
              }}
            >
              Hoy
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => shift(1)}
              aria-label="Mes siguiente"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border bg-border">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="bg-muted text-muted-foreground py-2 text-center text-xs font-medium"
              >
                {d}
              </div>
            ))}
            {cells.map((d, idx) => {
              const iso = toISO(d);
              const inMonth = d.getMonth() === cursor.getMonth();
              const isToday = iso === toISO(today);
              const isSelected = iso === selected;
              const dayEvents = eventsByDate.get(iso) ?? [];
              return (
                <button
                  key={idx}
                  onClick={() => setSelected(iso)}
                  className={cn(
                    "bg-card relative flex aspect-square flex-col items-stretch gap-1 p-2 text-left transition-colors",
                    "hover:bg-accent/50",
                    !inMonth && "text-muted-foreground/50 bg-muted/30",
                    isSelected && "bg-accent",
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isToday &&
                        "bg-primary text-primary-foreground inline-flex size-5 items-center justify-center rounded-full",
                    )}
                  >
                    {d.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-0.5">
                      {dayEvents.slice(0, 3).map((e) => (
                        <span
                          key={e.id}
                          className={cn(
                            "block size-1.5 rounded-full",
                            eventColor[e.type],
                          )}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {(Object.keys(eventColor) as CalendarEvent["type"][]).map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full", eventColor[t])} />
                {eventLabel[t]}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {new Date(selected + "T00:00:00").toLocaleDateString("es-DO", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </CardTitle>
          <CardDescription>
            {selectedEvents.length} evento{selectedEvents.length === 1 ? "" : "s"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedEvents.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              Sin eventos programados.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {selectedEvents.map((e) => (
                <li
                  key={e.id}
                  className="border-border flex items-start gap-3 rounded-lg border p-3"
                >
                  <span
                    className={cn(
                      "mt-1 size-2 shrink-0 rounded-full",
                      eventColor[e.type],
                    )}
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{e.title}</p>
                      <Badge variant="outline" className="text-xs">
                        {eventLabel[e.type]}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <span className="font-mono">{e.course}</span>
                      {e.time && (
                        <>
                          <span aria-hidden>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {e.time}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
