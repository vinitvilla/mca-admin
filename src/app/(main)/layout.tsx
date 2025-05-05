export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <nav>
          <a href="/home">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>© 2025 Cricket Academy</footer>
    </div>
  );
}