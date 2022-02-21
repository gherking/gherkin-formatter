# language: hu
@tag1 @tag2
Jellemző: Hello world
  As a smth
  I want to do smth
  So that I am smth

  @tag1 @tag2
  Szabály: Name of the rule
    Description of the rule

    Háttér:
      Description

      Adott this is a given step
      És this is a given step too
      Amikor this is a when step
      És this is a when step too
      Akkor it should be a then step
      És it should be a then step too

    @tag2 @tag3
    Forgatókönyv: Name of scenario
      Description of the scenario

      Adott this is a given step
      És this is a given step too
      Amikor this is a when step with data table
        | val1 |
        | val2 |
        | val3 |
      És this is a when step with data table too
        | col1 | col2 |
        | val1 | val2 |
        | val3 | val4 |
      És this is a when step with doc string
        """
        Hello world
        Hello World
        hello World
        hello world
        """
      Akkor it should be a then step
      És it should be a then step too

    Forgatókönyv: Name of scenario
      Description of the scenario

      Adott this is a given step
      És this is a given step too
      Amikor this is a when step with data table
      Akkor it should be a then step

    @tag2 @tag(3)
    Forgatókönyv vázlat: Name of scenario outline
      Adott this is a given step
      És this is a given step too
      Amikor this is a when step <key>
      És this is a when step too <key2>
      Akkor it should be a then step
      És it should be a then step too

      @tagE1
      Példák: First examples
        | key    | key2   |
        | value1 | value2 |
        | value3 | value4 |

      Példák: Second examples
        | key    |
        | value2 |