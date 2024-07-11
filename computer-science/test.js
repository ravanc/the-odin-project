const test = function (name, age) {
  return {
    name: name,
    age: age,
    speak: function () {
      console.log(`hello, i am ${name}, currently ${age}`);
    },
  };
};

class Test2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  speak() {
    console.log(`hello, i am ${this.name}, currently ${this.age}`);
  }
}

let person1 = test("me", 19);
let person2 = test("you", 20);

person1.speak();
person2.speak();

let person3 = new Test2("him", 21);
let person4 = new Test2("her", 22);

person3.speak();
person4.speak();
