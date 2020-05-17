# The Factory Pattern

| To programmers, the final interface is through stores, not factories!

Just like a factory in the real world, the purpose of a factory is to create objects
"Object creation happens in the factories"

Also, like in the real world, a flow of objects to the user is similar to real life

Objects are designed in their own classes
Objects are created by factories
Stores order factories to create objects
Programmers orderObject() from stores

Coursera Example:

- Object Class: Knife
  - Subclass: SteakKnife
  - Subclass: ChefKnife
- Factory Class: Knife Factory
  - Benefits:
    - If there are multiple clients that want to instantiate the same set of classes, then factory objects can cut out redundancy
  - Creates Knives by Type
  - has createKnife factory
- Store Class: Knife Store
  - passed a factory when created
  - has orderKnife method
