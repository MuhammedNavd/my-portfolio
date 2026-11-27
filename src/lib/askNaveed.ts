/*
  "Ask Naveed" — a grounded assistant over the resume.

  There is no model here. Every answer is a hand-written block that restates a
  fact already published on the page (and imports the shared numbers from
  content.ts wherever possible), matched to the question by phrase and keyword
  scoring. That keeps the site static and deployable to Pages, and it means the
  assistant cannot invent a project, a metric or a job title — the failure mode
  is "not in the log", never a plausible-sounding lie.
*/

import { RECORD, SITE, STATS, UPLINK } from '../content'

export type AskSource = { label: string; href: string }

export type AskAnswer = {
  lead: string
  bullets?: string[]
  close?: string
  sources?: AskSource[]
}

export type AskReply = {
  answer: AskAnswer
  follow: { label: string; query: string }[]
}

type Entry = {
  id: string
  title: string
  keys: string[]
  tags: string[]
  answer: AskAnswer
  follow?: string[]
  compiled?: { key: string; regex: RegExp }[]
}

const CH = {
  origin: { label: 'ch.01 Origin', href: '#origin' },
  service: { label: 'ch.02 Service', href: '#service' },
  missions: { label: 'ch.03 Missions', href: '#missions' },
  arsenal: { label: 'ch.04 Arsenal', href: '#arsenal' },
  record: { label: 'ch.05 Record', href: '#record' },
  uplink: { label: 'ch.07 Uplink', href: '#uplink' },
}

const [YEARS, PLATFORMS, SPEED, INCIDENTS] = STATS

