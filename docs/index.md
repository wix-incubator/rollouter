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

## Playgound

You can play with different config and user IDs.
ID is persisted into cookie and you'll get same set of experiments next time arriving to this page.

### Config

<textarea id="configEditor" name="config"
          rows="20" cols="80">{
  "features": {
    "myFeature": {
      "default": "A",
      "experiments": [{
        "variants": [{
          "slice": 0.5,
          "value": "B"
        }]
      }]
    }
  }
}
</textarea>  

### User id

<input id="identity" text="">
<button id="newIdentity" text="new identity">new identity</button>

### Congrats you've got:
<div id="out">
</div>

<script src="https://unpkg.com/rollouter@1.0.21/dist/index.js"></script>
<script src="https://unpkg.com/uuid4"></script>
<script>
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
const id = getCookie('id') || uuid4();

const configEl = document.getElementById('configEditor');
let instance = rollouter.config(JSON.parse(configEl.value)).user(id);
configEl.addEventListener('input', function() {
  instance = instance.config(JSON.parse(configEl.value));
  output();
});
const identityEl = document.getElementById('identity');
identity.value = id;

function updateIdentity() {
  instance = instance.user(identityEl.value)
  document.cookie = 'id=' + identityEl.value;
  output();
}

updateIdentity();


identityEl.addEventListener('input', updateIdentity);
const newIdentityBtn = document.getElementById('newIdentity');
newIdentityBtn.addEventListener('click', function () {
  identityEl.value = uuid4();
  updateIdentity();
});

function output() {
  document.getElementById('out').textContent = JSON.stringify(instance.conduct());
}
</script>
