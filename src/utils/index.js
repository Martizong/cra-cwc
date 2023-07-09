export const getResults = (values) => {
  const totalWeight = Object.values(values).reduce(
    (acc, weight) => acc + weight,
    0
  )
  const { fl, fr, rl, rr } = values
  return {
    front: {
      total: fl + fr,
      perc: Math.round(((fl + fr) / totalWeight) * 100),
    },
    rear: {
      total: rl + rr,
      perc: Math.round(((rl + rr) / totalWeight) * 100),
    },
    left: {
      total: fl + rl,
      perc: Math.round(((fl + rl) / totalWeight) * 100),
    },
    right: {
      total: fr + rr,
      perc: Math.round(((fr + rr) / totalWeight) * 100),
    },
    crossLeft: {
      total: fl + rr,
      perc: Math.round(((fl + rr) / totalWeight) * 100),
    },
    crossRight: {
      total: rl + fr,
      perc: Math.round(((rl + fr) / totalWeight) * 100),
    },
    total: totalWeight,
  }
}
