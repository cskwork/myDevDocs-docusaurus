---
title: "AWS Amplify - React App Demo"
description: "AWS Amplify란 기본 제공 CICD 워크플로를 통해 정적 웹 애플리케이션의 글로벌 배포 및 호스팅을 지원하는 완전관리형 서비스. 단순히 Amplify 콘솔에서 애플리케이션의 코드 repository를 연결하기만 하면 코드를 커밋할 때마다 프런트엔드와 백엔드의 "
date: 2022-10-29T06:29:41.082Z
tags: []
---
### AWS Amplify란
- 기본 제공 CI/CD 워크플로를 통해 정적 웹 애플리케이션의 글로벌 배포 및 호스팅을 지원하는 완전관리형 서비스. 
- 단순히 Amplify 콘솔에서 애플리케이션의 코드 repository를 연결하기만 하면 코드를 커밋할 때마다 프런트엔드와 백엔드의 변경 사항이 단일 워크플로로 배포된다.
- 즉, Git repository와 연동시킨 뒤, Git에 소스코드를 Push하는 것만으로 프로젝트가 빌드되고 그 결과물을 호스팅까지 해주는 서비스

**예상 소요시간 : ~10분**

![](/velogimages/ab641bb4-f426-4dc5-ab3b-21212e85f3a8-image.png)


#### Windows Using CMD
### 1 Setup Amplify Profile (region, IAM-identity&Access)
```bash
npm i -g @aws-amplify/cli
# npm install aws-amplify
amplify.cmd
amplify.cmd configure
```
![](/velogimages/dbcd8bf1-2381-4c5f-8a22-debadad4ecac-image.png)

### 2 Setup React app & Amplify
```bash
npx create-react-app react-amplified
cd react-amplified
npm start
amplify init
```
![](/velogimages/f3f2867e-a5d9-4669-8efa-071f2a99fcd0-image.png)

```
aws-exports.js - keep track of all resources in frontend ex bucket
```

### 3 Check in AWS Cloud Formation
![](/velogimages/37ed05d3-a8b7-4776-862c-67c1b599d0a9-image.png)

### 4 Put AWS Amplify Lib into App src/index.js
```bash
npm install aws-amplify

# ADD TO src/index.js
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);
```
### 5 Add GraphQL API To App AND PUSH
```bash
amplify add api
amplify push
```
#### Check Installation
amplify/backend/api/myapi/schema.graphql
```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```
#### Check Status
```bash
amplify status
amplify console
```
#### View GraphQL API
```bash
amplify console api
# TEST API
amplify mock api
```
### 6 Connect FrontEnd To API src/App.js
```js
/* src/App.js */
import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App
```
#### Check App & AWS DynamoDB
```bash
npm start
```
![](/velogimages/7779bd69-23d8-4a83-ae95-4c1bbd852f31-image.png)

### 7 Add Authentication
```bash
amplify add auth
amplify push 
amplify console
```

### 8 Add Login UI (Amplify UI Authenticator component)
```bash
npm install @aws-amplify/ui-react
```
#### src/App.js Update
```
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

/* src/App.js - Pass parameter to App */
const App({ signOut, user }) => { 
  // ... 
}

// Add to Top
return (
  <div style={styles.container}>
    <Heading level={1}>Hello {user.username}</Heading>
    <Button onClick={signOut}>Sign out</Button>
    <h2>Amplify Todos</h2>
//...

// Wrap export default App with withAutenticator()
export default withAuthenticator(App);
```
#### Check Auth
```bash
npm start
```
![](/velogimages/e6b84a21-f2cc-4e41-a392-fd85a558c597-image.png)


### 9 Host App
```bash
amplify add hosting
amplify publish
```

> amplify publish issue 발생 S3 Bucket 권한 이슈 가능성이 높다. 처음 amplify IAM 생성시 버킷에 대한 권한을 추가하거나, 버킷의 권한 정책에 추가 또는 public으로 일시적으로 변경해서 올려보자


![](/velogimages/1e27379b-3f8c-4641-87a3-690f28010aaa-image.png)

![](/velogimages/545e750f-bc19-4343-8394-9f480d317788-image.png)

_**엄청난 툴이다**_

### 출처
https://www.youtube.com/watch?v=Kis1iYWIpi0&list=PLrwNNiB6YOA2rrpLDwmTQfkDc_RQxufij&index=3

https://docs.amplify.aws/

https://docs.amplify.aws/start/getting-started/installation/q/integration/react/#option-2-follow-the-instructions

https://velog.io/@combi_jihoon/aws-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%A0%95%EB%A6%AC-amplify