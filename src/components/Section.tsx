import './Section.css'

type SectionProps = {
  children: React.ReactNode
  id?: string
  background?: 'default' | 'alt' | 'surface' | 'accent-1' | 'accent-2'
  divider?: 'angle-top' | 'angle-bottom' | 'angle-both' | 'none'
  className?: string
}

export function Section({ children, id, background = 'default', divider = 'none', className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`section section--bg-${background} section--divider-${divider} ${className}`}
    >
      <div className="section__inner">
        {children}
      </div>
    </section>
  )
}
