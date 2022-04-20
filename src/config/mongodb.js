import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '*/config/environment'

const client = new MongoClient(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
export const connectDB = async () => {
    try {

        // Connect the client to the server
        await client.connect()
        //List databases
        await listDatabases(client)

        console.log('Connect successfully to server!')
    } finally {
        // Ensures that the client will close when finish/error
        await client.close()
    }
}

const listDatabases = async () => {
    const databasesList = await client.db().admin().listDatabases()
    console.log(databasesList)
    console.log('Your databases')
    databasesList.databases.forEach(db => console.log(`- ${db.name}`))
}