import { connectDB } from "../../db.js";
import bcrypt from "bcryptjs";
import { Tropipay } from "@yosle/tropipayjs";
import { TPP_CLIENT_ID, TPP_CLIENT_SECRET } from "../../config.js";

const config = {
  clientId: TPP_CLIENT_ID,
  clientSecret: TPP_CLIENT_SECRET,
  scopes: [
    "ALLOW_GET_PROFILE_DATA",
    "ALLOW_PAYMENT_IN",
    "ALLOW_EXTERNAL_CHARGE",
  ],
  serverMode: "Development",
};

const tpp = new Tropipay(config);

console.log(">> TROPIPAY CONNECTED");

export class TppModel {
  static async createPaymentCard({
    reference,
    price,
    name,
    lastName,
    address,
    phone,
    email,
    countryId,
    city,
    postCode,
  }) {
    const payload = {
      reference: reference,
      concept: "Bicycle",
      favorite: "true",
      amount: price,
      currency: "EUR",
      description: "Two wheels",
      singleUse: "true",
      reasonId: 4,
      expirationDays: 1,
      lang: "es",
      urlSuccess: "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp",
      urlFailed: "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp",
      urlNotification:
        "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp/notify",
      serviceDate: "2021-08-20",
      client: {
        name: name,
        lastName: lastName,
        address: address,
        phone: phone,
        email: email,
        countryId: countryId,
        termsAndConditions: "true",
        city: city,
        postCode: postCode,
      },
      directPayment: "true",
    };
    try {
      const paylink = await tpp.paymentCards.create(payload);
      console.log(paylink.shortUrl);
      return paylink.shortUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default TppModel;

// export class TppModel {
//   static async createPaymentCard({
//     reference,
//     price,
//     name,
//     lastName,
//     address,
//     phone,
//     email,
//     countryId,
//     city,
//     postCode,
//   }) {
//     const payload = {
//       reference: reference,
//       concept: "Bicycle",
//       favorite: "true",
//       amount: price,
//       currency: "EUR",
//       description: "Two wheels",
//       singleUse: "true",
//       reasonId: 4,
//       expirationDays: 1,
//       lang: "es",
//       urlSuccess: "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp",
//       urlFailed: "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp",
//       urlNotification: "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp",
//       serviceDate: "2021-08-20",
//       client: {
//         name: name,
//         lastName: lastName,
//         address: address,
//         phone: phone,
//         email: email,
//         countryId: countryId,
//         termsAndConditions: "true",
//         city: city,
//         postCode: postCode,
//       },
//       directPayment: "true",
//     };
//     // Use inside an async function
//     const paylink = await tpp.paymentCards.create(payload);
//     console.log(paylink.shortUrl);
//     return paylink;
//   }
// }
