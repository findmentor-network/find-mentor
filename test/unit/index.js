// Jest Setup
import { config } from '@vue/test-utils'

// Mock Nuxt client-side component
config.stubs['client-only'] = { template: '<div><slot /></div>' }
// Mock Nuxt components
config.stubs['nuxt-link'] = true // string stabs like '<a><slot /></a>' are now depreciated
config.stubs['no-ssr'] = true
config.mocks.$t = (i) => i
config.mocks.localePath = (i) => i
