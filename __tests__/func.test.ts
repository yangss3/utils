import { deepClone, deepMerge } from '../src'

test('deepClone', () => {
  const src1 = [1, { a: 'a', b: [1, 2] }, [1, 2]] as const
  const copy1 = deepClone(src1)
  expect(copy1).toEqual(src1)
  expect(copy1).not.toBe(src1)
  expect(copy1[1]).not.toBe(src1[1])
  expect(copy1[1].b).not.toBe(src1[1].b)
  expect(copy1[2]).not.toBe(src1[2])
  const src2 = {
    a: 1,
    b: [1, 2],
    c: {
      d: 1,
      e: [1, { f: 1, g: [1, 3] }]
    }
  } as const
  const copy2 = deepClone(src2)
  expect(copy2).toEqual(src2)
  expect(copy2).not.toBe(src2)
  expect(copy2.b).not.toBe(src2.b)
  expect(copy2.c).not.toBe(src2.c)
  expect(copy2.c.e).not.toBe(src2.c.e)
  expect(copy2.c.e[1]).not.toBe(src2.c.e[1])
  expect(copy2.c.e[1].g).not.toBe(src2.c.e[1].g)
})

test('deepMerge', () => {
  expect(deepMerge(1, 2)).toEqual(2)
  expect(deepMerge(1, null)).toEqual(null)
  expect(deepMerge(1, [])).toEqual([])
  expect(deepMerge(
    [1, 2, 3],
    ['a', true, { a: 1 }]
  )).toEqual(['a', true, { a: 1 }])
  expect(deepMerge(
    [{ a: 1 }, { b: [{ c: 1, d: 2 }] }],
    [{ b: 2 }, { a: 1, b: [{ c: 2, e: 3 }, { f: 1 }] }]
  )).toEqual([{ a: 1, b: 2 }, { a: 1, b: [{ c: 2, d: 2, e: 3 }, { f: 1 }] }])

  expect(deepMerge(
    {
      a: 1,
      b: [
        { a: 1, b: { c: 2 } },
        { c: [1, 2] },
        { b: [{ a: 1, c: 2 }], c: [1, { d: 1, c: 2 }] }
      ]
    },
    {
      b: [
        { a: true, b: { a: 1, d: 3 }, c: [1] },
        { a: 1, b: { c: 1 }, c: false },
        { b: [{ a: 2, b: 1, c: 3 }], c: [2, { a: 2, d: 3 }] }
      ]
    }
  )).toEqual({
    a: 1,
    b: [
      { a: true, b: { a: 1, d: 3, c: 2 }, c: [1] },
      { a: 1, b: { c: 1 }, c: false },
      { b: [{ a: 2, b: 1, c: 3 }], c: [2, { a: 2, d: 3, c: 2 }] }
    ]
  })
})

