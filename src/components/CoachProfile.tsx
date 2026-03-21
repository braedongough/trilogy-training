import { Section } from './Section'
import './CoachProfile.css'

type CoachProfileProps = {
  name: string
  imageSrc: string
  location: string
  flag: string
  credentials: string
  bio: string
  accent: 'accent-1' | 'accent-2'
  reverse?: boolean
}

export function CoachProfile({
  name,
  imageSrc,
  location,
  flag,
  credentials,
  bio,
  accent,
  reverse = false,
}: CoachProfileProps) {
  return (
    <Section background={reverse ? 'alt' : 'default'} divider={reverse ? 'angle-top' : 'none'} id={`coach-${name.split(' ')[0].toLowerCase()}`}>
      <div className={`coach coach--${accent} ${reverse ? 'coach--reverse' : ''}`}>
        <div className="coach__visual">
          <div className="coach__photo-wrap">
            <img src={imageSrc} alt={name} className="coach__photo" loading="lazy" />
          </div>
          <div className={`coach__stripe coach__stripe--${accent}`} aria-hidden="true" />
        </div>

        <div className="coach__info">
          <p className={`coach__label coach__label--${accent}`}>{flag} {location}</p>
          <h2 className="coach__name">{name}</h2>
          <p className="coach__credentials">{credentials}</p>
          <p className="coach__bio">{bio}</p>
        </div>
      </div>
    </Section>
  )
}
