import Image from "next/image";
import React from "react";
import styles from "styles/css/rules.module.css";

const Rules = () => {
  return (
    <>
      <h1 className={styles.title}>Race Mechanics</h1>

      <div className={styles.container} style={{ marginTop: "0" }}>
        <div className={styles.rules_container_one}>
          <div>
            <div className={styles.card_text}>
              To participate in these games you need to hold at least one
              Forgotten Runes Pony or one BlackSand Mount. You can participate
              in any given race with only 1 mount or 1 pony.
              <br />
              <br />
              Races are weekly events in which the first player to reach a
              target amount of points wins! There are several ways to score Race
              Points, see below for details. If no one reaches the target amount
              of points by race end, the player with the most points wins!
              <br />
              <br />
              <b>
                BlackSand Racing is meant to be playable either passively or
                actively
              </b>
              , depending on the level of engagement players prefer.
              <br />
              <br />
              Passively, any player can participate just by registering their
              Pony and hope for the best…
              <br />
              <br />
              Actively, holders can:
              <ul className={styles.bullet}>
                <li>
                  Try to maximize their Race Points every week to win races and
                  earn Black Florins
                </li>
                <li>
                  Participate in months-long Championships, score Championship
                  Points and try to become Racing Champions (next championship
                  coming soon)
                </li>
                <li>
                  Strategize on how to best nurture and Level Up their Pony with
                  Experience Points
                </li>
              </ul>
              <br />
              <br />
              BlackSand Racing is entirely played in Discord via the BlackSand
              Bot. The bot allows for several commands listed in the graphic
              below. Read more below on how to score points by using the
              different BlackSand Bot commands.
            </div>
          </div>
        </div>

        <h6 className={styles.title_container}>Race Points</h6>
        <div className={styles.rules_container_one}>
          <div className={styles.card}>
            <div className={styles.card_text}>
              There are 5 ways to score points for your Pony or Mount during a
              race. The first pony to reach the target score for a given race
              wins the race!
              <ul className={styles.bullet}>
                <li>
                  <b>Treat Points</b>
                </li>
                <li>
                  <b>Event Points</b>
                </li>
                <li>
                  <b>Ability Points</b>
                </li>
                <li>
                  <b>Training Points</b>
                </li>
                <li>
                  <b>Loot & Morale Points</b>
                </li>
              </ul>
            </div>

            <br />

            <div className={styles.card_text}>
              <b>Treat Points</b>
              <ul className={styles.bullet}>
                <li>
                  During any race you can select Treats from the Forgotten Runes
                  Athenaeum collection that you hold in the same wallet as your
                  Mount or Pony to roll special Treat commands/rolls.
                </li>
                <li>
                  Different Treats allow for different rolls. Refer to the
                  graphic below for a breakdown of the Treats that currently
                  grant you rolls. This list can change.
                </li>
                <li>
                  To select the Treats you want to use in a race, head to Your
                  Paddock page and select the Treats from those you own.
                </li>
                <li>
                  You can feed your Mount or Pony with max 3 Treats you own per
                  race.
                </li>
                <li>
                  If you ROLL 3 or more times from Treats, your pony might get
                  Indigestion. After your 3rd Treat Roll, the BlackSand Bot will
                  automatically test whether your mount gets an indigestion. The
                  Bot will automatically roll an additional 1x D4. On a roll of
                  1 or 2, your pony gets an Indigestion On a roll of 3 and 4,
                  your Pony is safe and will not suffer any consequences
                </li>
                <li>
                  If you get Indigestion, you will:
                  <ul>
                    <li style={{ marginLeft: "40px" }}>
                      Lose 5 points in your current race.
                    </li>
                    <li style={{ marginLeft: "40px" }}>
                      Your next race you will not be able to use your Treats.
                      Instead you will be able to use the command !pills, which
                      will roll 2x D4 for you instead of your Treats.
                    </li>
                  </ul>
                </li>
              </ul>
              <br />
              <i>
                Note: Indigestion can happen when you ROLL 3 or more times, not
                when you feed 3 treats (e.g.; if you feed 1 Eggplant = 1x D4 and
                1 Carrot = 2x D6, you only use 2 Treats, but you Roll 3 Treat
                Rolls. Thus, check for Indigestion
              </i>
            </div>
            <div style={{ position: "relative", aspectRatio: "1/1" }}>
              <Image src="/img/rules-treats.png" fill alt="Special Treats" />
            </div>

            <br />

            <div className={styles.card_text}>
              <b>Event Points</b>
              <ul className={styles.bullet}>
                <li>
                  Each race will host a special event, which will grant you
                  DAILY rolls (1x per day) to help your mount win!
                </li>
                <li>
                  To roll for your daily special event roll, you just need to
                  command !event to the BlackSand Bot.
                </li>
                <li>
                  The specifics and details of each “Special Event” will be
                  revealed during the respecting race
                </li>
                <li>
                  Rolls that you roll for Special Events do NOT count towards
                  Indigestion.
                </li>
              </ul>
              <br />
              To use an ability, you will just need to use the respective
              command. You can use an individual ability one or more times per
              race depending on the ability itself.
            </div>

            <br />

            <div className={styles.card_text}>
              <b>Ability Points</b>
              <br />
              Each mount comes with its unique abilities, depending on their
              type.
              <ul className={styles.bullet}>
                <li>
                  All Forgotten Runes Ponies start with no ability, but they can
                  learn up to 3 of them as they level up.
                </li>
                <li>
                  All Mecha Ponies come with 2 native abilities they can use
                  from their first race, but they are limited to only learning 1
                  additional skill.
                </li>
                <li>
                  All 1:1s Mounts come with 3 or more abilities they can use
                  from their first race.
                </li>
              </ul>
              <br />
              To use an ability, you will just need to use the respective
              command. You can use an individual ability one or more times per
              race depending on the ability itself.
            </div>

            <br />

            <div className={styles.card_text}>
              <b>Training Points</b>
              <br />
              BlackSand has hired a special trainer to support your mounts’
              performance during races. Any holder can train their mount (or
              pony) by playing games of Runes TCG. Join Runes Discord and visit
              their Website to get started with you training.
              <ul className={styles.bullet}>
                <li>
                  Training your pony with Red gives you an opportunity to win
                  additional bonus rolls for the current BlackSand Race.
                </li>
                <li>
                  These rolls are NOT treat rolls, and do not count towards
                  Indigestion.
                </li>
                <li>
                  To train, you can play against ANY OTHER Forgotten Runes
                  Holder or BlackSand Mounts holder and the two of you can duel
                  each other in best-of-three Runes match (two game wins are
                  required to win a match).
                </li>
                <li>
                  If you win the match, you will receive 1x D6 bonus roll. Well
                  done!
                </li>
                <li>
                  If you lose the match, you will still receive 1x D4. Training
                  always helps!
                </li>
                <li>
                  You can train as many times as you want with your opponent,
                  but can only receive a max of 2 bonus rolls from the FIRST two
                  match that you play during every race (either 1x D6 if you win
                  or 1x D4 if you lose).
                </li>
                <li>
                  Each week, you need to train and roll by Tuesday 5pm PST{" "}
                </li>
              </ul>
            </div>

            <br />

            <p className={styles.card_text}>
              <b>Loot & Morale Points - Coming Soon</b>
              <br />
              Holding additional tokens from the Forgotten Runes ecosystem or
              from collections by Forgotten Runes community members grant you
              additional rolls. More info to come.
            </p>
          </div>
        </div>

        <h6 className={styles.title_container}> Championship Points</h6>
        <div className={styles.rules_container_one}>
          <div className={styles.card}>
            <p className={styles.card_text}>
              Earn Championship points from every championship race. The Pony
              with the most points by the end of the Championship wins.
            </p>
          </div>
        </div>

        <h6 className={styles.title_container}>
          Experience Points - Coming Soon
        </h6>
      </div>
    </>
  );
};

export default Rules;
