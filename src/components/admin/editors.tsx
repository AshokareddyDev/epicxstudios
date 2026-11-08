"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import {
  login,
  saveAbout,
  saveContactCopy,
  saveHome,
  savePages,
  savePractice,
  saveServicesCopy,
  saveStudio,
  saveViews,
  type SaveState,
} from "@/app/admin/actions";
import { uiSpring } from "@/lib/motion";
import type {
  AboutCopy,
  ContactCopy,
  Emphasis,
  HomeCopy,
  Member,
  PageLink,
  Practice,
  ServicesCopy,
  StudioCopy,
  View,
} from "@/lib/site";

const idleSave: SaveState = { status: "idle", message: "" };

const fieldClass =
  "mt-2 w-full rounded-2xl border border-ivory/40 bg-ivory px-4 py-3 text-base text-paper";

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase"
    >
      {children}
    </label>
  );
}

function SaveBar({
  pending,
  state,
  label = "Save",
}: {
  pending: boolean;
  state: SaveState;
  label?: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <motion.button
        type="submit"
        disabled={pending}
        whileHover={{ scale: pending ? 1 : 1.02 }}
        whileTap={{ scale: pending ? 1 : 0.98 }}
        transition={uiSpring}
        className="inline-flex h-11 items-center justify-center rounded-full bg-amber px-5 text-sm font-medium text-paper hover:bg-ivory hover:text-paper disabled:opacity-60"
      >
        {pending ? "Saving" : label}
      </motion.button>
      {state.message ? (
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

function TextField({
  id,
  name,
  label,
  defaultValue,
  rows,
}: {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
  rows?: number;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          defaultValue={defaultValue}
          className={`${fieldClass} resize-y`}
        />
      ) : (
        <input id={id} name={name} defaultValue={defaultValue} className={fieldClass} />
      )}
    </div>
  );
}

function pad(index: number) {
  return String(index).padStart(2, "0");
}

function RowButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={uiSpring}
      className="inline-flex h-11 items-center rounded-full border border-ink/15 px-4 text-sm hover:border-amber"
    >
      {label}
    </motion.button>
  );
}

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(login, idleSave);

  return (
    <form action={action} className="glass grid gap-5 rounded-[1.75rem] p-6">
      <div>
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClass}
        />
      </div>
      {configured ? null : (
        <p className="text-base leading-7 text-ink/75">
          This machine has no studio password yet. Add ADMIN_PASSWORD and
          ADMIN_SECRET, then restart the server.
        </p>
      )}
      <SaveBar pending={pending} state={state} label="Open" />
    </form>
  );
}

export function StudioEditor({ studio }: { studio: StudioCopy }) {
  const [state, action, pending] = useActionState(saveStudio, idleSave);
  return (
    <form action={action} className="grid max-w-2xl gap-5">
      <TextField id="name" name="name" label="Name" defaultValue={studio.name} />
      <TextField
        id="description"
        name="description"
        label="Description"
        defaultValue={studio.description}
        rows={4}
      />
      <TextField id="footer" name="footer" label="Footer" defaultValue={studio.footer} rows={3} />
      <SaveBar pending={pending} state={state} />
    </form>
  );
}

export function HomeEditor({ home }: { home: HomeCopy }) {
  const [state, action, pending] = useActionState(saveHome, idleSave);
  return (
    <form action={action} className="grid max-w-2xl gap-5">
      <TextField id="eyebrow" name="eyebrow" label="Eyebrow" defaultValue={home.eyebrow} />
      <TextField id="title" name="title" label="Title" defaultValue={home.title} rows={2} />
      <TextField id="lede" name="lede" label="Introduction" defaultValue={home.lede} rows={4} />
      <TextField
        id="systemEyebrow"
        name="systemEyebrow"
        label="System eyebrow"
        defaultValue={home.systemEyebrow}
      />
      <TextField
        id="systemTitle"
        name="systemTitle"
        label="System title"
        defaultValue={home.systemTitle}
        rows={2}
      />
      <TextField
        id="linksTitle"
        name="linksTitle"
        label="Links title"
        defaultValue={home.linksTitle}
        rows={2}
      />
      <SaveBar pending={pending} state={state} />
    </form>
  );
}

