async function sleep(cb: VoidFunction): Promise<void> {
  const TWO_SECOND = 2_000
  await new Promise((resolve) => {
    setTimeout(() => {
      cb()
      resolve('continue')
    }, TWO_SECOND)
  })
}

export { sleep }
