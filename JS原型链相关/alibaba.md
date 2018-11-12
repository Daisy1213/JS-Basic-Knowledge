 ### 题目：实现一个构造器函数A，同时支持var a = new A()与var a = A()两种形式，且支持A类的继承

首先支持new作用是比较容易实现的(应该是我们拿到这个题目立马能写出来的)
```$xslt
function A(){
    this.name = 'John';
}

A.prototype.say = function(){
    console.log(`I am ${this.name}`);
}
``` 
### 思路 

既然new关键字可以帮我们完成一系列的对象实例化工作，那么当A作为普通函数被调用时也可以在函数内部实现new的整个过程，这样就可以解决问题啦。应该有同学想到直接调用下new是吧，哈哈哈~，我觉得这也太省事了，自己实现new的过程岂不更爽！接下来应该区分A是在哪种形式下被调用的，根据不同的调用方式做不同的处理。

### 问题

- 1、A作为普通函数调用时如何实现new的效果

 > 问题可以转换为new的过程做了什么？
```$xslt
var a = {};
a.__proto__ = A.prototype; //继承构造函数原型的属性和方法
var result = A.apply(a, arguments); //拥有A的实例属性和方法
return type result === 'object' ? result : a;
```

- 2、如何区分A当前是作为构造器使用还是普通函数调用

 > 首先要清楚一下，var a = new A()，此时A中的this指向的是a实例；var a = A()，此时this指向的是window(浏览器中)，因此我们可以根据this是否是A的实例来判断调用方式。

 
解决了上面两个问题，再试着把A函数改写下


### 实现：
```
function A(){
    if(!(this instanceof A)){
        var a = {};
        a.__proto__ = A.prototype; //a是A的实例
        A.apply(a, arguments);
        return a;
    }else{
        this.name = 'John';
    }
    
}

A.prototype.say = function(){
    console.log(`I am ${this.name}`);
}

var a1 = new A();
var a2 = A();
a1.name; //'John'
a2.name; //'John'
a1.say === a2.say; //true
	
```
Yeah~