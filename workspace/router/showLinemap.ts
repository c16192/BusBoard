export const showLinemap = (req, res) => {
    let lineId = req.query.lineId;
    console.log(lineId)
    if (lineId == undefined) {
        res.redirect('/linemap.html')
    } else {
        res.redirect('/linemap.html?lineId=' + lineId)
    }
}