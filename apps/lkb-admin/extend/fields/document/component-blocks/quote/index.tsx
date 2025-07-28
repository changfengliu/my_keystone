import { NotEditable, component, fields } from '@keystone-6/fields-document/component-blocks'

export const quoteBlock = component({
  preview: props => {
    return (
      <div
        style={{
          borderLeft: '3px solid #CBD5E0',
          paddingLeft: 16,
        }}
      >
        <div style={{ fontStyle: 'italic', color: '#4A5568' }}>{props.fields.content.element}</div>
        <div style={{ fontWeight: 'bold', color: '#718096' }}>
          <NotEditable>— </NotEditable>
          {props.fields.attribution.element}
        </div>
      </div>
    )
  },
  label: '内容引用',
  schema: {
    content: fields.child({
      kind: 'block',
      placeholder: 'Quote...',
      formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
      links: 'inherit',
    }),
    attribution: fields.child({ kind: 'inline', placeholder: 'Attribution...' }),
  },
  chromeless: true,
})
