import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { scoreRound, scoreRoundChoiceOutcome } from "./main.ts";

class Choice {
  public static readonly ThemRock = "A";
  public static readonly ThemPaper = "B";
  public static readonly ThemScissors = "C";

  public static readonly MeRock = "X";
  public static readonly MePaper = "Y";
  public static readonly MeScissors = "Z";

  public static readonly MeLose = "X";
  public static readonly MeDraw = "Y";
  public static readonly MeWin = "Z";
}

Deno.test("they give me rock and I choose paper", () => {
  const them = Choice.ThemRock;
  const me = Choice.MePaper;

  const result = scoreRound(them, me);

  assertEquals(8, result);
});

Deno.test("they give me rock and I choose scissors", () => {
  const them = Choice.ThemRock;
  const me = Choice.MeScissors;

  const result = scoreRound(them, me);

  assertEquals(3, result);
});

Deno.test("they give me rock and I choose rock", () => {
  const them = Choice.ThemRock;
  const me = Choice.MeRock;

  const result = scoreRound(them, me);

  assertEquals(4, result);
});

Deno.test("they give me paper and I choose rock", () => {
  const them = Choice.ThemPaper;
  const me = Choice.MeRock;

  const result = scoreRound(them, me);

  assertEquals(1, result);
});

Deno.test("they give me paper and I choose paper", () => {
  const them = Choice.ThemPaper;
  const me = Choice.MePaper;

  const result = scoreRound(them, me);

  assertEquals(5, result);
});

Deno.test("they give me paper and I choose scissors", () => {
  const them = Choice.ThemPaper;
  const me = Choice.MeScissors;

  const result = scoreRound(them, me);

  assertEquals(9, result);
});

Deno.test("they give rock and I want to win", () => {
  const them = Choice.ThemRock;
  const me = Choice.MeWin;

  const result = scoreRoundChoiceOutcome(them, me);

  assertEquals(8, result);
});

Deno.test("they give paper and I want to draw", () => {
  const them = Choice.ThemPaper;
  const me = Choice.MeDraw;

  const result = scoreRoundChoiceOutcome(them, me);

  assertEquals(5, result);
});


Deno.test("they give scissors and I want to lose", () => {
  const them = Choice.ThemScissors;
  const me = Choice.MeLose;

  const result = scoreRoundChoiceOutcome(them, me);

  assertEquals(2, result);
});