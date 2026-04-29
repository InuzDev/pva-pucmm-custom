"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, GraduationCap, LogOut, Search, Settings, User } from "lucide-react";
import { student } from "@/lib/mock-data";

export function DashboardHeader() {
  const router = useRouter();
  return (
    <header className="border-border bg-background/80 sticky top-0 z-30 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <GraduationCap className="size-3.5" />
          </div>
          <span className="text-foreground hidden text-sm font-semibold tracking-tight sm:inline">
            Aula PUCMM
          </span>
        </Link>

        <div className="text-muted-foreground hidden md:flex md:items-center md:gap-2 md:text-sm">
          <span className="text-border">/</span>
          <span>{student.career}</span>
          <span className="text-border">/</span>
          <span className="text-foreground">{student.semester}</span>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Buscar"
            className="text-muted-foreground hover:text-foreground hidden md:inline-flex"
          >
            <Search className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notificaciones"
            className="text-muted-foreground hover:text-foreground relative"
          >
            <Bell className="size-4" />
            <span className="bg-primary absolute top-2 right-2 size-1.5 rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ring-offset-background focus-visible:ring-ring/40 ml-1 flex items-center gap-2 rounded-full transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {student.initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {student.id} · {student.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings /> Ajustes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/login")}>
                <LogOut /> Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
