import * as Database from './Database'
import _ from 'lodash'
import store from '../store'
import { toCodeName } from '../utils/index'

async function createCategory(data){
  try {
    const db = await Database.get()
    let id = toCodeName('category', data.name)
    console.log('data.name', data.name)
    await db.find({
      selector: { _id: {$eq: id} }
    }).then(async (exist) => {
      if(exist.docs.length === 0){ //chưa tồn tại trong hệ thống --> add
        let doc = {
          _id: id,
          name: data.name,
          description: data.description,
          testsuites: [],
          type: 'category',
          user: store.state.auth.user.email
        }
        await db.put(doc)
      }else{ //id đã tồn tại trong hệ thống --> báo lỗi
        console.log('data.name', data.name)
        throw `Category ${data.name} is already exist`
      }
    })
  }catch (error){
    throw (error)
  }
}


async function getTestPlanTree () {
  let result = []
  let categories
  const db = await Database.get()
  await db.find({
    selector: { type: 'category'}
  }).then((res) => {
    categories = res.docs
  })
  result = await Promise.all(
    categories.map(async (category, index, categories) => ({
      ...category,
      children: await db.find({
        selector: {
          type: 'testsuite',
          category: category._id
        }
      }).then(async (res) => { //res = testsuites.docs
        let testsuites = res.docs
        return await Promise.all(
          testsuites.map(async (testsuite) => ({
            ...testsuite,
            children: _.flatten([
              ...await db.find({
                selector: {
                  type: 'testcase',
                  testsuite: testsuite._id
                }
              }).then((res) => res.docs),
              ...await db.find({
                selector: {
                  type: 'testgroup',
                  testsuite: testsuite._id
                }
              }).then(async (res) => { // res = testgroup.docs
                let testgroups = res.docs
                return await Promise.all(
                  testgroups.map(async (testgroup) => ({
                    ...testgroup,
                    children: await db.find({
                      selector: {
                        type: 'testcase',
                        testgroup: testgroup._id
                      }
                    }).then((res) => res.docs)
                  }))
                )
              })
            ])
          }))
        )
      })
    }))
  )
  return result
}

async function getTestCaseDetail (testCaseId) {
  let result = []
  let steps = {}
  const db = await Database.get()
  await db.find({
    selector: {
      type: 'testcase',
      _id: testCaseId}
  }).then((res) => {
    steps = res.docs[0].steps
  })
  if(steps.length > 0){
    result = await Promise.all(
      steps.map(async (step, index, steps) => ({
        ...await db.find({
          selector: {
            type: 'step',
            _id: step
          }
        }).then( async (res) => ({
          ...res.docs[0],
        }))
      }))
    )
  }else {
    return result
  }
  return result
}

async function getParams (keywordId) {
  let result = []
  const db = await Database.get()
  await db.find({
    selector: {
      type: 'keyword',
      _id: keywordId
    }
  }).then((res) => {
    result = res.docs[0].params.map((param, index, params) => {
      return {
        name: param.name,
        value: param.defaultValue,
        description: param.description,
        ref_node: ''
      }
    })
  })
  return result
}

//get value based on envrionment and node name
async function getValue(environment_id, node_name) {
  let result
  const db = await Database.get()
  await db.find({
    selector: {
      type: 'environment',
      _id: environment_id,
    }
  }).then((res) => {
    let nodes = res.docs[0].nodes
    nodes.forEach(node => {
      if(node.node === node_name) result = node.value
    })
  }).catch(err => {
    console.log('err', err)
  })
  return result
}

//get envrionment from testsuite
async function getEnvironment(testsuite_id) {
  let result
  const db = await Database.get()
  await db.find({
    selector: {
      type: 'testsuite',
      _id: testsuite_id,
    }
  }).then( async res => {
    let ts = res.docs[0]
    await db.find({
      selector: {
        type: 'environment',
        _id: ts.environment
      }
    }).then(env => {
      result = env.docs[0]
    })
  }).catch(err => {
    console.log('err', err)
  })
  return result
}

export {
  getTestPlanTree, createCategory, getTestCaseDetail, getValue, getEnvironment, getParams
}
