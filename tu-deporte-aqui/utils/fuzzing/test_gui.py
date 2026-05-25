from fuzzingbook.GUIFuzzer import (
    NoSuchElementException, WebDriverWait, html, Tuple, FrozenSet, Set, Any, StaleElementReferenceException, By,
    start_webdriver, GUIRunner, GUICoverageFuzzer, GUIGrammarMiner
)
from selenium.common.exceptions import StaleElementReferenceException as SeleniumStaleException
from json import dumps
import time

BROWSER = "firefox"
HEADLESS = True
ACTIONS = 5
TRIALS = 100
URLS = [
    "https://localhost:3000/teams",
    "https://localhost:3000/home",
    "https://localhost:3000/login",
    "https://localhost:3000/risk-dashboard",
    "https://localhost:3000/notifications"
]
# URL      = "https://www.saucedemo.com/"
# URL      = "https://www.fuzzingbook.org/"
# URL      = "https://localhost:3000/404"

def generate_element_xpath(elem) -> str:
    """Generate a stable XPath for an element using its attributes"""
    elem_name = elem.tag_name
    
    # For links - prefer href, but use relative form if it's a fragment
    if elem_name == 'a':
        href = elem.get_attribute('href')
        if href:
            # If href is a fragment (starts with #), use it directly
            if href.startswith('#'):
                return f"//a[@href='{href}']"
        
        # Fallback to text matching with normalize-space for exact match
        text = elem.text
        if text and text.strip():
            # Remove newlines while preserving other spacing
            text_no_newlines = text.replace('\n', '').replace('\r', '')
            if "'" in text_no_newlines:
                return f'//a[normalize-space()="{text_no_newlines}"]'
            else:
                return f"//a[normalize-space()='{text_no_newlines}']"
    
    # For input elements - prefer name or id
    if elem_name == 'input':
        name = elem.get_attribute('name')
        if name:
            return f"//input[@name='{name}']"
        elem_id = elem.get_attribute('id')
        if elem_id:
            return f"//input[@id='{elem_id}']"
        placeholder = elem.get_attribute('placeholder')
        if placeholder:
            return f"//input[@placeholder='{placeholder}']"
    
    # For button elements - prefer id or name
    if elem_name == 'button':
        elem_id = elem.get_attribute('id')
        if elem_id:
            return f"//button[@id='{elem_id}']"
        name = elem.get_attribute('name')
        if name:
            return f"//button[@name='{name}']"
        text = elem.text
        if text and text.strip():
            # Remove newlines while preserving other spacing
            text_no_newlines = text.replace('\n', '').replace('\r', '')
            if "'" in text_no_newlines:
                return f'//button[normalize-space()="{text_no_newlines}"]'
            else:
                return f"//button[normalize-space()='{text_no_newlines}']"
    
    # Fallback
    return f"//{elem_name}[1]"

# GUIGrammarMiner: Generate XPath for all elements
class GUIGrammarMinerFixed(GUIGrammarMiner):
    def mine_input_element_actions(self) -> Set[str]:
        """Mine input elements and return fill actions with XPath"""
        actions = set()
        for elem in self.driver.find_elements(By.TAG_NAME, "input"):
            try:
                xpath = generate_element_xpath(elem)
                input_type = elem.get_attribute("type") or "text"
                if input_type in {"text", "email", "password", "number"}:
                    # Use repr to properly escape the xpath for Python string
                    actions.add(f"fill({repr(xpath)}, 'value')")
            except StaleElementReferenceException:
                pass
        return actions
    
    def mine_button_element_actions(self) -> Set[str]:
        """Mine button elements and return submit actions with XPath"""
        actions = set()
        for elem in self.driver.find_elements(By.TAG_NAME, "button"):
            try:
                xpath = generate_element_xpath(elem)
                # Use repr to properly escape the xpath for Python string
                actions.add(f"submit({repr(xpath)})")
            except StaleElementReferenceException:
                pass
        return actions
    
    def mine_a_element_actions(self) -> Set[str]:
        """Determine all link actions on the current Web page"""
        actions = set()
        for elem in self.driver.find_elements(By.TAG_NAME, "a"):
            try:
                a_href = elem.get_attribute("href")
                if a_href is not None:
                    xpath = generate_element_xpath(elem)
                    # Use repr to properly escape the xpath for Python string
                    if self.follow_link(a_href):
                        actions.add(f"click({repr(xpath)})")
                    else:
                        actions.add(f"ignore({repr(xpath)})")
            except StaleElementReferenceException:
                pass
        return actions

