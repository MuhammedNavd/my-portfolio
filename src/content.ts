/*
  Every string on the site lives here. The resume is the source: chapters,
  missions, metrics and skills are data, and the components only stage them.
*/

export const SITE = {
  name: 'Mohammed Naveed A',
  short: 'Naveed',
  monogram: 'MN',
  role: '.NET engineer · Azure cloud · AI-native systems',
  location: 'Chennai, India',
  timezone: 'IST · UTC+05:30',
  email: 'mohammednaveeda10@gmail.com',
  phone: '+91 6369525936',
  phoneHref: '+916369525936',
  linkedin: 'https://www.linkedin.com/in/muhammednaveed',
  linkedinLabel: 'linkedin.com/in/muhammednaveed',
  whatsapp: 'https://wa.me/916369525936',
  whatsappMessage: 'https://wa.me/916369525936?text=Hi%20Naveed%20%E2%80%94%20I%20saw%20your%20field%20log.',
  resume: `${import.meta.env.BASE_URL}resume/mohammed-naveed-a-resume.pdf`,
  year: 2026,
  logVersion: 'v1.5',
}

export type Chapter = { id: string; code: string; label: string }

export const CHAPTERS: Chapter[] = [
  { id: 'prologue', code: '00', label: 'Prologue' },
  { id: 'origin', code: '01', label: 'Origin' },
  { id: 'service', code: '02', label: 'Service' },
  { id: 'missions', code: '03', label: 'Missions' },
  { id: 'arsenal', code: '04', label: 'Arsenal' },
  { id: 'record', code: '05', label: 'Record' },
  { id: 'uplink', code: '06', label: 'Uplink' },
]

export const HERO = {
  eyebrow: 'Field log · operator MN-04',
  title: ['I keep the machine', 'running. Then I', 'teach it to think.'],
  body: 'Four years in production systems: forty legacy platforms rebuilt, three hundred security findings closed, and AI agents shipped into live enterprise workflows — without a single post-launch incident.',
  primary: { label: 'Read the log', href: '#prologue' },
  secondary: { label: 'Open comms', href: '#uplink' },
  meta: ['Chennai, India', 'Senior backend roles', 'Remote-ready'],
}

export const TICKER = [
  'ASP.NET Core',
  'C#',
  'Azure',
  'Entity Framework Core',
  'SQL Server',
  'Service Bus',
  'React',
  'TypeScript',
  'AI agents',
  'MCP',
  'IoT Hub',
  'Checkmarx',
  'Azure DevOps',
  'Cosmos DB',
]

export const STATS = [
  { value: '4+', label: 'years in production', note: 'Shipping enterprise .NET since 2022.' },
  { value: '40+', label: 'platforms modernised', note: 'Legacy systems moved to modern .NET and EF Core.' },
  { value: '75%', label: 'faster after migration', note: 'Performance gain measured across the migrated estate.' },
  { value: '0', label: 'post-launch incidents', note: 'Across backend, web and mobile releases.' },
]

export type TerminalLine = { text: string; prompt?: boolean; cursor?: boolean }

export const TERMINAL: TerminalLine[] = [
  { text: 'boot --operator "mohammed naveed a" --mode story', prompt: true },
  { text: 'loading runtime ......... dotnet · c# · ef core' },
  { text: 'mount cloud ............. azure · entra id · service bus' },
  { text: 'attach intelligence ..... llm apis · agents · mcp' },
  { text: 'status .................. senior software engineer, ideassion' },
  { text: 'uptime .................. 4 years · zero post-launch incidents' },
  { text: 'awaiting input', cursor: true },
]

export const PROLOGUE = {
  kicker: 'The signal',
  title: 'Every system has a first boot.',
  lead: 'Mine started with a stack trace I refused to close — and a habit of reading the parts of the codebase nobody had documented.',
  body: [
    'Most engineering stories are told as a list of technologies. This one is told as a runbook: what broke, what I rebuilt, and what stayed standing afterwards.',
    'The short version: I design and ship backend systems that carry real business weight — billing engines, inventory platforms, sensor calibration, AI-assisted workflows — and I try to leave each one easier to operate than I found it.',
  ],
}

export type TimelineEntry = {
  code: string
  date: string
  title: string
  org: string
  body: string
  tone: 'ice' | 'acid'
}

