import { removeAppointment } from "@/app/admin/actions";
import { longDate } from "@/lib/appointment-slots";
import { listAppointments } from "@/lib/appointments";
import { getSite } from "@/lib/content";

export default async function AppointmentsAdminPage() {
  const [site, appointments] = await Promise.all([getSite(), listAppointments()]);
  const labels = new Map(site.practices.map((practice) => [practice.href, practice.title]));

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Appointments</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        Weekday times from the contact page. Each one is also sent to the studio inbox.
      </p>
      {appointments.length === 0 ? (
        <p className="mt-10 border-t border-ink/10 pt-6 text-base text-ink/75">
          No appointments yet.
        </p>
      ) : (
        <ol className="mt-10 border-b border-ink/10">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="border-t border-ink/10 py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl tracking-tight">{appointment.name}</h2>
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                  {appointment.time} · Bengaluru
                </p>
              </div>
              <p className="mt-2 text-base text-ink/75">{longDate(appointment.date)}</p>
              <p className="mt-2 text-base text-ink/75">
                {appointment.email}
                {appointment.organization ? ` · ${appointment.organization}` : ""}
                {" · "}
                {labels.get(appointment.practice) ?? "Not sure yet"}
              </p>
              <form action={removeAppointment} className="mt-4">
                <input type="hidden" name="id" value={appointment.id} />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center rounded-full border border-ink/15 px-4 text-sm hover:border-amber"
                >
                  Release this time
                </button>
              </form>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
