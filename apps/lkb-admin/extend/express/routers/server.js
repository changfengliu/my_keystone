const os = require('os')
const nodeInfo = require('node-version')

const osNamesMap = {
  Linux: 'Linux',
  Darwin: 'MacOS',
  Windows_NT: 'Windows',
}

/**
 * 获取服务器信息。
 */
export default function ServerController() {
  const osTypeStr = osNamesMap[os.type()]
  const networkObj = getNetworkInfo()
  let info = {
    type: osTypeStr, //系统类型
    tmpdir: os.tmpdir(),
    hostname: os.hostname(), //系统主机名
    localIP: networkObj.localIP, //本机IP
    networkInterfaces: networkObj.networkIP, //网络IP
    release: os.release(),
    totalmem: Math.floor(os.totalmem() / (1024 * 1024)) + 'M', //系统内存
    freemem: Math.floor(os.freemem() / (1024 * 1024)) + 'M', //系统空闲内存
    homedir: os.homedir(),
    uptimeStr: Math.floor(os.uptime() / (60 * 60)) + '小时',
    nodeVersion: nodeInfo.original,
  }
  return info
}

/**
 * 获取服务器网络信息。
 */
function getNetworkInfo() {
  let localIP = ''
  let networkIP = ''
  const networkInterfaces = os.networkInterfaces()
  for (const key in networkInterfaces) {
    if (Object.prototype.hasOwnProperty.call(networkInterfaces, key)) {
      const list = networkInterfaces[key]
      list.forEach(d => {
        if (d.family === 'IPv4') {
          if (d.internal) {
            localIP = d.address
          } else {
            networkIP = d.address
          }
        }
      })
    }
  }
  return { localIP, networkIP }
}
