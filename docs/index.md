# Rollouter


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
  });
</script>
