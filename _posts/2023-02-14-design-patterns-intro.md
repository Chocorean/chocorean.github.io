---
layout: article
title:  Happy Valentine's Day to my 22 friends 💖
subtitle: Exploring design patterns
date: "February 2, 2023"
tags: [design patterns, software architecture, software design, singleton]
categories: ["design patterns"]
published: false
---


Welcome to another article no one asked for, which subject had probably been 
written about many times, in much better ways!!! Today we will explore design 
patterns, *woot woot!*

More seriously, I have never been very interested by design patterns, however 
today I woke up and wanted to know them better. Catching up the time I wasted 
at school playing video games instead of listening. This article starts a serie 
of articles about trying to understand the most common design patterns, and see 
if they can easily be used in Rust. I already worked with a few of them, but I 
want to know them better.

### Menu

1. [Definition](#definition)
2. [Today's pattern](#todays-pattern)
3. [Resources](#resources)

## Definition

For those of you who have spent the last two decades in a cave, or if you don't 
know much about programming (no other possible option here 🤔), what is called 
a **design pattern** is a good answer to a common problem one can meet 
will designing a software. **Refacting Guru**<sup>[1](#resources)</sup> 
defines them as *"a blueprint that you can customize to solve a particular 
design problem in your code"*.

What does that even mean? A design pattern gives a partial solution to an issue
. I see them as answers to *"How to ...?"* -like questions:

> \- How do I know when the state of my entity is updated?
>
> \- Implement the **Observer** design patttern!

> \- How to interface two very different objects?
>
> \- You need to write an **Adapter** class!

> \- How do I make sure this class is only instanciated once?
>
> \- Make it a **Singleton** class!

And as you can probably tell... the list goes on. We all might already be using 
design patterns for our applications without even knowing it.

Design patterns fall into three main categories, and this is how I understand 
each:

- **creational** patterns: they provide flexible and reusable ways to easily 
create complex objects.
- **structural** patterns: they try to group objects into larger structures.
- **behavioral**: they focus on how objects and classes interact and 
communicate with each other.

## Today's pattern

Because it is very tempting, let's try to implement a first design pattern. I 
don't understand quite well the structural category, so let's work with the 
**Decorator** pattern.

I have use ChatGPT<sup>[2](#resources)
</sup> to generate a relevant example, and that is also the first time I am 
using it to produce actual code. Let's see if it can impress us:

{% highlight rust %}
#![feature(trait_upcasting)]

// Define the Coffee trait with a get_cost() method to calculate the base cost of a cup of coffee.
trait Coffee {
    fn get_cost(&self) -> f32;
}

// Implement the Coffee trait with a basic coffee class.
struct BasicCoffee;

impl Coffee for BasicCoffee {
    fn get_cost(&self) -> f32 {
        2.0
    }
}

// Define a decorator trait with a reference to a Coffee object and a get_cost() method to add the cost of the decorator.
trait CoffeeDecorator: Coffee {
    fn new(coffee: Box<dyn Coffee>) -> Box<dyn CoffeeDecorator>
    where
        Self: Sized;
}

// Implement the CoffeeDecorator trait with a vanilla flavor decorator class.
struct Vanilla {
    coffee: Box<dyn Coffee>,
}

impl Coffee for Vanilla {
    fn get_cost(&self) -> f32 {
        self.coffee.get_cost() + 1.0
    }
}

impl CoffeeDecorator for Vanilla {
    fn new(coffee: Box<dyn Coffee>) -> Box<dyn CoffeeDecorator> {
        Box::new(Vanilla { coffee })
    }
}

// Implement the CoffeeDecorator trait with a whipped cream topping decorator class.
struct WhippedCream {
    coffee: Box<dyn Coffee>,
}

impl Coffee for WhippedCream {
    fn get_cost(&self) -> f32 {
        self.coffee.get_cost() + 0.5
    }
}

impl CoffeeDecorator for WhippedCream {
    fn new(coffee: Box<dyn Coffee>) -> Box<dyn CoffeeDecorator> {
        Box::new(WhippedCream { coffee })
    }
}

fn main() {
    // Create a basic coffee object and decorate it with a vanilla flavor and whipped cream topping.
    let coffee = Box::new(BasicCoffee);
    let coffee = Vanilla::new(coffee);
    let coffee = WhippedCream::new(coffee);

    // Calculate the cost of the decorated coffee object.
    let cost = coffee.get_cost();
    println!("The cost of the coffee is ${:.2}.", cost); // The cost of the coffee is $3.50.
}
{% endhighlight %}

And... it almost works! We just need to use Nightly<sup>[3](#resources)</sup> 
and to activate the `#![feature(trait_upcasting)]` at the beginning of the file
. That is also my first time using Nightly.

## Resources

- [1] [Refactoring Guru](https://refactoring.guru/)
- [2] [ChatGPT](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- [3] [Nightly](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
