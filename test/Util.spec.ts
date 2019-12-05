import { sayHello } from '@/utils/hello'

describe('util', () => {
  it('sayHello', () => {
    const actual  = sayHello('John')
    expect(actual).toBe('Hello John')
  })
})