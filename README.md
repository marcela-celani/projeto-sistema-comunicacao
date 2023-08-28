# Chat App - SEU BONAPP

📝 This project consists of a communication system developed as a technical challenge for the selection process at Seu Boné Company. 
    Note: the logo used does not match the original, having been modified for project pitch purposes, and follows all rights reserved to the owner.

## Description

This is a communication system that allows users to interact with each other through messages. After Authentication with email / password, users can create chats, send messages and communicate, displayed in real time using React Hooks. The data persists in Firebase database, using the Authentication and Firestore resources.

## General info

Table of contents
* [Overview](#overview)
* [Technologies](#technologies)
* [Run & Deploy](#run--deploy)

## Overview

The project has 3 sections:
1. Login Page: where the user can login using email and password registered on the registration page
2. Registration Page: if the user does not have a registration, it is possible to create an account and be redirected to the login page
3. HomePage:
  - Protected page: only if the user is registered, authenticated and logged in can access
  - List of friends: list of registered users with whom you can create private chats and send messages in real time using the text field
  - Navigation bar: has useful information such as the name of the user with whom the chat started and a dropdown menu with information about the logged in user and the log out button.

## Technologies
👩🏻‍💻 Project is created with:
* JSX
* React and React Router DOM
* Styled Componentes
* Chakra UI
* Props
* React Hooks (UseState, UseEffect, useContext, useNavigate)
* Data flux
* Firebase
* Lists rendering
* localStorage
  
## Installation
### Prerequisites:

- Node.js
- npm

1. Clone this repository:
```
git clone https://github.com/marcela-celani/projeto-sistema-comunicacao.git
```
2. Install dependencies:
```
cd design-system-communication
npm install
```

3. Configure your Firebase credentials in src/services/firebase.js.

4. Start the development server:
```
npm start
```

🔗[Deploy](https://marcela-celani.github.io/projeto-sistema-comunicacao/)
