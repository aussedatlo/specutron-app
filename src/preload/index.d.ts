import { ElectronAPI } from '@electron-toolkit/preload'
import { API } from '@renderer/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
