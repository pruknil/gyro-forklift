const { XX } = require('../CalLoad')




test("calculate", () => {

    const element = XX({pitch:30,roll:30})

    expect(element).toBe(60)
})