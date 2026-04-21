const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-accent-subtle py-12">
      <div className="mx-auto w-full max-w-[75ch] px-6 md:max-w-4xl md:px-10 lg:max-w-[52rem] lg:px-8 xl:max-w-[56rem] xl:px-10">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-0 md:items-center">
          <div className="flex items-center text-sm tracking-wider text-primary font-light dark:text-background-dark md:border-r md:border-accent-subtle/30 md:pr-10 lg:pr-12">
            © {currentYear}
            <span className="text-accent-highlight mx-2">⦁</span>
            Philp
          </div>

          <div className="flex md:justify-end md:pl-10 lg:pl-12">
            <a
              href="https://github.com/chrismphilp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wider text-primary font-light underline-effect hover:text-accent-highlight dark:text-background-dark"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-1/4 h-px bg-accent opacity-40"></div>
    </footer>
  );
};

export default Footer;
