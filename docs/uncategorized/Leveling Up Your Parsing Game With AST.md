---
title: "Leveling Up Your Parsing Game With AST"
description: "Being able to understand how something is abstracted away and why can make you a better programmer  용어  Parse Resolve Component parts and describe the"
date: 2022-04-17T02:22:58.898Z
tags: []
---
> Being able to understand how something is abstracted away and why can make you a better programmer



## 용어


### Parse
- Resolve Component parts and describe their syntatic roles 
### Tree
- Abstract data type that simulates hierarhical tree structure


### Parse Tree

- Every developer needs to make sure their code is understood by machines 
- This is one of the underlying abstractions that allow the code that we write to become readable by computers. 
- Pictorial version of the grammatical structure of a sentence. 
- Gives concrete idea of the syntax of the particular sentence. 
- Used in pedagogy(study of teaching) to teach students how to identify parts of a sentence. 

#### Sentence Diagramming (Sentence breaking into smallest parts) example

![](/velogimages/bbfe39ab-b281-441c-8e67-cf16cb385458-image.png)

#### Code Diagramming
- All of our code can be simplified into sets of expressions. 
- EX) Calculator program

SYNTAX
![](/velogimages/7ee5756d-c6eb-4917-8a0c-4b2d647d2fb7-image.png)

APPLIED
![](/velogimages/4471e909-f578-405f-b477-bff958abb43a-image.png)




### AST (abstract syntax tree)
- Simplified , condensed parse tree / syntax tree
- contains info. related to analyzing source text
- ignores extra syntatic info. used in parsing text 



## 출처
https://www.geeksforgeeks.org/parse-tree-in-compiler-design/

https://medium.com/basecs/grammatically-rooting-oneself-with-parse-trees-ec9daeda7dad

https://medium.com/basecs/leveling-up-ones-parsing-game-with-asts-d7a6fc2400ff

