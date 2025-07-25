import { useEffect, useMemo } from 'react'

import { ActionButton } from '@keystar/ui/button'
import { Divider } from '@keystar/ui/layout'
import { TooltipTrigger, Tooltip } from '@keystar/ui/tooltip'
import { Text } from '@keystar/ui/typography'

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
      <NavList>
        <NavItem href="/">所有模型</NavItem>

        <ul className="pl-0">
          {menuTree.map(menu =>
            menu.type === 'group' ? (
              <li key={menu.id} className="relative">
                {/* 分组 */}
                <div className="px-[24px] py-[8px] font-bold text-sm text-gray-400">
                  {menu.name}
                </div>
                {/* 子菜单 */}
                {menu.children.length > 0 && (
                  <ul className="pl-0 overflow-hidden transition-all duration-300">
                    {menu.children.map(child => (
                      <CustomNavItem key={child.id} href={child.path}>
                        {child.name}
                      </CustomNavItem>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              // 顶级菜单
              <CustomNavItem key={menu.id} href={menu.path}>
                {menu.name}
              </CustomNavItem>
            )
          )}
        </ul>

        <Divider />
        {lists.map(list => (
          <NavItem key={list.key} href={getHrefFromList(list)}>
            {list.label}
          </NavItem>
        ))}
      </NavList>
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
// ts-ignore
function buildMenuTree(menus) {
  const menuMap = new Map()
  const menusTree = []

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

function CustomNavItem({ href, children }) {
  return (
    <NavItem href={href}>
      <span className="pl-6">{children}</span>
    </NavItem>
  )
}
