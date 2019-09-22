import $ from 'jquery';


var test = "test me"
var job = ""
var results = {
  job: ""
}

export default class StaticMethodCall {
  static staticMethod() {
    test = "CHANGED"
  }
  static anotherStaticMethod() {
    console.log(results)
  }
  static updateJob(field, value) {
    results[field] = value
  }
  static resultsToParams(){
    return $.param(results);
  }
}
