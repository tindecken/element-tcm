let users = [
	{
		name: 'Thai Hoang Nguyen',
		email: 'thaihoang.nguyen@acomsolutions.com',
		password: 'rivaldo',
		id: 'thaihoang.nguyen@acomsolutions.com',
		categories: ['category_bank_account'],
		testsuites: [],
		type: 'user'
	},
	{
		name: 'Thien Vo',
		email: 'thien.vo@acomsolutions.com',
		password: 'rivaldo',
		type: 'user',
		id: 'thien.vo@acomsolutions.com',
		testsuites: [],
		categories: ['category_payment']
	},
]

let categories = [
	{
		name: 'Bank Account',
		description: 'Bank Account Category',
		author: 'thaihoang.nguyen@acomsolutions.com',
		id: 'category_bank_account',
		type: 'category',
		testsuites: ['testsuite_pending', 'testsuite_approval'],
		status: 'pass',
		work_items: [15149, 15150]
	},
	{
		name: 'Payment',
		description: 'Payment Category',
		author: 'thien.vo@acomsolutions.com',
		id: 'category_payment',
		type: 'category',
		testsuites: ['testsuite_notification', 'testsuite_ach'],
		status: 'fail',
		work_items: [15151]
	}
]

let testsuites = [
	{
		name: 'Pending',
		description: 'testsuite Pending',
		author: 'thaihoang.nguyen@acomsolutions.com',
		id: 'testsuite_pending',
		type: 'testsuite',
		testgroups: ['testgroup_preconfig_pending', 'testgroup_primary_pending'],
		testcases: ['testcase_pending_1', 'testcase_pending_2'],
		category: 'category_payment', //không quan trọng phải có item này
		work_items: [15152, 15153]
	},
	{
		name: 'Approval',
		description: 'testsuite Aproval',
		author: 'thien.vo@acomsolutions.com',
		id: 'testsuite_approval',
		type: 'testsuite',
		testgroups: ['testgroup_preconfig_approval', 'testgroup_primary_approval'],
		testcases: ['testcase_approval_1', 'testcase_approval_2'],
		category: 'category_payment',
		work_items: [15154, 15155]
	},
	{
		name: 'Notification',
		description: 'testsuite Notification',
		author: 'thaihoang.nguyen@acomsolutions.com',
		id: 'testsuite_notification',
		type: 'testsuite',
		testgroups: ['testgroup_preconfig_notification', 'testgroup_primary_notification'],
		testcases: [],
		category: 'category_bank_account',
		work_items: [15156, 15157]
	},
	{
		name: 'ACH',
		description: 'testsuite ACH',
		author: 'thien.vo@acomsolutions.com',
		id: 'testsuite_ach',
		type: 'testsuite',
		testgroups: ['testgroup_preconfig_ach', 'testgroup_primary_ach'],
		testcases: [],
		category: 'category_bank_account',
		work_items: [15158, 15159]

	}
]

let testgroups = [
	{
		name: 'Group Preconfig Pending',
		description: 'testgroup Preconfig Pending',
		id: 'testgroup_preconfig_pending',
		testcases: ['testcase_preconfig_pending_1', 'testcase_preconfig_pending_2'],
		testsuite: 'testsuite_pending',
		work_items: [15160, 15161]
	},
	{
		id: 'testgroup_primary_pending',
		name: 'Group Primary Pending',
		description: 'testgroup Primary Pending',
		testcases: ['testcase_primary_pending_1', 'testcase_primary_pending_2'],
		testsuite: 'testsuite_pending',
		work_items: [15162, 15163]
	},
	{
		id: 'testgroup_preconfig_approval',
		name: 'Group Preconfig Approval',
		description: 'testgroup Preconfig Aproval',
		testcases: ['testcase_preconfig_approval_1', 'testcase_preconfig_approval_2'],
		testsuite: 'testsuite_approval',
		work_items: [15164, 15165]
	},
	{
		id: 'testgroup_primary_approval',
		name: 'Group Primary Approval',
		description: 'testgroup Primary Aproval',
		testcases: ['testcase_primary_approval_1', 'testcase_primary_approval_2'],
		testsuite: 'testsuite_approval',
		work_items: [15166, 15167]
	},
	{
		id: 'testgroup_preconfig_notification',
		name: 'Group Preconfig Notification',
		description: 'testgroup Preconfig Notification',
		testcases: ['testcase_preconfig_notification_1'],
		testsuite: 'testsuite_notification',
		work_items: [15168, 15169]
	},
	{
		id: 'testgroup_primary_notification',
		name: 'Group Primary Notification',
		description: 'testgroup Primary Notification',
		testcases: ['testcase_primary_notification_1'],
		testsuite: 'testsuite_notification',
		work_items: [15170, 15171]
	},
	{
		id: 'testgroup_preconfig_ach',
		name: 'Group Preconfig ACH',
		description: 'testgroup Preconfig ACH',
		testcases: ['testcase_preconfig_ach_1'],
		testsuite: 'testsuite_ach',
		work_items: [15172, 15173]
	},
	{
		id: 'testgroup_primary_ach',
		name: 'Group Primary ACH',
		description: 'testgroup Primary ACH',
		testcases: ['testcase_primary_ach_1'],
		testsuite: 'testsuite_ach',
		work_items: [15174, 15175]
	}
]

