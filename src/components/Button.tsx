import './Button.css'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
}

export function Button({ children, variant = 'primary', size = 'md', href, onClick }: ButtonProps) {
  const className = `btn btn--${variant} btn--${size}`

  if (href) {
    return <a href={href} className={className}>{children}</a>
  }

  return <button className={className} onClick={onClick}>{children}</button>
}
