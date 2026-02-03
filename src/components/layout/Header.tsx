import { Bell, ChevronRight } from 'lucide-react';
import { RoleToggle } from './RoleToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  breadcrumbs?: { label: string; href?: string }[];
}

export function Header({ breadcrumbs = [] }: HeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Cronoss Nexus</span>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className={index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
              {crumb.label}
            </span>
          </div>
        ))}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <RoleToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="Usuario" />
                <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@cronoss.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
