import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-high dark:bg-surface-container border-t border-outline-variant mt-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between items-center w-full px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div className="mb-stack-lg lg:mb-0">
          <div className="font-display-lg text-title-md font-bold text-primary mb-2">SafeSphere</div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">Empowering communities through innovative public safety technology.</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 lg:justify-end">
          <Link className="font-body-md text-body-md text-on-surface-variant hover:underline transition-all opacity-80 hover:opacity-100" to="/privacy">Privacy Policy</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:underline transition-all opacity-80 hover:opacity-100" to="/terms">Terms of Service</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:underline transition-all opacity-80 hover:opacity-100" to="/about">Contact Support</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:underline transition-all opacity-80 hover:opacity-100" to="/sos">Emergency Protocol</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:underline transition-all opacity-80 hover:opacity-100" to="/faqs">FAQs</Link>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop pb-8 text-center lg:text-left">
        <p className="text-on-surface-variant text-sm opacity-60">© 2024 SafeSphere Public Safety Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
