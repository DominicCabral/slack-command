# slack-cmd

Runs a slack command in a channel

## Usage

`node index.js -c [COMMAND] -C [CHANNEL_ID]`

## CronJob Usage

### At 10:15 on every day-of-week from Monday through Friday.

`15 10 * * 1-5 node ~/slack_command/index.js -c /uberconference -C C02LDD7DW`