export function ServicesEditor({ servicesPage }: { servicesPage: ServicesCopy }) {
  const [state, action, pending] = useActionState(saveServicesCopy, idleSave);
  return (
    <form action={action} className="grid max-w-2xl gap-5">
      <TextField id="title" name="title" label="Page title" defaultValue={servicesPage.title} />
      <TextField
        id="description"
        name="description"
        label="Description"
        defaultValue={servicesPage.description}
        rows={3}
      />
      <TextField id="eyebrow" name="eyebrow" label="Eyebrow" defaultValue={servicesPage.eyebrow} />
      <TextField
        id="headline"
        name="headline"
        label="Headline"
        defaultValue={servicesPage.headline}
        rows={2}
      />
      <TextField id="lede" name="lede" label="Introduction" defaultValue={servicesPage.lede} rows={5} />
      <SaveBar pending={pending} state={state} />
    </form>
  );
}

export function ContactCopyEditor({ contactPage }: { contactPage: ContactCopy }) {
  const [state, action, pending] = useActionState(saveContactCopy, idleSave);
  return (
    <form action={action} className="grid max-w-2xl gap-5">
      <TextField id="title" name="title" label="Page title" defaultValue={contactPage.title} />
      <TextField
        id="description"
        name="description"
        label="Description"
        defaultValue={contactPage.description}
        rows={3}
      />
      <TextField id="eyebrow" name="eyebrow" label="Eyebrow" defaultValue={contactPage.eyebrow} />
      <TextField
        id="headline"
        name="headline"
        label="Headline"
        defaultValue={contactPage.headline}
        rows={2}
      />
      <TextField id="lede" name="lede" label="Introduction" defaultValue={contactPage.lede} rows={4} />
      <SaveBar pending={pending} state={state} />
    </form>
  );
}

export function PagesEditor({ pages }: { pages: PageLink[] }) {
  const [draft, setDraft] = useState(pages);
  const [state, action, pending] = useActionState(savePages, idleSave);

  return (
    <form action={action} className="grid gap-8">
      <input type="hidden" name="payload" value={JSON.stringify(draft)} />
      {draft.map((page, index) => (
        <fieldset key={page.href} className="grid gap-4 border-t border-ink/10 pt-6">
          <legend className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
            {page.href}
          </legend>
          <div>
            <Label htmlFor={`index-${page.href}`}>Index</Label>
            <input
              id={`index-${page.href}`}
              value={page.index}
              onChange={(event) =>
                setDraft((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, index: event.target.value } : item,
                  ),
                )
              }
              className={fieldClass}
            />
          </div>
          <div>
            <Label htmlFor={`label-${page.href}`}>Label</Label>
            <input
              id={`label-${page.href}`}
              value={page.label}
              onChange={(event) =>
                setDraft((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, label: event.target.value } : item,
                  ),
                )
              }
              className={fieldClass}
            />
          </div>
          <div>
            <Label htmlFor={`summary-${page.href}`}>Summary</Label>
            <textarea
              id={`summary-${page.href}`}
              rows={3}
              value={page.summary}
              onChange={(event) =>
                setDraft((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, summary: event.target.value } : item,
                  ),
                )
              }
              className={`${fieldClass} resize-y`}
            />
          </div>
        </fieldset>
      ))}
      <SaveBar pending={pending} state={state} />
    </form>
  );
}