let testcases = [
	{
		id: 'testcase_pending_1',
		name: 'Testcase Pending 1',
		description: 'testcase Pending 1',
		type: 'testcase',
		steps: ['step_1','step_2','step_3','step_4','step_5',],
		testsuite: 'testsuite_pending',
		work_items: [15176],
		enabled: true,
		primary: true,
		dependency: '',
	},
	{
		id: 'testcase_pending_2',
		name: 'Testcase Pending 2',
		description: 'testcase Pending 2',
		type: 'testcase',
		steps: ['step_6','step_7','step_8','step_9','step_10',],
		testsuite: 'testsuite_pending',
		work_items: [15177],
		enabled: true,
		primary: false,
		dependency: 'testcase_pending_1',
	},
	{
		id: 'testcase_approval_1',
		name: 'Testcase Aproval 1',
		description: 'testcase Aproval 1',
		type: 'testcase',
		steps: ['step_11','step_12','step_13','step_14','step_15',],
		testgroup: 'testgroup_primary_approval',
		testsuite: '',
		work_items: [15178],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_approval_2',
		name: 'Testcase Aproval 2',
		description: 'testcase Aproval 2',
		type: 'testcase',
		steps: ['step_16','step_17','step_18','step_19','step_20',],
		testgroup: 'testgroup_primary_approval',
		testsuite: '',
		work_items: [15179],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_preconfig_pending_1',
		name: 'Testcase Preconfig Pending 1',
		description: 'testcase Preconfig Pending 1',
		type: 'testcase',
		steps: ['step_21','step_22','step_23','step_24','step_25',],
		testgroup: 'testgroup_preconfig_pending',
		testsuite: '',
		work_items: [15180],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_preconfig_pending_2',
		name: 'Testcase Preconfig Pending 2',
		description: 'testcase Preconfig Pending 2',
		type: 'testcase',
		steps: ['step_26','step_27','step_28','step_29','step_30',],
		testgroup: 'testgroup_preconfig_pending',
		testsuite: '',
		work_items: [15181],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_primary_pending_1',
		name: 'Testcase Primary Pending1',
		description: 'testcase Primary Pending 1',
		type: 'testcase',
		steps: ['step_31','step_32','step_33','step_34','step_35',],
		testgroup: 'testgroup_primary_pending',
		testsuite: '',
		work_items: [15182],
		enabled: true,
		primary: true,
		dependency: '',
	},
	{
		id: 'testcase_primary_pending_2',
		name: 'Testcase Primary Pending2',
		description: 'testcase Primary Pending 2',
		type: 'testcase',
		steps: ['step_36','step_37','step_38','step_39','step_40',],
		testgroup: 'testgroup_primary_pending',
		testsuite: '',
		work_items: [15183],
		enabled: true,
		primary: true,
		dependency: '',
	},
	{
		id: 'testcase_preconfig_approval_1',
		name: 'Testcase Preconfig Approval 1',
		description: 'testcase Preconfig Aproval 1',
		type: 'testcase',
		steps: ['step_41','step_42','step_43','step_44','step_45',],
		testgroup: 'testgroup_preconfig_approval',
		testsuite: '',
		work_items: [15184],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_preconfig_approval_2',
		name: 'Testcase Preconfig Approval 2',
		description: 'testcase Preconfig Aproval 2',
		type: 'testcase',
		steps: ['step_46','step_47','step_48','step_49','step_50',],
		testgroup: 'testgroup_preconfig_approval',
		testsuite: '',
		work_items: [15185],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_primary_approval_1',
		name: 'Testcase Primary Approval 1',
		description: 'testcase Primary Aproval 1',
		type: 'testcase',
		steps: ['step_51','step_52','step_53','step_54','step_55',],
		testgroup: 'testgroup_primary_approval',
		testsuite: '',
		work_items: [15186],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_primary_approval_2',
		name: 'Testcase Primary Approval 2',
		description: 'testcase Primary Aproval 2',
		type: 'testcase',
		steps: ['step_56','step_57','step_58','step_59','step_60',],
		testgroup: 'testgroup_primary_approval',
		testsuite: '',
		work_items: [15187],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_preconfig_notification_1',
		name: 'Testcase Preconfig Notification 1',
		description: 'testcase Preconfig Notification ',
		type: 'testcase',
		steps: ['step_61','step_62','step_63','step_64','step_65',],
		testgroup: 'testgroup_preconfig_notification',
		testsuite: '',
		work_items: [15188],
		enabled: true,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_primary_notification_1',
		name: 'Testcase Primary Notification 1',
		description: 'testcase Primary Notification 1',
		type: 'testcase',
		steps: ['step_66','step_67','step_68','step_69','step_70',],
		testgroup: 'testgroup_preconfig_notification',
		testsuite: '',
		work_items: [15189],
		enabled: true,
		primary: true,
		dependency: '',
	},
	{
		id: 'testcase_preconfig_ach_1',
		name: 'Testcase Preconfig ACH1',
		description: 'testcase Preconfig ACH1',
		type: 'testcase',
		steps: ['step_71','step_72','step_73','step_74','step_75',],
		testgroup: 'testgroup_preconfig_ach',
		testsuite: '',
		work_items: [15190],
		tickable: false,
		enabled: false,
		primary: false,
		dependency: '',
	},
	{
		id: 'testcase_primary_ach_1',
		name: 'Testcase Primary ACH 1',
		description: 'testcase Primary ACH ',
		type: 'testcase',
		steps: ['step_76','step_77','step_78','step_79','step_80',],
		testgroup: 'testgroup_primary_ach',
		testsuite: '',
		work_items: [15191],
		enabled: true,
		primary: true,
		dependency: '',
	}
]

