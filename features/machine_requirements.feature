Feature: Machine-Level - Resilience, Logging, and Performance
  As Chris, the platform engineer
  I want the system to handle failures and scale under load
  So that users like Sebastian can access reliable information during peak events

  Background:
    Given the system is configured with three data sources
      | source name | type     | timeout |
      | BSN API     | official | 30s     |
      | Twitter API | social   | 15s     |
      | News Feed   | news     | 20s     |
    And the system has a timeout for each source fetch

  Scenario: Continue operating when a source fails
    Given source "BSN API" returns a 500 Internal Server Error
    When the system processes requests for data
    Then the system should not crash
    And the system should continue serving data from remaining sources
    And the system should set a "partial data" flag for affected entities
    And the system should log the error with source name and timestamp
    And the system should return HTTP 200 to the user with available data

  Scenario: Fall back to cached data during source unavailability
    Given source "Twitter API" has been unavailable for "2 minutes"
    And the last successful fetch from "Twitter API" returned valid data
    When a request requires data from source "Twitter API"
    Then the system should return the last successfully fetched value
    And the response should indicate data came from cache
    And the system should check if the cached data exceeds staleness threshold
    And the system should mark the data appropriately based on staleness

  Scenario: Log conflicts for debugging and analysis
    Given a conflict is detected between source "BSN API" and source "Twitter API"
    And the conflict involves entity "GAME-123"
    And source "BSN API" reports "75-70"
    And source "Twitter API" reports "76-70"
    When the system records the conflict
    Then the system should create a log entry
    And the log entry should contain the entity ID
    And the log entry should contain both reported values
    And the log entry should contain the sources
    And the log entry should contain a timestamp
    And the log entry should contain resolution status "pending"
    And the log entry should be available for later analysis

  Scenario: Prioritize critical endpoints under high traffic
    Given "1000" concurrent users request the same playoff game
    And the request rate exceeds the system's normal capacity
    And the system receives requests for both game data and player bios
    When the system handles the load
    Then the system should prioritize the game data endpoint
    And the system may rate-limit requests to lower priority endpoints
    And response times for the game endpoint should remain within SLA
    And the game endpoint should return successfully for most requests

  Scenario: Resume normal operation after source recovery
    Given source "News Feed" was marked "down" for "10 minutes"
    And source "News Feed" becomes responsive again
    And the system successfully fetches data from it
    When the system updates source health status
    Then the system should mark source "News Feed" health status as "up"
    And the system should resume normal fetching from source "News Feed"
    And the system should re-evaluate any pending conflicts involving source "News Feed"
    And the system should clear any source-down indicators for "News Feed"

  Scenario: Expose reliability metrics for monitoring
    Given the system has been running for "1 hour"
    And sources have received requests during that time
    When an operator requests system metrics
    Then the system should expose metrics for each source
    And the metrics should include success count
    And the metrics should include failure count
    And the metrics should include average response time
    And the metrics should include last successful fetch timestamp
    And the metrics should be available via a monitoring endpoint

  Scenario: Retain correction history for audit purposes
    Given a correction was applied to game "GAME-999"
    And the correction changed the score from "90-88" to "89-88"
    And the reason was "official correction"
    And the source was "BSN API"
    When an auditor requests the history for game "GAME-999"
    Then the system should return a list of changes
    And each change should include a timestamp
    And each change should include the previous value
    And each change should include the new value
    And each change should include the reason
    And each change should include the source
    And the history should be retained according to data retention policy

  Scenario: Handle malformed data from a source
    Given source "Twitter API" returns malformed JSON;
    When the system attempts to parse the response
    Then the system should log a parsing error with source name
    And the system should not crash
    And the system should continue using the last valid data from that source
    And the system should mark affected entities for re-validation
    And the system should alert operations team about the malformed response

  Scenario: Recover from database connection failure
    Given the database connection is lost
    When a user requests game data
    Then the system should return a friendly error message
    And the system should log the database connection failure
    And the system should attempt to reconnect
    And the system should restore full functionality when connection returns