export const wait = (ms: number, done = () => { }) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms)
  }).then(_ => done())
}