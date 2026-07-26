/// <reference types="vite/client" />
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Menu, X, Moon, Sun, ChevronDown, ChevronRight, ChevronLeft, Clock } from 'lucide-react';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Dynamically import all markdown files as raw strings
const markdownFiles = import.meta.glob('./notes/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

// Helper to format file path to route and title
const formatPath = (path: string) => {
  const cleanPath = path.replace('./notes/', '').replace('.md', '');
  const parts = cleanPath.split('/');
  // Remove numeric prefixes like "01-" for the title
  const cleanTitle = parts[parts.length - 1].replace(/^\d+-/, '').replace(/-/g, ' ');
  const title = cleanTitle.replace(/\b\w/g, l => l.toUpperCase());
  return { route: `/${cleanPath}`, title, parts, rawPath: path };
};

// Build navigation tree (exclude welcome.md from standard list)
const navItems = Object.keys(markdownFiles)
  .filter(path => !path.includes('welcome.md'))
  .map(formatPath)
  .sort((a, b) => a.route.localeCompare(b.route)); // Sorts by route, which includes numeric prefixes

// Group navigation by folder (2-level hierarchy)
type GroupedNav = Record<string, {
  display: string;
  subGroups: Record<string, {
    display: string;
    items: typeof navItems;
  }>;
  items: typeof navItems;
}>;

const groupedNav = navItems.reduce((acc, item) => {
  const topFolder = item.parts.length > 1 ? item.parts[0] : 'general';
  const topDisplay = topFolder.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase();

  if (!acc[topFolder]) {
    acc[topFolder] = { display: topDisplay, subGroups: {}, items: [] };
  }

  if (item.parts.length > 2) {
    // Has a subfolder
    const subFolder = item.parts[1];
    const subDisplay = subFolder.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase();
    
    if (!acc[topFolder].subGroups[subFolder]) {
      acc[topFolder].subGroups[subFolder] = { display: subDisplay, items: [] };
    }
    acc[topFolder].subGroups[subFolder].items.push(item);
  } else {
    // Direct file
    acc[topFolder].items.push(item);
  }

  return acc;
}, {} as GroupedNav);

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // Initialize all folders as open
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    Object.keys(groupedNav).forEach(topKey => {
      initialState[topKey] = true; // Open top-level by default
      Object.keys(groupedNav[topKey].subGroups).forEach(subKey => {
        initialState[`${topKey}-${subKey}`] = true; // Open sub-levels by default
      });
    });
    return initialState;
  });

  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close sidebar on route change on mobile and scroll to top
  useEffect(() => {
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleFolder = (folderKey: string) => {
    setOpenFolders(prev => ({ ...prev, [folderKey]: !prev[folderKey] }));
  };

  const currentIndex = navItems.findIndex(item => item.route === location.pathname);
  const prevItem = currentIndex > 0 ? navItems[currentIndex - 1] : null;
  const nextItem = currentIndex !== -1 && currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null;
  const currentItem = currentIndex !== -1 ? navItems[currentIndex] : null;

  return (
    <div className="flex min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-primary-500/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex flex-col
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between shrink-0">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary-500">ByteNotes</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-gray-900 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
          <div className="mb-4">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-bold transition-all border border-transparent ${
                location.pathname === '/' 
                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' 
                  : 'text-gray-900 hover:bg-gray-100 hover:border-[var(--border-color)] dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white'
              }`}
            >
              🏠 Welcome
            </Link>
          </div>
          {Object.entries(groupedNav).map(([topKey, topGroup]) => {
            const isTopOpen = openFolders[topKey];
            return (
              <div key={topKey} className="mb-4">
                {/* Top Level Folder */}
                <button 
                  onClick={() => toggleFolder(topKey)}
                  className="w-full flex items-center justify-between mb-2 px-2 py-2 text-sm font-bold tracking-wider text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors uppercase shadow-sm border border-transparent hover:border-[var(--border-color)]"
                >
                  <span>{topGroup.display}</span>
                  {isTopOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {isTopOpen && (
                  <div className="ml-1 pl-3 border-l border-[var(--border-color)] space-y-3">
                    
                    {/* Direct Items in Top Folder */}
                    {topGroup.items.length > 0 && (
                      <ul className="space-y-0.5">
                        {topGroup.items.map(item => {
                          const isActive = location.pathname === item.route;
                          return (
                            <li key={item.route}>
                              <Link
                                to={item.route}
                                className={`block px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                  isActive 
                                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold' 
                                    : 'text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white'
                                }`}
                              >
                                {item.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {/* Sub Groups */}
                    {Object.entries(topGroup.subGroups).map(([subKey, subGroup]) => {
                      const compoundKey = `${topKey}-${subKey}`;
                      const isSubOpen = openFolders[compoundKey];
                      return (
                        <div key={subKey} className="mb-2">
                          <button 
                            onClick={() => toggleFolder(compoundKey)}
                            className="w-full flex items-center justify-between mb-1 px-2 py-1.5 text-xs font-bold tracking-wider text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded transition-colors uppercase"
                          >
                            <span>{subGroup.display}</span>
                            {isSubOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                          
                          {isSubOpen && (
                            <ul className="space-y-0.5 mt-1 border-l ml-3 pl-2 border-[var(--border-color)]">
                              {subGroup.items.map(item => {
                                const isActive = location.pathname === item.route;
                                return (
                                  <li key={item.route}>
                                    <Link
                                      to={item.route}
                                      className={`block px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive 
                                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold' 
                                          : 'text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white'
                                      }`}
                                    >
                                      {item.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 bg-[var(--bg-color)]/80 backdrop-blur-md border-b border-[var(--border-color)] lg:justify-end lg:px-8">
          <div className="flex items-center lg:hidden">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-900 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Menu size={24} />
            </button>
            <span className="ml-2 text-lg font-bold text-primary-500">ByteNotes</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/rajmpawar-hash/ByteNotes"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[var(--sidebar-bg)] border border-[var(--border-color)] text-gray-900 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all shadow-sm"
              aria-label="GitHub Repository"
            >
              <GithubIcon size={20} />
            </a>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-[var(--sidebar-bg)] border border-[var(--border-color)] text-gray-900 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 lg:pt-6">
          <div className="max-w-4xl mx-auto w-full pb-20">
            {/* Breadcrumbs */}
            {currentItem && (
              <nav className="mb-6 flex items-center flex-wrap text-sm text-gray-900 dark:text-gray-400 font-medium">
                <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
                {currentItem.parts.map((part, index) => {
                  const cleanPart = part.replace(/^\d+-/, '').replace(/-/g, ' ');
                  const isLast = index === currentItem.parts.length - 1;
                  return (
                    <span key={index} className="flex items-center capitalize">
                      <ChevronRight size={14} className="mx-1.5 flex-shrink-0 opacity-50" />
                      {isLast ? (
                        <span className="text-gray-900 dark:text-gray-200 font-semibold">{cleanPart}</span>
                      ) : (
                        <span>{cleanPart}</span>
                      )}
                    </span>
                  );
                })}
              </nav>
            )}

            {children}

            {/* Next/Prev Navigation */}
            {currentItem && (
              <div className="mt-16 flex justify-between items-center border-t border-[var(--border-color)] pt-8">
                {prevItem ? (
                  <Link to={prevItem.route} className="flex flex-col items-start hover:text-primary-500 transition-colors group w-1/2 pr-4">
                    <span className="text-xs text-gray-900 dark:text-gray-400 uppercase tracking-wider mb-1 font-bold">Previous</span>
                    <span className="font-medium text-base flex items-center text-gray-900 dark:text-gray-200 group-hover:text-primary-500 transition-colors">
                      <ChevronLeft size={18} className="mr-1 -ml-1 transition-transform group-hover:-translate-x-1" /> 
                      <span className="truncate">{prevItem.title}</span>
                    </span>
                  </Link>
                ) : <div className="w-1/2" />}
                
                {nextItem ? (
                  <Link to={nextItem.route} className="flex flex-col items-end hover:text-primary-500 transition-colors group w-1/2 pl-4 text-right">
                    <span className="text-xs text-gray-900 dark:text-gray-400 uppercase tracking-wider mb-1 font-bold">Next</span>
                    <span className="font-medium text-base flex items-center text-gray-900 dark:text-gray-200 group-hover:text-primary-500 transition-colors">
                      <span className="truncate">{nextItem.title}</span>
                      <ChevronRight size={18} className="ml-1 -mr-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ) : <div className="w-1/2" />}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function MarkdownViewer({ content }: { content: string }) {
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="mb-8 flex items-center text-sm font-bold text-gray-900 dark:text-gray-300 border-b border-[var(--border-color)] pb-4">
        <Clock size={16} className="mr-2 opacity-80" />
        {readingTime} min read
      </div>
      <div className="markdown-body">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MarkdownViewer content={markdownFiles['./notes/welcome.md'] || '# Welcome to ByteNotes\n\nPlease add a `welcome.md` to the `src/notes/` directory.'} />} />
          {Object.entries(markdownFiles).map(([path, content]) => {
            const { route } = formatPath(path);
            return (
              <Route 
                key={route} 
                path={route} 
                element={<MarkdownViewer content={content} />} 
              />
            );
          })}
          <Route path="*" element={
            <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
              <h1 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">404</h1>
              <p className="text-xl text-gray-900 mb-8">The note you are looking for does not exist.</p>
              <Link to="/" className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30">
                Go back home
              </Link>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}
