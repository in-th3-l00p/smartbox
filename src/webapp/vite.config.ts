import * as reactPlugin from 'vite-plugin-react'
import type {UserConfig} from 'vite'

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  optimizeDeps: {
    include: ["bootstrap/dist/js/bootstrap.min.js"]
  }
}

export default config
