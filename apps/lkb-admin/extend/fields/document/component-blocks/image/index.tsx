import { css } from '@keystar/ui/style'
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks'

export const Image = component({
  label: '图片',
  schema: {
    imageSrc: fields.text({
      label: '图片 URL',
      defaultValue: '/assets/images/placeholder.jpeg',
    }),
    caption: fields.conditional(fields.checkbox({ label: '显示图片说明' }), {
      false: fields.empty(),
      true: fields.child({
        kind: 'block',
        placeholder: '写一个图片说明...',
        formatting: 'inherit',
        links: 'inherit',
      }),
    }),
  },
  preview: function Image(props) {
    return (
      <div>
        <NotEditable>
          <img
            src={props.fields.imageSrc.value}
            className={css({
              width: '100%',
              minHeight: 100,
            })}
          />
        </NotEditable>
        {props.fields.caption.discriminant ? (
          <div className={css({ textAlign: 'center' })}>{props.fields.caption.value.element}</div>
        ) : null}
      </div>
    )
  },
})