export const TIMELINE: TimelineEntry[] = [
  {
    code: '01',
    date: '2020',
    title: 'Bachelor of Computer Applications',
    org: 'The New College, Chennai',
    body: 'Three years of fundamentals, and the first time code did something I did not expect. Graduated into a world that had just moved online.',
    tone: 'ice',
  },
  {
    code: '02',
    date: 'Jan 2022',
    title: 'Software Engineer Trainee',
    org: 'Ideassion Technology Solutions',
    body: 'Four months inside production code: reading before writing, testing before shipping, and learning why the boring parts of a system are the parts that hold.',
    tone: 'acid',
  },
  {
    code: '03',
    date: 'Apr 2022',
    title: 'Master of Computer Applications',
    org: 'MEASI Institute of Information Technology, Chennai',
    body: 'A master’s in computer applications, finished while already working the job it was meant to prepare me for.',
    tone: 'ice',
  },
  {
    code: '04',
    date: 'May 2022 → now',
    title: 'Senior Software Engineer',
    org: 'Ideassion · client: Buckman Laboratories International',
    body: 'From junior on a forty-system legacy migration to leading fourteen engineers across backend, web and mobile for a US enterprise client.',
    tone: 'acid',
  },
]

export const ORIGIN = {
  kicker: 'Where it started',
  title: 'Chennai, and a very long migration.',
  lead: 'Two degrees, one internship, and a first assignment most juniors never get: move forty ageing systems forward without breaking the businesses running on them.',
  notes: [
    {
      label: 'The constraint',
      body: 'Legacy platforms cannot pause while you improve them. Every migration had to be invisible to the customer on the other side.',
    },
    {
      label: 'The method',
      body: 'Read the schema, write the design document, migrate in slices, keep the old path alive until the new one proves itself.',
    },
    {
      label: 'The result',
      body: 'Forty-plus projects on modern .NET and EF Core, roughly 75% faster, with the technical debt left behind in the old stack.',
    },
  ],
}

export const SERVICE = {
  kicker: 'Deployment record',
  role: 'Senior Software Engineer',
  company: 'Ideassion Technology Solutions',
  client: 'Buckman Laboratories International',
  clientNote: 'US-based global vendor of digital water and industrial chemical platforms',
  period: 'May 2022 — Present',
  location: 'Chennai, India',
  intro:
    'Four client projects, one fourteen-person team, and a mandate that covers everything from the API contract to the mobile release. I work directly with US stakeholders to turn a paragraph of business need into a spec, a schema and a release date.',
  impacts: [
    { value: '14', unit: 'engineers', label: 'cross-functional team led', note: 'Backend, web and mobile, end to end.' },
    { value: '100', unit: '%', label: 'on-time delivery', note: 'Four client projects, no slipped dates.' },
    { value: '80', unit: '%', label: 'less manual turnaround', note: 'Scheduled jobs and SMTP notification workflows.' },
    { value: '5k', unit: '+', label: 'daily shipments tracked', note: 'High-volume processing and third-party integration.' },
  ],
  work: [
    'Shipped backend, web and mobile applications to production with zero post-launch issues, building ASP.NET Core APIs and microservices on SQL Server.',
    'Migrated 40+ legacy projects to modern .NET and EF Core, improving performance by 75% and removing a decade of technical debt.',
    'Cut manual turnaround by 80% by automating background jobs with schedulers and SMTP notification workflows.',
    'Built and optimised RESTful APIs for high-volume data processing and third-party integration, standardising OpenAPI/Swagger specs to unblock UI and partner teams.',
    'Authored Software Design Documents covering 100% of functional requirements for a new Solution & Profitability Platform handling multi-customer chemical-product billing.',
    'Constructed AI-native features with LLM APIs, agents and MCP in two months, automating key workflows and cutting manual effort.',
    'Streamlined Azure infrastructure and release flow with CI/CD pipelines in Azure DevOps.',
  ],
  note: {
    label: 'Operating note',
    body: 'The client is nine time zones away and the requirement arrives as a paragraph, not a ticket. My job is to turn it into a spec, a schema, and a release date everyone can live with.',
  },
}

export type Mission = {
  id: string
  code: string
  name: string
  tag: string
  metric: string
  summary: string
  bullets: string[]
  stack: string[]
}

