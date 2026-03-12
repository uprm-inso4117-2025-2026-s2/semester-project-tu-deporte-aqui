Feature: User Interface - Transparency Indicators and Messaging
  As Sebastian, the superfan
  I want clear indicators of data reliability and freshness
  So that I can trust the information I see during live games

  Background:
    Given Sebastian is on the "Game Details" page for a live match
    And the match is between "Cangrejeros" and "Vaqueros"

  Scenario: Show when data was last updated
    Given the game data was last updated "2 minutes ago"
    When the game details page loads
    Then Sebastian should see a "Last updated" timestamp near the score
    And the timestamp should show the time since last update
    And the timestamp should be in a human-readable format

  Scenario: Indicate stale data to the user
    Given the game data is "35 minutes" old
    And the staleness threshold for live games is "30 minutes"
    When Sebastian views the game details page
    Then Sebastian should see a "Stale" badge next to the score
    And Sebastian should see an explanation about possible outdated data
    And the stale indicator should use a muted color scheme

  Scenario: Show conflicting reports from different sources
    Given two sources disagree on the score for this game
    And source "BSN Official" reports "82-75"
    And source "Twitter Feed" reports "81-75"
    When Sebastian views the game details page
    Then Sebastian should see a "Conflicting reports" indicator
    And Sebastian can expand the indicator to see both reported values
    And Sebastian can see source attribution for each conflicting value
    And the system should not present any single score as definitive

  Scenario: Handle missing data gracefully
    Given no source has provided a score for this game
    When Sebastian views the game details page
    Then Sebastian should see a placeholder indicating score is not reported
    And Sebastian should not see an empty or "0-0" value
    And Sebastian should not see any error messages

  Scenario: Label provisional data from unverified sources
    Given the only available data comes from social media
    And the source is unverified
    And the source attribution is "Twitter"
    When Sebastian views the game details page
    Then Sebastian should see a "Provisional" tag next to the score
    And Sebastian should see the source attribution with unverified indicator
    And the provisional tag should use a distinct visual style

  Scenario: Display source attribution in standings
    Given Sebastian navigates to league standings
    And the standings data was last updated "5 minutes ago"
    And the source is "BSN Official"
    When the standings page loads
    Then Sebastian should see a source icon next to each team's record
    And Sebastian can tap the icon to see the source and timestamp
    And the source information should be consistent across all standings entries

  Scenario: Communicate system-wide degraded state
    Given the primary data source for live games is offline
    And cached scores are available from previous updates
    When Sebastian visits the home page
    Then Sebastian should see a banner about delayed live updates
    And Sebastian should still see cached scores from previous updates
    And Sebastian should be able to navigate to other parts of the app
    And the banner should remain visible until the source recovers

  Scenario: Show confidence level for uncertain data
    Given a game has data from multiple non-official sources
    And all non-official sources agree on the score
    And no official source has confirmed
    When Sebastian views the game details
    Then Sebastian should see a confidence indicator about multiple sources agreeing
    And the indicator should use a caution color
    And Sebastian should understand this is not officially confirmed