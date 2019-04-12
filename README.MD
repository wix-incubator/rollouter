# Rollouter

Cryptography based, feature toggle / AB-test library.

Rollouter helps to roll out new features in a smart way. It requires no server and can be set up on the fly.
The Idea behind rollouter is to ship consistent  AB-test test and feature toggle with the possibility to gradually increase audience reach.
A user will not only consistent see the result of conduction. Also, the change of proportions will affect only users from 'A' bucket.
A second important feature of rollouter is the different users will be directed to different splits on each experiment. 
So there is no such problem as showing new features only to a certain group of users.

## Quick start

### Install
`
npm i rollouter
`

```js
import rollouter from 'rollouter';
const config = {
    features:{
        feature1:{
            default: true,
        },
         feature2:{
            default: false,
        },
    },
};

rollouter
    .config(config)
    .user('userId')
    .conduct('feature1') //true

rollouter.conduct('feature2') //false
```
