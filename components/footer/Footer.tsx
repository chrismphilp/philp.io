const Footer = () => (
  <footer className="site-footer">
    <span>© {new Date().getFullYear()} Christopher Philp</span>
    <span className="footer-note">Always a little more to explore.</span>
    <a href="https://github.com/chrismphilp" target="_blank" rel="noopener noreferrer">
      GitHub <span aria-hidden="true">↗</span>
    </a>
  </footer>
);
export default Footer;
