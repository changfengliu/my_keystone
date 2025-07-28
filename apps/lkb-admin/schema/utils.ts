import path from 'node:path'
import fs from 'node:fs/promises'

export function createLocalStorage(dir: string) {
  return {
    async put(key: string, stream: any) {
      const filePath = `public/upload/images/${dir}/${key}`
      const dirPath = path.dirname(filePath)
      await fs.mkdir(dirPath, { recursive: true })
      await fs.writeFile(filePath, stream)
    },
    async delete(key: string) {
      const filePath = `public/upload/images/${dir}/${key}`
      try {
        await fs.unlink(filePath)
      } catch (error: any) {
        if (error.code !== 'ENOENT') throw error
      }
    },
    url(key: string) {
      return `/upload/images/${dir}/${key}`
    },
  }
}
