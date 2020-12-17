const fs = require('fs')

const day = new Date()

fs.writeFileSync('lastBuildTime.txt', `${day.valueOf()} test`)
