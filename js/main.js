// 默认线条线型
var lineType = "solid";
// 默认线条颜色
var lineColor = "#000";
// 默认线条宽度
var lineWidth = 1;
// 点击线条圆点变量
var clickPoint = null;
// echarts图一变量
var myChart1 = null;
// echarts图二变量
var myChart2 = null;
// echarts图三变量
var myChart3 = null;
// echarts图一设置参数变量
var option1 = null;
// echarts图二设置参数变量
var option2 = null;
// echarts图三设置参数变量
var option3 = null;
// 外部数据变量
var Info = "";
// 转换后的数据变量
var jsonData = {};
// 瞬时值器官
var instantOrgans = [];
// 累计值器官
var totalOrgans = [];
//质点器官
var particleOrgans = [];
// 所有器官数据
var allDetails = [];
// 所有质点数据
var particleDetails = [];
// 预警值
var warning;
// 判断类型名称为剂量还是有效剂量
var firstName;
// 所有器官echart图表设置内容自定义变量
var item = {};
var item2 = {};
// 单独器官echart图表瞬时值、累计值设置内容自定义变量
var itemAloneShun = {};
var itemAloneLei = {};
// 提取公用方法
function publicFun(Info) {
	jsonData = JSON.parse(Info);
	// 主标题
	document.getElementById('main-title').innerHTML = jsonData.name;
	// 判断类型名称为剂量还是有效剂量
	firstName = jsonData.type === 0 ? '剂量' : '有效剂量';
	if (jsonData.type === 0) {
		document.getElementById('main-bar-third').style.display = 'none';
		document.getElementById('main-bar-second').style.display = 'none';
		// document.getElementById('main-bar-first').style.width = '700px';
		// document.getElementById('main-bar-first').style.height = '500px';
	} else {
		document.getElementById('main-bar-third').style.display = 'block';
		document.getElementById('main-bar-second').style.display = 'block';
	}
	// 器官数据内容
	var doseDatas = jsonData.dosevalue;
	// 质点数据
	var effictiveDatas = jsonData.effictivedose;
	// 预警值
	warning = jsonData.warning;
	// 获取器官属性内容
	doseDatas.forEach(element => {
		// 瞬时值
		var Instants = [];
		// 累计值
		var Totals = [];
		// 时间点
		var TimePoints = [];
		// x坐标
		var xAxis = [];
		// y坐标 
		var yAxis = [];
		// z坐标
		var zAxis = [];
		// 拐点数组
		var breakPoints = [];

		var obj = {};
		obj.name = element.name;

		element.value.forEach(element => {

			// 瞬时值数组
			var instant = element.realvalue;
			instant ? Instants.push(instant.toExponential(3)) : Instants.push(instant);

			// 累计值数组
			var total = element.total;
			total ? Totals.push(total.toExponential(3)) : Totals.push(total);

			// 时间点数组
			var points = element.time;
			points ? TimePoints.push(parseInt(points).toFixed(1)) : TimePoints.push(points);

			// x坐标数组
			var x = element.x;
			x ? xAxis.push(x.toFixed(2)) : xAxis.push(x);

			// y坐标数组
			var y = element.y;
			y ? yAxis.push(y.toFixed(2)) : yAxis.push(y);

			// z坐标数组
			var z = element.z;
			z ? zAxis.push(z.toFixed(2)) : zAxis.push(z);

			// 拐点数组
			var nodename = element.nodename;
			breakPoints.push(nodename);
		})
		obj.xAxis = xAxis;
		obj.yAxis = yAxis;
		obj.zAxis = zAxis;
		obj.TimePoints = TimePoints;
		obj.Totals = Totals;
		obj.Instants = Instants;
		obj.breakPoints = breakPoints;

		var iIndex = -1;
		for (var i = 0; i < allDetails.length; i++) {
			if (allDetails[i].name == obj.name) {
				iIndex = i;
			}
		}

		if (iIndex >= 0) {
			allDetails[iIndex].xAxis.push(obj.xAxis[0]);
			allDetails[iIndex].yAxis.push(obj.yAxis[0]);
			allDetails[iIndex].zAxis.push(obj.zAxis[0]);
			allDetails[iIndex].TimePoints.push(obj.TimePoints[0]);
			allDetails[iIndex].Totals.push(obj.Totals[0]);
			allDetails[iIndex].Instants.push(obj.Instants[0]);
			allDetails[iIndex].breakPoints.push(obj.breakPoints[0]);
		} else {
			allDetails.push(obj);
			instantOrgans.push(`${obj.name}瞬时值`);
			totalOrgans.push(`${obj.name}累计值`);
		}
	})
	// 获取质点所需数据属性
	effictiveDatas.forEach(element => {
		// 瞬时值
		var instantsParticle = [];
		// 累计值
		var totalsParticle = [];
		// 时间点
		var timePointsParticle = [];
		// x坐标
		var xAxisParticle = [];
		// y坐标 
		var yAxisParticle = [];
		// z坐标
		var zAxisParticle = [];
		// 拐点数组
		var breakPointsParticle = [];

		var objParticle = {};
		objParticle.name = element.name;

		element.value.forEach(element => {

			// 瞬时值数组
			var instant = element.realvalue;
			instant ? instantsParticle.push(instant.toExponential(3)) : instantsParticle.push(instant);

			// 累计值数组
			var total = element.total;
			total ? totalsParticle.push(total.toExponential(3)) : totalsParticle.push(total);

			// 时间点数组
			var points = element.time;
			points ? timePointsParticle.push(parseInt(points).toFixed(1)) : timePointsParticle.push(points);

			// x坐标数组
			var x = element.x;
			x ? xAxisParticle.push(x.toFixed(2)) : xAxisParticle.push(x);

			// y坐标数组
			var y = element.y;
			y ? yAxisParticle.push(y.toFixed(2)) : yAxisParticle.push(y);

			// z坐标数组
			var z = element.z;
			z ? zAxisParticle.push(z.toFixed(2)) : zAxisParticle.push(z);

			// 拐点数组
			var nodename = element.nodename;
			breakPointsParticle.push(nodename);
		})
		objParticle.xAxisParticle = xAxisParticle;
		objParticle.yAxisParticle = yAxisParticle;
		objParticle.zAxisParticle = zAxisParticle;
		objParticle.timePointsParticle = timePointsParticle;
		objParticle.totalsParticle = totalsParticle;
		objParticle.instantsParticle = instantsParticle;
		objParticle.breakPointsParticle = breakPointsParticle;

		var iIndex = -1;
		for (var i = 0; i < particleDetails.length; i++) {
			if (particleDetails[i].name == objParticle.name) {
				iIndex = i;
			}
		}

		if (iIndex >= 0) {
			particleDetails[iIndex].xAxisParticle.push(objParticle.xAxisParticle[0]);
			particleDetails[iIndex].yAxisParticle.push(objParticle.yAxisParticle[0]);
			particleDetails[iIndex].zAxisParticle.push(objParticle.zAxisParticle[0]);
			particleDetails[iIndex].timePointsParticle.push(objParticle.timePointsParticle[0]);
			particleDetails[iIndex].totalsParticle.push(objParticle.totalsParticle[0]);
			particleDetails[iIndex].instantsParticle.push(objParticle.instantsParticle[0]);
			particleDetails[iIndex].breakPointsParticle.push(objParticle.breakPointsParticle[0]);
		} else {
			particleDetails.push(objParticle);
			particleOrgans.push(`${objParticle.name}瞬时值`, `${objParticle.name}累计值`);
		}
	})
	callbackJson(Info);

	myChart1.setOption({
		series: UpdateGetSeriesAllShun().concat(UpdateGetSeriesAllLei()),
		xAxis: [{
				type: 'category',
				boundaryGap: false,
				splitLine: {
					show: true
				}, //去除网格线
			},
			// 新增双向坐标
			{
				gridIndex: 1,
				type: 'category',
				boundaryGap: false,
				axisLine: {
					onZero: true
				},
				splitLine: {
					show: true
				}, //去除网格线
				position: 'top'
			}
		],
	});

	myChart2.setOption({
		series: UpdateGetSeriesAloneInstants(),
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			splitLine: {
				show: true
			}, //去除网格线
		}],
	});

	myChart3.setOption({
		series: UpdateGetSeriesAloneTotals(),
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			splitLine: {
				show: true
			}, //去除网格线
		}],
	});
	// 更新echarts图表内容
	if (myChart1) {
		myChart1.setOption(option1);
	}
	if (myChart2) {
		myChart2.setOption(option2);
	}
	if (myChart3) {
		myChart3.setOption(option3);
	}
}

