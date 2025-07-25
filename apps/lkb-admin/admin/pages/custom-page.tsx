import { useState } from 'react'
import { Heading } from '@keystar/ui/typography'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Button } from '@keystar/ui/button'
import { Flex } from '@keystar/ui/layout'
import { TextField } from '@keystar/ui/text-field'
import { Picker, Item } from '@keystar/ui/picker'
import { KeystarProvider } from '@keystar/ui/core'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export default function CustomPage() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [response, setResponse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      setResponse(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageContainer header={<Heading type="h3">API Request Tester</Heading>}>
      <KeystarProvider colorScheme="dark">
        <form onSubmit={handleSubmit} style={{ padding: '20px 0' }}>
          <Flex direction="column" gap="large">
            <TextField
              label="API URL"
              value={url}
              onChange={setUrl}
              placeholder="https://api.example.com/endpoint"
              isRequired
              width="100%"
            />

            <Picker
              label="HTTP Method"
              selectedKey={method}
              onSelectionChange={key => setMethod(key as HttpMethod)}
            >
              <Item key="get">Get</Item>
              <Item key="post">Post</Item>
              <Item key="put">Put</Item>
              <Item key="delete">Delete</Item>
              <Item key="patch">Patch</Item>
            </Picker>

            <Button type="submit" isDisabled={!url || isLoading}>
              {isLoading ? 'Sending Request...' : 'Send Request'}
            </Button>
          </Flex>
        </form>

        {error && (
          <div style={{ marginTop: '2rem' }}>
            <div>Error</div>
            <pre
              style={{
                padding: '1rem',
                background: 'var(--ksv-bg-critical-subdued)',
                color: 'var(--ksv-text-critical)',
                borderRadius: '6px',
                overflow: 'auto',
                maxHeight: '300px',
              }}
            >
              {error}
            </pre>
          </div>
        )}

        {response && (
          <div style={{ marginTop: '2rem' }}>
            <div>Response</div>
            <pre
              style={{
                padding: '1rem',
                background: 'var(--ksv-bg-subtle)',
                borderRadius: '6px',
                overflow: 'auto',
                maxHeight: '500px',
              }}
            >
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </KeystarProvider>
    </PageContainer>
  )
}
