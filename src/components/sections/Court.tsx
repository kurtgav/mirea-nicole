import { useState } from 'react'
import { PARTICIPANTS } from '../../data/content'
import { cn } from '../../lib/cn'
import { Layer, Ornament } from '../ui/Layer'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

type Group = (typeof PARTICIPANTS)[number]

function GroupCard({ group, index, hidden }: { group: Group; index: number; hidden: boolean }) {
  return (
    <Reveal
      delay={0.08 * index}
      className={cn('frame panel relative flex-col items-center px-5 pb-8 pt-[118px]', hidden ? 'hidden lg:flex' : 'flex')}
      role="tabpanel"
      id={`court-${group.id}`}
      aria-labelledby={`court-tab-${group.id}`}
    >
      <Ornament
        name={index % 2 ? 'banner-purple' : 'banner-green'}
        className="absolute left-1/2 top-[-6px] w-[46px] -translate-x-1/2 drop-shadow-[0_8px_14px_rgba(0,0,0,.45)]"
      />
      <h3 className="relative z-10 m-0 font-display [text-shadow:0_2px_10px_rgba(5,7,22,.9)] text-[22px] font-normal uppercase tracking-[0.16em] text-ivory" style={{ textIndent: '0.16em' }}>
        {group.label}
      </h3>
      <Ornament name="divider-short" className="mt-3 w-[120px] opacity-80" />
      <ol className="m-0 mt-5 list-none space-y-[6px] p-0 text-center text-[18px] italic leading-[1.45] text-ivory/85">
        {group.names.map((name, i) => (
          <li key={`${name}-${i}`}>{name}</li>
        ))}
      </ol>
    </Reveal>
  )
}

export function Court() {
  const [active, setActive] = useState<Group['id']>(PARTICIPANTS[0].id)

  return (
    <section
      id="court"
      aria-labelledby="court-title"
      className="relative overflow-hidden border-t border-gold/20 px-5 py-[clamp(90px,13vh,150px)]"
    >
      <Layer name="wreath-green" className="left-1/2 top-[clamp(40px,7vh,90px)] w-[112px] -translate-x-1/2 opacity-30" />
      <Layer name="star-4pt" className="anim-twinkle left-[8%] top-[18%] w-[26px]" />
      <Layer name="star-4pt" className="anim-twinkle right-[10%] top-[12%] w-[18px] [animation-delay:2s]" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <SectionTitle title="The Court" id="court-title" sub="Our ceremonial participants" />

        {/* small screens: one list at a time */}
        <div role="tablist" aria-label="Ceremonial groups" className="mx-auto mt-10 grid max-w-[460px] grid-cols-4 lg:hidden">
          {PARTICIPANTS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              id={`court-tab-${g.id}`}
              aria-selected={active === g.id}
              aria-controls={`court-${g.id}`}
              onClick={() => setActive(g.id)}
              className={cn(
                'caps cursor-pointer border-b bg-transparent px-1 py-3 text-[11px] transition-colors',
                active === g.id ? 'border-gold text-gold-light' : 'border-gold/20 text-ivory/60',
              )}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-[460px] grid-cols-1 gap-x-5 gap-y-14 lg:mt-20 lg:max-w-none lg:grid-cols-4">
          {PARTICIPANTS.map((g, i) => (
            <GroupCard key={g.id} group={g} index={i} hidden={active !== g.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