class GUIRunnerCustom(GUIRunner):
    def run(self, inp: str) -> Tuple[dict, str]:
        """Execute the action string `inp` on the current Web site.
        Return a pair (`inp`, `outcome`)."""
        
        # Fix strings in inp
        # inp = inp.replace("'", "'''", 1)[::-1].replace("'", "'''", 1)[::-1]

        def fill(name, value):
            self.do_fill(html.unescape(name), html.unescape(value))

        def check(name, state):
            self.do_check(html.unescape(name), state)

        def submit(name):
            self.do_submit(html.unescape(name))

        def click(name):
            self.do_click(html.unescape(name))

        exec(inp, {'__builtins__': {}},
                  {
                      'fill': fill,
                      'check': check,
                      'submit': submit,
                      'click': click,
                  })
        
        # Do some testing here
        url = self.driver.current_url
        title = self.driver.title
        outcome = self.PASS
        if "404" in title:
            outcome = self.FAIL

        return {"input": inp, "url": url, "title": title}, outcome
    
    def find_element(self, xpath: str) -> Any:
        """Find an element using the provided XPath. Raises error if not found."""
        return self.driver.find_element(By.XPATH, xpath)

    def do_fill(self, xpath: str, value: str) -> None:
        """Fill an input element with value using JavaScript for reliability."""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                elem = self.find_element(xpath)
                self.driver.execute_script("arguments[0].scrollIntoView(true);", elem)
                time.sleep(0.1)
                # Set value using JavaScript and trigger input event
                self.driver.execute_script(
                    "arguments[0].value = arguments[1]; arguments[0].dispatchEvent(new Event('input', { bubbles: true }));",
                    elem, value
                )
                return
            except (SeleniumStaleException, StaleElementReferenceException) as e:
                if attempt == max_retries - 1:
                    raise
                time.sleep(0.2)
            except Exception as e:
                if attempt == max_retries - 1:
                    raise
                time.sleep(0.2)

    def do_submit(self, xpath: str) -> None:
        """Submit a form element, with retries and JS click fallback."""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                elem = self.find_element(xpath)
                self.driver.execute_script("arguments[0].scrollIntoView(true);", elem)
                time.sleep(0.1)
                try:
                    elem.click()
                except Exception:
                    # If normal click fails, use JavaScript click as fallback
                    self.driver.execute_script("arguments[0].click();", elem)
                return
            except (SeleniumStaleException, StaleElementReferenceException) as e:
                if attempt == max_retries - 1:
                    raise
                time.sleep(0.2)
            except Exception as e:
                if attempt == max_retries - 1:
                    raise
                time.sleep(0.2)

    def do_click(self, xpath: str) -> None:
        """Click on an element using XPath, with retries and JS fallback."""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                elem = self.find_element(xpath)
                self.driver.execute_script("arguments[0].scrollIntoView(true);", elem)
                try:
                    elem.click()
                except Exception:
                    # If normal click fails, use JavaScript click as fallback
                    self.driver.execute_script("arguments[0].click();", elem)
                return
            except (SeleniumStaleException, StaleElementReferenceException) as e:
                if attempt == max_retries - 1:
                    raise
                # Retry if stale element exception
                time.sleep(0.2)
            
class GUICoverageFuzzerCustom(GUICoverageFuzzer):
    def run(self, runner: GUIRunnerCustom) -> Tuple[dict, str]:  # type: ignore
        """Run the fuzzer on the given GUIRunner `runner`."""
        assert isinstance(runner, GUIRunnerCustom)

        self.restart()
        if self.initial_url != self.driver.current_url:
            self.restart()  # just needs a lil kick
            time.sleep(1)
        assert self.initial_url == self.driver.current_url, "Fuzzer should not change the URL on restart"
        action = self.fuzz()
        self.state_symbol = self.fsm_last_state_symbol(self.derivation_tree)

        if self.log_gui_exploration:
            print("Action", action.strip(), "->", self.state_symbol)

        assert self.initial_url == self.driver.current_url, "Fuzzer should not change the URL on restart"
        result, outcome = runner.run(action)

        if self.state_symbol != self.miner.FINAL_STATE:
            self.update_state()

        return result, outcome

JUST_TEST = False
for url in URLS:
    print(f"==== Testing {url} ====")
    gui_driver = start_webdriver(BROWSER, headless=HEADLESS)
    gui_driver.get(url)

    runner = GUIRunnerCustom(gui_driver)
    fuzzer = GUICoverageFuzzerCustom(gui_driver, miner=GUIGrammarMinerFixed(gui_driver), log_gui_exploration=True)
    
    if "home" in url:
        pass  # for breakpoint
        test_input_xpath = "//input[@placeholder='Search...']"
        runner.do_fill(test_input_xpath, "test search")
        # Test the Baseball button that was causing ElementClickInterceptedException
        test_button_xpath = "//button[normalize-space()='Baseball']"
        runner.do_submit(test_button_xpath)
    elif "teams" in url:
        pass  # for breakpoint
        runner.run("click(\"//a[normalize-space()='Indios de MayagüezGames: 211']\")")
        runner.driver.get(url)  # Go back to reset state
        runner.run('click("//a[normalize-space()=\'Osos de ManatíGames: 541\']")\n')

    if not JUST_TEST:
        # Fuzzer restart in each run
        # result = print(fuzzer.run(runner))
        fuzzer.explore_all(runner)
        result = fuzzer.runs(runner, trials=TRIALS)
        # Write results to file
        this_file_dir = __file__.rsplit("/", 1)[0]
        file_to_write = f"fuzz_test_{url.replace('://', '').replace('/', '_')}.json"
        with open(f"{this_file_dir}/{file_to_write}", "w") as f:
            f.write(dumps(result, indent=4))

print("==== DONE ====")

gui_driver.quit()