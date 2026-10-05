/**
 * Script inline exécuté avant le premier rendu : applique le thème (clair/sombre)
 * et la classe `js` sans flash. Doit rester minuscule.
 */
const code = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('kinetic-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
