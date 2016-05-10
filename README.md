# Introduction
This repo is one project of [`maybe`](https://blue.cse.buffalo.edu/projects/maybe/). It has two parts: search on [GitHub](https://github.com), clone from GitHub. The search part is implemented by [Meteor](https://www.meteor.com/), the clone part is an ordinary `Node.js` application.

# Meteor app
The Meteor app is located in `./app`. It has two main parts:
1. Web UI, easy to start a new search and show previous search result
2. Backend query to [GitHub search API](https://developer.github.com/v3/search/#search-code)


## Setup
To use the Meteor app, you have to [install](https://www.meteor.com/install) Meteor and read the [guide](http://guide.meteor.com/) of Meteor first.

```bash
cd app
meteor --setting settings.json
```

### Token
Because ordinary GitHub account/token/application is not able to search on the whole GitHub, you have to have a privileged account/token/application.

We do have a privileged application: https://github.com/organizations/blue-systems-group/settings/applications/327067, please make sure you are a member of the [blue Systems Research Group](https://github.com/blue-systems-group) and login if you see a `404` page.

You have to learn how to setup [OAuth Authorizations](https://developer.github.com/v3/oauth_authorizations/) if you want to use your own account. Otherwise, please ask [xcv58](https://github.com/xcv58) for an existing token.

You need to put your token in `./app/settings.json`:
```json
{
  "GITHUB_TOKEN": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

## Maintenance
The Meteor app follows the Mantra Specification. Please read the [Mantra Specification](https://kadirahq.github.io/mantra/) and [sample app](https://github.com/mantrajs/mantra-sample-blog-app).

# Clone worker
The Meteor app only search the GitHub and store the search result. So we have to clone the repos of result somewhere. Do it inside Meteor app is not a good idea. Because `git clone` contains heavy I/O operations. So we use Meteor app to provide a queue and clone repos from other clients. That's why we have clone worker.

The clone worker locates at `./git_workers`. It is a client of [vsivsi:job-collection](https://github.com/vsivsi/meteor-job-collection).
As an ordinary `Node.js` application, you can use `npm install` to install dependencies and `npm start` to run the app.

There're a few methods located in `./app/server/lib/jobs.js` to manipulate the job collection. In the future, we should integrate related function with Web UI.

The clone worker will automatic subscribe the job collection and process the clone operation.
