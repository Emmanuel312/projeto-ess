import * as admin from 'firebase-admin'
admin.initializeApp();

const firebaseApp = admin.initializeApp({
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
}, 'ID')

// Export the database for components to use.
export const db = firebaseApp.database()