export function ProductEditor({ practice }: { practice: Practice }) {
  const [draft, setDraft] = useState(practice);
  const [state, action, pending] = useActionState(savePractice, idleSave);

  function patch(partial: Partial<Practice>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  return (
    <form action={action} className="grid max-w-3xl gap-5">
      <input type="hidden" name="href" value={practice.href} />
      <input type="hidden" name="payload" value={JSON.stringify(draft)} />
      <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/60 uppercase">
        {practice.href}
      </p>
      <div>
        <Label htmlFor="index">Index</Label>
        <input
          id="index"
          value={draft.index}
          onChange={(event) => patch({ index: event.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <Label htmlFor="nav">Navigation label</Label>
        <input
          id="nav"
          value={draft.nav}
          onChange={(event) => patch({ nav: event.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <input
          id="title"
          value={draft.title}
          onChange={(event) => patch({ title: event.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <Label htmlFor="headline">Headline</Label>
        <textarea
          id="headline"
          rows={2}
          value={draft.headline}
          onChange={(event) => patch({ headline: event.target.value })}
          className={`${fieldClass} resize-y`}
        />
      </div>
      <div>
        <Label htmlFor="summary">Summary</Label>
        <textarea
          id="summary"
          rows={3}
          value={draft.summary}
          onChange={(event) => patch({ summary: event.target.value })}
          className={`${fieldClass} resize-y`}
        />
      </div>
      <div>
        <Label htmlFor="lede">Introduction</Label>
        <textarea
          id="lede"
          rows={5}
          value={draft.lede}
          onChange={(event) => patch({ lede: event.target.value })}
          className={`${fieldClass} resize-y`}
        />
      </div>
      <div>
        <Label htmlFor="points">Points, one on each line</Label>
        <textarea
          id="points"
          rows={5}
          value={draft.points.join("\n")}
          onChange={(event) => patch({ points: event.target.value.split("\n") })}
          className={`${fieldClass} resize-y`}
        />
      </div>
      <div>
        <Label htmlFor="detailTitle">Detail heading</Label>
        <input
          id="detailTitle"
          value={draft.detailTitle}
          onChange={(event) => patch({ detailTitle: event.target.value })}
          className={fieldClass}
        />
      </div>
      <div className="grid gap-6">
        {draft.details.map((detail, index) => (
          <fieldset key={`${detail.index}-${index}`} className="grid gap-4 border-t border-ink/10 pt-5">
            <legend className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
              Detail {detail.index}
            </legend>
            <input
              aria-label={`Detail ${index + 1} index`}
              value={detail.index}
              onChange={(event) =>
                patch({
                  details: draft.details.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, index: event.target.value } : item,
                  ),
                })
              }
              className={fieldClass}
            />
            <input
              aria-label={`Detail ${index + 1} title`}
              value={detail.title}
              onChange={(event) =>
                patch({
                  details: draft.details.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, title: event.target.value } : item,
                  ),
                })
              }
              className={fieldClass}
            />
            <textarea
              aria-label={`Detail ${index + 1} text`}
              rows={3}
              value={detail.body}
              onChange={(event) =>
                patch({
                  details: draft.details.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, body: event.target.value } : item,
                  ),
                })
              }
              className={`${fieldClass} resize-y`}
            />
            <RowButton
              label={`Remove detail ${detail.index}`}
              onClick={() =>
                patch({ details: draft.details.filter((_, itemIndex) => itemIndex !== index) })
              }
            />
          </fieldset>
        ))}
        <RowButton
          label="Add a detail"
          onClick={() =>
            patch({
              details: [
                ...draft.details,
                {
                  index: pad(draft.details.length + 1),
                  title: "New detail",
                  body: "What this part of the product holds.",
                },
              ],
            })
          }
        />
      </div>
      <SaveBar pending={pending} state={state} />
    </form>
  );
}

export function GalleryEditor({
  views,
  practices,
}: {
  views: View[];
  practices: Practice[];
}) {
  const [draft, setDraft] = useState(views);
  const [state, action, pending] = useActionState(saveViews, idleSave);

  return (
    <form action={action} className="grid gap-8">
      <input type="hidden" name="payload" value={JSON.stringify(draft)} />
      {draft.map((view, index) => (
        <fieldset key={`${view.src}-${index}`} className="grid gap-4 border-t border-ink/10 pt-6">
          <legend className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
            Frame {pad(index + 1)}
          </legend>
          <div>
            <Label htmlFor={`src-${index}`}>File</Label>
            <input
              id={`src-${index}`}
              value={view.src}
              onChange={(event) =>
                setDraft((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, src: event.target.value } : item,
                  ),
                )
              }
              className={fieldClass}
            />
          </div>
          <div>
            <Label htmlFor={`href-${index}`}>Product</Label>
            <select
              id={`href-${index}`}
              value={view.href}
              onChange={(event) =>
                setDraft((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, href: event.target.value } : item,
                  ),
                )
              }
              className={fieldClass}
            >
              {practices.map((practice) => (
                <option key={practice.href} value={practice.href}>
                  {practice.index} {practice.title}
                </option>
              ))}
            </select>
          </div>
          {(
            [
              ["kicker", "Kicker"],
              ["title", "Title"],
              ["caption", "Caption"],
              ["alt", "Description"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <Label htmlFor={`${key}-${index}`}>{label}</Label>
              <input
                id={`${key}-${index}`}
                value={view[key]}
                onChange={(event) =>
                  setDraft((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, [key]: event.target.value } : item,
                    ),
                  )
                }
                className={fieldClass}
              />
            </div>
          ))}
          <RowButton
            label={`Remove frame ${index + 1}`}
            onClick={() => setDraft((current) => current.filter((_, itemIndex) => itemIndex !== index))}
          />
        </fieldset>
      ))}
      <RowButton
        label="Add a frame"
        onClick={() =>
          setDraft((current) => [
            ...current,
            {
              src: "/gallery/",
              href: practices[0]?.href ?? "/services/k12-education",
              kicker: "Education",
              title: "New frame",
              caption: "What the picture shows.",
              alt: "Describe the picture for someone who cannot see it.",
            },
          ])
        }
      />
      <SaveBar pending={pending} state={state} />
    </form>
  );
}

export function AboutEditor({ about }: { about: AboutCopy }) {
  const [draft, setDraft] = useState(about);
  const [state, action, pending] = useActionState(saveAbout, idleSave);

  function patch(partial: Partial<AboutCopy>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function patchPrinciple(index: number, partial: Partial<Emphasis>) {
    patch({
      principles: draft.principles.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...partial } : item,
      ),
    });
  }

  function patchMember(index: number, partial: Partial<Member>) {
    patch({
      members: draft.members.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...partial } : item,
      ),
    });
  }

  return (
    <form action={action} className="grid max-w-3xl gap-8">
      <input type="hidden" name="payload" value={JSON.stringify(draft)} />
      <div className="grid gap-5">
        <h2 className="font-display text-2xl tracking-tight">Opening</h2>
        {(
          [
            ["title", "Page title", false],
            ["description", "Description", true],
            ["eyebrow", "Eyebrow", false],
            ["headline", "Headline", true],
            ["lede", "Introduction", true],
          ] as const
        ).map(([key, label, long]) => (
          <div key={key}>
            <Label htmlFor={key}>{label}</Label>
            {long ? (
              <textarea
                id={key}
                rows={key === "lede" || key === "description" ? 4 : 2}
                value={draft[key]}
                onChange={(event) => patch({ [key]: event.target.value })}
                className={`${fieldClass} resize-y`}
              />
            ) : (
              <input
                id={key}
                value={draft[key]}
                onChange={(event) => patch({ [key]: event.target.value })}
                className={fieldClass}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6">
        <h2 className="font-display text-2xl tracking-tight">Principles</h2>
        {draft.principles.map((principle, index) => (
          <fieldset key={`principle-${index}`} className="grid gap-4 border-t border-ink/10 pt-5">
            <legend className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
              {principle.index || pad(index + 1)}
            </legend>
            <input
              aria-label={`Principle ${index + 1} index`}
              value={principle.index}
              onChange={(event) => patchPrinciple(index, { index: event.target.value })}
              className={fieldClass}
            />
            <input
              aria-label={`Principle ${index + 1} title`}
              value={principle.title}
              onChange={(event) => patchPrinciple(index, { title: event.target.value })}
              className={fieldClass}
            />
            <textarea
              aria-label={`Principle ${index + 1} text`}
              rows={3}
              value={principle.body}
              onChange={(event) => patchPrinciple(index, { body: event.target.value })}
              className={`${fieldClass} resize-y`}
            />
            <RowButton
              label={`Remove principle ${principle.index || index + 1}`}
              onClick={() =>
                patch({
                  principles: draft.principles.filter((_, itemIndex) => itemIndex !== index),
                })
              }
            />
          </fieldset>
        ))}
        <RowButton
          label="Add a principle"
          onClick={() =>
            patch({
              principles: [
                ...draft.principles,
                {
                  index: pad(draft.principles.length + 1),
                  title: "A new principle.",
                  body: "What the studio holds to.",
                },
              ],
            })
          }
        />
      </div>

      <div className="grid gap-5">
        <h2 className="font-display text-2xl tracking-tight">Team</h2>
        <div>
          <Label htmlFor="teamEyebrow">Eyebrow</Label>
          <input
            id="teamEyebrow"
            value={draft.teamEyebrow}
            onChange={(event) => patch({ teamEyebrow: event.target.value })}
            className={fieldClass}
          />
        </div>
        <div>
          <Label htmlFor="teamTitle">Title</Label>
          <textarea
            id="teamTitle"
            rows={2}
            value={draft.teamTitle}
            onChange={(event) => patch({ teamTitle: event.target.value })}
            className={`${fieldClass} resize-y`}
          />
        </div>
        <div>
          <Label htmlFor="teamLede">Introduction</Label>
          <textarea
            id="teamLede"
            rows={4}
            value={draft.teamLede}
            onChange={(event) => patch({ teamLede: event.target.value })}
            className={`${fieldClass} resize-y`}
          />
        </div>
        {draft.members.map((member, index) => (
          <fieldset key={`member-${index}`} className="grid gap-4 border-t border-ink/10 pt-5">
            <legend className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
              {member.name || `Profile ${pad(index + 1)}`}
            </legend>
            {(
              [
                ["index", "Index"],
                ["name", "Name"],
                ["role", "Role"],
                ["place", "Place"],
                ["mark", "Mark"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <Label htmlFor={`${key}-${index}`}>{label}</Label>
                <input
                  id={`${key}-${index}`}
                  value={member[key]}
                  onChange={(event) => patchMember(index, { [key]: event.target.value })}
                  className={fieldClass}
                />
              </div>
            ))}
            <RowButton
              label={`Remove ${member.name || "profile"}`}
              onClick={() =>
                patch({ members: draft.members.filter((_, itemIndex) => itemIndex !== index) })
              }
            />
          </fieldset>
        ))}
        <RowButton
          label="Add a person"
          onClick={() =>
            patch({
              members: [
                ...draft.members,
                {
                  index: pad(draft.members.length + 1),
                  name: "",
                  role: "Director",
                  place: "Bengaluru",
                  mark: "",
                },
              ],
            })
          }
        />
      </div>

      <div className="grid gap-5">
        <h2 className="font-display text-2xl tracking-tight">Products close</h2>
        <div>
          <Label htmlFor="productsEyebrow">Eyebrow</Label>
          <input
            id="productsEyebrow"
            value={draft.productsEyebrow}
            onChange={(event) => patch({ productsEyebrow: event.target.value })}
            className={fieldClass}
          />
        </div>
        <div>
          <Label htmlFor="productsTitle">Title</Label>
          <textarea
            id="productsTitle"
            rows={2}
            value={draft.productsTitle}
            onChange={(event) => patch({ productsTitle: event.target.value })}
            className={`${fieldClass} resize-y`}
          />
        </div>
      </div>
      <SaveBar pending={pending} state={state} />
    </form>
  );
}
