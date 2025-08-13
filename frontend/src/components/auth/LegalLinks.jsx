// LegalLinks.jsx - Liens légaux pour l'authentification
import { Link } from 'react-router-dom';

const LegalLinks = ({ className = '' }) => {
  const links = [
    { to: '/privacy', label: 'Confidentialité' },
    { to: '/terms', label: 'Conditions' },
    { to: '/help', label: 'Aide' }
  ];

  return (
    <div className={`flex items-center justify-center gap-1 text-sm text-slate-400 ${className}`}>
      {links.map((link, index) => (
        <span key={link.to} className="flex items-center gap-1">
          <Link
            to={link.to}
            className="hover:text-white transition-colors duration-200 underline-offset-2 hover:underline"
          >
            {link.label}
          </Link>
          {index < links.length - 1 && (
            <span className="text-slate-500">•</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default LegalLinks;
