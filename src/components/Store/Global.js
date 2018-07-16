import {observable, action, toJS} from "mobx"
import year_data from '../.././pages/index/year_data'

class global {
    @observable yearData = {}
    @observable rankData = {}
    @observable nodes = []
    @observable hisRankWidth = 50
    @observable hisDataHeightSel = 4
    @observable hisDataWidthdiff = 10
    @observable circlePos = {}
    @observable overNode = []
    @observable overYear = ""
    @observable selectNode = null
    @observable overLayer = null
    @observable linePos = {}
    @observable yearArr = []
    @observable maxVar = 1
    @observable minVar = 1
    @observable dragData = {}
    @observable saveNodes = {}
    @observable brushNum = 0
    @observable nodesSet = new Set()
    @observable overLayerData = {}
    @observable clickLayer = null
    @observable clickYear = null
    @observable maxRank = {}
    @observable filterObj = {eles: [], years: [], names: []}
    @observable filterObjHistory = []
    eleObj = {}
    subWidth = 15
    layer = 20
    right = 30
    left = 30
    diffHeight = 55
    rankR = 5
    nodess = []
    elements = ["HIS", "ICC", "H", "aggre_constraint", "clust_coef", "betweenness", "effective_size", "local_effic", "pagerank", "MaxD"]
    @observable eachWidth = 0
    @observable minHisVal = 0
    @observable maxHIsVal = 1
    @observable rankWidth = 1
    @observable rankHeight = 1
    @observable hisData = []
    @observable hisRank = []
    @observable axisPos = null
    @observable hisDataObj = {}
    @observable hisRankObj = {}

    @action
    initYeardata() {
        this.yearData = year_data
        // this.saveNodes = nodes
        this.dealSetNodes(this.nodes)
        console.log('nodes', toJS(this.nodes))
        console.log('maxRank', toJS(year_data))
    }


    @action
    setFilterObj(data) {
        this.filterObj = data
        let layer = this.layer
        let countLayer = {}
        let yearData = this.yearData
        data.years.forEach(year => {
            let year_obj = yearData[year]
            data.names.forEach(name => {
                if (!year_obj.obj.hasOwnProperty(name)) return
                let nameObj = year_obj.obj[name]
                data.eles.forEach(ele => {
                    if (!nameObj.data.hasOwnProperty(ele)) return
                    delete nameObj.data[ele]
                })
                const sum = Object.values(nameObj.data).reduce((a, b) => a + b)
                const l = Object.keys(nameObj.data).length
                const mean = sum / l
                const variance = Object.values(nameObj.data).reduce((a, b) => a + Math.pow(b - mean, 2)) / l
                nameObj.mean = mean
                nameObj.rankL = l
                nameObj.variance = variance
            })
            yearData[year].arr = Object.values(this.yearData[year].obj).sort((a, b) => a.mean - b.mean)
            const l = this.yearData[year].arr.length
            countLayer[year] = {}
            yearData[year].arr.forEach((d, i) => {//排好序，所以layer的时候都是从小到大加的
                yearData[year].obj[d.name].mean_rank = i
                yearData[year].obj[d.name].mean_rank_per = i / yearData[year].arr.length//百分比
                const newLayer = Math.floor(i / (l / layer))
                yearData[year].obj[d.name].layer = newLayer
                if (!countLayer[year].hasOwnProperty(newLayer)) countLayer[year][newLayer] = []
                yearData[year].obj[d.name].layerIndex = countLayer[year][newLayer].length
                countLayer[year][newLayer].push(d.name)
            })
        })
        console.log('setFilterObj', toJS(data))
        this.setYearData(yearData)
        let nodes = new Set()
        Object.values(this.saveNodes).forEach(names => {
            names.forEach(name=>{
                nodes.add(name)
            })
        })
        if (nodes.size) {
            this.dealSetNodes(nodes)
        } else {
            this.dealSetNodes(this.nodes)
        }
    }

