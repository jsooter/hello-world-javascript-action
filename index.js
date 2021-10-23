const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

try {
    let committer_email = payload.head_commit.email;
    console.log(`Committer email: ${committer_email}`);
    if (payload.head_commit.email != 'josh-sooter@pluralsight.com') {
        core.setFailed(`User email ${committer_email} is is not compliant`);
    }
} catch (error){
    core.setFailed(error.message);
}