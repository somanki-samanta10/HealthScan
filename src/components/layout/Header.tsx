import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ScanLine } from 'lucide-react';
import { Logo } from '../icons/Logo';
import { UserNav } from './UserNav';

export function Header() {
  const isLoggedIn = false; // Placeholder for authentication state

  const navLinks = [
    { href: '/', label: 'Scan' },
    { href: '/history', label: 'History' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="text-primary" />
            <span className="hidden font-bold sm:inline-block">
              HealthyScan
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mb-6 flex items-center space-x-2">
              <Logo className="text-primary" />
              <span className="font-bold">HealthyScan</span>
            </Link>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md p-2 hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {isLoggedIn ? (
              <UserNav />
            ) : (
                <Button asChild variant="secondary" size="sm">
                    <Link href="/login">Login</Link>
                </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
