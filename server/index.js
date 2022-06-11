require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const app = express();
const port = process.env.PORT || 3000


app.use(express.json());
app.use(cors());
app.listen(port);

console.log('listening on port:', port);

app.get('/qa/questions', (req, res) => {
  // convert params into numbers
  const product_id = Number(req.query.product_id);
  const page = Number(req.query.page) || 1;
  const count = Number(req.query.count) || 5:
  if (Number.isNaN(product_id) || Number.isNaN(page) || NUmber.isNaN(count)) {
    res.sendStatus(404);
  } else {
    db.getQAbyProductId(req.query.product_id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('error retrieving question ids: index.js', err);
    res.end();
  });
}
})

app.get('/qa/questions2', (req, res) => {
  const product_id = Number(req.query.product_id);
  const page = Number(req.query.page) || 1;
  const count = Number(req.query.count) || 5:
  if (Number.isNaN(product_id) || Number.isNaN(page) || NUmber.isNaN(count)) {
    res.sendStatus(404);
  } else {
    db.getQAbyProductId(req.query.product_id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('error retrieving question ids: index.js', err);
    res.end();
  });
}
})

app.get('/qa/questions/:questions_id/answers', (req, res) => {
  const question_id = Number(req.params.question_id);
  const page = Number(req.query.page) || 1;
  const count = Number(req.query.count) || 5:
  if (Number.isNaN(question_id) || Number.isNaN(page) || NUmber.isNaN(count)) {
    res.sendStatus(404);
  } else {
    db.getAnswersByQuestionId2(question_id, page, count)
    .then((results) => {
      res.status(200).send({
        question: question_id,
        page,
        count,
        results,
      });
    })
    .catch((err) => {
      console.log('GET server /:question_id/answers', err);
      res.sendStatus(500)
    })
  }
})

app.post('/qa/questions', (res, req) => {
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const product_id = Number(req.body.product_id);
  if (Number.isNaN(product_id) || typeof body !== 'string'
  || typeof name !== 'string' || typeof email !== 'string'
  || body.length ===  || name.length === 0 || email.length === 0) {
    res.sendStatus(404)
  } else {
    db.addQuestion(body, name, email, product_id)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('POST server /questions')
    })
  }
})

app.post('qa/questions/:question_id/answers', (req, res) => {
  const question_id = Number(req.params.question_id)
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos;
  if (Number.isNaN(question_id) || typeof body !== 'string'
  || typeof name !== 'string' || typeof email !== 'string'
  || body.length ===  || name.length === 0 || email.length === 0) {
    res.sendStatus(404)
  } else {
    db.addAnswer(question_id, body, name, email, photos)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('POST server /answers', err)
    })
  }
});

app.put('qa/questions/:question_id/report', (req, res) => {
  const question_id = req.params.question_id;

  if (Number.isNaN(Number(question_id))) {
    res.sendStatus(404);
  } else {
    db.reportQuestion(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('PUT server /question_id/report', err);
      res.sendStatus(500);
    })
  }
});

app.put('qa/questions/:question_id/helpful', (req, res) => {
  const question_id = req.params.question_id;

  if (Number.isNaN(Number(question_id))) {
    res.sendStatus(404);
  } else {
    db.setQuestionHelpful(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('PUT server /question_id/helpful', err);
      res.sendStatus(500);
    })
  }
});

app.put('qa/answers/:answer_id/report', (req, res) => {
  const answer_id = req.params.answer_id;

  if (Number.isNaN(Number(answer_id))) {
    res.sendStatus(404);
  } else {
    db.reportAnswer(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('PUT server /answer_id/report', err);
      res.sendStatus(500);
    })
  }
});

app.put('qa/answers/:answer_id/report', (req, res) => {
  const answer_id = req.params.answer_id;

  if (Number.isNaN(Number(answer_id))) {
    res.sendStatus(404);
  } else {
    db.setAnswerHelpful(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('PUT server /answer_id/helpful', err);
      res.sendStatus(500);
    })
  }
});