export const MISSIONS: Mission[] = [
  {
    id: 'logistics',
    code: 'M-01',
    name: 'AI-Native Logistics Platform',
    tag: 'Autonomous routing',
    metric: '−25% delivery TAT',
    summary:
      'An autonomous logistics layer that plans routes and forecasts inventory without waiting for a human to open a spreadsheet.',
    bullets: [
      'Orchestrated an agent framework for route optimisation and inventory forecasting, cutting delivery turnaround by 25% and lifting tracking accuracy to 99.9%.',
      'Built cargo-tracking dashboards handling 5,000+ daily shipments on Next.js and Node.js, with resilient REST endpoints and comprehensive error handling.',
      'Designed the monitoring frontend in React and TypeScript on a modular, reusable component library.',
    ],
    stack: ['AI agents', 'Next.js', 'Node.js', 'React', 'TypeScript', 'REST'],
  },
  {
    id: 'predictor',
    code: 'M-02',
    name: 'Ackumen Product Predictor',
    tag: 'Decision engine',
    metric: '−60% proposal time',
    summary:
      'A survey-driven advisory engine that turns a cooling-tower assessment into an exact chemical treatment programme.',
    bullets: [
      'Built the automated AP Engine that calculates treatment programmes, pH/CoC dosage specifications and biocide additives from operational assessments.',
      'Created secure HTTPS microservice channels into PIMS and BUPR SQL databases, querying cost, formulation and viscosity data across 5,000+ catalog items.',
      'Standardised output payloads into Equipment Selection, Ordering and Proposal Generation, cutting proposal creation time by 60%.',
    ],
    stack: ['ASP.NET Core', 'SQL Server', 'Microservices', 'HTTPS', 'OpenAPI'],
  },
  {
    id: 'calibration',
    code: 'M-03',
    name: '3PC Controller Calibration',
    tag: 'IoT edge telemetry',
    metric: 'Remote 1- and 2-point calibration',
    summary:
      'Event-driven edge services that let field engineers recalibrate water-treatment sensors without travelling to the site.',
    bullets: [
      'Architected an event-driven IoT backend on Azure Functions integrating third-party controllers for remote calibration and GUI-driven analytics.',
      'Engineered 1-point and 2-point calibration services applying slope and offset corrections from handheld MDE and standard-solution baselines.',
      'Streamed controller telemetry, Connected Lab analytics and CSV batches into a single industrial data pipeline.',
    ],
    stack: ['Azure Functions', 'IoT Hub', 'Event Hubs', 'C#', 'Telemetry'],
  },
  {
    id: 'security',
    code: 'M-04',
    name: 'Security Remediation',
    tag: 'Application security',
    metric: '313 findings closed',
    summary:
      'A platform-wide sweep that closed hundreds of SAST findings without pausing delivery.',
    bullets: [
      'Resolved 313+ Checkmarx SAST vulnerabilities across core ASP.NET Core microservices — SQL injection, XSS, CSRF and broken access control.',
      'Embedded SAST scanning into Azure DevOps release pipelines, blocking insecure code from deploying and reducing security debt at the source.',
      'Modernised authentication and authorisation layers across platform services to meet enterprise security benchmarks.',
    ],
    stack: ['Checkmarx', 'Azure DevOps', 'ASP.NET Core', 'Entra ID', 'OWASP'],
  },
  {
    id: 'inventory',
    code: 'M-05',
    name: 'Aggregated Inventory Tracking',
    tag: 'Real-time inventory',
    metric: '99.9% pricing accuracy',
    summary:
      'A live picture of every chemical container, delivery and site stock level — and the money attached to it.',
    bullets: [
      'Programmed backend services tracking containers, deliveries and site inventory in real time.',
      'Built revenue and pricing computation models with 99.9% accuracy across bulk and packaged orders.',
      'Reduced delivery turnaround for both order types by surfacing stock position before dispatch.',
    ],
    stack: ['ASP.NET Core', 'SQL Server', 'EF Core', 'Background jobs'],
  },
  {
    id: 'transcripts',
    code: 'M-06',
    name: 'Live Chat Transcript',
    tag: 'Integration reliability',
    metric: '15 hours saved weekly',
    summary:
      'Every customer conversation archived automatically, with retries that refuse to lose a message.',
    bullets: [
      'Connected Social Intents live chat to Ackumen with pooled HttpClient instances and asynchronous webhook processing.',
      'Parsed unstructured conversational metadata and persisted transcripts for 100% of customer sessions.',
      'Designed custom retry policies and structured error logging for external HTTP dependencies, reaching 99.9% message retention.',
    ],
    stack: ['HttpClient', 'Webhooks', 'Retry policies', 'SQL Server', 'SMTP'],
  },
]

export const SIDE_MISSIONS = [
  {
    code: 'S-01',
    name: 'Connected Lab',
    body: 'A lab-request workflow where customers submit, process and analyse process samples, with reporting and third-party lab integration.',
    stack: ['ASP.NET Core', 'SQL Server', 'REST'],
  },
  {
    code: 'S-02',
    name: 'BulkDataSeeder.EfCore',
    body: 'An open-source NuGet package that automates EF Core bulk data seeding. 7.7k+ downloads and counting.',
    stack: ['C#', 'EF Core', 'NuGet'],
  },
]

