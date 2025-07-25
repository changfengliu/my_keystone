import { useEffect, useMemo, useState } from 'react'

import { ActionButton } from '@keystar/ui/button'
import { Flex } from '@keystar/ui/layout'
import { TooltipTrigger, Tooltip } from '@keystar/ui/tooltip'
import { Text } from '@keystar/ui/typography'
import { chevronRightIcon } from '@keystar/ui/icon/icons/chevronRightIcon'
import { chevronDownIcon } from '@keystar/ui/icon/icons/chevronDownIcon'

import { useQuery, useMutation, gql } from '@keystone-6/core/admin-ui/apollo'
import {
  DeveloperResourcesMenu,
  NavList,
  NavContainer,
  NavFooter,
  NavItem,
  getHrefFromList,
} from '@keystone-6/core/admin-ui/components'
import type { NavigationProps } from '@keystone-6/core/admin-ui/components'
import { useRouter } from '@keystone-6/core/admin-ui/router'
import { Icon } from '@keystar/ui/icon'

const GET_ADMIN_MENUS = gql`
  query GetMenus {
    menus(orderBy: { sort: asc }) {
      id
      name
      icon
      type
      path
      parent {
        id
      }
      isEnabled
    }
  }
`

export default ({ labelField }: { labelField: string }) =>
  (props: NavigationProps) => <Navigation labelField={labelField} {...props} />

//-------------------------------------------------------------

function Navigation({ labelField, lists }: { labelField: string } & NavigationProps) {
  const { data } = useQuery<{ authenticatedItem: null | { label: string } }>(
    useMemo(
      () => gql`
    query KsAuthFetchSession {
      authenticatedItem {
        label: ${labelField}
      }
    }
  `,
      [labelField]
    )
  )

  const { data: adminMenus, loading } = useQuery(GET_ADMIN_MENUS)
  if (loading) return null

  const menuTree = buildMenuTree(adminMenus.menus)

  return (
    <NavContainer>
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        <NavList>
          <NavItem href="/">所有模型</NavItem>
          {menuTree.map(menu =>
            menu.type === 'group' ? (
              <MenuGroup menu={menu} key={menu.id} />
            ) : (
              // 顶级菜单
              <NavItem key={menu.id} href={menu.path} children={menu.name} />
            )
          )}
          <MenuGroup
            open={false}
            menu={{
              name: '所有模型',
              children: lists.map(menu => {
                return { id: menu.key, name: menu.label, path: getHrefFromList(menu) }
              }),
            }}
          />
        </NavList>
      </div>
      <NavFooter>
        {data?.authenticatedItem && <SignoutButton authItemLabel={data.authenticatedItem.label} />}
        <DeveloperResourcesMenu />
      </NavFooter>
    </NavContainer>
  )
}

const END_SESSION = gql`
  mutation KsAuthEndSession {
    endSession
  }
`

function SignoutButton({ authItemLabel }: { authItemLabel: string }) {
  const router = useRouter()
  const [endSession, { data }] = useMutation(END_SESSION)
  useEffect(() => {
    if (data?.endSession) {
      router.push('/signin')
    }
  }, [data])

  return (
    <TooltipTrigger>
      <ActionButton onPress={() => endSession()}>退出系统</ActionButton>
      <Tooltip>
        <Text>
          Signed in as <strong>{authItemLabel}</strong>
        </Text>
      </Tooltip>
    </TooltipTrigger>
  )
}

//----------------------------------------------------------------------------------------------

// 将菜单数据转换为树形结构
function buildMenuTree(menus: any[]) {
  const menuMap = new Map()
  const menusTree: any[] = []

  menus.forEach(menu => {
    if (menu.isEnabled) menuMap.set(menu.id, { ...menu, children: [] })
  })

  menus.forEach(menu => {
    if (menu.isEnabled) {
      if (menu.parent?.id) {
        const parentMenu = menuMap.get(menu.parent.id)
        if (parentMenu) parentMenu.children.push(menuMap.get(menu.id))
      } else {
        menusTree.push(menuMap.get(menu.id))
      }
    }
  })

  return menusTree
}

function MenuGroup({ menu, open }: { menu: any; open?: boolean }) {
  const [opened, setOpened] = useState(open !== false)
  return (
    <div className="relative">
      {/* 分组 */}
      <Flex gap="small" alignItems="center" padding="8px 8px" onClick={() => setOpened(!opened)}>
        <Icon
          src={opened ? chevronDownIcon : chevronRightIcon}
          size="small"
          color="neutralSecondary"
        />
        <Text color="neutralSecondary" style={{ fontSize: 14 }}>
          <span style={{ cursor: 'pointer' }}>{menu.name}</span>
        </Text>
      </Flex>

      {/* 子菜单 */}
      {menu.children.length > 0 && (
        <div style={{ paddingLeft: 16 }} className={opened ? 'block' : 'hidden'}>
          {menu.children.map((child: any) => (
            <NavItem key={child.id} href={child.path} children={child.name} />
          ))}
        </div>
      )}
    </div>
  )
}
