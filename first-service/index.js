import {client, topics} from "./mqtt.connect.js";

const sendMessage = (topic, message) => {
    client.publish(topic, JSON.stringify({num: message}))
}
const createIntervalMessage = (topic) => {
    const timeInterval = Math.floor(Math.random() * 10000)
    return setInterval(() => sendMessage(topic, Math.random()), timeInterval)
}

client.on("connect", () => {
    let intervalIds = []
    try {
        topics.forEach(topic => intervalIds.push(createIntervalMessage(topic)))
    } catch (e) {
        intervalIds.map(intervalId => clearInterval(intervalId))
        process.exit(0)
    }
});
console.log('first-service run')




