# Rollouter

Rollouter is simple cryptography based distributed solution that provides
implementation to start using feature toggles or AB tests in the project.

Rollouter has zero dependencies on infrastructure or external services.
Does not require central and does not introduce latency when checking values for
feature flags.

## How it works

```
  Feature: A - 50%, B - 50%

                ,---------.                     ,---------.
                | Server1 |           +-------->| Server2 |
                `--+--+---'           | +-------`--+--+---'
                   ^  |               | |          ^  |
                   |  |               | |          |  |
         I'm Alice |  |               | |          |  |
                   |  |               | |          |  |
                   |  | You get A     | |  I'm Bob |  |   You get B
                   |  V               | |          |  V
                    ,-.  -------------+ |           ,-.
                    `-'                 |           `-'
                    /|\  <--------------+           /|\
                     |     You get A                 |
                    / \                             / \
                   Alice                            Bob
```

When used identical config on `Server1` and `Server2` ~50% of users will get A
other 50% of users will get B.

## Example

This page uses Rollouter to show you A or B.
You IP is used as you identifier, so while you keep visiting this page from
same IP you'll keep getting same value all the time.

### Congrats you've got:
### A {#featureValue}

<script src="https://unpkg.com/rollouter/dist/src/index.js"></script>
<script>
fetch('https://myip.addr.space/ip')
  .then(function(ipResponse){return ipResponse.text()})
  .then(function(ipResponse){return ipResponse.text()})
  .then(function(ip){
    var featureValue = Rollouter.config({
      features: {
        myFeature: {
          default: 'A',
          experiments: [{
            variants: [{
              slice: 0.5,
              value: 'B'
            }]
          }]
        }
      }

    }).user(ip).conduct('myFeature');
    console.log('YOU GOT', featureValue);
    document.getElementById('featureValue').textContent = featureValue;
  });
</script>
