export const BRAND = 'MR.S';
export const OS_ID = 'mrs-os';
export const FULL_NAME = 'Maddipati Sarwansai';
export const ROLE = 'Cybersecurity Student & Aspiring Professional';
export const BIO = `I am a final-year cybersecurity student focused on ethical hacking, digital security, and secure solution building. I have a strong interest in penetration testing, malware analysis, IoT security, and AI-driven cybersecurity, alongside full-stack development experience.`;
export const INITIALS = 'MS';

export const ASCII = ` ███╗   ███╗██████╗       ███████╗
 ████╗ ████║██╔══██╗      ██╔════╝
 ██╔████╔██║██████╔╝█████╗███████╗
 ██║╚██╔╝██║██╔══██╗╚════╝╚════██║
 ██║ ╚═╝ ██║██║  ██║      ███████║
 ╚═╝     ╚═╝╚═╝  ╚═╝      ╚══════╝`;

export const PROJECTS = [
  { 
    id: 'p_healthgov', 
    title: 'Real-Time Cyber Threat Management', 
    d: 'Enterprise-grade healthcare platform (HealthGov) with 28 security layers (zero-trust, HIPAA-focused). Includes a built-in penetration test simulator, live attack map, and honeypots.', 
    e: '🛡️', 
    tags: ['Next.js 15', 'TypeScript', 'MongoDB', 'Cryptography'], 
    link: 'https://github.com/sarwansai8/-Real-Time-Cyber-Threat-Management-Using-a-Modular-High-Interaction-Honeypot-Architecture',
    status: 'Complete',
    highlight: '28 Security Layers (Zero-Trust)',
    demo: 'https://github.com/sarwansai8/-Real-Time-Cyber-Threat-Management-Using-a-Modular-High-Interaction-Honeypot-Architecture',
    accentColor: '#3b82f6' // accent blue
  },
  { 
    id: 'p_cybertrap', 
    title: 'CyberTrapX Honeypot System', 
    d: 'Advanced multi-layered honeypot system to lure attackers, log malicious activity, and analyze threat behavior for forensics and pattern analysis.', 
    e: '🪤', 
    tags: ['Python', 'Flask', 'PowerShell', 'Cybersecurity'], 
    link: 'https://github.com/sarwansai8/Advanced-Multi-Layered-Honeypot-System.git',
    status: 'Complete',
    highlight: 'Multi-Layered Interactive Honeypot',
    demo: 'https://github.com/sarwansai8/Advanced-Multi-Layered-Honeypot-System.git',
    accentColor: '#f43f5e' // accent rose
  },
  { 
    id: 'p_zerotrace', 
    title: 'ZeroTrace-Health', 
    d: 'Decentralized healthcare management system built with Polygon, Hardhat, Supabase, and React. Focused on privacy-first workflows with client-side encryption, on-chain integrity checks, and role-based access control for patients, doctors, and admins.', 
    e: '🏥', 
    tags: ['React', 'Polygon', 'Supabase', 'Hardhat'], 
    link: 'https://github.com/sarwansai8/ZeroTrace-Health.git',
    status: 'Complete',
    highlight: 'Blockchain-Based Secure Records',
    demo: 'https://github.com/sarwansai8/ZeroTrace-Health.git',
    accentColor: '#10b981' // accent emerald
  },
  { 
    id: 'p_sentinelx', 
    title: 'SentinelX', 
    d: 'Real-time multimodal crisis intelligence system for social media credibility scoring. Combines NLP, computer vision, bot detection, and anomaly analysis with a Chrome extension and FastAPI backend.', 
    e: '🛰️', 
    tags: ['Python', 'FastAPI', 'MongoDB', 'Chrome Extension'], 
    link: 'https://github.com/sarwansai8/SentinelX.git',
    status: 'Active',
    highlight: 'Multimodal Credibility Scoring Engine',
    demo: 'https://github.com/sarwansai8/SentinelX.git',
    accentColor: '#8b5cf6' // accent purple
  },
  { 
    id: 'p_wifi_security', 
    title: 'Wi‑Fi Security Assessment Tool', 
    d: 'An educational tool for demonstrating Wi‑Fi security concepts and basic network vulnerability assessment. Includes network discovery guidance, handshake capture walkthroughs, and password strength estimation.', 
    e: '📶', 
    tags: ['Python', 'Nmap', 'WPA/WPA2', 'Education'], 
    link: 'https://github.com/sarwansai8/wifi-security-tool.git',
    status: 'Complete',
    highlight: 'Educational Handshake Auditing Tool',
    demo: 'https://github.com/sarwansai8/wifi-security-tool.git',
    accentColor: '#fbbf24' // accent amber
  },
  { 
    id: 'p1', 
    title: 'Courses Platform', 
    d: 'MERN application with Firebase Auth, role-based access, MongoDB Idea Board, React Router, Redux, and Framer Motion.', 
    e: '🌐', 
    tags: ['React', 'Node.js', 'MongoDB', 'Firebase'], 
    link: 'https://github.com/sarwansai8',
    status: 'Complete',
    highlight: 'Full-Stack MERN Learning Portal',
    demo: null,
    accentColor: '#38bdf8' // accent sky
  },
  { 
    id: 'p2', 
    title: 'ForensicaX', 
    d: 'Ethical mobile forensics tool with Android data capture, AES encryption, and Python-based decryption and analysis.', 
    e: '🔍', 
    tags: ['Python', 'Android', 'Cryptography'], 
    link: 'https://github.com/sarwansai8',
    status: 'Complete',
    highlight: 'Mobile Artifact Extraction Tool',
    demo: null,
    accentColor: '#e11d48' // accent rose-dark
  },
  { 
    id: 'p3', 
    title: 'IoT Security IDS', 
    d: 'IDS for smart devices detecting DoS, spoofing, and brute-force attacks using Python and Wireshark.', 
    e: '🛡️', 
    tags: ['Python', 'Wireshark', 'IoT Security'], 
    link: 'https://github.com/sarwansai8',
    status: 'Complete',
    highlight: 'Network-Level Smart Device Guardian',
    demo: null,
    accentColor: '#22c55e' // accent green
  },
  { 
    id: 'p4', 
    title: 'Library Management', 
    d: 'Java and MySQL database project for cataloging, member management, and borrowing workflows.', 
    e: '📚', 
    tags: ['Java', 'MySQL', 'Backend'], 
    link: 'https://github.com/sarwansai8',
    status: 'Complete',
    highlight: 'Relational Database Management System',
    demo: null,
    accentColor: '#64748b' // accent slate
  }
];

