const { test } = require('node:test')
const assert = require('node:assert')
const reverse = require('../utils/for_testing').reverse
const greater = require('../utils/for_testing').greater


test('reverse of a', () => {
    const result = reverse('a')

    assert.strictEqual(result, "a")
})

test('reverse of react', () => {
    const result = reverse('react')

    assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')

    assert.strictEqual(result, 'saippuakauppias')
})

test('greater between 2 numbers', () => {
    const result = greater(23, 56)

    assert.strictEqual(result, 56)
})