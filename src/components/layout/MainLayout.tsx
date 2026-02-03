import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header breadcrumbs={breadcrumbs} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
