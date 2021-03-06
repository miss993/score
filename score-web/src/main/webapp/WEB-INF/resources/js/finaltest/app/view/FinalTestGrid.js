var pageSize = 20;

var finaltestStore = Ext.create('finaltest.store.FinalTestStore');

Ext.define('finaltest.view.FinalTestGrid', {
	extend : 'Ext.grid.GridPanel',
	alias : 'widget.finaltestGrid',
	title : 'Java EE 课程成绩',
	store : finaltestStore,
	columns : [  {
		text : "学号",
		width : 120,
		sortable : true,
		dataIndex : 'sno'
	}, {
		text : "姓名",
		width : 80,
		sortable : true,
		dataIndex : 'sname'
	}, {
		text : "考勤成绩",
		width : 80,
		sortable : true,
		dataIndex : 's考勤'
	} , {
		text : "作业成绩",
		width : 80,
		sortable : true,
		dataIndex : 'spingshizuoye'
	} , {
		text : "成绩",
		width : 80,
		sortable : true,
		dataIndex : 'sscore'
	} ],
	viewConfig : {
		columnsText : '列',
		sortAscText : '升序',
		sortDescText : '降序'
	},

	bbar : new Ext.PagingToolbar({
		pageSize : pageSize,// 每页显示的记录值
		store : finaltestStore,
		displayInfo : true,
		firstTest : '首页',
		lastText : '尾页',
		nextText : '下页',
		prevText : '前页',
		beforePageText : '第',
		afterPageText : '页，共{0}页',
		displayMsg : '记录数：第{0}条 - 第{1}条，共 {2}条',
		emptyMsg : "没有记录"
	})
});
