import { CONTACT_INFO } from '@/app/constants/contact';

export function Footer() {

  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm font-body">
          © {new Date().getFullYear()} John Rey Cabintoy. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={CONTACT_INFO.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent text-sm transition-colors"
          >
            GitHub
          </a>
          <a
           href={CONTACT_INFO.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent text-sm transition-colors"
          >
            LinkedIn
          </a>
         
        </div>
      </div>
    </footer>
  );
}
