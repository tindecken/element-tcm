import _ from 'lodash'

var isArray = function(a) {
    return (!!a) && (a.constructor === Array)
}

var isObject = function(a) {
    return (!!a) && (a.constructor === Object)
}


function toCodeName(type, name){
    return `${type}_${_.snakeCase(name)}`
}


/*
Tìm nested trong object o, có _id trùng với input para id hay không
*/
function findBy_id(o, id) {
    //Early return
    if( o._id === id ){
      return o;
    }
    let result, p;
    for (p in o) {
      if( o.hasOwnProperty(p) && typeof o[p] === 'object' ) {
        result = findBy_id(o[p], id);
        if(result){
            return result;
        }
      }
    }
    return result;
}

function removeBy_id(list, key, value, next) {
    let result = [];
    let type = getType(value)
    for (var i = 0; i < list.length; i++) {
        if (list[i][key] === value) {
            continue;
        } else {
            switch(type){
                case 'testsuite':
                    if(list[i]['testsuites'] && list[i]['testsuites'].indexOf(value) > -1){
                        list[i]['testsuites'].splice(list[i]['testsuites'].indexOf(value), 1)
                    }
                    break
                case 'testgroup':
                    if(list[i]['testgroups'] && list[i]['testgroups'].indexOf(value) > -1){
                        list[i]['testgroups'].splice(list[i]['testgroups'].indexOf(value), 1)
                    }
                    break
                case 'testcase':
                    if(list[i]['testcaseS'] && list[i]['testcaseS'].indexOf(value) > -1){
                        list[i]['testcaseS'].splice(list[i]['testcaseS'].indexOf(value), 1)
                    }
                    break
            }
            result.push(list[i]);
            if (list[i][next]) {
                list[i][next] = removeBy_id(list[i][next], key, value, next);
            }
        }
    }
    return result;
}

function getType(id){
    return id.split("_", 2)[0]
}

function isOpened(id, openedTCs){
    if(_.findIndex(openedTCs, (o) => { return o._id === id}) !== -1){
        return true
    }else{
        return false
    }
}

function editCategory(tlTreeData, cat_id, editedCategory){
    console.log('obj', tlTreeData)
    console.log('cat_id', cat_id)
    console.log('editedCategory', editedCategory)

    const objIndex = tlTreeData.findIndex(obj => obj._id === cat_id)

    const updatedObj = {
        ...tlTreeData[objIndex],
        name: editedCategory.name,
        description: editedCategory.description,
        work_items: editedCategory.work_items,
        _id: toCodeName('category', editedCategory.name),
        author: editedCategory.author
    }

    const updatedtTLTreeData = [
        ...tlTreeData.slice(0, objIndex),
        updatedObj,
        ...tlTreeData.slice(objIndex + 1),
    ]

    return updatedtTLTreeData
}

function deleteCategory(tlTreeData, cat_id){
    console.log('tlTreeData', tlTreeData)
    console.log('cat_id', cat_id)
    let updatedtTLTreeData = _.remove(tlTreeData, (cat) => cat._id !== cat_id)
    return updatedtTLTreeData
}

Array.prototype.insert = function ( index, item ) {
	this.splice( index, 0, item );
};

/**
 *
 * @param {Array need to get} list
 * @param {Property (_id)} key
 * @param {.type (testcase)} type
 * @param {next (children)} next
 * @param {Return array of Primary IDs} r
 */
function getPrimaries(list, key, type, next, result = []) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].type === type && list[i]['primary']){
      result.push({
        _id: list[i][key],
        name: list[i]['name']
      })
    }else {
      if (list[i][next]){
        getPrimaries(list[i][next], key, type ,next, result)
      }
    }
  }
  return result;
}

export {
    isArray, isObject, toCodeName, findBy_id, removeBy_id, isOpened, editCategory, deleteCategory, getPrimaries
}
