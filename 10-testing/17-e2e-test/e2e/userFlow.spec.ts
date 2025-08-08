import { expect, test } from '@playwright/test'
// import { GenericContainer } from 'testcontainers'

test('A user can sign up and book an event', async ({ page }) => {
  // starts the app in a container
  // const appContainer = await new GenericContainer(
  //   'ghcr.io/lmammino/sample-events-website:main'
  // )
  //   .withExposedPorts(3000)
  //   .start()

  await page.goto('http://localhost:3000')

  await page.getByRole('link', { name: 'Sign In' }).click()

  await page.getByRole('link', { name: 'Sign up' }).click()

  const seed = Date.now().toString()
  const name = `TestUser ${seed}`
  const email = `test${seed}@example.com`
  const password = `someRandomPassword${seed}`

  await page.getByRole('textbox', { name: 'name' }).fill(name)
  await page.getByRole('textbox', { name: 'email' }).fill(email)
  await page.getByRole('textbox', { name: 'password' }).fill(password)

  await page.getByRole('button', { name: 'Create account' }).click()

  await page.getByRole('link', { name: 'Marathon City Run' }).click()

  // get the value of the current available capacity
  const availableCapacity = Number.parseInt(
    (await page.getByTestId('available-capacity').textContent()) as string
  )

  await page.getByRole('button', { name: 'Reserve your spot' }).click()

  // check that the reservation was successful by looking that we have
  // a "Booked" note on the page and that
  // the "reserve" button says "You have booked this event!" and is now disabled
  await expect(page.getByTestId('badge').first()).toHaveText('Booked')
  const bookButton = await page.getByRole('button', {
    name: 'You have booked this event!',
  })
  await expect(bookButton).toBeDisabled()
  await expect(bookButton).toBeVisible()

  // check that the count of spots available went down
  const newAvailableCapacity = Number.parseInt(
    (await page.getByTestId('available-capacity').textContent()) as string
  )
  expect(newAvailableCapacity).toBeLessThan(availableCapacity)

  await page.getByRole('link', { name: 'My Reservations' }).click()

  await expect(
    page.getByRole('heading', { name: 'My Reservations' })
  ).toBeVisible()

  expect(
    await page.getByRole('heading', { name: 'Marathon City Run' })
  ).toBeVisible()
})
