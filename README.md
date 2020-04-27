# op-team-al
## Talent Management System

This is a talent management system that ensures the proper talent is assigned to the correct project by recommending the best canidates for the project. 
![Architecure](https://github.com/Johnnie843/op-team-al/blob/master/Documents/Architecure/ArchitecureOverview.PNG)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Django Backend Instructions
### Prerequisites
You will need Python 3.* installed and basic knowledge of running Python cmds
```
https://www.python.org/downloads/

```
You will also need to start a virtual enviorment inside the Django project
```
https://docs.python-guide.org/dev/virtualenvs/
```
### Installing

1)From the base of the repo, navigate to the /opteamal_app/opteamal_be/opteamal/
```
cd opteamal_app
cd opteamal_fe
cd opteamal
```

2)Install all dependencies with this command
```
pip install -r requirements.txt
```
2)Setup DEV Database

```
python manage.py makemigrations
python manage.py migrate
```

### Deployment

1)Start Django Project
```
python manage.py runserver
```
2)Navigate to "http://localhost:3000/admin/dashboard"


# ReactJS Frontend Instructions

### Prerequisites

NodeJS will need to be installed for the frontend portion you can download it here 
```
https://nodejs.org/en/
```

### Installing

1)From the base of the repo, navigate to the /opteamal_app/opteamal_fe/opteamal/
```
cd /opteamal_app/opteamal_fe/opteamal/
```

2)Run the command "npm install"
```
npm install
```
### Deployment

1)Run the command "npm install"
```
npm start
```
2)In your browser, navigate to "http://localhost:3000/admin/dashboard" to ensure the server has started

