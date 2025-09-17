const express = require('express');
const cors = require('cors');
const { Firestore } = require('@google-cloud/firestore');

const app = express();
app.use(cors());

const firestore = new Firestore();

app.get('/', async (req, res) => {
  const bean = req.query.bean;
  if (!bean) {
    return res.status(400).json({ error: "Missing 'bean' parameter" });
  }

  try {
    const doc = await firestore.collection('coffeeStock').doc(bean).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Bean not found" });
    }

    res.json({ stock: doc.data().stock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Required for Cloud Run
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
