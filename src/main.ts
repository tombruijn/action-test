const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('repo-token', {required: true});
    const client = new github.GitHub(token);
    core.debug(`Hello from inside a container`);

    // Get github context data
    const context = github.context;
    console.log(`We can even get context data, like the repo: ${context.repo.repo}`)
    const issue: {owner: string; repo: string; number: number} = context.issue;

    await client.issues.createComment({
      owner: issue.owner,
      repo: issue.repo,
      issue_number: issue.number,
      body: "This is a test"
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
