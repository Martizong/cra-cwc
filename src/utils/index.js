export const getResults = (values) => {
    const totalWeight = Object.values(values).reduce(
        (acc, weight) => acc + weight,
        0
    )
    const { fl, fr, rl, rr } = values
    return {
        front: {
            total: fl + fr,
            perc: (fl + fr) / totalWeight * 100,
        },
        rear: {
            total: rl + rr,
            perc: ((rl + rr) / totalWeight) * 100,
        },
        left: {
            total: fl + rl,
            perc: ((fl + rl) / totalWeight) * 100,
        },
        right: {
            total: fr + rr,
            perc: ((fr + rr) / totalWeight) * 100,
        },
        crossLeft: {
            total: fl + rr,
            perc: ((fl + rr) / totalWeight) * 100,
        },
        crossRight: {
            total: rl + fr,
            perc: ((rl + fr) / totalWeight) * 100,
        },
        total: totalWeight,
    }
}
