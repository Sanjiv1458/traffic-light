const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');

const app = express();
const port = 3000;

// MQTT settings
const mqttServer = 'mqtt://broker.hivemq.com';
const mqttClient = mqtt.connect(mqttServer);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index2.html');
});

app.post('/control', (req, res) => {
  const light = req.body.light;
  const color = req.body.color;

  // Publish the control message to the MQTT topic
  mqttClient.publish(`traffic-light-${light}`, color);

  res.redirect('/');
});

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
