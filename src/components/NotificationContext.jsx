import React, { useState, useRef, useCallback, createContext, useContext } from 'react';

const NCtx = createContext(null);

export function NProvider({ children }) {
  const [list, setList] = useState([]);
  const [history, setHistory] = useState([]);
  const id = useRef(0);
  
  const push = useCallback((t, m) => {
    const nid = ++id.current;
    const ts = new Date();
    setList(p => [...p, { id: nid, t, m, out: false }]);
    setHistory(p => [{ id: nid, t, m, ts }, ...p].slice(0, 30));
    
    setTimeout(() => { 
      setList(p => p.map(n => n.id === nid ? { ...n, out: true } : n)); 
      setTimeout(() => setList(p => p.filter(n => n.id !== nid)), 200); 
    }, 4000);
  }, []);
  
  const dismiss = useCallback(nid => { 
    setList(p => p.map(n => n.id === nid ? { ...n, out: true } : n)); 
    setTimeout(() => setList(p => p.filter(n => n.id !== nid)), 200); 
  }, []);
  
  const clearHistory = useCallback(() => setHistory([]), []);
  
  return (
    <NCtx.Provider value={{ push, history, clearHistory }}>
      {children}
      <div className="nw">
        {list.map(n => (
          <div key={n.id} className={`nn ${n.out ? 'out' : ''}`} onClick={() => dismiss(n.id)}>
            <div className="nn-b">
              <div className="nn-t">{n.t}</div>
              <div className="nn-m">{n.m}</div>
            </div>
          </div>
        ))}
      </div>
    </NCtx.Provider>
  );
}

export function useN() { 
  return useContext(NCtx); 
}
