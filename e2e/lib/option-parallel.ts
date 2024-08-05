import { Page, TestType } from '@playwright/test';

const OptionEnum  = {
    ibetBond:  "ibetBond",
    ibetShare:  "ibetShare"
} as const

const DomainEnum = {
    ibetBond :  "ibetBond",
    ibetShare : "ibetShare"
} as const

const RoleEnum = {
    admin: "admin",
    user: "user",
    applicant: "applicant",
    approver: "approver"
} as const

type TestCondition = {
  option: keyof typeof OptionEnum
  domain: keyof typeof DomainEnum
  role: keyof typeof RoleEnum
};



type CustomFixtures = {
  page: Page;
  condition: TestCondition;
  paralell?: boolean;
};

type CustomTest = TestType<CustomFixtures, CustomFixtures>

import { test as base } from '@playwright/test';

const createCustomTest = (conditions: TestCondition[]): CustomTest => {
  const customTest = (condition: TestCondition) => {
    return  base.extend<CustomFixtures>({
        condition,
      });
  }

  const wrappedTest = (name: string, testFunction: (args: CustomFixtures) => Promise<void>, paralell?: boolean) => {
    for (const condition of conditions) {
      customTest(condition)(`${name} (${JSON.stringify(condition)})`, async ({ page }) => {
        await testFunction({ page, condition });
      });
    }
  };
  Object.assign(wrappedTest, base)

  return wrappedTest as CustomTest;
};

const testConditions: TestCondition[] = (() => {
    const condition: TestCondition[] = []
    for (const option of Object.keys(OptionEnum)) {
        for(const domain of Object.keys(DomainEnum)) {
            for(const role of Object.keys(RoleEnum)) {
                condition.push({
                    option: option as keyof typeof OptionEnum,
                    domain: domain as keyof typeof DomainEnum,
                    role: role as keyof typeof RoleEnum
                })
            }
        }
    }
    return condition
})()

export default createCustomTest(testConditions)