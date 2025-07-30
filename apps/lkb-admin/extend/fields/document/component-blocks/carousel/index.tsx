import { Box } from '@keystar/ui/layout'
import { css } from '@keystar/ui/style'
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks'

export const carousel = component({
  label: '旋转木马',
  preview: function Preview(props) {
    return (
      <NotEditable>
        <div
          className={css({
            overflowY: 'scroll',
            display: 'flex',
            scrollSnapType: 'y mandatory',
          })}
        >
          {props.fields.items.elements.map(item => {
            return (
              <Box
                key={item.key}
                margin="xsmall"
                className={css({
                  minWidth: '61.8%',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always',
                  margin: 4,
                  padding: 8,
                  boxSizing: 'border-box',
                  borderRadius: 6,
                  background: '#eff3f6',
                })}
              >
                <img
                  role="presentation"
                  src={item.fields.imageSrc.value}
                  className={css({
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    height: 240,
                    width: '100%',
                    borderRadius: 4,
                  })}
                />
                <h1
                  className={css({
                    '&&': {
                      fontSize: '1.25rem',
                      lineHeight: 'unset',
                      marginTop: 8,
                    },
                  })}
                >
                  {item.fields.title.value}
                </h1>
              </Box>
            )
          })}
        </div>
      </NotEditable>
    )
  },
  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({ label: '标题' }),
        imageSrc: fields.url({
          label: '图片 URL',
          defaultValue: '/assets/images/placeholder.jpeg',
        }),
      })
    ),
  },
})
