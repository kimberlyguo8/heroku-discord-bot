const express = require('express')
const { sendHerokuDeploy, login } = require('./discord.js')
const app = express()
const github_commit = 'https://github.com/jamesw8/project-tbd/commit/'

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is alive')
});

app.post('/deploy-status', (req, res) => {
  let body = req.body
  let status = body.deployment_status
  let state = status.state 
  let deployment = body.deployment
  let deploy_url = deployment.payload.web_url
  let commit_sha = deployment.sha
  let commit_url = github_commit.concat(commit_sha)

  let result = {
    "state": state,
    "deploy_url": deploy_url,
    "commit_url": commit_url
  }
  let deployInfo = `Backend deploy ${state}. Triggered by commit: ${commit_url}. View deploy at: ${deploy_url}`
  console.log(deployInfo)
  sendHerokuDeploy(deployInfo)
})

login()

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is ready!');
})