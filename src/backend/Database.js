import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find';
import _ from 'lodash'
import mock from './mockdata'
PouchDB.plugin(PouchdbFind);


var localDBURL = 'tcm_db'
var remoteDBURL = 'http://localhost:5984/tcm_db'
var remoteUser = 'tindecken'
var remotePassword = 'rivaldo'

var localdb = null

const remotedb = new PouchDB(remoteDBURL, {
  skip_setup: false,
  auth: {
    username: remoteUser,
    password: remotePassword
  }
})

async function removeDB() {
  let localdb = new PouchDB(localDBURL)
  await remotedb.destroy()
  await localdb.destroy().then(function (response) {
    console.log('DB is destroyed', response)
  }).catch(function (err) {
    console.log(err);
  });
}

async function _create() {
  await removeDB()
  let localdb = await new PouchDB(localDBURL)
  let remotedb = new PouchDB(remoteDBURL, {
    skip_setup: false, //true: override db on remote, false: no override
    auth: {
      username: remoteUser,
      password: remotePassword
    }
  })

  _.forEach(mock.users, async (user) => {
    await localdb.put({
      email: user.email,
      password: user.password,
      name: user.name,
      type: 'user',
      _id: user.id,
      categories: user.categories
    })
  })

  _.forEach(mock.categories, async (category) => {
    await localdb.put({
      name: category.name,
      description: category.description,
      author: category.author,
      type: 'category',
      _id: category.id,
      testsuites: category.testsuites,
      status: category.status,
      work_items: category.work_items,
    })
  })

  _.forEach(mock.testsuites, async (testsuite) => {
    await localdb.put({
      name: testsuite.name,
      description: testsuite.description,
      author: testsuite.author,
      type: 'testsuite',
      _id: testsuite.id,
      testgroups: testsuite.testgroups,
      testcases: testsuite.testcases,
      category: testsuite.category,
      work_items: testsuite.work_items,
      environment: testsuite.environment,
      status: testsuite.status
    })
  })

  _.forEach(mock.testgroups, async (testgroup) => {
    await localdb.put({
      name: testgroup.name,
      description: testgroup.description,
      type: 'testgroup',
      _id: testgroup.id,
      testcases: testgroup.testcases,
      testsuite: testgroup.testsuite,
      work_items: testgroup.work_items
    })
  })

  _.forEach(mock.testcases, async (testcase) => {
    await localdb.put({
      name: testcase.name,
      description: testcase.description,
      type: 'testcase',
      _id: testcase.id,
      steps: testcase.steps,
      testsuite: testcase.testsuite,
      testgroup: testcase.testgroup,
      work_items: testcase.work_items,
      enabled: testcase.enabled,
      primary: testcase.primary,
      dependency: testcase.dependency,
      tickable: testcase.tickable,
    })
  })

  _.forEach(mock.steps, async (step) => {
    await localdb.put({
      _id: step.id,
      name: step.name,
      description: step.description,
      enabled: step.enabled,
      status: step.status,
      type: step.type,
      client: step.client,
      imgURL: step.imgURL,
      keyword: step.keyword,
      params: step.params,
      startTime: step.startTime,
      endTime: step.endTime
    })
  })

  _.forEach(mock.keywords, async (keyword) => {
    await localdb.put({
      _id: keyword.id,
      name: keyword.name,
      description: keyword.description,
      author: keyword.author,
      type: keyword.type,
      imgURL: keyword.imgURL,
      params: keyword.params
    })
  })

  _.forEach(mock.clients, async (client) => {
    await localdb.put({
      _id: client.id,
      name: client.name,
      description: client.description,
      ip: client.ip,
      path: client.path,
      type: client.type
    })
  })

  _.forEach(mock.environments, async (env) => {
    await localdb.put({
      _id: env.id,
      name: env.name,
      description: env.description,
      type: env.type,
      nodes: env.nodes
    })
  })

  await localdb.replicate.to(remotedb).on('complete', function () {
    console.log('Replicate database from local to remote success')
  }).on('error', function (err) {
    console.log('Replicate database from local to remote unsuccess:', err)
  });

  return localdb
}

export function get() {
  if (!localdb)
    localdb = _create()
  return localdb
}