    @action
    setMaxRank(maxRank) {
        this.maxRank = maxRank
        console.log('maxRank', toJS(maxRank))
    }

    @action
    setClickYear(clickYear) {
        this.clickYear = clickYear
        console.log('clickYear', toJS(clickYear))
    }

    @action
    setOverYear(overYear) {
        this.overYear = overYear
        console.log('overYear', toJS(overYear))
    }

    @action
    setClickLayer(clickLayer) {
        this.clickLayer = clickLayer
        console.log('clickLayer', toJS(clickLayer))
    }

    @action
    setOverLayerData(overLayerData) {
        this.overLayerData = overLayerData
        console.log('overLayerData', toJS(overLayerData))
    }

    @action
    setDragData(dragData) {
        this.dragData = dragData
        console.log('dragData', toJS(dragData))
    }

    @action
    setBrushNum(brushNum) {
        this.brushNum = brushNum
        console.log('brushYear', toJS(brushNum))
    }

    @action
    setSaveNodes(y, saveNodes) {
        // if (!saveNodes.size) {
        //     this.nodes.forEach(name => {
        //         if (this.yearData[y].obj.hasOwnProperty(name)) {
        //             saveNodes.add(name)
        //         }
        //
        //     })
        // }
        let nodes = new Set()
        let nodess = new Set()
        Object.keys(this.saveNodes).forEach(year => {
            if (year === y) return
            let data = this.saveNodes[year]
            data.forEach(name => {
                if (this.nodesSet.has(name)) {
                    nodes.add(name)
                }
            })
        })
        if (nodes.size && saveNodes.size) {
            nodes.forEach(node => {
                if (saveNodes.has(node)) {
                    nodess.add(node)
                }
            })
        } else {
            if (!saveNodes.size) {
                nodess = nodes
            } else {
                nodess = saveNodes
            }
        }

        this.saveNodes[y] = saveNodes
        if (!nodess.size) {
            nodess = this.nodes
        }
        this.nodess = nodess
        this.dealSetNodes(nodess)
        console.log('saveNodes', toJS(saveNodes))
    }

    @action
    setAxisPos(axisPos) {
        this.axisPos = axisPos
        console.log('axisPos', toJS(axisPos))
    }

    @action
    setMaxVar(maxVar) {
        this.maxVar = maxVar
        console.log('maxVar', toJS(maxVar))
    }

    @action
    setMinVar(minVar) {
        this.minVar = minVar
        console.log('minVar', toJS(minVar))
    }

    @action
    setOverLayer(overLayer) {
        this.overLayer = overLayer
        console.log('overLayer', toJS(overLayer))
    }

    @action
    setYearArr(yearArr) {
        this.yearArr = yearArr
        console.log('yearArr', toJS(yearArr))
    }

    @action
    setOverNode(overNode) {
        if (overNode !== this.overNode)
            this.overNode = overNode
        console.log('overNode', toJS(overNode))
    }

    @action
    setSelectNode(selectNode) {
        if (selectNode !== this.selectNode)
            this.selectNode = selectNode
        console.log('selectNode', toJS(selectNode))
    }

    @action
    setLinePos(linePos) {
        this.linePos = linePos
        console.log('linePos', toJS(linePos))
    }

    @action
    setCirclePos(circlePos) {
        this.circlePos = circlePos
        console.log('circlePos', toJS(circlePos))
    }

    @action
    setHisRankObj(hisRankObj) {
        this.hisRankObj = hisRankObj
        console.log('hisRankObj', toJS(hisRankObj))
    }

    @action
    setHisDataObj(hisDataObj) {
        this.hisDataObj = hisDataObj
        console.log('hisDataObj', toJS(hisDataObj))
    }

    @action
    setHisData(hisData) {
        this.hisData = hisData
        console.log('hisData', toJS(hisData))
    }

    @action
    setHisRank(hisRank) {
        this.hisRank = hisRank
        console.log('hisRank', toJS(hisRank))
    }

