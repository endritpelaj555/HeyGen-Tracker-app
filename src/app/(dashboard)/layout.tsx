'use client';

import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-heygen-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-heygen-dark-5 border-t-heygen-teal animate-spin mx-auto mb-4"></div>
          <p className="text-heygen-gray">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  const isAdmin = (session?.user as any)?.role === 'admin';

  return (
    <div className="flex h-screen bg-heygen-dark overflow-hidden">
      <Sidebar isAdmin={isAdmin} />
      <main className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DashboardContent>{children}</DashboardContent>
    </SessionProvider>
  );
}
