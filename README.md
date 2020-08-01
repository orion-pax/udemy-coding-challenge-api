# Quiz App (Backend)

This is a custom API implementation for a quiz-taking system.<br/>
The associated app is hosted at [Quiz App](https://orion-pax.github.io/quizapp/).<br/>
Alternatively check out the screencast of how the app works [here](https://drive.google.com/file/d/1ex-kDDXoj0HSnZNkrhfXBieejncHE83C/view?usp=sharing).<br/>

## Functional specifications

* The API responds with the the quizzes available and associated questions.
* The API marks the answer sheets for a quiz and responds with the results to the requesting client app.
* The API stores a quiz with multiple-choice questions and user's results in a database.

## Stack Used

- **Nodejs** was used with the following dependencies:<br />
1. cors<br /> 
2. express<br />
3. mongoose<br />
4. shortid<br />

- **MongoDB**
1. MongoDB Atlas<br />

## Database Structure

- Since the database used is a nosql type we can store nested objects for entity dependencies thus simplifying the database design.
- With that in mind, a **quizzes** and **answersheets** collection will just suffice.
 
### Quizzes Collection

- This collection houses the quiz together with its associated list of questions which in turn have a list of options available as answers.
- The question options have at least 1 correct answer for the question which is identified by the option's isAnswer attribute. However, *validation for this feature has been left out on this iteration.*
- The quiz has a unique code generated using *shortid* which is shorter than the default collection's ___id__ property. This will be used to uniquely identify the quiz and associate the answersheets for the quiz by the UI client.
- The quiz's total marks is an aggregate of adding the respective maximum possible marks for the associated questions.
- The collection structure is outlined below:

![quizzes collection](https://drive.google.com/uc?export=view&id=1sUW3hOJdk3ljnR_cckbgcG47GC7_Fgmk)

### AnswerSheets Collection

- This collection houses the answers to quiz questions for a particular user.
- The user is identified by a unique *shortid* generated code to associate users's responses to the quiz questions.
- The collection also stores the total marks, final score, percentage score and grade remark i.e Fail/Pass
- The schema is as follows:

![answersheets collection](https://drive.google.com/uc?export=view&id=1vEGYt5g7NJ1eE8urYW7OMO6wLPQ-hqI-)

## API routes

- The Api defines the following endpoints: 

### /quizzes

- A logical grouping of all request endpoints related to the quizzes collection. 

1. **/** : 
  - For creating a new quiz
  - *type:* **POST** 
  - Sample request object:
  ![answersheets collection](https://drive.google.com/uc?export=view&id=1Sr6Yd3qbM7Zk2_oCW6wg_fLXUfhE1Uw1)

2. **/code/{code}** : 
  - Get a specific quiz using its code
  - *type:* **GET** 
  
3. **/list/** : 
  - Get list of available quiz names and associated codes.
  - *type:* **GET** 
  
### /answer_sheets/

- A logical grouping of all request endpoints related to the answersheet collection. 

1. **/** : 
  - For creating a new answersheet
  - *type:* **POST** 
  - *returns:*  generated user id to be used to retrieve the results.
  - Sample request object:<br/>
  ![answersheets post](https://drive.google.com/uc?export=view&id=1WemDV94rMOrNhE6D4iNOUX8I9zPhuYQY)

2. **/user/{user}** : 
  - Get a specific quiz results using generated user id
  - *type:* **GET** 
  - Sample response object:<br/>
  ![answersheets results](https://drive.google.com/uc?export=view&id=1eKV1BWfdCAuN6nIQ36KH3WPPzU8ftq13)

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
First configure the backend mongodb url in  the **dbconfig.js** under configs directory before running the api
```javascript
module.exports = {
    url: 'mongodb+srv://<username>:<password>@sandbox-ujfgm.mongodb.net/udemy_coding_challenge?retryWrites=true&w=majority'
}
```
## UI Details

You can learn more about the UI at [Quiz App UI](https://github.com/orion-pax/udemy-coding-challenge-web).

## Trade-offs

- Used MongoDb to quickly come up with a usable non-relational schema instead of a relational one using references or MySql
- Object destructuring was used for some JSON response objects derived from the database schema as opposed to building custom queries or DTOs.

## Additional Functionality

- Given additional time is spent on this API, the following functionality can be added:

1. A relational database like Mysql can be used with separate related tables. 
  - quiz {id, name, description, type, mode, createdAt, updatedAt, isEnabled}
  - questions: {id, quiz_id, narrative, marks,createdAt, updatedAt, isEnabled, maximum_answers}
  - options: {id, question_id, narrative, createdAt, updatedAt,isEnabled, isAnswer}
  - answer_sheets: { id, user_id, question_id, option_id, createdAt, updatedAt}
  - results: {user_id, createdAt, score, percentage, quiz_total_marks, grade }
2. Introduce impementation of a timed quiz
3. Setup endpoints to allow revision for the quiz after the results have been shown.
