require('dotenv').config()
const freeclimbSDK = require('@freeclimb/sdk')

// your freeclimb API key (available in the Dashboard) - be sure to set up environment variables to store these values
const accountId = process.env.ACCOUNT_ID
const apiKey = process.env.API_KEY
const conferenceId = process.env.CONFERENCE_ID

const configuration = freeclimbSDK.createConfiguration({ accountId, apiKey })
const freeclimb = new freeclimbSDK.DefaultApi(configuration)

// Invoke get participants method
getConferenceParticipants(conferenceId).then(participants => {
  console.log('got all conference participants for', conferenceId)
  console.log(participants)
  // Use participants
}).catch(err => {
  console.error(err)
  // Catch Errors
})

async function getConferenceParticipants(conferenceId) {
  // Create array to store all participants
  const participants = []
  // Invoke GET method to retrieve initial list of participant information
  let response = await freeclimb.listParticipants(conferenceId);
  participants.push(...response.participants)

  while (response.nextPageUri) {
    response = await freeclimb.getNextPage(response)
    participants.push(...response.participants)
  }
  return participants
}
