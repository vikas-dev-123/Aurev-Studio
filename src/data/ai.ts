export type Stage = {
  key: string;
  label: string;
  /** One line, for the diagram on the home teaser. */
  note: string;
  /** The full sentence, used when the flow is the main event on /ai. */
  detail: string;
};

/** The five things an agent does with an inbound message. Order matters. */
export const signalStages: Stage[] = [
  {
    key: 'message',
    label: 'Message',
    note: 'A parent asks about the term fee on WhatsApp, 9:40pm.',
    detail: 'A parent asks about fees on WhatsApp at 9:40pm. Same queue as email, web chat and a missed call.',
  },
  {
    key: 'understand',
    label: 'Understand',
    note: 'Intent, student, and which term the question refers to.',
    detail: 'Intent, language, urgency and who is asking — matched against the student record already in the system.',
  },
  {
    key: 'decide',
    label: 'Decide',
    note: 'Answerable from the ledger — or a human should take it.',
    detail: 'Answer, act, or escalate. Confidence below the threshold goes to a human with the context attached.',
  },
  {
    key: 'act',
    label: 'Act',
    note: 'Sends the balance, the due date and a payment link.',
    detail: 'Sends the fee statement, books the appointment, holds the room, raises the ticket. Inside your system, with your permissions.',
  },
  {
    key: 'report',
    label: 'Report',
    note: 'Logged on the student record before the office opens.',
    detail: 'Every action logged and readable: what came in, what it did, what it declined to do.',
  },
];

export type Capability = {
  title: string;
  detail: string;
  example: string;
};

export const aiCapabilities: Capability[] = [
  {
    title: 'AI Agents',
    detail: 'Task-scoped agents with access to specific tools and a hard stop when they are unsure.',
    example: 'Chases incomplete admission forms until the file is complete.',
  },
  {
    title: 'AI Chatbots',
    detail: 'Trained on your prospectus, tariff or policy documents — not the open internet.',
    example: 'Answers 71% of fee and syllabus questions without a staff reply.',
  },
  {
    title: 'WhatsApp Automation',
    detail: 'Template messaging, two-way replies and document delivery on the official Business API.',
    example: 'Sends attendance alerts to 2,800 parents by 9:15am.',
  },
  {
    title: 'Voice AI',
    detail: 'Answers the line when reception is busy, in the caller’s language.',
    example: 'Books an OPD slot and reads the confirmation back.',
  },
  {
    title: 'Document Intelligence',
    detail: 'Extracts structured fields from scans, PDFs and photographs of forms.',
    example: 'Reads a lab report and files values against the patient record.',
  },
  {
    title: 'AI Reporting',
    detail: 'Ask the database a question in plain language, get the query and the chart.',
    example: '"Which routes ran under 60% capacity last month?"',
  },
  {
    title: 'Lead Qualification',
    detail: 'Scores and routes enquiries the moment they arrive, with a reason attached.',
    example: 'Moves a ₹40L enquiry to the owner within a minute.',
  },
  {
    title: 'Customer Support',
    detail: 'Drafts replies from your own resolved tickets and waits for approval.',
    example: 'Cuts first-response time from 9 hours to 12 minutes.',
  },
  {
    title: 'Admission Assistant',
    detail: 'Walks a parent through eligibility, documents, dates and payment.',
    example: 'Runs the enquiry-to-application flow overnight.',
  },
  {
    title: 'Appointment Assistant',
    detail: 'Holds slots against live doctor availability and handles reschedules.',
    example: 'Fills cancelled slots from the waiting list automatically.',
  },
  {
    title: 'Predictive Analytics',
    detail: 'Forecasts from your own history: intake, occupancy, collection, churn.',
    example: 'Flags fee defaults three weeks before the due date.',
  },
  {
    title: 'Workflow Automation',
    detail: 'The unglamorous half: approvals, reminders, reconciliations, exports.',
    example: 'Closes the night audit and files the report at 3am.',
  },
];

export const aiGuardrails = [
  { title: 'Your data stays yours', detail: 'No training on your records. Retention set by you, deletion on request.' },
  { title: 'Scoped permissions', detail: 'An agent gets the same role model as a staff member — nothing broader.' },
  { title: 'Human handoff', detail: 'Below a confidence threshold it stops and escalates with full context.' },
  { title: 'Full audit trail', detail: 'Every prompt, tool call and outcome is logged and exportable.' },
];
