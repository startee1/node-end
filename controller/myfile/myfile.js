const BaseComponent = require('../../basicApi/baseComponent')
const fs = require('fs')

class MyFile extends BaseComponent {
  constructor () {
    super()
  }
  // POST
  image = async (req, res, next) => {
    let files = req.files;
    let file = files[0];
    let fileInfo = {};
    let name = Date.now().toString() + "." + file.mimetype.slice(6)
    let path = "public/images/" + name ;
    fs.renameSync("./public/images/" + file.filename, path);
    //获取文件基本信息
    fileInfo.type = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.name = name;
    fileInfo.size = file.size;
    fileInfo.path = path;
    res.send({
      status: 1,
      type: 'UPLOAD_IMAGE_SUCCESS',
      data: fileInfo,
    });
  }
}

module.exports = new MyFile()