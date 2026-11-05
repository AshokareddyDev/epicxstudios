import Link from "next/link";
import type { Practice } from "@/lib/site";

type Href = Practice["href"];

const chapters = [
  { index: "04", title: "Forces", current: false },
  { index: "05", title: "Light", current: true },
  { index: "06", title: "Life", current: false },
] as const;

const rooms = [
  { index: "01", title: "Studio", body: "A teacher adds the lesson." },
  { index: "02", title: "Library", body: "The school keeps it." },
  { index: "03", title: "Classroom", body: "Class 8A shares one roster." },
] as const;

const devices = [
  { kind: "phone", label: "Phone" },
  { kind: "pc", label: "PC" },
  { kind: "tablet", label: "Tablet" },
  { kind: "headset", label: "AR/VR" },
] as const;

const around = [
  {
    href: "/services/training-lms" as const,
    index: "02",
    title: "Training LMS",
    body: "Higher study, engineering, nursing, and medicine.",
  },
  {
    href: "/services/software-mobile" as const,
    index: "03",
    title: "Applications",
    body: "Student, teacher, and operations tools.",
  },
  {
    href: "/services/web-dev" as const,
    index: "04",
    title: "Websites",
    body: "The public page for the program.",
  },
] as const;

const trainingRows = [
  "Higher study",
  "Engineering",
  "Nursing",
  "Medicine",
] as const;

const trainingSteps = ["Orient", "Practice", "Record"] as const;

const apps = [
  { title: "Student app", body: "The lesson on the phone they already carry." },
  { title: "Teacher app", body: "The class, the check, and who has finished." },
  { title: "Enrollment", body: "Who joins the cohort, and when." },
  { title: "Support", body: "The team that keeps the program running." },
] as const;

function DeviceIcon({ kind }: { kind: (typeof devices)[number]["kind"] }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
  } as const;

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      {kind === "phone" ? (
        <rect x="7" y="2.5" width="10" height="19" rx="2" {...stroke} />
      ) : null}
      {kind === "pc" ? (
        <>
          <rect x="3" y="4" width="18" height="12" rx="1.5" {...stroke} />
          <path d="M2 19.5h20" {...stroke} />
        </>
      ) : null}
      {kind === "tablet" ? (
        <rect x="4.5" y="2.5" width="15" height="19" rx="2" {...stroke} />
      ) : null}
      {kind === "headset" ? (
        <>
          <path d="M5 13a7 7 0 0 1 14 0" {...stroke} />
          <rect x="3" y="12" width="4.5" height="7" rx="1.2" {...stroke} />
          <rect x="16.5" y="12" width="4.5" height="7" rx="1.2" {...stroke} />
        </>
      ) : null}
    </svg>
  );
}

