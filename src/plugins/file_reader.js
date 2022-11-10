const fs = require('fs')
const imageinfo = require('imageinfo')

function load_images(dir) {
  return getFiles.getImageFiles(dir + '/');
}

function readFileList(path, filesList) {
  let files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
    let stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itm + "/", filesList)
    } else {

      let obj = {};//定义一个对象存放文件的路径和名字
      obj.path = path;//路径
      obj.filename = itm//名字
      filesList.push(obj);
    }
  })
}

function getImageType(str) {
  let reg = /\.(png|jpg|gif|jpeg|webp)$/;
  return str.match(reg)[1];
}

let getFiles = {
//获取文件夹下的所有文件
  getFileList(path) {
    let filesList = [];
    readFileList(path, filesList);
    return filesList;
  }, //获取文件夹下的所有图片
  getImageFiles(path) {
    let imageList = [];
    for (const item of this.getFileList(path)) {
      let data = fs.readFileSync(item.path + item.filename, 'binary')
      const buffer = new Buffer(data, 'binary');
      imageList.push({
        full_path: item.path + item.filename,
        path: item.path,
        filename: item.filename,
        info: imageinfo(buffer, data),
        URL: 'data: image/' + getImageType(item.filename) + ';base64,' + buffer.toString('base64')
      });
    }
    return imageList;
  }
};


function shuffle(arr) {
  let len = arr.length;
  for (let i = len - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

export {load_images, shuffle}