const ENTRIES: Entry[] = [
  {
    id: 'greeting',
    title: 'What can I ask?',
    keys: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'what can you', 'what can i ask', 'help'],
    tags: ['hello', 'greet', 'greeting'],
    answer: {
      lead: 'Ask about the missions, the stack, the numbers, the credentials, or whether he is available. Every answer is pulled from this field log — nothing is guessed.',
    },
    follow: ['ai', 'experience', 'impact', 'contact'],
  },
  {
    id: 'intro',
    title: 'Who is Naveed?',
    keys: ['who is', 'about him', 'about naveed', 'introduce', 'introduction', 'yourself', 'summary', 'background', 'overview', 'profile'],
    tags: ['who', 'about', 'summary', 'background', 'profile', 'intro'],
    answer: {
      lead: `${SITE.name} is a senior software engineer at Ideassion Technology Solutions in ${SITE.location}, building .NET and Azure platforms for a US enterprise client since May 2022.`,
      bullets: [
        `${YEARS.value} years in production: ${PLATFORMS.value} legacy platforms modernised to modern .NET and EF Core, roughly ${SPEED.value} faster.`,
        '313 Checkmarx SAST findings closed, with scanning wired into the release pipeline.',
        'AI-native features — LLM APIs, agents and MCP — shipped into live enterprise workflows in two months.',
        `${INCIDENTS.value} ${INCIDENTS.label} across backend, web and mobile releases.`,
      ],
      close: 'The short version of the whole site: he keeps the machine running, then teaches it to think.',
      sources: [CH.service, CH.missions],
    },
    follow: ['experience', 'ai', 'impact'],
  },
  {
    id: 'experience',
    title: 'How much experience?',
    keys: ['how many years', 'how long', 'years of experience', 'experience', 'tenure', 'how long has', 'career', 'timeline', 'history', 'worked'],
    tags: ['experience', 'year', 'years', 'long', 'tenure', 'career', 'timeline', 'started', 'since'],
    answer: {
      lead: `${YEARS.value} years of production work, all of it at Ideassion — from junior on a forty-system migration to leading the delivery team.`,
      bullets: [
        'Jan 2022 — Software Engineer Trainee, four months inside live production code.',
        'Apr 2022 — MCA completed while already working the job it prepared him for.',
        'May 2022 → present — Senior Software Engineer, client: Buckman Laboratories International.',
        'Four client projects shipped, 100% on time, no slipped dates.',
      ],
      sources: [CH.origin, CH.service],
    },
    follow: ['current', 'leadership', 'projects'],
  },
  {
    id: 'current',
    title: 'Current role',
    keys: ['current role', 'current job', 'where does he work', 'who does he work for', 'company', 'employer', 'ideassion', 'buckman', 'day to day', 'what does he do'],
    tags: ['current', 'now', 'job', 'role', 'company', 'employer', 'work', 'ideassion', 'buckman', 'client'],
    answer: {
      lead: 'Senior Software Engineer at Ideassion Technology Solutions, embedded with Buckman Laboratories International — a US vendor of digital water and industrial chemical platforms.',
      bullets: [
        'Owns the backend, web and mobile delivery for four client projects.',
        'Leads a fourteen-person cross-functional team across three surfaces.',
        'Works directly with US stakeholders: a paragraph of business need becomes a spec, a schema and a release date.',
        'Nine time zones from the client, so requirements arrive as prose, not tickets.',
      ],
      sources: [CH.service],
    },
    follow: ['leadership', 'projects', 'contact'],
  },
  {
    id: 'skills',
    title: 'Stack and skills',
    keys: ['skills', 'stack', 'tech stack', 'technologies', 'what does he know', 'proficient', 'tool', 'framework', 'arsenal', 'languages does he'],
    tags: ['skill', 'skills', 'stack', 'technology', 'technologies', 'tech', 'tool', 'tools', 'framework', 'know', 'proficient', 'expert'],
    answer: {
      lead: 'Eight groups in the arsenal, weighted towards backend and cloud, with enough frontend to ship the whole feature himself.',
      bullets: [
        'Core runtime — C#, ASP.NET Core, Web API, EF Core, Dapper, LINQ.',
        'AI engineering — LLM APIs, AI agents, Model Context Protocol, Claude, Microsoft Foundry.',
        'Cloud — Azure App Service, Functions, Service Bus, Entra ID, Cosmos DB, App Configuration, App Insights; AWS EC2/S3/IAM when required.',
        'Interface — React, TypeScript, Redux, Saga, Vite. Data — SQL Server, PostgreSQL, MySQL, raw SQL, indexing and tuning.',
      ],
      sources: [CH.arsenal],
    },
    follow: ['ai', 'dotnet', 'azure'],
  },
  {
    id: 'ai',
    title: 'AI in production',
    keys: ['ai', 'artificial intelligence', 'agent', 'agents', 'llm', 'mcp', 'model context', 'genai', 'machine learning', 'claude', 'foundry', 'automation'],
    tags: ['ai', 'agent', 'agents', 'llm', 'mcp', 'genai', 'claude', 'foundry', 'automate', 'automation', 'intelligence'],
    answer: {
      lead: 'AI is the newest layer in the stack, and it is already load-bearing: agents and LLM tool-calling shipped into live enterprise workflows, not a prototype folder.',
      bullets: [
        'Orchestrated an agent framework for route optimisation and inventory forecasting on the logistics platform — 25% lower delivery turnaround, 99.9% tracking accuracy.',
        'Built AI-native features with LLM APIs, agents and MCP in two months, automating key workflows and cutting manual effort.',
        'Uses MCP as the tool boundary, so agents can read and write enterprise systems without being handed the keys.',
        'Holds the Claude 101 certification from Anthropic.',
      ],
      close: 'Ask him how he keeps a probabilistic layer inside a deterministic billing system — that is the interesting part.',
      sources: [CH.missions, CH.arsenal],
    },
    follow: ['projects', 'dotnet', 'security'],
  },
  {
    id: 'dotnet',
    title: '.NET depth',
    keys: ['.net', 'dotnet', 'c#', 'csharp', 'asp.net', 'backend', 'api', 'microservice', 'ef core', 'entity framework', 'web api'],
    tags: ['net', 'dotnet', 'csharp', 'backend', 'asp', 'api', 'microservice', 'microservices', 'efcore', 'entityframework', 'rest'],
    answer: {
      lead: 'Backend .NET is the centre of gravity: ASP.NET Core APIs and microservices on SQL Server, shipped since 2022.',
      bullets: [
        '40+ legacy projects migrated to modern .NET and EF Core — 75% faster, a decade of technical debt retired.',
        'RESTful APIs for high-volume processing and third-party integration, with OpenAPI/Swagger specs standardised to unblock UI and partner teams.',
        'Design documents covering 100% of functional requirements before production code — including a multi-customer chemical-product billing platform.',
      ],
      sources: [CH.service, CH.arsenal],
    },
    follow: ['azure', 'data', 'security'],
  },
  {
    id: 'azure',
    title: 'Cloud and delivery',
    keys: ['azure', 'cloud', 'entra', 'functions', 'service bus', 'cosmos', 'app service', 'devops', 'ci/cd', 'pipeline', 'aws', 'infrastructure', 'deploy'],
    tags: ['azure', 'cloud', 'entra', 'functions', 'servicebus', 'cosmos', 'devops', 'cicd', 'pipeline', 'aws', 'infra', 'infrastructure', 'deployment'],
    answer: {
      lead: 'Azure-first, with AWS when the client requires it, and delivery treated as part of the design.',
      bullets: [
        'Event-driven IoT backend on Azure Functions with IoT Hub and Event Hubs for controller telemetry.',
        'Service Bus, Cosmos DB, App Configuration and App Insights across the platform.',
        'Azure DevOps CI/CD pipelines with Checkmarx SAST wired in, so insecure code cannot reach production.',
        'AZ-104, DP-700 and AZ-900 certified.',
      ],
      sources: [CH.arsenal, CH.record],
    },
    follow: ['security', 'projects', 'certifications'],
  },
  {
    id: 'projects',
    title: 'The missions',
    keys: ['project', 'projects', 'missions', 'case stud', 'what has he built', 'built', 'portfolio', 'best work', 'proud of', 'example'],
    tags: ['project', 'projects', 'mission', 'missions', 'built', 'build', 'work', 'example', 'case'],
    answer: {
      lead: 'Six mission files, each one a live enterprise platform rather than a demo.',
      bullets: [
        'AI-Native Logistics — autonomous routing and inventory forecasting, 25% lower delivery TAT, 5,000+ shipments a day.',
        'Ackumen Product Predictor — an AP engine for cooling-tower treatment programmes, 60% faster proposals across 5,000+ catalog items.',
        '3PC Controller Calibration — event-driven IoT services for remote 1- and 2-point sensor calibration.',
        'Security Remediation — 313 SAST findings closed. Aggregated Inventory — 99.9% pricing accuracy. Live Chat Transcript — 15 hours saved weekly.',
      ],
      close: 'There are two side files as well: Connected Lab, and BulkDataSeeder.EfCore on NuGet with 7.7k+ downloads.',
      sources: [CH.missions],
    },
    follow: ['ai', 'impact', 'opensource'],
  },
  {
    id: 'impact',
    title: 'Numbers that matter',
    keys: ['impact', 'metric', 'metrics', 'numbers', 'results', 'achievement', 'achievements', 'business value', 'roi', 'measurable', 'how much'],
    tags: ['impact', 'metric', 'metrics', 'number', 'numbers', 'result', 'results', 'achievement', 'value', 'roi', 'measure'],
    answer: {
      lead: 'The log is deliberately numeric, because "improved performance" is not a claim anyone can check.',
      bullets: [
        '40+ platforms modernised, 75% faster after migration.',
        '313 Checkmarx SAST findings closed across core microservices.',
        '25% lower delivery turnaround; 99.9% tracking and pricing accuracy; 5,000+ daily shipments tracked.',
        '80% less manual turnaround; 60% faster proposal creation; 15 hours a week saved on transcripts.',
        '14 engineers led; 100% on-time delivery; zero post-launch incidents.',
      ],
      sources: [CH.service, CH.record],
    },
    follow: ['leadership', 'projects', 'security'],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    keys: [
      'lead',
      'led',
      'leads',
      'leading',
      'leader',
      'leadership',
      'team',
      'team size',
      'how big is his team',
      'how many people',
      'manage',
      'management',
      'mentor',
      'mentoring',
      'fourteen',
      '14 engineers',
      'senior',
      'stakeholder',
    ],
    tags: ['lead', 'led', 'leader', 'leadership', 'team', 'manage', 'manager', 'mentor', 'people', 'stakeholder', 'senior'],
    answer: {
      lead: 'A fourteen-person cross-functional team — backend, web and mobile — led end to end for a US client.',
      bullets: [
        'Coordinates delivery across three surfaces and four client projects, with 100% on-time completion.',
        'Writes the Software Design Documents the rest of the team builds against.',
        'Runs the client relationship directly: requirements arrive as a paragraph and leave as a spec, a schema and a release date.',
        'Mentors through code review and the pipeline rather than after the fact: SAST gates, retries, structured logging.',
      ],
      sources: [CH.service],
    },
    follow: ['workstyle', 'current', 'contact'],
  },
  {
    id: 'security',
    title: 'Security work',
    keys: ['security', 'sast', 'checkmarx', 'vulnerab', 'owasp', 'injection', 'xss', 'csrf', 'secure', 'compliance', 'audit', '313'],
    tags: ['security', 'secure', 'sast', 'checkmarx', 'vulnerability', 'vulnerabilities', 'owasp', 'audit', 'compliance', 'injection', 'xss'],
    answer: {
      lead: '313 Checkmarx SAST vulnerabilities closed across core ASP.NET Core microservices — SQL injection, XSS, CSRF and broken access control among them.',
      bullets: [
        'Fixed at the source, then made repeatable: SAST scanning embedded in Azure DevOps release pipelines blocks insecure code from deploying.',
        'Authentication and authorisation layers rebuilt across platform services to meet enterprise benchmarks.',
        'Security debt went down instead of being deferred to a retro.',
      ],
      sources: [CH.missions, CH.record],
    },
    follow: ['azure', 'workstyle', 'impact'],
  },
  {
    id: 'education',
    title: 'Education',
    keys: ['education', 'degree', 'college', 'university', 'mca', 'bca', 'master', 'bachelor', 'study', 'studied', 'school', 'graduat', 'measi'],
    tags: ['education', 'degree', 'college', 'university', 'mca', 'bca', 'master', 'bachelor', 'study', 'graduate', 'academic'],
    answer: {
      lead: 'Two computer applications degrees, both in Chennai.',
      bullets: RECORD.education.map((item) => `${item.degree} — ${item.school}, ${item.date}.`),
      close: 'The master’s was finished while already working the job it was meant to prepare him for.',
      sources: [CH.origin, CH.record],
    },
    follow: ['certifications', 'experience', 'skills'],
  },
  {
    id: 'certifications',
    title: 'Certifications',
    keys: ['certif', 'az-104', 'az-900', 'dp-700', 'credential', 'microsoft certified', 'anthropic'],
    tags: ['certification', 'certifications', 'certified', 'credential', 'credentials', 'azure104', 'azure900', 'dp700'],
    answer: {
      lead: 'Four current credentials — three Microsoft Azure, one Anthropic.',
      bullets: RECORD.certs.map((cert) => `${cert.name}${cert.code ? ` (${cert.code})` : ''} — ${cert.issuer}.`),
      sources: [CH.record],
    },
    follow: ['azure', 'education', 'skills'],
  },
  {
    id: 'availability',
    title: 'Availability',
    keys: ['available', 'availability', 'open to work', 'open to', 'hiring', 'hire', 'looking for', 'roles', 'opportunit', 'remote', 'relocat', 'notice period', 'recruit', 'job', 'position'],
    tags: ['available', 'availability', 'open', 'hiring', 'hire', 'role', 'roles', 'opportunity', 'opportunities', 'remote', 'relocate', 'notice', 'recruit', 'job', 'position', 'fulltime'],
    answer: {
      lead: 'Open to senior backend and cloud engineering roles — the kind where the systems are real, the data is messy, and AI is expected to earn its place in production.',
      bullets: [
        `Based in ${SITE.location} (${SITE.timezone}), remote-ready, and used to working nine time zones from stakeholders.`,
        'Interested in senior individual-contributor or lead roles on .NET/Azure platforms with an AI component.',
        'Four client projects delivered on time, so a start date is a conversation rather than a risk.',
      ],
      close: UPLINK.primary.note,
      sources: [CH.uplink],
    },
    follow: ['contact', 'compensation', 'current'],
  },
  {
    id: 'compensation',
    title: 'Compensation',
    keys: ['salary', 'compensation', 'ctc', 'package', 'pay', 'rate', 'money', 'lpa', 'how much does he cost', 'cost', 'expensive', 'budget', 'inr'],
    tags: ['salary', 'compensation', 'ctc', 'package', 'pay', 'rate', 'money', 'cost', 'expensive', 'budget'],
    answer: {
      lead: 'Not in the log — compensation is a conversation, not a bullet point on a website.',
      close: `Open the channel and ask directly: ${SITE.email}.`,
      sources: [CH.uplink],
    },
    follow: ['contact', 'availability'],
  },
  {
    id: 'contact',
    title: 'How to reach him',
    keys: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'linkedin', 'resume', 'cv', 'call', 'connect', 'talk to', 'get in touch', 'download'],
    tags: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'linkedin', 'resume', 'cv', 'call', 'connect', 'touch'],
    answer: {
      lead: 'WhatsApp is the fastest route; email works if you prefer a paper trail.',
      bullets: [
        `WhatsApp / phone — ${SITE.phone}.`,
        `Email — ${SITE.email}.`,
        `LinkedIn — ${SITE.linkedinLabel}.`,
        `Résumé — a PDF, downloadable from the Uplink chapter.`,
      ],
      sources: [CH.uplink],
    },
    follow: ['availability', 'intro'],
  },
  {
    id: 'frontend',
    title: 'Frontend work',
    keys: ['frontend', 'front-end', 'react', 'typescript', 'ui', 'javascript', 'next.js', 'nextjs', 'redux', 'design system'],
    tags: ['frontend', 'react', 'typescript', 'javascript', 'ui', 'nextjs', 'redux', 'interface', 'saga'],
    answer: {
      lead: 'Enough frontend to ship the whole feature, not just the endpoint.',
      bullets: [
        'Cargo-tracking dashboards for 5,000+ daily shipments on Next.js and Node.js, with resilient REST endpoints and real error handling.',
        'A modular, typed React + TypeScript component library for monitoring routes, cargo and calibration runs.',
        'Redux and Saga for state, Vite for the build — this site is React, TypeScript and Tailwind.',
      ],
      sources: [CH.missions, CH.arsenal],
    },
    follow: ['skills', 'projects', 'dotnet'],
  },
  {
    id: 'data',
    title: 'Data and databases',
    keys: ['database', 'sql', 'data', 'postgres', 'mysql', 'cosmos', 'query', 'index', 'schema', 'stored procedure', 'ef core'],
    tags: ['database', 'sql', 'data', 'postgres', 'postgresql', 'mysql', 'cosmos', 'query', 'queries', 'schema', 'index', 'indexing', 'tuning'],
    answer: {
      lead: 'SQL Server is the default, with PostgreSQL, MySQL and Cosmos DB in the mix.',
      bullets: [
        'Schemas, migrations and queries across inventory, pricing computation and transcript storage.',
        'Revenue and pricing models at 99.9% accuracy across bulk and packaged orders.',
        'Secure HTTPS microservice channels into PIMS and BUPR databases, querying cost, formulation and viscosity data across 5,000+ catalog items.',
        'DP-700 Azure Data Engineering certified.',
      ],
      sources: [CH.missions, CH.record],
    },
    follow: ['dotnet', 'azure', 'projects'],
  },
  {
    id: 'workstyle',
    title: 'How he works',
    keys: ['how does he work', 'work style', 'workstyle', 'principle', 'principles', 'approach', 'process', 'methodology', 'agile', 'documentation', 'design document', 'code review', 'quality', 'culture'],
    tags: ['principle', 'principles', 'approach', 'process', 'method', 'methodology', 'agile', 'documentation', 'quality', 'culture', 'review'],
    answer: {
      lead: RECORD.principles[0].title,
      bullets: RECORD.principles.map((rule) => `${rule.title} ${rule.body}`),
      close: 'In practice: write the document, migrate in slices, keep the old path alive until the new one proves itself.',
      sources: [CH.record, CH.origin],
    },
    follow: ['leadership', 'security', 'whyhire'],
  },
  {
    id: 'opensource',
    title: 'Open source',
    keys: ['open source', 'nuget', 'bulkdataseeder', 'package', 'github', 'downloaded', 'library'],
    tags: ['opensource', 'nuget', 'package', 'github', 'library', 'seed'],
    answer: {
      lead: 'BulkDataSeeder.EfCore — an open-source NuGet package that automates EF Core bulk data seeding, with 7.7k+ downloads.',
      close: 'Small, boring, useful: exactly the kind of tooling that saves a team a week.',
      sources: [CH.missions],
    },
    follow: ['dotnet', 'data', 'projects'],
  },
  {
    id: 'languages',
    title: 'Languages spoken',
    keys: ['languages does he speak', 'speak', 'spoken', 'english', 'tamil', 'urdu', 'hindi', 'arabic'],
    tags: ['speak', 'spoken', 'language', 'languages', 'english', 'tamil', 'urdu', 'hindi', 'arabic'],
    answer: {
      lead: `Five languages: ${RECORD.languages.join(', ')}.`,
      close: 'Working language with the US client is English.',
      sources: [CH.record],
    },
    follow: ['contact', 'availability'],
  },
  {
    id: 'whyhire',
    title: 'Why hire him',
    keys: ['why should', 'why hire', 'why him', 'stand out', 'different', 'strength', 'fit', 'value does he bring'],
    tags: ['why', 'hire', 'standout', 'different', 'strength', 'strengths', 'fit', 'value'],
    answer: {
      lead: 'Because the claims are checkable, and the record is unusual for four years: breadth of ownership plus a clean production sheet.',
      bullets: [
        'Delivery: four client projects, 100% on time, zero post-launch incidents across backend, web and mobile.',
        'Depth: 40+ platforms migrated, 75% faster, 313 security findings closed at the source.',
        'Range: owns the API contract, the schema, the mobile release and the CI/CD pipeline that ships them.',
        'Timing: already shipping agents and MCP into enterprise workflows, with the judgement to keep them inside deterministic systems.',
      ],
      sources: [CH.service, CH.record],
    },
    follow: ['impact', 'ai', 'contact'],
  },
  {
    id: 'hobbies',
    title: 'Outside work',
    keys: [
      'hobby',
      'hobbies',
      'outside work',
      'free time',
      'personal life',
      'fun',
      'interests',
      'music',
      'games',
      'football',
      'cricket',
      'sport',
      'sports',
      'weekend',
    ],
    tags: ['hobby', 'hobbies', 'personal', 'fun', 'interests', 'outside', 'football', 'cricket', 'sport', 'sports'],
    answer: {
      lead: 'Not in the log. This site is about the work, so there is nothing here to quote about life outside it.',
      close: 'That is a good question for a conversation, though.',
      sources: [CH.uplink],
    },
    follow: ['contact', 'intro'],
  },
]

