const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-accent-subtle relative">
      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-accent-subtle opacity-30 hidden md:block"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center">
        <div className="text-primary dark:text-background-dark text-sm tracking-wider mb-8 md:mb-0 font-light flex items-center">
          © {currentYear}
          <span className="text-accent-highlight mx-2">⦁</span>
          Philp
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12 justify-center">
          <a
            href="https://github.com/chrismphilp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-background-dark text-sm tracking-wider hover:text-accent-highlight underline-effect font-light"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-1/4 h-px bg-accent opacity-40"></div>
    </footer>
  );
};

export default Footer;
