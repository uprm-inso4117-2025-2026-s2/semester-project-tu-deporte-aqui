Feature: Game score display and status

  Scenario: Display valid score for live game
    Given a live game with home score 80 and away score 75
    When the game is processed
    Then the display should show "80 - 75"
    And the score should be marked complete
    And the game should not be stale
    And the status should be "Live"

  Scenario: Display score unavailable when home score is missing
    Given a live game with missing home score and away score 75
    When the game is processed
    Then the display should show "Score unavailable"
    And the score should not be marked complete

  Scenario: Display score unavailable when away score is missing
    Given a live game with home score 80 and missing away score
    When the game is processed
    Then the display should show "Score unavailable"
    And the score should not be marked complete

  Scenario: Map final status
    Given a game with status "FT"
    When the game is processed
    Then the status should be "Final"

  Scenario: Map live status
    Given a game with status "IN_PROGRESS"
    When the game is processed
    Then the status should be "Live"

  Scenario: Map scheduled status
    Given a game with status "SCHED"
    When the game is processed
    Then the status should be "Scheduled"

  Scenario: Map unknown status
    Given a game with unsupported status "POSTPONED"
    When the game is processed
    Then the status should be "Unknown"

  Scenario: Mark game as stale if timestamp is old
    Given a live game with timestamp older than threshold
    When the game is processed
    Then the game should be marked as stale

  Scenario: Mark game as stale if timestamp is invalid
    Given a live game with invalid timestamp
    When the game is processed
    Then the game should be marked as stale