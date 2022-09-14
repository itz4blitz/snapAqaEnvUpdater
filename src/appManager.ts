export default class appManager {
    constructor() {}

    gitUpdate() {
        const gitPullOrClone = require('git-pull-or-clone')
        gitPullOrClone(`${process.env.booker_repo_url}`, `${process.env.booker_path}`, (err: Error) => {
            if (err) throw err
            console.log('Updated Booker!')
          })
    }

    startApp() {
        
    }
}