import {observable, action, toJS} from "mobx"

class global {
    @observable yearData = {}
    @observable rankData = {}
    @observable nodes = []
    @observable hisRankWidth = 50
    @observable hisDataHeightSel = 4
    @observable hisDataWidthdiff = 10
    @observable circlePos = {}
    @observable overNode = []
    @observable selectNode = []
    @observable overLayer = []
    @observable linePos = {}
    @observable yearArr=[]
    layer = 20
    right = 30
    left = 30
    diffHeight = 15
    rankR = 5
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
    setAxisPos(axisPos) {
        this.axisPos = axisPos
        console.log('axisPos', toJS(axisPos))
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
        if (overNode !==this.overNode)
            this.overNode = overNode
        console.log('overNode', toJS(overNode))
    }
    @action
    setSelectNode(selectNode) {
        if (selectNode !==this.selectNode)
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
        if (this.rankHeight !== rankHeight)
            this.rankHeight = rankHeight
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
        console.log('nodes', toJS(nodes))
    }

    @action
    setEachWidth(eachWidth) {
        if (this.eachWidth !== eachWidth)
            this.eachWidth = eachWidth
        console.log('eachWidth', toJS(eachWidth))
    }


}

const Global = new global()
export default Global