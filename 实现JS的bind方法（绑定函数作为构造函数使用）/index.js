Function.prototype.bind = function () {
    var self = this;
    var context = Array.prototype.shift.apply(arguments);
    var args = Array.prototype.slice.apply(arguments);
    var bindFun = function () {
        //由于这里返回的是undefined，因此作为构造器返回this，（除非显示的返回object类型的对象，否则默认返回this）
        return self.apply((this instanceof self ? this : context), args.concat(Array.prototype.slice.apply(arguments)));
        // 此处的对于this是否为self实例的判断，是为了保证绑定函数作为构造器函数使用时创建的cat实例拥有say方法
    };

    bindFun.prototype = new self(); //此处的绑定函数继承Animal构造函数，是为了保证定函数作为构造器函数使用时创建的cat实例可以继承Animal，拥有common属性
    // bindFun.prototype = Object.create(self.prototype);//意义同上
    return bindFun;
};

function Animal(name, color) {
    this.say = `I am a ${color} ${name}!`;
}

Animal.prototype.common = 'common';

var Cat = Animal.bind(null, "cat");
var cat = new Cat('white');


//从需求看来，需要实现Cat的原型对象和Animal的原型对象都在cat的原型链上
//即：Cat.prototype = new Animal();
if (cat.say === 'I am a white cat!' && cat instanceof Cat && cat instanceof Animal) {
    console.log('success');
}