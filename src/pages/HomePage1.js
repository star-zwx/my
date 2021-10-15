import React from 'react';  //导入‘react’文件里export的一个默认的组件
import {Button, Layout, Table, message, Menu} from 'antd'; //导入antd文件中的button等组件
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {Tooltip as Tooltips} from 'antd';//导入antd文件中的Tooltip as Tooltips等组件
import { ExclamationCircleOutlined } from '@ant-design/icons';//导入@ant-design/icons文件中的ExclamationCircleOutlined组件
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label,Brush} from 'recharts';
import'./HomePage.css';     //导入同级文件夹中的css文件
import ProForm, {
    ModalForm,
    ProFormText,
} from '@ant-design/pro-form';//导入@ant-design/pro-form文件中的ModalForm,等组件
import { PlusOutlined } from '@ant-design/icons';
import TweenOne from 'rc-tween-one';
import { withRouter } from "react-router-dom";

// import Footer from "rc-table/es/Footer";
// import { createBrowserHistory } from 'history';
import {Link, NavLink} from "react-router-dom";

// const history = createBrowserHistory();
const { SubMenu } = Menu;
const { Header, Content,Footer } = Layout;  //  一个嵌套了header、content、footer的布局容器

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
let char_data=[];       //  声明数组char_data且仅在此代码块内有效
const tips=<div className={'tip'}>
    <p>Status 2: not isolated, latent, asymptomatic, non infectious, tested positive, exposed</p>
    <p>Status 3: not isolated, asymptomatic, infectious, positive, contact</p>
    <p>Status 4: not isolated, symptomatic, infectious, positive, contact</p>
    <p>Status 10: the individual who becomes infected and returns to normal has immune ability</p>
    <p>Status 11: Dead individual</p>
</div>;
var columns = [
    {
        title: 'Minimum family population',
        dataIndex: 'service',
        className:'font1',
    },                          //用react和antd和table实现列表功能
    {
        title: 'Maximum family population',
        dataIndex: 'money',
        className:'font1',
    },
    {
        title: 'Home network activity',
        dataIndex: 'card_number',
        className:'font1',
    },
    {
        title: 'Public network activity',
        dataIndex: 'name',
        className:'font1',
    },
    {
        title: 'Contact degree',
        dataIndex: 'phone',
        className:'font1',
    },
    {
        title: 'Reconnection rate',
        dataIndex: 'project',
        className:'font1',
    },
    {
        title: 'Public network number',
        dataIndex: 'shop_guide',
        className:'font1',
    },
    {
        title: 'Initial vacancy rate',
        dataIndex: 'teacher',
        className:'font1',
    },
];

var columns_2 = [
    {
        title: 'Confirmed index growth rate',  //新开，续卡
        dataIndex: 'service',
        className:'font2',
    },                         //用react和antd和table实现列表功能
    {
        title: 'Confirmation rate in the first 15 days',
        dataIndex: 'money',
        className:'font2',
    },
    {
        title: 'Diagnosis rate after 15 days',
        dataIndex: 'card_number',
        className:'font2',
    },
    {
        title: 'Initial diagnosis rate',
        dataIndex: 'name',
        className:'font2',
    },
    {
        title: 'Fastest diagnosis rate',
        dataIndex: 'phone',
        className:'font2',
    },
    {
        title: 'Current diagnosis rate',
        dataIndex: 'project',
        className:'font2',
    },
    {
        title: 'Probability of successful contact infection',
        dataIndex: 'shop_guide',
        className:'font2',
    },
    {
        title: 'Asymptomatic exposure rate regulator without isolation',
        dataIndex: 'teacher',
        className:'font2',
    },
    {
        title: 'Asymptomatic exposure rate modulator in isolated situations',
        dataIndex: 'financial',        className:'font2',
    },
    {
        title: 'Isolation time ',
        dataIndex: 'remarks1',        className:'font2',
    },
    {
        title: 'Asymptomatic rate of migration',
        dataIndex: 'collect_money',        className:'font2',
    },
    {
        title: 'Symptomatic rate of migration',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'Latent rate of migration',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'Initial nucleic acid detection confirmation rate',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'The probability of finding close contacts through one level of search',
        dataIndex: 'remarks2',        className:'font2',
    },

];
let columns_2_2=[
    {
        title: 'The probability of finding close contacts through two level of search',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'recovery rate',
        dataIndex: 'remarks2',        className:'font2',
    },          //用react和antd和table实现列表功能
    {
        title: 'mortality rate',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'Release the number of individuals with symptoms',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'The transition rate from latent state 2 to 3',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'The transition rate from latent state 2 to 4',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'The transition rate from latent state 2 to 10',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'The transition rate from latent state 3 to 4',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'The transition rate from latent state 3 to 10',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'The transition rate from latent state 4 to 11',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'Quarantine check date 1',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'Quarantine check date 2',
        dataIndex: 'remarks2',        className:'font2',
    },
    {
        title: 'Quarantine check date 3',
        dataIndex: 'remarks2',        className:'font2',
    },];
