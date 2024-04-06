import fs from 'fs'


const writer = {
    pathFile: '',
    init: async function () {
        const existFile = await fs.existsSync(this.pathFile)
        if (!existFile) {
            await fs.appendFileSync(this.pathFile, '{"messages":[]}')

        }
    },
    appendDataFile: async function (value) {
        const {topic, message} = value
        const fileData = JSON.parse(await fs.readFileSync(this.pathFile).toString())
        fileData.messages.push({topic, message})
        return fs.writeFileSync(this.pathFile, JSON.stringify(fileData))
    },
    setPathFile: function (path) {
        this.pathFile = path
    }
}


export {writer}