/* Tag forms people actually type, without stemming every word at runtime. */
const STOP = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'do', 'does', 'did', 'doing', 'what', 'who',
  'whom', 'how', 'why', 'when', 'where', 'which', 'can', 'could', 'would', 'should', 'will', 'you', 'your', 'yours',
  'he', 'his', 'him', 'she', 'they', 'their', 'it', 'its', 'me', 'my', 'mine', 'i', 'we', 'us', 'our', 'to', 'of',
  'in', 'on', 'for', 'and', 'or', 'but', 'about', 'with', 'that', 'this', 'these', 'those', 'there', 'here', 'any',
  'much', 'many', 'more', 'most', 'some', 'tell', 'give', 'please', 'thanks', 'has', 'have', 'had', 'at', 'as', 'by',
  'from', 'into', 'than', 'then', 'so', 'not', 'no', 'yes', 'if', 'also', 'just', 'get', 'got',
])

const escapeKey = (key: string) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+')

for (const entry of ENTRIES) {
  entry.compiled = entry.keys.map((key) => ({
    key,
    regex: new RegExp(`(?:^|\\s)${escapeKey(key)}(?=$|\\s)`, 'i'),
  }))
}

function normalize(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokens(query: string): string[] {
  return query
    .split(' ')
    .map((token) => token.replace(/^[.']+|[.']+$/g, ''))
    .filter(Boolean)
}

/*
  Words that describe the shape of a question more than its subject. On their
  own they must not decide the answer, otherwise "what is his favourite
  football team" lands on leadership because of "team".
*/
const GENERIC = new Set([
  'team', 'work', 'works', 'working', 'experience', 'project', 'projects', 'skills', 'skill', 'job', 'role', 'roles',
  'contact', 'call', 'connect', 'pay', 'data', 'security', 'cloud', 'mission', 'missions', 'built', 'build', 'tech',
  'technology', 'technologies', 'stack', 'tool', 'tools', 'know', 'hire', 'hiring', 'available', 'availability',
  'number', 'numbers', 'result', 'results', 'value', 'case', 'example',
])

type Match = { value: number; strong: number; generic: number; stray: number }

function matches(entry: Entry, word: string): boolean {
  if (entry.tags.includes(word) || entry.keys.includes(word)) return true
  for (const tag of entry.tags) {
    if (tag.length >= 4 && word.length >= 4 && (tag.startsWith(word) || word.startsWith(tag))) return true
  }
  for (const key of entry.keys) {
    if (!key.includes(' ') && key.length >= 4 && word.length >= 4 && (key.startsWith(word) || word.startsWith(key))) return true
  }
  return false
}

function score(entry: Entry, query: string, words: string[]): Match {
  let value = 0
  let strong = 0
  let generic = 0

  for (const { key, regex } of entry.compiled ?? []) {
    if (!regex.test(query)) continue
    /* A longer phrase is a stronger signal than a single word. */
    value += 1 + 0.45 * (key.split(' ').length - 1)
    if (GENERIC.has(key)) generic += 1
    else strong += 1
  }

  const hits = new Set<string>()
  for (const word of words) {
    if (STOP.has(word) || word.length < 2) continue
    if (matches(entry, word)) hits.add(word)
  }
  value += Math.min(hits.size, 3) * 0.55

  /* Content words this entry cannot account for. */
  let stray = 0
  for (const word of words) {
    if (STOP.has(word) || word.length < 2) continue
    if (!matches(entry, word)) stray += 1
  }

  return { value, strong, generic, stray }
}

const FALLBACK: AskAnswer = {
  lead: 'That one is not in the log. I answer from the published field log only — missions, stack, numbers, credentials, availability, contact.',
  close: 'Anything past that is better asked directly: the Uplink chapter has WhatsApp, email and phone.',
  sources: [CH.uplink],
}

export const STARTERS: { label: string; query: string }[] = [
  { label: 'What has he shipped with AI agents?', query: 'what has he shipped with ai agents' },
  { label: 'How many years of .NET?', query: 'how many years of .net experience' },
  { label: 'Has he led a team?', query: 'has he led a team' },
  { label: 'Which projects moved the numbers?', query: 'which projects had the biggest impact' },
  { label: 'Is he open to remote roles?', query: 'is he available for remote roles' },
  { label: 'How do I reach him?', query: 'how do i contact him' },
]

const byId = new Map(ENTRIES.map((entry) => [entry.id, entry]))

function follow(entry: Entry): { label: string; query: string }[] {
  const ids = entry.follow ?? []
  const chips = ids.flatMap((id) => {
    const target = byId.get(id)
    return target ? [{ label: target.title, query: target.title }] : []
  })
  return chips.length > 0 ? chips.slice(0, 4) : STARTERS.slice(0, 4)
}

/* Queries that are pure noise still deserve an answer, not a score dump. */
export function ask(raw: string): AskReply {
  const query = normalize(raw)
  if (!query) return { answer: FALLBACK, follow: STARTERS.slice(0, 4) }

  const words = tokens(query)
  let best: Entry | null = null
  let bestScore = 0

  for (const entry of ENTRIES) {
    const match = score(entry, query, words)
    /* A lone generic word is trusted only when nothing else in the question
       points elsewhere — "what is his experience" yes, "favourite football
       team" no. */
    if (match.strong === 0 && match.generic > 0 && match.stray > 0) continue
    if (match.value > bestScore) {
      bestScore = match.value
      best = entry
    }
  }

  if (!best || bestScore < 0.95) return { answer: FALLBACK, follow: STARTERS.slice(0, 4) }

  return { answer: best.answer, follow: follow(best) }
}
