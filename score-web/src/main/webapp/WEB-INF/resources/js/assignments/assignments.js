Ext.require(['Ext.data.*', 'Ext.grid.*']);

Ext.define('assignments.AssignmentsModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'stuid',
						type : 'string',
						sortable : true
					}, {
						name : 'name',
						type : 'string',
						sortable : true
					},{
						name : 'score1',
						type : 'string',
						sortable : true
					},{
						name : 'score2',
						type : 'string',
						sortable : true
					},{
						name : 'score3',
						type : 'string',
						sortable : true
					},{
						name : 'score4',
						type : 'string',
						sortable : true
					},{
						name : 'score5',
						type : 'string',
						sortable : true
					}]
		});

var pageSize = 20;

var store = new Ext.data.Store({
			autoLoad : true,
			autoSync : true,// 需要同步
			model : 'assignments.AssignmentsModel',
			proxy : {
				type : 'rest',
				url : './.json',
				reader : {
					type : 'json',
					root : 'content',
					totalProperty : 'totalElements'
				},
				writer : {
					type : 'json'
				}
			},
			listeners : {
				write : function(store, operation) {
					var record = operation.getRecords()[0], name = Ext.String
							.capitalize(operation.action), verb;
					if (name == 'Destroy') {
						record = operation.records[0];
						verb = 'Destroyed';
					} else {
						verb = name + 'd';
					}
					Ext.example.msg(name, Ext.String.format("{0} user: {1}",
									verb, record.getId()));
				}
			},
			// 每页显示的记录行数
			pageSize : pageSize
		});

var textFieldEditor = {
	xtype : 'textfield',
	allowBlank : false,
	blankText : '该字段不能为空！',
	minLength : 4,
	minText : '至少需要输入{0}个字符！',
	maxLength : 20,
	maxText : '最多输入{0}个字符！'
}


var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			listeners : {
				cancelEdit : function(rowEditing, context) {
					// Canceling editing of a locally added, unsaved record:
					// remove it
					if (context.record.phantom) {
						store.remove(context.record);
					}
				}
			}
		});

var assignmentsGrid = new Ext.grid.GridPanel({
			id : 'assignmentsGrid',
			plugins : [rowEditing],
			store : store,
			region : 'center',
			columnLines : true,
			loadMask : true,
			stripeRows : true,
			width : 600,
			title : '五次作业分数',
			columns : [ {
						text : "学号",
						width : 120,
						sortable : true,
						dataIndex : 'code',
						editor : textFieldEditor,
						field : {
							xtype : 'textfield'
						}
					}, {
						text : "姓名",
						width : 80,
						sortable : true,
						dataIndex : 'name',
						editor : textFieldEditor,
						field : {
							xtype : 'textfield'
						}
					},{
						text : "第一次作业成绩",
						width : 80,
						sortable : true,
						editor : textFieldEditor,
						dataIndex : 'score1'
					}
					,{
						text : "第二次作业成绩",
						width : 80,
						sortable : true,
						editor : textFieldEditor,
						dataIndex : 'score1'
					},{
						text : "第三次作业成绩",
						width : 80,
						sortable : true,
						editor : textFieldEditor,
						dataIndex : 'score1'
					},{
						text : "第四次作业成绩",
						width : 80,
						sortable : true,
						editor : textFieldEditor,
						dataIndex : 'score1'
					},{
						text : "第五次作业成绩",
						width : 80,
						sortable : true,
						editor : textFieldEditor,
						dataIndex : 'score1'
					},{
						text : "添加时间",
						width : 150,
						dataIndex : 'dateCreated',
						renderer : Ext.util.Format.dateRenderer('Y/m/d H:i:s'),
						sortable : true
					}, {
						text : "修改时间",
						width : 150,
						dataIndex : 'dateModified',
						renderer : Ext.util.Format.dateRenderer('Y/m/d H:i:s'),
						sortable : true
					}],
			viewConfig : {
				columnsText : '列',
				sortAscText : '升序',
				sortDescText : '降序'
			},
			tbar : {
				xtype : 'toolbar',
				frame : true,
				border : false,
				padding : 2,
				bbar : new Ext.PagingToolbar({
							pageSize : pageSize,// 每页显示的记录值
							store : store,
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
			}
		});

assignmentsGrid.getSelectionModel().on('selectionchange',
		function(selModel, selections) {
	assignmentsGrid.down('#delete').setDisabled(selections.length === 0);
		});

new Ext.form.NumberField({
	fieldLabel : '整数',
	allowDecimals : false, // 不允许输入小数
	nanText : '请输入有效整数', // 无效数字提示
	allowNegative : false
		// 不允许输入负数
	});

var clearForm = function() {
	Ext.Msg.alert('重置', '重置查询表单！');
	assignmentsForm.getForm().reset();
}

var queryForm = function() {
	Ext.Msg.alert('查询', '将开始执行查询！');
}
var assignmentsForm = new Ext.form.FormPanel({
			title : '信息查询',
			width : 200,
			height : 200,
			frame : true,
			region : 'north',
			defaultType : 'textfiled',
			labelWidth : 30,
			items : [{
						fieldLabel : "学号",
						xtype : 'textfield',
						name : 'code'
					}, {
						fieldLabel : "姓名",
						xtype : 'textfield',
						name : 'name'
					}],
			buttons : [{
						xtype : 'button',
						text : '查询',
						handler : queryForm,
						scope : this
					}, {
						xtype : 'button',
						text : '重置',
						handler : clearForm,
						scope : this
					}]
		})

Ext.application({
			name : '学生信息',
			launch : function() {
				Ext.create('Ext.container.Viewport', {
							layout : 'border',
							items : [assignmentsForm, assignmentsGrid]
						});
			}
		});