let steps = [
	{
		id: 'step_1',
		name: 'Step 1 Name',
		description: 'Step 1 Description',
		author: 'thaihoang.nguyen@acomsolutions.com',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 1',
				description: 'Description',
				value: 'value 1'
			},
			{
				name: 'param 2',
				description: 'Description',
				value: 'value 2'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_2',
		name: 'Step 2 Name',
		description: 'Step 2 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_3',
		name: 'Step 3 Name',
		description: 'Step 3 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_4',
		name: 'Step 4 Name',
		description: 'Step 4 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},{
		id: 'step_5',
		name: 'Step 5 Name',
		description: 'Step 5 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_6',
		name: 'Step 6 Name',
		description: 'Step 6 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_7',
		name: 'Step 7 Name',
		description: 'Step 7 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_8',
		name: 'Step 8 Name',
		description: 'Step 8 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_9',
		name: 'Step 9 Name',
		description: 'Step 9 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_10',
		name: 'Step 10 Name',
		description: 'Step 10 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_11',
		name: 'Step 11 Name',
		description: 'Step 11 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_12',
		name: 'Step 12 Name',
		description: 'Step 12 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_13',
		name: 'Step 13 Name',
		description: 'Step 13 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_14',
		name: 'Step 14 Name',
		description: 'Step 14 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_15',
		name: 'Step 15 Name',
		description: 'Step 15 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_16',
		name: 'Step 16 Name',
		description: 'Step 16 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_17',
		name: 'Step 17 Name',
		description: 'Step 17 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_18',
		name: 'Step 18 Name',
		description: 'Step 18 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_19',
		name: 'Step 19 Name',
		description: 'Step 19 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_20',
		name: 'Step 20 Name',
		description: 'Step 20 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_21',
		name: 'Step 21 Name',
		description: 'Step 21 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_22',
		name: 'Step 22 Name',
		description: 'Step 22 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_23',
		name: 'Step 23 Name',
		description: 'Step 23 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_24',
		name: 'Step 24 Name',
		description: 'Step 24 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_25',
		name: 'Step 25 Name',
		description: 'Step 25 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_26',
		name: 'Step 26 Name',
		description: 'Step 26 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_27',
		name: 'Step 27 Name',
		description: 'Step 27 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_28',
		name: 'Step 28 Name',
		description: 'Step 28 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_29',
		name: 'Step 29 Name',
		description: 'Step 29 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_30',
		name: 'Step 30 Name',
		description: 'Step 30 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_31',
		name: 'Step 31 Name',
		description: 'Step 31 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_32',
		name: 'Step 32 Name',
		description: 'Step 32 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_33',
		name: 'Step 33 Name',
		description: 'Step 33 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_34',
		name: 'Step 34 Name',
		description: 'Step 34 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_35',
		name: 'Step 35 Name',
		description: 'Step 35 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_36',
		name: 'Step 36 Name',
		description: 'Step 36 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_37',
		name: 'Step 37 Name',
		description: 'Step 37 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_38',
		name: 'Step 38 Name',
		description: 'Step 38 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_39',
		name: 'Step 39 Name',
		description: 'Step 39 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_40',
		name: 'Step 40 Name',
		description: 'Step 40 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_41',
		name: 'Step 41 Name',
		description: 'Step 41 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_42',
		name: 'Step 42 Name',
		description: 'Step 42 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_43',
		name: 'Step 43 Name',
		description: 'Step 43 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_44',
		name: 'Step 44 Name',
		description: 'Step 44 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},{
		id: 'step_45',
		name: 'Step 45 Name',
		description: 'Step 45 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_46',
		name: 'Step 46 Name',
		description: 'Step 46 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_47',
		name: 'Step 47 Name',
		description: 'Step 47 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_48',
		name: 'Step 48 Name',
		description: 'Step 48 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_49',
		name: 'Step 49 Name',
		description: 'Step 49 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_50',
		name: 'Step 50 Name',
		description: 'Step 50 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_51',
		name: 'Step 51 Name',
		description: 'Step 51 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_52',
		name: 'Step 52 Name',
		description: 'Step 52 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},{
		id: 'step_53',
		name: 'Step 53 Name',
		description: 'Step 53 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_54',
		name: 'Step 54 Name',
		description: 'Step 54 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_55',
		name: 'Step 55 Name',
		description: 'Step 55 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_56',
		name: 'Step 56 Name',
		description: 'Step 56 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_57',
		name: 'Step 57 Name',
		description: 'Step 57 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_58',
		name: 'Step 58 Name',
		description: 'Step 58 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_59',
		name: 'Step 59 Name',
		description: 'Step 59 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_60',
		name: 'Step 60 Name',
		description: 'Step 60 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_61',
		name: 'Step 61 Name',
		description: 'Step 61 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_62',
		name: 'Step 62 Name',
		description: 'Step 62 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_63',
		name: 'Step 63 Name',
		description: 'Step 63 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_64',
		name: 'Step 64 Name',
		description: 'Step 64 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_65',
		name: 'Step 65 Name',
		description: 'Step 65 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_66',
		name: 'Step 66 Name',
		description: 'Step 66 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_67',
		name: 'Step 67 Name',
		description: 'Step 67 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_68',
		name: 'Step 68 Name',
		description: 'Step 68 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_69',
		name: 'Step 69 Name',
		description: 'Step 69 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_70',
		name: 'Step 70 Name',
		description: 'Step 70 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_71',
		name: 'Step 71 Name',
		description: 'Step 71 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_72',
		name: 'Step 72 Name',
		description: 'Step 72 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_73',
		name: 'Step 73 Name',
		description: 'Step 73 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_74',
		name: 'Step 74 Name',
		description: 'Step 74 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_75',
		name: 'Step 75 Name',
		description: 'Step 75 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_76',
		name: 'Step 76 Name',
		description: 'Step 76 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_77',
		name: 'Step 77 Name',
		description: 'Step 77 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_78',
		name: 'Step 78 Name',
		description: 'Step 78 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_79',
		name: 'Step 79 Name',
		description: 'Step 79 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_1',
		startTime: '',
		endTime: '',
	},
	{
		id: 'step_80',
		name: 'Step 80 Name',
		description: 'Step 80 Description',
		enabled: true,
		status: 'pass',
		type: 'step',
		client: 'client_chrome',
		imgURL: '',
		params: [
			{
				name: 'param 3',
				description: 'Description',
				value: 'value 3'
			},
			{
				name: 'param 4',
				description: 'Description',
				value: 'value 4'
			},
		],
		keyword: 'keyword_2',
		startTime: '',
		endTime: '',
	},
]

