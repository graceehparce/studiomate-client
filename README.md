# StudioMate

StudioMate is an administrative support application created to help private music teachers communicate more efficiently and effectively with their students.

## Application Overview 
As a music teacher, I always found myself scrambling, trying to remember if I emailed this person about their next lesson or whether or not that student paid me for last month. This application is dedicated to the teachers who love teaching but hate all the administrative tasks and organization required to run their own private teaching studio. Teachers can message their students, create assignments and invoices, send schedule requests and even store a body of resources they anticipate students will need in the future. It's the one-stop-shop admin app for teachers who need a little organizational support.

This project is my fullstack capstone, the culmination of a 6 month intensive full stack coding bootcamp. My goals were to explore the power of server side by incorporating complex logic on server side thereby lightening client side's responsibility. I also wanted to experiment with using a framework for my front-end styling and implement additional tools like cloudniary.

## Features 
- All users can create and edit their profiles 
- Teachers can create assignements 
- Teachers can create and update invoices 
- Teachers can create and delete schedule requests 
- Students can update schedule requests 
- All users can create messages 
- Teachers can create and delete resources

## Technology Used 
- JavaScript 
- Django 
- Python 
- React 
- CSS 
- HTML 
- Mantine
- Cloudinary

## Running This Application 
###### Start Client Side 
1. Clone this repository and change to this directory in the terminal. 
```
git clone git@github.com:graceehparce/studiomate-client.git 
cd studiomate-client
```
2. Start development server 
```
npm install --save react-router-dom 
npm start
```

###### Start Server Side 
1. Clone the server repository and change to that directory in the terminal. 
```
git clone git@github.com:graceehparce/studiomate-server.git 
cd studiomate-server
```
2. Start virtual environment 
```
pipenv shell
```
3. Start the debugger to run server 
```
python manage.py shell
```

###### Demo User Login 
To view the application as a teacher, please sign in using the following credentials:
```
username: GParce 
password: Gracie 
```

To view the application as a student, please sign in using the following credentials:
```
username: TClancy 
password: Tom
```

## Demo In the making...please check back again!

## ERD [StudioMate.pdf](https://github.com/graceehparce/studiomate-client/files/10367061/StudioMate.pdf)

## Wireframe https://sketchboard.me/PDyQSOtIHev#/
