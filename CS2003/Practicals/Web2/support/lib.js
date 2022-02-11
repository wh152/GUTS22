
const path = require("path")

function getFileInfo(directoryname, filename) {
    const fileInfo_keys = ["size", "atime", "mtime", "ctime", "birthtime"]
    let filePath = path.join(directoryname, filename);
    let fs_stats = fs.statSync(filePath);

    let fileInfo = {}

    let type = "unknown";
    if      (fs_stats.isFile())            { type = "file" }
    else if (fs_stats.isDirectory())       { type = "directory" }
    else if (fs_stats.isBlockDevice())     { type = "block" }
    else if (fs_stats.isCharacterDevice()) { type = "character" }
    else if (fs_stats.isFIFO())            { type = "fifo" }
    else if (fs_stats.isSocket())          { type = "socket" }
    fileInfo["type"] = type

    fileInfo_keys.forEach(k => {
        fileInfo[k] = fs_stats[k]
        if (k.includes("time")) {
            fileInfo[k] = fileInfo[k].toLocaleString("en-GB")
        }
    })
    return fileInfo
}

