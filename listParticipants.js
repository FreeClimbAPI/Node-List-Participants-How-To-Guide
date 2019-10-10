require('dotenv').config()
const persephonySDK = require('@persephony/sdk')

const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
// your Persephony API key (available in the Dashboard) - be sure to set up environment variables to store these values
const persephony = persephonySDK(accountId, authToken)

// Invoke get participants method
getConferenceParticipants(conferenceId).then(participants => {
  // Use participants
}).catch(err => {
  // Catch Errors
})

async function getConferenceParticipants(conferenceId) {
  // Create array to store all participants
  const participants = []
  // Invoke GET method to retrieve initial list of participant information
  const first = await persephony.api.conferences.participants(conferenceId).getList()
  participants.push(...first.participants)
  // Get Uri for next page
  let nextPageUri = first.nextPageUri
  // Retrieve entire participant list 
  while (nextPageUri) {
    const nextPage = await persephony.api.conferences.participants(conferenceId).getNextPage(nextPageUri)
    participants.push(...nextPage.participants)
    nextPageUri = nextPage.nextPageUri
  }
  return participants
}
