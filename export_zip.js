import fs from "fs";
import archiver from "archiver";
import path from "path";
import {fileURLToPath} from "url";

const __filenameNew = fileURLToPath(import.meta.url);
const homedir = path.dirname(__filenameNew); //这里是当前目录路径

//配置要打包的路径列表,需要打包某些目录，添加到数组里面即可 相对路径
const target = "dist";

// 默认在当前目录路径生成此文件 dist.zip
const output = fs.createWriteStream(homedir + "/dist.zip");
const archive = archiver("zip", {
  zlib: { level: 9 }, // 设置压缩级别
});

archive.on("error", function (err) {
  throw err;
});

output.on("close", function () {
  console.log(`
     --------- ---------压缩完毕--------- ---------
     生成文件大小${(archive.pointer() / 1024 / 1024).toFixed(1)}MB
     请在当前项目路径下寻找 ${target}.zip 文件,系统路径为 ${homedir}\\${target}.zip
     ---------如需配置生成路径或文件名,请配置output---------
     `);
});

archive.pipe(output);
archive.directory(target, target);
// for (i of target) { archive.directory(i, i) }
archive.finalize();
