// [EXAM] Skip link pour accessibilité
export default function SkipLinkExam() {
  return (
    <a 
      href="#main" 
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Aller au contenu
    </a>
  );
}
