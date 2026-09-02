import type { ChangeEvent, ReactNode } from 'react';
import type { StepDef } from '../../data/contact';
import { budgetBands, timelineBands } from '../../data/contact';

/**
 * The answers, and the inputs that collect them.
 *
 * Every control is a native input with a real label — the chips are styled labels
 * wrapping a visually hidden checkbox or radio, so the whole configurator is
 * keyboard-operable and announces itself correctly without a line of ARIA.
 */
export type Answers = {
  need: string[];
  industry: string;
  context: string;
  name: string;
  role: string;
  org: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
};

export const EMPTY_ANSWERS: Answers = {
  need: [],
  industry: '',
  context: '',
  name: '',
  role: '',
  org: '',
  email: '',
  phone: '',
  budget: '',
  timeline: '',
};

const CHIP =
  'inline-block border rule-strong px-4 py-2.5 text-[0.875rem] transition-colors duration-200 hover:border-[var(--fg)] peer-checked:border-[var(--fg)] peer-checked:bg-[var(--fg)] peer-checked:text-[var(--bg)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--fg)]';

const FIELD =
  'w-full border-b rule-strong bg-transparent py-3 text-[1rem] placeholder:opacity-45 focus:border-[var(--fg)] focus:outline-none';

function Choice({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: 'checkbox' | 'radio';
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}) {
  return (
    <label className="cursor-pointer" data-cursor="next">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className={CHIP}>{children}</span>
    </label>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block opacity-70">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${FIELD} mt-1.5`}
      />
    </div>
  );
}

/** A loose check — enough to catch a typo, not enough to reject a valid address. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** The Next button is disabled until the current step has what it needs. */
export function canAdvance(step: StepDef, answers: Answers): boolean {
  switch (step.id) {
    case 'need':
      return answers.need.length > 0;
    case 'industry':
      return answers.industry !== '';
    case 'context':
      return answers.context.trim().length > 8;
    case 'details':
      return answers.name.trim() !== '' && EMAIL.test(answers.email.trim());
    case 'budget':
      return answers.budget !== '' && answers.timeline !== '';
    default:
      return true;
  }
}

export function StepFields({
  step,
  answers,
  set,
}: {
  step: StepDef;
  answers: Answers;
  set: (patch: Partial<Answers>) => void;
}) {
  if (step.kind === 'multi') {
    return (
      <fieldset>
        <legend className="sr-only">{step.question}</legend>
        <div className="flex flex-wrap gap-2.5">
          {step.options?.map((option) => (
            <Choice
              key={option}
              type="checkbox"
              name="need"
              value={option}
              checked={answers.need.includes(option)}
              onChange={(event) =>
                set({
                  need: event.target.checked
                    ? [...answers.need, option]
                    : answers.need.filter((item) => item !== option),
                })
              }
            >
              {option}
            </Choice>
          ))}
        </div>
      </fieldset>
    );
  }

  if (step.kind === 'single') {
    return (
      <fieldset>
        <legend className="sr-only">{step.question}</legend>
        <div className="flex flex-wrap gap-2.5">
          {step.options?.map((option) => (
            <Choice
              key={option}
              type="radio"
              name="industry"
              value={option}
              checked={answers.industry === option}
              onChange={() => set({ industry: option })}
            >
              {option}
            </Choice>
          ))}
        </div>
      </fieldset>
    );
  }

  if (step.kind === 'text') {
    return (
      <div>
        <label htmlFor="context" className="sr-only">
          {step.question}
        </label>
        <textarea
          id="context"
          value={answers.context}
          onChange={(event) => set({ context: event.target.value })}
          rows={5}
          placeholder="The attendance register is on paper and fees are in a different package, so nobody can tell me who owes what without a day of reconciling."
          className={`${FIELD} min-h-[9rem] resize-y leading-relaxed`}
        />
      </div>
    );
  }

  if (step.kind === 'fields') {
    return (
      <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          autoComplete="name"
          value={answers.name}
          onChange={(value) => set({ name: value })}
        />
        <Field
          id="role"
          label="Role"
          autoComplete="organization-title"
          placeholder="Principal, Director, Head of Operations"
          value={answers.role}
          onChange={(value) => set({ role: value })}
        />
        <Field
          id="org"
          label="Organisation"
          autoComplete="organization"
          value={answers.org}
          onChange={(value) => set({ org: value })}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={answers.email}
          onChange={(value) => set({ email: value })}
        />
        <Field
          id="phone"
          label="Phone or WhatsApp"
          type="tel"
          autoComplete="tel"
          placeholder="Optional"
          value={answers.phone}
          onChange={(value) => set({ phone: value })}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <fieldset>
        <legend className="eyebrow opacity-70">Budget</legend>
        <div className="mt-3.5 flex flex-wrap gap-2.5">
          {budgetBands.map((band) => (
            <Choice
              key={band}
              type="radio"
              name="budget"
              value={band}
              checked={answers.budget === band}
              onChange={() => set({ budget: band })}
            >
              {band}
            </Choice>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow opacity-70">Timeline</legend>
        <div className="mt-3.5 flex flex-wrap gap-2.5">
          {timelineBands.map((band) => (
            <Choice
              key={band}
              type="radio"
              name="timeline"
              value={band}
              checked={answers.timeline === band}
              onChange={() => set({ timeline: band })}
            >
              {band}
            </Choice>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

/** The assembled brief — shown on the review panel and sent as the mail body. */
export function briefLines(answers: Answers): [string, string][] {
  return [
    ['Building', answers.need.join(', ')],
    ['Sector', answers.industry],
    ['Broken today', answers.context.trim()],
    ['Name', answers.name.trim()],
    ['Role', answers.role.trim()],
    ['Organisation', answers.org.trim()],
    ['Email', answers.email.trim()],
    ['Phone', answers.phone.trim()],
    ['Budget', answers.budget],
    ['Timeline', answers.timeline],
  ].filter((entry): entry is [string, string] => entry[1] !== '');
}
