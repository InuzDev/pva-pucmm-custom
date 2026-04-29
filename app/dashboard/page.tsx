import { DashboardHeader } from "@/components/dashboard-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradesTab } from "@/components/tabs/grades-tab";
import { HomeworksTab } from "@/components/tabs/homeworks-tab";
import { CalendarTab } from "@/components/tabs/calendar-tab";
import { PendingTab } from "@/components/tabs/pending-tab";
import {
  Calendar as CalendarIcon,
  ClipboardList,
  GraduationCap,
  Inbox,
} from "lucide-react";
import { student } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-screen">
      <DashboardHeader />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
        {/* Greeting */}
        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString("es-DO", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
            Hola, {student.name.split(" ")[0]}.
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base text-pretty">
            Aquí está todo lo que necesitas para mantenerte al día este
            semestre. Selecciona una sección para empezar.
          </p>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="grades" className="gap-6">
          <TabsList className="bg-muted/60 h-11 w-full justify-start gap-1 overflow-x-auto p-1 sm:w-fit">
            <TabsTrigger value="grades" className="h-9 gap-2 px-4">
              <GraduationCap className="size-4" />
              Calificaciones
            </TabsTrigger>
            <TabsTrigger value="homeworks" className="h-9 gap-2 px-4">
              <ClipboardList className="size-4" />
              Tareas
            </TabsTrigger>
            <TabsTrigger value="calendar" className="h-9 gap-2 px-4">
              <CalendarIcon className="size-4" />
              Calendario
            </TabsTrigger>
            <TabsTrigger value="pending" className="h-9 gap-2 px-4">
              <Inbox className="size-4" />
              Pendientes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="mt-0">
            <GradesTab />
          </TabsContent>
          <TabsContent value="homeworks" className="mt-0">
            <HomeworksTab />
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            <CalendarTab />
          </TabsContent>
          <TabsContent value="pending" className="mt-0">
            <PendingTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
