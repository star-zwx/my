import React from 'react';
import {Button, Layout, message, Menu, Form,Descriptions} from 'antd';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Brush} from 'recharts';
import * as echarts from 'echarts';
import'./HomePage.css';
import ProForm, {
    ModalForm,
    ProFormText,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import TweenOne from 'rc-tween-one';

import {NavLink} from "react-router-dom";
import {color} from "echarts";

const {SubMenu} = Menu;
const { Header, Content,Footer } = Layout;

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

class HomePage extends React.Component{
    static defaultProps = {
        className: 'linked-animate-demo',
    };

    num = 1;// 背景点的个数

    onMouseMove = (e) => {
        const cX = e.clientX;
        const cY = e.clientY;
        const boxRect = this.box.getBoundingClientRect();
        const pos = this.state.data.map((item) => {
            const { x, y, radius } = item;
            return { x, y, distance: getDistance({ x: cX - boxRect.x, y: cY - boxRect.y }, { x, y }) - radius };
        }).reduce((a, b) => {
            if (!a.distance || a.distance > b.distance) {
                return b;
            }
            return a;
        });
        if (pos.distance < 60) {
            this.setState({
                tx: pos.x,
                ty: pos.y,
            });
        } else {
            this.onMouseLeave();
        }
    }

    onMouseLeave = () => {
        this.setState({
            tx: 0,
            ty: 0,
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            chenpin:[
                {
                    title:"",
                    content:"",
                    img:"",
                    char_data:[]
                }

            ],
            data: getPointPos(1500, 1050, this.num).map(item => ({
                ...item,
                opacity: Math.random() * 0.2 + 0.05,
                backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)},255,255)`,
            })),
            tx: 0,
            ty: 0,
        }
    }

    // 画图
    componentDidMount(){
        const{period_infection}= this.state
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('point'));
        window.onresize = myChart.resize;
        // 绘制图表
        myChart.setOption({
            // title: {
            //     text: 'ECharts 入门示例'
            // },
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['product', '人数概率分布'],
                    // ['第一天', 2,2,8],
                    // ['第二天', 1,2,6],
                    // ['第三天', 3,1,5],
                    // ['第四天', 3,2,9],
                    // ['第五天', 2,2,7],
                    // ['第六天', 6,2,9]
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        });
    }
    componentDidMount(){
        let myChart = echarts.init(document.getElementById('point'));
        var Xdata = [35,45,25,30,25,45,50,46,35,25];
        var Ydata = [];     //y轴数据
        var x = [];         //x轴数据
        var datt = {}

        function getRepeatNum(){
            var obj = {};
            for(var i= 0, l = Xdata.length; i< l; i++){
                var item = Xdata[i];
                obj[item] = (obj[item] +1 ) ||1;
            }
            return obj;
        }

        datt = getRepeatNum()
        console.log(datt)
        var i = 0;
        for (var p in datt ){

            x[i]= p;
            Ydata[i]= (datt[p]/Object.keys(datt).length);
            i=i+1;
        }
        console.log(Ydata)








        myChart.setOption({
            // title: {
            //     text: 'Stacked Line'
            // },


            backgroundColor:'#b3ecef',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['人数概率分布']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                name :'感染人数(人)',
                axisLine:{lineStyle:{
                        color: "#912CEE"
                    },
                },

                nameLocation :'middle',
                nameGap:22,
                data: x,

            },
            yAxis: {
                type: 'value',
                boundaryGap: false,
                name :'频率',
                axisLine:{lineStyle:{
                        color: "#d01f49"
                    },
                },
                nameLocation :'middle',
                nameGap:25,
            },
            series: [
                {
                    name: '人数概率分布',
                    type: 'line',
                    stack: 'Total',
                    data: Ydata,
                },

            ]
        });
    }
    // 画图结束

    /* 折线图从后台获取数据*/
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       data1: [],
    //       data2: []
    //     }
    //   }
    // componentDidMount() {
    //     /*
    //     * 页面加载时从后台获取数据
    //     */
    //     this.getData();
    //   }
    //
    //   getData() { //请求数据函数
    //     fetch('请求路径', {
    //       method: 'GET'
    //     }).then(res => res.json()).then(
    //       data => {
    //         this.setState({
    //           data1: data.data1,
    //           data2: data.data2
    //         })
    //
    //         this.demo()
    //       }
    //     )
    //   }

    render(){
        const { className } = this.props;
        const { data, tx, ty } = this.state;
        let test = []
        return (
            <div className={`${className}-wrapper`}>
                <div
                    className={`${className}-box`}
                    ref={(c) => { this.box = c; }}
                    onMouseMove={this.onMouseMove}
                    onMouseLeave={this.onMouseLeave}
                >
                    {/*{data.map((item, i) => (*/}
                    {/*    <Point {...item} tx={tx} ty={ty} key={i.toString()} className={`${className}-block`} />*/}
                    {/*))}*/}
                </div>
                <Layout>

                    <Header style={{backgroundColor:'#142850'}}>
                        <Menu theme="dark" mode="horizontal" style={{backgroundColor:'#142850'}}>
                            <Menu.Item key={'/'} >
                                <NavLink style={{textDecoration:'none',color:'white'}} to={"/"} >Home</NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/ShowData'} >
                                <NavLink style={{textDecoration:'none',color:'white'}} to={"/ShowData"} >Data Display</NavLink>
                            </Menu.Item>
                            <SubMenu key="/page" title="Model Calculation">
                                <Menu.ItemGroup title="     ">
                                    <Menu.Item key="/page1">
                                        <NavLink  to={"/page1"} style={{textDecoration:'none',color:'white'}}>Meeting</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="/page2">
                                        <NavLink  to={"/page2"} style={{textDecoration:'none',color:'white'}}>Area</NavLink>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Layout className={'aa'}>
                        <Content > {/* style={{"border":"solid red"}} */}
                            <div style={{ background: '00909e', padding: 1, paddingTop:4, minHeight: 0 }}>
                                <div style={{position:"absolute",left:"20px",top:"70px",height:"100px",width:"20px"}}>
                                    <h1 style={{fontSize:"15px",paddingTop:10,color:'white'}}>Variation parameters</h1>
                                </div>
                                <div className={'aa_0'} >
                                    <Form
                                    trigger={
                                            <Button type="primary" style={{position:"absolute", right:"1.3%", top:"7%",backgroundColor:'#1d5fcb',border:'#11cbd7 solid'}}>
                                                <PlusOutlined />
                                                Add
                                            </Button>
                                        }
                                        modalProps={{
                                            onCancel: () => console.log('run'),
                                        }}
                                        onFinish={async (values) => {
                                            await waitTime(1000);
                                            console.log(JSON.stringify(values));
                                            await fetch("http://127.0.0.1:8000/hello/", {
                                                method: "post",
                                                headers: {
                                                    'Accept':'application/json',
                                                    'Content-Type':'application/json',
                                                },
                                                body:JSON.stringify(values)//将values转换成json字符串
                                            });
                                            fetch("http://127.0.0.1:8000/back/", {
                                                method: "post",
                                                headers: {
                                                    'Accept':'application/json',
                                                    'Content-Type':'application/json',
                                                },
                                                body:JSON.stringify(values)
                                            }).then(res =>{
                                                return res.text()
                                            }).then(data =>{
                                                let temp = JSON.parse(data)
                                                console.log(temp.fields)
                                            })
                                            message.success('Submitted successfully');
                                            return true;
                                        }}
                                    >
                                        <ProForm.Group >
                                            <ProFormText width="md" name="a" label="Number of meetings" placeholder="100"/>
                                            <ProFormText width="md" name="b" label="Seat spacing" placeholder="1"/>
                                            <ProFormText width="md" name="c" label="Venue width" placeholder="50"/>

                                        </ProForm.Group>
                                        <ProForm.Group >
                                            <ProFormText width="md" name="d" label="Field curator" placeholder="50"/>
                                            <ProFormText width="md" name="e" label="Number of possible patients" placeholder="3"/>
                                        </ProForm.Group>
                                        <ProForm.Group >
                                            <ProFormText width="420px" name="f" label="Meeting schedule" placeholder="['09:00:00','10:00:00','10:30:00','12:00:00','14:00:00','16:00:00']"/>
                                            <ProFormText width="md" name="g" label="Meeting status" placeholder="[0, 1, 0, 1, 0]"/>
                                        </ProForm.Group>
                                        <div>
                                            <button type="primary" style={{position:"absolute", right:"1.3%", top:"7%",backgroundColor:'rgba(66,135,208,0.89)',border:'rgba(66,135,208,0.89) solid',color:"white"}}>
                                                确 认
                                            </button>
                                        </div>
                                    </Form>
                                </div>

                            </div>
                            <div className={'aa_1'} style={{padding: 1, minHeight: 0 }}>

                                <ModalForm
                                    title="Enter a new set of data"
                                    trigger={
                                        <Button type="primary" style={{position:"absolute",right:"1.3%",top:"11%",backgroundColor:'rgba(66,135,208,0.89)',border:'rgba(66,135,208,0.89) solid'}}>
                                            <PlusOutlined />
                                            Add
                                        </Button>
                                    }
                                    modalProps={{
                                        onCancel: () => console.log('run'),
                                    }}
                                    onFinish={async (values) => {
                                        const _this=this;
                                        await waitTime(1500);
                                        console.log(JSON.stringify(values));
                                        await fetch("http://127.0.0.1:8000/hello/", {
                                            method: "post",
                                            headers: {
                                                'Accept':'application/json',
                                                'Content-Type':'application/json',
                                            },
                                            body:JSON.stringify(values)
                                        });
                                        fetch("http://127.0.0.1:8000/back/", {
                                            method: "post",
                                            headers: {
                                                'Accept':'application/json',
                                                'Content-Type':'application/json',
                                            },
                                            body:JSON.stringify(values)
                                        }).then(res =>{
                                            return res.text()
                                        }).then(data =>{
                                            console.log(typeof(data))
                                            // console.log(data);
                                            let data0=data.split("]");
                                            // console.log(Object.prototype.toString.call(data0));
                                            let data01=data0[0].replace(/\[/g,'');
                                            // console.log(data01);
                                            let data02=data01.split("}},");

                                            // console.log(JSON.parse(data02));
                                            let temp = JSON.parse(data02)
                                            console.log(temp.fields.period_infection[2],temp.fields.period_infection[4])

                                            for(let x=0,y=0;x<12;x=x+2){
                                                test[y] = Math.round(temp.fields.period_infection[x])
                                                y++
                                            }
                                            console.log(test)
                                            _this.setState({
                                                period_infection:temp.fields.period_infection,
                                                total_infection:temp.fields.total_infection
                                            });
                                        });
                                        message.success('Submitted successfully');
                                        return true;
                                    }}
                                >
                                    <ProForm.Group >
                                        <ProFormText width="md" name="i" label="Limit time of single conversation (seconds)" placeholder="480"/>
                                        <ProFormText width="md" name="j" label="Conversation limit" placeholder="3"/>
                                        <ProFormText width="md" name="k" label="Conversation rate" placeholder="0.3"/>
                                        <ProFormText width="md" name="l" label="Movement rate" placeholder="0.3"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="m" label="Number of seat rows" placeholder="10"/>
                                        <ProFormText width="md" name="n" label="Conversation distance" placeholder="0.5"/>
                                        <ProFormText width="md" name="o" label="contact distance" placeholder="1"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="p" label="Moving radius" placeholder="0.3"/>
                                        <ProFormText width="md" name="q" label="Scale abscissa position" placeholder="10"/>
                                        <ProFormText width="md" name="r" label="Ruler ordinate position" placeholder="10"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="s" label="Mask wearing rate" placeholder="0.7"/>
                                        <ProFormText width="md" name="t" label="Vaccination rate" placeholder="0.7"/>
                                        <ProFormText width="md" name="u" label="Vector infection factor" placeholder="0.2"/>
                                        <ProFormText width="md" name="v" label="Basic infection rate" placeholder="0.7"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="w" label="Conference infection factor" placeholder="0.3"/>
                                        <ProFormText width="md" name="x" label="Vaccine efficiency" placeholder="0.75"/>
                                        <ProFormText width="md" name="y" label="Meeting time step" placeholder="4"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="z" label="Infectious factors of susceptible persons wearing masks" placeholder="0.33"/>
                                        <ProFormText width="md" name="A" label="Infectious factors of communicators wearing masks" placeholder="0.056"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="B" label="Both parties wear masks and infection factors" placeholder="0.017"/>
                                        <ProFormText width="md" name="C" label="Contact time control factor" placeholder="120"/>
                                    </ProForm.Group>
                                </ModalForm>
                                <div style={{color:'white'}}>
                                    <Descriptions bordered>
                                        <Descriptions.Item style={{color:'white',backgroundColor:'rgba(14,62,128,0.78)'}} label="period_infection">{this.state.period_infection}</Descriptions.Item>
                                        <Descriptions.Item style={{color:'white',backgroundColor:'rgba(14,62,128,0.78)'}} label="total_infection">{this.state.total_infection}</Descriptions.Item>
                                    </Descriptions>
                                </div>
                            </div>

                        </Content>
                        {/*<Button size={"large"} type={"primary"} style={{width:"20%",margin:"1% auto",backgroundColor:'#11cbd7',border:'#11cbd7 solid'}} onClick={this.draw_chart.bind(this)}>显示图像</Button>*/}
                        <div className={'char_mid1'}>
                            <div id="point" style={{height: 510, width:900,position:"absolute",left:'19%',top:'35%'}} />
                        </div>
                    </Layout>
                    <Footer className={'bb'} style={{ textAlign: 'center'}}>
                        地址：天津市西青区宾水西道399号
                        <br />
                        邮编：300387
                    </Footer>
                </Layout>
            </div>
        );
    }

}
class GridLayout {
    constructor(rect, width, height) {
        this.gridX = Math.floor(width / rect);
        this.gridY = Math.floor(height / rect);
        this.cellWidth = width / this.gridX;
        this.cellHeight = height / this.gridY;
        this.grid = [];
        for (let i = 0; i < this.gridY; i += 1) {
            this.grid[i] = [];
            for (let s = 0; s < this.gridX; s += 1) {
                this.grid[i][s] = [];
            }
        }
    }

    getCells = (e) => {
        const gridArray = [];
        const w1 = Math.floor((e.x - e.radius) / this.cellWidth);
        const w2 = Math.ceil((e.x + e.radius) / this.cellWidth);
        const h1 = Math.floor((e.y - e.radius) / this.cellHeight);
        const h2 = Math.ceil((e.y + e.radius) / this.cellHeight);
        for (let c = h1; c < h2; c += 1) {
            for (let l = w1; l < w2; l += 1) {
                gridArray.push(this.grid[c][l]);
            }
        }
        return gridArray;
    }

    hasCollisions = t => (
        this.getCells(t).some(e => e.some(v => this.collides(t, v)))
    )

    collides = (t, a) => {
        if (t === a) {
            return false;
        }
        const n = t.x - a.x;
        const i = t.y - a.y;
        const r = t.radius + a.radius;
        return n * n + i * i < r * r;
    }

    add = (value) => {
        this.getCells(value).forEach((item) => {
            item.push(value);
        });
    }
}

const getPointPos = (width, height, length) => {
    const grid = new GridLayout(150, width, height);
    const posArray = [];
    const num = 1;
    const radiusArray = [20, 35, 60];
    for (let i = 0; i < length; i += 1) {
        let radius;
        let pos;
        for(let j =0; j< num; j+=1) {
            radius = radiusArray[Math.floor(Math.random() * radiusArray.length)];
            pos = { x: Math.random() * (width - radius * 2) + radius, y: Math.random() * (height - radius * 2) + radius, radius };
            if (!grid.hasCollisions(pos)) {
                break;
            }
        }
        posArray.push(pos);
        grid.add(pos);
    }
    return posArray;
};

const getDistance = (t, a) => (Math.sqrt((t.x - a.x) * (t.x - a.x) + (t.y - a.y) * (t.y - a.y)));


//气泡
// class Point extends React.PureComponent {
//     render() {
//         const { tx, ty, x, y, opacity, backgroundColor, radius, ...props } = this.props;
//         let transform;
//         let zIndex = 0;
//         let animation = {
//             y: (Math.random() * 2 - 1) * 20 || 15,
//             duration: 3000,
//             delay:Math.random() * 1000,
//             yoyo: true,
//             repeat: -1,
//         };
//         if (tx && ty) {
//             if (tx !== x && ty !== y) {
//                 const distance = getDistance({ x, y }, { x: tx, y: ty });
//                 const g = Math.sqrt(2000000 / (0.1 * distance * distance));
//                 transform = `translate(${g * (x - tx) / distance}px, ${g * (y - ty) / distance}px)`;
//             } else if (tx === x && ty === y) {
//                 transform = `scale(${80 / radius})`;
//                 animation = { y: 0, yoyo: false, repeat: 0, duration: 300 };
//                 zIndex = 1;
//             }
//         }
//         return (
//             <div
//                 style={{
//                     left: x - radius,
//                     top: y - radius,
//                     width: radius * 1.8,
//                     height: radius * 1.8,
//                     opacity,
//                     zIndex,
//                     transform,
//                 }}
//                 {...props}
//             >
//                 <TweenOne
//                     animation={animation}
//                     style={{
//                         backgroundColor,
//                     }}
//                     className={`${this.props.className}-child`}
//                 />
//             </div>
//
//         );
//     }
// }

export default HomePage;