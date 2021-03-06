var pageSize = 20;

Ext.define('finaltest.store.FinalTestStore', {
	extend : 'Ext.data.Store',
	alias : 'widget.finaltestStore',
	autoLoad : true,
	autoSync : true,// 需要同步
	model : 'finaltest.model.FinalTestModel',
	proxy : {
		url : server_context + '/finalscore/finaltest/.json',
		type : 'ajax',
		api : {
			read : server_context + '/finalscore/finaltest/.json',
			update : server_context + '/finalscore/finaltest/.json'
		},
		reader : {
			type : 'json',
			root : 'content',
			totalProperty : 'totalElements'
		},
		writer : {
			type : 'json'
		}
	},
	// 每页显示的记录行数
	pageSize : pageSize
});