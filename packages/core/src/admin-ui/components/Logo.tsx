import Link from 'next/link'
import { useKeystone } from '../context'
import { type SVGAttributes } from 'react'
import { Heading } from '@keystar/ui/typography'
import { css, tokenSchema } from '@keystar/ui/style'

export function Logo() {
  const { adminConfig } = useKeystone()
  if (adminConfig?.components?.Logo) return <adminConfig.components.Logo />
  return <DefaultLogo />
}

function DefaultLogo() {
  return (
    <Heading elementType="div" size="small" UNSAFE_className={css({ lineHeight: 1 })}>
      <Link
        href="/"
        className={css({
          alignItems: 'center',
          color: tokenSchema.color.alias.foregroundIdle,
          display: 'flex',
          gap: tokenSchema.size.space.regular,
          outline: 0,
          textDecoration: 'underline',
          textDecorationColor: 'transparent',
          textDecorationThickness: tokenSchema.size.border.regular,
          textUnderlineOffset: tokenSchema.size.border.medium,
          '&:hover, &:focus-visible': {
            color: tokenSchema.color.alias.foregroundHovered,
            textDecorationColor: 'currentColor',
          },
          '&:focus-visible': {
            textDecorationStyle: 'double',
          },
        })}
      >
        <LogoMark className={css({ width: tokenSchema.size.element.small })} />
        <span>来客宝运营平台</span>
      </Link>
    </Heading>
  )
}

const LogoMark = (props: SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 118 76" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M118.184 38.184 87 0H70l31.367 38.367-31.184 38.184L87 76.368l31.184-38.184Z"
      fill={tokenSchema.color.background.accentEmphasis}
    />
    <path
      d="M8 38.184 39.184 0h17L24.816 38.367 56 76.552l-16.816-.183L8 38.184Z"
      fill={tokenSchema.color.foreground.neutral}
    />
    <path d="M0 0h13v76H0V0Z" fill={tokenSchema.color.foreground.neutral} />
  </svg>
)
