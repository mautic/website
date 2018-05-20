const wpDateToMySqlTimeStamp = (date) => {
    let d = new Date();
    if (date) {
        d = new Date(date)
    }
    return d.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
    wpDateToMySqlTimeStamp
};
