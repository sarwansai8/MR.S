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
  { id: 'p_healthgov', title: 'Real-Time Cyber Threat Management', d: 'Enterprise-grade healthcare platform (HealthGov) with 28 security layers (zero-trust, HIPAA-focused). Includes a built-in penetration test simulator, live attack map, and honeypots.', e: '🛡️', tags: ['Next.js 15', 'TypeScript', 'MongoDB', 'Cryptography'], link: 'https://github.com/sarwansai8/-Real-Time-Cyber-Threat-Management-Using-a-Modular-High-Interaction-Honeypot-Architecture' },
  { id: 'p_cybertrap', title: 'CyberTrapX Honeypot System', d: 'Advanced multi-layered honeypot system to lure attackers, log malicious activity, and analyze threat behavior for forensics and pattern analysis.', e: '🪤', tags: ['Python', 'Flask', 'PowerShell', 'Cybersecurity'], link: 'https://github.com/sarwansai8/Advanced-Multi-Layered-Honeypot-System.git' },
  { id: 'p_zerotrace', title: 'ZeroTrace-Health', d: 'Decentralized healthcare management system built with Polygon, Hardhat, Supabase, and React. Focused on privacy-first workflows with client-side encryption, on-chain integrity checks, and role-based access control for patients, doctors, and admins.', e: '🏥', tags: ['React', 'Polygon', 'Supabase', 'Hardhat'], link: 'https://github.com/sarwansai8/ZeroTrace-Health.git' },
  { id: 'p_sentinelx', title: 'SentinelX', d: 'Real-time multimodal crisis intelligence system for social media credibility scoring. Combines NLP, computer vision, bot detection, and anomaly analysis with a Chrome extension and FastAPI backend.', e: '🛰️', tags: ['Python', 'FastAPI', 'MongoDB', 'Chrome Extension'], link: 'https://github.com/sarwansai8/SentinelX.git' },
  { id: 'p_wifi_security', title: 'Wi‑Fi Security Assessment Tool', d: 'An educational tool for demonstrating Wi‑Fi security concepts and basic network vulnerability assessment. Includes network discovery guidance, handshake capture walkthroughs, and password strength estimation. IMPORTANT: For education only — only scan networks you own or have permission to test.', e: '📶', tags: ['Python', 'Nmap', 'WPA/WPA2', 'Education'], link: 'https://github.com/sarwansai8/wifi-security-tool.git' },
  { id: 'p1', title: 'Courses Platform', d: 'MERN application with Firebase Auth, role-based access, MongoDB Idea Board, React Router, Redux, and Framer Motion.', e: '🌐', tags: ['React', 'Node.js', 'MongoDB', 'Firebase'], link: 'https://github.com/sarwansai8' },
  { id: 'p2', title: 'ForensicaX', d: 'Ethical mobile forensics tool with Android data capture, AES encryption, and Python-based decryption and analysis.', e: '🔍', tags: ['Python', 'Android', 'Cryptography'], link: 'https://github.com/sarwansai8' },
  { id: 'p3', title: 'IoT Security IDS', d: 'IDS for smart devices detecting DoS, spoofing, and brute-force attacks using Python and Wireshark.', e: '🛡️', tags: ['Python', 'Wireshark', 'IoT Security'], link: 'https://github.com/sarwansai8' },
  { id: 'p4', title: 'Library Management', d: 'Java and MySQL database project for cataloging, member management, and borrowing workflows.', e: '📚', tags: ['Java', 'MySQL', 'Backend'], link: 'https://github.com/sarwansai8' }
];

export const SP = [
  { c: 'Languages', i: ['Java', 'Python', 'C', 'JavaScript', 'HTML/CSS'] },
  { c: 'Frontend', i: ['React', 'Tailwind', 'Shadcn UI', 'Framer Motion'] },
  { c: 'Backend', i: ['Node.js', 'Firebase', 'REST APIs', 'Spring Boot'] },
  { c: 'Tools & Security', i: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite', 'Git', 'Linux'] }
];
export const SBR = [{ n: 'Web Dev', p: 85 }, { n: 'Cybersecurity', p: 90 }, { n: 'Python', p: 80 }];

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
