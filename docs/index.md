# Rollouter

Rollouter is simple cryptography based distributed solution that provides
implementation to start using feature toggles or AB tests in the project.

Rollouter has no dependencies on infrastructure or external services.
Does not require central and does not introduce latency when checking values for
feature flags.

## Example

This page uses Rollouter to show you A or B.

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
