import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "ecommerce-backend-7518c",
  private_key_id: "a363532c1257e0fd1c6bb3ff437a3a65433a4b1f",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZf18JZprzqua2\nrMJzB9mfNJyhYmhdukc9AghIY/PrMmgnZFQgJqh1jmJCRSiYud2Tws1QhmpyaMGt\nn/vSDKgm6FvMTiAeExPwNs/LFygjtGCByD7R4PubIS79vnAQsXlFLtVxj6AOU+kF\ndG88Mz8aWivelfyVTJrDUEtYMstxfKlMsecIFwHKzc2l51aqlmFKS7+hOQEoMF+5\nn5rs5dJDf8UU1e3goPbuSeyyHWq0xQDlGL2alwtjcfmQN0MBjPdQqWi3rd+LzhsN\n0hWARGSqFzekAnkrLmB1SF05C5UYufISrs8UhbQRgmKUMxPRxaFQ0g7hUBRyntQR\nVR22KWRLAgMBAAECggEAGPei2cCay6+sv2HybwuD1mWUZJvBJh26oK3H8x5u+n7E\nekPTezdOh3CVgvoE1HLHG9W/161Fez6W4kr3hv8QCuQYqm66wqmPwK7ptbsaiFQ6\nrmGH9lOGGYGYRyXGzLBRbXNkvIgEHNCBQqXhwgUD6qFoKVh0MUS4l7RjzQDWHqtL\nwRKcyRVDFEU4d0nYIXUNky+rHJnuy6fdcJ+AVaUq6JC2Yi8f8Zf7zwi5BpJUh15f\npRg+d6ybKyAd2V/5ARhvkY38UGGNCUv6OH6uTk4SAQicNgsrQMqTNjBUYysPRvrO\nyLPFSvocdqowNnLQQvlQKsC7zk6OkPrcJzvbUQJXgQKBgQDPSbyWtDGVUtp2ET14\n3Az66VCPBWblEyagA95UmEQXf+oIIb1Tgr+HJGKt7bpjpypFMDywIdL607lFvHUN\nAaWOrqo2U7RnecqwtPujnRwjxP5qnHWNOObBNjp/3sqTFhZKKVgV0rPjq4QYLBsl\nXdrT6Jd3WS+4f7eJCFdLdgchOwKBgQC9kaWKES5s6Xx/h4s8uxqqesqf1vf4yj1O\nih8BnsEIJZNECViHIzCOdJbXbGlLBdmUhtl4Mkex2kgAKLpfeM8W7xiDBizTvUOY\nWTNEhfhP5tv3CkFKkQXquyy774tlSZPcFXcMSHZIQ0CAwuTDLs/tGvmYCPtzfqL3\nms91iCOYMQKBgGn4aFEjDbYpBUYWyjZfSMN9Q5HaUSALClQDpkXZEfZxjlNZ7FAl\nJ4UPNON2BTOs4g88+cmRgSp50t2z2qMrlFe9M4dSg4fi25w66epbB2fB7c7S7cWk\nsVNVRdLZMva+8+Y1/LIrZYuew4kYA0i3EogDAGwjTCImKM4FVZteW4bBAoGAL6Po\nrDgBKNHMvef8b/i9jNZrEZxemSGKIrDHdgrFjByVU+XdX6jSTRqzxdOy6m2/7nmt\nMW3BYsruiUuy+sdLlAHmcRceMOBBmongPnpEmx/za7QiEHE9wW3koh5jM8M363lh\nf66+Ow7bqQBRqVOcYYQD8ddgCfhrUDqRpIHgICECgYA0TNUGAKnjUWmPxfGYa+VO\n5hZ2mmW1qbmAQilEOoEf3h7D+FzH1YEqJkQnvhaCaS5NqrAtsNeyEuRIk4rU97tm\nryBPQDQHjqPUy5+UtE+sAp/d4Dt3HDstN14Bq30iilkzviIT+B/hl1cRKue4W1Pp\nqg0P6NlV58y3EVPLGFX9kA==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-oqtzk@ecommerce-backend-7518c.iam.gserviceaccount.com",
  client_id: "109070078967297897665",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oqtzk%40ecommerce-backend-7518c.iam.gserviceaccount.com",
};

export default function Firebase() {
  this.connection = admin;

  this.inicializateSchemas = async () => {
    let firebase = await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "http://ecommerce-backend-7518c.firebaseio.com",
    });
    return `Conectado a ${firebase.options.credential.projectId}`;
  };

  this.create = async (objectName, items) => {
    let url = await this.connection.database().ref(objectName).push(items);
    return await this.connection.database().ref(url).once("value");
  };
  this.find = async (objectName) => {
    let snapshot = await this.connection
      .database()
      .ref(objectName)
      .once("value");
    return snapshot.val();
  };
  this.findById = async (objectName, id) => {
    let snapshot = await this.connection
      .database()
      .ref(objectName)
      .orderByChild("id")
      .equalTo(id)
      .once("value");
    return snapshot.val();
  };

  this.update = async (objectName, id, items) => {
    await this.connection
      .database()
      .ref(objectName + "/" + id)
      .set(items);
    return await this.connection
      .database()
      .ref(objectName + "/" + id)
      .once("value");
  };
  this.delete = async (objectName, id) => {
    await this.connection
      .database()
      .ref(objectName + "/" + id)
      .remove();
    return "Objeto borrado";
  };
}
