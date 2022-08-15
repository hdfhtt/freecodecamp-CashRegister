function checkCashRegister(price, cash, cid) {
  const UNIT_AMOUNT = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  }

  let totalCid = 0.0
  let change = cash - price
  let changes = []

  for (let i in cid) {
    totalCid += cid[i][1]
  }

  if (change > totalCid) {
    return {status: "INSUFFICIENT_FUNDS", change: changes}
  } else if (change == totalCid) {
    return {status: "CLOSED", change: cid}
  } else {
    cid = cid.reverse()

    for (let i of cid) {
      let temp = [i[0], 0];
      while (change >= UNIT_AMOUNT[i[0]] && i[1] > 0) {
        temp[1] += UNIT_AMOUNT[i[0]]
        i[1] -= UNIT_AMOUNT[i[0]]
        change -= UNIT_AMOUNT[i[0]]
        change = change.toFixed(2)
      }

      if (temp[1] > 0) {
        changes.push(temp)
      }
    }
  }

  if (change > 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }

  return {status: "OPEN", change: changes}
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
