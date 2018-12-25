import _ from 'lodash'
import * as Database from './Database'
import jwt from 'jsonwebtoken'
import PouchDB from 'pouchdb'
import store from '../store'

var secret = 'rivaldo'
var remoteDBURL = 'http://localhost:5984/tcm_db'
var remoteUser = 'tindecken'
var remotePassword = 'rivaldo'

const remotedb = new PouchDB(remoteDBURL, {
	skip_setup: false,
	auth: {
	  username: remoteUser,
	  password: remotePassword
	}
  })

async function authen(email, password) {
	let result = {}
	const db = await Database.get()
	await db.find({
		selector: {
			"type": { $eq: 'user'},
			"email": { $eq: email },
			"password": { $eq: password },
		},
	}).then(async (data) => {
		let users = data.docs
		if (users.length > 0) {
			var token = jwt.sign({ name: users[0].name, email: users[0].email }, secret, {
				expiresIn: 86400 // expires in 24 hours
			})
			result = {
				token
			}
		} else {
			result = null
		}
	})
	return result
}

async function push() {
	const localdb = await Database.get();
	await localdb.replicate.to(remotedb).on('complete', function () {
		console.log('Replicate database from local to remote success')
	  }).on('error', function (err) {
		console.log('Replicate database from local to remote unsuccess:', err)
	  });
}

async function saveTree (tree) {
	const db = await Database.get()
	db.get(tree[0]._id).then((docc) => {
		store().dispatch('testplan/updateRev', docc)
		console.log('docc', docc)
		tree[0]._rev = docc._rev
		if(docc.status === 'pass') docc.status = 'fail'
		else docc.status === 'pass'
		return db.put(_.omit(tree[0], 'children'))
			.then((doc) => console.log('saved doc', doc))
			.catch( err => console.log('saveTree', err))
	})
  // for (var i = 0; i < tree.length; i++) {
	// 	db.get(tree[i]._id).then((docc) => {
	// 		console.log('doc', docc)
	// 		return db.put(_.omit(tree[i], 'children'))
	// 			.then((doc) => console.log('saved doc', doc))
	// 			.catch( err => console.log('saveTree', err))
	// 	})
    // if (tree[i]['children']){
    //   saveTree(tree[i]['children'])
    // }
  // }
}
export {
	authen, push, saveTree
}