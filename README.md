# Expected Request
`post /ticket`
`Content-Type: application/json`
### Body

```javascript
{
    "drawDate":"2021-10-13",
    "tickets": [
        {
            "powerNumber": 15,
            "normalNumbers": [23, 30, 48 , 55, 35]
        }
    ]
}
```
# Expected Response
### Body

```javascript
{
    "drawDate": "2021-10-13",
    "tickets": [
        {
            "powerNumber": 15,
            "normalNumbers": [
                23,
                30,
                48,
                55,
                35
            ],
            "prizeData": {
                "luckyDraw": {
                    "drawDate": "2021-10-13T00:00:00.000",
                    "powerNumber": 15,
                    "normalNumbers": [
                        23,
                        29,
                        47,
                        59,
                        60
                    ]
                },
                "powerNumberMatch": true,
                "normalNumbersMatch": 1,
                "reward": 4
            }
        }
    ]
}


```

# Interview Exercise

Your goal is to extend the functionality of this Node.js service.

Powerball is a popular US lottery game with draws twice a week. For the purposes of this exercise, a Powerball lottery "ticket" includes the date of the draw and one or more "picks". Each "pick" is a set of 5 integers (from `1`-`69`) along with a 6th integer (the _Powerball_, from `1`-`26`).

For example, a pick for the draw on `2017-11-09` might be:

`02 14 19 21 61` `25`

Your application's API will accept data for a lottery ticket, and respond with whether each pick has won, the prize won per-pick, and the total of all prizes won on the ticket. It is up to you to design and build this API.

The Powerball winning numbers change on each "draw date". In order to determine a win or a loss, your application will have to retrieve the Powerball draw dates and winning numbers from the following public URL:

[https://data.ny.gov/resource/d6yy-54nr.json](https://data.ny.gov/resource/d6yy-54nr.json)

To calculate the prize, consult the prize matrix image below:

![Powerball Rules](powerball_rules.png?raw=true)

## Exercise Rules

- There is no time limit to this challenge.
- Use your best discretion with the design and requirements, but you can ask questions.
- You must use JavaScript and must extend this code base.
- There is no need for a UI to solve this problem.
- Follow modern JavaScript and Node best practices and conventions to the best of your ability.
- You are free to add packages, tools or improvements to your project as you see fit.
- We expect you to write the kind of feature you would put into production, including tests and documentation as you see fit.

## Installation

This app requires:

- A Linux or MacOS Environment _(Windows Untested)_
- Node.js LTS 14+

If you do not have node.js installed:

1. [Install NVM](https://github.com/creationix/nvm#installation)
2. [Install Node 14](https://github.com/creationix/nvm#usage) `nvm install 14`
3. [Switch to Node 14](https://github.com/creationix/nvm#usage) `nvm use 14`

## Starting the App

From the checked-out application folder, run:

`npm install`

This will install dependencies.

`npm start`

You should see output like this:

```
node index.js
App listening on port 3000
```

You can then hit the default endpoint:

`http://localhost:3000/`

You should see something like this:

```json
{
  "message": "Hello World"
}
```

To shutdown the server simply send a `^C`.

## Testing

To run the existing (sample) tests simply use:

`npm test`

You should see output like this:

```txt
 Test Suites: 3 passed, 3 total
 Tests:       5 passed, 5 total
 Snapshots:   0 total
 Time:        2.585s
 Ran all test suites.
```

## Submission

Make your changes and then create a zip file to send back to us. Make sure you don't include `node_modules` in the zip file. Send your solution back to the person who emailed you the original problem.

## Contact

We encourage you to use your best discretion, but also to ask questions and communicate if you need it.