// 新增数据操作
function UpdateTable(Info) {
	if (!Info) {
		Info = `{
			"name" : "Dose Assessment",
			"type" : 1,
			"warning" : 50.0,
			"dosevalue" : 
			[
				{
					"name" : "Brain",
					"value" : 
					[
						{
							"realvalue" : 7.0,
							"time" : 10.0,
							"total" : 5.0,
							"x" : 10.997127532958984,
							"y" : 61.937725067138672,
							"z" : -34.229412078857422
						}
					]
				},
				{
					"name" : "Eyes",
					"value" : 
					[
						{
							"realvalue" : 8.0,
							"time" : 20.0,
							"total" : 10.0,
							"x" : 10.997127532958984,
							"y" : 61.937725067138672,
							"z" : -34.229412078857422
						}
					]
				},
				{
					"name" : "Heart",
					"value" : 
					[
						{
							"realvalue" : 13.0,
							"time" : 30.0,
							"total" : 16.0,
							"x" : 10.997127532958984,
							"y" : 61.937725067138672,
							"z" : -34.229412078857422
						}
					]
				}
			],
			"effictivedose" : 
			[
				{
					"name" : "质点1",
					"value" : [
						{
							"realvalue" : 7.0,
							"time" : 10.0,
							"total" : 3.0,
							"x" : 10.997127532958984,
							"y" : 61.937725067138672,
							"z" : -34.229412078857422
						}
					]
				},
				{
					"name" : "质点2",
					"value" : [
						{
							"realvalue" : 2.0,
							"time" : 20.0,
							"total" : 4.0,
							"x" : 15.997127532958984,
							"y" : 75.937725067138672,
							"z" : -22.229412078857422
						}
					]
				},
				{
					"name" : "质点3",
					"value" : [
						{
							"realvalue" : 6.0,
							"time" : 30.0,
							"total" : 8.0,
							"x" : 15.997127532958984,
							"y" : 75.937725067138672,
							"z" : -22.229412078857422
						}
					]
				}
			]
		}`;
	};
	publicFun(Info);
}