    @action
    setYearData(yearData) {
        // this.yearData=this.dealData(this.rankData, this.layer)

        this.yearData = yearData
        console.log('yearData', toJS(yearData))
    }

    @action
    setRankData(rankData) {
        this.rankData = rankData
        console.log('rankData', toJS(rankData))
    }

    @action
    setRankHeight(rankHeight) {
        if (this.rankHeight !== rankHeight) {
            this.rankHeight = rankHeight
            this.dealSetNodes(this.nodess)
        }
        console.log('rankHeight', toJS(rankHeight))
    }

    @action
    setRankWidth(rankWidth) {
        if (this.rankWidth !== rankWidth)
            this.rankWidth = rankWidth
        console.log('rankWidth', toJS(rankWidth))
    }

    @action
    setMinHisVal(minHisVal) {
        if (this.minHisVal !== minHisVal)
            this.minHisVal = minHisVal
        console.log('minHisVal', toJS(minHisVal))
    }

    @action
    setMaxHisVal(maxHIsVal) {
        if (this.maxHIsVal !== maxHIsVal)
            this.maxHIsVal = maxHIsVal
        console.log('maxHIsVal', toJS(maxHIsVal))
    }

    @action
    setNodes(nodes) {
        this.nodes = nodes
        this.nodesSet = new Set(nodes)
        // this.saveNodes = nodes
        this.dealSetNodes(nodes)
        console.log('nodes', toJS(nodes))
    }

    @action
    setEachWidth(eachWidth) {
        if (this.eachWidth !== eachWidth)
            this.eachWidth = eachWidth
        console.log('eachWidth', toJS(eachWidth))
    }


    getCirclePos(nodes) {
        let circlePos = {}
        let circlePosPer = {}
        let yearPer = 0
        let lineGroup = {}
        Object.keys(this.yearData).forEach(year => {
            nodes.forEach(name => {//计算圆的位置
                if (!this.yearData[year].obj.hasOwnProperty(name)) return
                const layer = this.hisRankObj[year][name].layer
                const index = this.hisRankObj[year][name].index
                const x = index * 2 * this.rankR
                const layerLayer = Math.floor((x + this.rankR) / this.hisRankWidth)
                const y = layer * (this.rankHeight - this.diffHeight) / this.layer + layerLayer * 2 * this.rankR
                const cx = x + this.rankR - layerLayer * this.hisRankWidth
                const cy = y + this.rankR
                if (!circlePos.hasOwnProperty(year)) {
                    circlePos[year] = {}
                }
                circlePos[year][name] = {
                    val: Math.sqrt(this.yearData[year].obj[name].variance),
                    x: 0,
                    cx: cx,
                    cy: cy,
                    y: cy,
                    r: this.rankR,
                    name: name,
                    layer: layer,
                }
            })
            if (!circlePos.hasOwnProperty(year)) return
            if (circlePosPer !== {} && Number(year) - Number(yearPer) === 1) {//之前有值，年份相邻差1
                Object.keys(circlePos[year]).forEach(name => {//计算线的位置
                    const circleRight = circlePos[year][name]
                    if (!circlePosPer.hasOwnProperty(name)) return
                    const circleLeft = circlePosPer[name]
                    if (!lineGroup.hasOwnProperty(year)) {
                        lineGroup[year] = {}
                    }
                    lineGroup[year][name] = {
                        real: {
                            source: {x: circleLeft.cx, y: circleLeft.cy},
                            target: {x: circleRight.cx + this.eachWidth, y: circleRight.cy},
                        },
                        source: {
                            x: 0,
                            y: circleLeft.y,
                        },
                        target: {
                            x: this.eachWidth,
                            y: circleRight.y
                        },
                        valLeft: circleLeft.val,
                        valRight: circleRight.val,
                        r: this.rankR,
                        name: circleLeft.name,
                    }
                })
            }
            yearPer = year
            circlePosPer = circlePos[yearPer]
        })
        this.setLinePos(lineGroup)
        this.setCirclePos(circlePos)
    }


