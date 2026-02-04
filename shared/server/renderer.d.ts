import type { Request } from 'express'
import type { Store } from 'redux'
import { store } from '@store/store'
export declare const initializeServerStore: (req: Request) => Promise<{
  store: Store
  initialState: any
}>
export declare const serializeStateForClient: (state: any) => string
//# sourceMappingURL=renderer.d.ts.map