function CurriculumDiagram() {
  return (
    <div className="grid lg:grid-cols-3">
      <div className="border-b border-ink/10 p-5 md:p-6 lg:border-r lg:border-b-0">
        <p className="font-mono text-[0.68rem] tracking-[0.22em] text-amber uppercase">
          01 · Syllabus
        </p>
        <p className="mt-3 font-display text-2xl tracking-tight">
          State boards and CBSE
        </p>
        <ol className="mt-5">
          {chapters.map((chapter) => (
            <li
              key={chapter.index}
              className={`grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-t border-ink/10 py-3 ${
                chapter.current ? "text-ink" : "text-ink/45"
              }`}
            >
              <span className="font-mono text-[0.68rem] tracking-[0.14em] text-amber">
                {chapter.index}
              </span>
              <span className="font-display text-xl tracking-tight">{chapter.title}</span>
              {chapter.current ? (
                <span className="font-mono text-[0.62rem] tracking-[0.16em] text-amber uppercase">
                  Now
                </span>
              ) : (
                <span />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="border-b border-ink/10 p-5 md:p-6 lg:border-r lg:border-b-0">
        <p className="font-mono text-[0.68rem] tracking-[0.22em] text-amber uppercase">
          02 · In the school
        </p>
        <ol className="mt-5">
          {rooms.map((room) => (
            <li key={room.title} className="border-t border-ion/50 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-xl tracking-tight">{room.title}</p>
                <span className="font-mono text-[0.62rem] tracking-[0.16em] text-amber">
                  {room.index}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-ink/70">{room.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5 md:p-6">
        <p className="font-mono text-[0.68rem] tracking-[0.22em] text-amber uppercase">
          03 · Same chapter
        </p>
        <p className="mt-3 font-display text-2xl tracking-tight">Light, on every screen</p>
        <ul className="mt-5 grid grid-cols-4 gap-2">
          {devices.map((device) => (
            <li key={device.kind} className="min-w-0 text-center">
              <div className="grid h-16 place-items-center rounded-2xl border border-ink/15 bg-paper text-ink sm:h-20">
                <DeviceIcon kind={device.kind} />
              </div>
              <p className="mt-2 truncate font-mono text-[0.58rem] tracking-[0.12em] text-ink/55 uppercase">
                {device.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function StudioMap() {
  return (
    <figure className="mt-10 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface">
      <CurriculumDiagram />
      <figcaption className="sr-only">
        An example CBSE chapter, Light, moves from the syllabus through a
        studio, a library, and a classroom, then opens on a phone, a PC, a
        tablet, or an AR/VR headset.
      </figcaption>
      <div className="grid border-t border-ink/10 sm:grid-cols-3">
        {around.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group border-t border-ink/10 px-5 py-5 transition-colors duration-300 first:border-t-0 hover:bg-paper motion-reduce:transition-none sm:border-t-0 sm:border-l sm:first:border-l-0"
          >
            <span className="font-mono text-[0.68rem] tracking-[0.18em] text-amber">
              {item.index}
            </span>
            <span className="mt-2 flex items-center justify-between gap-3">
              <span className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-amber motion-reduce:transition-none">
                {item.title}
              </span>
              <span
                aria-hidden
                className="font-mono text-ink/40 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </span>
            <span className="mt-2 block text-sm leading-6 text-ink/70">{item.body}</span>
          </Link>
        ))}
      </div>
    </figure>
  );
}

function K12Figure() {
  return (
    <figure className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface">
      <CurriculumDiagram />
      <figcaption className="border-t border-ink/10 px-5 py-4 text-sm leading-6 text-ink/70 md:px-6">
        An example. Chapter 05, Light, is the lesson in the room. It passes
        through the studio, the library, and Class 8A, then opens on the phone,
        PC, tablet, or headset the class is using.
      </figcaption>
    </figure>
  );
}

function TrainingFigure() {
  return (
    <figure className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface">
      <div className="p-5 md:p-6">
        <p className="font-mono text-[0.68rem] tracking-[0.22em] text-amber uppercase">
          One path
        </p>
        <p className="mt-3 max-w-xl font-display text-2xl tracking-tight md:text-3xl">
          Orient, practice, then a record.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10">
          <table className="w-full table-fixed text-left">
            <caption className="sr-only">
              Higher study, engineering, nursing, and medicine each follow
              orient, practice, and record.
            </caption>
            <thead>
              <tr className="border-b border-ink/10">
                <th className="w-[40%] px-3 py-3 font-mono text-[0.62rem] tracking-[0.16em] font-normal text-ink/45 uppercase">
                  Program
                </th>
                {trainingSteps.map((step, index) => (
                  <th
                    key={step}
                    className="px-2 py-3 text-center font-mono text-[0.62rem] tracking-[0.14em] font-normal text-amber uppercase"
                  >
                    0{index + 1}
                    <span className="mt-1 block tracking-[0.08em] text-ink/55 normal-case">
                      {step}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trainingRows.map((row) => (
                <tr key={row} className="border-t border-ink/10">
                  <th className="px-3 py-3 text-left font-display text-base font-normal tracking-tight md:text-lg">
                    {row}
                  </th>
                  {trainingSteps.map((step) => (
                    <td key={step} className="px-3 py-3">
                      <span className="mx-auto block h-1.5 max-w-16 rounded-full bg-ion/80" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <figcaption className="border-t border-ink/10 px-5 py-4 text-sm leading-6 text-ink/70 md:px-6">
        The domain changes. The path stays: a cohort is oriented, practices the
        work, and keeps a record of what was finished.
      </figcaption>
    </figure>
  );
}

function SoftwareFigure() {
  return (
    <figure className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface">
      <div className="grid gap-3 p-5 md:grid-cols-3 md:grid-rows-2 md:p-6">
        <div className="grid place-items-center rounded-[1.5rem] border border-white/10 bg-ink px-5 py-8 text-center text-ivory md:col-start-2 md:row-span-2 md:row-start-1">
          <p className="font-mono text-[0.68rem] tracking-[0.22em] text-amber uppercase">
            LMS
          </p>
          <p className="mt-3 font-display text-2xl tracking-tight">
            Course, cohort, record
          </p>
        </div>
        {apps.map((app, index) => (
          <div
            key={app.title}
            className={`rounded-2xl border border-ink/10 bg-paper px-4 py-4 ${
              index === 0
                ? "md:col-start-1 md:row-start-1"
                : index === 1
                  ? "md:col-start-3 md:row-start-1"
                  : index === 2
                    ? "md:col-start-1 md:row-start-2"
                    : "md:col-start-3 md:row-start-2"
            }`}
          >
            <p className="font-mono text-[0.62rem] tracking-[0.16em] text-amber">
              0{index + 1}
            </p>
            <p className="mt-2 font-display text-xl tracking-tight">{app.title}</p>
            <p className="mt-1 text-sm leading-6 text-ink/70">{app.body}</p>
          </div>
        ))}
      </div>
      <figcaption className="border-t border-ink/10 px-5 py-4 text-sm leading-6 text-ink/70 md:px-6">
        The applications sit with the learning platform. They carry the same
        course, cohort, and record.
      </figcaption>
    </figure>
  );
}

function WebFigure() {
  return (
    <figure className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface">
      <div className="p-3 md:p-4">
        <div className="overflow-hidden rounded-2xl border border-ink/15 bg-paper">
          <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
            <span className="size-2 rounded-full bg-ink/20" />
            <span className="size-2 rounded-full bg-ink/20" />
            <span className="size-2 rounded-full bg-amber" />
            <span className="ml-2 font-mono text-[0.62rem] tracking-[0.16em] text-ink/45 uppercase">
              The program
            </span>
          </div>
          <div className="grid gap-6 p-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:p-6">
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-amber">
                01
              </p>
              <p className="mt-2 font-display text-3xl tracking-tight">The syllabus</p>
              <ul className="mt-4 space-y-2">
                {chapters.map((chapter) => (
                  <li
                    key={chapter.index}
                    className="grid grid-cols-[2rem_1fr] items-center gap-3 border-t border-ink/10 py-2"
                  >
                    <span className="font-mono text-[0.68rem] text-amber">{chapter.index}</span>
                    <span className="h-2 rounded-full bg-ink/10" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:border-l md:border-ink/10 md:pl-6">
              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-amber">
                02
              </p>
              <p className="mt-2 font-display text-2xl tracking-tight">Faculty</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">
                Who teaches, and which program they hold.
              </p>
              <p className="mt-6 font-mono text-[0.68rem] tracking-[0.18em] text-amber">
                03
              </p>
              <p className="mt-3 inline-flex h-11 items-center rounded-full bg-ink px-5 font-mono text-[0.68rem] tracking-[0.16em] text-ivory uppercase">
                Start
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-ink/10 px-5 py-4 text-sm leading-6 text-ink/70 md:px-6">
        A visitor should be able to read the syllabus, see who teaches, and
        find where to start.
      </figcaption>
    </figure>
  );
}

export function SolutionFigure({ href }: { href: Href }) {
  if (href === "/services/k12-education") return <K12Figure />;
  if (href === "/services/training-lms") return <TrainingFigure />;
  if (href === "/services/software-mobile") return <SoftwareFigure />;
  return <WebFigure />;
}

export function SolutionScene({ href }: { href: Href }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-5" aria-hidden>
      {href === "/services/k12-education" ? <K12Scene /> : null}
      {href === "/services/training-lms" ? <TrainingScene /> : null}
      {href === "/services/software-mobile" ? <SoftwareScene /> : null}
      {href === "/services/web-dev" ? <WebScene /> : null}
    </div>
  );
}

function K12Scene() {
  return (
    <>
      <div className="flex items-end justify-between gap-3">
        <p className="font-mono text-[0.58rem] tracking-[0.16em] text-amber uppercase md:text-[0.68rem]">
          State · CBSE
        </p>
        <p className="font-display text-sm tracking-tight md:text-2xl">Ch 05 · Light</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5 md:gap-3">
        {rooms.map((room) => (
          <div key={room.title} className="rounded-xl border border-ink/10 bg-white/80 px-2 py-2 md:px-3 md:py-3">
            <p className="font-mono text-[0.55rem] tracking-[0.14em] text-amber">{room.index}</p>
            <p className="mt-1 truncate font-display text-xs tracking-tight md:text-lg">{room.title}</p>
          </div>
        ))}
      </div>
      <ul className="grid grid-cols-4 gap-1.5">
        {devices.map((device) => (
          <li key={device.kind} className="grid h-8 place-items-center rounded-lg border border-ink/10 bg-paper text-ink md:h-11">
            <DeviceIcon kind={device.kind} />
          </li>
        ))}
      </ul>
    </>
  );
}

function TrainingScene() {
  return (
    <>
      <p className="font-mono text-[0.58rem] tracking-[0.16em] text-amber uppercase md:text-[0.68rem]">
        One path
      </p>
      <ul className="grid flex-1 grid-cols-2 content-center gap-1.5 md:grid-cols-4 md:gap-3">
        {trainingRows.map((row, index) => (
          <li key={row} className="rounded-xl border border-ink/10 bg-white/80 px-2 py-2 md:px-3 md:py-3">
            <p className="font-mono text-[0.55rem] text-amber">0{index + 1}</p>
            <p className="mt-1 truncate font-display text-xs tracking-tight md:text-lg">{row}</p>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-3 gap-1.5">
        {trainingSteps.map((step) => (
          <div key={step} className="min-w-0">
            <span className="block h-1.5 rounded-full bg-ion/80" />
            <p className="mt-1 truncate font-mono text-[0.55rem] tracking-[0.12em] text-ink/55 uppercase">
              {step}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function SoftwareScene() {
  return (
    <>
      <p className="font-mono text-[0.58rem] tracking-[0.16em] text-amber uppercase md:text-[0.68rem]">
        Around the course
      </p>
      <div className="grid flex-1 grid-cols-2 content-center gap-1.5 md:grid-cols-4 md:gap-3">
        {apps.map((app) => (
          <div key={app.title} className="rounded-xl border border-ink/10 bg-white/80 px-2 py-2 md:py-4">
            <p className="truncate text-center font-display text-xs tracking-tight md:text-base">
              {app.title}
            </p>
          </div>
        ))}
        <div className="col-span-2 grid place-items-center rounded-xl bg-ink px-3 py-2 text-ivory md:col-span-4 md:py-4">
          <p className="font-display text-sm tracking-tight md:text-xl">LMS · course, cohort, record</p>
        </div>
      </div>
    </>
  );
}

function WebScene() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-paper">
      <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
        <span className="size-1.5 rounded-full bg-ink/20" />
        <span className="size-1.5 rounded-full bg-ink/20" />
        <span className="size-1.5 rounded-full bg-amber" />
        <span className="ml-2 font-mono text-[0.55rem] tracking-[0.14em] text-ink/45 uppercase">
          The program
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[1.3fr_0.7fr] gap-3 p-3">
        <div className="flex flex-col justify-center gap-1.5">
          {chapters.map((chapter) => (
            <div key={chapter.index} className="h-2 rounded-full bg-ink/10" />
          ))}
        </div>
        <div className="flex flex-col items-start justify-between">
          <p className="font-display text-sm tracking-tight md:text-xl">Faculty</p>
          <span className="inline-flex h-7 items-center rounded-full bg-ink px-3 font-mono text-[0.55rem] tracking-[0.14em] text-ivory uppercase">
            Start
          </span>
        </div>
      </div>
    </div>
  );
}
