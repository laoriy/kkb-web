const loaData = {
    info: {
        name: 'laor学习'
    },
    get name() {
        return this.info.name
    },
    set name(value) {
        console.log('new name is :' + val);
        this.info.name = value
    }
}

console.log(loaData.name)

loaData.name = 'laor睡觉了'