var columns_3 = [
    {
        title: 'District Headcount',  //新开，续卡
        dataIndex: 'service',
        className:'font3',
    },
    {
        title: 'Simulation days',
        dataIndex: 'money',
        className:'font3',
    },
    {
        title: 'Update frequency',
        dataIndex: 'card_number',
        className:'font3',
    },
    {
        title: 'Effective contact time',
        dataIndex: 'name',
        className:'font3',
    },
];

class HomePage extends React.Component{
    state = {
        showInfoDialog: false, //显示添加对话框
        editingItem: null, //对话框编辑的内容
        mData: [], //table里的数据
        show_back: "none", //是否显示“back”
    };

    static defaultProps = {
        className: 'linked-animate-demo',
    };

    num = 50;// 点的个数



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

    draw_chart=()=>{
        fetch("http://127.0.0.1:8000/back/",{
            method:"post",
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Content-type':'application/x-www-form-urlencoded'
            },
            body:" "
        })
            .then(res =>{
                return res.text()
            })
            .then(data => {
                // console.log(data);
                let data0=data.split("]");
                // console.log(Object.prototype.toString.call(data0));
                let data01=data0[0].replace(/\[/g,'');
                // console.log(data01);
                let data02=data01.split("}},");
                let temp,a=[];
                // console.log(JSON.parse(data02));
                for (let i=0;i<data02.length;i++){
                    if(i!==data02.length-1){
                        temp=data02[i]+"}}"
                    }
                    a[i]=JSON.parse(temp).fields
                }
                console.log(a[a.length-1]);
                this.setState({
                    char_data:a
                })
            })
    };

