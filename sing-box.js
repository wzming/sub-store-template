const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}
const groupRegexMap = {
  hk: /港|hk|hongkong|hong kong|🇭🇰/i,
  tw: /台|tw|taiwan|🇹🇼/i,
  jp: /日本|jp|japan|🇯🇵/i,
  sg: /新加坡|狮城|(?:^|[^a-z])sg(?:$|[^a-z])|singapore|🇸🇬/i,
  kr: /首尔|韩|韓|(?:^|[^a-z])(?:kr|kor)(?:$|[^a-z])|korea|🇰🇷/i,
  us: /美国|美|(?:^|[^a-z])(?:us|usa)(?:$|[^a-z])|united[\s_-]*states?|america|🇺🇸/i,
  fiddler: /fiddler/i,
}
const otherAutoRegexList = Object.values(groupRegexMap)

let compatible
let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})
console.log("原始文件信息\r\n",JSON.stringify(config))

config.outbounds.push(...proxies)

config.outbounds.map(i => {
  if (['all', 'all-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies))
  }
  if (['hk', 'hk-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, groupRegexMap.hk))
  }
  if (['tw', 'tw-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, groupRegexMap.tw))
  }
  if (['jp', 'jp-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, groupRegexMap.jp))
  }
  if (['sg', 'sg-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, groupRegexMap.sg))
  }
  if (['kr', 'kr-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, groupRegexMap.kr))
  }
  if (['us', 'us-auto'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, groupRegexMap.us))
  }
  if (['fiddler'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, groupRegexMap.fiddler))
  }
  if (['other-auto'].includes(i.tag)) {
    i.outbounds.push(...getOtherTags(proxies, otherAutoRegexList))
  }
})

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound)
      compatible = true
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}

function getOtherTags(proxies, regexList) {
  return proxies.filter(p => !regexList.some(regex => regex.test(p.tag))).map(p => p.tag)
}