export const SP = [
  { c: 'Languages', i: ['Java', 'Python', 'C', 'JavaScript', 'HTML/CSS'] },
  { c: 'Frontend', i: ['React', 'Tailwind', 'Shadcn UI', 'Framer Motion'] },
  { c: 'Backend', i: ['Node.js', 'Firebase', 'REST APIs', 'Spring Boot'] },
  { c: 'Tools & Security', i: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite', 'Git', 'Linux'] }
];

export const SKILL_RATINGS = [
  { name: 'Java', level: 85, cat: 'Languages' },
  { name: 'Python', level: 90, cat: 'Languages' },
  { name: 'C', level: 75, cat: 'Languages' },
  { name: 'JavaScript', level: 85, cat: 'Languages' },
  { name: 'HTML/CSS', level: 88, cat: 'Languages' },
  
  { name: 'React', level: 85, cat: 'Frontend' },
  { name: 'Tailwind', level: 90, cat: 'Frontend' },
  { name: 'Shadcn UI', level: 80, cat: 'Frontend' },
  { name: 'Framer Motion', level: 78, cat: 'Frontend' },
  
  { name: 'Node.js', level: 80, cat: 'Backend' },
  { name: 'Firebase', level: 82, cat: 'Backend' },
  { name: 'REST APIs', level: 85, cat: 'Backend' },
  { name: 'Spring Boot', level: 70, cat: 'Backend' },
  
  { name: 'Wireshark', level: 85, cat: 'Tools & Security' },
  { name: 'Nmap', level: 88, cat: 'Tools & Security' },
  { name: 'Metasploit', level: 80, cat: 'Tools & Security' },
  { name: 'Burp Suite', level: 82, cat: 'Tools & Security' },
  { name: 'Git', level: 85, cat: 'Tools & Security' },
  { name: 'Linux', level: 90, cat: 'Tools & Security' }
];

export const SBR = [
  { n: 'Cybersecurity', p: 92, desc: 'Penetration Testing, Ethical Hacking & Threat Detection' },
  { n: 'Full-Stack Dev', p: 85, desc: 'Responsive UIs, Backend APIs & Smart Integrations' },
  { n: 'Secure Coding', p: 88, desc: 'Cryptography, Cryptographic Keys & Blockchain' }
];

export const EDUCATION = [
  {
    year: '2022 - 2026',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'KL University',
    specialization: 'Specialization in Cybersecurity (GPA: 8.8/10)',
    details: 'Rigorous course focusing on Secure Software Systems, Penetration Testing, Intrusion Detection, Cryptography, Network Protocols, and Digital Forensics. Led cybersecurity student cluster.'
  },
  {
    year: '2020 - 2022',
    degree: 'Intermediate Education (MPC)',
    institution: 'Narayana Junior College',
    specialization: 'Physics, Chemistry & Mathematics (96.5%)',
    details: 'Strengthened core logical, mathematical, and analytical foundation. Excelled in competitive problem solving.'
  }
];

export const STATS = [
  { value: 9, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '', label: 'Professional Certifications' },
  { value: 4, suffix: ' Years', label: 'Academic Cyber Experience' },
  { value: 500, suffix: '+', label: 'GitHub Commits (Past Year)' }
];

export const BIOS_LINES = [
  { text: `${BRAND}OS BIOS v2.4.1 — Advanced Configuration Utility`, cls: 'highlight' },
  { text: 'Copyright (c) 2024-2026, Mr. S Technologies Inc.' },
  { text: '' },
  { text: 'Initializing System...', cls: 'highlight' },
  { text: 'CPU: React v19.0.0 Quantum @ 4.2GHz .............. [ OK ]', cls: 'ok' },
  { text: 'Memory Test: 32768 MB DDR5 ........................ [ OK ]', cls: 'ok' },
  { text: 'GPU: WebGL 2.0 / Canvas Renderer .................. [ OK ]', cls: 'ok' },
  { text: '' },
  { text: 'Detecting Storage Devices...' },
  { text: '  /dev/sda1  NVMe SSD  512GB  [Portfolio OS]' },
  { text: '  /dev/sdb1  SSD       1TB    [Projects Archive]' },
  { text: '' },
  { text: 'Network: Ethernet Connected [192.168.1.42]', cls: 'ok' },
  { text: 'Firewall: Active ................................ [ OK ]', cls: 'ok' },
  { text: '' },
  { text: 'Loading bootloader...', cls: 'warn' },
  { text: `Starting ${BRAND}OS...`, cls: 'highlight' },
];
