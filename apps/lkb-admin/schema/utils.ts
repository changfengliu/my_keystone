import fs from 'node:fs/promises'

export function createLocalStorage(dir: string) {
  return {
    async put(key: string, stream: any) {
      await fs.writeFile(`public/upload/images/${dir}/${key}`, stream)
    },
    async delete(key: string) {
      await fs.unlink(`public/upload/images/${dir}/${key}`)
    },
    url(key: string) {
      return `/upload/images/${dir}/${key}`
    },
  }
}
