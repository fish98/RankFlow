import React, {Component} from 'react'
import Global from '../Store/Global'
import {observer} from 'mobx-react'
import {toJS, trace} from 'mobx'


@observer
class RankItems extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <g name={'RankItems'}>
                {Global.yearArr.map(year => {
                    return <rect key={year} transform={`translate(${Global.axisPos[year]+Global.subWidth},${Global.diffHeight})`}
                              width={Global.eachWidth - Global.subWidth}
                              height={Global.rankHeight-Global.diffHeight}
                                 opacity={0}
                    />
                })}
            </g>
        )
    }
}

export default RankItems