function Clear() {
	allDetails.length = 0;
	particleDetails.length = 0;
}

function CreateTable(Info) {
	allDetails.length = 0;
	particleDetails.length = 0;
	publicFun(Info);
}
// 器官瞬时值series方法
function getSeries() {
	var seriesInit = [];
	allDetails.forEach((element) => {
		var item = {
			name: `${element.name}瞬时值`,
			smooth: true,
			type: 'line',
			itemStyle: {
				normal: {
					color: lineColor, //改变折线点的颜色
					borderWidth: 1,
					lineStyle: {
						color: lineColor, //改变折线颜色
						type: lineType,
						width: Number(lineWidth),
					},
					// 新增拐点数据着重显示方法
					label: {
						show: true,
						formatter: function (param) {
							var datas = element;
							var labVal = datas.breakPoints[param.dataIndex];
							currentValue = param.value;
							if (labVal && labVal != undefined) {
								currentValue = labVal;
							} else {
								currentValue = '';
							}
							return currentValue;
						},
						textStyle: { //拐点上标字体大小颜色
							color: '#1E90FF',
							fontSize: '10',
							opacity: 0,
						},
					},
				},
			},
			data: element.Instants,
			symbolSize: 8,
			barWidth: '30px',
			barGap: '0',
			// 图例配置
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var datas = element;
					var relVal = `${datas.name}瞬时值<hr/>
								x : ${datas.xAxis[params.dataIndex]}<br/>
								y : ${datas.yAxis[params.dataIndex]}<br/>
								z : ${datas.zAxis[params.dataIndex]}<br/>
								时间点 : ${datas.TimePoints[params.dataIndex]} s<br/>
								瞬时值: ${datas.Instants[params.dataIndex]} mSv/h<br/>`;
					return relVal;
				}
			}
		};
		seriesInit.push(item);
	})
	return seriesInit;
}
// 器官累计值series方法
function getSeriesLei() {
	var seriesLei = [];
	allDetails.forEach((element) => {
		var item2 = {
			name: `${element.name}累计值`,
			smooth: true,
			type: 'line',
			itemStyle: {
				normal: {
					color: lineColor, //改变折线点的颜色
					borderWidth: 1,
					lineStyle: {
						color: lineColor, //改变折线颜色
						type: lineType,
						width: Number(lineWidth),
					},
					// 新增拐点数据着重显示方法
					label: {
						show: true,
						formatter: function (param) {
							var datas = element;
							var labVal = datas.breakPoints[param.dataIndex];
							currentValue = param.value;
							if (labVal && labVal != undefined) {
								currentValue = labVal;
							} else {
								currentValue = '';
							}
							return currentValue;
						},
						textStyle: { //拐点上标字体大小颜色
							color: '#1E90FF',
							fontSize: '10',
							opacity: 0,
						},
					},
				}
			},
			symbolSize: 8,
			hoverAnimation: true,
			data: element.Totals,
			barWidth: '30px',
			barGap: '0',
			// 图例配置
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var datas = element;
					var relVal = `${datas.name}累计值<hr/>
								x : ${datas.xAxis[params.dataIndex]}<br/>
								y : ${datas.yAxis[params.dataIndex]}<br/>
								z : ${datas.zAxis[params.dataIndex]}<br/>
								时间点 : ${datas.TimePoints[params.dataIndex]} s<br/>
								累计值: ${datas.Totals[params.dataIndex]} μSv<br/>`;
					return relVal;
				}
			}
		}
		seriesLei.push(item2);
	})
	return seriesLei;
}
// 质点瞬时值Series方法
function getSeriesParticle() {
	var seriesParticleInit = [];
	particleDetails.forEach((element) => {
		var item = {
			name: `${element.name}瞬时值`,
			smooth: true,
			type: 'line',
			itemStyle: {
				normal: {
					color: lineColor, //改变折线点的颜色
					borderWidth: 1,
					lineStyle: {
						color: lineColor, //改变折线颜色
						type: lineType,
						width: Number(lineWidth),
					},
					// 新增拐点数据着重显示方法
					label: {
						show: true,
						formatter: function (param) {
							var datas = element;
							var labVal = datas.breakPointsParticle[param.dataIndex];
							currentValue = param.value;
							if (labVal && labVal != undefined) {
								currentValue = labVal;
							} else {
								currentValue = '';
							}
							return currentValue;
						},
						textStyle: { //拐点上标字体大小颜色
							color: '#1E90FF',
							fontSize: '10',
							opacity: 0,
						},
					},
				},
			},
			data: element.instantsParticle,
			symbolSize: 8,
			barWidth: '30px',
			barGap: '0',
			// 图例配置
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var datas = element;
					var relVal = `${datas.name}瞬时值<hr/>
								x : ${datas.xAxisParticle[params.dataIndex]}<br/>
								y : ${datas.yAxisParticle[params.dataIndex]}<br/>
								z : ${datas.zAxisParticle[params.dataIndex]}<br/>
								时间点 : ${datas.timePointsParticle[params.dataIndex]} s<br/>
								瞬时值: ${datas.instantsParticle[params.dataIndex]} mSv/h<br/>`;
					return relVal;
				}
			}
		};
		seriesParticleInit.push(item);
	})
	return seriesParticleInit;
}
// 质点累计值Series方法
function getSeriesLeiParticle() {
	var seriesParticle = [];
	particleDetails.forEach((element) => {
		var item2 = {
			name: `${element.name}累计值`,
			smooth: true,
			type: 'line',
			itemStyle: {
				normal: {
					color: lineColor, //改变折线点的颜色
					borderWidth: 1,
					lineStyle: {
						color: lineColor, //改变折线颜色
						type: lineType,
						width: Number(lineWidth),
					},
					// 新增拐点数据着重显示方法
					label: {
						show: true,
						formatter: function (param) {
							var datas = element;
							var labVal = datas.breakPointsParticle[param.dataIndex];
							currentValue = param.value;
							if (labVal && labVal != undefined) {
								currentValue = labVal;
							} else {
								currentValue = '';
							}
							return currentValue;
						},
						textStyle: { //拐点上标字体大小颜色
							color: '#1E90FF',
							fontSize: '10',
							opacity: 0,
						},
					},
				}
			},
			xAxisIndex: 1,
			yAxisIndex: 1,
			symbolSize: 8,
			hoverAnimation: true,
			data: element.totalsParticle,
			barWidth: '30px',
			barGap: '0',
			// 图例配置
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var datas = element;
					var relVal = `${datas.name}累计值<hr/>
								x : ${datas.xAxisParticle[params.dataIndex]}<br/>
								y : ${datas.yAxisParticle[params.dataIndex]}<br/>
								z : ${datas.zAxisParticle[params.dataIndex]}<br/>
								时间点 : ${datas.timePointsParticle[params.dataIndex]} s<br/>
								累计值: ${datas.totalsParticle[params.dataIndex]} μSv<br/>`;
					return relVal;
				}
			}
		}
		seriesParticle.push(item2);
	})
	return seriesParticle;
}
// 新增所有器官瞬时值series方法
function UpdateGetSeriesAllShun() {
	var seriesAllShun = [];
	particleDetails.forEach((element) => {
		var item = {
			name: `${element.name}瞬时值`,
			smooth: true,
			type: 'line',
			symbolSize: 8,
			data: element.instantsParticle,
			barWidth: '30px',
			barGap: '0',
			// 图例配置
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var datas = element;
					var relVal = `${datas.name}瞬时值<hr/>
								x : ${datas.xAxis[params.dataIndex]}<br/>
								y : ${datas.yAxis[params.dataIndex]}<br/>
								z : ${datas.zAxis[params.dataIndex]}<br/>
								时间点 : ${datas.TimePoints[params.dataIndex]} s<br/>
								瞬时值: ${datas.Instants[params.dataIndex]} mSv/h<br/>
								累计值: ${datas.Totals[params.dataIndex]} μSv<br/>`;
					return relVal;
				}
			}
		};
		seriesAllShun.push(item);
	})
	return seriesAllShun;
}
// 新增所有器官累计值series方法
function UpdateGetSeriesAllLei() {
	var seriesAllLei = [];
	particleDetails.forEach((element) => {
		var item2 = {
			name: `${element.name}累计值`,
			smooth: true,
			type: 'line',
			symbolSize: 8,
			data: element.Totals,
			barWidth: '30px',
			barGap: '0',
			// 图例配置
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var datas = element;
					var relVal = `${datas.name}累计值<hr/>
								x : ${datas.xAxis[params.dataIndex]}<br/>
								y : ${datas.yAxis[params.dataIndex]}<br/>
								z : ${datas.zAxis[params.dataIndex]}<br/>
								时间点 : ${datas.TimePoints[params.dataIndex]} s<br/>
								瞬时值: ${datas.Instants[params.dataIndex]} mSv/h<br/>
								累计值: ${datas.Totals[params.dataIndex]} μSv<br/>`;
					return relVal;
				}
			}
		}
		seriesAllLei.push(item2);
	})
	return seriesAllLei;
}
// 新增单独器官瞬时值series方法
function UpdateGetSeriesAloneInstants() {
	var seriesInstants = [];
	allDetails.forEach((element) => {
		var itemAloneShun = {
			name: `${element.name}瞬时值`,
			smooth: true,
			type: 'line',
			symbolSize: 8,
			data: element.Instants,
			barWidth: '30px',
			barGap: '0',
			// 图例配置
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var datas = element;
					var relVal = `${datas.name}瞬时值<hr/>
								x : ${datas.xAxis[params.dataIndex]}<br/>
								y : ${datas.yAxis[params.dataIndex]}<br/>
								z : ${datas.zAxis[params.dataIndex]}<br/>
								时间点 : ${datas.TimePoints[params.dataIndex]} s<br/>
								瞬时值: ${datas.Instants[params.dataIndex]} mSv/h<br/>`;
					return relVal;
				}
			}
		};
		seriesInstants.push(itemAloneShun);
	})
	return seriesInstants;
}
// 新增单独器官累计值series方法
function UpdateGetSeriesAloneTotals() {
	var seriesTotals = [];
	allDetails.forEach((element) => {
		var itemAloneLei = {
			name: `${element.name}累计值`,
			smooth: true,
			type: 'line',
			symbolSize: 8,
			data: element.Totals,
			barWidth: '30px',
			barGap: '0',
			// 图例配置
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var datas = element;
					var relVal = `${datas.name}累计值<hr/>
								x : ${datas.xAxis[params.dataIndex]}<br/>
								y : ${datas.yAxis[params.dataIndex]}<br/>
								z : ${datas.zAxis[params.dataIndex]}<br/>
								时间点 : ${datas.TimePoints[params.dataIndex]} s<br/>
								累计值: ${datas.Totals[params.dataIndex]} μSv<br/>`;
					return relVal;
				}
			}
		};
		seriesTotals.push(itemAloneLei);
	})
	return seriesTotals;
}