let keywords = [
	{
		id: 'keyword_1',
		name: 'LaunchBrowser',
		description: 'Open webdriver and go to given url',
		author: 'thaihoang.nguyen@acomsolutions.com',
		type: 'keyword',
		imgURL: '',
		params: [
			{
				name: 'user_name',
				description: 'User Name \n enter',
				defaultValue: 'tindecken'
			},
			{
				name: 'password',
				description: 'Password \n enter',
				defaultValue: 'thisispassword'
			}
		],
	},
	{
		id: 'keyword_2',
		name: 'Login',
		description: 'Will input user name / password',
		author: 'thaihoang.nguyen@acomsolutions.com',
		type: 'keyword',
		imgURL: '',
		params: [
			{
				name: 'sUrl',
				description: 'User Name need to go',
				defaultValue: 'http://google.com'
			},
			{
				name: 'sExpectedTitle',
				description: 'Expected Title after go to page',
				defaultValue: 'Google - Google Chrome'
			}
		],
	},
]

let clients = [
	{
		id: 'client_chrome',
		type: 'client',
		name: 'Chrome',
		description: 'Chrome client',
		ip: '',
		path: '',
	},
	{
		id: 'client_azurestorage',
		type: 'client',
		name: 'Azure Storage',
		description: 'Client of Azure Storage',
		ip: '',
		path: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
	}
]

export default {
	users,
	categories,
	testsuites,
	testgroups,
	testcases,
	keywords,
	clients,
	steps
}
