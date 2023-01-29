export const MapsApiDesign = {
    // GET /api/mods
    async list() {
        //params: query gameVersion
        return [{
            id: 1000,
            name: "beta-mindy",
            displayName: "BetaMindy",
            description: "My first Java mod, has the same amount of chaotic energy of sk7725/Commandblocks.",
            authors: ["sk7725@github"],
            lastVersion: { //Versions but no files
                name: "v1.1", // mod.json
                time: "2022-09-26T04:50:14Z",
                minGameVersion: "138",//138 代表 138.0。向上兼容新版本，除非遇到硬分叉点(105,126,136
            }
        }]
    },
    // GET /api/mods/{id}?versionOffset
    async detail(id: number) {
        return {
            id: 1000,
            name: "beta-mindy",
            displayName: "BetaMindy",
            description: "My first Java mod, has the same amount of chaotic energy of sk7725/Commandblocks.",
            readme: "MARKDOWN",//主要来源是readme
            authors: ["sk7725@github", "example"], //不带@的为资源站账号,若有@但不是一直内容，当成字符串显示
            links: { // Map<String,Object> => parser
                github: { //可选字段
                    repo: "sk7725/betamindy",
                    stars: 269
                },
                bilibili: {
                    "user": "普冷姆plum"
                },
                qqChatGroup: {
                    "number": 114514
                }
            },
            versions: [{ //按照最新排序，最新的30个，可通过可选参数versionOffset偏置
                name: "v1.1", // mod.json
                time: "2022-09-26T04:50:14Z",
                minGameVersion: "138",//138 代表 138.0。向上兼容新版本，除非遇到硬分叉点(105,126,136)
                files: [{
                    name: "Beta的Mindustry.jar",
                    size: "10MB",
                    sources: ["github", "githubMirrored"] // GET ...file=BetaMindy.jar&source=github
                }],
            }]
        }
    },
    // GET /api/mods/{id}/download?version=1.1&file=xxx&link=github
    async download(id: number) {
    }
}