import mqtt from 'mqtt';
import dotenv from 'dotenv'

dotenv.config()

const {PROTOCOL, HOST, PORT_MQTT, PATH_MQTT} = process.env
const protocol = PROTOCOL
const host = HOST
const port = PORT_MQTT
const path = PATH_MQTT
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `${protocol}://${host}:${port}${path}`

const topics = ['testtopic/1', 'testtopic/2', 'testtopic/3']
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'admin',
    password: 'public',
    reconnectPeriod: 1000,
});

client.on('disconnect', () => {
    console.log('close connected mqtt client')
})
client.on('error', (error) => {
    const {code} = error
    const errorsMessage = {
        'ECONNREFUSED': () => console.log('Error connect')
    }
    return errorsMessage[code].apply(this, [])
})
client.on('end', () => {
    console.log('connect finished')
})

export {client, topics}