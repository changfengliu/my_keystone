import type {
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
  CardValueComponent,
} from '@keystone-6/core/types'
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields'
import { CellContainer } from '@keystone-6/core/admin-ui/components'
import { Field as KeystarField } from '@keystar/ui/field'

// 百度地图选择经纬度工具地址。
const baiduMapUrl = 'https://api.map.baidu.com/lbsapi/getpoint/'

//--------------------------------------------------------------------------

export function Field({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) {
  const disabled = onChange === undefined
  const readOnlyAccess = onChange === undefined

  return (
    <KeystarField label={field.label} isReadOnly={readOnlyAccess} description={field.description}>
      {(inputProps: any) => (
        <div className="flex gap-2">
          <div className="flex-1">
            <TextInput
              autoFocus={autoFocus}
              disabled={disabled}
              onChange={e => onChange?.(e.target.value || null)}
              defaultValue={value ?? ''}
            />
          </div>
          <button
            onClick={() => window.open(baiduMapUrl)}
            type="button"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-300 rounded cursor-pointer"
          >
            选取经纬度
          </button>
        </div>
      )}
    </KeystarField>
  )
}

//--------------------------------------------------------------------------

export const Cell: CellComponent = ({ item, field }) => {
  let value = item[field.path] + ''
  return <CellContainer>{value}</CellContainer>
}

//--------------------------------------------------------------------------

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  )
}

//--------------------------------------------------------------------------

export function controller(
  config: FieldControllerConfig<{}>
): FieldController<string | null, string> {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: data => {
      const value = data[config.path]
      return typeof value === 'string' ? value : null
    },
    serialize: value => ({ [config.path]: value }),
  }
}
