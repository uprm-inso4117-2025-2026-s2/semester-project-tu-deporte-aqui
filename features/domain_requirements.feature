Feature: Domain Rules - Sports Information Reliability and Transparency
  As Andres, a sports reporter covering local Puerto Rico leagues
  I want clear rules for how game information is confirmed, corrected, and considered trustworthy
  So that fans, coaches, and other reporters can rely on the published records

  Background:
    Given the following types of information sources exist in the sports ecosystem:
      | source type    | authority level |
      | Official League| high            |
      | News Outlet    | medium          |
      | Social Media   | low             |
    And official sources are considered the ultimate authority when available
    And multiple agreeing unofficial sources can build confidence

  Scenario: Conflicting scores from different sources
    Given a game between "Cangrejeros" and "Vaqueros" is being played
    And a social media post reports the score as "75-70" for Cangrejeros
    And the official league website later reports the score as "76-70" for Cangrejeros
    Then the two reports are considered conflicting
    And the official league report takes precedence
    And the conflicting social media report is recorded as unofficial
    And fans should be made aware that a discrepancy existed

  Scenario: Provisional report becomes confirmed
    Given a game has ended
    And a reporter posts an unverified score of "80-75" on social media
    And no official source has published yet
    Then the score is considered provisional
    When the league officially publishes the score as "82-75"
    Then the provisional score is replaced by the official one
    And the official score becomes the record
    And the earlier provisional report is marked as superseded

  Scenario: Official correction after publication
    Given the league published a final score of "90-88" for a game
    And the score is recorded in standings
    When the league issues a correction changing the score to "89-88"
    Then the standings must be updated to reflect the correction
    And the previous incorrect score is archived with a correction notice
    And the reason "official correction" is noted alongside the change

  Scenario: Multiple unofficial sources agree
    Given no official source has reported on a game
    And three different local news outlets all report the same score "65-60"
    Then the score is considered likely accurate
    And it may be treated as having medium confidence
    But it is still marked as unverified until official confirmation
    And all three sources are cited as the basis

  Scenario: Outdated game information
    Given a game was played three days ago
    And no new reports have appeared since the initial score was posted
    Then that score is considered stale
    And anyone consulting the record should be alerted that it may be outdated
    And a refresh should be attempted by checking official sources again

  Scenario: Source becomes unavailable
    Given a particular news outlet has stopped publishing sports updates
    Then that source is no longer considered active
    And any information that depended solely on that source becomes less reliable
    And other sources must be used to verify past records

  Scenario: Correction without formal announcement
    Given a score was reported as "77-76" in a local newspaper
    And days later the league website shows "78-76" with no correction notice
    Then a conflict exists between the newspaper and the league
    And the league's version is considered authoritative
    And the newspaper's version is noted as a likely error
    But if no official source exists, the conflict remains unresolved

  Scenario: High demand for accurate information during playoffs
    Given it is playoff season
    And many fans are following games closely
    When a score is reported by any source
    Then extra scrutiny is applied: only confirmed official scores are treated as final
    And provisional reports are clearly labeled as such
    And corrections are communicated rapidly to avoid confusion