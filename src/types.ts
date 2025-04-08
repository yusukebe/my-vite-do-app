import { Counter } from './counter'

export type Env = {
  Bindings: {
    COUNTERS: DurableObjectNamespace<Counter>
  }
  Variables: { name: string; counters: DurableObjectStub<Counter> }
}
