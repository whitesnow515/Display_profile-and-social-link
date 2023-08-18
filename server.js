const express = require("express");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;

/* multer here for handle multipart/form-data*/

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const s3 = new S3Client
({ 
  region: 
  process.env.AWS_REGION 
});

const upload = multer({ dest: 'uploads/' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("link-sharing");
    const profiles = db.collection("profiles");

    app.get("/preview/:id", async (req, res) => {
      const profileData = await profiles.findOne({ _id: req.params.id });

      if (!profileData) {
        return res
          .status(404)
          .json({ error: "No profile found with the given id" });
      }

      res.json(profileData);
    });

    app.post("/", upload.single("image"), async (req, res) => {
      if (!req.file) {
        console.log("No file received");
        return res.send({ success: false });
      } else {
        try {
          const profileData = JSON.parse(req.body.profileData);
          const parsedForms = JSON.parse(req.body.forms);

          const fileContent = fs.readFileSync(req.file.path);

          const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: req.file.originalname,
            Body: fileContent,
          };

          await s3.send(new PutObjectCommand(uploadParams));

          const image = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${req.file.originalname}`;

          fs.unlinkSync(req.file.path);

          const id = uuidv4(); // generate a unique ID

          const completeProfileData = {
            _id: id,
            ...profileData,
            image,
            forms: parsedForms,
          };

          await profiles.insertOne(completeProfileData);

          res.status(200).json({ id, ...completeProfileData });
        } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: "Internal server error" });
        }
      }
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
