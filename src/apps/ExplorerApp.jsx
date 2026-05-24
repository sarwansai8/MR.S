import React, { useState } from 'react';
import { I } from '../IconSet.jsx';
import { PROJECTS, SBR, SP } from '../constants.js';

export default function ExplorerApp() {
  const [path, setPath] = useState(['home', 'visitor']);
  const [selected, setSelected] = useState(null);

  const FOLDERS = {
    'home': { type: 'dir', children: ['visitor'] },
    'visitor': { type: 'dir', children: ['projects', 'documents', 'downloads'] },
    'projects': { type: 'dir', children: PROJECTS.map(p => p.title) },
    'documents': { type: 'dir', children: ['resume.pdf', 'about.txt'] },
    'downloads': { type: 'dir', children: [] }
  };

  const getContents = (p) => {
    const currentName = p[p.length - 1];
    const folder = FOLDERS[currentName];
    if (folder) {
      return folder.children.map(name => {
        const isDir = !!FOLDERS[name] || name === 'projects' || name === 'documents' || name === 'downloads';
        return { name, isDir };
      });
    }
    
    if (currentName === 'projects') {
      return PROJECTS.map(p => ({ name: p.title + '.lnk', isDir: false }));
    }
    return [];
  };

  const contents = getContents(path);

  const handleOpen = (item) => {
    if (item.isDir) {
      setPath([...path, item.name]);
      setSelected(null);
    } else {
      // It's a file, we could trigger opening an app or downloading
    }
  };

  const handleUp = () => {
    if (path.length > 1) {
      setPath(path.slice(0, -1));
      setSelected(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', background: 'var(--bg-tb)', borderBottom: '1px solid var(--brd)', gap: '0.5rem' }}>
        <button className="fbtn" style={{ padding: '4px 8px', width: 'auto' }} onClick={handleUp} disabled={path.length <= 1}>
          <I.ChevronL style={{ width: '14px', height: '14px' }} />
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--brd)', padding: '4px 8px', fontSize: '0.8rem', color: 'var(--text)' }}>
          /{path.join('/')}
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '180px', borderRight: '1px solid var(--brd)', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0' }}>
          <div style={{ padding: '0.25rem 1rem', fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 'bold' }}>Quick Access</div>
          <div style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: path[path.length - 1] === 'visitor' ? 'rgba(255,255,255,0.06)' : 'transparent' }} onClick={() => setPath(['home', 'visitor'])}>
            <I.User style={{ width: '16px', height: '16px' }} /> Home
          </div>
          <div style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: path[path.length - 1] === 'projects' ? 'rgba(255,255,255,0.06)' : 'transparent' }} onClick={() => setPath(['home', 'visitor', 'projects'])}>
            <I.Code style={{ width: '16px', height: '16px' }} /> Projects
          </div>
          <div style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: path[path.length - 1] === 'documents' ? 'rgba(255,255,255,0.06)' : 'transparent' }} onClick={() => setPath(['home', 'visitor', 'documents'])}>
            <I.Folder style={{ width: '16px', height: '16px' }} /> Documents
          </div>
        </div>
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', alignContent: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
          {contents.map(item => (
            <div 
              key={item.name}
              onClick={() => setSelected(item.name)}
              onDoubleClick={() => handleOpen(item)}
              style={{
                width: '80px',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                borderRadius: '6px',
                background: selected === item.name ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: selected === item.name ? '1px solid var(--brd-f)' : '1px solid transparent'
              }}
            >
              <div style={{ color: item.isDir ? 'var(--accent-blue)' : 'var(--text-dim)' }}>
                {item.isDir ? <I.FolderF style={{ width: '36px', height: '36px' }} /> : <I.Code style={{ width: '36px', height: '36px' }} />}
              </div>
              <div style={{ fontSize: '0.7rem', textAlign: 'center', wordBreak: 'break-word', lineHeight: '1.2' }}>{item.name}</div>
            </div>
          ))}
          {contents.length === 0 && <div style={{ width: '100%', textAlign: 'center', color: 'var(--text-dim)', marginTop: '2rem', fontSize: '0.85rem' }}>This folder is empty.</div>}
        </div>
      </div>
    </div>
  );
}
