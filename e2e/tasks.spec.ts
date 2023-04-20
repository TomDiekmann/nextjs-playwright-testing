import { test, expect } from "@playwright/test";

test("task creatable", async ({ page }) => {
  await page.goto("http://localhost:3000/protected");

  await page.waitForLoadState("networkidle");

  const taskInput = await page.getByTestId("task-input");
  const addButton = await page.getByTestId("add-button");

  //count the number of tasks with the data-testid="task-card"
  const oldTaskCardsCount = await page.getByTestId("task-card").count();

  await taskInput?.fill("New Task");
  await addButton?.click();

  //wait for the page to load
  await page.reload();

  await page.waitForLoadState("networkidle");

  //count the number of tasks
  const newTaskCardsCount = await page.getByTestId("task-card").count();

  expect(newTaskCardsCount).toBe(oldTaskCardsCount + 1);

  //check if the new task is in the list has the text "New Task" and the author is "e2e@e2e.com"

  const newTaskCard = await page.getByTestId("task-card").last();
  const newTaskCardText = await newTaskCard?.innerText();
  expect(newTaskCardText).toContain("New Task");
  expect(newTaskCardText).toContain("e2e@e2e.com");
});

test("task checkable", async ({ page }) => {
  await page.goto("http://localhost:3000/protected");

  await page.waitForLoadState("networkidle");

  const newTaskCard = await page.getByTestId("task-card").last();

  const newTaskCardCheckbox = await newTaskCard?.getByRole("checkbox").last();
  const currentCheckedState = await newTaskCardCheckbox?.isChecked();

  await newTaskCardCheckbox?.click();

  //refresh the page
  await page.reload();

  //wait for the page to load
  await page.waitForLoadState("networkidle");

  const newTaskCardCheckboxAfterReload = await newTaskCard
    ?.getByRole("checkbox")
    .last();
  const newCheckedState = await newTaskCardCheckboxAfterReload?.isChecked();

  expect(newCheckedState).toBe(!currentCheckedState);

  await newTaskCardCheckboxAfterReload.click();

  //refresh the page
  await page.reload();

  //wait for the page to load
  await page.waitForLoadState("networkidle");

  const newTaskCardCheckboxAfterReload2 = await newTaskCard
    ?.getByRole("checkbox")
    .last();

  const newCheckedState2 = await newTaskCardCheckboxAfterReload2?.isChecked();

  expect(newCheckedState2).toBe(currentCheckedState);
});

test("task deletable", async ({ page }) => {
  await page.goto("http://localhost:3000/protected");

  await page.waitForLoadState("networkidle");

  const currentTaskCardsCount = await page.getByTestId("task-card").count();

  const newTaskCard = await page.getByTestId("task-card").last();

  const newTaskCardDeleteButton = await newTaskCard?.getByTestId("task-delete");

  await newTaskCardDeleteButton?.click();

  await page.reload();

  await page.waitForLoadState("networkidle");
  //wait 2 seconds
  await page.waitForTimeout(2000);

  //count the number of tasks
  const newTaskCardsCount = await page.getByTestId("task-card").count();

  expect(newTaskCardsCount).toBe(currentTaskCardsCount - 1);
});
