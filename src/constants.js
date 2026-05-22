export const BRAND = 'MR.S';
export const OS_ID = 'mrs-os';
export const FULL_NAME = 'Sarwansai Maddipati';
export const ROLE = 'Software Engineer & Cybersecurity Professional';
export const BIO = `To leverage my skills in software engineering and cybersecurity to secure a challenging role that protects digital assets and drives innovation. I’m excited to apply my expertise in developing secure software solutions and threat analysis to contribute to a forward-thinking organization.`;
export const INITIALS = 'SM';

export const ASCII = ` ███╗   ███╗██████╗       ███████╗
 ████╗ ████║██╔══██╗      ██╔════╝
 ██╔████╔██║██████╔╝█████╗███████╗
 ██║╚██╔╝██║██╔══██╗╚════╝╚════██║
 ██║ ╚═╝ ██║██║  ██║      ███████║
 ╚═╝     ╚═╝╚═╝  ╚═╝      ╚══════╝`;

export const PROJECTS = [
  { 
    id: 'p_courses', 
    title: 'Courses Platform', 
    d: 'Built a full-stack MERN application with Firebase Auth, role-based access, and MongoDB-based Idea Board. Designed responsive UI using React Router, Redux, and Framer Motion for smooth user experience.', 
    e: '🌐', 
    tags: ['React', 'Node.js', 'MongoDB', 'Firebase Auth', 'Redux', 'Framer Motion'], 
    link: 'https://github.com/sarwansai8',
    status: 'Complete',
    highlight: 'Full-Stack MERN Learning Portal',
    demo: 'https://github.com/sarwansai8',
    accentColor: '#3b82f6' // accent blue
  },
  { 
    id: 'p_forensicax', 
    title: 'ForensicaX', 
    d: 'Developed a stealth Android app to capture SMS, call logs, contacts, and IP; secured data with AES encryption. Created a Python-based module to decrypt and analyze collected forensic data.', 
    e: '🔍', 
    tags: ['Python', 'Android', 'AES Encryption', 'Mobile Forensics', 'Cryptography'], 
    link: 'https://github.com/sarwansai8',
    status: 'Complete',
    highlight: 'Mobile Artifact Extraction & Analysis Tool',
    demo: 'https://github.com/sarwansai8',
    accentColor: '#e11d48' // accent rose
  },
  { 
    id: 'p_iot_security', 
    title: 'IoT Security', 
    d: 'Built an IDS for IoT devices to detect DoS, spoofing, and brute force attacks using Python and Wireshark. Implemented real-time traffic monitoring, attack classification, and alert generation.', 
    e: '🛡️', 
    tags: ['Python', 'Wireshark', 'IoT Security', 'Intrusion Detection System'], 
    link: 'https://github.com/sarwansai8',
    status: 'Complete',
    highlight: 'Network-Level Smart Device Intrusion Detection',
    demo: 'https://github.com/sarwansai8',
    accentColor: '#22c55e' // accent green
  }
];

export const SP = [
  { c: 'Frontend', i: ['React.js', 'HTML', 'CSS', 'Responsive Design'] },
  { c: 'Backend & Databases', i: ['Node.js', 'Firebase', 'MONGODB'] },
  { c: 'Languages & Cloud', i: ['Python', 'AWS (S3, EC2 - basic understanding)'] },
  { c: 'Tools & Security Concepts', i: ['Git', 'VS Code', 'AI AGENTS', 'NMAP', 'WIRESHARK', 'Burp Suite', 'Software Design', 'Problem Solving', 'Threat Modeling', 'Incident Response'] }
];

export const SKILL_RATINGS = [
  { name: 'React.js', level: 85, cat: 'Frontend' },
  { name: 'HTML', level: 90, cat: 'Frontend' },
  { name: 'CSS', level: 88, cat: 'Frontend' },
  { name: 'Responsive Design', level: 90, cat: 'Frontend' },
  
  { name: 'Node.js', level: 80, cat: 'Backend & Databases' },
  { name: 'Firebase', level: 85, cat: 'Backend & Databases' },
  { name: 'MONGODB', level: 82, cat: 'Backend & Databases' },
  
  { name: 'Python', level: 90, cat: 'Languages & Cloud' },
  { name: 'AWS (S3, EC2)', level: 65, cat: 'Languages & Cloud' },
  
  { name: 'Git', level: 85, cat: 'Tools & Security Concepts' },
  { name: 'VS Code', level: 90, cat: 'Tools & Security Concepts' },
  { name: 'AI AGENTS', level: 88, cat: 'Tools & Security Concepts' },
  { name: 'NMAP', level: 85, cat: 'Tools & Security Concepts' },
  { name: 'WIRESHARK', level: 90, cat: 'Tools & Security Concepts' },
  { name: 'Burp Suite', level: 80, cat: 'Tools & Security Concepts' },
  { name: 'Software Design', level: 82, cat: 'Tools & Security Concepts' },
  { name: 'Problem Solving', level: 88, cat: 'Tools & Security Concepts' },
  { name: 'Threat Modeling', level: 80, cat: 'Tools & Security Concepts' },
  { name: 'Incident Response', level: 78, cat: 'Tools & Security Concepts' }
];

export const SBR = [
  { n: 'Software Engineering', p: 88, desc: 'Responsive Web Apps, Backend APIs & Cloud Resources' },
  { n: 'Cybersecurity', p: 90, desc: 'Network Traffic Analysis, Penetration Testing & Threat Assessment' },
  { n: 'Problem Solving', p: 92, desc: 'Algorithm Design, Cryptography & Forensics Log Decryption' }
];

export const EDUCATION = [
  {
    year: '2022 - 2026',
    degree: 'Bachelor of Technology (B. Tech)',
    institution: 'KL University',
    specialization: 'Specialization in Cybersecurity (CGPA: 7.80/10)',
    details: 'Rigorous coursework in Computer Science with a core specialization in Cybersecurity, covering Penetration Testing, Incident Response, Cryptography, Secure Software Design, and Threat Modeling.'
  },
  {
    year: '2020 - 2022',
    degree: 'Intermediate (IPE)',
    institution: 'Tirumala Junior College',
    specialization: 'Physics, Chemistry & Mathematics (MPC)',
    details: 'Acquired highly analytical problem solving skills and strong foundational engineering competencies.'
  },
  {
    year: '2019 - 2020',
    degree: 'Secondary School (SSC)',
    institution: 'Sri Chaitanya College of Education',
    specialization: 'High School Matriculation',
    details: 'Exceeded basic logical and secondary school education requirements.'
  }
];

export const STATS = [
  { value: 3, suffix: '', label: 'Projects Completed' },
  { value: 2, suffix: '', label: 'Industry Certifications' },
  { value: 4, suffix: ' Years', label: 'Academic Cyber Experience' },
  { value: 15, suffix: '+', label: 'Technical Skills Mastered' }
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
