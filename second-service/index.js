import path from 'path'
import {client, topics} from "./mqtt.connect.js";
import {writer} from "./writer.js";


const __dirname = path.resolve()
writer.setPathFile(path.resolve(__dirname + '/subscribes.json'))
await writer.init()
const initSubscribes = () => {
    topics.map(topic => {
        client.subscribe(topic)
    })
}
client.on("connect", () => {
    initSubscribes()
});


client.on('message', async (topic, message) => {
    await writer.appendDataFile({topic, message: JSON.parse(message.toString())})
    console.log(topic, message.toString())
})


console.log('second-service work')