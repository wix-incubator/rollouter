# Rollouter

Cryptography based, feature toggle / AB-test library.

Rollouter helps to roll out new features in a smart way. It requires no server and can be set up on the fly.
The Idea behind rollouter is to ship consistent  AB-test test and feature toggle with the possibility to gradually increase audience reach.
A user will not only consistent see the result of conduction. Also, the change of proportions will affect only users from 'A' bucket.
A second important feature of rollouter is the different users will be directed to different splits on each experiment.
So there is no such problem as showing new features only to a certain group of users.

## Live demo

Try it on runkit https://runkit.com/vshuhaiev/rollouter-sample
Simple config playgound https://wix-incubator.github.io/rollouter/

## Quick start

### Install
`
npm i rollouter
`

### Examples
#### Minimal config
Valid config for rollouter should have features field as an object with feature name as key and settings as value.
The only mandatory field is `default`.
In order to conduct an experiment, you should pass config and user ID to determine a user.
It can be any string. Based on this string rollouter will make a decision, which split to apply.
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

const configuredInstance = rollouter
    .config(config)

console.log(`withUser: ${configuredInstance.user('someUserId').conduct('feature1')}`); //true
console.log(`noUser: ${configuredInstance.conduct('feature2')}`); //false
```

#### 50/50 Experiment
In the following case, 50% of users will receive `old version`, 20% and 30% for `new value 1` and `new value 2`
```js
import rollouter from 'rollouter';
const config = {
    features:{
        feature1: {
            default: 'old version',
            experiments: [{
                variants: [{
                    slice: 0.2,
                    value: 'new value 1',
                },{
                    slice: 0.3,
                    value: 'new value 2',
                }],
            }],
        },
    },
};

rollouter
    .config(config)
    .user('user.id')
    .conduct('feature1');
```


#### Include users by any parameter
In the following case, 50% of users will receive `old version`, 20% and 30% for `new value 1` and `new value 2`
```js
import rollouter from 'rollouter';
const config = {
    features:{
        FancyButton:{
            default: false,
            experiments: [{
               includes: {
                   geo: ["US","UK"]
               },
               exclude: {
                   registered: false,
               },
               variants: [{
                   slice: 0.1,
                   value: true,
                }]
            },{
                includes: {
                    eyes: 'blue',
                },
                variants: [{
                     slice: 1,
                     value: true,
                }]
            }]
        },
    },
};

rollouter
    .config(config)
    .user('user.id', {'geo': 'US', eyes:'brown', registered: true})
    .conduct('FancyButton');
```
A new feature will see 10% of users from USA and UK except unregistered and all users with blue eyes. Please note that we do not consider user registration with blue eyes.
