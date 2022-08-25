/**
 * 辅助数据
 * @type {{buttom: number, top: number, left: number, right: number}}
 */

let dIndex = {
    'top': 0,
    'right': 1,
    'buttom': 2,
    'left': 3
}
let arrIndex = [
    {
        name: 'top',
        label: '上'
    }, {
        name: 'right',
        label: '右'
    }, {
        name: 'buttom',
        label: '下'
    }, {
        name: 'left',
        label: '左'
    }
]

let borderList = [{
    label: '左边框',
    key: 'borderLeft',
    type:'border-l',
    data: {
        size: '',
        type: '',
        color: ''
    }
},{
    label: '右边框',
    key: 'borderRight',
    type:'border-r',
    data: {
        size: '',
        type: '',
        color: ''
    }
},{
    label: '上边框',
    key: 'borderTop',
    type:'border-t',
    data: {
        size: '',
        type: '',
        color: ''
    }
},{
    label: '下边框',
    key: 'borderBottom',
    type:'border-b',
    data: {
        size: '',
        type: '',
        color: ''
    }
}]

let borderSelect= [{
    value: '',
    label: '无'
}, {
    value: 'solid',
    label: '实线'
}, {
    value: 'dotted',
    label: '点线'
},{
    value: 'dashed',
    label: '虚线'
},{
    value: 'double',
    label: '双线'
},{
    value: 'groove',
    label: '凹线'
},{
    value: 'ridge',
    label: '山脊线'
},{
    value: 'inset',
    label: '嵌入线'
},{
    value: 'outset',
    label: '凸线'
}]

export {dIndex,arrIndex,borderList,borderSelect}