export type SkillGroup = { label: string; note: string; items: string[]; accent?: boolean }

export const ARSENAL: SkillGroup[] = [
  {
    label: 'AI engineering',
    note: 'The newest layer, already in production.',
    items: ['LLM APIs', 'AI agents', 'Model Context Protocol', 'Claude', 'Microsoft Foundry'],
    accent: true,
  },
  {
    label: 'Core runtime',
    note: 'Where most of the work happens.',
    items: ['C#', 'ASP.NET Core', 'Web API', 'EF Core', 'Dapper', 'LINQ'],
  },
  {
    label: 'Interface',
    note: 'Enough frontend to ship the whole feature.',
    items: ['React', 'TypeScript', 'Redux', 'Saga', 'JavaScript', 'Vite', 'Bootstrap'],
  },
  {
    label: 'Architecture',
    note: 'Chosen on trade-offs, not fashion.',
    items: ['Microservices', 'Modular monoliths', 'REST', 'OpenAPI / Swagger', 'Design documents'],
  },
  {
    label: 'Data',
    note: 'Schemas, queries and the slow ones.',
    items: ['SQL Server', 'PostgreSQL', 'MySQL', 'Raw SQL', 'Stored procedures', 'Indexing & tuning'],
  },
  {
    label: 'Cloud & delivery',
    note: 'Azure-first, AWS when required.',
    items: [
      'App Service',
      'Entra ID',
      'Cosmos DB',
      'Azure Functions',
      'Service Bus',
      'App Configuration',
      'App Insights',
      'AWS EC2 · S3 · IAM',
      'CI/CD',
    ],
  },
  {
    label: 'Messaging & edge',
    note: 'Events, devices and the queue between them.',
    items: ['Service Bus', 'Event Hubs', 'IoT Hub', 'RabbitMQ', 'SMTP'],
  },
  {
    label: 'Assurance',
    note: 'Quality enforced in the pipeline, not the retro.',
    items: ['NUnit', 'Checkmarx SAST', 'Vulnerability remediation', 'Code review', 'Agile'],
  },
]

export const RECORD = {
  kicker: 'Paper trail',
  title: 'Credentials, and the rules behind them.',
  lead: 'Certifications keep the cloud honest. The principles below are what I actually operate by.',
  principles: [
    {
      code: 'R-01',
      title: 'Write the document first.',
      body: 'Software Design Documents covering 100% of functional requirements, before a line of production code. Ambiguity is cheaper to fix on paper.',
    },
    {
      code: 'R-02',
      title: 'Ship without incidents.',
      body: 'Zero post-launch issues across backend, web and mobile releases. Reliability is a design decision, not a testing phase.',
    },
    {
      code: 'R-03',
      title: 'Leave it safer than you found it.',
      body: '313 SAST findings closed, scanning wired into the release pipeline so the next person inherits a cleaner system.',
    },
  ],
  certs: [
    { name: 'Azure Administrator Associate', code: 'AZ-104', issuer: 'Microsoft' },
    { name: 'Azure Data Engineering', code: 'DP-700', issuer: 'Microsoft' },
    { name: 'Azure Fundamentals', code: 'AZ-900', issuer: 'Microsoft' },
    { name: 'Claude 101', code: '', issuer: 'Anthropic' },
  ],
  education: [
    {
      degree: 'Master of Computer Applications',
      field: 'Computer Application',
      school: 'MEASI Institute of Information Technology, Chennai',
      date: 'Apr 2022',
    },
    {
      degree: 'Bachelor of Computer Applications',
      field: 'Computer Application',
      school: 'The New College, Chennai',
      date: 'Apr 2020',
    },
  ],
  languages: ['English', 'Urdu', 'Tamil', 'Arabic', 'Hindi'],
}

export const UPLINK = {
  kicker: 'Open channel',
  title: 'The next chapter is unwritten.',
  body: 'I am open to senior backend and cloud engineering roles where the systems are real, the data is messy, and AI is expected to earn its place in production.',
  availability: 'Available for conversations',
  primary: { label: 'Start a conversation', href: SITE.whatsappMessage, note: 'Opens WhatsApp — fastest route' },
  resume: { label: 'Download resume', href: SITE.resume, note: `PDF · ${SITE.logVersion}` },
  channels: [
    { label: 'WhatsApp', value: SITE.phone, href: SITE.whatsapp },
    { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { label: 'Phone', value: SITE.phone, href: `tel:${SITE.phoneHref}` },
    { label: 'LinkedIn', value: SITE.linkedinLabel, href: SITE.linkedin },
  ],
}
