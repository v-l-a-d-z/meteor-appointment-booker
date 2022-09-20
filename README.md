# meteor-appointment-booker

A simple appointment booker app.

The app allows authenticated user to create and edit appointments. The list of user's ordered appointments is displayed as well. User can search in the list by 'First name' or 'Last name'.

## Technology

The app is written in [Meteor framework](https://www.meteor.com) leveraging Typescript, ReactJS and MongoDB. The UI has some basic responsivness to fit on small screens.

## Prerequisities

- Node.js version >= 10 and <= 14
- Meteor ([install](https://docs.meteor.com/install.html))

### Supported web browsers

- Safari (15.5)
- Opera (90.0)

## Run and install

To install all dependencies run:

`meteor npm install`

To start the project run:

`meteor run` or `npm start`

To execute tests run:

`npm run test`

### Test data

For testing purposes two users are seeded if none is present (testuser1/pass, testuser2/word) together with randomly created future appointments.

## List of tasks

- T1 Create project and setup stack
- T2 User can authenticate
- T3 User can create appointment
- T4 User can see appointments
- T5 User can edit appointment
- T6 User can filter appointments
- T7 User can see form errors
- T8 Improve UI styling
- T9 Restrict dates for new appointment to today and future days
- T10 Safeguard inputs to server appointments methods
- T11 User can see active buttons click
