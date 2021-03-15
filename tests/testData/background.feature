@tag1 @tag2
Feature: Hello world
  As a smth
  I want to do smth
  So that I am smth

  Background: Tricky bacground with description and without a single step
  Description

  @tag2 @tag(3)
  Scenario Outline: Name of background <key>
    Given this is a given step
    And this is a given step too
    When this is a when step <key>
    And this is a when step too <key2>
    Then it should be a then step
    And it should be a then step too

  @tagE2
    Examples: Second examples
      | key    |
      | value2 |