// 剂量评估折线图
function callbackJson(Info) {
	// 初始化图表
	if ((myChart1 || myChart2 || myChart3) != null && (myChart1 || myChart2 || myChart3) != "" && (myChart1 || myChart2 || myChart3) != undefined) {
		return;
	}
	myChart1 = echarts.init(document.getElementById("main-bar-first"));
	myChart2 = echarts.init(document.getElementById("main-bar-second"));
	myChart3 = echarts.init(document.getElementById("main-bar-third"));
	option1 = {
		title: {
			text: firstName,
			left: 'center',
			top: 2,
			textStyle: {
				color: "#1E90FF",
				fontSize: 16,
			},
		},
		grid: [{
			left: 80,
			right: 90,
			top: '57%',
			height: '30%'
		}, {
			left: 80,
			right: 90,
			top: '15%',
			height: '30%'
		}],
		legend: {
			data: particleOrgans,
			type: 'scroll',
			right: 0,
			top: 35,
			align: 'right',
			// bottom: 435,
			// 图例列表的布局朝向
			orient: "vertical",
			itemWidth: 20,
			itemHeight: 7,
			itemStyle: {
				color: lineColor,
			},
		},
		tooltip: {
			// 图例配置
			trigger: 'item',
		},
		// 鼠标hover时高亮样式
		emphasis: {
			label: {
				show: true,
			}
		},
		xAxis: [
			// 新增双向坐标
			{
				name: '时间/s',
				type: 'category',
				boundaryGap: false,
				nameGap: 45, //坐标轴与轴线之间的距离
				axisLine: {
					onZero: true
				},
				// 设置x轴显示问题
				data: particleDetails[particleDetails.length - 1].timePointsParticle,
				splitLine: {
					show: true
				}, //去除网格线
				position: 'top',
				nameLocation: 'start',
			}, {
				nameLocation: 'start',
				name: '时间/s',
				nameGap: 45, //坐标轴与轴线之间的距离
				gridIndex: 1,
				type: 'category',
				boundaryGap: false,
				// 设置x轴显示问题
				data: particleDetails[particleDetails.length - 1].timePointsParticle,
				splitLine: {
					show: true
				}, //去除网格线
			},
		],
		yAxis: [
			// 新增双向坐标
			{
				name: '瞬时值/mSv/h',
				type: 'value',
				axisLabel: {
					formatter: function (value, index) {
						value.toFixed(2);
						return value;
					}
				},
				nameLocation: 'center',
				nameGap: 40,
				inverse: true, // 倒转Y轴坐标
				splitLine: {
					show: true
				}, //去除网格线
			}, {
				gridIndex: 1,
				type: 'value',
				axisLabel: {
					formatter: function (value, index) {
						value.toFixed(2);
						return value;
					}
				},
				name: '累计值/μSv',
				nameLocation: 'center',
				nameGap: 40,
				splitLine: {
					show: true
				}, //去除网格线
			}
		],
		series: getSeriesParticle().concat(getSeriesLeiParticle()),
		// 数据区域缩放组件dataZoom
		dataZoom: [{
				type: 'slider',
				start: 0,
				end: 100,
				realtime: true,
				xAxisIndex: [0, 1],
				top: 'bottom',
			},
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: 0,
				realtime: true,
				end: 100,
				top: 'bottom',
			},
			{
				type: 'slider',
				yAxisIndex: [0, 1],
				start: 0,
				end: 100,
				realtime: true,
				top: 'middle',
			},
			{
				type: 'inside',
				yAxisIndex: [0, 1],
				start: 0,
				end: 100,
				realtime: true,
			}
		],
		visualMap: {
			top: 15,
			right: 0,
			orient: 'horizontal', //视觉排列方式  (vertical | horizontal)
			pieces: [{
				gt: 0,
				lte: warning || 20,
				color: '#1E90FF'
			}, {
				gt: warning || 20,
				color: 'red'
			}],
		},
	};

	option2 = {
		title: {
			text: '器官当量剂量-瞬时',
			left: 'center',
			top: 2,
			textStyle: {
				color: "#1E90FF",
				fontSize: 16,
			},
		},
		grid: [{
			left: 80,
			right: 90,
		}],
		legend: {
			data: instantOrgans,
			type: 'scroll',
			right: 0,
			top: 35,
			align: 'right',
			// bottom: 435,
			// 图例列表的布局朝向
			orient: "vertical",
			itemWidth: 20,
			itemHeight: 7,
			itemStyle: {
				color: lineColor,
			},
		},
		tooltip: {
			// 图例配置
			trigger: 'item',
		},
		// 鼠标hover时高亮样式
		emphasis: {
			label: {
				show: true,
			}
		},
		xAxis: {
			name: '时间/s',
			type: 'category',
			boundaryGap: false,
			nameGap: 20, //坐标轴与轴线之间的距离
			axisLine: {
				onZero: true
			},
			// 设置x轴显示问题
			data: allDetails[allDetails.length - 1].TimePoints,
			splitLine: {
				show: true
			}, //去除网格线
			position: 'top',
			nameLocation: 'start',
		},
		yAxis: [{
			name: '累计值/mSv/h',
			type: 'value',
			axisLabel: {
				formatter: function (value, index) {
					value.toFixed(2);
					return value;
				}
			},
			nameLocation: 'center',
			nameGap: 40,
			splitLine: {
				show: true
			}, //去除网格线
		}],
		series: getSeries(),
		// 数据区域缩放组件dataZoom
		dataZoom: [{
				type: 'slider',
				start: 0,
				end: 100,
				realtime: true,
				xAxisIndex: 0,
			},
			{
				type: 'inside',
				xAxisIndex: 0,
				start: 0,
				realtime: true,
				end: 100
			},
			{
				type: 'slider',
				yAxisIndex: 0,
				start: 0,
				end: 100,
				realtime: true,
				top: 'middle',
			},
			{
				type: 'inside',
				yAxisIndex: 0,
				start: 0,
				end: 100,
				realtime: true,
				top: 'middle',
			}
		],
		visualMap: {
			top: 15,
			right: 0,
			orient: 'horizontal', //视觉排列方式  (vertical | horizontal)
			pieces: [{
				gt: 0,
				lte: warning || 20,
				color: '#1E90FF'
			}, {
				gt: warning || 20,
				color: 'red'
			}],
		},
	};

	option3 = {
		title: {
			text: '器官当量剂量-累计',
			left: 'center',
			top: 2,
			textStyle: {
				color: "#1E90FF",
				fontSize: 16,
			},
		},
		grid: [{
			left: 80,
			right: 90,
		}],
		legend: {
			data: totalOrgans,
			type: 'scroll',
			right: 0,
			top: 35,
			align: 'right',
			// bottom: 435,
			// 图例列表的布局朝向
			orient: "vertical",
			itemWidth: 20,
			itemHeight: 7,
			itemStyle: {
				color: lineColor,
			},
		},
		tooltip: {
			// 图例配置
			trigger: 'item',
		},
		// 鼠标hover时高亮样式
		emphasis: {
			label: {
				show: true,
			}
		},
		xAxis: {
			name: '时间/s',
			type: 'category',
			boundaryGap: false,
			nameGap: 20, //坐标轴与轴线之间的距离
			axisLine: {
				onZero: true
			},
			// 设置x轴显示问题
			data: allDetails[allDetails.length - 1].TimePoints,
			splitLine: {
				show: true
			}, //去除网格线
			position: 'top',
			nameLocation: 'start',
		},
		yAxis: [{
			name: '瞬时值/mSv/h',
			type: 'value',
			axisLabel: {
				formatter: function (value, index) {
					value.toFixed(2);
					return value;
				}
			},
			nameLocation: 'center',
			nameGap: 40,
			splitLine: {
				show: true
			}, //去除网格线
		}],
		series: getSeriesLei(),
		// 数据区域缩放组件dataZoom
		dataZoom: [{
				type: 'slider',
				start: 0,
				end: 100,
				realtime: true,
				xAxisIndex: 0,
			},
			{
				type: 'inside',
				xAxisIndex: 0,
				start: 0,
				realtime: true,
				end: 100
			},
			{
				type: 'slider',
				yAxisIndex: 0,
				start: 0,
				end: 100,
				realtime: true,
				top: 'middle',
			},
			{
				type: 'inside',
				yAxisIndex: 0,
				start: 0,
				end: 100,
				realtime: true,
				top: 'middle',
			}
		],
		visualMap: {
			top: 15,
			right: 0,
			orient: 'horizontal', //视觉排列方式  (vertical | horizontal)
			pieces: [{
				gt: 0,
				lte: warning || 20,
				color: '#1E90FF'
			}, {
				gt: warning || 20,
				color: 'red'
			}],
		},
	};

	myChart1.setOption(option1);
	myChart2.setOption(option2);
	myChart3.setOption(option3);
	// 线条点击事件
	myChart1.on('click', function (params) {
		// 设置面板显示
		$("#popup-container").show();
		// 当前颜色面板显示
		$("#color-div-second").hide();
		$("#color-div-third").hide();
		$("#color-div-first").show();
		// 当前设置线宽显示
		$("#change-dialog-width-first").show();
		$("#change-dialog-width-third").hide();
		$("#change-dialog-width-second").hide();
		// 获取线条名称
		clickPoint = params.seriesIndex;
		// 累计值线颜色改变
		$('#color-div-first').colpick({
			colorScheme: 'light',
			color: 'ff8800',
			layout: 'hex',
			livePreview: false,
			flat: true,
			onChange: function (hsb, hex, rgb, el) {
				lineColor = `#${hex}`;
				// 线条标识
				option1.series[clickPoint].itemStyle.normal.color = lineColor;
				// 线条颜色
				option1.series[clickPoint].itemStyle.normal.lineStyle.color = lineColor;
				// 刷新数据
				myChart1.setOption(option1);
			},
		})

		// 设置曲线宽度
		$("#change-dialog-width-first").on("input", function () {
			var lineWidth = $(this).val();
			option1.series[clickPoint].itemStyle.normal.lineStyle.width = lineWidth;
			// 刷新数据
			myChart1.setOption(option1);
		});

		// 设置曲线线型
		$('#icon').combo({
			value: "请选择线型",
			selected: true,
			getValue: true,
			editable: false,
			onChange: function (lineType) {
				switch (lineType) {
					case "实线":
						option1.series[clickPoint].itemStyle.normal.lineStyle.type = "solid";
						break;
					case "虚线":
						option1.series[clickPoint].itemStyle.normal.lineStyle.type = "dashed";
						break;
					case "点划线":
						option1.series[clickPoint].itemStyle.normal.lineStyle.type = "dotted";
						break;
					default:
						break;
				}
				// 刷新数据
				myChart1.setOption(option1);
			},
		});
	})

	// 线条点击事件
	myChart2.on('click', function (params) {
		// 设置面板显示
		$("#popup-container").show();
		// 当前颜色面板显示
		$("#color-div-first").hide();
		$("#color-div-third").hide();
		$("#color-div-second").show();
		// 当前设置线宽显示
		$("#change-dialog-width-third").hide();
		$("#change-dialog-width-first").hide();
		$("#change-dialog-width-second").show();
		// 获取线条名称
		clickPoint = params.seriesIndex;
		// 累计值线颜色改变
		$('#color-div-second').colpick({
			colorScheme: 'light',
			color: 'ff8800',
			layout: 'hex',
			livePreview: false,
			flat: true,
			onChange: function (hsb, hex, rgb, el) {
				lineColor = `#${hex}`;
				// 线条标识
				option2.series[clickPoint].itemStyle.normal.color = lineColor;
				// 线条颜色
				option2.series[clickPoint].itemStyle.normal.lineStyle.color = lineColor;
				// 刷新数据
				myChart2.setOption(option2);
			},
		})

		// 设置曲线宽度
		$("#change-dialog-width-second").on("input", function () {
			var lineWidth = $(this).val();
			option2.series[clickPoint].itemStyle.normal.lineStyle.width = lineWidth;
			// 刷新数据
			myChart2.setOption(option2);
		});

		// 设置曲线线型
		$('#icon').combo({
			value: "请选择线型",
			selected: true,
			getValue: true,
			editable: false,
			onChange: function (lineType) {
				switch (lineType) {
					case "实线":
						option2.series[clickPoint].itemStyle.normal.lineStyle.type = "solid";
						break;
					case "虚线":
						option2.series[clickPoint].itemStyle.normal.lineStyle.type = "dashed";
						break;
					case "点划线":
						option2.series[clickPoint].itemStyle.normal.lineStyle.type = "dotted";
						break;
					default:
						break;
				}
				// 刷新数据
				myChart2.setOption(option2);
			},
		});
	})

	// 线条点击事件
	myChart3.on('click', function (params) {
		// 设置面板显示
		$("#popup-container").show();
		// 当前颜色面板显示
		$("#color-div-second").hide();
		$("#color-div-first").hide();
		$("#color-div-third").show();
		// 当前设置线宽显示
		$("#change-dialog-width-third").show();
		$("#change-dialog-width-first").hide();
		$("#change-dialog-width-second").hide();
		// 获取线条名称
		clickPoint = params.seriesIndex;
		// 累计值线颜色改变
		$('#color-div-third').colpick({
			colorScheme: 'light',
			color: 'ff8800',
			layout: 'hex',
			livePreview: false,
			flat: true,
			onChange: function (hsb, hex, rgb, el) {
				lineColor = `#${hex}`;
				// 线条标识
				option3.series[clickPoint].itemStyle.normal.color = lineColor;
				// 线条颜色
				option3.series[clickPoint].itemStyle.normal.lineStyle.color = lineColor;
				// 刷新数据
				myChart3.setOption(option3);
			},
		})

		// 设置曲线宽度
		$("#change-dialog-width-third").on("input", function () {
			var lineWidth = $(this).val();
			option3.series[clickPoint].itemStyle.normal.lineStyle.width = lineWidth;
			// 刷新数据
			myChart3.setOption(option3);
		});

		// 设置曲线线型
		$('#icon').combo({
			value: "请选择线型",
			selected: true,
			getValue: true,
			editable: false,
			onChange: function (lineType) {
				switch (lineType) {
					case "实线":
						option3.series[clickPoint].itemStyle.normal.lineStyle.type = "solid";
						break;
					case "虚线":
						option3.series[clickPoint].itemStyle.normal.lineStyle.type = "dashed";
						break;
					case "点划线":
						option3.series[clickPoint].itemStyle.normal.lineStyle.type = "dotted";
						break;
					default:
						break;
				}
				// 刷新数据
				myChart3.setOption(option3);
			},
		});
	})
}

// 设置关闭调色板弹窗
$(".close").click(function (e) {
	e.preventDefault();
	// 面板隐藏
	$("#popup-container").hide();
});

// 基础操作面板可以移动拖拽
$(document).ready(function () {
	$(".box").bg_move({
		move: '.title',
		size: 6
	});
});