"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core = require('@actions/core');
const github = require('@actions/github');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core.getInput('repo-token', { required: true });
            const client = new github.GitHub(token);
            core.debug(`Hello from inside a container`);
            // Get github context data
            const context = github.context;
            console.log(`We can even get context data, like the repo: ${context.repo.repo}!`);
            const issue = context.issue;
            const message = "This is a test";
            console.log(`Adding message: "${message}" to issue ${issue.owner}/${issue.repo}#${issue.number}`);
            yield client.issues.createComment({
                owner: issue.owner,
                repo: issue.repo,
                issue_number: issue.number,
                body: message
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
