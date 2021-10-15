import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu} from 'antd';
import './world';
import *as echarts from 'echarts';
import {CartesianGrid, Legend, Tooltip, XAxis, YAxis,Brush,Line,LineChart} from 'recharts';
import jsonDate from './all.json';
import {NavLink} from "react-router-dom";
import axios from "axios";

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

let nameObj = {
}
//数据处理
// jsonDate.forEach((item)=>{
//     //初始化
//     if(nameObj[item.Country_Region]===undefined){
//         nameObj[item.Country_Region] = {
//             Confirmed:0,
//             Country_Region:''
//         }
//     }
//
//      item.Confirmed = item.Confirmed?item.Confirmed:0;
//
//     nameObj[item.Country_Region] = {
//         //统计处理
//         value:nameObj[item.Country_Region].Confirmed+item.Confirmed,
//
//     }
// });
jsonDate.map((item) => {
    if(!nameObj[item.Country_Region])
        nameObj[item.Country_Region] = {
            'value':0
        };

    nameObj[item.Country_Region].value+=Math.round(item.Confirmed);
})

// console.log(nameObj)

let allList = []//定义一个空数组

for (const key in nameObj) {
    nameObj[key].name=key
    //将信息的名字进行加载
    allList.push(nameObj[key])
}
let textObj = {
}
let textList = []
let arr=[],new_con,new_dea,new_rec;
const _this=this;
axios.get("http://127.0.0.1:8000/index")
    .then(function (res) {
        let data0=res.data.replace(/\[|]/g,'');
         console.log(data0)
        let data1=data0.replace(/\'/g, '"');
         console.log(data1)
        textObj = data1;
         textList = data1;
         // console.log(textObj)
        console.log(textList)
        let data2=data1.split("}}");
         // console.log(data2)
        for(let i=0;i<data2.length-1;i++){
            let temp=data2[i]+"}}";
            arr[i]=JSON.parse(temp).fields;
            if(i===data2.length-2){
                console.log(arr[i]['deaths']);
                console.log(arr[i-1]['deaths']);
                new_dea=arr[i].deaths-arr[i-1].deaths;
                new_con=arr[i].confirmed-arr[i-1].confirmed;
                new_rec=arr[i].recovered-arr[i-1].recovered;
            }
        }
        _this.setState({
            draw:arr,
            newcon:new_con,
            newdea:new_dea,
            newrec:new_rec,
        });
         console.log(arr);
    });

export default class Index extends React.Component{

    componentDidMount() {
        let myCharts = echarts.init(document.getElementById('worldMap'))
        // console.log('echarts')
        myCharts.setOption({
            //标题组件
            title: {
                text: 'Global Map',
                left: 'center'
            },
            //提示框组件
            tooltip: {
                //触发类型 item:数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
                trigger: 'item'
            },
            //图例组件
            legend: {
                //图例列表的布局朝向。'horizontal'  'vertical'
                show: false,
                orient: 'horizontal',
                // left: 'left',
                data: ['Global Map']
            },
            //视觉映射组件
            visualMap: {
                type: 'piecewise',
                pieces: [
                    { min: 10000000, max: 100000000, label: '≥10000000', color: '#372a28' },
                    { min: 5000000, max: 9999999, label: '5000-10000000', color: '#4e160f' },
                    { min: 1000000, max: 4999999, label: '1000000-5000000', color: '#974236' },
                    { min: 10000, max: 999999, label: '10000-1000000', color: '#ee7263' },
                    { min: 1, max: 9999, label: '1-10000', color: '#f5bba7' },
                ],
                //图元的颜色
                color: ['#E0022B', '#E09107', '#A3E00B'],
                orient: 'horizontal',
            },
            //工具栏
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    //系列名称，用于tooltip的显示
                    name: 'submit',
                    type: 'map',
                    map: 'world',

                    aspectScale:0.75,
                    left: 5, top: 20, right: 5, bottom: 0,
                    boundingCoords: [
                        // 定位左上角经纬度
                        [-180, 90],
                        // 定位右下角经纬度
                        [180, -90]
                    ],
                    //是否开启鼠标缩放和平移漫游,如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                    roam: true,
                    //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                    label: {
                        show: true,//是否显示标签。
                        color: 'rgb(249, 249, 249)'
                    },
                    data:allList
                }]
        })

    }



    render(props) {
        const pathname = this.props.history.location.pathname;
        let deFauLS = [];
        deFauLS.push(pathname);
        return (
            <Layout className="layout">
                <Header style={{backgroundColor:'#142850'}}>
                    {/*defaultSelectedKeys={['/']}*/}
                    <Menu theme="dark" mode="horizontal"  selectedKeys={deFauLS} style={{backgroundColor:'#142850'}}>
                        <Menu.Item key={'/'} >
                                <NavLink style={{textDecoration:'none',color:'white'}} to={"/"} >Home</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'/ShowData'} >
                            <NavLink style={{textDecoration:'none',color:'white'}} to={"/ShowData"} >Data Display</NavLink>
                        </Menu.Item>

                        <SubMenu key="/page1" title="Model Calculation">
                            <Menu.ItemGroup title="Model Calculation">
                                <Menu.Item key="/page1">
                                    <NavLink  to={"/page1"} style={{textDecoration:'none',color:'white'}}>Meeting</NavLink>
                                </Menu.Item>
                                <Menu.Item key="/page2">
                                    <NavLink  to={"/page2"} style={{textDecoration:'none',color:'white'}}>Area</NavLink>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        {/*<Menu.Item key={'/page'} >*/}
                        {/*    <NavLink  to={"/page"} style={{textDecoration:'none',color:'white'}}>Model Calculation</NavLink>*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px'}}>
                    <div className="content">
                        <div className="content_left">
                            <div id="worldMap" style={{height: 600, width: 830}}/>
                        </div>
                        <div className="content_right">
                            <div className="content_right_header">
                                <div className={'chart'}>
                                    <LineChart  width={500} height={280} margin={{top:5,right:5,left:5,bottom:5}}>
                                        <defs>
                                            <linearGradient id="color_con" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#47D6FF" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#47D6FF" stopOpacity={0.1}/>
                                            </linearGradient>
                                            <linearGradient id="color_dea" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#FF9B52" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#FF9B52" stopOpacity={0.1}/>
                                            </linearGradient>
                                            <linearGradient id="color_rec" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#50FF14" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#50FF14" stopOpacity={0.1}/>
                                            </linearGradient>
                                        </defs>
                                        <Line type="monotone" dataKey={'confirmed'} stroke="#47D6FF"  />
                                        <Line type="monotone" dataKey={'deaths'} stroke="#FF9B52"  />
                                        <Line type="monotone" dataKey={'recovered'} stroke="#50FF14"  />
                                        <XAxis dataKey={'last_update'} />
                                        <YAxis label={{ value: 'the number of people', angle: -90, position: 'insideLeft' }} />
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Tooltip />
                                        <Brush height={15}/>
                                        <Legend />
                                    </LineChart>
                                </div>
                            </div>
                            <div className="content_right_footer">待填</div>
                        </div>
                    </div>
                </Content>
                <Footer  className={'bb_2'} style={{ textAlign: 'center',}}>
                    地址：天津市西青区宾水西道399号
                    <br />
                    邮编：300387
                </Footer>
            </Layout>

        )
    }
}