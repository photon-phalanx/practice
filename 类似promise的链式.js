
//这仅仅是一个看上去像是pomise的链式罢了……
//按照promise的规范，真的有点绕……
//仅仅作为稍微的练习……靠近promise一点点……

/*先看调用的时候，格式类似于
 var p = (function(){
 return new SelfPromise(function(resolve){
 setTimeout(function () {
 resolve("first")
 },0);
 })})();

 p.then(function (value) {
 console.log(value);
 return 2;
 }).then(function(value){
 console.log(value);
 });

 要实现他，就要保证，这个promise自带一个resolve，一个then，这个都是没有显式定义的，所以在promise里定义
 resolve推进状态，then承接下一个，事实上这个missionList感觉只会有一个mission（如果只做最基本功能的话）
*/

function delay(fn){
    setTimeout(fn,0);
}



function SelfPromise(fn) {
    this.missionList = [];
    this.state = "pending";
    this.result = undefined;
    //必须绑定，否则这个this是window
    fn(this.resolve.bind(this))
}
SelfPromise.prototype = {
    constructor: SelfPromise,
    resolve:function(value){
        this.result = value;
        this.state = "fulfuiled";
        for(var i=0;i<this.missionList.length;i++){
            this.result = this.missionList[i](this.result);
        }
    },
    then:function (newFn) {
        if(this.state === "pending"){
            this.missionList.push(newFn);
        }else {
            this.result = newFn(this.result);
        }
        return this;
    }
}

var p = (function(){
    return new SelfPromise(function(resolve){
        setTimeout(function () {
            resolve("first")
        },0);
    })})();

p.then(function (value) {
    console.log(value);
    return 2;
}).then(function(value){
    console.log(value);
});
