import { UserRound } from 'lucide-react';

import { PlaceholderBadge } from '@/components/feedback/DataBadges';
import { PendingText } from '@/components/feedback/PendingText';
import { Reveal } from '@/components/ui/reveal';
import { team } from '@/content/team';
import { type TeamMember } from '@/types/content';

import { LandingSection } from '../components/LandingSection';

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article className="flex h-full items-center gap-4 rounded-xl border border-border bg-surface p-5">
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name ?? `Integrante ${index + 1}`}
          width={64}
          height={64}
          loading="lazy"
          className="size-16 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-16 shrink-0 items-center justify-center rounded-full border border-dashed border-input bg-muted text-muted-foreground"
        >
          <UserRound className="size-7" />
        </span>
      )}
      <div className="grid min-w-0 gap-1">
        <h3 className="truncate font-sans text-base font-semibold">
          <PendingText value={member.name} fallback={`Integrante ${index + 1}`} />
        </h3>
        <p className="text-sm">
          <PendingText value={member.role} fallback="Rol por definir" />
        </p>
      </div>
    </article>
  );
}

export function TeamSection() {
  const hasPending = team.some((member) => member.name === null || member.role === null);

  return (
    <LandingSection
      id="equipo"
      eyebrow="Equipo"
      title="Integrantes"
      description={<p>Equipo de {team.length} integrantes responsables del proyecto.</p>}
      badge={hasPending ? <PlaceholderBadge /> : undefined}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <li key={member.id}>
            <Reveal delay={(index % 3) * 80} className="h-full">
              <MemberCard member={member} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}
