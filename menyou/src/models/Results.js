
var test = "test me"

export default class StaticMethodCall {
  static staticMethod() {
    test = "CHANGED"
  }
  static anotherStaticMethod() {
    console.log(test)
  }
}
