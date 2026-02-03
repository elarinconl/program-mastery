import { useRole, UserRole } from '@/contexts/RoleContext';
import { Shield, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RoleToggle() {
  const { role, setRole } = useRole();

  const options: { value: UserRole; label: string; icon: React.ReactNode }[] = [
    { value: 'superadmin', label: 'Superadmin', icon: <Shield className="w-4 h-4" /> },
    { value: 'instructor', label: 'Instructor', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <div className="role-toggle">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setRole(option.value)}
          className={cn(
            'flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            role === option.value
              ? option.value === 'superadmin'
                ? 'bg-role-admin text-white shadow-sm'
                : 'bg-role-instructor text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
