/**
 * Collection of default prompts for different use cases (ICE POT Format)
 */
export const DEFAULT_PROMPTS = {
 
  /**
   * Selenium Java Page Object Prompt (No Test Class)
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Java Page Object Class (no test code).
    - Add JavaDoc for methods & class.
    - Use Selenium 2.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`java
    package com.testleaf.pages;

    /**
     * Page Object for Component Page
     */
    public class ComponentPage {
        // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber Feature File Only Prompt
   */
  CUCUMBER_ONLY: `
    Instructions:
    - Generate ONLY a Cucumber (.feature) file.
    - Use Scenario Outline with Examples table.
    - Make sure every step is relevant to the provided DOM.
    - Do not combine multiple actions into one step.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Generate multiple scenarios if applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    Persona:
    - Audience: BDD testers who only need feature files.

    Output Format:
    - Only valid Gherkin in a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, executable.
  `,

  /**
   * Cucumber with Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`java
    package com.leaftaps.stepdefs;

    import io.cucumber.java.en.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.*;

    public class LoginStepDefinitions {
        private WebDriver driver;
        private WebDriverWait wait;

        @io.cucumber.java.Before
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
        }

        @io.cucumber.java.After
        public void tearDown() {
            if (driver != null) driver.quit();
        }

        @Given("I open the login page")
        public void openLoginPage() {
            driver.get("\${pageUrl}");
        }

        @When("I type {string} into the Username field")
        public void enterUsername(String username) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));
            el.sendKeys(username);
        }

        @When("I type {string} into the Password field")
        public void enterPassword(String password) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
            el.sendKeys(password);
        }

        @When("I click the Login button")
        public void clickLogin() {
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        }

        @Then("I should be logged in successfully")
        public void verifyLogin() {
            WebElement success = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("success")));
            assert success.isDisplayed();
        }
    }
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Java code in \`\`\`java\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,

  /**
   * Playwright Python Page Object Prompt (No Test Class)
   */
  PLAYWRIGHT_PYTHON_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Playwright Python Page Object Class (no test code).
    - Use async/await pattern with Playwright 1.40+ syntax.
    - Add docstrings for methods & class using triple quotes.
    - Use meaningful method names following snake_case convention.
    - Include type hints for better IDE support.
    - Use Page.expect_* patterns for waiting and assertions.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`python
    from playwright.sync_api import Page, expect

    class LoginPage:
        \\\"\\\"\\\"\n        Page Object for Login Portal.\n        \\\"\\\"\\\"\n        def __init__(self, page: Page):
            self.page = page
            self.username_field = page.locator("input#username")
            self.password_field = page.locator("input[type='password']")
            self.login_btn = page.locator("button:has-text('Login')")

        def navigate(self, url: str) -> None:
            \\\"\\\"\\\"Navigate to login page.\\\"\\\"\\\"
            self.page.goto(url)

        def enter_username(self, username: str) -> None:
            \\\"\\\"\\\"Enter username in the username field.\\\"\\\"\\\"
            self.username_field.fill(username)

        def enter_password(self, password: str) -> None:
            \\\"\\\"\\\"Enter password in the password field.\\\"\\\"\\\"
            self.password_field.fill(password)

        def click_login(self) -> None:
            \\\"\\\"\\\"Click the login button.\\\"\\\"\\\"
            self.login_btn.click()

        def is_login_successful(self) -> bool:
            \\\"\\\"\\\"Verify if login was successful.\\\"\\\"\\\"
            success_message = self.page.locator(".success-message")
            return success_message.is_visible()
    \`\`\`

    Persona:
    - Audience: Python automation engineers focused on maintainable page object patterns.

    Output Format:
    - A single Python class inside a \`\`\`python\`\`\` block.

    Tone:
    - Clean, maintainable, Pythonic, enterprise-ready.
  `,

  /**
   * Pytest with Playwright Test Prompt
   */
  PYTEST_PLAYWRIGHT_ONLY: `
    Instructions:
    - Generate ONLY pytest test cases using Playwright.
    - Use pytest fixtures for browser, page, and URL setup.
    - Use @pytest.mark.parametrize decorator for data-driven tests.
    - Include realistic South India test data (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Use Playwright sync API (not async).
    - Generate multiple test scenarios if applicable.
    - Do NOT include page objects.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`python
    import pytest
    from playwright.sync_api import sync_playwright, Page, expect, Browser

    @pytest.fixture(scope="session")
    def browser():
        with sync_playwright() as p:
            yield p.chromium.launch(headless=False)

    @pytest.fixture
    def page(browser: Browser):
        page = browser.new_page()
        yield page
        page.close()

    @pytest.mark.parametrize("username,password", [
        ("admin@testleaf.com", "admin@123"),
        ("user@testleaf.com", "pass@123"),
    ])
    def test_login_with_valid_credentials(page: Page, username: str, password: str):
        \\\"\\\"\\\"Test successful login with valid credentials.\\\"\\\"\\\"
        page.goto("\${pageUrl}")
        page.locator("input#username").fill(username)
        page.locator("input[type='password']").fill(password)
        page.locator("button:has-text('Login')").click()
        
        success_msg = page.locator(".success-message")
        expect(success_msg).to_be_visible()
        assert success_msg.text_content() == "Login successful"

    def test_login_with_invalid_credentials(page: Page):
        \\\"\\\"\\\"Test login fails with invalid credentials.\\\"\\\"\\\"
        page.goto("\${pageUrl}")
        page.locator("input#username").fill("invalid@test.com")
        page.locator("input[type='password']").fill("wrong")
        page.locator("button:has-text('Login')").click()
        
        error_msg = page.locator(".error-message")
        expect(error_msg).to_be_visible()
    \`\`\`

    Persona:
    - Audience: Python QA engineers using pytest and Playwright.

    Output Format:
    - Only valid Python code in a \`\`\`python\`\`\` block.

    Tone:
    - Clear, Pythonic, executable, structured.
  `,

  /**
   * Pytest-BDD with Playwright Step Definitions
   */
  PYTEST_WITH_PLAYWRIGHT_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A pytest-bdd feature file (Gherkin syntax).
      2. A Python step definitions conftest.py with Playwright implementation.
    - Use Scenario Outline with Examples table.
    - Include pytest fixtures for browser, page, and context management.
    - Use Playwright sync API with proper waits and assertions.
    - Use South India realistic test data (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Do NOT include Page Object code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to TestLeaf Portal

      Scenario Outline: Successful login with valid credentials
        Given I open the login page
        When I enter "<username>" as username
        And I enter "<password>" as password
        And I click the login button
        Then I should see the dashboard

      Examples:
        | username             | password    |
        | admin@testleaf.com   | admin@123   |
        | user@testleaf.com    | pass@123    |

      Scenario: Login fails with invalid credentials
        Given I open the login page
        When I enter "invalid@test.com" as username
        And I enter "wrongpass" as password
        And I click the login button
        Then I should see an error message
    \`\`\`

    \`\`\`python
    import pytest
    from pytest_bdd import given, when, then, scenarios, parsers
    from playwright.sync_api import sync_playwright, Page, expect, Browser

    # Load feature file
    scenarios("../features/login.feature")

    @pytest.fixture(scope="session")
    def browser():
        with sync_playwright() as p:
            yield p.chromium.launch(headless=False)

    @pytest.fixture
    def page(browser: Browser):
        page = browser.new_page()
        yield page
        page.close()

    @given("I open the login page")
    def open_login_page(page: Page):
        page.goto("\${pageUrl}")
        expect(page).to_have_url("\${pageUrl}")

    @when(parsers.parse('I enter "{username}" as username'))
    def enter_username(page: Page, username: str):
        page.locator("input#username").fill(username)

    @when(parsers.parse('I enter "{password}" as password'))
    def enter_password(page: Page, password: str):
        page.locator("input[type='password']").fill(password)

    @when("I click the login button")
    def click_login(page: Page):
        page.locator("button:has-text('Login')").click()

    @then("I should see the dashboard")
    def verify_dashboard(page: Page):
        dashboard = page.locator(".dashboard-header")
        expect(dashboard).to_be_visible()

    @then("I should see an error message")
    def verify_error(page: Page):
        error = page.locator(".error-message")
        expect(error).to_be_visible()
    \`\`\`

    Persona:
    - Audience: Python BDD engineers using pytest-bdd and Playwright.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Python code in \`\`\`python\`\`\` block.

    Tone:
    - Professional, executable, Pythonic, structured.
  `
};

/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, '\\`\\`\\`');
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  // Java + Selenium
  SELENIUM_JAVA_PAGE_ONLY: 'Selenium-Java-Page-Only',
  CUCUMBER_ONLY: 'Cucumber-Only',
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: 'Cucumber-With-Selenium-Java-Steps',
  // Python + Playwright
  PLAYWRIGHT_PYTHON_PAGE_ONLY: 'Playwright-Python-Page-Only',
  PYTEST_PLAYWRIGHT_ONLY: 'Pytest-Playwright-Only',
  PYTEST_WITH_PLAYWRIGHT_STEPS: 'Pytest-With-Playwright-Steps',
};