    dealNodesLayer(nodes) {
        let nodesLayer = {}
        let r = {}
        const years = Object.keys(this.yearData)
        years.forEach(year => {
            nodesLayer[year] = {}
            nodes.forEach(name => {
                if (!this.yearData[year].obj.hasOwnProperty(name)) return

                const data = this.yearData[year].obj[name]
                const layer = data.layer
                if (!nodesLayer[year].hasOwnProperty(layer)) {
                    nodesLayer[year][layer] = []
                }
                nodesLayer[year][layer].push(name)
            })
            r[year] = {}
            Object.keys(nodesLayer).forEach(year => {
                Object.keys(nodesLayer[year]).forEach(layer => {
                    nodesLayer[year][layer].sort((a, b) => this.yearData[year].obj[a].mean_rank - this.yearData[year].obj[b].mean_rank)
                    nodesLayer[year][layer].forEach((name, index) => {
                        r[year][name] = {layer: layer, index: index}
                    })
                })
            })
        })
        return r
    }

    dealSetNodes(nodes) {
        let sumCount = 0
        let his_val = {}
        let max_val = -1000
        let min_val = 1000000
        let max_var = -1000
        let min_var = 1000000
        let rank_val = {}
        let his_val_obj = {}
        let yearData = this.yearData
        Object.keys(yearData).sort().map(year => {
            his_val[year] = Array(this.layer).fill(0)
            his_val_obj[year] = {}
            rank_val[year] = {}
            nodes.forEach(name => {
                if (!yearData[year].obj.hasOwnProperty(name)) return
                Object.entries(yearData[year].obj[name].data).forEach((e) => {
                    if (!this.eleObj.hasOwnProperty(e[0])) {
                        this.eleObj[e[0]] = {}
                    }
                    let la = Math.floor(e[1] / (yearData[year].arr.length / this.layer))
                    if (yearData[year].obj[name].variance > max_var) {
                        max_var = yearData[year].obj[name].variance
                    }
                    if (yearData[year].obj[name].variance < min_var) {
                        min_var = yearData[year].obj[name].variance
                    }
                    his_val[year][la] += 1
                    if (!his_val_obj[year].hasOwnProperty(la)) {
                        his_val_obj[year][la] = {nameData: {}, rankData: {}}
                    }
                    if (!his_val_obj[year][la].rankData.hasOwnProperty(e[0])) {
                        his_val_obj[year][la].rankData[e[0]] = 0
                    }

                    const pointLayer = yearData[year].obj[name].layer
                    if (!his_val_obj[year][la].nameData.hasOwnProperty(pointLayer)) {
                        his_val_obj[year][la].nameData[pointLayer] = {}
                    }
                    if (!his_val_obj[year][la].nameData[pointLayer].hasOwnProperty(name)) {
                        his_val_obj[year][la].nameData[pointLayer][name] = {}
                    }
                    his_val_obj[year][la].rankData[e[0]] += 1
                    his_val_obj[year][la].nameData[pointLayer][name][e[0]] = e[1]
                    sumCount += 1
                })
                let layer = yearData[year].obj[name].layer
                if (!rank_val[year].hasOwnProperty(layer)) rank_val[year][layer] = []
                rank_val[year][layer].push(name)
            })
            const val0 = Math.max(...his_val[year])
            const val1 = Math.min(...his_val[year])
            if (val1 < min_val) min_val = val1
            if (val0 > max_val) max_val = val0
        })
        this.setMaxHisVal(max_val)
        this.setMinHisVal(min_val)
        this.setHisData(his_val)
        this.setMaxVar(max_var)
        this.setMinVar(min_var)
        this.setHisRank(rank_val)
        this.setHisDataObj(his_val_obj)
        this.setHisRankObj(this.dealNodesLayer(nodes))
        console.info(sumCount)
        this.getCirclePos(nodes)
    }

}

const Global = new global()
export default Global