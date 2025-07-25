import { Button } from '@keystar/ui/button'
import type { ListMeta } from '../../types'
import { Text } from '@keystar/ui/typography'

export function CreateButtonLink(props: { children?: string; list: ListMeta }) {
  const { list, children = `创建 ${list.singular}` } = props
  return (
    <Button
      aria-label={`New ${props.list.singular}`}
      href={`/${list.path}/create`}
      prominence="high"
    >
      <Text>{children}</Text>
    </Button>
  )
}
