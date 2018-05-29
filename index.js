'use strict'
require('dotenv').config();
const fetch = require('node-fetch');
const FormData = require('form-data');
var program = require('commander');
 
program
  .version('0.0.1')
  .option('-c, --command [value]', 'Command to run in channel')
  .option('-a, --args [value]', 'Text args of the command (optional)')
  .option('-C, --channel [value]', 'ID of channel to run command in')
  .parse(process.argv);

class SlackCommand{
	constructor(conf){
		var self = this;
		self.uri = "https://slack.com/api/chat.command";
		self.channel = conf.channel;
		self.token = conf.token;
	}

	async execute(command, text){
		var self = this;

		const form = new FormData();
		form.append('token', self.token);
		form.append('channel', self.channel);
		form.append('command', command);
		if(text)
			form.append('text', text);

		var options = {
			body: form,
			method: 'POST'
		}

		return await fetch(self.uri, options);
	}
}

var slackCommand = new SlackCommand({
	channel: program.channel,
	token: process.env.SLACK_TOKEN
})

console.log(`command: ${program.command} channel: ${program.channel} args: ${program.args}`)

slackCommand.execute(program.command).then(res => {
	if(res.status != 200){
		console.log('Failed to make request:')
		console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers.raw());
        console.log(res.headers.get('content-type'));
	}
	return res.json();
}).then(json => {
	if(json.ok == true){
		console.log('successfully sent command!');
		console.log(json.response);

	}else{
		console.log(`Failed to send command: ${JSON.stringify(json,undefined,2)}`);
		process.exit(1);
	}
});