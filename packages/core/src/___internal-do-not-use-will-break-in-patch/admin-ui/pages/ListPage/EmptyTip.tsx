import { searchXIcon } from '@keystar/ui/icon/icons/searchXIcon'
import { textSelectIcon } from '@keystar/ui/icon/icons/textSelectIcon'
import { EmptyState } from '../../../../admin-ui/components/EmptyState'

export const $emptyTip = (
  <EmptyState icon={textSelectIcon} title="空列表" message="添加第一条数据后即可显示。" />
)
export const $searchEmptyTip = (
  <EmptyState icon={searchXIcon} title="无结果" message="未找到相关数据。请调整搜索或筛选条件。" />
)
