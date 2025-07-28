import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks'
import { css } from '@keystar/ui/style'

export const image = component({
  label: '图片',
  schema: {
    url: fields.url({
      label: '图片 URL',
      defaultValue: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    }),
    altText: fields.text({
      label: 'Alt text',
      defaultValue: '图片',
    }),
  },
  preview: function YouTubeVideo(props) {
    const url = props.fields.url.value

    return (
      <NotEditable>
        <div
          className={css({
            position: 'relative',
          })}
        >
          <img
            src={url}
            alt={props.fields.altText.value}
            style={{ maxWidth: '100%', display: 'block' }}
          />
        </div>
      </NotEditable>
    )
  },
})
