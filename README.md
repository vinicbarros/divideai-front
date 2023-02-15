<div align="center"><img src="https://i.imgur.com/S9iBF0N.png"></img></div>
<hr>
<h1 align=center>Divide Aí</h1>
<h3 align=center>The easiest way to share a bill with your friends!</h3>
<br>
<div align=center style="display:flex; justify-content: center; gap:5%">
    <h4>Divide Ai is a web application built with React.JS for people who struggle to split bills with others without any control of who paid and who didn't. One of the main focus of this app is to help people who lives together control expenses.</h4>
    <h5>Here you can see the full repository of this application: https://github.com/vinicbarros/DivideAi</h5>
</div>

## Features

- Sign up
- Login (Manual and OAuth)
- Persistent sessions
- Show list of your shared bills
- Create new bill
- Delete bill
- See infos of the bill
- Select friends to share bills
- Add new friends
- Accept or refuse friends requests
- Delete users of your friend list
- Mark if you already paid the splitted bill
- View a history of your bills

<br>

<h2 align=center>Sign-In/Sign-Up Pages</h2>
<div align=center>
<img style=" width: 600px" src="https://i.imgur.com/tp6qdv5.png"></img>
</div>

## Motivation

This idea came up when I saw my girlfriend struggling to find out if her house bills had already been paid (she lives with two friends and they share all expenses).

<br>
With that in mind, I decided to create an application that would not only help her, but other people who have the same problem.

The differential of Divide Aí is the ease of splitting an account and also the friendship system that makes the app much friendlier.

<br>
So my goal is to improve this project with new features (chat with friends, notification system, and others) to help anyone ho needs a bill splitter app.

<br>

## Built with


<p>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E">
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" />
</p>

<br>

## How to run


1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Populate `.env` file based on `.env.example`. `VITE_BASE_URL` should point to your API server (divideai-back)

4. Run the back-end in a development environment:

```bash
npm run dev
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running application with Docker


1. You need to have installed docker and docker-compose to proceed
2. Run docker compose

```bash
docker-compose up --build
```

3. Clone the back-end project and run the instructions at https://github.com/vinicbarros/divideai-back
4. Making sure that you done all the steps, you can access the app through http://localhost:80

<br>

## Contact


Feel free to contact me in Linkedin!

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/ovinibarros/