    toH(){
        this.props.history.push('/');
    }
    render(){
        const pathname = this.props.history.location.pathname;
        const { className } = this.props;
        const { data, tx, ty } = this.state;
        let defaulS = [];
        defaulS.push(pathname);
        console.log(defaulS);
        return (
            <div className={`${className}-wrapper`}>
                <div
                    className={`${className}-box`}
                    ref={(c) => { this.box = c; }}
                    onMouseMove={this.onMouseMove}
                    onMouseLeave={this.onMouseLeave}
                >
                    {data.map((item, i) => (
                        <Point {...item} tx={tx} ty={ty} key={i.toString()} className={`${className}-block`} />
                    ))}
                </div>
                <Layout>

                    <Header style={{backgroundColor:'#142850'}}>
                        <Menu theme="dark" mode="horizontal" selectedKeys={defaulS} style={{backgroundColor:'#142850'}}>
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
                        </Menu>
                    </Header>
                    <Layout className={'aa'}>
                        <Content > {/* style={{"border":"solid red"}} */}
                            <div style={{ background: '00909e', padding: 1, paddingTop:4, minHeight: 0 }}>
                                <div style={{position:"absolute",left:"18px",top:"70px",height:"100px",width:"40px"}}>
                                    <h1 style={{fontSize:"12px",paddingTop:8,color:'white'}}>Network part parameters</h1>
                                </div>
                                <ModalForm
                                    title="Enter a new set of data"
                                    trigger={
                                        <Button type="primary" style={{position:"absolute", right:"1.3%", top:"7%",backgroundColor:'#11cbd7',border:'#11cbd7 solid'}}>
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
                                            body:JSON.stringify(values)
                                        });
                                        message.success('Submitted successfully');
                                        return true;
                                    }}
                                >
                                    <ProForm.Group>
                                        <ProFormText width="md" name="a" label="Minimum family population" placeholder="1"/>
                                        <ProFormText width="md" name="b" label="Maximum family population" placeholder="5"/>
                                        <ProFormText width="md" name="c" label="Home network activity" placeholder="1"/>
                                        <ProFormText width="md" name="d" label="Public network activity" placeholder="1"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="e" label="Contact degree" placeholder="10"/>
                                        <ProFormText width="md" name="f" label="Reconnection rate" placeholder="0.2"/>
                                        <ProFormText width="md" name="g" label="Public network number" placeholder="200"/>
                                        <ProFormText width="md" name="h" label="Initial vacancy rate" placeholder="160"/>
                                    </ProForm.Group>
                                </ModalForm>
                                <Table  style={{width:"1300px",margin:"0 0 0 110px"}}
                                        columns={columns}
                                    // dataSource={data}
                                        pagination={{ pageSize: 20 }}
                                        scroll={{ y: 0 }}/>
                            </div>
                            <div style={{padding: 1, minHeight: 0 }}>
                                <div style={{position:"absolute",left:"10px",top:"325px",height:"100px",width:"40px"}}>
                                    <h1 style={{fontSize:"12px",position:"absolute",left:"10px",color:'white'}}>State part parameters</h1>
                                </div>
                                <ModalForm
                                    title="Enter a new set of data"
                                    trigger={
                                        <Button type="primary" style={{position:"absolute", right:"1.3%",top:"21%",backgroundColor:'#11cbd7',border:'#11cbd7 solid'}}>
                                            <PlusOutlined />
                                            Add
                                        </Button>
                                    }
                                    modalProps={{
                                        onCancel: () => console.log('run'),
                                    }}
                                    onFinish={async (values) => {
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
                                        message.success('Submitted successfully');
                                        return true;
                                    }}
                                >
                                    <ProForm.Group>
                                        <ProFormText width="md" name="i" label="Confirmed index growth rate" placeholder="0.5"/>
                                        <ProFormText width="md" name="j" label="Confirmation rate in the first 15 days" placeholder="0.4"/>
                                        <ProFormText width="md" name="k" label="Diagnosis rate after 15 days" placeholder="0.4"/>
                                        <ProFormText width="md" name="l" label="Initial diagnosis rate" placeholder="0.1"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="m" label="Fastest diagnosis rate" placeholder="0.5"/>
                                        <ProFormText width="md" name="n" label="Current diagnosis rate" placeholder="0"/>
                                        <ProFormText width="md" name="o" label="Probability of successful contact infection" placeholder="0.471"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="p" label="Asymptomatic exposure rate regulator without isolation" placeholder="0.6701"/>
                                        <ProFormText width="md" name="q" label="Asymptomatic exposure rate modulator in isolated situations" placeholder="0.5"/>
                                        <ProFormText width="md" name="r" label="Isolation time" placeholder="14"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="s" label="Asymptomatic rate of migration" placeholder="0.01"/>
                                        <ProFormText width="md" name="t" label="Symptomatic rate of migration" placeholder="0.02"/>
                                        <ProFormText width="md" name="u" label="Latent rate of migration" placeholder="0.01"/>
                                        <ProFormText width="md" name="v" label="Initial nucleic acid detection confirmation rate" placeholder="0.5"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="w" label="The probability of finding close contacts through one level of search" placeholder="0"/>
                                        <ProFormText width="md" name="x" label="The probability of finding close contacts through two level of search" placeholder="0"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="y" label="recovery rate" placeholder="0.9"/>
                                        <ProFormText width="md" name="z" label="mortality rate" placeholder="0.1"/>
                                        <ProFormText width="md" name="A" label="Release the number of individuals with symptoms" placeholder="3"/>
                                        <ProFormText width="md" name="B" label="The transition rate from latent state 2 to 3" placeholder="0.2"/>
                                        <Tooltips title={tips}>
                                            <ExclamationCircleOutlined/>
                                        </Tooltips>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="C" label="The transition rate from latent state 2 to 4" placeholder="0.7"/>
                                        <ProFormText width="md" name="D" label="The transition rate from latent state 2 to 10" placeholder="0.0005"/>
                                        <ProFormText width="md" name="E" label="The transition rate from latent state 3 to 4" placeholder="0.8"/>
                                        <ProFormText width="md" name="F" label="The transition rate from latent state 3 to 10" placeholder="0.005"/>
                                    </ProForm.Group>
                                    <ProForm.Group>
                                        <ProFormText width="md" name="G" label="The transition rate from latent state 4 to 11" placeholder="0.0005"/>
                                        <ProFormText width="md" name="H" label="Quarantine check date 1" placeholder="1"/>
                                        <ProFormText width="md" name="I" label="Quarantine check date 2" placeholder="7"/>
                                        <ProFormText width="md" name="J" label="Quarantine check date 3" placeholder="14"/>
                                    </ProForm.Group>
                                </ModalForm>
                                <Table  style={{width:"1300px",margin:"0 0 0 110px"}}
                                        columns={columns_2}
                                        fontSize={"10px"}
                                        pagination={{ pageSize: 20 }}
                                        scroll={{ y: 0 }} />
                                <Table  style={{width:"1300px",margin:"0 0 0 110px"}}
                                        columns={columns_2_2}
                                        fontSize={"10px"}
                                        pagination={{ pageSize: 20 }}
                                        scroll={{ y: 0 }} />
                            </div>
                            <div style={{padding: 1.5, minHeight: 0 }}>
                                <div style={{position:"absolute",left:"18px",height:"95px",width:"80px"}}>
                                    <h1 style={{fontSize:"12px",paddingTop:5,color:'white'}}>Partial parameters of main model</h1>
                                </div>
                                <ModalForm
                                    title="Enter a new set of data"
                                    trigger={
                                        <Button type="primary" style={{position:"absolute", right:"1.3%",top:"33.2%",backgroundColor:'#11cbd7',border:'#11cbd7 solid'}}>
                                            <PlusOutlined />
                                            Add
                                        </Button>
                                    }
                                    modalProps={{
                                        onCancel: () => console.log('run'),
                                    }}
                                    onFinish={async (values) => {
                                        await waitTime(800);
                                        console.log(JSON.stringify(values));
                                        await fetch("http://127.0.0.1:8000/hello/", {
                                            method: "post",
                                            headers: {
                                                'Accept':'application/json',
                                                'Content-Type':'application/json',
                                            },
                                            body:JSON.stringify(values)
                                        });
                                        message.success('Submitted successfully');
                                        fetch("http://127.0.0.1:8000/back/",{
                                            method:"post",
                                            headers:{
                                                'Accept': 'application/json, text/plain, */*',
                                                'Content-type':'application/x-www-form-urlencoded'
                                            },
                                            body:" "
                                        })
                                            .then(res =>{
                                                return res.text()
                                            })
                                            .then(data => {
                                                // console.log(data);
                                                let data0=data.split("]");
                                                // console.log(Object.prototype.toString.call(data0));
                                                let data01=data0[0].replace(/\[/g,'');
                                                // console.log(data01);
                                                let data02=data01.split("}},");
                                                let temp,a=[];
                                                // console.log(JSON.parse(data02));
                                                for (let i=0;i<data02.length;i++){
                                                    if(i!==data02.length-1){
                                                        temp=data02[i]+"}}"
                                                    }
                                                    a[i]=JSON.parse(temp).fields
                                                }
                                                console.log(a[a.length-1]);
                                                this.setState({
                                                    char_data:a
                                                })
                                            })
                                        return true;

                                    }}
                                >
                                    <ProForm.Group>
                                        <ProFormText width="md" name="K" label="District Headcount" placeholder="200"/>
                                        <ProFormText width="md" name="L" label="Simulation days" placeholder="80"/>
                                        <ProFormText width="md" name="M" label="Update frequency" placeholder="1"/>
                                        <ProFormText width="md" name="N" label="Effective contact time" placeholder="15"/>
                                    </ProForm.Group>
                                </ModalForm>
                                <Table  style={{width:"1300px",margin:"0 0 0 110px"}}
                                        columns={columns_3}
                                        scroll={{ y: 0 }} />
                            </div>
                        </Content>
                        {/*<Button size={"large"} type={"primary"} style={{width:"20%",margin:"1% auto",backgroundColor:'#11cbd7',border:'#11cbd7 solid'}} onClick={this.draw_chart.bind(this)}>显示图像</Button>*/}
                        <div className={'char_mid1'}><LineChart
                            className={'char_mid2'}
                            width={1000}
                            height={600}
                            data={this.state.char_data}
                            margin={{
                                top: 5,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" label={{value:'date', position:"insideBottom"}} />
                            {/*<YAxis />*/}
                            <YAxis label={{ value: 'the number of people', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Brush height={15}/>
                            <Legend verticalAlign={"top"}/>
                            <Line type="monotone" dataKey="death" stroke="#FF3030" activeDot={{ r: 8 }} name={"Death"}/>
                            <Line type="monotone" dataKey="a" stroke="#FFEC8B" name={"Asymptomatic"}/>
                            <Line type="monotone" dataKey="s" stroke="#FF99AC" name={"Susceptible person"}/>
                            <Line type="monotone" dataKey="in_field" stroke="#6495FF" name={"Symptomatic"}/>
                            <Line type="monotone" dataKey="is_field" stroke="#32454F" name={"Isolators"}/>
                            <Line type="monotone" dataKey="r" stroke="#8B8989" name={"Recovery"}/>
                            <Line type="monotone" dataKey="c" stroke="#9D574f" name={"confirm"}/>
                            <Line type="monotone" dataKey="h" stroke="#9400D3" name={"Hide"}/>
                            <Line type="monotone" dataKey="total" stroke="#D02090" name={"Total"}/>
                        </LineChart></div>
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
    const num = 500;
    const radiusArray = [20, 35, 60];
    for (let i = 0; i < length; i += 1) {
        let radius;
        let pos;
        let j = 0;
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

class Point extends React.PureComponent {
    render() {
        const { tx, ty, x, y, opacity, backgroundColor, radius, ...props } = this.props;
        let transform;
        let zIndex = 0;
        let animation = {
            y: (Math.random() * 2 - 1) * 20 || 15,
            duration: 3000,
            delay:Math.random() * 1000,
            yoyo: true,
            repeat: -1,
        };
        if (tx && ty) {
            if (tx !== x && ty !== y) {
                const distance = getDistance({ x, y }, { x: tx, y: ty });
                const g = Math.sqrt(2000000 / (0.1 * distance * distance));
                transform = `translate(${g * (x - tx) / distance}px, ${g * (y - ty) / distance}px)`;
            } else if (tx === x && ty === y) {
                transform = `scale(${80 / radius})`;
                animation = { y: 0, yoyo: false, repeat: 0, duration: 300 };
                zIndex = 1;
            }
        }
        return (
            <div
                style={{
                    left: x - radius,
                    top: y - radius,
                    width: radius * 1.8,
                    height: radius * 1.8,
                    opacity,
                    zIndex,
                    transform,
                }}
                {...props}
            >
                <TweenOne
                    animation={animation}
                    style={{
                        backgroundColor,
                    }}
                    className={`${this.props.className}-child`}
                />
            </div>

        );
    }
}

// class LinkedAnimate extends React.Component {
//
//     render() {
//         return (
//
//
//
//         );
//     }
// }
//
// ReactDOM.render(
//
//     , mountNode);

export default HomePage;