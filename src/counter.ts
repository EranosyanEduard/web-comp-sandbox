export function setupCounter(element: HTMLButtonElement): void {
  const COUNTER_STEP = 1
  const INITIAL_COUNTER_VALUE = 0
  let counter = INITIAL_COUNTER_VALUE
  const setCounter = (count: number): void => {
    counter = count
    element.innerHTML = /* html */ `count is ${counter}`
  }
  element.addEventListener('click', () => {
    setCounter(counter + COUNTER_STEP)
  })
  setCounter(INITIAL_COUNTER_VALUE)
}
