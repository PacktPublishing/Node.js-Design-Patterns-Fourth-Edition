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

  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Sign In' })
    .click()

  await page.getByRole('link', { name: 'Sign up' }).click()

  const seed = Date.now().toString()
  const name = `TestUser ${seed}`
  const email = `test${seed}@example.com`
  const password = `someRandomPassword${seed}`

  await page.locator('[name="name"]').fill(name)
  await page.locator('[name="email"]').fill(email)
  await page.locator('[name="password"]').fill(password)

  await page.getByRole('button', { name: 'Create account' }).click()

  await page.getByRole('heading', { name: 'Italian Cooking Workshop' }).click()

  // get the value of the current available capacity
  const availableCapacity = Number.parseInt(
    (await page.getByTestId('available-capacity').textContent()) as string
  )

  await page.getByRole('button', { name: 'Reserve your spot' }).click()

  await page.waitForResponse(
    response =>
      response.url().includes('/events/') &&
      response.request().method() === 'POST' &&
      response.status() === 200
  )

  // check that the reservation was successful by looking that we have
  // a "Booked" note on the page and that
  // the "reserve" button is now disabled
  await expect(page.getByTestId('badge').first()).toHaveText('Booked')

  expect(
    await page.getByRole('button', { name: 'You have booked this event!' })
  ).toBeDisabled()

  // check that the count of spots available went down
  const newAvailableCapacity = Number.parseInt(
    (await page.getByTestId('available-capacity').textContent()) as string
  )
  expect(newAvailableCapacity).toBeLessThan(availableCapacity)

  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'My Reservations' })
    .click()

  await page.waitForSelector('h1:has-text("My Reservations")', {
    state: 'visible',
  })

  expect(
    await page
      .getByRole('heading', { name: 'Italian Cooking Workshop' })
      .isVisible()
  ).toBeTruthy()
})
